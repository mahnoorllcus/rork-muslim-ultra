import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Book,
  Play,
  Pause,
  Volume2,
  ChevronRight,
  Star,
  Bookmark,
  RotateCcw,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Surah {
  id: number;
  name: string;
  arabicName: string;
  englishName: string;
  verses: number;
  revelation: 'Meccan' | 'Medinan';
  meaning: string;
  isBookmarked: boolean;
}

const ammaparaSurahs: Surah[] = [
  {
    id: 78,
    name: 'An-Naba',
    arabicName: 'النبأ',
    englishName: 'The Tidings',
    verses: 40,
    revelation: 'Meccan',
    meaning: 'The Great News',
    isBookmarked: false,
  },
  {
    id: 79,
    name: 'An-Naziat',
    arabicName: 'النازعات',
    englishName: 'Those Who Drag Forth',
    verses: 46,
    revelation: 'Meccan',
    meaning: 'Those Who Tear Out',
    isBookmarked: true,
  },
  {
    id: 80,
    name: 'Abasa',
    arabicName: 'عبس',
    englishName: 'He Frowned',
    verses: 42,
    revelation: 'Meccan',
    meaning: 'He Frowned',
    isBookmarked: false,
  },
  {
    id: 81,
    name: 'At-Takwir',
    arabicName: 'التكوير',
    englishName: 'The Overthrowing',
    verses: 29,
    revelation: 'Meccan',
    meaning: 'The Folding Up',
    isBookmarked: false,
  },
  {
    id: 82,
    name: 'Al-Infitar',
    arabicName: 'الإنفطار',
    englishName: 'The Cleaving',
    verses: 19,
    revelation: 'Meccan',
    meaning: 'The Cleaving Asunder',
    isBookmarked: false,
  },
  {
    id: 83,
    name: 'Al-Mutaffifin',
    arabicName: 'المطففين',
    englishName: 'The Defrauding',
    verses: 36,
    revelation: 'Meccan',
    meaning: 'Those Who Give Short Measure',
    isBookmarked: false,
  },
  {
    id: 84,
    name: 'Al-Inshiqaq',
    arabicName: 'الإنشقاق',
    englishName: 'The Splitting Open',
    verses: 25,
    revelation: 'Meccan',
    meaning: 'The Rending Asunder',
    isBookmarked: false,
  },
  {
    id: 85,
    name: 'Al-Buruj',
    arabicName: 'البروج',
    englishName: 'The Mansions of Stars',
    verses: 22,
    revelation: 'Meccan',
    meaning: 'The Constellations',
    isBookmarked: false,
  },
  {
    id: 86,
    name: 'At-Tariq',
    arabicName: 'الطارق',
    englishName: 'The Morning Star',
    verses: 17,
    revelation: 'Meccan',
    meaning: 'The Night Visitant',
    isBookmarked: false,
  },
  {
    id: 87,
    name: 'Al-Ala',
    arabicName: 'الأعلى',
    englishName: 'The Most High',
    verses: 19,
    revelation: 'Meccan',
    meaning: 'The Most High',
    isBookmarked: true,
  },
  {
    id: 88,
    name: 'Al-Ghashiyah',
    arabicName: 'الغاشية',
    englishName: 'The Overwhelming',
    verses: 26,
    revelation: 'Meccan',
    meaning: 'The Overwhelming Event',
    isBookmarked: false,
  },
  {
    id: 89,
    name: 'Al-Fajr',
    arabicName: 'الفجر',
    englishName: 'The Dawn',
    verses: 30,
    revelation: 'Meccan',
    meaning: 'The Break of Day',
    isBookmarked: false,
  },
  {
    id: 90,
    name: 'Al-Balad',
    arabicName: 'البلد',
    englishName: 'The City',
    verses: 20,
    revelation: 'Meccan',
    meaning: 'The City',
    isBookmarked: false,
  },
  {
    id: 91,
    name: 'Ash-Shams',
    arabicName: 'الشمس',
    englishName: 'The Sun',
    verses: 15,
    revelation: 'Meccan',
    meaning: 'The Sun',
    isBookmarked: false,
  },
  {
    id: 92,
    name: 'Al-Layl',
    arabicName: 'الليل',
    englishName: 'The Night',
    verses: 21,
    revelation: 'Meccan',
    meaning: 'The Night',
    isBookmarked: false,
  },
  {
    id: 93,
    name: 'Ad-Duha',
    arabicName: 'الضحى',
    englishName: 'The Morning Hours',
    verses: 11,
    revelation: 'Meccan',
    meaning: 'The Glorious Morning Light',
    isBookmarked: true,
  },
  {
    id: 94,
    name: 'Ash-Sharh',
    arabicName: 'الشرح',
    englishName: 'The Relief',
    verses: 8,
    revelation: 'Meccan',
    meaning: 'The Opening Up of the Heart',
    isBookmarked: false,
  },
  {
    id: 95,
    name: 'At-Tin',
    arabicName: 'التين',
    englishName: 'The Fig',
    verses: 8,
    revelation: 'Meccan',
    meaning: 'The Fig',
    isBookmarked: false,
  },
  {
    id: 96,
    name: 'Al-Alaq',
    arabicName: 'العلق',
    englishName: 'The Clot',
    verses: 19,
    revelation: 'Meccan',
    meaning: 'The Clinging Clot',
    isBookmarked: false,
  },
  {
    id: 97,
    name: 'Al-Qadr',
    arabicName: 'القدر',
    englishName: 'The Power',
    verses: 5,
    revelation: 'Meccan',
    meaning: 'The Night of Decree',
    isBookmarked: true,
  },
  {
    id: 98,
    name: 'Al-Bayyinah',
    arabicName: 'البينة',
    englishName: 'The Evidence',
    verses: 8,
    revelation: 'Medinan',
    meaning: 'The Clear Proof',
    isBookmarked: false,
  },
  {
    id: 99,
    name: 'Az-Zalzalah',
    arabicName: 'الزلزلة',
    englishName: 'The Earthquake',
    verses: 8,
    revelation: 'Medinan',
    meaning: 'The Earthquake',
    isBookmarked: false,
  },
  {
    id: 100,
    name: 'Al-Adiyat',
    arabicName: 'العاديات',
    englishName: 'The Courser',
    verses: 11,
    revelation: 'Meccan',
    meaning: 'Those That Run',
    isBookmarked: false,
  },
  {
    id: 101,
    name: 'Al-Qariah',
    arabicName: 'القارعة',
    englishName: 'The Calamity',
    verses: 11,
    revelation: 'Meccan',
    meaning: 'The Striking Hour',
    isBookmarked: false,
  },
  {
    id: 102,
    name: 'At-Takathur',
    arabicName: 'التكاثر',
    englishName: 'The Rivalry',
    verses: 8,
    revelation: 'Meccan',
    meaning: 'The Piling Up',
    isBookmarked: false,
  },
  {
    id: 103,
    name: 'Al-Asr',
    arabicName: 'العصر',
    englishName: 'The Declining Day',
    verses: 3,
    revelation: 'Meccan',
    meaning: 'The Time',
    isBookmarked: true,
  },
  {
    id: 104,
    name: 'Al-Humazah',
    arabicName: 'الهمزة',
    englishName: 'The Traducer',
    verses: 9,
    revelation: 'Meccan',
    meaning: 'The Slanderer',
    isBookmarked: false,
  },
  {
    id: 105,
    name: 'Al-Fil',
    arabicName: 'الفيل',
    englishName: 'The Elephant',
    verses: 5,
    revelation: 'Meccan',
    meaning: 'The Elephant',
    isBookmarked: false,
  },
  {
    id: 106,
    name: 'Quraysh',
    arabicName: 'قريش',
    englishName: 'Quraysh',
    verses: 4,
    revelation: 'Meccan',
    meaning: 'The Quraysh',
    isBookmarked: false,
  },
  {
    id: 107,
    name: 'Al-Maun',
    arabicName: 'الماعون',
    englishName: 'The Small Kindnesses',
    verses: 7,
    revelation: 'Meccan',
    meaning: 'The Neighbourly Assistance',
    isBookmarked: false,
  },
  {
    id: 108,
    name: 'Al-Kawthar',
    arabicName: 'الكوثر',
    englishName: 'The Abundance',
    verses: 3,
    revelation: 'Meccan',
    meaning: 'The River of Abundance',
    isBookmarked: false,
  },
  {
    id: 109,
    name: 'Al-Kafirun',
    arabicName: 'الكافرون',
    englishName: 'The Disbelievers',
    verses: 6,
    revelation: 'Meccan',
    meaning: 'Those Who Deny the Truth',
    isBookmarked: false,
  },
  {
    id: 110,
    name: 'An-Nasr',
    arabicName: 'النصر',
    englishName: 'The Divine Support',
    verses: 3,
    revelation: 'Medinan',
    meaning: 'The Help',
    isBookmarked: false,
  },
  {
    id: 111,
    name: 'Al-Masad',
    arabicName: 'المسد',
    englishName: 'The Palm Fibre',
    verses: 5,
    revelation: 'Meccan',
    meaning: 'The Twisted Strands',
    isBookmarked: false,
  },
  {
    id: 112,
    name: 'Al-Ikhlas',
    arabicName: 'الإخلاص',
    englishName: 'The Sincerity',
    verses: 4,
    revelation: 'Meccan',
    meaning: 'The Purity of Faith',
    isBookmarked: true,
  },
  {
    id: 113,
    name: 'Al-Falaq',
    arabicName: 'الفلق',
    englishName: 'The Dawn',
    verses: 5,
    revelation: 'Meccan',
    meaning: 'The Daybreak',
    isBookmarked: false,
  },
  {
    id: 114,
    name: 'An-Nas',
    arabicName: 'الناس',
    englishName: 'Mankind',
    verses: 6,
    revelation: 'Meccan',
    meaning: 'The People',
    isBookmarked: false,
  },
];

export default function AmmaparaScreen() {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [surahs, setSurahs] = useState<Surah[]>(ammaparaSurahs);

  const bookmarkedSurahs = surahs.filter(surah => surah.isBookmarked);
  const totalVerses = surahs.reduce((total, surah) => total + surah.verses, 0);

  const handleSurahPress = (surah: Surah) => {
    setSelectedSurah(surah);
  };

  const navigateToQuran = (surahId: number) => {
    console.log('Navigating to Quran with surah ID:', surahId);
    router.push(`/quran?surah=${surahId}`);
  };

  const toggleBookmark = (surahId: number) => {
    setSurahs(prevSurahs =>
      prevSurahs.map(surah =>
        surah.id === surahId
          ? { ...surah, isBookmarked: !surah.isBookmarked }
          : surah
      )
    );
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // Here you would implement actual audio playback
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen
        options={{
          title: 'Ammapara (Para 30)',
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <LinearGradient
          colors={['#1B5E20', '#2E7D32', '#388E3C']}
          style={styles.headerSection}
        >
          <View style={styles.headerContent}>
            <Book size={48} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Ammapara</Text>
            <Text style={styles.headerSubtitle}>
              30th Para of the Holy Quran
            </Text>
            
            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{surahs.length}</Text>
                <Text style={styles.statLabel}>Surahs</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{totalVerses}</Text>
                <Text style={styles.statLabel}>Verses</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{bookmarkedSurahs.length}</Text>
                <Text style={styles.statLabel}>Bookmarked</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Access */}
        <View style={styles.quickAccessSection}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.quickAccessCard} activeOpacity={0.7}>
              <LinearGradient
                colors={['#1B5E20', '#2E7D32']}
                style={styles.quickAccessGradient}
              >
                <Star size={24} color="#FFFFFF" />
                <Text style={styles.quickAccessText}>Favorites</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAccessCard} activeOpacity={0.7}>
              <LinearGradient
                colors={['#2E7D32', '#388E3C']}
                style={styles.quickAccessGradient}
              >
                <RotateCcw size={24} color="#FFFFFF" />
                <Text style={styles.quickAccessText}>Recently Read</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAccessCard} activeOpacity={0.7}>
              <LinearGradient
                colors={['#388E3C', '#43A047']}
                style={styles.quickAccessGradient}
              >
                <Volume2 size={24} color="#FFFFFF" />
                <Text style={styles.quickAccessText}>Audio Mode</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Surahs List */}
        <View style={styles.surahsSection}>
          <Text style={styles.sectionTitle}>Surahs in Ammapara</Text>
          
          {surahs.map((surah) => (
            <TouchableOpacity
              key={surah.id}
              style={[
                styles.surahCard,
                selectedSurah?.id === surah.id && styles.selectedSurahCard,
              ]}
              onPress={() => {
                handleSurahPress(surah);
                navigateToQuran(surah.id);
              }}
              activeOpacity={0.7}
            >
              <View style={styles.surahHeader}>
                <View style={styles.surahNumber}>
                  <Text style={styles.surahNumberText}>{surah.id}</Text>
                </View>
                
                <View style={styles.surahInfo}>
                  <View style={styles.surahTitleRow}>
                    <Text style={styles.surahName}>{surah.name}</Text>
                    <TouchableOpacity
                      onPress={() => toggleBookmark(surah.id)}
                      activeOpacity={0.7}
                    >
                      <Bookmark
                        size={20}
                        color={surah.isBookmarked ? '#FFD700' : theme.colors.textSecondary}
                        fill={surah.isBookmarked ? '#FFD700' : 'transparent'}
                      />
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.surahArabicName}>{surah.arabicName}</Text>
                  <Text style={styles.surahEnglishName}>{surah.englishName}</Text>
                  
                  <View style={styles.surahMeta}>
                    <Text style={styles.surahMetaText}>{surah.verses} verses</Text>
                    <Text style={styles.surahMetaDot}>•</Text>
                    <Text style={styles.surahMetaText}>{surah.revelation}</Text>
                  </View>
                </View>
                
                <ChevronRight size={20} color={theme.colors.textSecondary} />
              </View>
              
              <Text style={styles.surahMeaning}>Meaning: {surah.meaning}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Selected Surah Detail */}
        {selectedSurah && (
          <View style={styles.surahDetailSection}>
            <Text style={styles.sectionTitle}>Now Reading</Text>
            
            <View style={styles.readingCard}>
              <LinearGradient
                colors={['#E8F5E8', '#C8E6C9', '#A5D6A7']}
                style={styles.readingGradient}
              >
                <View style={styles.readingHeader}>
                  <Text style={styles.readingTitle}>{selectedSurah.name}</Text>
                  <Text style={styles.readingArabic}>{selectedSurah.arabicName}</Text>
                </View>
                
                <Text style={styles.readingMeaning}>{selectedSurah.meaning}</Text>
                
                <View style={styles.readingMeta}>
                  <Text style={styles.readingMetaText}>
                    Surah {selectedSurah.id} • {selectedSurah.verses} verses • {selectedSurah.revelation}
                  </Text>
                </View>
                
                <View style={styles.audioControls}>
                  <TouchableOpacity
                    style={styles.audioButton}
                    onPress={toggleAudio}
                    activeOpacity={0.7}
                  >
                    {isPlaying ? (
                      <Pause size={24} color="#FFFFFF" />
                    ) : (
                      <Play size={24} color="#FFFFFF" />
                    )}
                    <Text style={styles.audioButtonText}>
                      {isPlaying ? 'Pause Recitation' : 'Play Recitation'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </View>
        )}

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features</Text>
          
          <View style={styles.featureCard}>
            <Book size={20} color="#1B5E20" />
            <Text style={styles.featureText}>
              Arabic text with Uthmanic script for authentic reading experience
            </Text>
          </View>
          
          <View style={styles.featureCard}>
            <Volume2 size={20} color="#1B5E20" />
            <Text style={styles.featureText}>
              High-quality audio recitation by renowned Qaris
            </Text>
          </View>
          
          <View style={styles.featureCard}>
            <Star size={20} color="#1B5E20" />
            <Text style={styles.featureText}>
              Word-by-word translation and transliteration
            </Text>
          </View>
          
          <View style={styles.featureCard}>
            <Bookmark size={20} color="#1B5E20" />
            <Text style={styles.featureText}>
              Bookmark your favorite surahs for quick access
            </Text>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (theme: ReturnType<typeof useTheme>) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerSection: {
    padding: 30,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 15,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 25,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 15,
  },
  quickAccessSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 15,
  },
  quickAccessCard: {
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  quickAccessGradient: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    minWidth: 120,
    gap: 8,
  },
  quickAccessText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  surahsSection: {
    padding: 20,
    paddingTop: 0,
  },
  surahCard: {
    backgroundColor: theme.colors.cardBg,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
  },
  selectedSurahCard: {
    borderColor: '#1B5E20',
    backgroundColor: theme.isDark ? '#1B2A1B' : '#E8F5E8',
  },
  surahHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  surahNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1B5E20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  surahNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  surahInfo: {
    flex: 1,
  },
  surahTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  surahName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  surahArabicName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'right',
    marginBottom: 4,
  },
  surahEnglishName: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  surahMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  surahMetaText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  surahMetaDot: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginHorizontal: 8,
  },
  surahMeaning: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
    backgroundColor: theme.isDark ? '#1A1A1A' : '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  surahDetailSection: {
    padding: 20,
    paddingTop: 0,
  },
  readingCard: {
    borderRadius: 15,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },
  readingGradient: {
    padding: 25,
  },
  readingHeader: {
    alignItems: 'center',
    marginBottom: 15,
  },
  readingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },
  readingArabic: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
  },
  readingMeaning: {
    fontSize: 16,
    color: '#388E3C',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  readingMeta: {
    alignItems: 'center',
    marginBottom: 20,
  },
  readingMetaText: {
    fontSize: 14,
    color: '#388E3C',
    opacity: 0.8,
  },
  audioControls: {
    alignItems: 'center',
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B5E20',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
    gap: 10,
  },
  audioButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  featuresSection: {
    padding: 20,
    paddingTop: 0,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.cardBg,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    gap: 12,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 30,
  },
});