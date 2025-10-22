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
import { Volume2 } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { duaCategories } from "@/data/duasData";

export default function DuaCategoryScreen() {
  const { category } = useLocalSearchParams();
  const categoryData = duaCategories.find(c => c.id === category);

  if (!categoryData) {
    return (
      <View style={styles.container}>
        <Text>Category not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: categoryData.title,
          headerStyle: { backgroundColor: "#1B5E20" },
          headerTintColor: "#FFFFFF"
        }} 
      />
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{categoryData.title}</Text>
            <Text style={styles.headerDescription}>{categoryData.description}</Text>
          </View>

          <View style={styles.duasList}>
            {categoryData.duas.map((dua, index) => (
              <View key={index} style={styles.duaCard}>
                <View style={styles.duaHeader}>
                  <Text style={styles.duaTitle}>{dua.title}</Text>
                  <TouchableOpacity style={styles.audioButton}>
                    <Volume2 size={20} color="#1B5E20" />
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.duaArabic}>{dua.arabic}</Text>
                <Text style={styles.duaTransliteration}>{dua.transliteration}</Text>
                <Text style={styles.duaTranslation}>{dua.translation}</Text>
                
                {dua.reference && (
                  <Text style={styles.duaReference}>{dua.reference}</Text>
                )}
              </View>
            ))}
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
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  duasList: {
    padding: 20,
  },
  duaCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#FFD700",
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
  duaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  duaTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    flex: 1,
  },
  audioButton: {
    padding: 8,
    backgroundColor: "#E8F5E9",
    borderRadius: 20,
  },
  duaArabic: {
    fontSize: 22,
    color: "#333333",
    textAlign: "right",
    marginBottom: 15,
    lineHeight: 36,
    fontWeight: "500",
  },
  duaTransliteration: {
    fontSize: 14,
    color: "#666666",
    fontStyle: "italic",
    marginBottom: 10,
    lineHeight: 20,
  },
  duaTranslation: {
    fontSize: 14,
    color: "#999999",
    lineHeight: 20,
  },
  duaReference: {
    fontSize: 12,
    color: "#BBBBBB",
    marginTop: 10,
    fontStyle: "italic",
  },
});