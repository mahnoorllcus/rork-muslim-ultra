import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';

import { Stack, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, ChevronRight, X, Bookmark, Settings, Play, Pause, Volume2 } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useTranslation } from '@/providers/TranslationProvider';
import { surahList, sampleVerses, Surah, Verse } from '@/data/quranData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

export default function QuranTab() {
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const initialSurahId = params.surah ? parseInt(params.surah as string, 10) : 1;
  const [selectedSurah, setSelectedSurah] = useState<Surah>(surahList.find(s => s.id === initialSurahId) || surahList[0]);
  const [allVerses, setAllVerses] = useState<Verse[]>(sampleVerses);

  const [searchQuery, setSearchQuery] = useState('');
  const [showSurahList, setShowSurahList] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [scriptType, setScriptType] = useState<'standard' | 'uthmanic'>('standard');
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState<Audio.Sound | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // Function to get Uthmanic script text
  const getUthmanicText = (verse: Verse): string => {
    // Return Uthmanic script if available, otherwise fallback to standard Arabic
    return verse.uthmanic || verse.arabic;
  };

  useEffect(() => {
    loadSettings();
    loadBookmarks();
  }, []);

  useEffect(() => {
    loadVerses(selectedSurah.id);
  }, [selectedSurah]);

  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem('quranSettings');
      if (settings) {
        const parsed = JSON.parse(settings);
        setFontSize(parsed.fontSize || 18);
        setShowTranslation(parsed.showTranslation !== false);
        setShowTransliteration(parsed.showTransliteration || false);
        setScriptType(parsed.scriptType || 'standard');
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('quranSettings', JSON.stringify({
        fontSize,
        showTranslation,
        showTransliteration,
        scriptType,
      }));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const loadBookmarks = async () => {
    try {
      const saved = await AsyncStorage.getItem('quranBookmarks');
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  const toggleBookmark = async (verseId: number) => {
    const updated = bookmarks.includes(verseId)
      ? bookmarks.filter(id => id !== verseId)
      : [...bookmarks, verseId];
    setBookmarks(updated);
    await AsyncStorage.setItem('quranBookmarks', JSON.stringify(updated));
  };

  const loadVerses = async (surahId: number) => {
    setIsLoading(true);
    try {
      console.log('Loading verses for surah:', surahId);
      
      // Get the expected number of verses for this surah
      const surah = surahList.find((s: Surah) => s.id === surahId);
      const expectedVerses = surah?.verses || 0;
      
      // Fetch from Quran API with per_page parameter to get all verses (max 300 to ensure we get all)
      const response = await fetch(`https://api.quran.com/api/v4/verses/by_chapter/${surahId}?language=en&words=false&translations=131&fields=text_uthmani,text_imlaei&per_page=300`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response for surah', surahId, ':', data.verses?.length, 'verses loaded, expected:', expectedVerses);
      
      if (data.verses && Array.isArray(data.verses)) {
        const formattedVerses: Verse[] = data.verses.map((verse: any) => ({
          id: verse.id,
          surahId: verse.chapter_id,
          verseNumber: verse.verse_number,
          arabic: verse.text_imlaei || verse.text_uthmani,
          uthmanic: verse.text_uthmani,
          translation: verse.translations?.[0]?.text || 'Translation not available',
          transliteration: `Verse ${verse.verse_number} transliteration`
        }));
        
        console.log('Formatted verses:', formattedVerses.length, 'out of expected:', expectedVerses);
        setAllVerses(formattedVerses);
      } else {
        console.warn('No verses found in API response');
        // Fallback to sample data
        if (surahId === 1) {
          setAllVerses(sampleVerses);
        } else {
          setAllVerses([]);
        }
      }
    } catch (error) {
      console.error('Error loading verses:', error);
      
      // Fallback to sample data on error
      if (surahId === 1) {
        setAllVerses(sampleVerses);
      } else {
        // Generate fallback verses
        const surah = surahList.find((s: Surah) => s.id === surahId);
        if (surah) {
          const fallbackVerses: Verse[] = Array.from({ length: Math.min(5, surah.verses) }, (_, i) => ({
            id: surahId * 1000 + i + 1,
            surahId,
            verseNumber: i + 1,
            arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
            uthmanic: 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ',
            translation: `Verse ${i + 1} of ${surah.name}. Please check your internet connection for full content.`,
            transliteration: `Verse ${i + 1} transliteration`
          }));
          setAllVerses(fallbackVerses);
        } else {
          setAllVerses([]);
        }
      }
    } finally {
      setIsLoading(false);
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }
  };

  const navigateSurah = (direction: 'prev' | 'next') => {
    const currentIndex = surahList.findIndex((s: Surah) => s.id === selectedSurah.id);
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedSurah(surahList[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < surahList.length - 1) {
      setSelectedSurah(surahList[currentIndex + 1]);
    }
  };

  const toggleAudio = useCallback(async () => {
    if (isPlaying) {
      if (currentSound) {
        await currentSound.pauseAsync();
        setIsPlaying(false);
      }
    } else {
      try {
        if (Platform.OS !== 'web') {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
          });
        }

        if (currentSound) {
          await currentSound.playAsync();
          setIsPlaying(true);
        } else {
          const reciterNumber = '7';
          const audioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${selectedSurah.id}.mp3`;
          
          const { sound } = await Audio.Sound.createAsync(
            { uri: audioUrl },
            { shouldPlay: true, volume: 1.0 },
            (status) => {
              if (status.isLoaded && status.didJustFinish) {
                setIsPlaying(false);
              }
            }
          );
          
          setCurrentSound(sound);
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  }, [isPlaying, currentSound, selectedSurah.id]);

  useEffect(() => {
    return () => {
      if (currentSound) {
        currentSound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (currentSound) {
      currentSound.unloadAsync();
      setCurrentSound(null);
      setIsPlaying(false);
    }
  }, [selectedSurah.id]);





  const filteredSurahs = surahList.filter((surah: Surah) =>
    surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.arabicName.includes(searchQuery)
  );

  const renderVerse = ({ item }: { item: Verse }) => {
    const isBookmarked = bookmarks.includes(item.id);
    
    return (
      <View style={[styles.verseContainer, { backgroundColor: colors.card }]}>
        <View style={styles.verseHeader}>
          <View style={[styles.verseNumber, { backgroundColor: colors.primary }]}>
            <Text style={[styles.verseNumberText, { color: '#fff' }]}>
              {item.verseNumber}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => toggleBookmark(item.id)}
            style={styles.bookmarkButton}
          >
            <Bookmark
              size={20}
              color={isBookmarked ? colors.primary : colors.textSecondary}
              fill={isBookmarked ? colors.primary : 'transparent'}
            />
          </TouchableOpacity>
        </View>
        
        <Text style={[
          styles.arabicText,
          scriptType === 'uthmanic' ? styles.uthmanicText : styles.standardText,
          { color: colors.text, fontSize: fontSize + 8 }
        ]}>
          {scriptType === 'uthmanic' ? getUthmanicText(item) : item.arabic}
        </Text>
        
        {showTransliteration && (
          <Text style={[
            styles.transliterationText,
            { color: colors.textSecondary, fontSize: fontSize - 2 }
          ]}>
            {item.transliteration}
          </Text>
        )}
        
        {showTranslation && (
          <Text style={[
            styles.translationText,
            { color: colors.text, fontSize: fontSize }
          ]}>
            {item.translation}
          </Text>
        )}
      </View>
    );
  };



  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: t('quran') || 'Quran',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#FFFFFF',
          headerLeft: () => (
            <View style={styles.headerLeftContainer}>
              <TouchableOpacity
                style={[
                  styles.headerNavButton,
                  selectedSurah.id === 1 && styles.headerNavButtonDisabled
                ]}
                onPress={() => navigateSurah('prev')}
                disabled={selectedSurah.id === 1}
              >
                <ChevronLeft size={16} color={selectedSurah.id === 1 ? 'rgba(255,255,255,0.5)' : '#FFFFFF'} />
              </TouchableOpacity>
              <Text style={styles.headerPageInfo}>{t('step')} {selectedSurah.id}</Text>
              <TouchableOpacity
                style={[
                  styles.headerNavButton,
                  selectedSurah.id === 114 && styles.headerNavButtonDisabled
                ]}
                onPress={() => navigateSurah('next')}
                disabled={selectedSurah.id === 114}
              >
                <ChevronRight size={16} color={selectedSurah.id === 114 ? 'rgba(255,255,255,0.5)' : '#FFFFFF'} />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => {
                console.log('Settings button pressed');
                setShowSettings(true);
              }} 
              style={[styles.headerButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
              testID="settings-button"
              activeOpacity={0.7}
            >
              <Settings size={20} color="#FFFFFF" />
            </TouchableOpacity>
          ),
        }}
      />
      
      {/* Surah Selection Header */}
      <View style={[styles.surahHeaderContainer, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={styles.surahSelector}
          onPress={() => setShowSurahList(true)}
        >
          <Text style={[styles.surahName, { color: colors.text }]}>
            {selectedSurah.arabicName}
          </Text>
          <Text style={[styles.surahInfo, { color: colors.textSecondary }]}>
            {selectedSurah.name} • {allVerses.length} verses • {selectedSurah.revelationType}
          </Text>
        </TouchableOpacity>
        
        {/* Audio Controls */}
        <TouchableOpacity
          style={[styles.audioControlButton, { backgroundColor: colors.primary }]}
          onPress={toggleAudio}
          activeOpacity={0.7}
        >
          {isPlaying ? (
            <Pause size={20} color="#FFFFFF" />
          ) : (
            <Play size={20} color="#FFFFFF" />
          )}
          <Text style={styles.audioControlText}>
            {isPlaying ? 'Pause' : 'Listen'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Verses */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          ref={scrollViewRef as any}
          data={allVerses}
          renderItem={renderVerse}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.versesContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Surah List Modal */}
      <Modal
        visible={showSurahList}
        animationType="slide"
        transparent={true}
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
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
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
                    <Text style={[styles.surahItemName, { color: colors.text }]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.surahItemInfo, { color: colors.textSecondary }]}>
                      {item.englishName} • {item.verses} verses
                    </Text>
                  </View>
                  <Text style={[styles.surahItemArabic, { color: colors.text }]}>
                    {item.arabicName}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Settings Modal */}
      <Modal
        visible={showSettings}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          console.log('Settings modal closed');
          setShowSettings(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.settingsModal, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>{t('settings') || 'Settings'}</Text>
              <TouchableOpacity onPress={() => {
                setShowSettings(false);
                saveSettings();
              }}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.settingItem}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>{t('fontSize' as any) || 'Font Size'}</Text>
              <View style={styles.fontSizeControls}>
                <TouchableOpacity
                  style={[styles.fontSizeButton, { backgroundColor: colors.background }]}
                  onPress={() => setFontSize(Math.max(12, fontSize - 2))}
                >
                  <Text style={{ color: colors.text }}>A-</Text>
                </TouchableOpacity>
                <Text style={[styles.fontSizeValue, { color: colors.text }]}>{fontSize}</Text>
                <TouchableOpacity
                  style={[styles.fontSizeButton, { backgroundColor: colors.background }]}
                  onPress={() => setFontSize(Math.min(30, fontSize + 2))}
                >
                  <Text style={{ color: colors.text }}>A+</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => setShowTranslation(!showTranslation)}
            >
              <Text style={[styles.settingLabel, { color: colors.text }]}>{t('showTranslation' as any) || 'Show Translation'}</Text>
              <View style={[styles.toggle, showTranslation && styles.toggleActive, { backgroundColor: showTranslation ? colors.primary : colors.border }]}>
                <View style={[styles.toggleThumb, showTranslation && styles.toggleThumbActive]} />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => setShowTransliteration(!showTransliteration)}
            >
              <Text style={[styles.settingLabel, { color: colors.text }]}>{t('showTransliteration' as any) || 'Show Transliteration'}</Text>
              <View style={[styles.toggle, showTransliteration && styles.toggleActive, { backgroundColor: showTransliteration ? colors.primary : colors.border }]}>
                <View style={[styles.toggleThumb, showTransliteration && styles.toggleThumbActive]} />
              </View>
            </TouchableOpacity>
            
            <View style={styles.settingItem}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>{t('arabicScript' as any) || 'Arabic Script'}</Text>
              <View style={styles.scriptSelector}>
                <TouchableOpacity
                  style={[
                    styles.scriptButton,
                    { backgroundColor: scriptType === 'standard' ? colors.primary : colors.background },
                  ]}
                  onPress={() => setScriptType('standard')}
                >
                  <Text style={[
                    styles.scriptButtonText,
                    { color: scriptType === 'standard' ? '#fff' : colors.text }
                  ]}>{t('standard' as any) || 'Standard'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.scriptButton,
                    { backgroundColor: scriptType === 'uthmanic' ? colors.primary : colors.background },
                  ]}
                  onPress={() => setScriptType('uthmanic')}
                >
                  <Text style={[
                    styles.scriptButtonText,
                    { color: scriptType === 'uthmanic' ? '#fff' : colors.text }
                  ]}>{t('uthmanic' as any) || 'Uthmanic'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerNavButton: {
    padding: 4,
    borderRadius: 4,
  },
  headerNavButtonDisabled: {
    opacity: 0.5,
  },
  headerPageInfo: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
    minWidth: 60,
    textAlign: 'center',
  },
  headerButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 8,
    minWidth: 36,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surahHeaderContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  surahSelector: {
    alignItems: 'center',
    marginBottom: 12,
  },
  audioControlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  audioControlText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  surahName: {
    fontSize: 24,
    fontWeight: '600',
  },
  surahInfo: {
    fontSize: 12,
    marginTop: 2,
  },


  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  versesContainer: {
    padding: 16,
    paddingTop: 8,
  },
  verseContainer: {
    marginBottom: 20,
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
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verseNumberText: {
    fontSize: 14,
    fontWeight: '600',
  },
  bookmarkButton: {
    padding: 4,
  },
  arabicText: {
    fontSize: 26,
    lineHeight: 40,
    textAlign: 'right',
    marginBottom: 12,
  },
  transliterationText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  translationText: {
    fontSize: 18,
    lineHeight: 26,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  searchInput: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  surahItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  surahNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surahNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  surahItemContent: {
    flex: 1,
    marginLeft: 12,
  },
  surahItemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  surahItemInfo: {
    fontSize: 12,
    marginTop: 2,
  },
  surahItemArabic: {
    fontSize: 18,
    fontWeight: '500',
  },
  settingsModal: {
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  settingLabel: {
    fontSize: 16,
  },
  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  fontSizeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontSizeValue: {
    fontSize: 16,
    minWidth: 30,
    textAlign: 'center',
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    padding: 2,
  },
  toggleActive: {
    justifyContent: 'flex-end',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  standardText: {
    fontFamily: 'System',
  },
  uthmanicText: {
    fontFamily: 'System',
    letterSpacing: 1,
    lineHeight: 45,
  },
  scriptSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  scriptButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  scriptButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  surahNavButtonDisabled: {
    opacity: 0.5,
  },

});