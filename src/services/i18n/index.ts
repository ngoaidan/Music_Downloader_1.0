import I18n from 'react-native-i18n';
import en from './location/en';
import vi from './location/vi';

I18n.fallbacks = true;

I18n.translations = {
  en, 
  vi
};

const trans = (name,language) => {
  return I18n.t(name,{locale:language})
}

export {trans}

