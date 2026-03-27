import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, X, MapPin, Book, Heart, Compass, Calendar, Users, Phone, CheckSquare, History, Droplets, Info } from 'lucide-react-native';
import { useTranslation } from '@/providers/TranslationProvider';
import { useTheme } from '@/providers/ThemeProvider';

interface SearchItem {
  id: string;
  title: string;
  titleKey: string;
  description: string;
  descriptionKey: string;
  category: string;
  categoryKey: string;
  route: string;
  icon: React.ReactNode;
  color: string;
}

export default function SearchScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const searchItems: SearchItem[] = [
    {
      id: 'umrah-guide',
      title: 'Umrah Guide',
      titleKey: 'umrah',
      description: 'Complete step-by-step Umrah guide',
      descriptionKey: 'umrahDescription',
      category: 'Umrah',
      categoryKey: 'umrah',
      route: '/(tabs)/hajj-guide',
      icon: <Book size={24} color="#4A90E2" />,
      color: '#4A90E2',
    },
    {
      id: 'umrah-description',
      title: 'Understanding Umrah',
      titleKey: 'understandingUmrah',
      description: 'Learn about Umrah rituals and significance',
      descriptionKey: 'umrahDescription',
      category: 'Umrah',
      categoryKey: 'umrah',
      route: '/umrah-description',
      icon: <Book size={24} color="#4A90E2" />,
      color: '#4A90E2',
    },
    {
      id: 'hajj-guide',
      title: 'Hajj Guide',
      titleKey: 'hajj',
      description: 'Complete Hajj pilgrimage guide',
      descriptionKey: 'hajjDescription',
      category: 'Hajj',
      categoryKey: 'hajj',
      route: '/(tabs)/hajj-guide',
      icon: <Book size={24} color="#50C878" />,
      color: '#50C878',
    },
    {
      id: 'understanding-hajj',
      title: 'Understanding Hajj',
      titleKey: 'understandingHajj',
      description: 'Learn about Hajj rituals and significance',
      descriptionKey: 'hajjDescription',
      category: 'Hajj',
      categoryKey: 'hajj',
      route: '/understanding-hajj',
      icon: <Book size={24} color="#50C878" />,
      color: '#50C878',
    },
    {
      id: 'holy-places',
      title: 'Holy Places',
      titleKey: 'places',
      description: 'Explore sacred sites in Makkah and Madinah',
      descriptionKey: 'placesDescription',
      category: 'Places',
      categoryKey: 'places',
      route: '/(tabs)/places',
      icon: <MapPin size={24} color="#FF6B6B" />,
      color: '#FF6B6B',
    },
    {
      id: 'zamzam-points',
      title: 'Zamzam Points',
      titleKey: 'zamzamPoints',
      description: 'Find Zamzam water distribution points',
      descriptionKey: 'zamzamDescription',
      category: 'Places',
      categoryKey: 'places',
      route: '/zamzam-points',
      icon: <Droplets size={24} color="#FF6B6B" />,
      color: '#FF6B6B',
    },
    {
      id: 'duas-prayers',
      title: 'Duas & Prayers',
      titleKey: 'duas',
      description: 'Collection of essential duas',
      descriptionKey: 'duasDescription',
      category: 'Spiritual',
      categoryKey: 'spiritual',
      route: '/duas',
      icon: <Heart size={24} color="#9B59B6" />,
      color: '#9B59B6',
    },
    {
      id: 'qibla-compass',
      title: 'Qibla Compass',
      titleKey: 'qiblaCompass',
      description: 'Find Qibla direction',
      descriptionKey: 'qiblaDescription',
      category: 'Tools',
      categoryKey: 'tools',
      route: '/qibla-compass',
      icon: <Compass size={24} color="#F39C12" />,
      color: '#F39C12',
    },
    {
      id: 'islamic-calendar',
      title: 'Islamic Calendar',
      titleKey: 'islamicCalendar',
      description: 'View Islamic dates and events',
      descriptionKey: 'calendarDescription',
      category: 'Tools',
      categoryKey: 'tools',
      route: '/islamic-calendar',
      icon: <Calendar size={24} color="#F39C12" />,
      color: '#F39C12',
    },
    {
      id: 'travel-checklist',
      title: 'Travel Checklist',
      titleKey: 'travelChecklist',
      description: 'Prepare for your journey',
      descriptionKey: 'checklistDescription',
      category: 'Tools',
      categoryKey: 'tools',
      route: '/travel-checklist',
      icon: <CheckSquare size={24} color="#F39C12" />,
      color: '#F39C12',
    },
    {
      id: 'group-tracker',
      title: 'Group Tracker',
      titleKey: 'groupTracker',
      description: 'Stay connected with your group',
      descriptionKey: 'groupDescription',
      category: 'Tools',
      categoryKey: 'tools',
      route: '/group-tracker',
      icon: <Users size={24} color="#F39C12" />,
      color: '#F39C12',
    },
    {
      id: 'islamic-history',
      title: 'Islamic History',
      titleKey: 'islamicHistory',
      description: 'Learn about Islamic heritage',
      descriptionKey: 'historyDescription',
      category: 'Information',
      categoryKey: 'information',
      route: '/islamic-history',
      icon: <History size={24} color="#3498DB" />,
      color: '#3498DB',
    },
    {
      id: 'health-safety',
      title: 'Health & Safety',
      titleKey: 'healthSafety',
      description: 'Stay safe during your journey',
      descriptionKey: 'healthDescription',
      category: 'Information',
      categoryKey: 'information',
      route: '/health-safety',
      icon: <Info size={24} color="#3498DB" />,
      color: '#3498DB',
    },
    {
      id: 'emergency-contacts',
      title: 'Emergency Contacts',
      titleKey: 'emergencyContacts',
      description: 'Important contact numbers',
      descriptionKey: 'emergencyDescription',
      category: 'Information',
      categoryKey: 'information',
      route: '/emergency-contacts',
      icon: <Phone size={24} color="#E74C3C" />,
      color: '#E74C3C',
    },
  ];

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return searchItems;
    }

    const query = searchQuery.toLowerCase();
    return searchItems.filter(item => {
      const title = t(item.titleKey as any).toLowerCase();
      const description = t(item.descriptionKey as any).toLowerCase();
      const category = t(item.categoryKey as any).toLowerCase();
      
      return (
        title.includes(query) ||
        description.includes(query) ||
        category.includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, t]);

  const groupedItems = useMemo(() => {
    const groups: { [key: string]: SearchItem[] } = {};
    
    filteredItems.forEach(item => {
      const categoryKey = item.categoryKey;
      if (!groups[categoryKey]) {
        groups[categoryKey] = [];
      }
      groups[categoryKey].push(item);
    });
    
    return groups;
  }, [filteredItems]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
        <View style={[styles.searchContainer, { backgroundColor: theme.isDark ? theme.colors.surface : '#f5f5f5' }]}>
          <Search size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor={theme.colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={[styles.cancelText, { color: theme.colors.primary }]}>{t('cancel')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {Object.keys(groupedItems).length === 0 ? (
          <View style={styles.noResults}>
            <Search size={48} color={theme.colors.border} />
            <Text style={[styles.noResultsText, { color: theme.colors.textSecondary }]}>{t('noSearchResults')}</Text>
            <Text style={[styles.noResultsSubtext, { color: theme.colors.textTertiary }]}>{t('tryDifferentKeywords')}</Text>
          </View>
        ) : (
          Object.entries(groupedItems).map(([categoryKey, items]) => (
            <View key={categoryKey} style={styles.categorySection}>
              <Text style={[styles.categoryTitle, { backgroundColor: theme.colors.surface, color: theme.colors.textSecondary }]}>{t(categoryKey as any)}</Text>
              {items.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.resultItem, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}
                  onPress={() => router.push(item.route as any)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                    {item.icon}
                  </View>
                  <View style={styles.resultContent}>
                    <Text style={[styles.resultTitle, { color: theme.colors.text }]}>{t(item.titleKey as any)}</Text>
                    <Text style={[styles.resultDescription, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                      {t(item.descriptionKey as any)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  cancelButton: {
    marginLeft: 12,
    paddingVertical: 8,
  },
  cancelText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resultContent: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  resultDescription: {
    fontSize: 14,
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 16,
  },
  noResultsSubtext: {
    fontSize: 14,
    marginTop: 8,
  },
});
