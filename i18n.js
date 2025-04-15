import i18next from "i18next";
import Backend from "i18next-fs-backend";
import path from 'path';
const __dirname = path.resolve();

i18next.use(Backend).init({
  fallbackLng: 'en',
  preload: ['en', 'de'], // preload languages
  ns: ['messages'], // namespace
  defaultNS: 'messages',
  backend: {
    loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json'
  }
});

export default i18next