import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { 
  MapPin,
  Clock,
  AlertCircle
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hajjDays } from "@/data/hajjData";
import { useTranslation } from "@/providers/TranslationProvider";

export default function HajjStepScreen() {
  const { step } = useLocalSearchParams();
  const { t } = useTranslation();
  const dayData = hajjDays.find(d => d.id === step);

  if (!dayData) {
    return (
      <View style={styles.container}>
        <Text>{t('error')}</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: dayData.title,
          headerStyle: { backgroundColor: "#1B5E20" },
          headerTintColor: "#FFFFFF"
        }} 
      />
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.dayBadge}>
              <Text style={styles.dayBadgeText}>{t('dayOf')} {dayData.dayNumber}</Text>
            </View>
            <Text style={styles.title}>{dayData.title}</Text>
            <Text style={styles.date}>{dayData.date}</Text>
            <View style={styles.location}>
              <MapPin size={16} color="#666666" />
              <Text style={styles.locationText}>{dayData.location}</Text>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.activitiesSection}>
              <Text style={styles.sectionTitle}>{t('activitiesForToday') || 'Activities for Today'}</Text>
              {dayData.detailedActivities.map((activity, index) => (
                <View key={index} style={styles.activityCard}>
                  <View style={styles.activityHeader}>
                    <View style={styles.activityTime}>
                      <Clock size={14} color="#1B5E20" />
                      <Text style={styles.activityTimeText}>{activity.time}</Text>
                    </View>
                  </View>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityDescription}>{activity.description}</Text>
                  {activity.dua && (
                    <View style={styles.duaCard}>
                      <Text style={styles.duaArabic}>{activity.dua.arabic}</Text>
                      <Text style={styles.duaTranslation}>{activity.dua.translation}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>

            {dayData.importantNotes && (
              <View style={styles.notesSection}>
                <View style={styles.notesHeader}>
                  <AlertCircle size={20} color="#FF6B6B" />
                  <Text style={styles.sectionTitle}>{t('importantTips')}</Text>
                </View>
                {dayData.importantNotes.map((note, index) => (
                  <View key={index} style={styles.noteItem}>
                    <View style={styles.noteDot} />
                    <Text style={styles.noteText}>{note}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  dayBadge: {
    backgroundColor: "#1B5E20",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  dayBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },
  date: {
    fontSize: 14,
    color: "#999999",
    marginTop: 4,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  locationText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 4,
  },
  content: {
    padding: 20,
  },
  activitiesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 15,
  },
  activityCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  activityHeader: {
    marginBottom: 8,
  },
  activityTime: {
    flexDirection: "row",
    alignItems: "center",
  },
  activityTimeText: {
    fontSize: 12,
    color: "#1B5E20",
    marginLeft: 4,
    fontWeight: "600",
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },
  activityDescription: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  duaCard: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#FFD700",
  },
  duaArabic: {
    fontSize: 18,
    color: "#333333",
    textAlign: "right",
    marginBottom: 8,
    lineHeight: 28,
  },
  duaTranslation: {
    fontSize: 12,
    color: "#666666",
    lineHeight: 16,
  },
  notesSection: {
    backgroundColor: "#FFF5F5",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFCDD2",
  },
  notesHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  noteItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  noteDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF6B6B",
    marginRight: 10,
    marginTop: 6,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: "#666666",
    lineHeight: 18,
  },
});