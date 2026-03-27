import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Clock,
  MapPin,
  RefreshCw,
  Sun,
  Sunrise,
  Sunset,
  Moon,
  Star,
  ChevronLeft,
  Navigation,
} from 'lucide-react-native';
import { router, Stack } from 'expo-router';
import { usePrayerTimes } from '@/providers/PrayerTimesProvider';
import { useLocation } from '@/providers/LocationProvider';
import { useTheme } from '@/providers/ThemeProvider';

interface PrayerTimes {
  Imsak: string;
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
}

interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export default function PrayerTimesScreen() {
  const { makkahTimes, madinahTimes, isLoading, refreshTimes } = usePrayerTimes();
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  
  const [selectedLocation, setSelectedLocation] = useState<'makkah' | 'madinah' | 'local'>('makkah');
  const [localTimes, setLocalTimes] = useState<PrayerTimes>({
    Imsak: '--:--',
    Fajr: '--:--',
    Sunrise: '--:--',
    Dhuhr: '--:--',
    Asr: '--:--',
    Sunset: '--:--',
    Maghrib: '--:--',
    Isha: '--:--'
  });
  const [localLocation, setLocalLocation] = useState<LocationData | null>(null);
  const [loadingLocal, setLoadingLocal] = useState(false);

  const prayerIcons = {
    Imsak: Star,
    Fajr: Star,
    Sunrise: Sunrise,
    Dhuhr: Sun,
    Asr: Sun,
    Sunset: Sunset,
    Maghrib: Sunset,
    Isha: Moon,
  };

  const prayerColors = {
    Imsak: '#3E2723',
    Fajr: '#4A148C',
    Sunrise: '#FF6F00',
    Dhuhr: '#F57C00',
    Asr: '#FF8F00',
    Sunset: '#FF5722',
    Maghrib: '#E65100',
    Isha: '#1A237E',
  };

  const getCurrentPrayerTimes = () => {
    switch (selectedLocation) {
      case 'makkah':
        return makkahTimes;
      case 'madinah':
        return madinahTimes;
      case 'local':
        return localTimes;
      default:
        return makkahTimes;
    }
  };

  const getLocationName = () => {
    switch (selectedLocation) {
      case 'makkah':
        return 'Makkah, Saudi Arabia';
      case 'madinah':
        return 'Madinah, Saudi Arabia';
      case 'local':
        return localLocation ? `${localLocation.city || 'Local'}, ${localLocation.country || 'Location'}` : 'Local Location';
      default:
        return 'Makkah, Saudi Arabia';
    }
  };

  const fetchLocalPrayerTimes = async (latitude: number, longitude: number) => {
    try {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const day = today.getDate();
      
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=4`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.code === 200 && data.data?.timings) {
        const timings = data.data.timings;
        setLocalTimes({
          Imsak: timings.Imsak || '--:--',
          Fajr: timings.Fajr,
          Sunrise: timings.Sunrise,
          Dhuhr: timings.Dhuhr,
          Asr: timings.Asr,
          Sunset: timings.Sunset || '--:--',
          Maghrib: timings.Maghrib,
          Isha: timings.Isha
        });
      }
    } catch (error) {
      // Error fetching local prayer times
    }
  };

  const { 
    location: deviceLocation, 
    requestLocationPermission: requestPermission, 
    getCurrentLocation,
    isLoadingLocation 
  } = useLocation();

  const requestLocationPermission = async () => {
    setLoadingLocal(true);
    try {
      const granted = await requestPermission();
      if (granted) {
        const loc = await getCurrentLocation();
        if (loc) {
          const { latitude, longitude } = loc.coords;
          setLocalLocation({ 
            latitude, 
            longitude,
            city: 'Local',
            country: 'Location'
          });
          await fetchLocalPrayerTimes(latitude, longitude);
          setSelectedLocation('local');
        }
      }
    } catch (error) {
      console.error('Error getting location:', error);
    } finally {
      setLoadingLocal(false);
    }
  };

  const formatTime = (time: string) => {
    if (!time || time === '--:--') return '--:--';
    
    try {
      const [hours, minutes] = time.split(':').map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      
      return date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    } catch {
      return time;
    }
  };

  const getNextPrayerForLocation = (times: PrayerTimes) => {
    // Check if we have valid prayer times
    const hasValidTimes = times && Object.values(times).some(time => time && time !== '--:--');
    if (!hasValidTimes) {
      return null;
    }
    
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const prayers = Object.entries(times).filter(([name]) => 
      !['Sunrise', 'Sunset'].includes(name)
    );
    
    // Find next prayer today
    for (const [name, time] of prayers) {
      if (!time || time === '--:--') continue;
      
      try {
        const [hours, minutes] = time.split(':').map(Number);
        if (isNaN(hours) || isNaN(minutes)) continue;
        
        const prayerTime = hours * 60 + minutes;
        
        if (prayerTime > currentTime) {
          const remaining = prayerTime - currentTime;
          const remainingHours = Math.floor(remaining / 60);
          const remainingMinutes = remaining % 60;
          
          return {
            name,
            time,
            remaining: `${remainingHours}h ${remainingMinutes}m`
          };
        }
      } catch (error) {
        continue;
      }
    }
    
    // If no prayer found today, next is Imsak/Fajr tomorrow
    const firstPrayer = times.Imsak && times.Imsak !== '--:--' ? 'Imsak' : 'Fajr';
    const firstPrayerTime = times.Imsak && times.Imsak !== '--:--' ? times.Imsak : times.Fajr;
    
    if (firstPrayerTime && firstPrayerTime !== '--:--') {
      try {
        const [hours, minutes] = firstPrayerTime.split(':').map(Number);
        if (!isNaN(hours) && !isNaN(minutes)) {
          const prayerTime = hours * 60 + minutes;
          const remaining = (24 * 60 - currentTime) + prayerTime;
          const remainingHours = Math.floor(remaining / 60);
          const remainingMinutes = remaining % 60;
          
          return {
            name: firstPrayer,
            time: firstPrayerTime,
            remaining: `${remainingHours}h ${remainingMinutes}m`
          };
        }
      } catch (error) {
        // Error parsing tomorrow's first prayer time
      }
    }
    
    return null;
  };

  const isCurrentPrayer = (prayerName: string, prayerTime: string) => {
    const currentTimes = getCurrentPrayerTimes();
    const currentNextPrayer = getNextPrayerForLocation(currentTimes);
    
    if (!currentNextPrayer || !prayerTime || prayerTime === '--:--') return false;
    return currentNextPrayer.name === prayerName;
  };

  const currentTimes = getCurrentPrayerTimes();
  const currentNextPrayer = getNextPrayerForLocation(currentTimes);
  
  const prayerEntries = Object.entries(currentTimes).filter(([name]) => 
    !['Sunrise', 'Sunset'].includes(name)
  );

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Prayer Times',
          headerStyle: { backgroundColor: '#1B5E20' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <ChevronLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#1B5E20', '#2E7D32']} style={styles.header}>
          <View style={styles.headerContent}>
            <Clock size={32} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Prayer Times</Text>
            <Text style={styles.headerSubtitle}>Stay connected with your prayers</Text>
          </View>
        </LinearGradient>

        {/* Location Selector */}
        <View style={styles.locationSection}>
          <Text style={styles.sectionTitle}>Select Location</Text>
          <View style={styles.locationButtons}>
            <TouchableOpacity
              style={[
                styles.locationButton,
                selectedLocation === 'makkah' && styles.locationButtonActive
              ]}
              onPress={() => setSelectedLocation('makkah')}
            >
              <Text style={[
                styles.locationButtonText,
                selectedLocation === 'makkah' && styles.locationButtonTextActive
              ]}>Makkah</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.locationButton,
                selectedLocation === 'madinah' && styles.locationButtonActive
              ]}
              onPress={() => setSelectedLocation('madinah')}
            >
              <Text style={[
                styles.locationButtonText,
                selectedLocation === 'madinah' && styles.locationButtonTextActive
              ]}>Madinah</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.locationButton,
                selectedLocation === 'local' && styles.locationButtonActive
              ]}
              onPress={requestLocationPermission}
              disabled={loadingLocal}
            >
              {loadingLocal ? (
                <ActivityIndicator size="small" color="#1B5E20" />
              ) : (
                <>
                  <Navigation size={16} color={selectedLocation === 'local' ? '#FFFFFF' : '#1B5E20'} />
                  <Text style={[
                    styles.locationButtonText,
                    selectedLocation === 'local' && styles.locationButtonTextActive
                  ]}>My Location</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.currentLocation}>
            <MapPin size={16} color="#666666" />
            <Text style={styles.currentLocationText}>{getLocationName()}</Text>
          </View>
        </View>

        {/* Next Prayer Card - Shows for all locations when valid times are available */}
        {currentNextPrayer && (
          <View style={styles.nextPrayerCard}>
            <LinearGradient colors={['#FFD700', '#FFC107']} style={styles.nextPrayerGradient}>
              <View style={styles.nextPrayerContent}>
                <View style={styles.nextPrayerLeft}>
                  <Clock size={24} color="#333333" />
                  <View style={styles.nextPrayerInfo}>
                    <Text style={styles.nextPrayerLabel}>Next Prayer</Text>
                    <Text style={styles.nextPrayerName}>{currentNextPrayer.name}</Text>
                  </View>
                </View>
                <View style={styles.nextPrayerRight}>
                  <Text style={styles.nextPrayerTime}>{formatTime(currentNextPrayer.time)}</Text>
                  <Text style={styles.nextPrayerRemaining}>in {currentNextPrayer.remaining}</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        )}
        
        {/* Prayer Times List */}
        <View style={styles.prayerSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today&apos;s Prayer Times</Text>
            <TouchableOpacity 
              onPress={refreshTimes}
              style={styles.refreshButton}
              disabled={isLoading}
            >
              <RefreshCw 
                size={20} 
                color="#1B5E20" 
                style={[styles.refreshIcon, isLoading && styles.refreshIconLoading]} 
              />
            </TouchableOpacity>
          </View>
          
          {prayerEntries.map(([prayerName, prayerTime]) => {
            const IconComponent = prayerIcons[prayerName as keyof typeof prayerIcons];
            const isNext = isCurrentPrayer(prayerName, prayerTime);
            
            return (
              <View 
                key={prayerName} 
                style={[
                  styles.prayerCard,
                  isNext && styles.prayerCardActive
                ]}
              >
                <View style={styles.prayerCardContent}>
                  <View style={styles.prayerLeft}>
                    <View style={[
                      styles.prayerIconContainer,
                      { backgroundColor: prayerColors[prayerName as keyof typeof prayerColors] + '20' }
                    ]}>
                      <IconComponent 
                        size={24} 
                        color={prayerColors[prayerName as keyof typeof prayerColors]} 
                      />
                    </View>
                    <View style={styles.prayerInfo}>
                      <Text style={[
                        styles.prayerName,
                        isNext && styles.prayerNameActive
                      ]}>{prayerName}</Text>
                      <Text style={styles.prayerArabic}>
                        {prayerName === 'Imsak' && 'الإمساك'}
                        {prayerName === 'Fajr' && 'الفجر'}
                        {prayerName === 'Dhuhr' && 'الظهر'}
                        {prayerName === 'Asr' && 'العصر'}
                        {prayerName === 'Maghrib' && 'المغرب'}
                        {prayerName === 'Isha' && 'العشاء'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.prayerRight}>
                    <Text style={[
                      styles.prayerTime,
                      isNext && styles.prayerTimeActive
                    ]}>{formatTime(prayerTime)}</Text>
                    {isNext && (
                      <Text style={styles.nextLabel}>Next</Text>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Additional Times */}
        <View style={styles.additionalSection}>
          <Text style={styles.sectionTitle}>Additional Times</Text>
          
          <View style={styles.additionalCard}>
            <View style={styles.additionalContent}>
              <View style={styles.additionalLeft}>
                <View style={styles.additionalIconContainer}>
                  <Sunrise size={20} color="#FF6F00" />
                </View>
                <Text style={styles.additionalText}>Sunrise</Text>
              </View>
              <Text style={styles.additionalTime}>{formatTime(currentTimes.Sunrise)}</Text>
            </View>
          </View>
          
          {currentTimes.Sunset !== '--:--' && (
            <View style={styles.additionalCard}>
              <View style={styles.additionalContent}>
                <View style={styles.additionalLeft}>
                  <View style={[styles.additionalIconContainer, { backgroundColor: '#FFEBEE' }]}>
                    <Sunset size={20} color="#FF5722" />
                  </View>
                  <Text style={styles.additionalText}>Sunset</Text>
                </View>
                <Text style={[styles.additionalTime, { color: '#FF5722' }]}>{formatTime(currentTimes.Sunset)}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Footer Info */}
        <View style={styles.footerInfo}>
          <Text style={styles.footerText}>
            Prayer times are calculated using the Islamic Society of North America (ISNA) method.
          </Text>
          <Text style={styles.footerText}>
            Times may vary slightly based on your exact location and local conditions.
          </Text>
        </View>
      </ScrollView>
    </View>
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E8F5E9',
    textAlign: 'center',
  },
  locationSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  locationButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  locationButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1B5E20',
    backgroundColor: '#FFFFFF',
    gap: 6,
  },
  locationButtonActive: {
    backgroundColor: '#1B5E20',
  },
  locationButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B5E20',
  },
  locationButtonTextActive: {
    color: '#FFFFFF',
  },
  currentLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  currentLocationText: {
    fontSize: 14,
    color: '#666666',
  },
  nextPrayerCard: {
    marginHorizontal: 20,
    marginBottom: 20,
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
    }),
  },
  nextPrayerGradient: {
    padding: 20,
  },
  nextPrayerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextPrayerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextPrayerInfo: {
    marginLeft: 12,
  },
  nextPrayerLabel: {
    fontSize: 12,
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  nextPrayerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 2,
  },
  nextPrayerRight: {
    alignItems: 'flex-end',
  },
  nextPrayerTime: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  nextPrayerRemaining: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  prayerSection: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  refreshButton: {
    padding: 8,
  },
  refreshIcon: {
    // No animation styles here since we're not using reanimated
  },
  refreshIconLoading: {
    opacity: 0.5,
  },
  prayerCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  prayerCardActive: {
    backgroundColor: '#E8F5E9',
    borderWidth: 2,
    borderColor: '#1B5E20',
  },
  prayerCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  prayerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  prayerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  prayerInfo: {
    flex: 1,
  },
  prayerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  prayerNameActive: {
    color: '#1B5E20',
    fontWeight: 'bold',
  },
  prayerArabic: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  prayerRight: {
    alignItems: 'flex-end',
  },
  prayerTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  prayerTimeActive: {
    color: '#1B5E20',
  },
  nextLabel: {
    fontSize: 10,
    color: '#1B5E20',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 2,
  },
  additionalSection: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  additionalCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  additionalContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  additionalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  additionalIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  additionalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  additionalTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6F00',
  },
  footerInfo: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 8,
  },
});