import i18next from "../i18n.js";

function __(key, lang = 'en') {
  return i18next.getFixedT(lang)(key);
}

export default __;