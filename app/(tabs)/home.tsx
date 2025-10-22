import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Animated,
	  TextInput,
	  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  BookOpen,
  Compass,
  Clock,
  MapPin,
  Book,
  Calendar,
  Users,
  Heart,
  ChevronRight,
  Sun,
  Moon,
  Phone,
  CheckSquare,
  Droplet,
  History,
	  Search,
	  User,
  BookOpenCheck,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { usePrayerTimes } from '@/providers/PrayerTimesProvider';
import { useTranslation } from '@/providers/TranslationProvider';
import { useTheme } from '@/providers/ThemeProvider';



export default function HomeScreen() {
  const { nextPrayer, isLoading: prayerLoading } = usePrayerTimes();
  const { t } = useTranslation();
  const theme = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [reminderVisible, setReminderVisible] = useState(true);
  const reminderAnimation = useRef(new Animated.Value(1)).current;
  const [inspirationVisible, setInspirationVisible] = useState(true);
  const inspirationAnimation = useRef(new Animated.Value(1)).current;
	  const [searchQuery, setSearchQuery] = useState('');
  
  const styles = useMemo(() => getStyles(theme), [theme]);

  // Daily inspiration messages (30 messages for monthly cycle)
  const dailyInspirations = useMemo(() => [
    { text: "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.", reference: "Quran 65:3" },
    { text: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.", reference: "Quran 2:152" },
    { text: "And it is He who created the heavens and earth in truth. And the day He says, 'Be,' and it is, His word is the truth.", reference: "Quran 6:73" },
    { text: "And Allah is the best of planners.", reference: "Quran 8:30" },
    { text: "And whoever fears Allah - He will make for him a way out.", reference: "Quran 65:2" },
    { text: "Indeed, with hardship comes ease.", reference: "Quran 94:6" },
    { text: "And Allah would not punish them while they seek forgiveness.", reference: "Quran 8:33" },
    { text: "And whoever does righteous deeds, whether male or female, while being a believer - those will enter Paradise.", reference: "Quran 4:124" },
    { text: "And give good tidings to the patient, Who, when disaster strikes them, say, 'Indeed we belong to Allah, and indeed to Him we will return.'", reference: "Quran 2:155-156" },
    { text: "And Allah loves the doers of good.", reference: "Quran 3:134" },
    { text: "And whoever holds firmly to Allah has been guided to a straight path.", reference: "Quran 3:101" },
    { text: "And it is Allah who sends down rain from the sky, and We produce thereby the vegetation of every kind.", reference: "Quran 6:99" },
    { text: "And Allah is Forgiving and Merciful.", reference: "Quran 4:96" },
    { text: "And whoever believes in Allah and does righteousness - He will admit him into gardens beneath which rivers flow.", reference: "Quran 64:9" },
    { text: "And Allah is over all things competent.", reference: "Quran 2:20" },
    { text: "And whoever trusts in Allah - then Allah is Exalted in Might, Wise.", reference: "Quran 8:49" },
    { text: "And Allah guides whom He wills to a straight path.", reference: "Quran 2:213" },
    { text: "And whoever does good deeds, whether male or female, and is a believer - We will surely cause him to live a good life.", reference: "Quran 16:97" },
    { text: "And Allah is the best of providers.", reference: "Quran 62:11" },
    { text: "And whoever fears Allah - He will make for him of his matter ease.", reference: "Quran 65:4" },
    { text: "And Allah is Knowing of what you do.", reference: "Quran 2:144" },
    { text: "And whoever repents and does righteousness does indeed turn to Allah with accepted repentance.", reference: "Quran 25:71" },
    { text: "And Allah is the best of judges.", reference: "Quran 95:8" },
    { text: "And whoever is patient and forgives - indeed, that is of the matters of determination.", reference: "Quran 42:43" },
    { text: "And Allah loves those who are constantly repentant and loves those who purify themselves.", reference: "Quran 2:222" },
    { text: "And whoever does an atom's weight of good will see it.", reference: "Quran 99:7" },
    { text: "And Allah is the best of helpers.", reference: "Quran 3:150" },
    { text: "And whoever believes in Allah and the Last Day and does righteousness - they will have their reward with their Lord.", reference: "Quran 2:62" },
    { text: "And Allah is Hearing and Knowing.", reference: "Quran 2:127" },
    { text: "And whoever submits his face to Allah while he is a doer of good - then he has grasped the most trustworthy handhold.", reference: "Quran 31:22" }
  ], []);

  // Get today's inspiration based on day of month
  const todaysInspiration = useMemo(() => {
    const dayOfMonth = new Date().getDate();
    const index = (dayOfMonth - 1) % dailyInspirations.length;
    return dailyInspirations[index];
  }, [dailyInspirations]);

  // Animated reminder that scrolls with the page
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(reminderAnimation, {
          toValue: 0.95,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(reminderAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    }, 3000);

    return () => clearInterval(interval);
  }, [reminderAnimation]);

  // Animated inspiration with different timing
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(inspirationAnimation, {
          toValue: 0.98,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(inspirationAnimation, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]).start();
    }, 4000);

    return () => clearInterval(interval);
  }, [inspirationAnimation]);

  // Safe navigation handler
  const handleNavigation = useCallback((route: string) => {
    try {
      router.push(route as any);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }, []);

  const quickActions = useMemo(() => {
    try {
      return [
        {
          title: t('umrahGuide') || 'Umrah Guide',
          subtitle: t('stepByStepGuide') || 'Step-by-step guide',
          icon: BookOpen,
          gradient: ['#1B5E20', '#2E7D32'] as [string, string],
          route: '/(tabs)/hajj-guide',
        },
        {
          title: t('hajjGuide') || 'Hajj Guide',
          subtitle: t('completeGuideText') || 'Complete guide',
          icon: Compass,
          gradient: ['#2E7D32', '#388E3C'] as [string, string],
          route: '/(tabs)/hajj-guide',
        },
        {
          title: t('prayerTimes') || 'Prayer Times',
          subtitle: t('makkahMadinahGuide') || 'Makkah & Madinah',
          icon: Clock,
          gradient: ['#388E3C', '#43A047'] as [string, string],
          route: '/prayer-times',
        },
        {
          title: t('holyPlaces') || 'Holy Places',
          subtitle: t('exploreHistory') || 'Explore history',
          icon: MapPin,
          gradient: ['#43A047', '#4CAF50'] as [string, string],
          route: '/(tabs)/places',
        },
      ];
    } catch (error) {
      console.error('Error creating quick actions:', error);
      return [];
    }
  }, [t]);

  const features = useMemo(() => {
    try {
      return [
        {
          title: t('duaCollection') || 'Dua Collection',
          subtitle: t('essentialIslamicPrayers') || 'Essential Islamic prayers',
          icon: Book,
          route: '/duas',
          color: '#1B5E20',
        },
        {
          title: t('qiblaCompass') || 'Qibla Compass',
          subtitle: t('findDirectionToKaaba') || 'Find direction to Kaaba',
          icon: Compass,
          route: '/qibla-compass',
          color: '#2E7D32',
        },
        {
          title: t('islamicHistory') || 'Islamic History',
          subtitle: t('learnAboutHeritage') || 'Learn about heritage',
          icon: History,
          route: '/islamic-history',
          color: '#388E3C',
        },
        {
          title: t('islamicCalendar') || 'Islamic Calendar',
          subtitle: t('hijriDateAndEvents' as any) || 'Hijri dates & events',
          icon: Calendar,
          route: '/islamic-calendar',
          color: '#43A047',
        },
        {
          title: t('travelChecklist') || 'Travel Checklist',
          subtitle: t('prepareYourJourney' as any) || 'Prepare your journey',
          icon: CheckSquare,
          route: '/travel-checklist',
          color: '#4CAF50',
        },
        {
          title: t('groupTracker') || 'Group Tracker',
          subtitle: t('stayConnectedWithGroup') || 'Stay connected with group',
          icon: Users,
          route: '/group-tracker',
          color: '#66BB6A',
        },
        {
          title: t('healthAndSafety') || 'Health & Safety',
          subtitle: t('importantGuidelines') || 'Important guidelines',
          icon: Heart,
          route: '/health-safety',
          color: '#81C784',
        },
        {
          title: t('emergencyContacts') || 'Emergency Contacts',
          subtitle: t('importantNumbers' as any) || 'Important numbers',
          icon: Phone,
          route: '/emergency-contacts',
          color: '#A5D6A7',
        },
        {
          title: t('zamzamPoints') || 'Zamzam Points',
          subtitle: t('findZamzamLocations' as any) || 'Find Zamzam locations',
          icon: Droplet,
          route: '/zamzam-points',
          color: '#C8E6C9',
        },

      ];
    } catch (error) {
      console.error('Error creating features:', error);
      return [];
    }
  }, [t]);

  const greeting = useMemo(() => {
    try {
      const hour = new Date().getHours();
      if (hour < 12) return { text: t('goodMorning') || 'Good Morning', icon: Sun };
      if (hour < 18) return { text: t('goodAfternoon') || 'Good Afternoon', icon: Sun };
      return { text: t('goodEvening') || 'Good Evening', icon: Moon };
    } catch (error) {
      console.error('Error getting greeting:', error);
      return { text: 'Welcome', icon: Sun };
    }
  }, [t]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Custom Header with Search and Profile */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.searchContainer}
              onPress={() => handleNavigation('/search')}
              activeOpacity={0.7}
            >
              <Search size={20} color={theme.colors.textSecondary} />
              <TextInput
                style={styles.searchInput}
                placeholder={t('searchPlaceholder') || 'Search guides, duas...'}
                placeholderTextColor={theme.colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={() => {
                  if (searchQuery.trim()) {
                    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                  }
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => handleNavigation('/profile')}
              activeOpacity={0.7}
            >
              <User size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Animated.ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Welcome Section */}
        <LinearGradient colors={[theme.colors.primary, theme.colors.primaryDark, theme.colors.primary]} style={styles.welcomeSection}>
          <View style={styles.welcomeContent}>
            <Text style={styles.assalamualaikum}>{t('assalamualaikum') || 'Assalamu Alaikum'}</Text>
            <View style={styles.greetingRow}>
              {greeting.icon && React.createElement(greeting.icon, { size: 24, color: '#E8F5E9' })}
              <Text style={styles.greetingText}>{greeting.text}</Text>
            </View>
            <Text style={styles.welcomeSubtitle}>
              {t('spiritualJourneyGuide') || 'Your spiritual journey guide'}
            </Text>
          </View>
        </LinearGradient>

        {/* Next Prayer Card */}
        <TouchableOpacity 
          style={styles.prayerCard}
          onPress={() => handleNavigation('/prayer-times')}
          activeOpacity={0.8}
        >
          <LinearGradient colors={['#FFD700', '#FFC107']} style={styles.prayerGradient}>
            <View style={styles.prayerContent}>
              <View style={styles.prayerLeft}>
                <Clock size={24} color="#333333" />
                <View style={styles.prayerInfo}>
                  <Text style={styles.prayerLabel}>{t('nextPrayer') || 'Next Prayer'}</Text>
                  <Text style={styles.prayerName}>
                    {prayerLoading ? 'Loading...' : (nextPrayer ? nextPrayer.name : 'Calculating...')}
                  </Text>
                </View>
              </View>
              <View style={styles.prayerRight}>
                <Text style={styles.prayerTime}>
                  {prayerLoading ? '--:--' : (nextPrayer ? nextPrayer.time : '--:--')}
                </Text>
                <Text style={styles.prayerRemaining}>
                  {prayerLoading ? 'Loading...' : (nextPrayer ? `in ${nextPrayer.remaining}` : 'Calculating...')}
                </Text>
              </View>
              <View style={styles.prayerChevronContainer}>
                <ChevronRight size={20} color="#666666" />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Quick Actions with 3D effect */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('quickAccess') || 'Quick Access'}</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.length > 0 ? quickActions.map((action, index) => (
              <TouchableOpacity
                key={`${action.title}-${index}`}
                style={styles.quickActionCard}
                onPress={() => handleNavigation(action.route)}
                activeOpacity={0.7}
              >
                <View style={styles.quickActionShadow}>
                  <LinearGradient
                    colors={action.gradient}
                    style={styles.quickActionGradient}
                  >
                    <View style={styles.quickActionTop}>
                      <View style={styles.quickActionIconWrapper}>
                        {action.icon && React.createElement(action.icon, { size: 28, color: '#FFFFFF' })}
                      </View>
                    </View>
                    <View style={styles.quickActionBottom}>
                      <Text style={styles.quickActionTitle}>{action.title}</Text>
                      <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
                    </View>
                  </LinearGradient>
                  <LinearGradient
                    colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
                    style={styles.quickActionShadowLayer}
                  />
                </View>
              </TouchableOpacity>
            )) : (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1B5E20" />
              </View>
            )}
          </View>
        </View>

        {/* Features Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('exploreMore') || 'Explore More'}</Text>
          <View style={styles.featuresGrid}>
            {features.length > 0 ? features.map((feature, index) => (
              <TouchableOpacity
                key={`${feature.title}-${index}`}
                style={styles.featureCard}
                onPress={() => handleNavigation(feature.route)}
                activeOpacity={0.7}
              >
                <View style={[styles.featureIconContainer, { backgroundColor: feature.color + '20' }]}>
                  {feature.icon && React.createElement(feature.icon, { size: 24, color: feature.color })}
                </View>
                <Text style={styles.featureTitle} numberOfLines={1}>{feature.title}</Text>
                <Text style={styles.featureSubtitle} numberOfLines={2}>{feature.subtitle}</Text>
              </TouchableOpacity>
            )) : (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1B5E20" />
              </View>
            )}
          </View>
          
          {/* Madinah Visit Guide - Full Width Feature */}
          <TouchableOpacity
            style={styles.fullWidthFeatureCard}
            onPress={() => handleNavigation('/madinah-visit-guide')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#4A90E2', '#357ABD', '#2E5B8A']}
              style={styles.fullWidthFeatureGradient}
            >
              <View style={styles.fullWidthFeatureContent}>
                <View style={styles.fullWidthFeatureLeft}>
                  <View style={styles.fullWidthFeatureIconContainer}>
                    <MapPin size={32} color="#FFFFFF" />
                  </View>
                  <View style={styles.fullWidthFeatureTextContainer}>
                    <Text style={styles.fullWidthFeatureTitle}>{t('madinahVisitGuide') || 'Madinah Visit Guide'}</Text>
                    <Text style={styles.fullWidthFeatureSubtitle}>
                      {t('madinahVisitGuideDesc') || 'Complete guide to visiting Rawda and Prophet\'s Mosque with etiquettes and procedures'}
                    </Text>
                  </View>
                </View>
                <View style={styles.fullWidthFeatureRight}>
                  <ChevronRight size={24} color="rgba(255, 255, 255, 0.8)" />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Holy Quran - Full Width Feature */}
          <TouchableOpacity
            style={[styles.fullWidthFeatureCard, { marginTop: 15 }]}
            onPress={() => handleNavigation('/quran')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#1B5E20', '#2E7D32', '#388E3C']}
              style={styles.fullWidthFeatureGradient}
            >
              <View style={styles.fullWidthFeatureContent}>
                <View style={styles.fullWidthFeatureLeft}>
                  <View style={styles.fullWidthFeatureIconContainer}>
                    <BookOpenCheck size={32} color="#FFFFFF" />
                  </View>
                  <View style={styles.fullWidthFeatureTextContainer}>
                    <Text style={styles.fullWidthFeatureTitle}>{t('readTheQuran') || 'Read the Quran'}</Text>
                    <Text style={styles.fullWidthFeatureSubtitle}>
                      {t('readTheQuranDesc') || 'Read the Holy Quran with translation, transliteration, and bookmarks'}
                    </Text>
                  </View>
                </View>
                <View style={styles.fullWidthFeatureRight}>
                  <ChevronRight size={24} color="rgba(255, 255, 255, 0.8)" />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Nurani Qaida - Full Width Feature */}
          <TouchableOpacity
            style={[styles.fullWidthFeatureCard, { marginTop: 15 }]}
            onPress={() => handleNavigation('/nurani-qaida')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#1B5E20', '#2E7D32', '#388E3C']}
              style={styles.fullWidthFeatureGradient}
            >
              <View style={styles.fullWidthFeatureContent}>
                <View style={styles.fullWidthFeatureLeft}>
                  <View style={styles.fullWidthFeatureIconContainer}>
                    <BookOpen size={32} color="#FFFFFF" />
                  </View>
                  <View style={styles.fullWidthFeatureTextContainer}>
                    <Text style={styles.fullWidthFeatureTitle}>{t('nuraniQaida') || 'Nurani Qaida'}</Text>
                    <Text style={styles.fullWidthFeatureSubtitle}>
                      {t('nuraniQaidaDesc') || 'Learn Arabic reading with step-by-step lessons and pronunciation guide'}
                    </Text>
                  </View>
                </View>
                <View style={styles.fullWidthFeatureRight}>
                  <ChevronRight size={24} color="rgba(255, 255, 255, 0.8)" />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Ammapara - Full Width Feature */}
          <TouchableOpacity
            style={[styles.fullWidthFeatureCard, { marginTop: 15 }]}
            onPress={() => handleNavigation('/ammapara')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#2E7D32', '#388E3C', '#43A047']}
              style={styles.fullWidthFeatureGradient}
            >
              <View style={styles.fullWidthFeatureContent}>
                <View style={styles.fullWidthFeatureLeft}>
                  <View style={styles.fullWidthFeatureIconContainer}>
                    <Book size={32} color="#FFFFFF" />
                  </View>
                  <View style={styles.fullWidthFeatureTextContainer}>
                    <Text style={styles.fullWidthFeatureTitle}>{t('ammapara') || 'Ammapara'}</Text>
                    <Text style={styles.fullWidthFeatureSubtitle}>
                      {t('ammaparaDesc') || '30th Para of Quran with Arabic text, translation, and audio recitation'}
                    </Text>
                  </View>
                </View>
                <View style={styles.fullWidthFeatureRight}>
                  <ChevronRight size={24} color="rgba(255, 255, 255, 0.8)" />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Daily Reminder - Animated */}
        {reminderVisible && (
          <Animated.View 
            style={[
              styles.reminderCard,
              {
                transform: [{ scale: reminderAnimation }],
              }
            ]}
          >
            <LinearGradient colors={['#E8F5E9', '#C8E6C9', '#A5D6A7']} style={styles.reminderGradient}>
              <View style={styles.reminderHeader}>
                <Text style={styles.reminderTitle}>💡 {t('dailyReminder') || 'Daily Reminder'}</Text>
                <TouchableOpacity onPress={() => setReminderVisible(false)}>
                  <Text style={styles.reminderClose}>✕</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.reminderText}>
                &ldquo;{t('quranVerse') || 'And We have certainly made the Quran easy for remembrance, so is there any who will remember?'}&rdquo;
              </Text>
              <Text style={styles.reminderReference}>{t('quranReference') || 'Quran 54:17'}</Text>
            </LinearGradient>
          </Animated.View>
        )}

        {/* Daily Inspiration - Animated */}
        {inspirationVisible && (
          <Animated.View 
            style={[
              styles.inspirationCard,
              {
                transform: [{ scale: inspirationAnimation }],
              }
            ]}
          >
            <LinearGradient colors={['#FFF3E0', '#FFE0B2', '#FFCC02']} style={styles.inspirationGradient}>
              <View style={styles.inspirationHeader}>
                <Text style={styles.inspirationTitle}>✨ {t('dailyInspiration') || 'Daily Inspiration'}</Text>
                <TouchableOpacity onPress={() => setInspirationVisible(false)}>
                  <Text style={styles.inspirationClose}>✕</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.inspirationText}>
                &ldquo;{todaysInspiration.text}&rdquo;
              </Text>
              <Text style={styles.inspirationReference}>{todaysInspiration.reference}</Text>
              <View style={styles.inspirationFooter}>
                <Text style={styles.inspirationDay}>{t('dayOf') || 'Day'} {new Date().getDate()} {t('of') || 'of'} {new Date().toLocaleString('default', { month: 'long' })}</Text>
              </View>
            </LinearGradient>
          </Animated.View>
        )}
        
        {/* Bottom padding */}
        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (theme: ReturnType<typeof useTheme>) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  welcomeContent: {
    alignItems: 'center',
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  greetingText: {
    fontSize: 16,
    color: '#E8F5E9',
    marginLeft: 8,
    fontWeight: '500',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#E8F5E9',
    textAlign: 'center',
    lineHeight: 20,
  },
  prayerCard: {
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
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
  prayerGradient: {
    padding: 20,
  },
  prayerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prayerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prayerInfo: {
    marginLeft: 12,
  },
  prayerLabel: {
    fontSize: 12,
    color: theme.isDark ? '#999999' : '#666666',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  prayerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.isDark ? '#333333' : '#333333',
    marginTop: 2,
  },
  prayerRight: {
    alignItems: 'flex-end',
  },
  prayerTime: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.isDark ? '#333333' : '#333333',
  },
  prayerRemaining: {
    fontSize: 12,
    color: theme.isDark ? '#999999' : '#666666',
    marginTop: 2,
  },
  prayerChevronContainer: {
    marginLeft: 12,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    marginBottom: 15,
  },
  quickActionShadow: {
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
  },
  quickActionGradient: {
    padding: 15,
    borderRadius: 15,
    minHeight: 140,
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
      default: {},
    }),
  },
  quickActionShadowLayer: {
    position: 'absolute',
    bottom: -5,
    left: 5,
    right: -5,
    height: 10,
    borderRadius: 15,
    zIndex: -1,
  },
  quickActionTop: {
    alignItems: 'center',
    marginBottom: 10,
  },
  quickActionIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  quickActionBottom: {
    alignItems: 'center',
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '31%',
    backgroundColor: theme.colors.cardBg,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
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
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 14,
  },
  reminderCard: {
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
      default: {},
    }),
  },
  reminderGradient: {
    padding: 20,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  reminderClose: {
    fontSize: 20,
    color: '#666666',
    fontWeight: 'bold',
  },
  reminderText: {
    fontSize: 14,
    color: '#2E7D32',
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  reminderReference: {
    fontSize: 12,
    color: '#388E3C',
    fontWeight: '600',
  },
  inspirationCard: {
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
      default: {},
    }),
  },
  inspirationGradient: {
    padding: 20,
  },
  inspirationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  inspirationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E65100',
  },
  inspirationClose: {
    fontSize: 20,
    color: '#666666',
    fontWeight: 'bold',
  },
  inspirationText: {
    fontSize: 14,
    color: '#F57C00',
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  inspirationReference: {
    fontSize: 12,
    color: '#FF8F00',
    fontWeight: '600',
    marginBottom: 12,
  },
  inspirationFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 143, 0, 0.2)',
    paddingTop: 8,
    alignItems: 'center',
  },
  inspirationDay: {
    fontSize: 11,
    color: '#FF8F00',
    fontWeight: '500',
    opacity: 0.8,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    width: '100%',
  },
  assalamualaikum: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 20,
  },
  header: {
	    backgroundColor: theme.colors.background,
	    borderBottomWidth: 1,
	    borderBottomColor: theme.colors.border,
	    paddingHorizontal: 20,
	    paddingVertical: 15,
	    ...Platform.select({
	      ios: {
	        shadowColor: '#000',
	        shadowOffset: { width: 0, height: 2 },
	        shadowOpacity: 0.1,
	        shadowRadius: 4,
	      },
	      android: {
	        elevation: 4,
	      },
	      default: {},
	    }),
	  },
	  headerContent: {
	    flexDirection: 'row',
	    alignItems: 'center',
	  },
	  headerActions: {
	    flexDirection: 'row',
	    alignItems: 'center',
	    gap: 12,
	  },
	  searchContainer: {
	    flex: 1,
	    flexDirection: 'row',
	    alignItems: 'center',
	    backgroundColor: theme.colors.cardBg,
	    borderRadius: 25,
	    paddingHorizontal: 15,
	    paddingVertical: 10,
	    borderWidth: 1,
	    borderColor: theme.colors.border,
	  },
	  searchInput: {
	    flex: 1,
	    marginLeft: 10,
	    fontSize: 16,
	    color: theme.colors.text,
	  },
	  profileButton: {
	    width: 44,
	    height: 44,
	    borderRadius: 22,
	    backgroundColor: theme.colors.cardBg,
	    alignItems: 'center',
	    justifyContent: 'center',
	    borderWidth: 1,
	    borderColor: theme.colors.border,
	  },
  fullWidthFeatureCard: {
    marginTop: 20,
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
  fullWidthFeatureGradient: {
    padding: 20,
  },
  fullWidthFeatureContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fullWidthFeatureLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fullWidthFeatureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  fullWidthFeatureTextContainer: {
    flex: 1,
  },
  fullWidthFeatureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  fullWidthFeatureSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  fullWidthFeatureRight: {
    marginLeft: 12,
  },
});