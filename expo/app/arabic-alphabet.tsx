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
import { Volume2, BookOpen, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Letter {
  id: number;
  arabic: string;
  name: string;
  transliteration: string;
  pronunciation: string;
  example: string;
  exampleMeaning: string;
}

const arabicLetters: Letter[] = [
  {
    id: 1,
    arabic: 'أ',
    name: 'Alif',
    transliteration: 'a',
    pronunciation: 'as in "apple"',
    example: 'أَسَد',
    exampleMeaning: 'Lion',
  },
  {
    id: 2,
    arabic: 'ب',
    name: 'Ba',
    transliteration: 'b',
    pronunciation: 'as in "book"',
    example: 'بَيْت',
    exampleMeaning: 'House',
  },
  {
    id: 3,
    arabic: 'ت',
    name: 'Ta',
    transliteration: 't',
    pronunciation: 'as in "table"',
    example: 'تُفَّاح',
    exampleMeaning: 'Apple',
  },
  {
    id: 4,
    arabic: 'ث',
    name: 'Tha',
    transliteration: 'th',
    pronunciation: 'as in "three"',
    example: 'ثَوْب',
    exampleMeaning: 'Cloth',
  },
  {
    id: 5,
    arabic: 'ج',
    name: 'Jeem',
    transliteration: 'j',
    pronunciation: 'as in "jump"',
    example: 'جَمِيل',
    exampleMeaning: 'Beautiful',
  },
  {
    id: 6,
    arabic: 'ح',
    name: 'Ha',
    transliteration: 'h',
    pronunciation: 'strong "h" from throat',
    example: 'حَبْل',
    exampleMeaning: 'Rope',
  },
  {
    id: 7,
    arabic: 'خ',
    name: 'Kha',
    transliteration: 'kh',
    pronunciation: 'as in Scottish "loch"',
    example: 'خُبْز',
    exampleMeaning: 'Bread',
  },
  {
    id: 8,
    arabic: 'د',
    name: 'Dal',
    transliteration: 'd',
    pronunciation: 'as in "dog"',
    example: 'دَرْس',
    exampleMeaning: 'Lesson',
  },
  {
    id: 9,
    arabic: 'ذ',
    name: 'Dhal',
    transliteration: 'dh',
    pronunciation: 'as in "this"',
    example: 'ذَهَب',
    exampleMeaning: 'Gold',
  },
  {
    id: 10,
    arabic: 'ر',
    name: 'Ra',
    transliteration: 'r',
    pronunciation: 'rolled "r"',
    example: 'رَجُل',
    exampleMeaning: 'Man',
  },
  {
    id: 11,
    arabic: 'ز',
    name: 'Zay',
    transliteration: 'z',
    pronunciation: 'as in "zoo"',
    example: 'زَيْت',
    exampleMeaning: 'Oil',
  },
  {
    id: 12,
    arabic: 'س',
    name: 'Seen',
    transliteration: 's',
    pronunciation: 'as in "sun"',
    example: 'سَمَك',
    exampleMeaning: 'Fish',
  },
  {
    id: 13,
    arabic: 'ش',
    name: 'Sheen',
    transliteration: 'sh',
    pronunciation: 'as in "ship"',
    example: 'شَمْس',
    exampleMeaning: 'Sun',
  },
  {
    id: 14,
    arabic: 'ص',
    name: 'Sad',
    transliteration: 's',
    pronunciation: 'emphatic "s"',
    example: 'صَابُون',
    exampleMeaning: 'Soap',
  },
  {
    id: 15,
    arabic: 'ض',
    name: 'Dad',
    transliteration: 'd',
    pronunciation: 'emphatic "d"',
    example: 'ضَوْء',
    exampleMeaning: 'Light',
  },
  {
    id: 16,
    arabic: 'ط',
    name: 'Ta',
    transliteration: 't',
    pronunciation: 'emphatic "t"',
    example: 'طَعَام',
    exampleMeaning: 'Food',
  },
  {
    id: 17,
    arabic: 'ظ',
    name: 'Dha',
    transliteration: 'dh',
    pronunciation: 'emphatic "dh"',
    example: 'ظَرْف',
    exampleMeaning: 'Envelope',
  },
  {
    id: 18,
    arabic: 'ع',
    name: 'Ayn',
    transliteration: "'",
    pronunciation: 'guttural from throat',
    example: 'عَسَل',
    exampleMeaning: 'Honey',
  },
  {
    id: 19,
    arabic: 'غ',
    name: 'Ghayn',
    transliteration: 'gh',
    pronunciation: 'like French "r"',
    example: 'غُرْفَة',
    exampleMeaning: 'Room',
  },
  {
    id: 20,
    arabic: 'ف',
    name: 'Fa',
    transliteration: 'f',
    pronunciation: 'as in "fun"',
    example: 'فَاكِهَة',
    exampleMeaning: 'Fruit',
  },
  {
    id: 21,
    arabic: 'ق',
    name: 'Qaf',
    transliteration: 'q',
    pronunciation: 'from back of throat',
    example: 'قَلَم',
    exampleMeaning: 'Pen',
  },
  {
    id: 22,
    arabic: 'ك',
    name: 'Kaf',
    transliteration: 'k',
    pronunciation: 'as in "king"',
    example: 'كِتَاب',
    exampleMeaning: 'Book',
  },
  {
    id: 23,
    arabic: 'ل',
    name: 'Lam',
    transliteration: 'l',
    pronunciation: 'as in "love"',
    example: 'لَوْن',
    exampleMeaning: 'Color',
  },
  {
    id: 24,
    arabic: 'م',
    name: 'Meem',
    transliteration: 'm',
    pronunciation: 'as in "moon"',
    example: 'مَاء',
    exampleMeaning: 'Water',
  },
  {
    id: 25,
    arabic: 'ن',
    name: 'Noon',
    transliteration: 'n',
    pronunciation: 'as in "noon"',
    example: 'نَار',
    exampleMeaning: 'Fire',
  },
  {
    id: 26,
    arabic: 'ه',
    name: 'Ha',
    transliteration: 'h',
    pronunciation: 'soft "h" as in "house"',
    example: 'هَوَاء',
    exampleMeaning: 'Air',
  },
  {
    id: 27,
    arabic: 'و',
    name: 'Waw',
    transliteration: 'w',
    pronunciation: 'as in "well"',
    example: 'وَرْد',
    exampleMeaning: 'Rose',
  },
  {
    id: 28,
    arabic: 'ي',
    name: 'Ya',
    transliteration: 'y',
    pronunciation: 'as in "yes"',
    example: 'يَد',
    exampleMeaning: 'Hand',
  },
];

export default function ArabicAlphabetScreen() {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);

  const handleLetterPress = (letter: Letter) => {
    setSelectedLetter(letter);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen
        options={{
          title: 'Arabic Alphabet',
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
        <LinearGradient
          colors={['#1B5E20', '#2E7D32', '#388E3C']}
          style={styles.headerSection}
        >
          <View style={styles.headerContent}>
            <BookOpen size={48} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Arabic Alphabet</Text>
            <Text style={styles.headerSubtitle}>
              28 letters of the Arabic language
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.lettersSection}>
          <Text style={styles.sectionTitle}>All Letters</Text>
          
          <View style={styles.lettersGrid}>
            {arabicLetters.map((letter) => (
              <TouchableOpacity
                key={letter.id}
                style={[
                  styles.letterCard,
                  selectedLetter?.id === letter.id && styles.selectedLetterCard,
                ]}
                onPress={() => handleLetterPress(letter)}
                activeOpacity={0.7}
              >
                <Text style={styles.letterArabic}>{letter.arabic}</Text>
                <Text style={styles.letterName}>{letter.name}</Text>
                <Text style={styles.letterTransliteration}>
                  {letter.transliteration}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {selectedLetter && (
          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Letter Details</Text>
            
            <View style={styles.detailCard}>
              <LinearGradient
                colors={['#E8F5E8', '#C8E6C9', '#A5D6A7']}
                style={styles.detailGradient}
              >
                <View style={styles.detailHeader}>
                  <Text style={styles.detailArabic}>{selectedLetter.arabic}</Text>
                  <Text style={styles.detailName}>{selectedLetter.name}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Transliteration:</Text>
                  <Text style={styles.detailValue}>
                    {selectedLetter.transliteration}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Pronunciation:</Text>
                  <Text style={styles.detailValue}>
                    {selectedLetter.pronunciation}
                  </Text>
                </View>

                <View style={styles.exampleSection}>
                  <Text style={styles.exampleLabel}>Example Word:</Text>
                  <View style={styles.exampleContent}>
                    <Text style={styles.exampleArabic}>
                      {selectedLetter.example}
                    </Text>
                    <Text style={styles.exampleMeaning}>
                      ({selectedLetter.exampleMeaning})
                    </Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.audioButton} activeOpacity={0.7}>
                  <Volume2 size={20} color="#FFFFFF" />
                  <Text style={styles.audioButtonText}>Listen</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        )}

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Learning Tips</Text>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipNumber}>1</Text>
            <Text style={styles.tipText}>
              Arabic is written from right to left.
            </Text>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipNumber}>2</Text>
            <Text style={styles.tipText}>
              Letters change shape based on their position in a word.
            </Text>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipNumber}>3</Text>
            <Text style={styles.tipText}>
              Practice writing each letter repeatedly to memorize its shape.
            </Text>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipNumber}>4</Text>
            <Text style={styles.tipText}>
              Listen to native pronunciation to master the sounds.
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
  },
  lettersSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 15,
  },
  lettersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  letterCard: {
    width: '23%',
    aspectRatio: 1,
    backgroundColor: theme.colors.cardBg,
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
  selectedLetterCard: {
    borderColor: '#1B5E20',
    backgroundColor: theme.isDark ? '#1B2A1B' : '#E8F5E8',
  },
  letterArabic: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  letterName: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 2,
  },
  letterTransliteration: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  detailSection: {
    padding: 20,
    paddingTop: 0,
  },
  detailCard: {
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
  detailGradient: {
    padding: 25,
  },
  detailHeader: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(27, 94, 32, 0.2)',
  },
  detailArabic: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },
  detailName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#388E3C',
    marginRight: 8,
  },
  detailValue: {
    fontSize: 16,
    color: '#2E7D32',
    flex: 1,
  },
  exampleSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(27, 94, 32, 0.2)',
  },
  exampleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#388E3C',
    marginBottom: 8,
  },
  exampleContent: {
    alignItems: 'center',
  },
  exampleArabic: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 4,
  },
  exampleMeaning: {
    fontSize: 16,
    color: '#2E7D32',
    fontStyle: 'italic',
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B5E20',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
    gap: 8,
  },
  audioButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  infoSection: {
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
    gap: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
  },
  tipNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1B5E20',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 32,
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
