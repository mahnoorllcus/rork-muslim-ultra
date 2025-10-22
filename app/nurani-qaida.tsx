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