import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Star, Heart, Users } from 'lucide-react-native';

export default function UnderstandingHajjScreen() {
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Understanding Hajj',
          headerStyle: {
            backgroundColor: '#1B5E20',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <LinearGradient
            colors={['#1B5E20', '#2E7D32']}
            style={styles.header}
          >
            <View style={styles.headerContent}>
              <BookOpen size={48} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Understanding Hajj</Text>
              <Text style={styles.headerSubtitle}>
                The Fifth Pillar of Islam - A Journey of Faith
              </Text>
            </View>
          </LinearGradient>

          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What is Hajj?</Text>
              <Text style={styles.paragraph}>
                Hajj is the annual Islamic pilgrimage to Mecca, Saudi Arabia, and is one of the Five Pillars of Islam. 
                It is a mandatory religious duty for Muslims who are physically and financially capable of undertaking 
                the journey, and must be carried out at least once in their lifetime.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Historical Significance</Text>
              <Text style={styles.paragraph}>
                The rituals of Hajj trace back to the time of Prophet Ibrahim (Abraham) and his family. The pilgrimage 
                commemorates the trials and triumphs of Ibrahim, his wife Hajar, and their son Ismail. These sacred 
                rituals have been performed for over 1,400 years, connecting millions of Muslims to their shared heritage.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Spiritual Significance</Text>
              <View style={styles.benefitCard}>
                <Heart size={24} color="#E91E63" />
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Purification of Soul</Text>
                  <Text style={styles.benefitText}>
                    Hajj cleanses the soul from sins and brings spiritual renewal
                  </Text>
                </View>
              </View>
              <View style={styles.benefitCard}>
                <Users size={24} color="#2196F3" />
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Unity of Ummah</Text>
                  <Text style={styles.benefitText}>
                    Brings together Muslims from all backgrounds in equality
                  </Text>
                </View>
              </View>
              <View style={styles.benefitCard}>
                <Star size={24} color="#FF9800" />
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Divine Reward</Text>
                  <Text style={styles.benefitText}>
                    A properly performed Hajj is rewarded with Paradise
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Who Must Perform Hajj?</Text>
              <Text style={styles.paragraph}>
                Hajj is obligatory (Fard) for every Muslim who meets the following conditions:
              </Text>
              <View style={styles.conditionsList}>
                <View style={styles.conditionItem}>
                  <View style={styles.conditionDot} />
                  <Text style={styles.conditionText}>Must be a Muslim</Text>
                </View>
                <View style={styles.conditionItem}>
                  <View style={styles.conditionDot} />
                  <Text style={styles.conditionText}>Must have reached the age of maturity (Baligh)</Text>
                </View>
                <View style={styles.conditionItem}>
                  <View style={styles.conditionDot} />
                  <Text style={styles.conditionText}>Must be mentally sound</Text>
                </View>
                <View style={styles.conditionItem}>
                  <View style={styles.conditionDot} />
                  <Text style={styles.conditionText}>Must be physically capable</Text>
                </View>
                <View style={styles.conditionItem}>
                  <View style={styles.conditionDot} />
                  <Text style={styles.conditionText}>Must have sufficient financial means</Text>
                </View>
                <View style={styles.conditionItem}>
                  <View style={styles.conditionDot} />
                  <Text style={styles.conditionText}>Must ensure family's needs are met during absence</Text>
                </View>
                <View style={styles.conditionItem}>
                  <View style={styles.conditionDot} />
                  <Text style={styles.conditionText}>Must have safe travel route available</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>When is Hajj Performed?</Text>
              <Text style={styles.paragraph}>
                Hajj is performed during the Islamic month of Dhul Hijjah, specifically from the 8th to the 12th day. 
                The exact dates vary each year according to the lunar calendar and moon sighting.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>The Reward of Hajj</Text>
              <View style={styles.hadithCard}>
                <Text style={styles.hadithText}>
                  "Whoever performs Hajj for the sake of Allah and does not commit any obscenity or transgression 
                  shall return as pure as the day his mother gave birth to him."
                </Text>
                <Text style={styles.hadithSource}>- Prophet Muhammad (ﷺ) [Bukhari & Muslim]</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Nusuk App - Essential for Hajj Pilgrims</Text>
              <Text style={styles.paragraph}>
                The Nusuk app is the official Saudi government platform that has revolutionized the Hajj experience. 
                All pilgrims are required to use this app for various services and bookings.
              </Text>
              
              <View style={styles.benefitCard}>
                <Star size={24} color="#FF9800" />
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Key Features for Hajj</Text>
                  <Text style={styles.benefitText}>
                    • Hajj permit and visa services\n
                    • Rawdah Sharif appointment booking in Madinah\n
                    • Transportation booking between holy sites\n
                    • Accommodation services and recommendations\n
                    • Real-time crowd information and guidance\n
                    • Prayer times and Qibla direction\n
                    • Emergency services and contacts
                  </Text>
                </View>
              </View>
              
              <Text style={styles.paragraph}>
                Download the Nusuk app before your journey and register with your passport information. 
                The app is available in multiple languages and provides essential services that make 
                your pilgrimage smoother and more organized.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preparation for Hajj</Text>
              <Text style={styles.paragraph}>
                Preparing for Hajj involves both physical and spiritual preparation. This includes learning the rituals, 
                obtaining necessary documents, getting required vaccinations, and most importantly, purifying one's 
                intentions and seeking forgiveness from others.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E8F5E9',
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    textAlign: 'justify',
  },
  benefitCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
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
    }),
  },
  benefitContent: {
    marginLeft: 16,
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  benefitText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  conditionsList: {
    marginTop: 12,
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  conditionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1B5E20',
    marginRight: 12,
  },
  conditionText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
    lineHeight: 22,
  },
  hadithCard: {
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1B5E20',
  },
  hadithText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#2E7D32',
    lineHeight: 24,
    marginBottom: 12,
  },
  hadithSource: {
    fontSize: 14,
    color: '#1B5E20',
    fontWeight: '600',
    textAlign: 'right',
  },
});