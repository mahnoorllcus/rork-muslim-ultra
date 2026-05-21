import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useLocation } from '@/providers/LocationProvider';
import { MapPin, Compass, Navigation } from 'lucide-react-native';
import { Magnetometer } from 'expo-sensors';

const KAABA_COORDS = { latitude: 21.4225, longitude: 39.8262 };

interface LocationCoords {
  latitude: number;
  longitude: number;
}

export default function QiblaCompassScreen() {
  const [userLocation, setUserLocation] = useState<LocationCoords | null>(null);
  const [qiblaDirection, setQiblaDirection] = useState<number>(0);
  const [locationStatus, setLocationStatus] = useState<string>('Getting location...');
  const [distance, setDistance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  
  // High-performance animated variables using native drivers
  const compassRotationAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const magnetometerSubscription = useRef<any>(null);

  const { 
    requestLocationPermission: requestPermission, 
    getCurrentLocation,
  } = useLocation();

  useEffect(() => {
    requestLocationPermission();
    startMagnetometer();
    
    return () => {
      stopMagnetometer();
    };
  }, []);

  useEffect(() => {
    if (userLocation) {
      const qibla = calculateQiblaDirection(userLocation, KAABA_COORDS);
      setQiblaDirection(qibla);
      const dist = calculateDistance(userLocation, KAABA_COORDS);
      setDistance(dist);
    }
  }, [userLocation]);

  useEffect(() => {
    // To orient a virtual dial with real-world sensors, 
    // the dial graphic must rotate in the exact opposite direction (-deviceHeading)
    const targetDialRotation = -deviceHeading;
    
    Animated.spring(compassRotationAnim, {
      toValue: targetDialRotation,
      useNativeDriver: true,
      friction: 9,
      tension: 45,
    }).start();
  }, [deviceHeading]);

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.12,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();
    
    return () => pulseAnimation.stop();
  }, []);

  const startMagnetometer = async () => {
    try {
      const isAvailable = await Magnetometer.isAvailableAsync();
      if (!isAvailable) {
        setLocationStatus('Compass sensor unavailable');
        return;
      }

      Magnetometer.setUpdateInterval(80); // Sweeter, lower interval for fluid 60fps tracking
      magnetometerSubscription.current = Magnetometer.addListener((data) => {
        const { x, y } = data;
        
        // Calculate heading in radians, convert to degrees, then normalize north reference
        let heading = Math.atan2(y, x) * (180 / Math.PI);
        heading = heading < 0 ? heading + 360 : heading;
        
        // Compensate for hardware layout differences across platform kernels
        const adjustedHeading = Platform.OS === 'ios' ? heading : (heading + 90) % 360;
        setDeviceHeading(adjustedHeading);
      });
    } catch (error) {
      console.error('Error starting magnetometer:', error);
    }
  };

  const stopMagnetometer = () => {
    if (magnetometerSubscription.current) {
      magnetometerSubscription.current.remove();
      magnetometerSubscription.current = null;
    }
  };

  const requestLocationPermission = async () => {
    try {
      setIsLoading(true);
      const granted = await requestPermission();
      if (!granted) {
        setLocationStatus('Location permission denied');
        return;
      }
      
      setLocationStatus('Pinpointing your position...');
      const location = await getCurrentLocation();
      
      if (location) {
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setLocationStatus('Location found');
      } else {
        setLocationStatus('Failed to retrieve precision coordinates');
      }
    } catch (error) {
      console.error('Error getting location:', error);
      setLocationStatus('Failed to get location');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateQiblaDirection = (userCoords: LocationCoords, kaabaCoords: LocationCoords): number => {
    const lat1 = (userCoords.latitude * Math.PI) / 180;
    const lat2 = (kaabaCoords.latitude * Math.PI) / 180;
    const deltaLng = ((kaabaCoords.longitude - userCoords.longitude) * Math.PI) / 180;

    const x = Math.sin(deltaLng) * Math.cos(lat2);
    const y = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);

    let bearing = Math.atan2(x, y);
    bearing = (bearing * 180) / Math.PI;
    return (bearing + 360) % 360;
  };

  const calculateDistance = (userCoords: LocationCoords, kaabaCoords: LocationCoords): number => {
    const R = 6371; // Earth's mean radius
    const lat1 = (userCoords.latitude * Math.PI) / 180;
    const lat2 = (kaabaCoords.latitude * Math.PI) / 180;
    const deltaLat = ((kaabaCoords.latitude - userCoords.latitude) * Math.PI) / 180;
    const deltaLng = ((kaabaCoords.longitude - userCoords.longitude) * Math.PI) / 180;

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const refreshLocation = () => {
    setUserLocation(null);
    setLocationStatus('Getting location...');
    requestLocationPermission();
  };

  const getDirectionName = (degrees: number): string => {
    const directions = [
      'North', 'North-Northeast', 'Northeast', 'East-Northeast',
      'East', 'East-Southeast', 'Southeast', 'South-Southeast',
      'South', 'South-Southwest', 'Southwest', 'West-Southwest',
      'West', 'West-Northwest', 'Northwest', 'North-Northwest'
    ];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  // Interpolation logic for mapping numerical degrees smoothly to degree strings
  const interpolatedDialRotation = compassRotationAnim.interpolate({
    inputRange: [-360, 360],
    outputRange: ['-360deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Qibla Direction',
          headerStyle: { backgroundColor: '#1B5E20' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <View style={styles.header}>
          <Compass size={44} color="#1B5E20" />
          <Text style={styles.title}>Qibla Finder</Text>
          <Text style={styles.subtitle}>{locationStatus}</Text>
        </View>

        {userLocation ? (
          <>
            <View style={styles.directionCard}>
              <View style={styles.qiblaIconContainer}>
                <Text style={styles.kaabaEmoji}>🕋</Text>
              </View>
              <Text style={styles.qiblaDirectionText}>Target Angle</Text>
              <Text style={styles.qiblaAngle}>{Math.round(qiblaDirection)}°</Text>
              <Text style={styles.directionName}>{getDirectionName(qiblaDirection)}</Text>
            </View>

            <View style={styles.infoGrid}>
              <View style={styles.infoCard}>
                <Navigation size={22} color="#4CAF50" />
                <Text style={styles.infoLabel}>Distance to Mecca</Text>
                <Text style={styles.infoValue}>{Math.round(distance).toLocaleString()} km</Text>
              </View>
              
              <View style={styles.infoCard}>
                <MapPin size={22} color="#2196F3" />
                <Text style={styles.infoLabel}>Current Geolocation</Text>
                <Text style={styles.infoValue}>
                  {userLocation.latitude.toFixed(3)}°, {userLocation.longitude.toFixed(3)}°
                </Text>
              </View>
            </View>

            <View style={styles.compassContainer}>
              <View style={styles.compass3DBase}>
                <View style={styles.compassRim}>
                  <View style={styles.compassOuterRing} />
                  
                  {/* The actual rotating element matching phone rotation */}
                  <Animated.View style={[styles.compassFace, { transform: [{ rotate: interpolatedDialRotation }] }]}>
                    <View style={styles.cardinalContainer}>
                      <Text style={[styles.cardinalDirection3D, styles.directionNorth]}>N</Text>
                      <Text style={[styles.cardinalDirection3D, styles.directionEast]}>E</Text>
                      <Text style={[styles.cardinalDirection3D, styles.directionSouth]}>S</Text>
                      <Text style={[styles.cardinalDirection3D, styles.directionWest]}>W</Text>
                    </View>
                    
                    {Array.from({ length: 36 }, (_, i) => i * 10).map((degree) => (
                      <View
                        key={degree}
                        style={[
                          styles.degreeMarker3D,
                          { transform: [{ rotate: `${degree}deg` }] }
                        ]}
                      >
                        <View style={[
                          degree % 90 === 0 ? styles.majorTick : 
                          degree % 30 === 0 ? styles.mediumTick : styles.minorTick
                        ]} />
                        {degree % 30 === 0 && degree % 90 !== 0 && (
                          <Text style={styles.degreeText}>{degree}°</Text>
                        )}
                      </View>
                    ))}
                    
                    {/* Qibla arrow indicator anchored firmly inside the dynamic layout context */}
                    <View style={[styles.qiblaArrowContainer, { transform: [{ rotate: `${qiblaDirection}deg` }] }]}>
                      <View style={styles.arrowLine3D} />
                      <View style={styles.arrowHead3D} />
                      
                      <Animated.View style={[styles.kaabaIndicator, { transform: [{ scale: pulseAnim }] }]}>
                        <View style={styles.kaabaSymbol}>
                          <Text style={styles.kaabaText}>🕋</Text>
                        </View>
                      </Animated.View>
                    </View>
                  </Animated.View>

                  {/* Core structural pivot point (Static Overlay) */}
                  <View style={styles.centerDot3D}>
                    <View style={styles.centerDotInner} />
                  </View>

                  {/* Glare/Glass overlay effect (Static Overlay) */}
                  <View style={styles.compassGlass} pointerEvents="none" />
                </View>
              </View>
              
              <View style={styles.compassLabels}>
                <Text style={styles.compassTitle}>Dynamic Compass Alignment</Text>
                <Text style={styles.compassSubtitle}>Rotate your phone until the 🕋 icon touches North (N)</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.refreshButton}
              onPress={refreshLocation}
              activeOpacity={0.7}
              disabled={isLoading}
            >
              <MapPin size={20} color="#FFFFFF" />
              <Text style={styles.buttonText}>
                {isLoading ? 'Calibrating Position...' : 'Recalibrate GPS'}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.loadingContainer}>
            <Compass size={64} color="#1B5E20" />
            <Text style={styles.loadingText}>{locationStatus}</Text>
            {!isLoading && (
              <TouchableOpacity
                style={styles.getLocationButton}
                onPress={refreshLocation}
                activeOpacity={0.7}
              >
                <MapPin size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Initialize Location Services</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <View style={styles.instructions}>
          <Text style={styles.instructionTitle}>Usage Parameters:</Text>
          <Text style={styles.instructionText}>• Lay the device flat on an even, horizontal surface.</Text>
          <Text style={styles.instructionText}>• Keep away from high magnetic interference (speakers, laptops, metal cases).</Text>
          <Text style={styles.instructionText}>• Turn the body until the green pointer matches up straight ahead.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const { width: screenWidth } = Dimensions.get('window');
const COMPASS_DIAL_SIZE = Math.min(screenWidth - 60, 330);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginTop: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  directionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 12 },
      android: { elevation: 4 },
    }),
  },
  qiblaIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  kaabaEmoji: {
    fontSize: 36,
  },
  qiblaDirectionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  qiblaAngle: {
    fontSize: 54,
    fontWeight: '800',
    color: '#1B5E20',
    marginVertical: 2,
  },
  directionName: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '600',
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 6,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6 },
      android: { elevation: 2 },
    }),
  },
  infoLabel: {
    fontSize: 11,
    color: '#9E9E9E',
    marginTop: 6,
    fontWeight: '500',
    textAlign: 'center',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
    marginTop: 2,
    textAlign: 'center',
  },
  compassContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  compass3DBase: {
    width: COMPASS_DIAL_SIZE,
    height: COMPASS_DIAL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 20 },
      android: { elevation: 10 },
    }),
  },
  compassRim: {
    width: '100%',
    height: '100%',
    borderRadius: COMPASS_DIAL_SIZE / 2,
    backgroundColor: '#263238',
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassOuterRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: COMPASS_DIAL_SIZE / 2,
    borderWidth: 2,
    borderColor: '#37474F',
  },
  compassFace: {
    width: '100%',
    height: '100%',
    borderRadius: COMPASS_DIAL_SIZE / 2,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardinalContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  cardinalDirection3D: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#37474F',
  },
  directionNorth: { top: 22, left: '50%', marginLeft: -7, color: '#D32F2F' },
  directionEast: { right: 22, top: '50%', marginTop: -11 },
  directionSouth: { bottom: 22, left: '50%', marginLeft: -6 },
  directionWest: { left: 22, top: '50%', marginTop: -11 },
  qiblaArrowContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowLine3D: {
    width: 4,
    height: COMPASS_DIAL_SIZE / 2.6,
    backgroundColor: '#2E7D32',
    borderRadius: 2,
    // Shifts line up so it points from center outwards
    transform: [{ translateY: -COMPASS_DIAL_SIZE / 6.5 }], 
  },
  arrowHead3D: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#2E7D32',
    position: 'absolute',
    top: '10%',
  },
  kaabaIndicator: {
    position: 'absolute',
    top: '-3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kaabaSymbol: {
    width: 32,
    height: 32,
    backgroundColor: '#111111',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFD700',
  },
  kaabaText: {
    fontSize: 16,
  },
  centerDot3D: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#37474F',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 15,
  },
  centerDotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D32F2F',
  },
  degreeMarker3D: {
    position: 'absolute',
    width: 2,
    height: COMPASS_DIAL_SIZE,
    alignItems: 'center',
  },
  majorTick: { width: 2, height: 12, backgroundColor: '#37474F' },
  mediumTick: { width: 1.5, height: 8, backgroundColor: '#78909C' },
  minorTick: { width: 1, height: 5, backgroundColor: '#B0BEC5' },
  degreeText: {
    fontSize: 8,
    color: '#546E7A',
    fontWeight: '600',
    marginTop: 14,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  loadingText: {
    fontSize: 15,
    color: '#666666',
    marginTop: 16,
    marginBottom: 24,
  },
  getLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B5E20',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B5E20',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: 10,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
      android: { elevation: 2 },
    }),
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 15,
  },
  instructions: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 18,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 6 },
      android: { elevation: 1 },
    }),
  },
  instructionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
    marginBottom: 4,
  },
  compassGlass: {
    position: 'absolute',
    width: '96%',
    height: '96%',
    borderRadius: COMPASS_DIAL_SIZE / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    zIndex: 20,
  },
  compassLabels: {
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 32,
  },
  compassTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#263238',
    marginBottom: 2,
  },
  compassSubtitle: {
    fontSize: 13,
    color: '#78909C',
    textAlign: 'center',
    lineHeight: 16,
  },
});
