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
import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  BookOpen,
  Play,
  Pause,
  Volume2,
  ChevronRight,
  Star,
  CheckCircle,
  Sparkles,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface Lesson {
  id: number;
  title: string;
  arabicText: string;
  transliteration: string;
  description: string;
  completed: boolean;
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Arabic Alphabets - Part 1',
    arabicText: 'أ ب ت ث ج ح خ',
    transliteration: 'Alif, Ba, Ta, Tha, Jeem, Ha, Kha',
    description: 'Learn the first 7 letters of the Arabic alphabet.',
    completed: true,
  },
  {
    id: 2,
    title: 'Arabic Alphabets - Part 2',
    arabicText: 'د ذ ر ز س ش ص',
    transliteration: 'Dal, Dhal, Ra, Zay, Seen, Sheen, Sad',
    description: 'Continue learning the next 7 letters.',
    completed: true,
  },
  {
    id: 3,
    title: 'Arabic Alphabets - Part 3',
    arabicText: 'ض ط ظ ع غ ف ق',
    transliteration: 'Dad, Ta, Dha, Ayn, Ghayn, Fa, Qaf',
    description: 'Learn the third set of Arabic letters.',
    completed: false,
  },
  {
    id: 4,
    title: 'Arabic Alphabets - Part 4',
    arabicText: 'ك ل م ن ه و ي',
    transliteration: 'Kaf, Lam, Meem, Noon, Ha, Waw, Ya',
    description: 'Complete the Arabic alphabet.',
    completed: false,
  },
  {
    id: 5,
    title: 'Letter Joining',
    arabicText: 'با تا ثا جا حا خا',
    transliteration: 'Ba, Ta, Tha, Ja, Ha, Kha',
    description: 'Learn how letters connect to form words.',
    completed: false,
  },
  {
    id: 6,
    title: 'Short Vowels (Harakat)',
    arabicText: 'بَ بِ بُ',
    transliteration: 'Ba, Bi, Bu',
    description: 'Learn Fatha, Kasra, and Damma vowel marks.',
    completed: false,
  },
  {
    id: 7,
    title: 'Long Vowels',
    arabicText: 'بَا بِي بُو',
    transliteration: 'Baa, Bee, Boo',
    description: 'Practice long vowel sounds.',
    completed: false,
  },
  {
    id: 8,
    title: 'Simple Words',
    arabicText: 'كتاب قلم بيت',
    transliteration: 'Kitab, Qalam, Bayt',
    description: 'Read your first Arabic words: Book, Pen, House.',
    completed: false,
  },
  {
    id: 9,
    title: 'Islamic Words',
    arabicText: 'الله الرحمن الرحيم',
    transliteration: 'Allah Ar-Rahman Ar-Raheem',
    description: 'Learn the most beautiful names of Allah.',
    completed: false,
  },
  {
    id: 10,
    title: 'Al-Fatiha Practice',
    arabicText: 'الحمد لله رب العالمين',
    transliteration: 'Alhamdu lillahi rabbil alameen',
    description: 'Practice reading the opening chapter.',
    completed: false,
  },
];

export default function NuraniQaidaScreen() {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;

  const handleLessonPress = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // Here you would implement actual audio playback
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen
        options={{
          title: 'Nurani Qaida',
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
            <BookOpen size={48} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Nurani Qaida</Text>
            <Text style={styles.headerSubtitle}>
              Learn to read Arabic step by step
            </Text>
            
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[styles.progressFill, { width: `${progressPercentage}%` }]} 
                />
              </View>
              <Text style={styles.progressText}>
                {completedLessons}/{lessons.length} lessons completed
              </Text>
            </View>

            {/* Arabic Alphabet Button */}
            <TouchableOpacity
              style={styles.alphabetButton}
              onPress={() => router.push('/arabic-alphabet')}
              activeOpacity={0.7}
            >
              <Sparkles size={24} color="#FFFFFF" />
              <Text style={styles.alphabetButtonText}>Arabic Alphabet</Text>
              <ChevronRight size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Lessons List */}
        <View style={styles.lessonsSection}>
          <Text style={styles.sectionTitle}>Lessons</Text>
          
          {lessons.map((lesson) => (
            <TouchableOpacity
              key={lesson.id}
              style={[
                styles.lessonCard,
                selectedLesson?.id === lesson.id && styles.selectedLessonCard,
              ]}
              onPress={() => handleLessonPress(lesson)}
              activeOpacity={0.7}
            >
              <View style={styles.lessonHeader}>
                <View style={styles.lessonNumber}>
                  {lesson.completed ? (
                    <CheckCircle size={24} color="#4CAF50" />
                  ) : (
                    <Text style={styles.lessonNumberText}>{lesson.id}</Text>
                  )}
                </View>
                <View style={styles.lessonInfo}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonDescription}>{lesson.description}</Text>
                </View>
                <ChevronRight size={20} color={theme.colors.textSecondary} />
              </View>
              
              {/* Arabic Text */}
              <View style={styles.arabicSection}>
                <Text style={styles.arabicText}>{lesson.arabicText}</Text>
                <Text style={styles.transliterationText}>{lesson.transliteration}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Selected Lesson Detail */}
        {selectedLesson && (
          <View style={styles.lessonDetailSection}>
            <Text style={styles.sectionTitle}>Practice</Text>
            
            <View style={styles.practiceCard}>
              <LinearGradient
                colors={['#E8F5E8', '#C8E6C9', '#A5D6A7']}
                style={styles.practiceGradient}
              >
                <Text style={styles.practiceTitle}>{selectedLesson.title}</Text>
                
                <View style={styles.practiceContent}>
                  <Text style={styles.practiceArabic}>{selectedLesson.arabicText}</Text>
                  <Text style={styles.practiceTransliteration}>{selectedLesson.transliteration}</Text>
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
                      {isPlaying ? 'Pause' : 'Listen'}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.volumeButton} activeOpacity={0.7}>
                    <Volume2 size={20} color="#1B5E20" />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </View>
        )}

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Learning Tips</Text>
          
          <View style={styles.tipCard}>
            <Star size={20} color="#FFD700" />
            <Text style={styles.tipText}>
              Practice each lesson multiple times before moving to the next one.
            </Text>
          </View>
          
          <View style={styles.tipCard}>
            <Star size={20} color="#FFD700" />
            <Text style={styles.tipText}>
              Listen to the pronunciation carefully and repeat after the audio.
            </Text>
          </View>
          
          <View style={styles.tipCard}>
            <Star size={20} color="#FFD700" />
            <Text style={styles.tipText}>
              Write the letters and words to improve your recognition.
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
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  alphabetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
    gap: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  alphabetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  lessonsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 15,
  },
  lessonCard: {
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
  selectedLessonCard: {
    borderColor: '#1B5E20',
    backgroundColor: theme.isDark ? '#1B2A1B' : '#E8F5E8',
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  lessonNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1B5E20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  lessonNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  arabicSection: {
    backgroundColor: theme.isDark ? '#1A1A1A' : '#F8F9FA',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  arabicText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 36,
  },
  transliterationText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  lessonDetailSection: {
    padding: 20,
    paddingTop: 0,
  },
  practiceCard: {
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
  practiceGradient: {
    padding: 25,
    alignItems: 'center',
  },
  practiceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 20,
    textAlign: 'center',
  },
  practiceContent: {
    alignItems: 'center',
    marginBottom: 25,
  },
  practiceArabic: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 48,
  },
  practiceTransliteration: {
    fontSize: 18,
    color: '#388E3C',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  audioControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B5E20',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  audioButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  volumeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(27, 94, 32, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipsSection: {
    padding: 20,
    paddingTop: 0,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.cardBg,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    gap: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 30,
  },
});

import React, { useState, useEffect, useRef, useMemo } from 'react';

// ─── Data ───────────────────────────────────────────────────────────────────

const CHAPTERS = [
  {
    id: 1,
    slug: 'alphabets-1',
    title: 'Arabic Alphabet — Part 1',
    subtitle: 'First 7 letters',
    icon: '١',
    color: '#0F6E56',
    bg: '#E1F5EE',
    accent: '#5DCAA5',
    letters: [
      { ar: 'أ', name: 'Alif', sound: 'A as in apple', example: 'أَسَد', exampleMeaning: 'Lion' },
      { ar: 'ب', name: 'Ba', sound: 'B as in book', example: 'بَيْت', exampleMeaning: 'House' },
      { ar: 'ت', name: 'Ta', sound: 'T as in tea', example: 'تُفَّاح', exampleMeaning: 'Apple' },
      { ar: 'ث', name: 'Tha', sound: 'Th as in think', example: 'ثَعْلَب', exampleMeaning: 'Fox' },
      { ar: 'ج', name: 'Jeem', sound: 'J as in jam', example: 'جَمَل', exampleMeaning: 'Camel' },
      { ar: 'ح', name: 'Ha', sound: 'Breathy H sound', example: 'حَمَام', exampleMeaning: 'Pigeon' },
      { ar: 'خ', name: 'Kha', sound: 'KH guttural sound', example: 'خَيْل', exampleMeaning: 'Horse' },
    ],
    practice: 'أ ب ت ث ج ح خ',
    practiceRoman: 'Alif · Ba · Ta · Tha · Jeem · Ha · Kha',
    completed: true,
  },
  {
    id: 2,
    slug: 'alphabets-2',
    title: 'Arabic Alphabet — Part 2',
    subtitle: 'Letters 8–14',
    icon: '٢',
    color: '#185FA5',
    bg: '#E6F1FB',
    accent: '#378ADD',
    letters: [
      { ar: 'د', name: 'Dal', sound: 'D as in door', example: 'دَار', exampleMeaning: 'Home' },
      { ar: 'ذ', name: 'Dhal', sound: 'Th as in this', example: 'ذَهَب', exampleMeaning: 'Gold' },
      { ar: 'ر', name: 'Ra', sound: 'Rolled R', example: 'رَجُل', exampleMeaning: 'Man' },
      { ar: 'ز', name: 'Zay', sound: 'Z as in zero', example: 'زَهْرَة', exampleMeaning: 'Flower' },
      { ar: 'س', name: 'Seen', sound: 'S as in sun', example: 'سَمَاء', exampleMeaning: 'Sky' },
      { ar: 'ش', name: 'Sheen', sound: 'SH as in show', example: 'شَمْس', exampleMeaning: 'Sun' },
      { ar: 'ص', name: 'Sad', sound: 'Emphatic S', example: 'صَابُون', exampleMeaning: 'Soap' },
    ],
    practice: 'د ذ ر ز س ش ص',
    practiceRoman: 'Dal · Dhal · Ra · Zay · Seen · Sheen · Sad',
    completed: true,
  },
  {
    id: 3,
    slug: 'alphabets-3',
    title: 'Arabic Alphabet — Part 3',
    subtitle: 'Letters 15–21',
    icon: '٣',
    color: '#854F0B',
    bg: '#FAEEDA',
    accent: '#EF9F27',
    letters: [
      { ar: 'ض', name: 'Dad', sound: 'Emphatic D', example: 'ضَوْء', exampleMeaning: 'Light' },
      { ar: 'ط', name: 'Ta', sound: 'Emphatic T', example: 'طَائِر', exampleMeaning: 'Bird' },
      { ar: 'ظ', name: 'Dha', sound: 'Emphatic Dh', example: 'ظِل', exampleMeaning: 'Shadow' },
      { ar: 'ع', name: 'Ayn', sound: 'Deep guttural sound', example: 'عَيْن', exampleMeaning: 'Eye' },
      { ar: 'غ', name: 'Ghayn', sound: 'French R sound', example: 'غَزَال', exampleMeaning: 'Gazelle' },
      { ar: 'ف', name: 'Fa', sound: 'F as in fan', example: 'فِيل', exampleMeaning: 'Elephant' },
      { ar: 'ق', name: 'Qaf', sound: 'Deep Q sound', example: 'قَمَر', exampleMeaning: 'Moon' },
    ],
    practice: 'ض ط ظ ع غ ف ق',
    practiceRoman: 'Dad · Ta · Dha · Ayn · Ghayn · Fa · Qaf',
    completed: false,
  },
  {
    id: 4,
    slug: 'alphabets-4',
    title: 'Arabic Alphabet — Part 4',
    subtitle: 'Final 7 letters',
    icon: '٤',
    color: '#712B13',
    bg: '#FAECE7',
    accent: '#D85A30',
    letters: [
      { ar: 'ك', name: 'Kaf', sound: 'K as in kit', example: 'كِتَاب', exampleMeaning: 'Book' },
      { ar: 'ل', name: 'Lam', sound: 'L as in lamp', example: 'لَيْل', exampleMeaning: 'Night' },
      { ar: 'م', name: 'Meem', sound: 'M as in moon', example: 'مَاء', exampleMeaning: 'Water' },
      { ar: 'ن', name: 'Noon', sound: 'N as in noon', example: 'نَجْمَة', exampleMeaning: 'Star' },
      { ar: 'ه', name: 'Ha', sound: 'H as in hat', example: 'هَوَاء', exampleMeaning: 'Air' },
      { ar: 'و', name: 'Waw', sound: 'W as in way', example: 'وَرْدَة', exampleMeaning: 'Rose' },
      { ar: 'ي', name: 'Ya', sound: 'Y as in yes', example: 'يَد', exampleMeaning: 'Hand' },
    ],
    practice: 'ك ل م ن ه و ي',
    practiceRoman: 'Kaf · Lam · Meem · Noon · Ha · Waw · Ya',
    completed: false,
  },
  {
    id: 5,
    slug: 'letter-joining',
    title: 'Letter Joining',
    subtitle: 'How letters connect',
    icon: '٥',
    color: '#3C3489',
    bg: '#EEEDFE',
    accent: '#7F77DD',
    letters: [
      { ar: 'بَا', name: 'Ba + Alif', sound: 'BAA', example: 'بَاب', exampleMeaning: 'Door' },
      { ar: 'تَا', name: 'Ta + Alif', sound: 'TAA', example: 'تَاج', exampleMeaning: 'Crown' },
      { ar: 'جَا', name: 'Jeem + Alif', sound: 'JAA', example: 'جَاء', exampleMeaning: 'He came' },
      { ar: 'سَا', name: 'Seen + Alif', sound: 'SAA', example: 'سَاق', exampleMeaning: 'Leg' },
      { ar: 'مَا', name: 'Meem + Alif', sound: 'MAA', example: 'مَاء', exampleMeaning: 'Water' },
      { ar: 'نَا', name: 'Noon + Alif', sound: 'NAA', example: 'نَار', exampleMeaning: 'Fire' },
    ],
    practice: 'بَا تَا جَا سَا مَا نَا',
    practiceRoman: 'Baa · Taa · Jaa · Saa · Maa · Naa',
    completed: false,
  },
  {
    id: 6,
    slug: 'short-vowels',
    title: 'Short Vowels (Harakat)',
    subtitle: 'Fatha · Kasra · Damma',
    icon: '٦',
    color: '#085041',
    bg: '#E1F5EE',
    accent: '#1D9E75',
    letters: [
      { ar: 'بَ', name: 'Ba + Fatha', sound: 'BA (short A)', example: 'بَل', exampleMeaning: 'But' },
      { ar: 'بِ', name: 'Ba + Kasra', sound: 'BI (short I)', example: 'بِئر', exampleMeaning: 'Well' },
      { ar: 'بُ', name: 'Ba + Damma', sound: 'BU (short U)', example: 'بُكْرَة', exampleMeaning: 'Tomorrow' },
      { ar: 'تَ', name: 'Ta + Fatha', sound: 'TA', example: 'تَب', exampleMeaning: 'He repented' },
      { ar: 'تِ', name: 'Ta + Kasra', sound: 'TI', example: 'تِين', exampleMeaning: 'Figs' },
      { ar: 'تُ', name: 'Ta + Damma', sound: 'TU', example: 'تُفَّاح', exampleMeaning: 'Apple' },
    ],
    practice: 'بَ بِ بُ — تَ تِ تُ',
    practiceRoman: 'Ba · Bi · Bu — Ta · Ti · Tu',
    completed: false,
  },
  {
    id: 7,
    slug: 'long-vowels',
    title: 'Long Vowels (Madd)',
    subtitle: 'Extend the vowel sound',
    icon: '٧',
    color: '#0C447C',
    bg: '#E6F1FB',
    accent: '#85B7EB',
    letters: [
      { ar: 'بَا', name: 'Alif Madd', sound: 'BAA (long A)', example: 'كِتَاب', exampleMeaning: 'Book' },
      { ar: 'بِي', name: 'Ya Madd', sound: 'BEE (long E/I)', example: 'بِيت', exampleMeaning: 'House' },
      { ar: 'بُو', name: 'Waw Madd', sound: 'BOO (long U)', example: 'نُور', exampleMeaning: 'Light' },
      { ar: 'تَا', name: 'Ta + Alif', sound: 'TAA', example: 'تَاج', exampleMeaning: 'Crown' },
      { ar: 'نُور', name: 'Complete word', sound: 'NOOR', example: 'نُور', exampleMeaning: 'Light/Radiance' },
    ],
    practice: 'بَا بِي بُو',
    practiceRoman: 'Baa · Bee · Boo',
    completed: false,
  },
  {
    id: 8,
    slug: 'simple-words',
    title: 'Simple Arabic Words',
    subtitle: 'Your first real words',
    icon: '٨',
    color: '#3B6D11',
    bg: '#EAF3DE',
    accent: '#639922',
    letters: [
      { ar: 'كِتَاب', name: 'Kitab', sound: 'Ki-TAAB', example: 'كِتَاب', exampleMeaning: 'Book' },
      { ar: 'قَلَم', name: 'Qalam', sound: 'Qa-LAM', example: 'قَلَم', exampleMeaning: 'Pen' },
      { ar: 'بَيْت', name: 'Bayt', sound: 'BAYT', example: 'بَيْت', exampleMeaning: 'House' },
      { ar: 'مَاء', name: 'Maa', sound: 'MAA', example: 'مَاء', exampleMeaning: 'Water' },
      { ar: 'نُور', name: 'Noor', sound: 'NOOR', example: 'نُور', exampleMeaning: 'Light' },
      { ar: 'شَمْس', name: 'Shams', sound: 'SHAMS', example: 'شَمْس', exampleMeaning: 'Sun' },
    ],
    practice: 'كِتَاب • قَلَم • بَيْت',
    practiceRoman: 'Book · Pen · House',
    completed: false,
  },
  {
    id: 9,
    slug: 'islamic-words',
    title: 'Beautiful Names of Allah',
    subtitle: 'Al-Asma Al-Husna',
    icon: '٩',
    color: '#534AB7',
    bg: '#EEEDFE',
    accent: '#AFA9EC',
    letters: [
      { ar: 'الله', name: 'Allah', sound: 'AL-LAAH', example: 'بِسْمِ الله', exampleMeaning: 'In the name of Allah' },
      { ar: 'الرَّحْمَن', name: 'Ar-Rahman', sound: 'Ar-Rakh-MAAN', example: 'الرَّحْمَن', exampleMeaning: 'The Most Gracious' },
      { ar: 'الرَّحِيم', name: 'Ar-Raheem', sound: 'Ar-Ra-HEEM', example: 'الرَّحِيم', exampleMeaning: 'The Most Merciful' },
      { ar: 'السَّلَام', name: 'As-Salam', sound: 'As-Sa-LAAM', example: 'السَّلَام', exampleMeaning: 'The Source of Peace' },
      { ar: 'النُّور', name: 'An-Noor', sound: 'An-NOOR', example: 'النُّور', exampleMeaning: 'The Light' },
      { ar: 'الكَرِيم', name: 'Al-Kareem', sound: 'Al-Ka-REEM', example: 'الكَرِيم', exampleMeaning: 'The Most Generous' },
    ],
    practice: 'الله الرَّحْمَن الرَّحِيم',
    practiceRoman: 'Allah · Ar-Rahman · Ar-Raheem',
    completed: false,
  },
  {
    id: 10,
    slug: 'al-fatiha',
    title: 'Al-Fatiha Practice',
    subtitle: 'The Opening Chapter',
    icon: '١٠',
    color: '#27500A',
    bg: '#EAF3DE',
    accent: '#97C459',
    letters: [
      { ar: 'بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ', name: 'Bismillah', sound: 'Bis-mil-LAAH ir-rakh-MAA-nir-ra-HEEM', example: 'بِسْمِ الله', exampleMeaning: 'In the name of Allah, the Most Gracious, the Most Merciful' },
      { ar: 'الحَمْدُ للهِ رَبِّ العَالَمِين', name: 'Alhamdulillah', sound: 'Al-ham-du LIL-LAAH', example: 'الحَمْدُ للهِ', exampleMeaning: 'All praise is due to Allah, Lord of all worlds' },
      { ar: 'الرَّحْمَنِ الرَّحِيمِ', name: 'Ar-Rahman ir-Raheem', sound: 'Ar-rakh-MAA-nir-ra-HEEM', example: 'الرَّحِيم', exampleMeaning: 'The Most Gracious, the Most Merciful' },
      { ar: 'مَالِكِ يَوْمِ الدِّين', name: 'Maaliki yawm id-deen', sound: 'MAA-li-ki YAW-mid-DEEN', example: 'يَوْمِ الدِّين', exampleMeaning: 'Master of the Day of Judgement' },
      { ar: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِين', name: 'Iyyaka nabudu', sound: 'Iy-YA-ka NAB-udu', example: 'نَعْبُدُ', exampleMeaning: 'You alone we worship and You alone we ask for help' },
      { ar: 'اهدِنَا الصِّراطَ المُستَقِيم', name: 'Ihdina', sound: 'Ih-DI-nas-si-RAA-tal-mus-ta-QEEM', example: 'الصِّراطَ', exampleMeaning: 'Guide us to the straight path' },
      { ar: 'صِرَاطَ الَّذِينَ أَنعَمتَ عَلَيهِم', name: 'Sirat', sound: 'Si-RAAT al-la-DHEE-na', example: 'أَنعَمتَ', exampleMeaning: 'The path of those You have blessed' },
    ],
    practice: 'الحَمْدُ للهِ رَبِّ العَالَمِين',
    practiceRoman: 'Alhamdu lillahi rabbil aalameen',
    completed: false,
  },
];

// ─── Main Component ──────────────────────────────────────────────────────────

export default function NuraniQaidaScreen() {
  const [screen, setScreen] = useState('home'); // 'home' | 'chapter' | 'lesson'
  const [activeChapter, setActiveChapter] = useState(null);
  const [activeLetter, setActiveLetter] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const [completedChapters, setCompletedChapters] = useState(new Set([1, 2]));
  const [quizMode, setQuizMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizResult, setQuizResult] = useState(null);
  const [practiceActive, setPracticeActive] = useState(false);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const timerRef = useRef(null);

  const completedCount = completedChapters.size;
  const progressPct = Math.round((completedCount / CHAPTERS.length) * 100);

  // ── Simulated audio play ──
  const handlePlay = (id) => {
    if (playingId === id) { setPlayingId(null); return; }
    setPlayingId(id);
    setTimeout(() => setPlayingId(null), 2000);
  };

  // ── Chapter practice mode ──
  const startPractice = () => {
    setPracticeActive(true);
    setPracticeIndex(0);
  };

  const nextPracticeLetter = () => {
    if (practiceIndex < activeChapter.letters.length - 1) {
      setPracticeIndex(i => i + 1);
    } else {
      setPracticeActive(false);
      setPracticeIndex(0);
      setCompletedChapters(prev => new Set([...prev, activeChapter.id]));
    }
  };

  // ── Quiz ──
  const startQuiz = () => {
    setQuizMode(true);
    setQuizIndex(0);
    setQuizAnswer('');
    setQuizResult(null);
  };

  const checkAnswer = () => {
    const letter = activeChapter.letters[quizIndex];
    const correct = quizAnswer.trim().toLowerCase() === letter.name.toLowerCase();
    setQuizResult(correct ? 'correct' : 'wrong');
  };

  const nextQuestion = () => {
    if (quizIndex < activeChapter.letters.length - 1) {
      setQuizIndex(i => i + 1);
      setQuizAnswer('');
      setQuizResult(null);
    } else {
      setQuizMode(false);
      setQuizResult(null);
    }
  };

  // ── Nav ──
  const openChapter = (ch) => { setActiveChapter(ch); setActiveLetter(null); setScreen('chapter'); setQuizMode(false); setPracticeActive(false); };
  const openLetter = (lt) => { setActiveLetter(lt); setScreen('lesson'); };
  const goHome = () => { setScreen('home'); setActiveChapter(null); setActiveLetter(null); };
  const goChapter = () => { setScreen('chapter'); setActiveLetter(null); };

  if (screen === 'lesson') return <LetterDetailScreen letter={activeLetter} chapter={activeChapter} onBack={goChapter} onPlay={handlePlay} playingId={playingId} />;
  if (screen === 'chapter') return <ChapterScreen chapter={activeChapter} onBack={goHome} onOpenLetter={openLetter} onPlay={handlePlay} playingId={playingId} completedChapters={completedChapters} onComplete={() => setCompletedChapters(prev => new Set([...prev, activeChapter.id]))} practiceActive={practiceActive} practiceIndex={practiceIndex} onStartPractice={startPractice} onNextPractice={nextPracticeLetter} quizMode={quizMode} quizIndex={quizIndex} quizAnswer={quizAnswer} quizResult={quizResult} onStartQuiz={startQuiz} onSetAnswer={setQuizAnswer} onCheckAnswer={checkAnswer} onNextQuestion={nextQuestion} onExitQuiz={() => setQuizMode(false)} />;
  return <HomeScreen chapters={CHAPTERS} completedChapters={completedChapters} progressPct={progressPct} completedCount={completedCount} onOpenChapter={openChapter} />;
}

// ─── Home Screen ─────────────────────────────────────────────────────────────

function HomeScreen({ chapters, completedChapters, progressPct, completedCount, onOpenChapter }) {
  return (
    <div style={s.page}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg, #0F6E56 0%, #085041 60%, #04342C 100%)', padding: '36px 24px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -20, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <div style={{ fontSize: 56, marginBottom: 4, lineHeight: 1 }}>📖</div>
          <div style={{ fontFamily: "'Georgia', serif", fontSize: 26, color: '#fff', fontWeight: 700, marginBottom: 4, letterSpacing: -0.5 }}>نوراني قاعدة</div>
          <div style={{ fontSize: 20, color: '#fff', fontWeight: 700, marginBottom: 4 }}>Nurani Qaida</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 24 }}>Learn to read the Holy Quran step by step</div>

          {/* Progress */}
          <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>Your Progress</span>
              <span style={{ fontSize: 13, color: '#A5D6A7', fontWeight: 700 }}>{completedCount}/{chapters.length} Chapters</span>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progressPct}%`, background: 'linear-gradient(90deg, #81C784, #A5D6A7)', borderRadius: 8, transition: 'width 0.6s ease' }} />
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 6 }}>{progressPct}% complete</div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 12, padding: '16px 16px 0' }}>
        {[
          { label: 'Letters', value: '28', icon: '🔤' },
          { label: 'Chapters', value: '10', icon: '📚' },
          { label: 'Completed', value: `${completedCount}`, icon: '✅' },
        ].map(stat => (
          <div key={stat.label} style={{ flex: 1, background: '#fff', borderRadius: 14, padding: '14px 10px', textAlign: 'center', border: '1px solid #E8F5E9', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>{stat.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#0F6E56', lineHeight: 1 }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 3 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Chapters list */}
      <div style={{ padding: '20px 16px 32px' }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a', marginBottom: 14 }}>📋 All Chapters</div>
        {chapters.map((ch, i) => {
          const done = completedChapters.has(ch.id);
          return (
            <button key={ch.id} onClick={() => onOpenChapter(ch)} style={{ ...s.chapterCard, borderLeft: `4px solid ${ch.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: ch.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontFamily: 'serif', color: ch.color, fontWeight: 700, flexShrink: 0 }}>
                  {done ? '✓' : ch.icon}
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>{ch.title}</span>
                    {done && <span style={{ fontSize: 10, background: '#E8F5E9', color: '#2E7D32', padding: '2px 7px', borderRadius: 10, fontWeight: 600 }}>Done</span>}
                  </div>
                  <div style={{ fontSize: 12, color: '#777' }}>{ch.subtitle} · {ch.letters.length} items</div>
                  <div style={{ fontSize: 16, color: ch.color, fontFamily: 'serif', marginTop: 4, letterSpacing: 2 }}>{ch.practice.substring(0, 14)}…</div>
                </div>
                <span style={{ fontSize: 18, color: '#bbb' }}>›</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Chapter Screen ───────────────────────────────────────────────────────────

function ChapterScreen({ chapter: ch, onBack, onOpenLetter, onPlay, playingId, completedChapters, onComplete, practiceActive, practiceIndex, onStartPractice, onNextPractice, quizMode, quizIndex, quizAnswer, quizResult, onStartQuiz, onSetAnswer, onCheckAnswer, onNextQuestion, onExitQuiz }) {
  const done = completedChapters.has(ch.id);

  if (practiceActive) {
    const letter = ch.letters[practiceIndex];
    return (
      <div style={s.page}>
        <NavBar title="Practice Mode" onBack={onBack} color={ch.color} />
        <div style={{ padding: '30px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: ch.color, fontWeight: 600, marginBottom: 20 }}>Letter {practiceIndex + 1} of {ch.letters.length}</div>
          <div style={{ background: ch.bg, borderRadius: 24, padding: '36px 24px', marginBottom: 20, border: `2px solid ${ch.accent}` }}>
            <div style={{ fontSize: 80, lineHeight: 1.1, fontFamily: 'serif', color: ch.color, marginBottom: 12 }}>{letter.ar}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>{letter.name}</div>
            <div style={{ fontSize: 15, color: '#555', marginBottom: 16 }}>{letter.sound}</div>
            <button onClick={() => onPlay(letter.ar)} style={{ ...s.playBtn, background: ch.color }}>
              {playingId === letter.ar ? '⏸ Playing…' : '▶ Hear it'}
            </button>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: '18px', marginBottom: 24, border: '1px solid #eee' }}>
            <div style={{ fontSize: 12, color: '#999', marginBottom: 6 }}>Example word</div>
            <div style={{ fontSize: 36, fontFamily: 'serif', color: ch.color, marginBottom: 4 }}>{letter.example}</div>
            <div style={{ fontSize: 14, color: '#555' }}>{letter.exampleMeaning}</div>
          </div>
          <button onClick={onNextPractice} style={{ ...s.primaryBtn, background: ch.color, width: '100%' }}>
            {practiceIndex < ch.letters.length - 1 ? 'Next Letter →' : '✓ Complete Chapter'}
          </button>
        </div>
      </div>
    );
  }

  if (quizMode) {
    const letter = ch.letters[quizIndex];
    return (
      <div style={s.page}>
        <NavBar title="Quiz" onBack={onExitQuiz} color={ch.color} />
        <div style={{ padding: '24px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: ch.color, fontWeight: 600, marginBottom: 20 }}>Question {quizIndex + 1} of {ch.letters.length}</div>
          <div style={{ fontSize: 14, color: '#555', marginBottom: 12 }}>What is the name of this letter?</div>
          <div style={{ fontSize: 90, lineHeight: 1.1, fontFamily: 'serif', color: ch.color, marginBottom: 24 }}>{letter.ar}</div>
          <input
            value={quizAnswer}
            onChange={e => onSetAnswer(e.target.value)}
            placeholder="Type the letter name…"
            disabled={!!quizResult}
            style={{ width: '100%', padding: '14px 16px', fontSize: 16, borderRadius: 12, border: `2px solid ${quizResult === 'correct' ? '#4CAF50' : quizResult === 'wrong' ? '#f44336' : '#ddd'}`, outline: 'none', boxSizing: 'border-box', marginBottom: 12 }}
          />
          {quizResult === 'correct' && <div style={{ color: '#2E7D32', fontWeight: 700, fontSize: 16, marginBottom: 12 }}>✅ Correct! It's {letter.name}</div>}
          {quizResult === 'wrong' && <div style={{ color: '#c62828', fontWeight: 700, fontSize: 16, marginBottom: 12 }}>❌ Answer: {letter.name}</div>}
          {!quizResult ? (
            <button onClick={onCheckAnswer} disabled={!quizAnswer.trim()} style={{ ...s.primaryBtn, background: ch.color, width: '100%', opacity: quizAnswer.trim() ? 1 : 0.5 }}>Check Answer</button>
          ) : (
            <button onClick={onNextQuestion} style={{ ...s.primaryBtn, background: ch.color, width: '100%' }}>
              {quizIndex < ch.letters.length - 1 ? 'Next Question →' : '🎉 Finish Quiz'}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <NavBar title={ch.title} onBack={onBack} color={ch.color} />

      {/* Chapter Hero */}
      <div style={{ background: `linear-gradient(135deg, ${ch.color} 0%, ${ch.bg} 100%)`, padding: '28px 24px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 8, fontWeight: 500 }}>{ch.subtitle}</div>
        <div style={{ fontSize: 34, fontFamily: 'serif', color: '#fff', letterSpacing: 6, lineHeight: 1.4, marginBottom: 8 }}>{ch.practice}</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', fontStyle: 'italic' }}>{ch.practiceRoman}</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 20 }}>
          <button onClick={onStartPractice} style={{ background: '#fff', color: ch.color, border: 'none', borderRadius: 22, padding: '10px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            ▶ Practice
          </button>
          <button onClick={onStartQuiz} style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '2px solid rgba(255,255,255,0.5)', borderRadius: 22, padding: '10px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            📝 Quiz
          </button>
        </div>
      </div>

      {/* Letters grid */}
      <div style={{ padding: '20px 16px 32px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 14 }}>Tap a letter to learn</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ch.letters.map((lt, i) => (
            <button key={i} onClick={() => onOpenLetter(lt)} style={s.letterRow}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: ch.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontFamily: 'serif', color: ch.color, flexShrink: 0 }}>{lt.ar}</div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a' }}>{lt.name}</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{lt.sound}</div>
                <div style={{ fontSize: 13, color: ch.color, marginTop: 4 }}>{lt.example} — {lt.exampleMeaning}</div>
              </div>
              <button onClick={e => { e.stopPropagation(); onPlay(lt.ar + i); }} style={{ width: 36, height: 36, borderRadius: 18, border: `2px solid ${ch.color}`, background: playingId === lt.ar + i ? ch.color : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: playingId === lt.ar + i ? '#fff' : ch.color }}>
                {playingId === lt.ar + i ? '⏸' : '▶'}
              </button>
            </button>
          ))}
        </div>

        {/* Complete button */}
        {!done && (
          <button onClick={onComplete} style={{ ...s.primaryBtn, background: ch.color, width: '100%', marginTop: 20 }}>Mark Chapter as Complete ✓</button>
        )}
        {done && (
          <div style={{ textAlign: 'center', padding: '20px', background: '#E8F5E9', borderRadius: 16, marginTop: 20, color: '#2E7D32', fontWeight: 700, fontSize: 15 }}>
            ✅ Chapter Completed!
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Letter Detail Screen ─────────────────────────────────────────────────────

function LetterDetailScreen({ letter: lt, chapter: ch, onBack, onPlay, playingId }) {
  const [showWriting, setShowWriting] = useState(false);
  const playing = playingId === lt.ar + 'detail';
  return (
    <div style={s.page}>
      <NavBar title={lt.name} onBack={onBack} color={ch.color} />
      <div style={{ padding: '24px 20px' }}>

        {/* Big letter display */}
        <div style={{ textAlign: 'center', background: ch.bg, borderRadius: 24, padding: '40px 24px', marginBottom: 20, border: `2px solid ${ch.accent}`, position: 'relative' }}>
          <div style={{ fontSize: 100, lineHeight: 1.1, fontFamily: 'serif', color: ch.color }}>{lt.ar}</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#1a1a1a', marginTop: 8 }}>{lt.name}</div>
          <div style={{ fontSize: 15, color: '#666', marginTop: 4 }}>{lt.sound}</div>
          <button onClick={() => onPlay(lt.ar + 'detail')} style={{ ...s.playBtn, background: ch.color, marginTop: 18 }}>
            {playing ? '⏸ Playing…' : '▶ Listen to Pronunciation'}
          </button>
        </div>

        {/* Example word card */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '20px', border: '1px solid #eee', marginBottom: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <div style={{ fontSize: 12, color: '#999', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Example Word</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 52, fontFamily: 'serif', color: ch.color }}>{lt.example}</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a' }}>{lt.exampleMeaning}</div>
              <div style={{ fontSize: 14, color: '#888', marginTop: 4 }}>{lt.name} — Arabic word</div>
            </div>
          </div>
        </div>

        {/* Writing guide */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '20px', border: '1px solid #eee', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showWriting ? 16 : 0 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a' }}>✍️ Writing Guide</div>
            <button onClick={() => setShowWriting(v => !v)} style={{ background: ch.bg, color: ch.color, border: 'none', borderRadius: 12, padding: '6px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              {showWriting ? 'Hide' : 'Show'}
            </button>
          </div>
          {showWriting && (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ fontSize: 72, fontFamily: 'serif', color: ch.color, opacity: 0.3, marginBottom: 12, position: 'relative' }}>
                <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', color: ch.color, opacity: 1, fontSize: 72 }}>{lt.ar}</span>
                {lt.ar}
              </div>
              <div style={{ fontSize: 14, color: '#888', marginTop: 48 }}>Trace this letter to practice writing</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16 }}>
                {['Isolated', 'Initial', 'Medial', 'Final'].map(pos => (
                  <div key={pos} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 28, fontFamily: 'serif', color: ch.color, lineHeight: 1.4 }}>{lt.ar}</div>
                    <div style={{ fontSize: 10, color: '#aaa', marginTop: 4 }}>{pos}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tips */}
        <div style={{ background: '#FFF8E1', borderRadius: 20, padding: '18px', border: '1px solid #FFE082' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#F57F17', marginBottom: 8 }}>💡 Pronunciation Tip</div>
          <div style={{ fontSize: 14, color: '#795548', lineHeight: 1.6 }}>
            {lt.sound}. Practice saying it slowly, then gradually increase speed. Listen to the audio multiple times before moving on.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function NavBar({ title, onBack, color }) {
  return (
    <div style={{ background: color, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
      <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', color: '#fff', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
      <div style={{ fontSize: 17, fontWeight: 700, color: '#fff', flex: 1 }}>{title}</div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = {
  page: {
    minHeight: '100vh',
    background: '#F5F7F5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  chapterCard: {
    width: '100%',
    background: '#fff',
    borderRadius: 16,
    padding: '16px 14px',
    marginBottom: 12,
    border: '1px solid #eee',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    textAlign: 'left',
  },
  letterRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    background: '#fff',
    borderRadius: 16,
    padding: '14px 14px',
    border: '1px solid #eee',
    cursor: 'pointer',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    width: '100%',
    textAlign: 'left',
  },
  primaryBtn: {
    border: 'none',
    borderRadius: 14,
    padding: '15px 24px',
    fontSize: 15,
    fontWeight: 700,
    color: '#fff',
    cursor: 'pointer',
    display: 'block',
  },
  playBtn: {
    border: 'none',
    borderRadius: 22,
    padding: '11px 24px',
    fontSize: 14,
    fontWeight: 700,
    color: '#fff',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  },
};
