import { useState, useEffect, useMemo, useCallback } from 'react';
import * as Location from 'expo-location';
import { Platform, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';

const PERMISSION_ASKED_KEY = 'location_permission_asked';

export const [LocationProvider, useLocation] = createContextHook(() => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [locationPermission, setLocationPermission] = useState<Location.PermissionStatus | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [hasAskedPermission, setHasAskedPermission] = useState(false);
  const [showLocationAlert, setShowLocationAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ title: '', message: '' });

  const checkIfAskedBefore = useCallback(async () => {
    try {
      const asked = await AsyncStorage.getItem(PERMISSION_ASKED_KEY);
      setHasAskedPermission(asked === 'true');
    } catch (error) {
      console.error('Error checking permission history:', error);
    }
  }, []);

  const getCurrentLocation = useCallback(async (): Promise<Location.LocationObject | null> => {
    try {
      setIsLoadingLocation(true);
      
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        setIsLoadingLocation(false);
        return null;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      setLocation(currentLocation);
      setIsLoadingLocation(false);
      return currentLocation;
    } catch (error) {
      console.error('Error getting current location:', error);
      setIsLoadingLocation(false);
      
      try {
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setLocation(currentLocation);
        return currentLocation;
      } catch (fallbackError) {
        console.error('Fallback location failed:', fallbackError);
        setAlertMessage({
          title: 'Location Error',
          message: 'Unable to get your current location. Please ensure location services are enabled.'
        });
        setShowLocationAlert(true);
        return null;
      }
    }
  }, []);

  const checkPermissionStatus = useCallback(async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      setLocationPermission(status);
      
      if (status === 'granted') {
        await getCurrentLocation();
      }
    } catch (error) {
      console.error('Error checking location permission:', error);
    }
  }, [getCurrentLocation]);

  const openLocationSettings = useCallback(() => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  }, []);

  const requestLocationPermission = useCallback(async (): Promise<boolean> => {
    try {
      // Check current status first
      let { status } = await Location.getForegroundPermissionsAsync();
      
      if (status === 'granted') {
        setLocationPermission(status);
        await getCurrentLocation();
        return true;
      }

      // If not granted and not denied, request permission
      if (status === 'undetermined') {
        const permissionResult = await Location.requestForegroundPermissionsAsync();
        status = permissionResult.status;
        setLocationPermission(status);
        
        // Mark that we've asked for permission
        await AsyncStorage.setItem(PERMISSION_ASKED_KEY, 'true');
        setHasAskedPermission(true);

        if (status === 'granted') {
          await getCurrentLocation();
          return true;
        }
      }
      
      if (status === 'denied') {
        setAlertMessage({
          title: 'Location Permission Required',
          message: 'This app needs location access to show prayer times based on your location and Qibla direction. Please enable location permission in settings.'
        });
        setShowLocationAlert(true);
        return false;
      }
      
      return false;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setAlertMessage({
        title: 'Error',
        message: 'Failed to request location permission. Please try again.'
      });
      setShowLocationAlert(true);
      return false;
    }
  }, [getCurrentLocation, openLocationSettings]);

  useEffect(() => {
    checkPermissionStatus();
    checkIfAskedBefore();
  }, [checkPermissionStatus, checkIfAskedBefore]);

  const dismissAlert = useCallback(() => {
    setShowLocationAlert(false);
  }, []);

  return useMemo(() => ({
        location,
        locationPermission,
        isLoadingLocation,
        requestLocationPermission,
        getCurrentLocation,
        openLocationSettings,
        hasAskedPermission,
        showLocationAlert,
        alertMessage,
        dismissAlert,
      }), [
    location,
    locationPermission,
    isLoadingLocation,
    requestLocationPermission,
    getCurrentLocation,
    openLocationSettings,
    hasAskedPermission,
    showLocationAlert,
    alertMessage,
    dismissAlert,
  ]);
});