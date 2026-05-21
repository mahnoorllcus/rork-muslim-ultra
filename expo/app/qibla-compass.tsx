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
import { MapPin, Compass, Navigation, CheckCircle2 } from 'lucide-react-native';
import { Magnetometer } from 'expo-sensors';

const KAABA_COORDS = { latitude: 21.4225, longitude: 39.8262 };

interface LocationCoords {
  latitude: number;
  longitude: number;
}

export default function MuslimProQiblaScreen() {
  const [userLocation, setUserLocation] = useState<LocationCoords | null>(null);
  const [qiblaDirection, setQiblaDirection] = useState<number>(0);
  const [locationStatus, setLocationStatus] = useState<string>('Calibrating location...');
  const [distance, setDistance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  
  // Physics-based spring animations for fluid hardware mapping
  const dialRotationAnim = useRef(new Animated.Value(0)).current;
  const magnetometerSubscription = useRef<any>(null);

  const { requestLocationPermission: requestPermission, getCurrentLocation } = useLocation();

  useEffect(() => {
    requestLocationPermission();
    startMagnetometer();
    return () => stopMagnetometer();
  }, []);

  useEffect(() => {
    if (userLocation) {
      const qibla = calculateQiblaDirection(userLocation, KAABA_COORDS);
      setQiblaDirection(qibla);
      setDistance(calculateDistance(userLocation, KAABA_COORDS));
    }
  }, [userLocation]);

  useEffect(() => {
    // Muslim Pro Mechanic: The Dial rotates relative to the calculated Qibla path offset
    const targetDialRotation = qiblaDirection - deviceHeading;
    
    Animated.spring(dialRotationAnim, {
      toValue: targetDialRotation,
      useNativeDriver: true,
      friction: 8,
      tension: 35,
    }).start();
  }, [deviceHeading, qiblaDirection]);

  const startMagnetometer = async () => {
    try {
      const isAvailable = await Magnetometer.isAvailableAsync();
      if (!isAvailable) {
        setLocationStatus('Sensor array unavailable');
        return;
      }
      Magnetometer.setUpdateInterval(60); // Ultra-low update interval for responsive 60fps tracking
      magnetometerSubscription.current = Magnetometer.addListener((data) => {
        const { x, y } = data;
        let heading = Math.atan2(y, x) * (180 / Math.PI);
        heading = heading < 0 ? heading + 360 : heading;
        const adjustedHeading = Platform.OS === 'ios' ? heading : (heading + 90) % 360;
        setDeviceHeading(adjustedHeading);
      });
    } catch (error) {
      console.error(error);
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
        setLocationStatus('GPS Access Denied');
        return;
      }
      const location = await getCurrentLocation();
      if (location) {
        setUserLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
        setLocationStatus('GPS Lock Established');
      }
    } catch (error) {
      setLocationStatus('GPS Resolution Failed');
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
    return (Math.atan2(x, y) * 180 / Math.PI + 360) % 360;
  };

  const calculateDistance = (userCoords: LocationCoords, kaabaCoords: LocationCoords): number => {
    const R = 6371;
    const lat1 = (userCoords.latitude * Math.PI) / 180;
    const lat2 = (kaabaCoords.latitude * Math.PI) / 180;
    const dLat = ((kaabaCoords.latitude - userCoords.latitude) * Math.PI) / 180;
    const dLng = ((kaabaCoords.longitude - userCoords.longitude) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  // Determine alignment within a strict 3-degree allowance window
  const isAligned = Math.abs((qiblaDirection - deviceHeading + 360) % 360) < 3 || Math.abs((qiblaDirection - deviceHeading + 360) % 360) > 357;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Qibla', headerStyle: { backgroundColor: '#0C3A1A' }, headerTintColor: '#FFFFFF' }} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Top Feedback Banner */}
        <View style={[styles.statusBanner, isAligned && styles.statusBannerAligned]}>
          {isAligned ? (
            <View style={styles.rowCenter}>
              <CheckCircle2 size={20} color="#FFFFFF" />
              <Text style={styles.statusBannerTextAligned}>You are facing Mecca</Text>
            </View>
          ) : (
            <Text style={styles.statusBannerText}>Rotate phone to align with the target marker</Text>
          )}
        </View>

        {userLocation && (
          <View style={styles.compassWrapperZone}>
            
            {/* Target Beacon - Fixed Top Target Element */}
            <View style={styles.topTargetBeacon}>
              <View style={[styles.kaabaTargetNode, isAligned && styles.kaabaTargetNodeActive]}>
                <Text style={styles.kaabaMarkerIcon}>🕋</Text>
              </View>
              <View style={[styles.targetIndicatorLine, isAligned && styles.targetIndicatorLineActive]} />
            </View>

            {/* Main Compass Housing */}
            <View style={[styles.compassHousingFrame, isAligned && styles.compassHousingFrameAligned]}>
              <Animated.View style={[styles.rotatableDial, {
                transform: [{
                  rotate: dialRotationAnim.interpolate({
                    inputRange: [-360, 360],
                    outputRange: ['-360deg', '360deg']
                  })
                }]
              }]}>
                
                {/* Cardinal Points */}
                <Text style={[styles.cardinalPoint, styles.pointN]}>N</Text>
                <Text style={[styles.cardinalPoint, styles.pointE]}>E</Text>
                <Text style={[styles.cardinalPoint, styles.pointS]}>S</Text>
                <Text style={[styles.cardinalPoint, styles.pointW]}>W</Text>

                {/* Ring Scale Increments */}
                {Array.from({ length: 24 }, (_, i) => i * 15).map((degree) => (
                  <View key={degree} style={[styles.scaleNode, { transform: [{ rotate: `${degree}deg` }] }]}>
                    <View style={degree % 90 === 0 ? styles.scaleTickMajor : styles.scaleTickMinor} />
                  </View>
                ))}

                {/* Central Guidance Arrow Pointer */}
                <View style={[styles.centerNeedleStem, isAligned && styles.centerNeedleStemActive]} />
              </Animated.View>
              
              <View style={styles.centralCapPivot} />
            </View>
          </View>
        )}

        {/* Global Data Cards */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricItemCard}>
            <Navigation size={18} color="#0C3A1A" />
            <Text style={styles.metricLabel}>Mecca Bearing</Text>
            <Text style={styles.metricValue}>{Math.round(qiblaDirection)}° N</Text>
          </View>
          <View style={styles.metricItemCard}>
            <MapPin size={18} color="#0C3A1A" />
            <Text style={styles.metricLabel}>Distance</Text>
            <Text style={styles.metricValue}>{Math.round(distance).toLocaleString()} km</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.calibrationButton} onPress={refreshLocation} disabled={isLoading}>
          <Text style={styles.buttonLabelText}>{isLoading ? 'Resetting Array...' : 'Recalibrate Compass'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const CORE_DIAL_DIMENSION = Math.min(width - 80, 310);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingBottom: 30 },
  statusBanner: { backgroundColor: '#F5F5F5', paddingVertical: 14, alignItems: 'center', justifyContent: 'center' },
  statusBannerAligned: { backgroundColor: '#10B981' },
  statusBannerText: { color: '#666666', fontSize: 13, fontWeight: '500' },
  statusBannerTextAligned: { color: '#FFFFFF', fontSize: 14, fontWeight: '600', marginLeft: 6 },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },
  compassWrapperZone: { alignItems: 'center', justifyContent: 'center', marginTop: 70, marginBottom: 30 },
  topTargetBeacon: { position: 'absolute', top: -50, alignItems: 'center', zIndex: 99 },
  kaabaTargetNode: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#D1D5DB' },
  kaabaTargetNodeActive: { backgroundColor: '#10B981', borderColor: '#059669' },
  kaabaMarkerIcon: { fontSize: 20 },
  targetIndicatorLine: { width: 3, height: 24, backgroundColor: '#D1D5DB', marginTop: 2 },
  targetIndicatorLineActive: { backgroundColor: '#10B981' },
  compassHousingFrame: { width: CORE_DIAL_DIMENSION, height: CORE_DIAL_DIMENSION, borderRadius: CORE_DIAL_DIMENSION / 2, backgroundColor: '#FFFFFF', borderWidth: 6, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 4 },
  compassHousingFrameAligned: { borderColor: '#A7F3D0' },
  rotatableDial: { width: '100%', height: '100%', borderRadius: CORE_DIAL_DIMENSION / 2, position: 'relative', alignItems: 'center', justifyContent: 'center' },
  cardinalPoint: { position: 'absolute', fontSize: 16, fontWeight: '700', color: '#1F2937' },
  pointN: { top: 16, color: '#EF4444' },
  pointE: { right: 16 },
  pointS: { bottom: 16 },
  pointW: { left: 16 },
  scaleNode: { position: 'absolute', width: 2, height: CORE_DIAL_DIMENSION, alignItems: 'center' },
  scaleTickMajor: { width: 2, height: 12, backgroundColor: '#4B5563' },
  scaleTickMinor: { width: 1, height: 6, backgroundColor: '#9CA3AF' },
  centerNeedleStem: { width: 4, height: CORE_DIAL_DIMENSION / 2.3, backgroundColor: '#D1D5DB', borderRadius: 2, position: 'absolute', bottom: '50%', transform: [{ translateY: CORE_DIAL_DIMENSION / 4.6 }] },
  centerNeedleStemActive: { backgroundColor: '#10B981' },
  centralCapPivot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#1F2937', position: 'absolute', zIndex: 10, borderWidth: 2, borderColor: '#FFFFFF' },
  metricsContainer: { flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', marginTop: 20 },
  metricItemCard: { flex: 1, backgroundColor: '#F9FAFB', padding: 16, borderRadius: 12, alignItems: 'center', marginHorizontal: 6, borderWidth: 1, borderColor: '#F3F4F6' },
  metricLabel: { fontSize: 11, color: '#6B7280', textTransform: 'uppercase', fontWeight: '600', marginTop: 4 },
  metricValue: { fontSize: 15, fontWeight: '700', color: '#111827', marginTop: 2 },
  calibrationButton: { backgroundColor: '#0C3A1A', marginHorizontal: 26, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 30 },
  buttonLabelText: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 }
});
