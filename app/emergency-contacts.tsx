import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Phone, MapPin, Globe, AlertTriangle } from "lucide-react-native";

interface Contact {
  title: string;
  number: string;
  description: string;
  icon: any;
  color: string;
}

interface ContactSection {
  title: string;
  contacts: Contact[];
}

export default function EmergencyContactsScreen() {
  const emergencyContacts: ContactSection[] = [
    {
      title: "Emergency Services",
      contacts: [
        {
          title: "Police",
          number: "999",
          description: "General police emergency",
          icon: AlertTriangle,
          color: "#FF5252",
        },
        {
          title: "Ambulance",
          number: "997",
          description: "Medical emergencies",
          icon: AlertTriangle,
          color: "#FF5252",
        },
        {
          title: "Fire Department",
          number: "998",
          description: "Fire emergencies",
          icon: AlertTriangle,
          color: "#FF5252",
        },
        {
          title: "Traffic Police",
          number: "993",
          description: "Traffic accidents",
          icon: AlertTriangle,
          color: "#FF5252",
        },
      ],
    },
    {
      title: "Hajj & Umrah Services",
      contacts: [
        {
          title: "Ministry of Hajj",
          number: "966125458000",
          description: "Official Hajj inquiries",
          icon: Phone,
          color: "#4CAF50",
        },
        {
          title: "Hajj Information Center",
          number: "19993",
          description: "24/7 pilgrim assistance",
          icon: Phone,
          color: "#4CAF50",
        },
        {
          title: "Lost & Found",
          number: "966125458000",
          description: "Lost items and persons",
          icon: Phone,
          color: "#4CAF50",
        },
      ],
    },
    {
      title: "Medical Services",
      contacts: [
        {
          title: "Saudi Red Crescent",
          number: "997",
          description: "Emergency medical services",
          icon: Phone,
          color: "#2196F3",
        },
        {
          title: "Poison Control",
          number: "937",
          description: "Poisoning emergencies",
          icon: Phone,
          color: "#2196F3",
        },
        {
          title: "Health Hotline",
          number: "937",
          description: "Medical consultation",
          icon: Phone,
          color: "#2196F3",
        },
      ],
    },
    {
      title: "Consular Services",
      contacts: [
        {
          title: "Tourist Hotline",
          number: "930",
          description: "Tourism assistance",
          icon: Globe,
          color: "#9C27B0",
        },
        {
          title: "Consumer Protection",
          number: "1900",
          description: "Consumer complaints",
          icon: Phone,
          color: "#9C27B0",
        },
      ],
    },
    {
      title: "Transportation",
      contacts: [
        {
          title: "Haramain Train",
          number: "920004433",
          description: "High-speed rail service",
          icon: Phone,
          color: "#FF9800",
        },
        {
          title: "SAPTCO Bus",
          number: "920011999",
          description: "Public bus service",
          icon: Phone,
          color: "#FF9800",
        },
        {
          title: "Uber Support",
          number: "8001000325",
          description: "Ride-hailing support",
          icon: Phone,
          color: "#FF9800",
        },
      ],
    },
    {
      title: "Important Locations",
      contacts: [
        {
          title: "Masjid al-Haram Security",
          number: "966125458000",
          description: "Makkah Grand Mosque",
          icon: MapPin,
          color: "#00BCD4",
        },
        {
          title: "Masjid an-Nabawi Security",
          number: "966148608888",
          description: "Madinah Prophet's Mosque",
          icon: MapPin,
          color: "#00BCD4",
        },
      ],
    },
  ];

  const makeCall = (number: string) => {
    const phoneNumber = Platform.OS === "ios" ? `telprompt:${number}` : `tel:${number}`;
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.error("Error making call:", err));
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Stack.Screen
        options={{
          title: "Emergency Contacts",
          headerStyle: { backgroundColor: "#FF5252" },
          headerTintColor: "#FFFFFF",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.warningCard}>
          <AlertTriangle size={24} color="#FF5252" />
          <Text style={styles.warningText}>
            Save these numbers in your phone before traveling. In emergency, dial the number directly.
          </Text>
        </View>

        {emergencyContacts.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.contacts.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <TouchableOpacity
                  key={`${section.title}-${contact.title}-${index}`}
                  style={styles.contactCard}
                  onPress={() => makeCall(contact.number)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconContainer, { backgroundColor: `${contact.color}20` }]}>
                    <Icon size={24} color={contact.color} />
                  </View>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactTitle}>{contact.title}</Text>
                    <Text style={styles.contactDescription}>{contact.description}</Text>
                    <Text style={styles.contactNumber}>{contact.number}</Text>
                  </View>
                  <Phone size={20} color="#4CAF50" />
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Important Notes:</Text>
          <Text style={styles.infoText}>• All numbers work within Saudi Arabia</Text>
          <Text style={styles.infoText}>• For international calls, add +966</Text>
          <Text style={styles.infoText}>• Emergency services are free</Text>
          <Text style={styles.infoText}>• English-speaking operators available</Text>
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333333",
  },
  contactDescription: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },
  contactNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2196F3",
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: "#E3F2FD",
    padding: 15,
    margin: 15,
    borderRadius: 10,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 13,
    color: "#1976D2",
    marginBottom: 5,
  },
});