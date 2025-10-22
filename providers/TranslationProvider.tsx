import { useMemo } from "react";
import createContextHook from "@nkzw/create-context-hook";
import { useSettings } from "./SettingsProvider";
import { translations, TranslationKey, Language } from "@/constants/translations";

export const [TranslationProvider, useTranslation] = createContextHook(() => {
  const { settings } = useSettings();
  
  const t = useMemo(() => {
    return (key: TranslationKey): string => {
      const currentLanguage = settings.language as Language;
      return translations[currentLanguage]?.[key] || translations.en[key] || key;
    };
  }, [settings.language]);

  const currentLanguage = settings.language as Language;
  
  return useMemo(() => ({
    t,
    language: currentLanguage,
    isRTL: ['ar', 'ur'].includes(currentLanguage),
  }), [t, currentLanguage]);
});