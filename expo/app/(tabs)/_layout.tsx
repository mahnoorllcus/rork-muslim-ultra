import { Tabs } from "expo-router";
import { 
  Home,
  BookOpen, 
  Book,
  Map, 
  Wrench,
  MoreHorizontal 
} from "lucide-react-native";
import React from "react";
import { useTranslation } from "@/providers/TranslationProvider";
import { useTheme } from "@/providers/ThemeProvider";

export default function TabLayout() {
  const { t } = useTranslation();
  const theme = useTheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.tabBarActive,
        tabBarInactiveTintColor: theme.colors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBarBg,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
        headerStyle: {
          backgroundColor: theme.colors.headerBg,
        },
        headerTintColor: theme.colors.headerText,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
        },
      }}
    >
      <Tabs.Screen
          name="home"
          options={{
            title: "Muslim Ultra",
            tabBarLabel: t("home"),
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
            headerShown: true,
          }}
        />
        <Tabs.Screen
          name="hajj-guide"
          options={{
            title: t("hajjGuide"),
            tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="quran"
          options={{
            title: t("quran"),
            tabBarIcon: ({ color, size }) => <Book size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="places"
          options={{
            title: t("places"),
            tabBarIcon: ({ color, size }) => <Map size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="tools"
          options={{
            title: t("tools"),
            tabBarIcon: ({ color, size }) => <Wrench size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="more"
          options={{
            title: t("more"),
            tabBarIcon: ({ color, size }) => <MoreHorizontal size={size} color={color} />,
          }}
        />
      </Tabs>
  );
}