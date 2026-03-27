import { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoadingScreen() {
  const router = useRouter();
  const { isLoading, isFirstLaunch, user } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        if (isFirstLaunch) {
          router.replace('/welcome');
        } else if (user) {
          router.replace('/(tabs)/home');
        } else {
          router.replace('/welcome');
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isFirstLaunch, user, router]);

  return (
    <LinearGradient
      colors={['#1B5E20', '#2E7D32', '#388E3C']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>☪</Text>
          </View>
        </View>
        
        <Text style={styles.title}>Muslim Ultra</Text>
        <Text style={styles.subtitle}>Hajj Guide with Prayer & Quran</Text>
        <Text style={styles.tagline}>Umrah & Hajj</Text>
        
        <ActivityIndicator size="large" color="#FFD700" style={styles.loader} />
        
        <View style={styles.footer}>
          <Text style={styles.poweredBy}>Powered by</Text>
          <Text style={styles.company}>Mahnoor LLC</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  logoText: {
    fontSize: 60,
    color: '#FFD700',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#E8F5E9',
    marginBottom: 5,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: '600',
    marginBottom: 40,
  },
  loader: {
    marginTop: 30,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  poweredBy: {
    fontSize: 12,
    color: '#E8F5E9',
    marginBottom: 5,
  },
  company: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
});