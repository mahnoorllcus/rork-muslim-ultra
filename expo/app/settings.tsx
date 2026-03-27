import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Globe,
  Bell,
  Moon,
  Volume2,
  Wifi,
  Download,
  Shield,
  ChevronRight,
  Check,
  Vibrate,
  Clock,
  Radio,
} from "lucide-react-native";
import { useSettings } from "@/providers/SettingsProvider";
import { useTranslation } from "@/providers/TranslationProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { useRouter, Stack } from "expo-router";

export default function SettingsScreen() {
  const { settings, updateSettings } = useSettings();
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [showReminderOptions, setShowReminderOptions] = useState(false);
  const [showAdanOptions, setShowAdanOptions] = useState(false);
  const [reminderMinutes, setReminderMinutes] = useState(settings.reminderMinutesBefore.toString());
  const styles = useMemo(() => getStyles(theme), [theme]);

  const languages = [
    { code: "en", name: t("english"), native: "English" },
    { code: "ar", name: t("arabic"), native: "العربية" },
    { code: "ur", name: t("urdu"), native: "اردو" },
    { code: "bn", name: t("bengali"), native: "বাংলা" },
    { code: "id", name: t("indonesian"), native: "Bahasa Indonesia" },
    { code: "tr", name: t("turkish"), native: "Türkçe" },
  ];

  const settingsSections = [
    {
      title: t("appPreferences"),
      items: [
        {
          id: "language",
          title: t("language"),
          subtitle: languages.find(l => l.code === settings.language)?.name || t("english"),
          icon: Globe,
          type: "expandable" as const,
          onPress: () => setShowLanguageOptions(!showLanguageOptions),
        },
        {
          id: "theme",
          title: t("darkMode"),
          subtitle: t("easierOnTheEyesAtNight"),
          icon: Moon,
          type: "switch" as const,
          value: settings.darkMode,
          onValueChange: (value: boolean) => updateSettings({ darkMode: value }),
        },
      ],
    },
    {
      title: t("notifications") || "Notifications",
      items: [
        {
          id: "prayerNotifications",
          title: t("prayerReminders") || "Prayer Reminders",
          subtitle: t("getNotifiedForPrayerTimes") || "Get notified for prayer times",
          icon: Bell,
          type: "switch" as const,
          value: settings.prayerReminders,
          onValueChange: (value: boolean) => updateSettings({ prayerReminders: value }),
        },
        {
          id: "reminderTime",
          title: t("reminderTime") || "Reminder Time",
          subtitle: `${settings.reminderMinutesBefore} ${t("minutesBeforePrayer") || "minutes before prayer"}`,
          icon: Clock,
          type: "expandable" as const,
          onPress: () => setShowReminderOptions(!showReminderOptions),
        },
        {
          id: "soundEnabled",
          title: t("notificationSound") || "Notification Sound",
          subtitle: t("playSoundWithNotifications") || "Play sound with notifications",
          icon: Volume2,
          type: "switch" as const,
          value: settings.soundEnabled,
          onValueChange: (value: boolean) => updateSettings({ soundEnabled: value }),
        },
        {
          id: "vibrationEnabled",
          title: t("vibration") || "Vibration",
          subtitle: t("vibrateWithNotifications") || "Vibrate with notifications",
          icon: Vibrate,
          type: "switch" as const,
          value: settings.vibrationEnabled,
          onValueChange: (value: boolean) => updateSettings({ vibrationEnabled: value }),
        },
        {
          id: "adanEnabled",
          title: "Play Adan",
          subtitle: settings.adanEnabled ? `Adan from ${settings.adanSource === "makkah" ? "Makkah" : "Madinah"}` : "Play Adan audio at prayer times",
          icon: Radio,
          type: "switch" as const,
          value: settings.adanEnabled,
          onValueChange: (value: boolean) => updateSettings({ adanEnabled: value }),
        },
        {
          id: "adanSource",
          title: "Adan Source",
          subtitle: settings.adanSource === "makkah" ? "Makkah" : "Madinah",
          icon: Radio,
          type: "expandable" as const,
          onPress: () => setShowAdanOptions(!showAdanOptions),
        },
      ],
    },
    {
      title: t("dataAndStorage"),
      items: [
        {
          id: "offlineMode",
          title: t("offlineContent"),
          subtitle: t("downloadGuidesForOfflineUse"),
          icon: Download,
          type: "navigation" as const,
          onPress: () => console.log("Navigate to offline content"),
        },
        {
          id: "autoDownload",
          title: t("autoDownloadOnWiFi"),
          subtitle: t("automaticallyDownloadContentOnWiFi"),
          icon: Wifi,
          type: "switch" as const,
          value: settings.autoDownload,
          onValueChange: (value: boolean) => updateSettings({ autoDownload: value }),
        },
      ],
    },
    {
      title: t("privacyAndSecurity"),
      items: [
        {
          id: "privacy",
          title: t("privacySettings"),
          subtitle: t("manageYourPrivacyPreferences"),
          icon: Shield,
          type: "navigation" as const,
          onPress: () => router.push("/privacy"),
        },
      ],
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: t("settings") || "Settings",
        }}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={["bottom"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
        {settingsSections.map((section) => (
          <View key={section.title}>
            <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>{section.title}</Text>
            <View style={[styles.sectionContent, { 
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border
            }]}>
              {section.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <View key={item.id}>
                    <TouchableOpacity
                      style={[
                        styles.settingItem,
                        index === section.items.length - 1 && styles.lastItem,
                        { borderBottomColor: theme.colors.border }
                      ]}
                      onPress={item.type === "navigation" || item.type === "expandable" ? item.onPress : undefined}
                      activeOpacity={item.type === "switch" ? 1 : 0.7}
                    >
                      <View style={styles.settingItemLeft}>
                        <View style={[styles.iconContainer, { backgroundColor: theme.isDark ? theme.colors.primary + "20" : "#E8F5E9" }]}>
                          <Icon size={20} color={theme.colors.primary} />
                        </View>
                        <View style={styles.textContainer}>
                          <Text style={[styles.settingTitle, { color: theme.colors.text }]}>{item.title}</Text>
                          <Text style={[styles.settingSubtitle, { color: theme.colors.textSecondary }]}>{item.subtitle}</Text>
                        </View>
                      </View>
                      {item.type === "switch" && (
                        <Switch
                          value={item.value}
                          onValueChange={item.onValueChange}
                          trackColor={{ false: theme.colors.border, true: theme.colors.primary + "80" }}
                          thumbColor={item.value ? theme.colors.primary : theme.isDark ? "#666" : "#F5F5F5"}
                        />
                      )}
                      {(item.type === "navigation" || item.type === "expandable") && (
                        <ChevronRight size={20} color={theme.colors.textSecondary} />
                      )}
                    </TouchableOpacity>
                    
                    {item.id === "language" && showLanguageOptions && (
                      <View style={[styles.languageOptions, { backgroundColor: theme.isDark ? theme.colors.surface : "#F8F8F8" }]}>
                        {languages.map((lang) => (
                          <TouchableOpacity
                            key={lang.code}
                            style={[styles.languageOption, { borderBottomColor: theme.colors.border }]}
                            onPress={() => {
                              updateSettings({ language: lang.code as "en" | "ar" | "ur" | "bn" | "id" | "tr" });
                              setShowLanguageOptions(false);
                            }}
                          >
                            <View style={styles.languageOptionLeft}>
                              <Text style={[styles.languageName, { color: theme.colors.text }]}>{lang.name}</Text>
                              <Text style={[styles.languageNative, { color: theme.colors.textSecondary }]}>{lang.native}</Text>
                            </View>
                            {settings.language === lang.code && (
                              <Check size={20} color={theme.colors.primary} />
                            )}
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                    
                    {item.id === "reminderTime" && showReminderOptions && (
                      <View style={[styles.reminderOptions, { backgroundColor: theme.isDark ? theme.colors.surface : "#F8F8F8" }]}>
                        <View style={styles.reminderInputContainer}>
                          <Text style={[styles.reminderLabel, { color: theme.colors.text }]}>
                            {t("minutesBeforePrayer") || "Minutes before prayer:"}
                          </Text>
                          <TextInput
                            style={[styles.reminderInput, { 
                              backgroundColor: theme.colors.inputBg,
                              borderColor: theme.colors.inputBorder,
                              color: theme.colors.text
                            }]}
                            value={reminderMinutes}
                            onChangeText={setReminderMinutes}
                            keyboardType="numeric"
                            placeholder="10"
                            placeholderTextColor={theme.colors.textSecondary}
                          />
                          <TouchableOpacity
                            style={[styles.reminderSaveButton, { backgroundColor: theme.colors.primary }]}
                            onPress={() => {
                              const minutes = parseInt(reminderMinutes);
                              if (isNaN(minutes) || minutes < 0 || minutes > 60) {
                                Alert.alert(
                                  t("invalidInput") || "Invalid Input",
                                  t("pleaseEnterValidMinutes") || "Please enter a valid number between 0 and 60"
                                );
                                return;
                              }
                              updateSettings({ reminderMinutesBefore: minutes });
                              setShowReminderOptions(false);
                            }}
                          >
                            <Text style={styles.reminderSaveText}>{t("save") || "Save"}</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                    
                    {item.id === "adanSource" && showAdanOptions && (
                      <View style={[styles.languageOptions, { backgroundColor: theme.isDark ? theme.colors.surface : "#F8F8F8" }]}>
                        <TouchableOpacity
                          style={[styles.languageOption, { borderBottomColor: theme.colors.border }]}
                          onPress={() => {
                            updateSettings({ adanSource: "makkah" });
                            setShowAdanOptions(false);
                          }}
                        >
                          <View style={styles.languageOptionLeft}>
                            <Text style={[styles.languageName, { color: theme.colors.text }]}>Makkah</Text>
                            <Text style={[styles.languageNative, { color: theme.colors.textSecondary }]}>Adhan from Masjid al-Haram</Text>
                          </View>
                          {settings.adanSource === "makkah" && (
                            <Check size={20} color={theme.colors.primary} />
                          )}
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.languageOption, { borderBottomColor: theme.colors.border }]}
                          onPress={() => {
                            updateSettings({ adanSource: "madinah" });
                            setShowAdanOptions(false);
                          }}
                        >
                          <View style={styles.languageOptionLeft}>
                            <Text style={[styles.languageName, { color: theme.colors.text }]}>Madinah</Text>
                            <Text style={[styles.languageNative, { color: theme.colors.textSecondary }]}>Adhan from Masjid an-Nabawi</Text>
                          </View>
                          {settings.adanSource === "madinah" && (
                            <Check size={20} color={theme.colors.primary} />
                          )}
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>{t("travelMakkah") || "Muslim Ultra"} v1.0.0</Text>
          <Text style={[styles.footerSubtext, { color: theme.colors.textSecondary }]}>© 2024 Mahnoor LLC</Text>
        </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const getStyles = (theme: ReturnType<typeof useTheme>) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999999",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333333",
  },
  settingSubtitle: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },
  languageOptions: {
    backgroundColor: "#F8F8F8",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 56,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  languageOptionLeft: {
    flex: 1,
  },
  languageName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
  },
  languageNative: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  footerText: {
    fontSize: 14,
    color: "#666666",
  },
  footerSubtext: {
    fontSize: 12,
    color: "#999999",
    marginTop: 4,
  },
  reminderOptions: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  reminderInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  reminderLabel: {
    fontSize: 14,
    flex: 1,
  },
  reminderInput: {
    width: 60,
    height: 36,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    textAlign: "center",
  },
  reminderSaveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  reminderSaveText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});