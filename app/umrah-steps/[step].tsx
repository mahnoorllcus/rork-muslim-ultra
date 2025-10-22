import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { 
  CheckCircle,
  AlertCircle,
  Book,
  Clock
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { umrahSteps } from "@/data/umrahData";
import { useTranslation } from "@/providers/TranslationProvider";

export default function UmrahStepScreen() {
  const { step } = useLocalSearchParams();
  const { t } = useTranslation();
  const stepData = umrahSteps.find(s => s.id === Number(step));

  if (!stepData) {
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
          title: stepData.title,
          headerStyle: { backgroundColor: "#1B5E20" },
          headerTintColor: "#FFFFFF"
        }} 
      />
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{t('step')} {stepData.id}</Text>
            </View>
            <Text style={styles.title}>{stepData.title}</Text>
            {stepData.duration && (
              <View style={styles.duration}>
                <Clock size={14} color="#666666" />
                <Text style={styles.durationText}>{stepData.duration}</Text>
              </View>
            )}
          </View>

          <View style={styles.content}>
            <Text style={styles.description}>{stepData.fullDescription}</Text>

            {stepData.steps && (
              <View style={styles.stepsSection}>
                <Text style={styles.sectionTitle}>{t('howToPerform') || 'How to Perform'}</Text>
                {stepData.steps.map((item, index) => {
                  const parts = item.split('\n\n');
                  const hasArabic = parts.length > 1;
                  
                  return (
                    <View key={index} style={styles.stepItem}>
                      <View style={styles.stepItemNumber}>
                        <Text style={styles.stepItemNumberText}>{index + 1}</Text>
                      </View>
                      <View style={styles.stepContent}>
                        <Text style={styles.stepItemText}>{parts[0]}</Text>
                        {hasArabic && parts[1] && (
                          <View style={styles.arabicTextContainer}>
                            <Text style={styles.arabicText}>{parts[1]}</Text>
                          </View>
                        )}
                        {hasArabic && parts[2] && (
                          <Text style={styles.translationText}>{parts[2]}</Text>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            )}

            {stepData.duas && (
              <View style={styles.duasSection}>
                <Text style={styles.sectionTitle}>{t('recommendedDuas') || 'Recommended Duas'}</Text>
                {stepData.duas.map((dua, index) => (
                  <View key={index} style={styles.duaCard}>
                    <Text style={styles.duaArabic}>{dua.arabic}</Text>
                    <Text style={styles.duaTransliteration}>{dua.transliteration}</Text>
                    <Text style={styles.duaTranslation}>{dua.translation}</Text>
                  </View>
                ))}
              </View>
            )}

            {stepData.tips && (
              <View style={styles.tipsSection}>
                <View style={styles.tipsHeader}>
                  <AlertCircle size={20} color="#FF9800" />
                  <Text style={styles.sectionTitle}>{t('importantTips')}</Text>
                </View>
                {stepData.tips.map((tip, index) => (
                  <View key={index} style={styles.tipItem}>
                    <View style={styles.tipDot} />
                    <Text style={styles.tipText}>{tip}</Text>
                  </View>
                ))}
              </View>
            )}

            <TouchableOpacity style={styles.completeButton}>
              <CheckCircle size={20} color="#FFFFFF" />
              <Text style={styles.completeButtonText}>{t('markAsComplete') || 'Mark as Complete'}</Text>
            </TouchableOpacity>
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
  stepNumber: {
    backgroundColor: "#1B5E20",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  stepNumberText: {
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
  duration: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  durationText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 4,
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 15,
    color: "#666666",
    lineHeight: 24,
    marginBottom: 20,
  },
  stepsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 15,
  },
  stepItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  stepItemNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2,
  },
  stepItemNumberText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1B5E20",
  },
  stepContent: {
    flex: 1,
  },
  stepItemText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    marginBottom: 8,
  },
  arabicTextContainer: {
    backgroundColor: "#F8F8F8",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#1B5E20",
  },
  arabicText: {
    fontSize: 18,
    color: "#333333",
    textAlign: "right",
    lineHeight: 28,
    fontWeight: "500",
  },
  translationText: {
    fontSize: 13,
    color: "#888888",
    fontStyle: "italic",
    lineHeight: 18,
    marginTop: 4,
  },
  duasSection: {
    marginBottom: 20,
  },
  duaCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#FFD700",
  },
  duaArabic: {
    fontSize: 20,
    color: "#333333",
    textAlign: "right",
    marginBottom: 10,
    lineHeight: 32,
  },
  duaTransliteration: {
    fontSize: 14,
    color: "#666666",
    fontStyle: "italic",
    marginBottom: 8,
  },
  duaTranslation: {
    fontSize: 13,
    color: "#999999",
    lineHeight: 18,
  },
  tipsSection: {
    backgroundColor: "#FFF8E1",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  tipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF9800",
    marginRight: 10,
    marginTop: 6,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: "#666666",
    lineHeight: 18,
  },
  completeButton: {
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  completeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});