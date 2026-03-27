import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { 
  Compass,
  Phone,
  CheckSquare,
  Calendar,
  Users,
  AlertTriangle,
  Droplets,
  ChevronRight,
  BookOpen,
  Clock,
  BookOpenCheck,
  Book,
  Heart,
  ScrollText
} from "lucide-react-native";
import { usePrayerTimes } from "@/providers/PrayerTimesProvider";
import { router } from "expo-router";
import { useTheme } from "@/providers/ThemeProvider";
import { useTranslation } from "@/providers/TranslationProvider";

export default function ToolsScreen() {
  const { makkahTimes, madinahTimes, isLoading, lastUpdated, refreshTimes } = usePrayerTimes();
  const theme = useTheme();
  const { t } = useTranslation();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const tools = [
    {
      id: "quran",
      title: t("quran"),
      description: t("readTheQuranDesc"),
      icon: BookOpenCheck,
      color: "#1B5E20",
    },
    {
      id: "nurani-qaida",
      title: t("nuraniQaida"),
      description: t("nuraniQaidaDesc"),
      icon: BookOpen,
      color: "#6A1B9A",
    },
    {
      id: "ammapara",
      title: t("ammapara"),
      description: t("ammaparaDesc"),
      icon: Book,
      color: "#D84315",
    },
    {
      id: "asmaul-husna",
      title: "Asmaul Husna",
      description: "The 99 Beautiful Names of Allah",
      icon: Heart,
      color: "#8E24AA",
    },
    {
      id: "duas",
      title: t("duaCollection"),
      description: t("essentialPrayersAndSupplications"),
      icon: BookOpen,
      color: "#2E7D32",
    },
    {
      id: "islamic-history",
      title: t("islamicHistory"),
      description: t("learnFromStoriesOfProphets"),
      icon: ScrollText,
      color: "#1565C0",
    },
    {
      id: "checklist",
      title: t("travelChecklist"),
      description: t("checklistDescription"),
      icon: CheckSquare,
      color: "#4CAF50",
    },
    {
      id: "qibla",
      title: t("qiblaCompass"),
      description: t("qiblaDescription"),
      icon: Compass,
      color: "#2196F3",
    },
    {
      id: "emergency",
      title: t("emergencyContacts"),
      description: t("emergencyDescription"),
      icon: Phone,
      color: "#FF5252",
    },
    {
      id: "calendar",
      title: t("islamicCalendar"),
      description: t("calendarDescription"),
      icon: Calendar,
      color: "#9C27B0",
    },
    {
      id: "group",
      title: t("groupTracker"),
      description: t("groupDescription"),
      icon: Users,
      color: "#FF9800",
    },
    {
      id: "health",
      title: t("healthAndSafety"),
      description: t("healthDescription"),
      icon: AlertTriangle,
      color: "#F44336",
    },
    {
      id: "zamzam",
      title: t("zamzamPoints"),
      description: t("zamzamDescription"),
      icon: Droplets,
      color: "#00BCD4",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.prayerTimesSection}>
          <View style={styles.prayerHeader}>
            <Text style={styles.sectionTitle}>{t("todaysPrayerTimes")}</Text>
            {lastUpdated && (
              <TouchableOpacity onPress={refreshTimes} activeOpacity={0.7}>
                <Text style={styles.updateText}>↻ {t("retry")}</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>{t("loading")}</Text>
            </View>
          ) : (
            <>
              <View style={styles.prayerCard}>
                <Text style={styles.cityName}>🕋 Masjid al-Haram, Makkah</Text>
                <View style={styles.prayerTimesGrid}>
                  {Object.entries(makkahTimes).map(([prayer, time]) => (
                    <View key={prayer} style={styles.prayerTime}>
                      <Text style={styles.prayerName}>{prayer}</Text>
                      <Text style={styles.prayerTimeText}>{time}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.prayerCard}>
                <Text style={styles.cityName}>🕌 Masjid an-Nabawi, Madinah</Text>
                <View style={styles.prayerTimesGrid}>
                  {Object.entries(madinahTimes).map(([prayer, time]) => (
                    <View key={prayer} style={styles.prayerTime}>
                      <Text style={styles.prayerName}>{prayer}</Text>
                      <Text style={styles.prayerTimeText}>{time}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              {lastUpdated && (
                <Text style={styles.lastUpdatedText}>
                  {t("loading")}: {new Date(lastUpdated).toLocaleString()}
                </Text>
              )}
            </>
          )}
        </View>

        <View style={styles.toolsSection}>
          <Text style={styles.sectionTitle}>{t("essentialTools")}</Text>
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <TouchableOpacity
                key={tool.id}
                style={styles.toolCard}
                activeOpacity={0.7}
                onPress={() => {
                  switch (tool.id) {
                    case 'quran':
                      router.push('/quran');
                      break;
                    case 'nurani-qaida':
                      router.push('/nurani-qaida');
                      break;
                    case 'ammapara':
                      router.push('/ammapara');
                      break;
                    case 'asmaul-husna':
                      router.push('/asmaul-husna');
                      break;
                    case 'duas':
                      router.push('/duas');
                      break;
                    case 'islamic-history':
                      router.push('/islamic-history');
                      break;
                    case 'checklist':
                      router.push('/travel-checklist');
                      break;
                    case 'qibla':
                      router.push('/qibla-compass');
                      break;
                    case 'emergency':
                      router.push('/emergency-contacts');
                      break;
                    case 'calendar':
                      router.push('/islamic-calendar');
                      break;
                    case 'group':
                      router.push('/group-tracker');
                      break;
                    case 'health':
                      router.push('/health-safety');
                      break;
                    case 'zamzam':
                      router.push('/zamzam-points');
                      break;
                  }
                }}
              >
                <View style={[styles.toolIcon, { backgroundColor: `${tool.color}20` }]}>
                  <Icon size={24} color={tool.color} />
                </View>
                <View style={styles.toolContent}>
                  <Text style={styles.toolTitle}>{tool.title}</Text>
                  <Text style={styles.toolDescription}>{tool.description}</Text>
                </View>
                <ChevronRight size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.emergencySection}>
          <Text style={styles.sectionTitle}>{t("emergencyContacts")}</Text>
          <View style={styles.emergencyCard}>
            <View style={styles.emergencyRow}>
              <Text style={styles.emergencyLabel}>{t("police")}</Text>
              <Text style={styles.emergencyNumber}>999</Text>
            </View>
            <View style={styles.emergencyRow}>
              <Text style={styles.emergencyLabel}>{t("ambulance")}</Text>
              <Text style={styles.emergencyNumber}>997</Text>
            </View>
            <View style={styles.emergencyRow}>
              <Text style={styles.emergencyLabel}>{t("fire")}</Text>
              <Text style={styles.emergencyNumber}>998</Text>
            </View>
            <View style={styles.emergencyRow}>
              <Text style={styles.emergencyLabel}>{t("trafficPolice")}</Text>
              <Text style={styles.emergencyNumber}>993</Text>
            </View>
          </View>
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
  prayerTimesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 15,
  },
  prayerCard: {
    backgroundColor: theme.colors.card,
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: theme.isDark ? "#000" : "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: theme.isDark ? 0.3 : 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cityName: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.primary,
    marginBottom: 12,
  },
  prayerTimesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  prayerTime: {
    width: "30%",
    alignItems: "center",
    marginBottom: 10,
  },
  prayerName: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  prayerTimeText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
  },
  toolsSection: {
    paddingHorizontal: 20,
  },
  toolCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: theme.isDark ? "#000" : "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: theme.isDark ? 0.2 : 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  toolIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  toolContent: {
    flex: 1,
  },
  toolTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.text,
  },
  toolDescription: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  emergencySection: {
    padding: 20,
  },
  emergencyCard: {
    backgroundColor: theme.isDark ? "#3D1F1F" : "#FFF5F5",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.isDark ? "#5C2E2E" : "#FFCDD2",
  },
  emergencyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.isDark ? "#4A2525" : "#FFEBEE",
  },
  emergencyLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  emergencyNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D32F2F",
  },
  prayerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  updateText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: "600",
  },
  loadingContainer: {
    backgroundColor: theme.colors.card,
    padding: 40,
    borderRadius: 15,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: theme.isDark ? "#000" : "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: theme.isDark ? 0.3 : 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  loadingText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  lastUpdatedText: {
    fontSize: 12,
    color: theme.colors.textTertiary,
    textAlign: "center",
    marginTop: 5,
  },
});