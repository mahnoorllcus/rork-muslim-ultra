import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { 
  CheckCircle, 
  Circle, 
  ChevronRight,
  Clock,
  MapPin,
  Book,
  Info,
  Users,
  AlertCircle
} from "lucide-react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { umrahSteps } from "@/data/umrahData";
import { hajjDays } from "@/data/hajjData";
import { useTranslation } from "@/providers/TranslationProvider";
import { useTheme } from "@/providers/ThemeProvider";

type TabType = 'umrah' | 'hajj';

export default function HajjGuideScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('umrah');
  const completedSteps = [1, 2]; // Mock completed steps
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const renderTabButton = (tab: TabType, label: string) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        activeTab === tab && styles.activeTabButton
      ]}
      onPress={() => setActiveTab(tab)}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.tabButtonText,
        activeTab === tab && styles.activeTabButtonText
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderUmrahContent = () => (
    <>
      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>{t('yourProgress')}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "28%" }]} />
        </View>
        <Text style={styles.progressText}>2 {t('of')} 7 {t('stepsCompleted')}</Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.quickActionCard}
          onPress={() => router.push("/duas")}
        >
          <Book size={24} color={theme.colors.primary} />
          <Text style={styles.quickActionText}>{t('duas')}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.quickActionCard}
          onPress={() => router.push("/places")}
        >
          <MapPin size={24} color={theme.colors.primary} />
          <Text style={styles.quickActionText}>{t('places')}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.quickActionCard}
          onPress={() => router.push("/tools")}
        >
          <Clock size={24} color={theme.colors.primary} />
          <Text style={styles.quickActionText}>{t('times')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stepsSection}>
        <Text style={styles.sectionTitle}>{t('umrahSteps')}</Text>
        <TouchableOpacity
          style={styles.descriptionButton}
          onPress={() => router.push("/umrah-description")}
          activeOpacity={0.7}
        >
          <Info size={24} color="#FFFFFF" />
          <Text style={styles.descriptionButtonText}>{t('aboutUmrah')}</Text>
        </TouchableOpacity>
        {umrahSteps.map((step, index) => (
          <TouchableOpacity
            key={step.id}
            style={styles.stepCard}
            onPress={() => router.push(`/umrah-steps/${step.id}`)}
            activeOpacity={0.7}
          >
            <View style={styles.stepLeft}>
              {completedSteps.includes(step.id) ? (
                <CheckCircle size={28} color="#4CAF50" />
              ) : (
                <Circle size={28} color="#CCCCCC" />
              )}
              <View style={styles.stepLine} />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepNumber}>{t('step')} {step.id}</Text>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
              {step.duration && (
                <View style={styles.stepMeta}>
                  <Clock size={14} color={theme.colors.textSecondary} />
                  <Text style={styles.stepMetaText}>{step.duration}</Text>
                </View>
              )}
            </View>
            <ChevronRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tipsCard}>
        <LinearGradient
          colors={["#FFD700", "#FFC107"]}
          style={styles.tipsGradient}
        >
          <Text style={styles.tipsTitle}>💡 {t('importantTips')}</Text>
          <Text style={styles.tipsText}>
            {t('maintainWudu')}{"\n"}
            {t('stayHydrated')}{"\n"}
            {t('keepIntentionsPure')}{"\n"}
            {t('bePatientWithCrowds')}
          </Text>
        </LinearGradient>
      </View>
    </>
  );

  const renderHajjContent = () => (
    <>
      <View style={styles.importantCard}>
        <AlertCircle size={24} color="#FF6B6B" />
        <View style={styles.importantContent}>
          <Text style={styles.importantTitle}>{t('hajj2026')}</Text>
          <Text style={styles.importantText}>
            {t('expectedDates')}
          </Text>
        </View>
      </View>

      <View style={styles.daysSection}>
        <Text style={styles.sectionTitle}>{t('daysOfHajj')}</Text>
        <TouchableOpacity
          style={styles.descriptionButton}
          onPress={() => router.push("/understanding-hajj")}
          activeOpacity={0.7}
        >
          <Info size={24} color="#FFFFFF" />
          <Text style={styles.descriptionButtonText}>{t('aboutHajj')}</Text>
        </TouchableOpacity>
        {hajjDays.map((day) => (
          <TouchableOpacity
            key={day.id}
            style={styles.dayCard}
            onPress={() => router.push(`/hajj-steps/${day.id}`)}
            activeOpacity={0.7}
          >
            <View style={styles.dayHeader}>
              <View style={styles.dayNumber}>
                <Text style={styles.dayNumberText}>{day.dayNumber}</Text>
              </View>
              <View style={styles.dayInfo}>
                <Text style={styles.dayTitle}>{day.title}</Text>
                <Text style={styles.dayDate}>{day.date}</Text>
                <View style={styles.dayLocation}>
                  <MapPin size={14} color={theme.colors.textSecondary} />
                  <Text style={styles.dayLocationText}>{day.location}</Text>
                </View>
              </View>
              <ChevronRight size={20} color={theme.colors.textTertiary} />
            </View>
            <View style={styles.dayActivities}>
              {day.activities.map((activity, index) => (
                <View key={index} style={styles.activityItem}>
                  <View style={styles.activityDot} />
                  <Text style={styles.activityText}>{activity}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.typesSection}>
        <Text style={styles.sectionTitle}>{t('typesOfHajj')}</Text>
        <View style={styles.typeCard}>
          <Text style={styles.typeTitle}>{t('hajjAlTamattu')}</Text>
          <Text style={styles.typeDescription}>
            {t('hajjAlTamattuDesc')}
          </Text>
        </View>
        <View style={styles.typeCard}>
          <Text style={styles.typeTitle}>{t('hajjAlQiran')}</Text>
          <Text style={styles.typeDescription}>
            {t('hajjAlQiranDesc')}
          </Text>
        </View>
        <View style={styles.typeCard}>
          <Text style={styles.typeTitle}>{t('hajjAlIfrad')}</Text>
          <Text style={styles.typeDescription}>
            {t('hajjAlIfradDesc')}
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.preparationCard}
        onPress={() => router.push("/travel-checklist")}
      >
        <LinearGradient
          colors={["#FFD700", "#FFC107"]}
          style={styles.preparationGradient}
        >
          <Users size={24} color={theme.isDark ? theme.colors.text : "#333333"} />
          <View style={styles.preparationContent}>
            <Text style={styles.preparationTitle}>{t('hajjPreparationChecklist')}</Text>
            <Text style={styles.preparationText}>
              {t('documentsVaccinationsPacking')}
            </Text>
          </View>
          <ChevronRight size={20} color={theme.isDark ? theme.colors.text : "#333333"} />
        </LinearGradient>
      </TouchableOpacity>
    </>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primaryDark]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>{t('hajjGuide')}</Text>
            <Text style={styles.headerSubtitle}>
              {activeTab === 'umrah' ? t('umrahGuideSubtitle') : t('hajjGuideSubtitle')}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.tabContainer}>
          {renderTabButton('umrah', t('umrahGuide'))}
          {renderTabButton('hajj', t('hajjGuide'))}
        </View>

        <View style={styles.contentContainer}>
          {activeTab === 'umrah' ? renderUmrahContent() : renderHajjContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (theme: ReturnType<typeof useTheme>) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#E8F5E9",
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.cardBg,
    margin: 20,
    borderRadius: 15,
    padding: 4,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  activeTabButton: {
    backgroundColor: theme.colors.primary,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.textSecondary,
  },
  activeTabButtonText: {
    color: "#FFFFFF",
  },
  contentContainer: {
    paddingHorizontal: 0,
    marginTop: 0,
  },
  progressCard: {
    backgroundColor: theme.colors.cardBg,
    margin: 20,
    padding: 20,
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 8,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  quickActionCard: {
    backgroundColor: theme.colors.cardBg,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  quickActionText: {
    fontSize: 12,
    color: theme.colors.text,
    marginTop: 8,
    fontWeight: "600",
  },
  stepsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 15,
    textAlign: "center",
  },
  descriptionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  descriptionButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 8,
  },
  stepCard: {
    flexDirection: "row",
    backgroundColor: theme.colors.cardBg,
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  stepLeft: {
    alignItems: "center",
    marginRight: 15,
  },
  stepLine: {
    position: "absolute",
    top: 35,
    width: 2,
    height: 100,
    backgroundColor: "#E0E0E0",
  },
  stepContent: {
    flex: 1,
  },
  stepNumber: {
    fontSize: 11,
    color: "#999999",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
    marginTop: 4,
  },
  stepDescription: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  stepMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  stepMetaText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  tipsCard: {
    margin: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
  tipsGradient: {
    padding: 20,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 12,
  },
  tipsText: {
    fontSize: 14,
    color: "#444444",
    lineHeight: 22,
  },
  // Hajj specific styles
  importantCard: {
    flexDirection: "row",
    backgroundColor: theme.isDark ? "#3D2020" : "#FFF5F5",
    margin: 20,
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: theme.isDark ? "#FF8A8A" : "#FF6B6B",
    alignItems: "center",
  },
  importantContent: {
    marginLeft: 12,
    flex: 1,
  },
  importantTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
  },
  importantText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  daysSection: {
    paddingHorizontal: 20,
  },
  dayCard: {
    backgroundColor: theme.colors.card,
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
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
  dayHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  dayNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  dayNumberText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  dayInfo: {
    flex: 1,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
  },
  dayDate: {
    fontSize: 12,
    color: theme.colors.textTertiary,
    marginTop: 2,
  },
  dayLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  dayLocationText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  dayActivities: {
    marginLeft: 52,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  activityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.success,
    marginRight: 10,
  },
  activityText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    flex: 1,
  },
  typesSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  typeCard: {
    backgroundColor: theme.colors.card,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#FFD700",
  },
  typeTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.text,
  },
  typeDescription: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  preparationCard: {
    margin: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
  preparationGradient: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  preparationContent: {
    flex: 1,
    marginLeft: 12,
  },
  preparationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.isDark ? theme.colors.text : "#333333",
  },
  preparationText: {
    fontSize: 12,
    color: theme.isDark ? theme.colors.textSecondary : "#666666",
    marginTop: 4,
  },
});