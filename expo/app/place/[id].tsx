import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { 
  MapPin,
  Clock,
  Navigation,
  Info,
  ChevronLeft,
  ChevronRight
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { places } from "@/data/placesData";
import { useTheme } from "@/providers/ThemeProvider";
import { useTranslation } from "@/providers/TranslationProvider";

export default function PlaceDetailScreen() {
  const { id } = useLocalSearchParams();
  const place = places.find(p => p.id === id);
  const theme = useTheme();
  const { t } = useTranslation();
  const styles = useMemo(() => getStyles(theme), [theme]);

  // Find current place index and get next/previous places
  const currentIndex = places.findIndex(p => p.id === id);
  const previousPlace = currentIndex > 0 ? places[currentIndex - 1] : null;
  const nextPlace = currentIndex < places.length - 1 ? places[currentIndex + 1] : null;

  const navigateToPlace = (placeId: string) => {
    router.replace(`/place/${placeId}`);
  };

  if (!place) {
    return (
      <View style={styles.container}>
        <Text>{t("noResultsFound")}</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: place.name,
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: "#FFFFFF"
        }} 
      />
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={{ uri: place.image }} style={styles.image} />
          
          <View style={styles.content}>
            <Text style={styles.title}>{place.name}</Text>
            
            <View style={styles.infoRow}>
              <MapPin size={16} color={theme.colors.textSecondary} />
              <Text style={styles.infoText}>
                {place.city === "makkah" ? t("makkahAndMadinah").split(" & ")[0] : t("makkahAndMadinah").split(" & ")[1]} • {place.distance}
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Clock size={16} color={theme.colors.textSecondary} />
              <Text style={styles.infoText}>
                {t("times")}: {place.visitTime}
              </Text>
            </View>

            <Text style={styles.description}>{place.fullDescription}</Text>

            {place.history && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t("historicalPlaces")}</Text>
                <Text style={styles.sectionText}>{place.history}</Text>
              </View>
            )}

            {place.whatToDo && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t("information")}</Text>
                {place.whatToDo.map((item, index) => (
                  <View key={index} style={styles.listItem}>
                    <View style={styles.listDot} />
                    <Text style={styles.listText}>{item}</Text>
                  </View>
                ))}
              </View>
            )}

            {place.tips && (
              <View style={styles.tipsSection}>
                <View style={styles.tipsHeader}>
                  <Info size={20} color="#FF9800" />
                  <Text style={styles.sectionTitle}>{t("importantTips")}</Text>
                </View>
                {place.tips.map((tip, index) => (
                  <Text key={index} style={styles.tipText}>• {tip}</Text>
                ))}
              </View>
            )}

            <TouchableOpacity style={styles.navigateButton}>
              <Navigation size={20} color="#FFFFFF" />
              <Text style={styles.navigateButtonText}>{t("qiblaDescription")}</Text>
            </TouchableOpacity>

            {/* Navigation buttons */}
            <View style={styles.navigationContainer}>
              <TouchableOpacity 
                style={[styles.navButton, !previousPlace && styles.navButtonDisabled]}
                onPress={() => previousPlace && navigateToPlace(previousPlace.id)}
                disabled={!previousPlace}
              >
                <ChevronLeft size={20} color={previousPlace ? "#FFFFFF" : theme.colors.textTertiary} />
                <Text style={[styles.navButtonText, !previousPlace && styles.navButtonTextDisabled]}>
                  {t("previous") || "Previous"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.navButton, !nextPlace && styles.navButtonDisabled]}
                onPress={() => nextPlace && navigateToPlace(nextPlace.id)}
                disabled={!nextPlace}
              >
                <Text style={[styles.navButtonText, !nextPlace && styles.navButtonTextDisabled]}>
                  {t("next") || "Next"}
                </Text>
                <ChevronRight size={20} color={nextPlace ? "#FFFFFF" : theme.colors.textTertiary} />
              </TouchableOpacity>
            </View>
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
  image: {
    width: "100%",
    height: 250,
    backgroundColor: "#E0E0E0",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginLeft: 8,
  },
  description: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    lineHeight: 24,
    marginTop: 12,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  listDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
    marginRight: 10,
    marginTop: 7,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  tipsSection: {
    backgroundColor: theme.isDark ? "#2A2A1A" : "#FFF8E1",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tipText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: 4,
  },
  navigateButton: {
    flexDirection: "row",
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  navigateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },
  navButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  navButtonDisabled: {
    backgroundColor: theme.isDark ? "#2C2C2C" : "#E0E0E0",
  },
  navButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginHorizontal: 4,
  },
  navButtonTextDisabled: {
    color: theme.colors.textTertiary,
  },
});