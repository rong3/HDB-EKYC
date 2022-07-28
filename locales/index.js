import i18n from 'i18next';
import vietnamese from '../locales/default.json';
import english from '../locales/default.en.json';
import { getDefaultLanguage } from "../utils/common"

i18n.init({
    interpolation: { escapeValue: false },
    lng: getDefaultLanguage(),
    resources: {
        en: {
            common: english
        },
        vn: {
            common: vietnamese
        },
    },
}).catch(e => {
    console.log(e);
});

export default i18n;