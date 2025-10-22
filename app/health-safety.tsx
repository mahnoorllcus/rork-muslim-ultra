import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { 
  AlertTriangle, 
  Heart, 
  Thermometer, 
  Droplets,
  Sun,
  Activity,
  Shield,
  Info
} from "lucide-react-native";

interface HealthTip {
  icon: any;
  title: string;
  description: string;
  tips: string[];
  color: string;
}

export default function HealthSafetyScreen() {
  const healthTips: HealthTip[] = [
    {
      icon: Droplets,
      title: "Stay Hydrated",
      description: "Dehydration is common during pilgrimage",
      tips: [
        "Drink water regularly, even if not thirsty",
        "Carry a water bottle at all times",
        "Avoid caffeinated drinks",
        "Drink Zamzam water when available",
        "Monitor urine color (should be light yellow)",
      ],
      color: "#00BCD4",
    },
    {
      icon: Sun,
      title: "Sun Protection",
      description: "Protect yourself from intense heat",
      tips: [
        "Use umbrella during daytime Tawaf",
        "Apply unscented sunscreen regularly",
        "Wear light-colored, loose clothing",
        "Rest in shaded areas when possible",
        "Avoid peak sun hours (11 AM - 3 PM)",
      ],
      color: "#FF9800",
    },
    {
      icon: Thermometer,
      title: "Heat Exhaustion",
      description: "Recognize and prevent heat-related illness",
      tips: [
        "Symptoms: dizziness, nausea, headache",
        "Move to cool area immediately",
        "Drink cool water slowly",
        "Apply wet cloth to forehead",
        "Seek medical help if symptoms persist",
      ],
      color: "#FF5252",
    },
    {
      icon: Activity,
      title: "Physical Preparation",
      description: "Maintain your stamina during rituals",
      tips: [
        "Walk regularly before travel",
        "Pace yourself during rituals",
        "Take breaks when needed",
        "Use wheelchair if necessary",
        "Stretch before and after walking",
      ],
      color: "#4CAF50",
    },
    {
      icon: Shield,
      title: "Disease Prevention",
      description: "Protect yourself from infections",
      tips: [
        "Wash hands frequently",
        "Use hand sanitizer regularly",
        "Wear mask in crowded areas",
        "Avoid touching face",
        "Keep vaccinations up to date",
      ],
      color: "#9C27B0",
    },
    {
      icon: Heart,
      title: "Medical Conditions",
      description: "Managing chronic health issues",
      tips: [
        "Carry all medications with extras",
        "Keep medical records handy",
        "Wear medical alert bracelet",
        "Know nearest medical facilities",
        "Don't skip medication doses",
      ],
      color: "#F44336",
    },
  ];

  const emergencySymptoms = [
    "Chest pain or pressure",
    "Difficulty breathing",
    "Severe dehydration",
    "Fainting or loss of consciousness",
    "Severe allergic reaction",
    "High fever with confusion",
    "Severe abdominal pain",
    "Uncontrolled bleeding",
  ];

  const medicalFacilities = [
    {
      name: "Ajyad Emergency Hospital",
      location: "Near Masjid al-Haram, Makkah",
      type: "24/7 Emergency",
    },
    {
      name: "King Abdullah Medical City",
      location: "Makkah",
      type: "Major Hospital",
    },
    {
      name: "Haram Medical Centers",
      location: "Inside Masjid al-Haram",
      type: "First Aid",
    },
    {
      name: "Mina Health Centers",
      location: "Throughout Mina",
      type: "Hajj Services",
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Stack.Screen
        options={{
          title: "Health & Safety",
          headerStyle: { backgroundColor: "#F44336" },
          headerTintColor: "#FFFFFF",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.warningCard}>
          <AlertTriangle size={24} color="#FF5252" />
          <Text style={styles.warningText}>
            Your health is priority. Don't hesitate to seek medical help when needed.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Tips</Text>
          {healthTips.map((tip) => {
            const Icon = tip.icon;
            return (
              <TouchableOpacity
                key={tip.title}
                style={styles.tipCard}
                activeOpacity={0.9}
              >
                <View style={styles.tipHeader}>
                  <View style={[styles.iconContainer, { backgroundColor: `${tip.color}20` }]}>
                    <Icon size={24} color={tip.color} />
                  </View>
                  <View style={styles.tipTitleContainer}>
                    <Text style={styles.tipTitle}>{tip.title}</Text>
                    <Text style={styles.tipDescription}>{tip.description}</Text>
                  </View>
                </View>
                <View style={styles.tipsList}>
                  {tip.tips.map((item, index) => (
                    <View key={index} style={styles.tipItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.tipText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Symptoms</Text>
          <View style={styles.emergencyCard}>
            <Text style={styles.emergencyTitle}>Seek immediate help for:</Text>
            {emergencySymptoms.map((symptom, index) => (
              <View key={index} style={styles.symptomItem}>
                <AlertTriangle size={16} color="#FF5252" />
                <Text style={styles.symptomText}>{symptom}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical Facilities</Text>
          {medicalFacilities.map((facility, index) => (
            <View key={index} style={styles.facilityCard}>
              <View style={styles.facilityIcon}>
                <Heart size={20} color="#4CAF50" />
              </View>
              <View style={styles.facilityInfo}>
                <Text style={styles.facilityName}>{facility.name}</Text>
                <Text style={styles.facilityLocation}>{facility.location}</Text>
                <Text style={styles.facilityType}>{facility.type}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Info size={20} color="#2196F3" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Remember:</Text>
            <Text style={styles.infoText}>• Prevention is better than cure</Text>
            <Text style={styles.infoText}>• Listen to your body</Text>
            <Text style={styles.infoText}>• Don't ignore warning signs</Text>
            <Text style={styles.infoText}>• Help others in need</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  warningCard: {
    backgroundColor: "#FFF5F5",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    margin: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFCDD2",
  },
  warningText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    color: "#D32F2F",
    lineHeight: 18,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  tipCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  tipTitleContainer: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  tipDescription: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },
  tipsList: {
    marginLeft: 60,
  },
  tipItem: {
    flexDirection: "row",
    marginBottom: 6,
  },
  bullet: {
    fontSize: 14,
    color: "#999999",
    marginRight: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: "#666666",
    lineHeight: 18,
  },
  emergencyCard: {
    backgroundColor: "#FFF5F5",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFCDD2",
  },
  emergencyTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#D32F2F",
    marginBottom: 12,
  },
  symptomItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  symptomText: {
    fontSize: 13,
    color: "#D32F2F",
    marginLeft: 8,
  },
  facilityCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#4CAF50",
  },
  facilityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  facilityInfo: {
    flex: 1,
  },
  facilityName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333333",
  },
  facilityLocation: {
    fontSize: 13,
    color: "#666666",
    marginTop: 2,
  },
  facilityType: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "600",
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: "#E3F2FD",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 15,
    margin: 15,
    borderRadius: 10,
  },
  infoContent: {
    flex: 1,
    marginLeft: 10,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: "#1976D2",
    marginBottom: 4,
  },
});