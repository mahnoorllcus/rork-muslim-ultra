import React, { useMemo } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Globe, Phone, MapPin } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

export default function AboutScreen() {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  
  const handleEmailPress = () => {
    Linking.openURL('mailto:support@mahnoor.online');
  };

  const handleWebsitePress = () => {
    Linking.openURL('https://www.mahnoor.online/apps');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.logoSection}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>☪</Text>
          </View>
          <Text style={styles.appName}>Muslim Ultra</Text>
          <Text style={styles.tagline}>Your Complete Pilgrimage Companion</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>About Muslim Ultra</Text>
          <Text style={styles.paragraph}>
            Muslim Ultra is a comprehensive mobile application designed to guide and assist Muslims performing Hajj and Umrah. Our mission is to make the sacred journey easier, more organized, and spiritually enriching for pilgrims from around the world.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Our Mission</Text>
          <Text style={styles.paragraph}>
            To provide accurate, accessible, and comprehensive guidance for pilgrims, ensuring they can focus on their spiritual journey while having all necessary information at their fingertips.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Key Features</Text>
          <Text style={styles.paragraph}>
            • Step-by-step Hajj and Umrah guides{'\n'}
            • Interactive maps of holy sites{'\n'}
            • Accurate prayer times and Qibla direction{'\n'}
            • Comprehensive dua collection with translations{'\n'}
            • Historical information about sacred places{'\n'}
            • Offline mode for all essential features{'\n'}
            • Multi-language support{'\n'}
            • Emergency contacts and assistance
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Our Team</Text>
          <Text style={styles.paragraph}>
            Muslim Ultra is developed by a dedicated team of developers, Islamic scholars, and user experience designers at Mahnoor LLC. We work closely with religious authorities to ensure all content is accurate and authentic.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Acknowledgments</Text>
          <Text style={styles.paragraph}>
            We extend our gratitude to:{'\n'}
            • Islamic scholars who reviewed our content{'\n'}
            • The pilgrim community for valuable feedback{'\n'}
            • Our development and design teams{'\n'}
            • All users who trust us as their pilgrimage companion
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Contact Us</Text>
          
          <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
            <Mail size={20} color={theme.colors.primary} />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>support@mahnoor.online</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem} onPress={handleWebsitePress}>
            <Globe size={20} color={theme.colors.primary} />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Website</Text>
              <Text style={styles.contactValue}>www.mahnoor.online/service</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.contactItem}>
            <Phone size={20} color={theme.colors.primary} />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Support Hotline</Text>
              <Text style={styles.contactValue}>+1 (510) 963-4380</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <MapPin size={20} color={theme.colors.primary} />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Headquarters</Text>
              <Text style={styles.contactValue}>Mahnoor LLC{'\n'}7901 4th ST N 300{'\n'}St Petersburg, Florida, US</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Legal Information</Text>
          <Text style={styles.paragraph}>
            Muslim Ultra is a product of Mahnoor LLC. All rights reserved.{'\n\n'}
            The app and its content are protected by copyright and intellectual property laws. Unauthorized reproduction or distribution is prohibited.{'\n\n'}
            Islamic content has been verified by qualified scholars. However, users should consult with their local religious authorities for specific rulings.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.copyright}>© 2025 Mahnoor LLC</Text>
          <Text style={styles.copyright}>All Rights Reserved</Text>
          <Text style={styles.footerText}>Made with ❤️ for the Muslim Ummah</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (theme: ReturnType<typeof useTheme>) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.isDark ? theme.colors.primary + '20' : '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    marginBottom: 15,
  },
  logoText: {
    fontSize: 40,
    color: theme.colors.primary,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 5,
  },
  tagline: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 10,
  },
  version: {
    fontSize: 12,
    color: theme.colors.textTertiary,
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 25,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 22,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
  },
  contactInfo: {
    marginLeft: 15,
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 3,
  },
  contactValue: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: '500',
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    alignItems: 'center',
  },
  copyright: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 3,
  },
  footerText: {
    fontSize: 12,
    color: theme.colors.textTertiary,
    marginTop: 10,
  },
});