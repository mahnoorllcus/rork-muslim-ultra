
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';

import { Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Bookmark,
  Settings,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useTranslation } from '@/providers/TranslationProvider';
import { surahList, sampleVerses, Surah, Verse } from '@/data/quranData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

// ─── Constants ────────────────────────────────────────────────────────────────

/**
 * Quran.com API v4 recitation IDs (ayah-by-ayah).
 * These are NOT the same as chapter-reciter IDs.
 * Verified from https://api.quran.com/api/v4/resources/recitations
 */
const RECITATION = {
  ALAFASY: 7,       // Mishary Rashid Alafasy
  HUSARY: 1,        // Mahmoud Khalil Al-Husary
  MINSHAWY: 2,      // Mohamed Siddiq Al-Minshawi
} as const;

/** CDN base — all per-verse URLs returned by the API point here */
const AUDIO_CDN = 'https://verses.quran.foundation';

/** Translation IDs tried in order; first non-empty wins */
const TRANSLATION_IDS = [131, 85, 20];  // Saheeh Intl, Pickthall, Muntakhab

// ─── Helpers ──────────────────────────────────────────────────────────────────

const stripHtml = (html: string): string =>
  html
    .replace(/<sup[^>]*>.*?<\/sup>/gi, '')   // remove footnote superscripts
    .replace(/<[^>]+>/g, '')                  // strip remaining tags
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .trim();

/** Build an absolute audio URL from what the API returns.
 *  The API sometimes returns a full https URL, sometimes just a path. */
const resolveAudioUrl = (raw: string): string => {
  if (!raw) return '';
  if (raw.startsWith('http')) return raw;
  return `${AUDIO_CDN}/${raw.replace(/^\//, '')}`;
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface VerseAudioMap {
  [verseNumber: number]: string;   // verseNumber → absolute MP3 URL
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function QuranTab() {
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();
  const params = useLocalSearchParams();

  const initialSurahId = params.surah ? parseInt(params.surah as string, 10) : 1;

  // ── Core state ──────────────────────────────────────────────────────────────
  const [selectedSurah, setSelectedSurah] = useState<Surah>(
    surahList.find((s: Surah) => s.id === initialSurahId) ?? surahList[0]
  );
  const [allVerses, setAllVerses] = useState<Verse[]>(sampleVerses);
  const [verseAudioMap, setVerseAudioMap] = useState<VerseAudioMap>({});

  // ── UI state ────────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');
  const [showSurahList, setShowSurahList] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoadingVerses, setIsLoadingVerses] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);

  // ── Settings state ──────────────────────────────────────────────────────────
  const [fontSize, setFontSize] = useState(18);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [scriptType, setScriptType] = useState<'standard' | 'uthmanic'>('uthmanic');
  const [reciterId, setReciterId] = useState<number>(RECITATION.ALAFASY);

  // ── Bookmarks ───────────────────────────────────────────────────────────────
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  // ── Audio state ─────────────────────────────────────────────────────────────
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);

  // Refs so async callbacks always read fresh values (avoid stale closures)
  const soundRef = useRef<Audio.Sound | null>(null);
  const isPlayingRef = useRef(false);
  const currentVerseIndexRef = useRef(0);
  const allVersesRef = useRef<Verse[]>(sampleVerses);
  const verseAudioMapRef = useRef<VerseAudioMap>({});
  const selectedSurahRef = useRef<Surah>(selectedSurah);
  const listRef = useRef<FlatList>(null);

  // Keep refs in sync
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { currentVerseIndexRef.current = currentVerseIndex; }, [currentVerseIndex]);
  useEffect(() => { allVersesRef.current = allVerses; }, [allVerses]);
  useEffect(() => { verseAudioMapRef.current = verseAudioMap; }, [verseAudioMap]);
  useEffect(() => { selectedSurahRef.current = selectedSurah; }, [selectedSurah]);

  // ── Boot ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    void loadSettings();
    void loadBookmarks();
  }, []);

  useEffect(() => {
    setCurrentVerseIndex(0);
    currentVerseIndexRef.current = 0;
    void loadVerses(selectedSurah.id);
    void prefetchAudioUrls(selectedSurah.id, reciterId);
  }, [selectedSurah, reciterId]);

  // ── Persistence ─────────────────────────────────────────────────────────────
  const loadSettings = async () => {
    try {
      const raw = await AsyncStorage.getItem('quranSettings');
      if (raw) {
        const p = JSON.parse(raw);
        if (p.fontSize)            setFontSize(p.fontSize);
        if (p.showTranslation !== undefined) setShowTranslation(p.showTranslation);
        if (p.showTransliteration !== undefined) setShowTransliteration(p.showTransliteration);
        if (p.scriptType)          setScriptType(p.scriptType);
        if (p.reciterId)           setReciterId(p.reciterId);
      }
    } catch (e) { console.error('loadSettings:', e); }
  };

  const saveSettings = useCallback(async () => {
    try {
      await AsyncStorage.setItem('quranSettings', JSON.stringify({
        fontSize, showTranslation, showTransliteration, scriptType, reciterId,
      }));
    } catch (e) { console.error('saveSettings:', e); }
  }, [fontSize, showTranslation, showTransliteration, scriptType, reciterId]);

  const loadBookmarks = async () => {
    try {
      const raw = await AsyncStorage.getItem('quranBookmarks');
      if (raw) setBookmarks(JSON.parse(raw));
    } catch (e) { console.error('loadBookmarks:', e); }
  };

  const toggleBookmark = async (verseId: number) => {
    const updated = bookmarks.includes(verseId)
      ? bookmarks.filter((id) => id !== verseId)
      : [...bookmarks, verseId];
    setBookmarks(updated);
    await AsyncStorage.setItem('quranBookmarks', JSON.stringify(updated));
  };

  // ── Data fetching ────────────────────────────────────────────────────────────

  const loadVerses = async (surahId: number) => {
    setIsLoadingVerses(true);
    try {
      const url =
        `https://api.quran.com/api/v4/verses/by_chapter/${surahId}` +
        `?language=en&words=false` +
        `&translations=${TRANSLATION_IDS.join(',')}` +
        `&fields=text_uthmani,text_imlaei&per_page=300`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (data.verses?.length) {
        const formatted: Verse[] = data.verses.map((v: any) => {
          const rawTr =
            v.translations?.find((tr: any) => tr.text?.length > 5)?.text ?? '';
          return {
            id: v.id,
            surahId: v.chapter_id,
            verseNumber: v.verse_number,
            arabic: v.text_imlaei || v.text_uthmani || '',
            uthmanic: v.text_uthmani || '',
            translation: rawTr ? stripHtml(rawTr) : `Verse ${v.verse_number}`,
            transliteration: `Verse ${v.verse_number} transliteration`,
          };
        });
        setAllVerses(formatted);
      } else {
        setAllVerses(surahId === 1 ? sampleVerses : []);
      }
    } catch (e) {
      console.error('loadVerses:', e);
      setAllVerses(surahId === 1 ? sampleVerses : []);
    } finally {
      setIsLoadingVerses(false);
      listRef.current?.scrollToOffset({ offset: 0, animated: false });
    }
  };

  /**
   * Pre-fetch all verse audio URLs for the current surah from the quran.com API.
   * Stores them in verseAudioMap keyed by verseNumber.
   * This avoids building guessed URLs that may not exist.
   */
  const prefetchAudioUrls = async (surahId: number, recitation: number) => {
    setIsLoadingAudio(true);
    const map: VerseAudioMap = {};
    try {
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const url =
          `https://api.quran.com/api/v4/recitations/${recitation}/by_chapter/${surahId}` +
          `?per_page=300&page=${page}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Audio API HTTP ${res.status}`);
        const data = await res.json();

        if (data.audio_files?.length) {
          for (const af of data.audio_files) {
            // verse_key is "surah:verse" e.g. "1:1"
            const verseNum = parseInt(af.verse_key.split(':')[1], 10);
            map[verseNum] = resolveAudioUrl(af.url);
          }
        }

        const pagination = data.pagination ?? data.meta?.pagination;
        hasMore =
          pagination &&
          pagination.current_page < pagination.total_pages &&
          data.audio_files?.length > 0;
        page++;
      }

      console.log(
        `Fetched ${Object.keys(map).length} audio URLs for surah ${surahId} (recitation ${recitation})`
      );
      setVerseAudioMap(map);
    } catch (e) {
      console.error('prefetchAudioUrls:', e);
      // Fallback: build URLs from known CDN pattern so we still attempt playback
      const surah = surahList.find((s: Surah) => s.id === surahId);
      if (surah) {
        const s = String(surahId).padStart(3, '0');
        for (let i = 1; i <= surah.verses; i++) {
          const v = String(i).padStart(3, '0');
          map[i] = `${AUDIO_CDN}/Alafasy/mp3/${s}${v}.mp3`;
        }
        setVerseAudioMap(map);
      }
    } finally {
      setIsLoadingAudio(false);
    }
  };

  // ── Audio engine ──────────────────────────────────────────────────────────────

  const stopAudio = useCallback(async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    } catch (e) {
      console.error('stopAudio:', e);
    } finally {
      setIsPlaying(false);
      isPlayingRef.current = false;
    }
  }, []);

  /**
   * Core play function — loads the MP3 for `verseIndex` and registers
   * an onPlaybackStatusUpdate that auto-advances to the next verse.
   */
  const playVerseAtIndex = useCallback(async (verseIndex: number) => {
    const verses = allVersesRef.current;
    const verse = verses[verseIndex];
    if (!verse) {
      await stopAudio();
      return;
    }

    const audioUrl = verseAudioMapRef.current[verse.verseNumber];
    if (!audioUrl) {
      console.warn(`No audio URL for verse ${verse.verseNumber}`);
      // Try next verse so playback doesn't just die
      if (verseIndex + 1 < verses.length) {
        void playVerseAtIndex(verseIndex + 1);
      } else {
        await stopAudio();
      }
      return;
    }

    try {
      // Unload previous sound
      if (soundRef.current) {
        try { await soundRef.current.unloadAsync(); } catch (_) {}
        soundRef.current = null;
      }

      if (Platform.OS !== 'web') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      }

      console.log(`▶ Playing verse ${verse.verseNumber}: ${audioUrl}`);

      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true, volume: 1.0 },
        (status: any) => {
          if (!status.isLoaded) return;
          if (status.didJustFinish) {
            const nextIdx = currentVerseIndexRef.current + 1;
            const totalVerses = allVersesRef.current.length;
            if (nextIdx < totalVerses) {
              currentVerseIndexRef.current = nextIdx;
              setCurrentVerseIndex(nextIdx);
              void playVerseAtIndex(nextIdx);
            } else {
              // End of surah
              soundRef.current = null;
              setIsPlaying(false);
              isPlayingRef.current = false;
              setCurrentVerseIndex(0);
              currentVerseIndexRef.current = 0;
            }
          }
        }
      );

      soundRef.current = sound;
      setCurrentVerseIndex(verseIndex);
      currentVerseIndexRef.current = verseIndex;
      setIsPlaying(true);
      isPlayingRef.current = true;

      // Scroll the list to show the active verse
      listRef.current?.scrollToIndex({
        index: verseIndex,
        animated: true,
        viewPosition: 0.3,
      });
    } catch (e) {
      console.error('playVerseAtIndex error:', e);
      setIsPlaying(false);
      isPlayingRef.current = false;
    }
  }, [stopAudio]);

  const toggleAudio = useCallback(async () => {
    if (isPlayingRef.current && soundRef.current) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
      isPlayingRef.current = false;
      return;
    }
    if (!isPlayingRef.current && soundRef.current) {
      await soundRef.current.playAsync();
      setIsPlaying(true);
      isPlayingRef.current = true;
      return;
    }
    // Fresh start
    await playVerseAtIndex(currentVerseIndexRef.current);
  }, [playVerseAtIndex]);

  const skipVerse = useCallback(async (direction: 'prev' | 'next') => {
    const verses = allVersesRef.current;
    const idx = currentVerseIndexRef.current;
    const target = direction === 'prev'
      ? Math.max(0, idx - 1)
      : Math.min(verses.length - 1, idx + 1);

    if (isPlayingRef.current) {
      await playVerseAtIndex(target);
    } else {
      setCurrentVerseIndex(target);
      currentVerseIndexRef.current = target;
      listRef.current?.scrollToIndex({ index: target, animated: true, viewPosition: 0.3 });
    }
  }, [playVerseAtIndex]);

  // ── Surah navigation ──────────────────────────────────────────────────────────

  const navigateSurah = (direction: 'prev' | 'next') => {
    const idx = surahList.findIndex((s: Surah) => s.id === selectedSurah.id);
    if (direction === 'prev' && idx > 0)               setSelectedSurah(surahList[idx - 1]);
    if (direction === 'next' && idx < surahList.length - 1) setSelectedSurah(surahList[idx + 1]);
  };

  const changeSurahFromAudioControls = useCallback(async (direction: 'prev' | 'next') => {
    const idx = surahList.findIndex((s: Surah) => s.id === selectedSurahRef.current.id);
    const targetIdx = direction === 'prev' ? idx - 1 : idx + 1;
    const target = surahList[targetIdx];
    if (!target) return;

    const wasPlaying = isPlayingRef.current;
    await stopAudio();
    setSelectedSurah(target);

    if (wasPlaying) {
      // Audio URLs + verses will load via the useEffect → start playback after delay
      setTimeout(() => void playVerseAtIndex(0), 1400);
    }
  }, [stopAudio, playVerseAtIndex]);

  // ── Cleanup ───────────────────────────────────────────────────────────────────

  useFocusEffect(
    useCallback(() => {
      return () => { void stopAudio(); };
    }, [stopAudio])
  );

  // ── Filtering ──────────────────────────────────────────────────────────────────

  const filteredSurahs = surahList.filter((s: Surah) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.arabicName.includes(searchQuery)
  );

  // ── Render helpers ─────────────────────────────────────────────────────────────

  const renderVerse = ({ item, index }: { item: Verse; index: number }) => {
    const isBookmarked = bookmarks.includes(item.id);
    const isActive = index === currentVerseIndex;
    const isCurrentlyPlaying = isActive && isPlaying;

    return (
      <View
        style={[
          styles.verseContainer,
          {
            backgroundColor: isActive
              ? (isDark ? colors.primary + '28' : colors.primary + '14')
              : colors.card,
            borderLeftWidth: 3,
            borderLeftColor: isCurrentlyPlaying ? colors.primary : 'transparent',
          },
        ]}
      >
        {/* Verse header row */}
        <View style={styles.verseHeader}>
          <TouchableOpacity
            onPress={() => void playVerseAtIndex(index)}
            activeOpacity={0.7}
          >
            <View style={[
              styles.verseNumber,
              { backgroundColor: isCurrentlyPlaying ? colors.primary : colors.primary + 'AA' }
            ]}>
              {isCurrentlyPlaying
                ? <Volume2 size={14} color="#fff" />
                : <Text style={styles.verseNumberText}>{item.verseNumber}</Text>
              }
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => void toggleBookmark(item.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Bookmark
              size={18}
              color={isBookmarked ? colors.primary : colors.textSecondary}
              fill={isBookmarked ? colors.primary : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        {/* Arabic / Uthmanic text */}
        <Text
          style={[
            styles.arabicText,
            scriptType === 'uthmanic' ? styles.uthmanicText : styles.standardArabicText,
            { color: colors.text, fontSize: fontSize + 8 },
          ]}
        >
          {scriptType === 'uthmanic' ? (item.uthmanic || item.arabic) : item.arabic}
        </Text>

        {/* Transliteration */}
        {showTransliteration && (
          <Text style={[styles.transliterationText, { color: colors.textSecondary, fontSize: fontSize - 2 }]}>
            {item.transliteration}
          </Text>
        )}

        {/* Translation */}
        {showTranslation && (
          <Text style={[styles.translationText, { color: colors.text, fontSize: fontSize }]}>
            {item.translation}
          </Text>
        )}
      </View>
    );
  };

  // ── JSX ────────────────────────────────────────────────────────────────────────

  const isLoading = isLoadingVerses || isLoadingAudio;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      {/* Stack header */}
      <Stack.Screen
        options={{
          title: t('quran') || 'Quran',
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#FFF',
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <TouchableOpacity
                style={[styles.headerNavBtn, selectedSurah.id === 1 && styles.disabled]}
                onPress={() => navigateSurah('prev')}
                disabled={selectedSurah.id === 1}
              >
                <ChevronLeft size={16} color={selectedSurah.id === 1 ? 'rgba(255,255,255,0.4)' : '#FFF'} />
              </TouchableOpacity>
              <Text style={styles.headerPageInfo}>
                {t('step')} {selectedSurah.id}
              </Text>
              <TouchableOpacity
                style={[styles.headerNavBtn, selectedSurah.id === 114 && styles.disabled]}
                onPress={() => navigateSurah('next')}
                disabled={selectedSurah.id === 114}
              >
                <ChevronRight size={16} color={selectedSurah.id === 114 ? 'rgba(255,255,255,0.4)' : '#FFF'} />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setShowSettings(true)}
              style={[styles.headerBtn, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
            >
              <Settings size={20} color="#FFF" />
            </TouchableOpacity>
          ),
        }}
      />

      {/* ── Surah header ── */}
      <View style={[styles.surahHeader, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>

        {/* Surah selector tap area */}
        <TouchableOpacity style={styles.surahSelector} onPress={() => setShowSurahList(true)}>
          <Text style={[styles.surahArabicName, { color: colors.text }]}>
            {selectedSurah.arabicName}
          </Text>
          <Text style={[styles.surahMeta, { color: colors.textSecondary }]}>
            {selectedSurah.name}  •  {allVerses.length} verses  •  {selectedSurah.revelationType}
          </Text>
        </TouchableOpacity>

        {/* Audio controls */}
        <View style={[
          styles.audioRow,
          { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(27,94,32,0.08)' },
        ]}>
          {/* Prev surah */}
          <TouchableOpacity
            style={[styles.audioIconBtn, { backgroundColor: colors.background }, selectedSurah.id === 1 && styles.disabled]}
            onPress={() => void changeSurahFromAudioControls('prev')}
            disabled={selectedSurah.id === 1}
          >
            <ChevronLeft size={16} color={selectedSurah.id === 1 ? colors.textSecondary : colors.text} />
          </TouchableOpacity>

          {/* Prev verse */}
          <TouchableOpacity
            style={[styles.audioIconBtn, { backgroundColor: colors.background }]}
            onPress={() => void skipVerse('prev')}
          >
            <SkipBack size={15} color={colors.text} />
          </TouchableOpacity>

          {/* Play / Pause */}
          <TouchableOpacity
            style={[styles.playBtn, { backgroundColor: colors.primary }]}
            onPress={() => void toggleAudio()}
            disabled={isLoadingAudio}
          >
            {isLoadingAudio
              ? <ActivityIndicator size="small" color="#FFF" />
              : isPlaying
                ? <Pause size={18} color="#FFF" />
                : <Play size={18} color="#FFF" />
            }
            <Text style={styles.playBtnLabel}>
              {isLoadingAudio ? 'Loading…' : isPlaying ? 'Pause' : 'Play'}
            </Text>
          </TouchableOpacity>

          {/* Next verse */}
          <TouchableOpacity
            style={[styles.audioIconBtn, { backgroundColor: colors.background }]}
            onPress={() => void skipVerse('next')}
          >
            <SkipForward size={15} color={colors.text} />
          </TouchableOpacity>

          {/* Next surah */}
          <TouchableOpacity
            style={[styles.audioIconBtn, { backgroundColor: colors.background }, selectedSurah.id === 114 && styles.disabled]}
            onPress={() => void changeSurahFromAudioControls('next')}
            disabled={selectedSurah.id === 114}
          >
            <ChevronRight size={16} color={selectedSurah.id === 114 ? colors.textSecondary : colors.text} />
          </TouchableOpacity>
        </View>

        {/* Verse progress */}
        {allVerses.length > 0 && (
          <Text style={[styles.verseProgress, { color: colors.textSecondary }]}>
            Verse {currentVerseIndex + 1} / {allVerses.length}
          </Text>
        )}
      </View>

      {/* ── Verse list ── */}
      {isLoadingVerses ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          ref={listRef}
          data={allVerses}
          renderItem={renderVerse}
          keyExtractor={(item: Verse) => item.id.toString()}
          contentContainerStyle={styles.versesList}
          showsVerticalScrollIndicator={false}
          onScrollToIndexFailed={({ index }) => {
            setTimeout(() => {
              listRef.current?.scrollToIndex({
                index,
                animated: true,
                viewPosition: 0.3,
              });
            }, 300);
          }}
        />
      )}

      {/* ── Surah list modal ── */}
      <Modal
        visible={showSurahList}
        animationType="slide"
        transparent
        onRequestClose={() => setShowSurahList(false)}
      >
        <View style={styles.overlay}>
          <View style={[styles.modalSheet, { backgroundColor: colors.card }]}>
            <View style={styles.modalHead}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {t('Chapters') || 'Chapters'}
              </Text>
              <TouchableOpacity onPress={() => setShowSurahList(false)}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={[styles.searchBox, { backgroundColor: colors.background, color: colors.text }]}
              placeholder={t('search') || 'Search surah…'}
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <FlatList
              data={filteredSurahs}
              keyExtractor={(s: Surah) => s.id.toString()}
              renderItem={({ item }: { item: Surah }) => (
                <TouchableOpacity
                  style={[
                    styles.surahListItem,
                    { backgroundColor: item.id === selectedSurah.id ? colors.primary + '22' : 'transparent' },
                  ]}
                  onPress={() => {
                    setSelectedSurah(item);
                    setShowSurahList(false);
                    setSearchQuery('');
                  }}
                >
                  <View style={[styles.surahNumBadge, { backgroundColor: colors.primary }]}>
                    <Text style={styles.surahNumText}>{item.id}</Text>
                  </View>
                  <View style={styles.surahListMeta}>
                    <Text style={[styles.surahListName, { color: colors.text }]}>{item.name}</Text>
                    <Text style={[styles.surahListSub, { color: colors.textSecondary }]}>
                      {item.englishName}  •  {item.verses} verses
                    </Text>
                  </View>
                  <Text style={[styles.surahListArabic, { color: colors.text }]}>{item.arabicName}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* ── Settings modal ── */}
      <Modal
        visible={showSettings}
        animationType="slide"
        transparent
        onRequestClose={() => { setShowSettings(false); void saveSettings(); }}
      >
        <View style={styles.overlay}>
          <View style={[styles.modalSheet, { backgroundColor: colors.card }]}>
            <View style={styles.modalHead}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {t('settings') || 'Settings'}
              </Text>
              <TouchableOpacity onPress={() => { setShowSettings(false); void saveSettings(); }}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Font size */}
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Font Size</Text>
              <View style={styles.fontRow}>
                <TouchableOpacity
                  style={[styles.fontBtn, { backgroundColor: colors.background }]}
                  onPress={() => setFontSize(Math.max(12, fontSize - 2))}
                >
                  <Text style={{ color: colors.text, fontWeight: '700' }}>A−</Text>
                </TouchableOpacity>
                <Text style={[styles.fontVal, { color: colors.text }]}>{fontSize}</Text>
                <TouchableOpacity
                  style={[styles.fontBtn, { backgroundColor: colors.background }]}
                  onPress={() => setFontSize(Math.min(32, fontSize + 2))}
                >
                  <Text style={{ color: colors.text, fontWeight: '700' }}>A+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Show translation */}
            <TouchableOpacity style={styles.settingRow} onPress={() => setShowTranslation(!showTranslation)}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Show Translation</Text>
              <View style={[styles.toggle, { backgroundColor: showTranslation ? colors.primary : colors.border }]}>
                <View style={[styles.toggleThumb, showTranslation && styles.toggleThumbOn]} />
              </View>
            </TouchableOpacity>

            {/* Show transliteration */}
            <TouchableOpacity style={styles.settingRow} onPress={() => setShowTransliteration(!showTransliteration)}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Show Transliteration</Text>
              <View style={[styles.toggle, { backgroundColor: showTransliteration ? colors.primary : colors.border }]}>
                <View style={[styles.toggleThumb, showTransliteration && styles.toggleThumbOn]} />
              </View>
            </TouchableOpacity>

            {/* Arabic script */}
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Arabic Script</Text>
              <View style={styles.chipRow}>
                {(['standard', 'uthmanic'] as const).map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[styles.chip, { backgroundColor: scriptType === type ? colors.primary : colors.background }]}
                    onPress={() => setScriptType(type)}
                  >
                    <Text style={[styles.chipText, { color: scriptType === type ? '#fff' : colors.text }]}>
                      {type === 'uthmanic' ? 'Uthmanic' : 'Standard'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Reciter */}
            <View style={[styles.settingRow, { flexDirection: 'column', alignItems: 'flex-start', gap: 10 }]}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Reciter</Text>
              <View style={styles.chipRow}>
                {([
                  { id: RECITATION.ALAFASY, label: 'Alafasy' },
                  { id: RECITATION.HUSARY, label: 'Al-Husary' },
                  { id: RECITATION.MINSHAWY, label: 'Minshawi' },
                ] as const).map((r) => (
                  <TouchableOpacity
                    key={r.id}
                    style={[styles.chip, { backgroundColor: reciterId === r.id ? colors.primary : colors.background }]}
                    onPress={() => setReciterId(r.id)}
                  >
                    <Text style={[styles.chipText, { color: reciterId === r.id ? '#fff' : colors.text }]}>
                      {r.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

          </View>
        </View>
      </Modal>

    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Stack header
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  headerNavBtn: { padding: 4, borderRadius: 4 },
  headerPageInfo: { fontSize: 12, color: '#FFF', fontWeight: '500', minWidth: 54, textAlign: 'center' },
  headerBtn: { padding: 8, marginRight: 8, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  disabled: { opacity: 0.4 },

  // Surah header
  surahHeader: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  surahSelector: { alignItems: 'center', marginBottom: 14 },
  surahArabicName: { fontSize: 24, fontWeight: '700' },
  surahMeta: { fontSize: 12, marginTop: 3 },
  verseProgress: { fontSize: 11, textAlign: 'center', marginTop: 8 },

  // Audio controls
  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
  },
  audioIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    minWidth: 110,
    height: 46,
    borderRadius: 23,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  playBtnLabel: { color: '#FFF', fontSize: 14, fontWeight: '700' },

  // Verse list
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  versesList: { padding: 16, paddingTop: 8, paddingBottom: 40 },
  verseContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  verseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  verseNumber: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verseNumberText: { fontSize: 13, fontWeight: '700', color: '#fff' },

  arabicText: { textAlign: 'right', marginBottom: 10 },
  standardArabicText: { fontFamily: 'System', lineHeight: 40 },
  uthmanicText: {
    fontFamily: 'System',
    lineHeight: 52,
    letterSpacing: 1.5,
  },
  transliterationText: { fontStyle: 'italic', lineHeight: 22, marginBottom: 8 },
  translationText: { lineHeight: 26 },

  // Modal
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.52)', justifyContent: 'flex-end' },
  modalSheet: { height: '82%', borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: 20 },
  modalHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: '700' },
  searchBox: { padding: 12, borderRadius: 10, marginBottom: 14, fontSize: 15 },

  // Surah list item
  surahListItem: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 10, marginBottom: 6 },
  surahNumBadge: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  surahNumText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  surahListMeta: { flex: 1, marginLeft: 12 },
  surahListName: { fontSize: 15, fontWeight: '600' },
  surahListSub: { fontSize: 12, marginTop: 2 },
  surahListArabic: { fontSize: 17, fontWeight: '500' },

  // Settings
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(128,128,128,0.2)',
  },
  settingLabel: { fontSize: 15, fontWeight: '500' },
  fontRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  fontBtn: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  fontVal: { fontSize: 15, minWidth: 28, textAlign: 'center' },
  toggle: { width: 48, height: 28, borderRadius: 14, padding: 2, justifyContent: 'center' },
  toggleThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#fff' },
  toggleThumbOn: { alignSelf: 'flex-end' },
  chipRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20 },
  chipText: { fontSize: 13, fontWeight: '600' },
});
