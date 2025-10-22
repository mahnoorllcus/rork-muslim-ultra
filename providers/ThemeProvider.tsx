import { useMemo } from "react";
import createContextHook from "@nkzw/create-context-hook";
import { useSettings } from "./SettingsProvider";

interface Theme {
  colors: {
    primary: string;
    primaryDark: string;
    background: string;
    surface: string;
    card: string;
    text: string;
    textSecondary: string;
    textTertiary: string;
    border: string;
    success: string;
    error: string;
    warning: string;
    info: string;
    headerBg: string;
    headerText: string;
    tabBarBg: string;
    tabBarActive: string;
    tabBarInactive: string;
    cardBg: string;
    modalBg: string;
    inputBg: string;
    inputBorder: string;
    shadowColor: string;
  };
  isDark: boolean;
}

const lightTheme: Theme = {
  colors: {
    primary: "#1B5E20",
    primaryDark: "#0D3E10",
    background: "#F5F5F5",
    surface: "#FFFFFF",
    card: "#FFFFFF",
    text: "#212121",
    textSecondary: "#757575",
    textTertiary: "#999999",
    border: "#E0E0E0",
    success: "#4CAF50",
    error: "#F44336",
    warning: "#FF9800",
    info: "#2196F3",
    headerBg: "#1B5E20",
    headerText: "#FFFFFF",
    tabBarBg: "#FFFFFF",
    tabBarActive: "#1B5E20",
    tabBarInactive: "#757575",
    cardBg: "#FFFFFF",
    modalBg: "#FFFFFF",
    inputBg: "#FFFFFF",
    inputBorder: "#E0E0E0",
    shadowColor: "#000000",
  },
  isDark: false,
};

const darkTheme: Theme = {
  colors: {
    primary: "#2E7D32",
    primaryDark: "#1B5E20",
    background: "#121212",
    surface: "#1E1E1E",
    card: "#2C2C2C",
    text: "#E0E0E0",
    textSecondary: "#B0B0B0",
    textTertiary: "#808080",
    border: "#424242",
    success: "#66BB6A",
    error: "#EF5350",
    warning: "#FFA726",
    info: "#42A5F5",
    headerBg: "#1E1E1E",
    headerText: "#E0E0E0",
    tabBarBg: "#1E1E1E",
    tabBarActive: "#4CAF50",
    tabBarInactive: "#757575",
    cardBg: "#2C2C2C",
    modalBg: "#2C2C2C",
    inputBg: "#2C2C2C",
    inputBorder: "#424242",
    shadowColor: "#000000",
  },
  isDark: true,
};

export const [ThemeProvider, useTheme] = createContextHook(() => {
  const { settings } = useSettings();
  
  const theme = useMemo(() => {
    return settings.darkMode ? 'dark' : 'light';
  }, [settings.darkMode]);
  
  const themeColors = useMemo(() => {
    return settings.darkMode ? darkTheme : lightTheme;
  }, [settings.darkMode]);

  return useMemo(() => ({
    theme,
    ...themeColors,
  }), [theme, themeColors]);
});