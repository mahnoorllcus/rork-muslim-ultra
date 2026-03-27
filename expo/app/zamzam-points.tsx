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
import { Droplets, MapPin, Clock, Info } from "lucide-react-native";

interface ZamzamPoint {
  id: string;
  location: string;
  area: string;
  description: string;
  availability: string;
  tips: string[];
}

export default function ZamzamPointsScreen() {
  const makkahPoints: ZamzamPoint[] = [
    {
      id: "1",
      location: "Inside Masjid al-Haram",
      area: "Ground Floor - Near Tawaf Area",
      description: "Multiple dispensers around the Mataf",
      availability: "24/7",
      tips: [
        "Less crowded during Dhuhr and Asr",
        "Bring your own bottle",
        "Cold and room temperature available",
      ],
    },
    {
      id: "2",
      location: "King Abdul Aziz Gate",
      area: "Gate 1 - Main Entrance",
      description: "Large Zamzam station with seating area",
      availability: "24/7",
      tips: [
        "Easy wheelchair access",
        "Multiple taps available",
        "Good for filling large containers",
      ],
    },
    {
      id: "3",
      location: "First Floor",
      area: "Above Mataf Area",
      description: "Coolers distributed around the floor",
      availability: "24/7",
      tips: [
        "Less crowded than ground floor",
        "Better for elderly pilgrims",
        "Air-conditioned area",
      ],
    },
    {
      id: "4",
      location: "Roof Level",
      area: "Open Air Tawaf Area",
      description: "Zamzam stations at regular intervals",
      availability: "Open except during rain",
      tips: [
        "Best during cooler hours",
        "Great view of Kaaba",
        "More space for groups",
      ],
    },
    {
      id: "5",
      location: "Safa & Marwah",
      area: "Sa'i Area",
      description: "Stations along the Sa'i path",
      availability: "24/7",
      tips: [
        "Convenient during Sa'i",
        "Multiple points along the path",
        "Cups provided",
      ],
    },
    {
      id: "6",
      location: "Basement",
      area: "Underground Tawaf Area",
      description: "Air-conditioned area with Zamzam coolers",
      availability: "24/7",
      tips: [
        "Best during hot weather",
        "Wheelchair accessible",
        "Usually less crowded",
      ],
    },
  ];

  const madinahPoints: ZamzamPoint[] = [
    {
      id: "7",
      location: "Masjid an-Nabawi",
      area: "Main Prayer Hall",
      description: "Zamzam coolers throughout the mosque",
      availability: "24/7",
      tips: [
        "Available in all sections",
        "Refilled regularly",
        "Cups provided",
      ],
    },
    {
      id: "8",
      location: "Rawdah Area",
      area: "Near Prophet's Tomb",
      description: "Limited access area with Zamzam",
      availability: "Specific times for men/women",
      tips: [
        "Check visiting times",
        "Very crowded area",
        "Spiritual significance",
      ],
    },
    {
      id: "9",
      location: "Courtyard",
      area: "Open Areas",
      description: "Mobile Zamzam carts and stations",
      availability: "Prayer times",
      tips: [
        "Look for volunteers with carts",
        "Available during prayer gatherings",
        "Free distribution",
      ],
    },
  ];

  const etiquette = [
    "Say 'Bismillah' before drinking",
    "Sit while drinking if possible",
    "Drink in three sips",
    "Face the Qibla while drinking",
    "Make dua after drinking",
    "Don't waste water",
    "Share with others",
    "Fill bottles for those unable to reach",
  ];

  const benefits = [
    "Blessed water mentioned in Hadith",
    "Prophet ﷺ said: 'Zamzam water is for what it is drunk for'",
    "Contains unique minerals",
    "Never runs dry since ancient times",
    "Can be taken home as a gift",
  ];

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Stack.Screen
        options={{
          title: "Zamzam Points",
          headerStyle: { backgroundColor: "#00BCD4" },
          headerTintColor: "#FFFFFF",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <Droplets size={24} color="#00BCD4" />
          <Text style={styles.infoText}>
            Zamzam water is freely available throughout the holy mosques. 
            Bring your own bottle to reduce waste.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Makkah - Masjid al-Haram</Text>
          {makkahPoints.map((point) => (
            <TouchableOpacity
              key={point.id}
              style={styles.pointCard}
              activeOpacity={0.9}
            >
              <View style={styles.pointHeader}>
                <MapPin size={20} color="#00BCD4" />
                <View style={styles.pointInfo}>
                  <Text style={styles.pointLocation}>{point.location}</Text>
                  <Text style={styles.pointArea}>{point.area}</Text>
                </View>
              </View>
              <Text style={styles.pointDescription}>{point.description}</Text>
              <View style={styles.availabilityContainer}>
                <Clock size={14} color="#4CAF50" />
                <Text style={styles.availability}>{point.availability}</Text>
              </View>
              <View style={styles.tipsContainer}>
                {point.tips.map((tip, index) => (
                  <Text key={index} style={styles.tipText}>• {tip}</Text>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Madinah - Masjid an-Nabawi</Text>
          {madinahPoints.map((point) => (
            <TouchableOpacity
              key={point.id}
              style={styles.pointCard}
              activeOpacity={0.9}
            >
              <View style={styles.pointHeader}>
                <MapPin size={20} color="#00BCD4" />
                <View style={styles.pointInfo}>
                  <Text style={styles.pointLocation}>{point.location}</Text>
                  <Text style={styles.pointArea}>{point.area}</Text>
                </View>
              </View>
              <Text style={styles.pointDescription}>{point.description}</Text>
              <View style={styles.availabilityContainer}>
                <Clock size={14} color="#4CAF50" />
                <Text style={styles.availability}>{point.availability}</Text>
              </View>
              <View style={styles.tipsContainer}>
                {point.tips.map((tip, index) => (
                  <Text key={index} style={styles.tipText}>• {tip}</Text>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Drinking Etiquette</Text>
          <View style={styles.etiquetteCard}>
            {etiquette.map((item, index) => (
              <View key={index} style={styles.etiquetteItem}>
                <Text style={styles.etiquetteNumber}>{index + 1}.</Text>
                <Text style={styles.etiquetteText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Benefits & Blessings</Text>
          <View style={styles.benefitsCard}>
            <Info size={20} color="#4CAF50" />
            <View style={styles.benefitsContent}>
              {benefits.map((benefit, index) => (
                <Text key={index} style={styles.benefitText}>• {benefit}</Text>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.duaCard}>
          <Text style={styles.duaTitle}>Dua when drinking Zamzam:</Text>
          <Text style={styles.duaArabic}>
            اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ
          </Text>
          <Text style={styles.duaTranslation}>
            "O Allah, I ask You for beneficial knowledge, abundant provision, and healing from every disease"
          </Text>
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
  infoCard: {
    backgroundColor: "#E0F7FA",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    margin: 15,
    borderRadius: 10,
  },
  infoText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    color: "#00838F",
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
  pointCard: {
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
  pointHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  pointInfo: {
    flex: 1,
    marginLeft: 10,
  },
  pointLocation: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  pointArea: {
    fontSize: 13,
    color: "#666666",
    marginTop: 2,
  },
  pointDescription: {
    fontSize: 13,
    color: "#666666",
    marginBottom: 8,
  },
  availabilityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  availability: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "600",
    marginLeft: 6,
  },
  tipsContainer: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 8,
  },
  tipText: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
  },
  etiquetteCard: {
    backgroundColor: "#FFFFFF",
    margin: 15,
    padding: 15,
    borderRadius: 10,
  },
  etiquetteItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  etiquetteNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#00BCD4",
    marginRight: 10,
    width: 20,
  },
  etiquetteText: {
    flex: 1,
    fontSize: 14,
    color: "#333333",
  },
  benefitsCard: {
    backgroundColor: "#E8F5E9",
    flexDirection: "row",
    alignItems: "flex-start",
    margin: 15,
    padding: 15,
    borderRadius: 10,
  },
  benefitsContent: {
    flex: 1,
    marginLeft: 10,
  },
  benefitText: {
    fontSize: 13,
    color: "#2E7D32",
    marginBottom: 6,
    lineHeight: 18,
  },
  duaCard: {
    backgroundColor: "#FFF8E1",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  duaTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F57C00",
    marginBottom: 10,
  },
  duaArabic: {
    fontSize: 18,
    color: "#333333",
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 28,
  },
  duaTranslation: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
    fontStyle: "italic",
  },
});