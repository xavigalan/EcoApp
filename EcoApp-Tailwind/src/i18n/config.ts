import i18next from 'i18next'; // Cambia el nombre del import
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { esTranslations } from './es';
import { caTranslations } from './ca';
import { arTranslations } from './ar';
import { enTranslations } from './en';

// Función para traducir con Google Translate API
async function translateWithAPI(text: string, targetLang: string): Promise<string> {
  const apiKey: string = 'AIzaSyBZiHbfZmiUxcO6PiODspD-pQ_t20NIOm0';  // Tu clave de API
  const url: string = 'https://translation.googleapis.com/language/translate/v2';

  // Realiza la solicitud POST
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: text,               // El texto a traducir
      target: targetLang,    // El idioma al que traducir
      key: apiKey            // La clave de API se pasa en el cuerpo
    }),
  });

  // Espera la respuesta y convierte a JSON
  const data = await response.json();

  // Manejo de errores
  if (data.error) {
    console.error('Error de traducción:', data.error);
    return text; // Si hay un error, retorna el texto original
  }

  // Retorna el texto traducido
  return data.data.translations[0].translatedText;
}

// Configuración de i18next con traducción automática
i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: esTranslations },
      ca: { translation: caTranslations },
      ar: { translation: arTranslations },
      en: { translation: enTranslations },
    },
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
    missingKeyHandler: async (lngs: readonly string[], ns: string, key: string, fallbackValue: string, updateMissing: boolean) => {
      console.log(`Clave no encontrada: ${key}. Traduciendo automáticamente.`);
      const translatedText = await translateWithAPI(fallbackValue, lngs[0]);
      return translatedText; // Cambia esto a `void` si no necesitas devolver un valor
    },
  });

export default i18next;