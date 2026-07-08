import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ko from "./locales/ko.json";
import uz from "./locales/uz.json";
import ru from "./locales/ru.json";

export const STORAGE_KEY = "portfolio-lang";

const savedLang = localStorage.getItem(STORAGE_KEY);

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ko: { translation: ko },
    uz: { translation: uz },
    ru: { translation: ru },
  },
  lng: savedLang || "ko",
  fallbackLng: "ko",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
