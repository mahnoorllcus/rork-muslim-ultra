import React, { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Heart,
  Star,
  AlertCircle,
  CheckCircle,
  Info,
  Calendar,
  Navigation,
  Shield,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { Stack } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';

interface GuideSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  content: string[];
  tips?: string[];
  warnings?: string[];
}

export default function MadinahVisitGuideScreen() {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const guideSections: GuideSection[] = useMemo(() => [
    {
      id: 'introduction',
      title: 'Introduction to Madinah',
      icon: MapPin,
      content: [
        'Madinah al-Munawwarah (The Illuminated City) is the second holiest city in Islam and the final resting place of Prophet Muhammad (peace be upon him).',
        'The city holds immense spiritual significance as it was the destination of the Hijra (migration) and where the first Muslim community was established.',
        'Visiting Madinah is not a mandatory part of Hajj or Umrah, but it is highly recommended (mustahabb) and brings immense spiritual rewards.',
        'The Prophet\'s Mosque (Masjid an-Nabawi) is the heart of Madinah and contains the Rawdah Sharif, one of the most sacred places on Earth.',
      ],
      tips: [
        'Plan to spend at least 3-4 days in Madinah to fully experience its spiritual atmosphere',
        'Visit during off-peak hours for a more peaceful experience',
        'Learn about the history of each location before visiting',
      ],
    },
    {
      id: 'prophets-mosque',
      title: "The Prophet's Mosque (Masjid an-Nabawi)",
      icon: Star,
      content: [
        'Masjid an-Nabawi is the second holiest mosque in Islam, originally built by Prophet Muhammad (PBUH) himself.',
        'The mosque has been expanded several times throughout history and can now accommodate over a million worshippers.',
        'The Green Dome (al-Qubbah al-Khaḍrā) marks the location of the Prophet\'s tomb and is visible from afar.',
        'The mosque operates 24/7 and offers a serene atmosphere for prayer, reflection, and seeking closeness to Allah.',
      ],
      tips: [
        'Enter through the designated gates - there are separate entrances for men and women',
        'The mosque is beautifully lit at night, creating a peaceful ambiance',
        'Spend time in different areas of the mosque to experience its vastness',
        'The marble floors can be very hot during summer - wear appropriate footwear',
      ],
    },
    {
      id: 'nusuk-app',
      title: 'Nusuk App - Essential for Rawdah Booking',
      icon: Calendar,
      content: [
        'The Nusuk app is the official Saudi government platform that has revolutionized the pilgrimage experience, including visits to Rawdah Sharif.',
        'Booking an appointment through Nusuk is now the primary way to visit Rawdah Sharif, ensuring a more organized and peaceful experience.',
        'The app provides real-time availability and allows you to select your preferred time slot for visiting this sacred area.',
        'All bookings are free of charge, but advance planning is essential as slots fill up quickly, especially during peak seasons.',
      ],
      tips: [
        'Download and register on Nusuk app before your trip to Madinah',
        'Book your Rawdah appointment as early as possible after arrival',
        'Keep your booking confirmation readily available on your phone',
        'Arrive at the mosque 30 minutes before your scheduled appointment time',
        'The app is available in multiple languages including English and Arabic',
      ],
      warnings: [
        'Appointments are mandatory - walk-in visits to Rawdah are not permitted',
        'Bring valid identification that matches your booking details',
        'Late arrivals may result in forfeited appointments',
      ],
    },
    {
      id: 'rawdah-sharif',
      title: 'Rawdah Sharif - The Sacred Garden',
      icon: Heart,
      content: [
        'Rawdah Sharif is the area between the Prophet\'s pulpit (minbar) and his tomb, described by the Prophet as "a garden from the gardens of Paradise."',
        'This blessed area is marked by green carpets and pillars, distinguishing it from the rest of the mosque.',
        'Praying in Rawdah is considered equivalent to praying in one of the gardens of Paradise.',
        'The area is approximately 22 meters long and 15 meters wide, making it relatively small compared to the mosque\'s size.',
      ],
      tips: [
        'Entry to Rawdah is regulated through the Nusuk app - book your appointment in advance',
        'Women have designated times for Rawdah visits - check the current schedule in the app',
        'Spend your time in Rawdah in prayer, dhikr, and dua rather than taking photos',
        'Be respectful of others and avoid pushing or rushing',
      ],
      warnings: [
        'Photography is strictly prohibited in Rawdah area',
        'Maintain proper Islamic etiquette and dress code',
        'Do not raise your voice or cause disturbance',
      ],
    },
    {
      id: 'visiting-procedures',
      title: 'Visiting Procedures and Etiquette',
      icon: CheckCircle,
      content: [
        'Approach the Prophet\'s tomb with utmost respect and humility, as if you are visiting him during his lifetime.',
        'Stand facing the tomb and offer your salutations (salaam) to the Prophet, Abu Bakr, and Umar ibn al-Khattab.',
        'Make dua for yourself, your family, and the Muslim ummah while in this blessed vicinity.',
        'Visit the Rawdah area for prayer and spiritual reflection - this is considered one of the gardens of Paradise.',
      ],
      tips: [
        'Learn the proper etiquette and supplications before your visit',
        'Approach with a clean heart and sincere intentions',
        'Dress modestly and maintain proper Islamic conduct',
        'Be patient during busy periods and respect queue systems',
      ],
    },
    {
      id: 'best-times',
      title: 'Best Times to Visit',
      icon: Clock,
      content: [
        'Early morning hours (after Fajr prayer) offer the most peaceful experience with fewer crowds.',
        'Late evening hours (after Isha prayer) provide a serene atmosphere for reflection and prayer.',
        'Avoid peak times during Hajj and Umrah seasons if you prefer a quieter experience.',
        'Friday prayers (Jumu\'ah) are particularly blessed but expect larger crowds.',
      ],
      tips: [
        'Check prayer times and plan your visit accordingly',
        'Ramadan nights offer a special spiritual atmosphere',
        'Weekdays are generally less crowded than weekends',
        'Consider the weather - summer months can be extremely hot',
      ],
    },
    {
      id: 'women-guidelines',
      title: 'Guidelines for Women Visitors',
      icon: Users,
      content: [
        'Women have designated areas and specific times for visiting Rawdah Sharif.',
        'Separate entrances and prayer areas are provided for women in the Prophet\'s Mosque.',
        'Female guides and security personnel are available to assist women visitors.',
        'The women\'s section offers a peaceful environment for prayer and reflection.',
      ],
      tips: [
        'Check the current schedule for women\'s Rawdah visiting times',
        'Wear appropriate Islamic dress (abaya and hijab)',
        'Bring a prayer mat if preferred, though the mosque provides carpeted areas',
        'Stay with your group and follow the guidance of female attendants',
      ],
      warnings: [
        'Strictly adhere to the designated women\'s areas',
        'Photography restrictions apply equally to all visitors',
        'Maintain Islamic etiquette at all times',
      ],
    },
    {
      id: 'other-sites',
      title: 'Other Sacred Sites in Madinah',
      icon: Navigation,
      content: [
        'Quba Mosque: The first mosque built by Prophet Muhammad (PBUH), located about 5km from the Prophet\'s Mosque.',
        'Mount Uhud: Site of the famous Battle of Uhud, offering historical significance and beautiful views.',
        'Jannat al-Baqi: The main cemetery of Madinah where many companions of the Prophet are buried.',
        'The Seven Mosques: Historical mosques related to the Battle of the Trench (Ghazwah al-Khandaq).',
      ],
      tips: [
        'Praying 2 rakats in Quba Mosque is equivalent to performing Umrah',
        'Visit Mount Uhud to reflect on Islamic history and the sacrifices of early Muslims',
        'Jannat al-Baqi visits are for reflection and making dua for the deceased',
        'Consider hiring a knowledgeable guide for historical context',
      ],
    },
    {
      id: 'practical-tips',
      title: 'Practical Tips and Recommendations',
      icon: Info,
      content: [
        'Stay in hotels close to the Prophet\'s Mosque for easy access and to hear the call to prayer.',
        'The Madinah Metro provides convenient transportation between major sites.',
        'Local restaurants offer a variety of halal food options, including traditional Arabian cuisine.',
        'Shopping areas around the mosque offer Islamic books, prayer items, and souvenirs.',
      ],
      tips: [
        'Book accommodations well in advance, especially during peak seasons',
        'Carry a small bag with essentials: water, prayer mat, and comfortable shoes',
        'Learn basic Arabic phrases for better communication with locals',
        'Keep important documents and money secure',
        'Stay hydrated, especially during summer months',
      ],
      warnings: [
        'Be cautious of extremely hot marble floors during summer',
        'Avoid carrying large bags into the mosque',
        'Respect local customs and Islamic guidelines at all times',
      ],
    },
    {
      id: 'spiritual-preparation',
      title: 'Spiritual Preparation',
      icon: Shield,
      content: [
        'Purify your intentions (niyyah) and approach your visit with sincere devotion to Allah.',
        'Increase your dhikr, Quran recitation, and prayers in preparation for this blessed journey.',
        'Learn about the life of Prophet Muhammad (PBUH) and the history of early Islam.',
        'Prepare specific duas and supplications you wish to make in these sacred places.',
      ],
      tips: [
        'Read the Quran and hadith related to Madinah before your visit',
        'Make a list of people to pray for during your visit',
        'Approach with humility and gratitude for this opportunity',
        'Maintain a state of spiritual cleanliness (wudu) as much as possible',
      ],
    },
  ], []);

  const renderSection = (section: GuideSection, index: number) => (
    <View key={section.id} style={styles.sectionContainer}>
      <LinearGradient
        colors={[theme.colors.primary + '10', theme.colors.primary + '05']}
        style={styles.sectionHeader}
      >
        <View style={styles.sectionTitleRow}>
          <View style={[styles.sectionIconContainer, { backgroundColor: theme.colors.primary + '20' }]}>
            <section.icon size={24} color={theme.colors.primary} />
          </View>
          <Text style={styles.sectionTitle}>{section.title}</Text>
        </View>
      </LinearGradient>

      <View style={styles.sectionContent}>
        {section.content.map((paragraph, pIndex) => (
          <Text key={pIndex} style={styles.contentText}>
            {paragraph}
          </Text>
        ))}

        {section.tips && section.tips.length > 0 && (
          <View style={styles.tipsContainer}>
            <View style={styles.tipsHeader}>
              <CheckCircle size={18} color="#4CAF50" />
              <Text style={styles.tipsTitle}>Helpful Tips</Text>
            </View>
            {section.tips.map((tip, tIndex) => (
              <Text key={tIndex} style={styles.tipText}>
                • {tip}
              </Text>
            ))}
          </View>
        )}

        {section.warnings && section.warnings.length > 0 && (
          <View style={styles.warningsContainer}>
            <View style={styles.warningsHeader}>
              <AlertCircle size={18} color="#FF9800" />
              <Text style={styles.warningsTitle}>Important Reminders</Text>
            </View>
            {section.warnings.map((warning, wIndex) => (
              <Text key={wIndex} style={styles.warningText}>
                • {warning}
              </Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Madinah Visit Guide',
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <ArrowLeft size={24} color={theme.colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primaryDark]}
            style={styles.headerSection}
          >
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Madinah Visit Guide</Text>
              <Text style={styles.headerSubtitle}>
                Complete guide to visiting the Prophet's Mosque and Rawdah Sharif
              </Text>
              <View style={styles.headerStats}>
                <View style={styles.statItem}>
                  <MapPin size={16} color="#E8F5E9" />
                  <Text style={styles.statText}>Sacred Sites</Text>
                </View>
                <View style={styles.statItem}>
                  <Heart size={16} color="#E8F5E9" />
                  <Text style={styles.statText}>Spiritual Journey</Text>
                </View>
                <View style={styles.statItem}>
                  <Star size={16} color="#E8F5E9" />
                  <Text style={styles.statText}>Blessed Experience</Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Guide Sections */}
          <View style={styles.sectionsContainer}>
            {guideSections.map((section, index) => renderSection(section, index))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              May Allah accept your visit and grant you the blessings of this sacred journey.
            </Text>
            <Text style={styles.footerDua}>
              "Rabbana atina fi'd-dunya hasanatan wa fi'l-akhirati hasanatan wa qina 'adhab an-nar"
            </Text>
            <Text style={styles.footerTranslation}>
              "Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire."
            </Text>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </>
  );
}

const getStyles = (theme: ReturnType<typeof useTheme>) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E8F5E9',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statText: {
    fontSize: 12,
    color: '#E8F5E9',
    marginTop: 4,
    textAlign: 'center',
  },
  sectionsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionContainer: {
    marginBottom: 25,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: theme.colors.cardBg,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      default: {},
    }),
  },
  sectionHeader: {
    padding: 20,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    flex: 1,
  },
  sectionContent: {
    padding: 20,
    paddingTop: 0,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 26,
    color: theme.colors.text,
    marginBottom: 15,
    textAlign: 'justify',
  },
  tipsContainer: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 15,
    marginTop: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginLeft: 8,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#1B5E20',
    marginBottom: 5,
  },
  warningsContainer: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 15,
    marginTop: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  warningsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  warningsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginLeft: 8,
  },
  warningText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#BF360C',
    marginBottom: 5,
  },
  footer: {
    margin: 20,
    padding: 20,
    backgroundColor: theme.colors.cardBg,
    borderRadius: 15,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      default: {},
    }),
  },
  footerText: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  footerDua: {
    fontSize: 18,
    color: theme.colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    lineHeight: 28,
  },
  footerTranslation: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 20,
  },
});