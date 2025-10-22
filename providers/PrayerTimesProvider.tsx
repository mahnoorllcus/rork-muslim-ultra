import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform, Vibration } from "react-native";
import { Audio } from "expo-av";
import * as Notifications from "expo-notifications";
import { useSettings } from "@/providers/SettingsProvider";

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

interface PrayerTimesData {
  makkah: PrayerTimes;
  madinah: PrayerTimes;
  date: string;
  lastUpdated: string;
}

const PRAYER_TIMES_KEY = "prayer_times_cache";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Configure notifications
if (Platform.OS !== 'web') {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

export const [PrayerTimesProvider, usePrayerTimes] = createContextHook(() => {
  const { settings } = useSettings();
  const [makkahTimes, setMakkahTimes] = useState<PrayerTimes>({
    Imsak: "--:--",
    Fajr: "--:--",
    Sunrise: "--:--",
    Dhuhr: "--:--",
    Asr: "--:--",
    Sunset: "--:--",
    Maghrib: "--:--",
    Isha: "--:--"
  });

  const [madinahTimes, setMadinahTimes] = useState<PrayerTimes>({
    Imsak: "--:--",
    Fajr: "--:--",
    Sunrise: "--:--",
    Dhuhr: "--:--",
    Asr: "--:--",
    Sunset: "--:--",
    Maghrib: "--:--",
    Isha: "--:--"
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; remaining: string } | null>(null);
  const [reminderScheduled, setReminderScheduled] = useState<string | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);

  // Fetch prayer times from API
  const fetchPrayerTimes = async (city: string, latitude: number, longitude: number): Promise<PrayerTimes | null> => {
    try {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const day = today.getDate();
      
      // Using Aladhan API for accurate prayer times
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=4`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.code === 200 && data.data?.timings) {
        const timings = data.data.timings;
        return {
          Imsak: timings.Imsak || "--:--",
          Fajr: timings.Fajr,
          Sunrise: timings.Sunrise,
          Dhuhr: timings.Dhuhr,
          Asr: timings.Asr,
          Sunset: timings.Sunset || "--:--",
          Maghrib: timings.Maghrib,
          Isha: timings.Isha
        };
      }
      return null;
    } catch (error) {
      console.error(`Error fetching prayer times for ${city}:`, error);
      return null;
    }
  };

  // Load cached prayer times
  const loadCachedTimes = async (): Promise<PrayerTimesData | null> => {
    try {
      const cached = await AsyncStorage.getItem(PRAYER_TIMES_KEY);
      if (cached && cached.trim() && cached !== 'undefined' && cached !== 'null') {
        // Validate that the cached data is valid JSON
        let data: PrayerTimesData;
        try {
          // Additional validation before parsing
          if (!cached.startsWith('{') || !cached.endsWith('}')) {
            console.error("Invalid JSON format in cached prayer times, clearing cache");
            await AsyncStorage.removeItem(PRAYER_TIMES_KEY);
            return null;
          }
          
          data = JSON.parse(cached);
        } catch (parseError) {
          console.error("Invalid JSON in cached prayer times, clearing cache:", parseError);
          await AsyncStorage.removeItem(PRAYER_TIMES_KEY);
          return null;
        }
        
        // Validate data structure
        if (!data || typeof data !== 'object' || !data.makkah || !data.madinah || !data.lastUpdated) {
          console.error("Invalid cached data structure, clearing cache");
          await AsyncStorage.removeItem(PRAYER_TIMES_KEY);
          return null;
        }
        
        try {
          const cachedDate = new Date(data.lastUpdated);
          const now = new Date();
          
          // Check if dates are valid
          if (isNaN(cachedDate.getTime()) || isNaN(now.getTime())) {
            console.error("Invalid date in cached data, clearing cache");
            await AsyncStorage.removeItem(PRAYER_TIMES_KEY);
            return null;
          }
          
          // Check if cache is still valid (less than 24 hours old and same day)
          if (
            now.getTime() - cachedDate.getTime() < CACHE_DURATION &&
            now.toDateString() === cachedDate.toDateString()
          ) {
            return data;
          }
        } catch (dateError) {
          console.error("Error processing cached dates, clearing cache:", dateError);
          await AsyncStorage.removeItem(PRAYER_TIMES_KEY);
          return null;
        }
      }
    } catch (error) {
      console.error("Error loading cached prayer times:", error);
      // Clear corrupted cache
      try {
        await AsyncStorage.removeItem(PRAYER_TIMES_KEY);
      } catch (clearError) {
        console.error("Error clearing corrupted cache:", clearError);
      }
    }
    return null;
  };

  // Save prayer times to cache
  const saveCachedTimes = async (data: PrayerTimesData) => {
    try {
      // Validate data before saving
      if (!data || typeof data !== 'object' || !data.makkah || !data.madinah || !data.lastUpdated) {
        console.error("Invalid data structure, not saving to cache");
        return;
      }
      
      // Additional validation of nested objects
      if (typeof data.makkah !== 'object' || typeof data.madinah !== 'object') {
        console.error("Invalid prayer times structure, not saving to cache");
        return;
      }
      
      const jsonString = JSON.stringify(data);
      
      // Validate the JSON string before saving
      if (!jsonString || jsonString === 'undefined' || jsonString === 'null') {
        console.error("Invalid JSON string, not saving to cache");
        return;
      }
      
      await AsyncStorage.setItem(PRAYER_TIMES_KEY, jsonString);
    } catch (error) {
      console.error("Error saving prayer times to cache:", error);
      // If saving fails, clear the cache to prevent corruption
      try {
        await AsyncStorage.removeItem(PRAYER_TIMES_KEY);
      } catch (clearError) {
        console.error("Error clearing cache after save failure:", clearError);
      }
    }
  };

  // Update prayer times
  const updatePrayerTimes = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // First, try to load from cache
      const cached = await loadCachedTimes();
      if (cached) {
        setMakkahTimes(cached.makkah);
        setMadinahTimes(cached.madinah);
        setLastUpdated(cached.lastUpdated);
        setIsLoading(false);
        console.log("Loaded prayer times from cache");
        return;
      }
      
      // If no valid cache, fetch from API
      console.log("Fetching fresh prayer times from API...");
      
      // Makkah coordinates
      const makkahCoords = { latitude: 21.4225, longitude: 39.8262 };
      // Madinah coordinates
      const madinahCoords = { latitude: 24.5247, longitude: 39.5692 };
      
      const [makkahData, madinahData] = await Promise.all([
        fetchPrayerTimes("Makkah", makkahCoords.latitude, makkahCoords.longitude),
        fetchPrayerTimes("Madinah", madinahCoords.latitude, madinahCoords.longitude)
      ]);
      
      if (makkahData && madinahData) {
        setMakkahTimes(makkahData);
        setMadinahTimes(madinahData);
        
        const now = new Date();
        const updateTime = now.toISOString();
        setLastUpdated(updateTime);
        
        // Save to cache
        await saveCachedTimes({
          makkah: makkahData,
          madinah: madinahData,
          date: now.toDateString(),
          lastUpdated: updateTime
        });
        
        console.log("Prayer times updated successfully");
      } else {
        // If API fails, use fallback times
        console.log("Using fallback prayer times");
        const fallbackMakkah = {
          Imsak: "04:35",
          Fajr: "04:45",
          Sunrise: "06:02",
          Dhuhr: "12:18",
          Asr: "15:42",
          Sunset: "18:21",
          Maghrib: "18:31",
          Isha: "20:01"
        };
        const fallbackMadinah = {
          Imsak: "04:42",
          Fajr: "04:52",
          Sunrise: "06:09",
          Dhuhr: "12:24",
          Asr: "15:48",
          Sunset: "18:27",
          Maghrib: "18:37",
          Isha: "20:07"
        };
        setMakkahTimes(fallbackMakkah);
        setMadinahTimes(fallbackMadinah);
      }
    } catch (error) {
      console.error("Error updating prayer times:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load and daily update
  useEffect(() => {
    updatePrayerTimes();
    
    // Set up daily update at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 1, 0, 0); // 12:01 AM tomorrow
    
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    
    // Update at midnight
    const midnightTimeout = setTimeout(() => {
      updatePrayerTimes();
      
      // Then update every 24 hours
      const dailyInterval = setInterval(() => {
        updatePrayerTimes();
      }, CACHE_DURATION);
      
      return () => clearInterval(dailyInterval);
    }, timeUntilMidnight);
    
    return () => clearTimeout(midnightTimeout);
  }, [updatePrayerTimes]);

  // Play Adan audio
  const playAdanAudio = useCallback(async (source: "makkah" | "madinah") => {
    if (Platform.OS === 'web') {
      console.log('Adan audio not available on web');
      return;
    }
    
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
      
      const adanUrl = source === "makkah" 
        ? "https://www.islamcan.com/audio/adhan/mecca.mp3"
        : "https://www.islamcan.com/audio/adhan/madina.mp3";
      
      const { sound } = await Audio.Sound.createAsync(
        { uri: adanUrl },
        { shouldPlay: true, volume: 1.0 }
      );
      
      soundRef.current = sound;
      
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
          soundRef.current = null;
        }
      });
    } catch (error) {
      console.log('Error playing Adan audio:', error);
    }
  }, []);

  // Play reminder sound
  const playReminderSound = useCallback(async () => {
    if (Platform.OS === 'web') {
      // For web, use Web Audio API to create a simple beep
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // 800Hz tone
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (error) {
        console.log('Web audio not supported, skipping sound');
      }
      return;
    }
    
    try {
      // Configure audio for playback on mobile
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
      
      // Create a simple tone programmatically instead of using external URLs
      // This generates a base64 encoded WAV file with a simple beep tone
      const generateBeepTone = () => {
        const sampleRate = 44100;
        const duration = 0.5; // 0.5 seconds
        const frequency = 800; // 800Hz
        const samples = Math.floor(sampleRate * duration);
        
        // Create WAV header
        const buffer = new ArrayBuffer(44 + samples * 2);
        const view = new DataView(buffer);
        
        // WAV header
        const writeString = (offset: number, string: string) => {
          for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
          }
        };
        
        writeString(0, 'RIFF');
        view.setUint32(4, 36 + samples * 2, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(36, 'data');
        view.setUint32(40, samples * 2, true);
        
        // Generate tone data
        for (let i = 0; i < samples; i++) {
          const sample = Math.sin(2 * Math.PI * frequency * i / sampleRate) * 0.3;
          const intSample = Math.max(-32768, Math.min(32767, Math.floor(sample * 32767)));
          view.setInt16(44 + i * 2, intSample, true);
        }
        
        // Convert to base64
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      };
      
      const base64Audio = generateBeepTone();
      const dataUri = `data:audio/wav;base64,${base64Audio}`;
      
      const { sound } = await Audio.Sound.createAsync(
        { uri: dataUri },
        { 
          shouldPlay: true, 
          volume: 0.5,
          isLooping: false
        }
      );
      
      soundRef.current = sound;
      
      // Stop and cleanup after playing
      setTimeout(async () => {
        if (soundRef.current) {
          try {
            await soundRef.current.stopAsync();
            await soundRef.current.unloadAsync();
            soundRef.current = null;
          } catch (cleanupError) {
            console.log('Sound cleanup completed');
          }
        }
      }, 600); // Slightly longer than the tone duration
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.log('Audio playback not available, using vibration only:', errorMessage);
    }
  }, []);

  // Trigger prayer reminder
  const triggerPrayerReminder = useCallback(async (prayerName: string, timeString: string) => {
    console.log(`Prayer reminder triggered for ${prayerName} at ${timeString}`);
    
    if (settings.adanEnabled) {
      await playAdanAudio(settings.adanSource);
    } else {
      if (settings.vibrationEnabled && Platform.OS !== 'web') {
        Vibration.vibrate([0, 500, 200, 500]);
      }
      
      if (settings.soundEnabled) {
        await playReminderSound();
      }
      
      if (settings.notifications && Platform.OS !== 'web') {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `Prayer Time: ${prayerName}`,
            body: `It's time for ${prayerName} prayer (${timeString})`,
            sound: true,
          },
          trigger: null,
        });
      }
    }
  }, [playReminderSound, playAdanAudio, settings]);

  // Calculate next prayer and schedule reminder
  useEffect(() => {
    const calculateNextPrayer = () => {
      if (!makkahTimes.Fajr || makkahTimes.Fajr === "--:--") return;
      
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      const prayers = Object.entries(makkahTimes).filter(([name]) => 
        !["Sunrise", "Sunset", "Imsak"].includes(name)
      );
      
      for (const [name, time] of prayers) {
        if (!time || time === "--:--") continue;
        
        const [hours, minutes] = time.split(":").map(Number);
        const prayerTime = hours * 60 + minutes;
        
        if (prayerTime > currentTime) {
          const remaining = prayerTime - currentTime;
          const remainingHours = Math.floor(remaining / 60);
          const remainingMinutes = remaining % 60;
          
          setNextPrayer({
            name,
            time,
            remaining: `${remainingHours}h ${remainingMinutes}m`
          });
          
          // Schedule reminder if enabled (10 minutes before by default)
          const reminderMinutesBefore = 10;
          if (remaining <= reminderMinutesBefore) {
            const reminderKey = `${name}-${time}`;
            if (reminderScheduled !== reminderKey) {
              setReminderScheduled(reminderKey);
              
              // Calculate exact time to trigger
              const triggerTime = (remaining - reminderMinutesBefore) * 60 * 1000;
              if (triggerTime <= 0) {
                // Trigger immediately if we're past the reminder time
                triggerPrayerReminder(name, time);
              } else {
                // Schedule for later
                setTimeout(() => {
                  triggerPrayerReminder(name, time);
                }, triggerTime);
              }
            }
          }
          
          return;
        }
      }
      
      // If no prayer found today, next is Fajr tomorrow
      const firstPrayer = "Fajr";
      const firstPrayerTime = makkahTimes.Fajr;
      
      if (firstPrayerTime && firstPrayerTime !== "--:--") {
        const [hours, minutes] = firstPrayerTime.split(":").map(Number);
        const prayerTime = hours * 60 + minutes;
        const remaining = (24 * 60 - currentTime) + prayerTime;
        const remainingHours = Math.floor(remaining / 60);
        const remainingMinutes = remaining % 60;
        
        setNextPrayer({
          name: firstPrayer,
          time: firstPrayerTime,
          remaining: `${remainingHours}h ${remainingMinutes}m`
        });
      }
    };

    calculateNextPrayer();
    const interval = setInterval(calculateNextPrayer, 30000); // Update every 30 seconds for better reminder accuracy
    
    return () => {
      clearInterval(interval);
      // Clean up sound if exists
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [makkahTimes, reminderScheduled, triggerPrayerReminder]);

  return useMemo(() => ({
    makkahTimes,
    madinahTimes,
    nextPrayer,
    isLoading,
    lastUpdated,
    refreshTimes: updatePrayerTimes
  }), [makkahTimes, madinahTimes, nextPrayer, isLoading, lastUpdated, updatePrayerTimes]);
});