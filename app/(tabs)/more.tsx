import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
  Share,
} from "react-native";
import { 
  Book,
  Info,
  Settings,
  User,
  Shield,
  FileText,
  Share2,
  MessageCircle,
  Star,
  ChevronRight
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/providers/AuthProvider";
import { useTranslation } from "@/providers/TranslationProvider";
import { useRouter } from "expo-router";
import { useTheme } from "@/providers/ThemeProvider";

export default function MoreScreen() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const menuSections = [
    {
      title: t("account"),
      items: [
        {
          id: "profile",
          title: t("profile"),
          icon: User,
          subtitle: user?.name || "Guest User",
          hasArrow: true,
        },
        {
          id: "settings",
          title: t("settings"),
          icon: Settings,
          subtitle: t("appPreferencesAndNotifications"),
          hasArrow: true,
        },
      ],
    },
    {
      title: t("legal"),
      items: [
        {
          id: "terms",
          title: t("termsAndConditions"),
          icon: FileText,
          subtitle: t("termsOfService"),
          hasArrow: true,
        },
        {
          id: "privacy",
          title: t("privacyPolicy"),
          icon: Shield,
          subtitle: t("howWeProtectYourData"),
          hasArrow: true,
        },
        {
          id: "about",
          title: t("about"),
          icon: Info,
          subtitle: t("aboutTravelMakkah"),
          hasArrow: true,
        },
      ],
    },
    {
      title: t("support"),
      items: [
        {
          id: "feedback",
          title: t("sendFeedback"),
          icon: MessageCircle,
          subtitle: t("helpUsImproveTheApp"),
          hasArrow: true,
        },
        {
          id: "rate",
          title: t("rateUs"),
          icon: Star,
          subtitle: t("shareYourExperience"),
          hasArrow: true,
        },
        {
          id: "share",
          title: t("shareApp"),
          icon: Share2,
          subtitle: t("spreadTheBenefit"),
          hasArrow: true,
        },
      ],
    },
  ];

  const handleSendFeedback = () => {
    const email = "support@travelmakkah.com";
    const subject = "Muslim Ultra App Feedback";
    const body = `App Version: 1.0.0\nDevice: ${Platform.OS}\n\nFeedback:\n\n`;
    
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    Linking.canOpenURL(mailtoUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(mailtoUrl);
        } else {
          Alert.alert(
            t("emailNotAvailable"),
            t("pleaseEmailFeedback"),
            [
              { text: t("copyEmail"), onPress: () => console.log("Copy email") },
              { text: t("ok") }
            ]
          );
        }
      })
      .catch((err) => {
        console.error("Error opening email:", err);
        Alert.alert(
          t("error"),
          t("errorOpeningEmail")
        );
      });
  };

  const handleRateUs = () => {
    const appStoreUrl = Platform.select({
      ios: "https://apps.apple.com/app/travel-makkah/id123456789", // Replace with actual App Store ID
      android: "https://play.google.com/store/apps/details?id=com.travelmakkah.app", // Replace with actual package name
      default: ""
    });

    if (Platform.OS === "web") {
      Alert.alert(
        t("rateUs"),
        t("rateOnWeb"),
        [{ text: t("ok") }]
      );
      return;
    }

    Alert.alert(
      t("rateTravelMakkah"),
      t("rateAppMessage"),
      [
        { text: t("notNow"), style: "cancel" },
        {
          text: t("rateNow"),
          onPress: () => {
            Linking.openURL(appStoreUrl).catch((err) => {
              console.error("Error opening store:", err);
              Alert.alert(
                t("thankYou"),
                t("appStoreMessage")
              );
            });
          }
        }
      ]
    );
  };

  const handleShareApp = async () => {
    const message = Platform.select({
      ios: `${t("checkOutTravelMakkah")} ${t("downloadFromAppStore")} https://apps.apple.com/app/travel-makkah/id123456789`,
      android: `${t("checkOutTravelMakkah")} ${t("downloadFromGooglePlay")} https://play.google.com/store/apps/details?id=com.travelmakkah.app`,
      default: t("checkOutTravelMakkah")
    });

    try {
      const result = await Share.share({
        message: message,
        title: t("travelMakkah"),
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared via:", result.activityType);
        } else {
          console.log(t("appSharedSuccessfully"));
        }
      } else if (result.action === Share.dismissedAction) {
        console.log(t("shareDismissed"));
      }
    } catch (error) {
      console.error("Error sharing:", error);
      Alert.alert(t("error"), t("errorSharing"));
    }
  };

  const handleItemPress = (itemId: string) => {
    switch (itemId) {
      case "profile":
        router.push("/profile");
        break;
      case "settings":
        router.push("/settings");
        break;
      case "terms":
        router.push("/terms");
        break;
      case "privacy":
        router.push("/privacy");
        break;
      case "about":
        router.push("/about");
        break;
      case "duas":
        router.push("/duas");
        break;
      case "history":
        router.push("/islamic-history");
        break;
      case "feedback":
        handleSendFeedback();
        break;
      case "rate":
        handleRateUs();
        break;
      case "share":
        handleShareApp();
        break;
      default:
        console.log(`Pressed: ${itemId}`);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.appName}>Muslim Ultra</Text>
          <Text style={styles.appTagline}>{t("yourCompletePilgrimageCompanion")}</Text>
          <Text style={styles.version}>{t("version")}</Text>
        </View>

        {menuSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.menuItem,
                      index === section.items.length - 1 && styles.lastMenuItem,
                    ]}
                    onPress={() => handleItemPress(item.id)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.menuItemLeft}>
                      <View style={styles.iconContainer}>
                        <Icon size={20} color={theme.colors.primary} />
                      </View>
                      <View style={styles.menuItemContent}>
                        <Text style={styles.menuItemTitle}>{item.title}</Text>
                        <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                      </View>
                    </View>
                    {item.hasArrow && <ChevronRight size={20} color={theme.colors.textSecondary} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {t("madeWithLoveForTheUmmah")}
          </Text>
          <Text style={styles.footerSubtext}>
            {t("mayAllahAcceptYourIbadah")}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (theme: ReturnType<typeof useTheme>) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  appTagline: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  version: {
    fontSize: 12,
    color: theme.colors.textTertiary,
    marginTop: 8,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.textSecondary,
    marginLeft: 20,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: theme.isDark ? theme.colors.primary + "20" : "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: theme.colors.text,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  footerText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  footerSubtext: {
    fontSize: 12,
    color: theme.colors.textTertiary,
    marginTop: 4,
  },
});