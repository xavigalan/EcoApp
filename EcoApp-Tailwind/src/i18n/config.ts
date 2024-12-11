import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { esTranslations } from './es';
import { caTranslations } from './ca';
import { arTranslations } from './ar';

i18n
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next) // Integra i18next con React
  .init({
    resources: {
      es: {
        translation: esTranslations, // Traducciones en español
      },
      ca: {
        translation: caTranslations, // Traducciones en catalán
      },
      ar: {
        translation: arTranslations, // Traducciones en árabe
      },
    },
    fallbackLng: 'es', // Idioma de respaldo si el idioma detectado no tiene traducción
    interpolation: {
      escapeValue: false, // No es necesario escapar valores en React
    },
    // No se necesita 'languages', eliminamos esa propiedad.
  });

export default i18n;
