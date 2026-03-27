import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Check, Square } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ChecklistItem {
  id: string;
  title: string;
  checked: boolean;
}

interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

export default function TravelChecklistScreen() {
  const [checklist, setChecklist] = useState<ChecklistSection[]>([
    {
      title: "Travel Documents",
      items: [
        { id: "passport", title: "Passport (valid for 6+ months)", checked: false },
        { id: "visa", title: "Umrah/Hajj Visa", checked: false },
        { id: "tickets", title: "Flight Tickets", checked: false },
        { id: "hotel", title: "Hotel Bookings", checked: false },
        { id: "insurance", title: "Travel Insurance", checked: false },
        { id: "vaccination", title: "Vaccination Certificate", checked: false },
        { id: "copies", title: "Document Copies (physical & digital)", checked: false },
      ],
    },
    {
      title: "Ihram & Clothing",
      items: [
        { id: "ihram-men", title: "Ihram Clothes (Men: 2 white sheets)", checked: false },
        { id: "ihram-women", title: "Modest Clothing (Women)", checked: false },
        { id: "sandals", title: "Comfortable Sandals", checked: false },
        { id: "socks", title: "Socks for Mosque", checked: false },
        { id: "belt", title: "Ihram Belt/Safety Pins", checked: false },
        { id: "extra-clothes", title: "Extra Clothes", checked: false },
      ],
    },
    {
      title: "Personal Care",
      items: [
        { id: "unscented-soap", title: "Unscented Soap & Shampoo", checked: false },
        { id: "toothbrush", title: "Toothbrush & Toothpaste", checked: false },
        { id: "nail-clipper", title: "Nail Clipper", checked: false },
        { id: "towel", title: "Small Towel", checked: false },
        { id: "tissues", title: "Tissues & Wet Wipes", checked: false },
        { id: "sanitizer", title: "Hand Sanitizer", checked: false },
        { id: "sunscreen", title: "Sunscreen (unscented)", checked: false },
      ],
    },
    {
      title: "Health & Medicine",
      items: [
        { id: "prescription", title: "Prescription Medicines", checked: false },
        { id: "painkillers", title: "Pain Relievers", checked: false },
        { id: "bandages", title: "Band-aids & Bandages", checked: false },
        { id: "cough-medicine", title: "Cough Medicine", checked: false },
        { id: "stomach-medicine", title: "Stomach Medicine", checked: false },
        { id: "masks", title: "Face Masks", checked: false },
        { id: "thermometer", title: "Thermometer", checked: false },
      ],
    },
    {
      title: "Religious Items",
      items: [
        { id: "quran", title: "Pocket Quran or App", checked: false },
        { id: "dua-book", title: "Dua Book", checked: false },
        { id: "prayer-mat", title: "Foldable Prayer Mat", checked: false },
        { id: "tasbih", title: "Tasbih (Prayer Beads)", checked: false },
        { id: "compass", title: "Qibla Compass/App", checked: false },
      ],
    },
    {
      title: "Electronics & Accessories",
      items: [
        { id: "phone", title: "Mobile Phone", checked: false },
        { id: "charger", title: "Phone Charger", checked: false },
        { id: "powerbank", title: "Power Bank", checked: false },
        { id: "adapter", title: "Universal Adapter", checked: false },
        { id: "sim", title: "Local SIM or Roaming", checked: false },
        { id: "camera", title: "Camera (optional)", checked: false },
      ],
    },
    {
      title: "Money & Cards",
      items: [
        { id: "cash", title: "Saudi Riyals Cash", checked: false },
        { id: "cards", title: "Credit/Debit Cards", checked: false },
        { id: "wallet", title: "Secure Wallet/Pouch", checked: false },
        { id: "emergency-cash", title: "Emergency Cash (hidden)", checked: false },
      ],
    },
    {
      title: "Miscellaneous",
      items: [
        { id: "bag", title: "Small Day Bag", checked: false },
        { id: "umbrella", title: "Small Umbrella", checked: false },
        { id: "snacks", title: "Light Snacks", checked: false },
        { id: "water-bottle", title: "Water Bottle", checked: false },
        { id: "pen", title: "Pen for Forms", checked: false },
        { id: "plastic-bags", title: "Plastic Bags for Shoes", checked: false },
        { id: "safety-pins", title: "Safety Pins", checked: false },
      ],
    },
  ]);

  useEffect(() => {
    loadChecklist();
  }, []);

  const loadChecklist = async () => {
    try {
      const saved = await AsyncStorage.getItem("travelChecklist");
      if (saved) {
        setChecklist(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error loading checklist:", error);
    }
  };

  const saveChecklist = async (newChecklist: ChecklistSection[]) => {
    try {
      await AsyncStorage.setItem("travelChecklist", JSON.stringify(newChecklist));
    } catch (error) {
      console.error("Error saving checklist:", error);
    }
  };

  const toggleItem = (sectionIndex: number, itemIndex: number) => {
    const newChecklist = [...checklist];
    newChecklist[sectionIndex].items[itemIndex].checked = 
      !newChecklist[sectionIndex].items[itemIndex].checked;
    setChecklist(newChecklist);
    saveChecklist(newChecklist);
  };

  const getProgress = () => {
    const total = checklist.reduce((acc, section) => acc + section.items.length, 0);
    const checked = checklist.reduce(
      (acc, section) => acc + section.items.filter(item => item.checked).length,
      0
    );
    return { checked, total, percentage: Math.round((checked / total) * 100) };
  };

  const progress = getProgress();

  const resetChecklist = () => {
    const newChecklist = checklist.map(section => ({
      ...section,
      items: section.items.map(item => ({ ...item, checked: false })),
    }));
    setChecklist(newChecklist);
    saveChecklist(newChecklist);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Stack.Screen
        options={{
          title: "Travel Checklist",
          headerStyle: { backgroundColor: "#4CAF50" },
          headerTintColor: "#FFFFFF",
        }}
      />
      
      <View style={styles.progressContainer}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {progress.checked} of {progress.total} items packed
          </Text>
          <Text style={styles.progressPercentage}>{progress.percentage}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[styles.progressFill, { width: `${progress.percentage}%` }]} 
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {checklist.map((section, sectionIndex) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={item.id}
                style={styles.itemContainer}
                onPress={() => toggleItem(sectionIndex, itemIndex)}
                activeOpacity={0.7}
              >
                <View style={styles.checkbox}>
                  {item.checked ? (
                    <Check size={18} color="#4CAF50" />
                  ) : (
                    <Square size={18} color="#CCCCCC" />
                  )}
                </View>
                <Text 
                  style={[
                    styles.itemText,
                    item.checked && styles.itemTextChecked
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetChecklist}
          activeOpacity={0.7}
        >
          <Text style={styles.resetButtonText}>Reset Checklist</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  progressContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  progressText: {
    fontSize: 14,
    color: "#666666",
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
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
  },
  section: {
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#F8F8F8",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  checkbox: {
    marginRight: 12,
  },
  itemText: {
    flex: 1,
    fontSize: 14,
    color: "#333333",
  },
  itemTextChecked: {
    textDecorationLine: "line-through",
    color: "#999999",
  },
  resetButton: {
    backgroundColor: "#FF5252",
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});