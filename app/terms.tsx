import React, { useMemo } from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeProvider';

export default function TermsScreen() {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.title}>Terms and Conditions</Text>
          <Text style={styles.date}>Last Updated: January 2025</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>1. Acceptance of Terms</Text>
          <Text style={styles.paragraph}>
            By downloading, installing, or using the Muslim Ultra application ("App"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the App.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>2. App Purpose</Text>
          <Text style={styles.paragraph}>
            Muslim Ultra is designed to provide guidance and information for pilgrims performing Hajj and Umrah. The App offers educational content, prayer times, location services, and other features to assist in religious observances.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>3. User Responsibilities</Text>
          <Text style={styles.paragraph}>
            • You must provide accurate information when creating an account{'\n'}
            • You are responsible for maintaining the confidentiality of your account{'\n'}
            • You agree to use the App in accordance with Islamic principles and local laws{'\n'}
            • You will not use the App for any unlawful or prohibited purposes
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>4. Content and Information</Text>
          <Text style={styles.paragraph}>
            While we strive to provide accurate and up-to-date information, the App's content is for general guidance only. Religious rulings and practices should be confirmed with qualified Islamic scholars. We are not responsible for any errors or omissions in the content.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>5. Privacy and Data</Text>
          <Text style={styles.paragraph}>
            Your use of the App is also governed by our Privacy Policy. We respect your privacy and handle your personal information in accordance with applicable data protection laws.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>6. Location Services</Text>
          <Text style={styles.paragraph}>
            The App may request access to your location to provide prayer times, navigation, and other location-based features. You can control these permissions through your device settings.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>7. Intellectual Property</Text>
          <Text style={styles.paragraph}>
            All content, features, and functionality of the App are owned by Mahnoor LLC and are protected by international copyright, trademark, and other intellectual property laws.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>8. Disclaimer of Warranties</Text>
          <Text style={styles.paragraph}>
            The App is provided "as is" without any warranties, express or implied. We do not guarantee that the App will be error-free, uninterrupted, or free from viruses or other harmful components.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>9. Limitation of Liability</Text>
          <Text style={styles.paragraph}>
            Mahnoor LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the App.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>10. Changes to Terms</Text>
          <Text style={styles.paragraph}>
            We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting in the App. Your continued use constitutes acceptance of the modified terms.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>11. Governing Law</Text>
          <Text style={styles.paragraph}>
            These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>12. Contact Information</Text>
          <Text style={styles.paragraph}>
            For questions about these Terms and Conditions, please contact us at:{'\n\n'}
            Mahnoor LLC{'\n'}
            Email: support@travelmakkah.com{'\n'}
            Website: www.travelmakkah.com
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.copyright}>© 2025 Mahnoor LLC. All rights reserved.</Text>
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
  },
});