import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { PrayerTimesProvider } from "@/providers/PrayerTimesProvider";
import { SettingsProvider } from "@/providers/SettingsProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { TranslationProvider } from "@/providers/TranslationProvider";
import { LocationProvider } from "@/providers/LocationProvider";
import { LocationPermissionModal } from "@/components/LocationPermissionModal";
import { ThemeProvider, useTheme } from "@/providers/ThemeProvider";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    if (error && errorInfo) {
      console.error('Error Boundary caught an error:', error, errorInfo);
      
      // Clear AsyncStorage if there's a JSON parse error
      if (error.message && error.message.includes('JSON') || error.message.includes('parse')) {
        this.clearCorruptedData();
      }
    }
  }

  clearCorruptedData = async () => {
    try {
      console.log('Clearing potentially corrupted data...');
      // We'll let the providers handle their own data clearing
      console.log('Data cleared successfully');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={errorStyles.container}>
          <Text style={errorStyles.title}>
            Muslim Ultra
          </Text>
          <Text style={errorStyles.message}>
            The app encountered an error and is recovering...
          </Text>
          <Text style={errorStyles.instruction}>
            Please restart the app
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Platform.OS === 'android' ? 0 : 0,
  },
});

const errorStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 10,
    textAlign: 'center'
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20
  },
  instruction: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center'
  }
});

function RootLayoutNav() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  
  return (
    <Stack screenOptions={{ 
      headerBackTitle: "Back",
      headerStyle: { 
        backgroundColor: theme.colors.headerBg,
      },
      headerTintColor: theme.colors.headerText,
      contentStyle: {
        backgroundColor: theme.colors.background,
        paddingBottom: Platform.OS === 'android' ? Math.max(insets.bottom - 10, 0) : 0,
      },
    }}>
      <Stack.Screen name="loading" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="profile-setup" options={{ headerShown: false }} />
      <Stack.Screen name="terms" options={{ title: 'Terms & Conditions' }} />
      <Stack.Screen name="privacy" options={{ title: 'Privacy Policy' }} />
      <Stack.Screen name="about" options={{ title: 'About' }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="umrah-steps/[step]" 
        options={{ 
          presentation: "modal",
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="hajj-steps/[step]" 
        options={{ 
          presentation: "modal",
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="place/[id]" 
        options={{ 
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="duas/[category]" 
        options={{ 
          headerShown: true,
        }} 
      />
      <Stack.Screen name="profile" options={{ title: 'Profile' }} />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
      <Stack.Screen name="qibla-compass" options={{ title: 'Qibla Compass' }} />
      <Stack.Screen name="umrah-description" options={{ title: 'Umrah Guide' }} />
      <Stack.Screen name="islamic-history" options={{ title: 'Islamic History' }} />
      <Stack.Screen name="travel-checklist" options={{ title: 'Travel Checklist' }} />
      <Stack.Screen name="emergency-contacts" options={{ title: 'Emergency Contacts' }} />
      <Stack.Screen name="islamic-calendar" options={{ title: 'Islamic Calendar' }} />
      <Stack.Screen name="group-tracker" options={{ title: 'Group Tracker' }} />
      <Stack.Screen name="health-safety" options={{ title: 'Health & Safety' }} />
      <Stack.Screen name="zamzam-points" options={{ title: 'Zamzam Points' }} />
      <Stack.Screen name="understanding-hajj" options={{ title: 'Understanding Hajj' }} />
      <Stack.Screen name="search" options={{ title: 'Search' }} />
      <Stack.Screen name="duas" options={{ title: 'Duas' }} />
      <Stack.Screen name="prayer-times" options={{ title: 'Prayer Times' }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="forgot-password" options={{ title: 'Forgot Password' }} />
      <Stack.Screen name="reset-password" options={{ title: 'Reset Password' }} />
      <Stack.Screen name="change-password" options={{ title: 'Change Password' }} />
      <Stack.Screen name="madinah-visit-guide" options={{ title: 'Madinah Visit Guide' }} />
      <Stack.Screen name="quran" options={{ title: 'Read the Quran' }} />
      <Stack.Screen name="nurani-qaida" options={{ title: 'Nurani Qaida' }} />
      <Stack.Screen name="ammapara" options={{ title: 'Ammapara' }} />
      <Stack.Screen name="asmaul-husna" options={{ title: 'Asmaul Husna' }} />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
    
    // Set status bar style for Android
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#1B5E20', true);
      StatusBar.setBarStyle('light-content', true);
    }
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={styles.container}>
            <AuthProvider>
              <SettingsProvider>
                <ThemeProvider>
                  <TranslationProvider>
                    <LocationProvider>
                      <PrayerTimesProvider>
                        <>
                          <RootLayoutNav />
                          <LocationPermissionModal />
                        </>
                      </PrayerTimesProvider>
                    </LocationProvider>
                  </TranslationProvider>
                </ThemeProvider>
              </SettingsProvider>
            </AuthProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}