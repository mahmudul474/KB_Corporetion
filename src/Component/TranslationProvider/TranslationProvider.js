import React, { createContext, useContext, useState } from "react";
import bnTranslations from "../../Pages/translations/bn.json";
import enTranslations from "../../Pages/translations/en.json";

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const [locale, setLocale] = useState("en"); // Default to English

  const messages = {
    en: enTranslations,
    bn: bnTranslations
  };

  const translate = (section, id) => {
    return messages[locale][section][id] || id; // Return the translation or the original text
  };

  return (
    <TranslationContext.Provider value={{ locale, setLocale, translate }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
