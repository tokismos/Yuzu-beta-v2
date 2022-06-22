import i18n from 'i18next';
import {initReactI18next} from "react-i18next";
import {getLocales} from 'react-native-localize';

import locales from '../locales';

const acceptedLocales = ['en', 'fr', 'ge'];

const formatTranslations = () => acceptedLocales.reduce((acc, val) => {
        acc[val] = { translation: locales[val] };
        return acc
    }, {})

const resources = formatTranslations();

i18n.use(initReactI18next).init({
    lng: getLocales()[0].languageCode,
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources,
});

export default i18n;