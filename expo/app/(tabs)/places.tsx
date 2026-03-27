import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  SectionList,
} from "react-native";
import { 
  MapPin,
  Clock,
  Star,
  Navigation,
  Building2,
  Mountain,
  Landmark
} from "lucide-react-native";
import { router } from "expo-router";
import { makkahPlaces, madinahPlaces, nearbyPlaces, Place } from "@/data/placesData";
import { useTheme } from "@/providers/ThemeProvider";
import { useTranslation } from "@/providers/TranslationProvider";

interface PlaceSection {
  title: string;
  subtitle: string;
  data: Place[];
}

export default function PlacesScreen() {
  const [selectedCity, setSelectedCity] = useState<"all" | "makkah" | "madinah">("all");
  const theme = useTheme();
  const { t } = useTranslation();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "core-ritual":
        return <Building2 size={14} color={theme.colors.primary} />;
      case "ziyarat":
        return <Mountain size={14} color={theme.colors.primary} />;
      case "historical":
        return <Landmark size={14} color={theme.colors.primary} />;
      default:
        return <MapPin size={14} color={theme.colors.primary} />;
    }
  };

  const splitMakkahMadinah = (text: string): [string, string] => {
    // Handle different separators for different languages
    if (text.includes(" & ")) {
      const parts = text.split(" & ");
      return [parts[0], parts[1] || parts[0]];
    } else if (text.includes(" ও ")) {
      // Bengali separator
      const parts = text.split(" ও ");
      return [parts[0], parts[1] || parts[0]];
    } else if (text.includes(" و ")) {
      // Arabic separator
      const parts = text.split(" و ");
      return [parts[0], parts[1] || parts[0]];
    } else if (text.includes(" اور ")) {
      // Urdu separator
      const parts = text.split(" اور ");
      return [parts[0], parts[1] || parts[0]];
    } else if (text.includes(" dan ")) {
      // Indonesian separator
      const parts = text.split(" dan ");
      return [parts[0], parts[1] || parts[0]];
    } else if (text.includes(" ve ")) {
      // Turkish separator
      const parts = text.split(" ve ");
      return [parts[0], parts[1] || parts[0]];
    } else {
      // Fallback - try to split by common separators
      const separators = [" & ", " and ", " - "];
      for (const sep of separators) {
        if (text.includes(sep)) {
          const parts = text.split(sep);
          return [parts[0], parts[1] || parts[0]];
        }
      }
      return [text, text];
    }
  };

  const getSections = (): PlaceSection[] => {
    const [makkahName, madinahName] = splitMakkahMadinah(t("makkahAndMadinah"));
    
    if (selectedCity === "makkah") {
      return [
        {
          title: t("holyPlaces"),
          subtitle: t("holyPlacesGuideText"),
          data: makkahPlaces.filter(p => p.category === "core-ritual")
        },
        {
          title: t("historicalPlaces"),
          subtitle: t("historyDescription"),
          data: makkahPlaces.filter(p => p.category === "ziyarat")
        }
      ];
    } else if (selectedCity === "madinah") {
      return [
        {
          title: t("holyPlaces"),
          subtitle: t("holyPlacesGuideText"),
          data: madinahPlaces.filter(p => p.category === "core-ritual")
        },
        {
          title: t("historicalPlaces"),
          subtitle: t("historyDescription"),
          data: [...madinahPlaces.filter(p => p.category === "ziyarat" || p.category === "historical"), ...nearbyPlaces.filter(p => p.city === "madinah")]
        }
      ];
    } else {
      return [
        {
          title: `${makkahName} - ${t("holyPlaces")}`,
          subtitle: t("holyPlacesGuideText"),
          data: makkahPlaces.filter(p => p.category === "core-ritual")
        },
        {
          title: `${makkahName} - ${t("historicalPlaces")}`,
          subtitle: t("historyDescription"),
          data: makkahPlaces.filter(p => p.category === "ziyarat")
        },
        {
          title: `${madinahName} - ${t("holyPlaces")}`,
          subtitle: t("holyPlacesGuideText"),
          data: madinahPlaces.filter(p => p.category === "core-ritual")
        },
        {
          title: `${madinahName} - ${t("historicalPlaces")}`,
          subtitle: t("historyDescription"),
          data: [...madinahPlaces.filter(p => p.category === "ziyarat" || p.category === "historical")]
        },
        {
          title: t("historicalPlaces"),
          subtitle: t("historyDescription"),
          data: nearbyPlaces
        }
      ];
    }
  };

  const sections = getSections();

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, selectedCity === "all" && styles.filterButtonActive]}
          onPress={() => setSelectedCity("all")}
        >
          <Text style={[styles.filterText, selectedCity === "all" && styles.filterTextActive]}>
            {t("All")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedCity === "makkah" && styles.filterButtonActive]}
          onPress={() => setSelectedCity("makkah")}
        >
          <Text style={[styles.filterText, selectedCity === "makkah" && styles.filterTextActive]}>
            {splitMakkahMadinah(t("makkahAndMadinah"))[0]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedCity === "madinah" && styles.filterButtonActive]}
          onPress={() => setSelectedCity("madinah")}
        >
          <Text style={[styles.filterText, selectedCity === "madinah" && styles.filterTextActive]}>
            {splitMakkahMadinah(t("makkahAndMadinah"))[1]}
          </Text>
        </TouchableOpacity>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
          </View>
        )}
        renderItem={({ item: place }) => (
          <TouchableOpacity
            style={styles.placeCard}
            onPress={() => router.push(`/place/${place.id}`)}
            activeOpacity={0.8}
          >
            <Image source={{ uri: place.image }} style={styles.placeImage} />
            <View style={styles.placeContent}>
              <View style={styles.placeHeader}>
                <View style={styles.placeTitleContainer}>
                  <Text style={styles.placeTitle} numberOfLines={1}>
                    {place.name}
                  </Text>
                  {place.arabicName && (
                    <Text style={styles.placeArabicName}>{place.arabicName}</Text>
                  )}
                </View>
                {place.significance === "essential" && (
                  <View style={styles.essentialBadge}>
                    <Star size={10} color="#FFFFFF" fill="#FFFFFF" />
                    <Text style={styles.essentialText}>{t("essentialTools")}</Text>
                  </View>
                )}
              </View>
              <View style={styles.placeLocation}>
                {getCategoryIcon(place.category)}
                <Text style={styles.placeLocationText}>
                  {place.city === "makkah" ? splitMakkahMadinah(t("makkahAndMadinah"))[0] : splitMakkahMadinah(t("makkahAndMadinah"))[1]}
                </Text>
                <Text style={styles.placeDistance}>• {place.distance}</Text>
              </View>
              <Text style={styles.placeDescription} numberOfLines={2}>
                {place.description}
              </Text>
              <View style={styles.placeFooter}>
                <View style={styles.placeTime}>
                  <Clock size={12} color={theme.colors.textTertiary} />
                  <Text style={styles.placeTimeText}>{place.visitTime}</Text>
                </View>
                <TouchableOpacity style={styles.navigateButton}>
                  <Navigation size={14} color={theme.isDark ? "#4CAF50" : "#1B5E20"} />
                  <Text style={styles.navigateText}>{t("information")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}

const getStyles = (theme: ReturnType<typeof useTheme>) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: theme.isDark ? "#2C2C2C" : "#F5F5F5",
    alignItems: "center",
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.textSecondary,
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  listContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  placeCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: theme.isDark ? "#000" : "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: theme.isDark ? 0.3 : 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  placeImage: {
    width: "100%",
    height: 180,
    backgroundColor: "#E0E0E0",
  },
  placeContent: {
    padding: 15,
  },
  placeHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  placeTitleContainer: {
    flex: 1,
  },
  placeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  placeArabicName: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 2,
    fontStyle: "italic",
  },
  essentialBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFD700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  essentialText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 3,
  },
  placeLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  placeLocationText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  placeDistance: {
    fontSize: 12,
    color: theme.colors.textTertiary,
    marginLeft: 4,
  },
  placeDescription: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
  placeFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeTime: {
    flexDirection: "row",
    alignItems: "center",
  },
  placeTimeText: {
    fontSize: 12,
    color: theme.colors.textTertiary,
    marginLeft: 4,
  },
  navigateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.isDark ? "#1B3E20" : "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  navigateText: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.isDark ? "#4CAF50" : "#1B5E20",
    marginLeft: 4,
  },
});