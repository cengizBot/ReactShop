import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationDefaultEN from '@locales/en/default.json';
import translationHomeEN from '@locales/en/home.json';
import translationProductEN from '@locales/en/product.json';
import translationProfileEN from '@locales/en/profile.json';

import translationDefaultFR from '@locales/fr/default.json';
import translationHomeFR from '@locales/fr/home.json';
import translationProductFR from '@locales/fr/product.json';
import translationProfileFR from '@locales/fr/profile.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                default: translationDefaultEN,
                home: translationHomeEN,
                product: translationProductEN,
                profile: translationProfileEN,
            },
            fr: {
                default: translationDefaultFR,
                home: translationHomeFR,
                product: translationProductFR,
                profile: translationProfileFR,
            },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
