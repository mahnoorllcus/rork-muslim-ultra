import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { Stack, router } from "expo-router";
import { Search, Bookmark, BookOpen } from "lucide-react-native";
import { duaCategoriesInfo } from "@/data/duasData";
import { useTranslation } from "@/providers/TranslationProvider";

export default function DuaCategoriesScreen() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const CARD_WIDTH = (width - 48) / 2;

  const filteredCategories = duaCategoriesInfo.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/duas/${categoryId}`);
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: t("Duas"),
          headerStyle: { backgroundColor: "#1B5E20" },
          headerTintColor: "#FFFFFF"
        }} 
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search duas..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <BookOpen size={20} color="#4CAF50" />
              <Text style={styles.statNumber}>{duaCategoriesInfo.length}</Text>
              <Text style={styles.statLabel}>{t("Categories")}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Bookmark size={20} color="#4CAF50" />
              <Text style={styles.statNumber}>267</Text>
              <Text style={styles.statLabel}>{t("Duas")}</Text>
            </View>
          </View>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.sectionTitle}>Hisnul Muslim</Text>
          <Text style={styles.sectionSubtitle}>Fortress of the Muslim</Text>
          
          <View style={styles.categoriesGrid}>
            {filteredCategories.map((category, index) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  { backgroundColor: category.color, width: CARD_WIDTH }
                ]}
                onPress={() => handleCategoryPress(category.id)}
                activeOpacity={0.8}
              >
                <View style={styles.categoryIconWrapper}>
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                </View>
                <Text style={styles.categoryTitle} numberOfLines={2}>
                  {category.title}
                </Text>
                <Text style={styles.categoryDescription} numberOfLines={2}>
                  {category.description}
                </Text>
                <View style={styles.categoryFooter}>
                  <Text style={styles.categoryChapters}>
                    {category.chapters} {t("Chapters")}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {filteredCategories.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>{t("No saved duas yet")}</Text>
            </View>
          )}
        </ScrollView>
      </View>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold" as const,
    color: "#333",
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 20,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold" as const,
    color: "#1B5E20",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  categoryCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  categoryIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryIcon: {
    fontSize: 28,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#333",
    marginBottom: 6,
  },
  categoryDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 12,
    lineHeight: 16,
  },
  categoryFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryChapters: {
    fontSize: 11,
    color: "#999",
    fontWeight: "500" as const,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});