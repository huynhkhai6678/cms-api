const getClinicSettingValue = (settings, key) => {
    setting = settings.filter((setting) => { return setting.key == key});
    if (setting.length) {
        return setting[0].value;
    }
    return '';
}

const parseTemplateContent = (str, variables) => {
    return str.replace(/{{(.*?)}}/g, (match, key) => {
      if (variables.hasOwnProperty(key)) {
        return variables[key];
      }
      return match;
    });
}

export default {
  getClinicSettingValue,
  parseTemplateContent
}