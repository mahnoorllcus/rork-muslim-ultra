import { useState, useEffect, useMemo, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createContextHook from "@nkzw/create-context-hook";

interface Settings {
  language: "en" | "ar" | "ur" | "bn" | "id" | "tr";
  notifications: boolean;
  offlineMode: boolean;
  darkMode: boolean;
  soundEnabled: boolean;
  autoDownload: boolean;
  prayerReminders: boolean;
  reminderMinutesBefore: number;
  vibrationEnabled: boolean;
  adanEnabled: boolean;
  adanSource: "makkah" | "madinah";
}



const SETTINGS_KEY = "@travel_makkah_settings";

export const [SettingsProvider, useSettings] = createContextHook(() => {
  const [settings, setSettings] = useState<Settings>({
    language: "en",
    notifications: true,
    offlineMode: false,
    darkMode: false,
    soundEnabled: true,
    autoDownload: false,
    prayerReminders: true,
    reminderMinutesBefore: 10,
    vibrationEnabled: true,
    adanEnabled: false,
    adanSource: "makkah"
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(SETTINGS_KEY);
      if (stored && stored.trim() && stored !== 'undefined' && stored !== 'null') {
        try {
          // Additional validation before parsing
          if (!stored.startsWith('{') || !stored.endsWith('}')) {
            console.error("Invalid JSON format in settings, using defaults");
            await AsyncStorage.removeItem(SETTINGS_KEY);
            setIsLoading(false);
            return;
          }
          
          const parsedSettings = JSON.parse(stored);
          // Validate settings structure
          if (parsedSettings && typeof parsedSettings === 'object') {
            // Validate each setting property
            const validSettings: Partial<Settings> = {};
            
            if (typeof parsedSettings.language === 'string' && 
                ['en', 'ar', 'ur', 'bn', 'id', 'tr'].includes(parsedSettings.language)) {
              validSettings.language = parsedSettings.language;
            }
            
            if (typeof parsedSettings.notifications === 'boolean') {
              validSettings.notifications = parsedSettings.notifications;
            }
            
            if (typeof parsedSettings.offlineMode === 'boolean') {
              validSettings.offlineMode = parsedSettings.offlineMode;
            }
            
            if (typeof parsedSettings.darkMode === 'boolean') {
              validSettings.darkMode = parsedSettings.darkMode;
            }
            
            if (typeof parsedSettings.soundEnabled === 'boolean') {
              validSettings.soundEnabled = parsedSettings.soundEnabled;
            }
            
            if (typeof parsedSettings.autoDownload === 'boolean') {
              validSettings.autoDownload = parsedSettings.autoDownload;
            }
            
            if (typeof parsedSettings.prayerReminders === 'boolean') {
              validSettings.prayerReminders = parsedSettings.prayerReminders;
            }
            
            if (typeof parsedSettings.reminderMinutesBefore === 'number') {
              validSettings.reminderMinutesBefore = parsedSettings.reminderMinutesBefore;
            }
            
            if (typeof parsedSettings.vibrationEnabled === 'boolean') {
              validSettings.vibrationEnabled = parsedSettings.vibrationEnabled;
            }
            
            if (typeof parsedSettings.adanEnabled === 'boolean') {
              validSettings.adanEnabled = parsedSettings.adanEnabled;
            }
            
            if (typeof parsedSettings.adanSource === 'string' && 
                ['makkah', 'madinah'].includes(parsedSettings.adanSource)) {
              validSettings.adanSource = parsedSettings.adanSource;
            }
            
            setSettings({ ...settings, ...validSettings });
          } else {
            console.error("Invalid settings structure, using defaults");
            await AsyncStorage.removeItem(SETTINGS_KEY);
          }
        } catch (parseError) {
          console.error("Invalid JSON in settings, clearing and using defaults:", parseError);
          await AsyncStorage.removeItem(SETTINGS_KEY);
        }
      }
    } catch (error) {
      console.error("Error loading settings:", error);
      // Clear corrupted settings
      try {
        await AsyncStorage.removeItem(SETTINGS_KEY);
      } catch (clearError) {
        console.error("Error clearing corrupted settings:", clearError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = useCallback(async (updates: Partial<Settings>) => {
    if (!updates || typeof updates !== 'object') {
      console.error("Invalid updates provided to updateSettings");
      return;
    }
    
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    
    try {
      // Validate settings before saving
      if (newSettings && typeof newSettings === 'object') {
        const jsonString = JSON.stringify(newSettings);
        
        // Validate the JSON string before saving
        if (!jsonString || jsonString === 'undefined' || jsonString === 'null') {
          console.error("Invalid JSON string, not saving settings");
          return;
        }
        
        await AsyncStorage.setItem(SETTINGS_KEY, jsonString);
      } else {
        console.error("Invalid settings structure, not saving");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      // If saving fails, clear the settings to prevent corruption
      try {
        await AsyncStorage.removeItem(SETTINGS_KEY);
      } catch (clearError) {
        console.error("Error clearing settings after save failure:", clearError);
      }
    }
  }, [settings]);

  return useMemo(() => ({
    settings,
    updateSettings,
    isLoading
  }), [settings, updateSettings, isLoading]);
});