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
  
  const rotationAnim = useRef(new Animated.Value(0)).current;
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
    // Computes relative heading adjustments cleanly
    const targetRotation = (qiblaDirection - deviceHeading + 360) % 360;
    
    Animated.spring(rotationAnim, {
      toValue: targetRotation,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, [qiblaDirection, deviceHeading]);

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
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

      Magnetometer.setUpdateInterval(100);
      magnetometerSubscription.current = Magnetometer.addListener((data) => {
        const { x, y } = data;
        // Calculates heading relative to magnetic north
        let heading = Math.atan2(y, x) * (180 / Math.PI);
        heading = heading < 0 ? heading + 360 : heading;
        setDeviceHeading(heading);
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
      
      setLocationStatus('Getting your location...');
      const location = await getCurrentLocation();
      
      if (location) {
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setLocationStatus('Location found');
      } else {
        setLocationStatus('Failed to get location');
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
    const R = 6371; // Radius of earth in km
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
          <Compass size={48} color="#1B5E20" />
          <Text style={styles.title}>🕋 Qibla Direction Calculator</Text>
          <Text style={styles.subtitle}>{locationStatus}</Text>
        </View>

        {userLocation ? (
          <>
            <View style={styles.directionCard}>
              <View style={styles.qiblaIconContainer}>
                <Text style={styles.kaabaEmoji}>🕋</Text>
              </View>
              <Text style={styles.qiblaDirectionText}>Qibla Direction</Text>
              <Text style={styles.qiblaAngle}>{Math.round(qiblaDirection)}°</Text>
              <Text style={styles.directionName}>{getDirectionName(qiblaDirection)}</Text>
            </View>

            <View style={styles.infoGrid}>
              <View style={styles.infoCard}>
                <Navigation size={24} color="#4CAF50" />
                <Text style={styles.infoLabel}>Distance to Kaaba</Text>
                <Text style={styles.infoValue}>{Math.round(distance)} km</Text>
              </View>
              
              <View style={styles.infoCard}>
                <MapPin size={24} color="#2196F3" />
                <Text style={styles.infoLabel}>Your Location</Text>
                <Text style={styles.infoValue}>
                  {userLocation.latitude.toFixed(2)}°, {userLocation.longitude.toFixed(2)}°
                </Text>
              </View>
            </View>

            <View style={styles.compassContainer}>
              <View style={styles.compass3DBase}>
                <View style={styles.compassRim}>
                  <View style={styles.compassOuterRing} />
                  
                  <View style={styles.compassFace}>
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
                    
                    {/* The pointer and the Kaaba symbol grouped inside the animated container */}
                    <Animated.View 
                      style={[
                        styles.qiblaArrow3D,
                        { 
                          transform: [{ 
                            rotate: rotationAnim.interpolate({
                              inputRange: [0, 360],
                              outputRange: ['0deg', '360deg']
                            }) 
                          }] 
                        }
                      ]}
                    >
                      <View style={styles.arrowShadow} />
                      <View style={styles.arrowLine3D} />
                      <View style={styles.arrowHead3D} />
                      
                      <Animated.View style={[styles.kaabaIndicator, { transform: [{ scale: pulseAnim }] }]}>
                        <View style={styles.kaabaSymbol}>
                          <Text style={styles.kaabaText}>🕋</Text>
                        </View>
                      </Animated.View>
                    </Animated.View>
                    
                    <View style={styles.centerDot3D}>
                      <View style={styles.centerDotInner} />
                    </View>
                    
                    <View style={styles.compassGlass} />
                  </View>
                </View>
              </View>
              
              <View style={styles.compassLabels}>
                <Text style={styles.compassTitle}>Qibla Compass</Text>
                <Text style={styles.compassSubtitle}>Point top of phone towards Mecca</Text>
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
                {isLoading ? 'Getting Location...' : 'Refresh Location'}
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
                <Text style={styles.buttonText}>Get My Location</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <View style={styles.instructions}>
          <Text style={styles.instructionTitle}>How to use:</Text>
          <Text style={styles.instructionText}>• Allow location access when prompted</Text>
          <Text style={styles.instructionText}>• Turn around until the green line points directly North (N)</Text>
          <Text style={styles.instructionText}>• Keep phone flat for best accuracy</Text>
          {userLocation && (
            <Text style={styles.instructionText}>
              • The Kaaba is {Math.round(distance)} km away from you
            </Text>
          )}
        </View>

        <View style={styles.additionalInfo}>
          <Text style={styles.infoTitle}>📍 Kaaba Coordinates</Text>
          <Text style={styles.infoText}>Latitude: 21.4225° N, Longitude: 39.8262° E</Text>
          <Text style={styles.infoText}>Mecca, Saudi Arabia</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const { width: screenWidth } = Dimensions.get('window');
const COMPASS_DIAL_SIZE = Math.min(screenWidth - 60, 320);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  directionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8 },
      android: { elevation: 6 },
    }),
  },
  qiblaIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  kaabaEmoji: {
    fontSize: 40,
  },
  qiblaDirectionText: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 5,
  },
  qiblaAngle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 5,
  },
  directionName: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4 },
      android: { elevation: 3 },
    }),
  },
  infoLabel: {
    fontSize: 12,
    color: '#999999',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },
  compassContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    marginHorizontal: 20,
  },
  compass3DBase: {
    width: COMPASS_DIAL_SIZE,
    height: COMPASS_DIAL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16 },
      android: { elevation: 12 },
    }),
  },
  compassRim: {
    width: '100%',
    height: '100%',
    borderRadius: COMPASS_DIAL_SIZE / 2,
    backgroundColor: '#2C3E50',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassOuterRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: COMPASS_DIAL_SIZE / 2,
    borderWidth: 4,
    borderColor: '#34495E',
  },
  compassFace: {
    width: '90%',
    height: '90%',
    borderRadius: (COMPASS_DIAL_SIZE * 0.9) / 2,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#BDC3C7',
  },
  cardinalContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  cardinalDirection3D: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    textShadowColor: '#BDC3C7',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  directionNorth: { top: 15, left: '50%', marginLeft: -10, color: '#E74C3C' },
  directionEast: { right: 15, top: '50%', marginTop: -12 },
  directionSouth: { bottom: 15, left: '50%', marginLeft: -10 },
  directionWest: { left: 15, top: '50%', marginTop: -12 },
  qiblaArrow3D: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  arrowShadow: {
    position: 'absolute',
    width: 6,
    height: COMPASS_DIAL_SIZE / 3.5,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 3,
    transform: [{ translateX: 2 }, { translateY: -22 }],
  },
  arrowLine3D: {
    width: 6,
    height: COMPASS_DIAL_SIZE / 3.5,
    backgroundColor: '#27AE60',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#229954',
    transform: [{ translateY: -25 }],
  },
  arrowHead3D: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 24,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#27AE60',
    position: 'absolute',
    top: '12%',
  },
  kaabaIndicator: {
    position: 'absolute',
    top: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 8,
  },
  kaabaSymbol: {
    width: 36,
    height: 36,
    backgroundColor: '#2C3E50',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#1A252F',
  },
  kaabaText: {
    fontSize: 18,
  },
  centerDot3D: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#34495E',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#2C3E50',
    zIndex: 10,
  },
  centerDotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E74C3C',
  },
  degreeMarker3D: {
    position: 'absolute',
    width: 2,
    height: COMPASS_DIAL_SIZE / 2.2,
    alignItems: 'center',
  },
  majorTick: { width: 3, height: 16, backgroundColor: '#2C3E50', borderRadius: 1.5 },
  mediumTick: { width: 2, height: 10, backgroundColor: '#34495E', borderRadius: 1 },
  minorTick: { width: 1, height: 6, backgroundColor: '#7F8C8D', borderRadius: 0.5 },
  degreeText: {
    fontSize: 9,
    color: '#2C3E50',
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 20,
    marginBottom: 30,
  },
  getLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B5E20',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B5E20',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 20,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
      android: { elevation: 4 },
    }),
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  instructions: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  additionalInfo: {
    backgroundColor: '#E8F5E9',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#2E7D32',
    marginBottom: 5,
    textAlign: 'center',
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  compassGlass: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: (COMPASS_DIAL_SIZE * 0.9) / 2,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  compassLabels: {
    alignItems: 'center',
    marginTop: 20,
  },
  compassTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  compassSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    fontStyle: 'italic',
  },
});
