import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { ChevronLeft, ChevronRight, X, Bookmark, Settings, Play, Pause, SkipBack, SkipForward } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useTranslation } from '@/providers/TranslationProvider';
import { surahList, sampleVerses, Surah, Verse } from '@/data/quranData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

// ─── Per-verse CDN audio URL ──────────────────────────────────────────────────
const getVerseAudioUrl = (surahId: number, verseNumber: number): string => {
  const s = String(surahId).padStart(3, '0');
  const v = String(verseNumber).padStart(3, '0');
  return `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${s}${v}.mp3`;
};

// Strip HTML tags that the Quran API sometimes wraps around translation text
const stripHtml = (html: string): string =>
  html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').trim();

export default function QuranTab() {
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();
  const params = useLocalSearchParams();

  const initialSurahId = params.surah ? parseInt(params.surah as string, 10) : 1;

  // ─── State ──────────────────────────────────────────────────────────────────
  const [selectedSurah, setSelectedSurah] = useState<Surah>(
    surahList.find((s: Surah) => s.id === initialSurahId) || surahList[0]
  );
  const [allVerses, setAllVerses] = useState<Verse[]>(sampleVerses);

  const [searchQuery, setSearchQuery] = useState('');
  const [showSurahList, setShowSurahList] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Settings
  const [fontSize, setFontSize] = useState(18);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [scriptType, setScriptType] = useState<'standard' | 'uthmanic'>('standard');

  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // ─── Audio state ─────────────────────────────────────────────────────────────
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const currentSoundRef = useRef<Audio.Sound | null>(null);
  // Keep a ref to allVerses so audio callbacks always see the latest list
  const allVersesRef = useRef<Verse[]>(allVerses);
  const selectedSurahRef = useRef<Surah>(selectedSurah);
  const isPlayingRef = useRef(false);

  const scrollViewRef = useRef<FlatList>(null);

  // Sync refs
  useEffect(() => { allVersesRef.current = allVerses; }, [allVerses]);
  useEffect(() => { selectedSurahRef.current = selectedSurah; }, [selectedSurah]);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);

  // ─── Boot ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    void loadSettings();
    void loadBookmarks();
  }, []);

  useEffect(() => {
    void loadVerses(selectedSurah.id);
    setCurrentVerseIndex(0);
  }, [selectedSurah]);

  // ─── Persistence ─────────────────────────────────────────────────────────────
  const loadSettings = async () => {
    try {
      const raw = await AsyncStorage.getItem('quranSettings');
      if (raw) {
        const p = JSON.parse(raw);
        setFontSize(p.fontSize || 18);
        setShowTranslation(p.showTranslation !== false);
        setShowTransliteration(p.showTransliteration || false);
        setScriptType(p.scriptType || 'standard');
      }
    } catch (e) {
      console.error('loadSettings error:', e);
    }
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('quranSettings', JSON.stringify({
        fontSize, showTranslation, showTransliteration, scriptType,
      }));
    } catch (e) {
      console.error('saveSettings error:', e);
    }
  };

  const loadBookmarks = async () => {
    try {
      const raw = await AsyncStorage.getItem('quranBookmarks');
      if (raw) setBookmarks(JSON.parse(raw));
    } catch (e) {
      console.error('loadBookmarks error:', e);
    }
  };

  const toggleBookmark = async (verseId: number) => {
    const updated = bookmarks.includes(verseId)
      ? bookmarks.filter((id) => id !== verseId)
      : [...bookmarks, verseId];
    setBookmarks(updated);
    await AsyncStorage.setItem('quranBookmarks', JSON.stringify(updated));
  };

  // ─── Verse loading ───────────────────────────────────────────────────────────
  const loadVerses = async (surahId: number) => {
    setIsLoading(true);
    try {
      // Try multiple translation IDs for maximum coverage
      const url = `https://api.quran.com/api/v4/verses/by_chapter/${surahId}` +
        `?language=en&words=false&translations=131,85,20&fields=text_uthmani,text_imlaei&per_page=300`;

      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      if (data.verses && Array.isArray(data.verses) && data.verses.length > 0) {
        const formatted: Verse[] = data.verses.map((verse: any) => {
          // Pick first available translation text
          const rawTranslation =
            verse.translations?.find((tr: any) => tr.text && tr.text.length > 5)?.text || '';
          return {
            id: verse.id,
            surahId: verse.chapter_id,
            verseNumber: verse.verse_number,
            arabic: verse.text_imlaei || verse.text_uthmani || '',
            uthmanic: verse.text_uthmani || '',
            translation: rawTranslation
              ? stripHtml(rawTranslation)
              : `Verse ${verse.verse_number} — translation unavailable`,
            transliteration: `Verse ${verse.verse_number} transliteration`,
          };
        });
        setAllVerses(formatted);
      } else {
        // Fallback: surah 1 uses bundled sample data
        setAllVerses(surahId === 1 ? sampleVerses : []);
      }
    } catch (error) {
      console.error('loadVerses error:', error);
      setAllVerses(surahId === 1 ? sampleVerses : []);
    } finally {
      setIsLoading(false);
      scrollViewRef.current?.scrollToOffset({ offset: 0, animated: false });
    }
  };

  // ─── Audio engine ────────────────────────────────────────────────────────────
  const stopAudio = useCallback(async () => {
    try {
      if (currentSoundRef.current) {
        await currentSoundRef.current.stopAsync();
        await currentSoundRef.current.unloadAsync();
        currentSoundRef.current = null;
      }
    } catch (e) {
      console.error('stopAudio error:', e);
    } finally {
      setIsPlaying(false);
    }
  }, []);

  /**
   * Play a specific verse by index within allVerses.
   * When the verse finishes it automatically advances to the next one.
   */
  const playVerseAtIndex = useCallback(async (verseIndex: number) => {
    const verses = allVersesRef.current;
    const verse = verses[verseIndex];
    if (!verse) {
      setIsPlaying(false);
      return;
    }

    try {
      // Unload previous sound
      if (currentSoundRef.current) {
        await currentSoundRef.current.unloadAsync();
        currentSoundRef.current = null;
      }

      if (Platform.OS !== 'web') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      }

      const audioUrl = getVerseAudioUrl(selectedSurahRef.current.id, verse.verseNumber);
      console.log(`Playing verse ${verse.verseNumber}: ${audioUrl}`);

      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true, volume: 1.0 },
        (status: any) => {
          if (status.isLoaded && status.didJustFinish) {
            // Auto-advance to the next verse
            const nextIndex = verseIndex + 1;
            if (nextIndex < allVersesRef.current.length) {
              setCurrentVerseIndex(nextIndex);
              void playVerseAtIndex(nextIndex);
            } else {
              // End of surah
              setIsPlaying(false);
              setCurrentVerseIndex(0);
            }
          }
        }
      );

      currentSoundRef.current = sound;
      setCurrentVerseIndex(verseIndex);
      setIsPlaying(true);

      // Scroll to current verse
      scrollViewRef.current?.scrollToIndex({
        index: verseIndex,
        animated: true,
        viewPosition: 0.3,
      });
    } catch (error) {
      console.error('playVerseAtIndex error:', error);
      setIsPlaying(false);
    }
  }, []);

  const toggleAudio = useCallback(async () => {
    try {
      if (isPlayingRef.current && currentSoundRef.current) {
        await currentSoundRef.current.pauseAsync();
        setIsPlaying(false);
        return;
      }
      if (!isPlayingRef.current && currentSoundRef.current) {
        await currentSoundRef.current.playAsync();
        setIsPlaying(true);
        return;
      }
      // Fresh start from current verse index
      await playVerseAtIndex(currentVerseIndex);
    } catch (e) {
      console.error('toggleAudio error:', e);
      setIsPlaying(false);
    }
  }, [currentVerseIndex, playVerseAtIndex]);

  const skipVerse = useCallback(async (direction: 'prev' | 'next') => {
    const targetIndex = direction === 'prev'
      ? Math.max(0, currentVerseIndex - 1)
      : Math.min(allVersesRef.current.length - 1, currentVerseIndex + 1);

    if (isPlayingRef.current) {
      await playVerseAtIndex(targetIndex);
    } else {
      setCurrentVerseIndex(targetIndex);
      scrollViewRef.current?.scrollToIndex({
        index: targetIndex,
        animated: true,
        viewPosition: 0.3,
      });
    }
  }, [currentVerseIndex, playVerseAtIndex]);

  // ─── Surah-level navigation ───────────────────────────────────────────────────
  const navigateSurah = (direction: 'prev' | 'next') => {
    const idx = surahList.findIndex((s: Surah) => s.id === selectedSurah.id);
    if (direction === 'prev' && idx > 0) setSelectedSurah(surahList[idx - 1]);
    if (direction === 'next' && idx < surahList.length - 1) setSelectedSurah(surahList[idx + 1]);
  };

  const changeSurahFromControls = useCallback(async (direction: 'prev' | 'next') => {
    const idx = surahList.findIndex((s: Surah) => s.id === selectedSurah.id);
    const targetIdx = direction === 'prev' ? idx - 1 : idx + 1;
    const target = surahList[targetIdx];
    if (!target) return;

    const wasPlaying = isPlayingRef.current;
    await stopAudio();
    setSelectedSurah(target);

    // If audio was running, start from first verse of new surah after verses load
    if (wasPlaying) {
      // Small delay to let loadVerses complete
      setTimeout(() => void playVerseAtIndex(0), 1200);
    }
  }, [selectedSurah.id, stopAudio, playVerseAtIndex]);

  // ─── Cleanup on unmount / screen blur ────────────────────────────────────────
  useFocusEffect(
    useCallback(() => {
      return () => { void stopAudio(); };
    }, [stopAudio])
  );

  useEffect(() => {
    return () => {
      if (currentSoundRef.current) {
        void currentSoundRef.current.unloadAsync();
      }
    };
  }, []);

  // ─── Filtering ───────────────────────────────────────────────────────────────
  const filteredSurahs = surahList.filter((surah: Surah) =>
    surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.arabicName.includes(searchQuery)
  );

  // ─── Render verse ─────────────────────────────────────────────────────────────
  const renderVerse = ({ item, index }: { item: Verse; index: number }) => {
    const isBookmarked = bookmarks.includes(item.id);
    const isActive = index === currentVerseIndex && isPlaying;

    return (
      <View style={[
        styles.verseContainer,
        {
          backgroundColor: isActive
            ? (isDark ? colors.primary + '22' : colors.primary + '12')
            : colors.card,
          borderLeftColor: isActive ? colors.primary : 'transparent',
          borderLeftWidth: 3,
        }
      ]}>
        <View style={styles.verseHeader}>
          <View style={[styles.verseNumber, { backgroundColor: isActive ? colors.primary : colors.primary + '88' }]}>
            <Text style={styles.verseNumberText}>{item.verseNumber}</Text>
          </View>
          <View style={styles.verseActions}>
            {/* Tap verse to start playing from here */}
            <TouchableOpacity
              onPress={() => void playVerseAtIndex(index)}
              style={styles.versePlayButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              {isActive
                ? <Pause size={16} color={colors.primary} />
                : <Play size={16} color={colors.textSecondary} />
              }
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => void toggleBookmark(item.id)}
              style={styles.bookmarkButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Bookmark
                size={18}
                color={isBookmarked ? colors.primary : colors.textSecondary}
                fill={isBookmarked ? colors.primary : 'transparent'}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[
          styles.arabicText,
          scriptType === 'uthmanic' ? styles.uthmanicText : styles.standardText,
          { color: colors.text, fontSize: fontSize + 8 }
        ]}>
          {scriptType === 'uthmanic' ? (item.uthmanic || item.arabic) : item.arabic}
        </Text>

        {showTransliteration && (
          <Text style={[styles.transliterationText, { color: colors.textSecondary, fontSize: fontSize - 2 }]}>
            {item.transliteration}
          </Text>
        )}

        {showTranslation && (
          <Text style={[styles.translationText, { color: colors.text, fontSize: fontSize }]}>
            {item.translation}
          </Text>
        )}
      </View>
    );
  };

  // ─── JSX ─────────────────────────────────────────────────────────────────────
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: t('quran') || 'Quran',
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#FFFFFF',
          headerLeft: () => (
            <View style={styles.headerLeftContainer}>
              <TouchableOpacity
                style={[styles.headerNavButton, selectedSurah.id === 1 && styles.headerNavButtonDisabled]}
                onPress={() => navigateSurah('prev')}
                disabled={selectedSurah.id === 1}
              >
                <ChevronLeft size={16} color={selectedSurah.id === 1 ? 'rgba(255,255,255,0.4)' : '#FFF'} />
              </TouchableOpacity>
              <Text style={styles.headerPageInfo}>{t('step')} {selectedSurah.id}</Text>
              <TouchableOpacity
                style={[styles.headerNavButton, selectedSurah.id === 114 && styles.headerNavButtonDisabled]}
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
              style={[styles.headerButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
              activeOpacity={0.7}
            >
              <Settings size={20} color="#FFFFFF" />
            </TouchableOpacity>
          ),
        }}
      />

      {/* ── Surah header ── */}
      <View style={[styles.surahHeaderContainer, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity style={styles.surahSelector} onPress={() => setShowSurahList(true)}>
          <Text style={[styles.surahName, { color: colors.text }]}>{selectedSurah.arabicName}</Text>
          <Text style={[styles.surahInfo, { color: colors.textSecondary }]}>
            {selectedSurah.name} • {allVerses.length} verses • {selectedSurah.revelationType}
          </Text>
        </TouchableOpacity>

        {/* ── Audio controls ── */}
        <View style={[
          styles.audioControlsRow,
          { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(27,94,32,0.07)' }
        ]}>
          {/* Prev surah */}
          <TouchableOpacity
            style={[styles.audioSideButton, { backgroundColor: colors.background }, selectedSurah.id === 1 && styles.audioButtonDisabled]}
            onPress={() => void changeSurahFromControls('prev')}
            disabled={selectedSurah.id === 1}
            activeOpacity={0.7}
          >
            <ChevronLeft size={16} color={selectedSurah.id === 1 ? colors.textSecondary : colors.text} />
          </TouchableOpacity>

          {/* Prev verse */}
          <TouchableOpacity
            style={[styles.audioSkipButton, { backgroundColor: colors.background }]}
            onPress={() => void skipVerse('prev')}
            activeOpacity={0.7}
          >
            <SkipBack size={15} color={colors.text} />
          </TouchableOpacity>

          {/* Play / Pause */}
          <TouchableOpacity
            style={[styles.audioPlayButton, { backgroundColor: colors.primary }]}
            onPress={() => void toggleAudio()}
            activeOpacity={0.85}
          >
            {isPlaying
              ? <Pause size={18} color="#FFF" />
              : <Play size={18} color="#FFF" />
            }
            <Text style={styles.audioPlayButtonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
          </TouchableOpacity>

          {/* Next verse */}
          <TouchableOpacity
            style={[styles.audioSkipButton, { backgroundColor: colors.background }]}
            onPress={() => void skipVerse('next')}
            activeOpacity={0.7}
          >
            <SkipForward size={15} color={colors.text} />
          </TouchableOpacity>

          {/* Next surah */}
          <TouchableOpacity
            style={[styles.audioSideButton, { backgroundColor: colors.background }, selectedSurah.id === 114 && styles.audioButtonDisabled]}
            onPress={() => void changeSurahFromControls('next')}
            disabled={selectedSurah.id === 114}
            activeOpacity={0.7}
          >
            <ChevronRight size={16} color={selectedSurah.id === 114 ? colors.textSecondary : colors.text} />
          </TouchableOpacity>
        </View>

        {/* Verse progress indicator */}
        {allVerses.length > 0 && (
          <Text style={[styles.verseProgress, { color: colors.textSecondary }]}>
            Verse {currentVerseIndex + 1} / {allVerses.length}
          </Text>
        )}
      </View>

      {/* ── Verse list ── */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          ref={scrollViewRef}
          data={allVerses}
          renderItem={renderVerse}
          keyExtractor={(item: Verse) => item.id.toString()}
          contentContainerStyle={styles.versesContainer}
          showsVerticalScrollIndicator={false}
          onScrollToIndexFailed={(info) => {
            // Graceful fallback if index is not yet rendered
            setTimeout(() => {
              scrollViewRef.current?.scrollToIndex({
                index: info.index,
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
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>{t('Chapters') || 'Chapters'}</Text>
              <TouchableOpacity onPress={() => setShowSurahList(false)}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={[styles.searchInput, { backgroundColor: colors.background, color: colors.text }]}
              placeholder={t('search') || 'Search'}
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <FlatList
              data={filteredSurahs}
              keyExtractor={(item: Surah) => item.id.toString()}
              renderItem={({ item }: { item: Surah }) => (
                <TouchableOpacity
                  style={[
                    styles.surahItem,
                    { backgroundColor: item.id === selectedSurah.id ? colors.primary + '20' : 'transparent' }
                  ]}
                  onPress={() => {
                    setSelectedSurah(item);
                    setShowSurahList(false);
                    setSearchQuery('');
                  }}
                >
                  <View style={[styles.surahNumber, { backgroundColor: colors.primary }]}>
                    <Text style={styles.surahNumberText}>{item.id}</Text>
                  </View>
                  <View style={styles.surahItemContent}>
                    <Text style={[styles.surahItemName, { color: colors.text }]}>{item.name}</Text>
                    <Text style={[styles.surahItemInfo, { color: colors.textSecondary }]}>
                      {item.englishName} • {item.verses} verses
                    </Text>
                  </View>
                  <Text style={[styles.surahItemArabic, { color: colors.text }]}>{item.arabicName}</Text>
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
        <View style={styles.modalOverlay}>
          <View style={[styles.settingsModal, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>{t('settings') || 'Settings'}</Text>
              <TouchableOpacity onPress={() => { setShowSettings(false); void saveSettings(); }}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Font size */}
            <View style={styles.settingItem}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                {(t as any)('fontSize') || 'Font Size'}
              </Text>
              <View style={styles.fontSizeControls}>
                <TouchableOpacity
                  style={[styles.fontSizeButton, { backgroundColor: colors.background }]}
                  onPress={() => setFontSize(Math.max(12, fontSize - 2))}
                >
                  <Text style={{ color: colors.text, fontWeight: '600' }}>A-</Text>
                </TouchableOpacity>
                <Text style={[styles.fontSizeValue, { color: colors.text }]}>{fontSize}</Text>
                <TouchableOpacity
                  style={[styles.fontSizeButton, { backgroundColor: colors.background }]}
                  onPress={() => setFontSize(Math.min(30, fontSize + 2))}
                >
                  <Text style={{ color: colors.text, fontWeight: '600' }}>A+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Show translation toggle */}
            <TouchableOpacity style={styles.settingItem} onPress={() => setShowTranslation(!showTranslation)}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                {(t as any)('showTranslation') || 'Show Translation'}
              </Text>
              <View style={[styles.toggle, { backgroundColor: showTranslation ? colors.primary : colors.border }]}>
                <View style={[styles.toggleThumb, showTranslation && styles.toggleThumbActive]} />
              </View>
            </TouchableOpacity>

            {/* Show transliteration toggle */}
            <TouchableOpacity style={styles.settingItem} onPress={() => setShowTransliteration(!showTransliteration)}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                {(t as any)('showTransliteration') || 'Show Transliteration'}
              </Text>
              <View style={[styles.toggle, { backgroundColor: showTransliteration ? colors.primary : colors.border }]}>
                <View style={[styles.toggleThumb, showTransliteration && styles.toggleThumbActive]} />
              </View>
            </TouchableOpacity>

            {/* Arabic script selector */}
            <View style={styles.settingItem}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                {(t as any)('arabicScript') || 'Arabic Script'}
              </Text>
              <View style={styles.scriptSelector}>
                <TouchableOpacity
                  style={[styles.scriptButton, { backgroundColor: scriptType === 'standard' ? colors.primary : colors.background }]}
                  onPress={() => setScriptType('standard')}
                >
                  <Text style={[styles.scriptButtonText, { color: scriptType === 'standard' ? '#fff' : colors.text }]}>
                    {(t as any)('standard') || 'Standard'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.scriptButton, { backgroundColor: scriptType === 'uthmanic' ? colors.primary : colors.background }]}
                  onPress={() => setScriptType('uthmanic')}
                >
                  <Text style={[styles.scriptButtonText, { color: scriptType === 'uthmanic' ? '#fff' : colors.text }]}>
                    {(t as any)('uthmanic') || 'Uthmanic'}
                  </Text>
                </TouchableOpacity>
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

  // Header
  headerLeftContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerNavButton: { padding: 4, borderRadius: 4 },
  headerNavButtonDisabled: { opacity: 0.5 },
  headerPageInfo: {
    fontSize: 12, color: '#FFF', fontWeight: '500', minWidth: 60, textAlign: 'center',
  },
  headerButton: {
    padding: 8, marginRight: 8, borderRadius: 8,
    minWidth: 36, minHeight: 36, justifyContent: 'center', alignItems: 'center',
  },

  // Surah header
  surahHeaderContainer: {
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1,
    elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2,
  },
  surahSelector: { alignItems: 'center', marginBottom: 12 },
  surahName: { fontSize: 24, fontWeight: '600' },
  surahInfo: { fontSize: 12, marginTop: 2 },
  verseProgress: { fontSize: 11, textAlign: 'center', marginTop: 8 },

  // Audio controls
  audioControlsRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    alignSelf: 'center', gap: 10,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 28,
  },
  audioSideButton: {
    width: 38, height: 38, borderRadius: 19,
    alignItems: 'center', justifyContent: 'center',
  },
  audioSkipButton: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  audioPlayButton: {
    minWidth: 108, height: 46, borderRadius: 23,
    paddingHorizontal: 16, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  audioPlayButtonText: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  audioButtonDisabled: { opacity: 0.4 },

  // Verses
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  versesContainer: { padding: 16, paddingTop: 8 },
  verseContainer: {
    marginBottom: 18, padding: 16, borderRadius: 12,
  },
  verseHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  verseNumber: {
    width: 32, height: 32, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center',
  },
  verseNumberText: { fontSize: 13, fontWeight: '700', color: '#fff' },
  verseActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  versePlayButton: { padding: 4 },
  bookmarkButton: { padding: 4 },
  arabicText: { fontSize: 26, lineHeight: 40, textAlign: 'right', marginBottom: 10 },
  standardText: { fontFamily: 'System' },
  uthmanicText: { fontFamily: 'System', letterSpacing: 1, lineHeight: 46 },
  transliterationText: { fontSize: 15, lineHeight: 22, marginBottom: 8, fontStyle: 'italic' },
  translationText: { fontSize: 16, lineHeight: 26 },

  // Modals
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { height: '80%', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  settingsModal: { height: '80%', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 16,
  },
  modalTitle: { fontSize: 20, fontWeight: '600' },
  searchInput: { padding: 12, borderRadius: 8, marginBottom: 16, fontSize: 16 },

  // Surah list
  surahItem: {
    flexDirection: 'row', alignItems: 'center',
    padding: 12, borderRadius: 8, marginBottom: 8,
  },
  surahNumber: {
    width: 36, height: 36, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center',
  },
  surahNumberText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  surahItemContent: { flex: 1, marginLeft: 12 },
  surahItemName: { fontSize: 16, fontWeight: '500' },
  surahItemInfo: { fontSize: 12, marginTop: 2 },
  surahItemArabic: { fontSize: 18, fontWeight: '500' },

  // Settings
  settingItem: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 16,
  },
  settingLabel: { fontSize: 16 },
  fontSizeControls: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  fontSizeButton: {
    width: 36, height: 36, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center',
  },
  fontSizeValue: { fontSize: 16, minWidth: 30, textAlign: 'center' },
  toggle: { width: 48, height: 28, borderRadius: 14, padding: 2, justifyContent: 'center' },
  toggleThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#fff' },
  toggleThumbActive: { alignSelf: 'flex-end' },
  scriptSelector: { flexDirection: 'row', gap: 8 },
  scriptButton: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20, minWidth: 80, alignItems: 'center',
  },
  scriptButtonText: { fontSize: 14, fontWeight: '500' },
});
