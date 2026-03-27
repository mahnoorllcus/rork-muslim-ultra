import React, { useMemo } from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeProvider';

export default function PrivacyScreen() {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.title}>Privacy Policy</Text>
          <Text style={styles.date}>Effective Date: January 2025</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>1. Information We Collect</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.subheading}>Personal Information:{'\n'}</Text>
            • Name and email address when you create an account{'\n'}
            • Age, gender, and country for personalization{'\n'}
            • Prayer preferences and settings{'\n\n'}
            
            <Text style={styles.subheading}>Usage Information:{'\n'}</Text>
            • App usage patterns and features accessed{'\n'}
            • Device information (type, OS version){'\n'}
            • Location data (with your permission)
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>2. How We Use Your Information</Text>
          <Text style={styles.paragraph}>
            • To provide personalized prayer times and Qibla direction{'\n'}
            • To customize Hajj and Umrah guidance based on your profile{'\n'}
            • To improve app functionality and user experience{'\n'}
            • To send important updates about the app{'\n'}
            • To provide customer support
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>3. Data Storage and Security</Text>
          <Text style={styles.paragraph}>
            Your data is stored securely using industry-standard encryption. Personal information is stored locally on your device and in secure cloud servers. We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>4. Data Sharing</Text>
          <Text style={styles.paragraph}>
            We do not sell, trade, or rent your personal information to third parties. We may share aggregated, anonymized data for analytical purposes. We will only disclose personal information if required by law or to protect our rights and safety.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>5. Location Services</Text>
          <Text style={styles.paragraph}>
            Location data is used solely for:{'\n'}
            • Calculating accurate prayer times{'\n'}
            • Providing Qibla direction{'\n'}
            • Navigation to holy sites{'\n'}
            • Emergency assistance features{'\n\n'}
            You can disable location services at any time through your device settings.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>6. Your Rights</Text>
          <Text style={styles.paragraph}>
            You have the right to:{'\n'}
            • Access your personal data{'\n'}
            • Correct inaccurate information{'\n'}
            • Request deletion of your data{'\n'}
            • Opt-out of non-essential data collection{'\n'}
            • Export your data in a portable format
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>7. Children&apos;s Privacy</Text>
          <Text style={styles.paragraph}>
            The App is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>8. Third-Party Services</Text>
          <Text style={styles.paragraph}>
            The App may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>9. Data Retention</Text>
          <Text style={styles.paragraph}>
            We retain your personal information only as long as necessary to provide services and fulfill the purposes outlined in this policy. You can request deletion of your account and associated data at any time.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>10. International Data Transfers</Text>
          <Text style={styles.paragraph}>
            Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>11. Changes to Privacy Policy</Text>
          <Text style={styles.paragraph}>
            We may update this Privacy Policy periodically. We will notify you of any material changes through the App or via email. Your continued use after changes constitutes acceptance of the updated policy.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>12. Contact Us</Text>
          <Text style={styles.paragraph}>
            For privacy-related questions or concerns:{'\n\n'}
            Mahnoor LLC{'\n'}
            Privacy Department{'\n'}
            Email: support@mahnoor.online{'\n'}
            Website: www.mahnoor.online/privacy
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.copyright}>© 2025 Mahnoor LLC. All rights reserved.</Text>
          <Text style={styles.copyright}>Your privacy is important to us.</Text>
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
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 10,
  },
  subheading: {
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  paragraph: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 22,
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
    marginBottom: 5,
  },
});