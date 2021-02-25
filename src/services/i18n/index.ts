import I18n from 'react-native-i18n';
import en from './location/en';
import vi from './location/vi';
import ko from './location/ko'
import hi from './location/hi'
import de from './location/de'
import es from './location/es'
import fr from './location/fr'
import ru from './location/ru'
import it from './location/it'


I18n.fallbacks = true;

I18n.translations = {
  en, 
  vi,
  ko,
  hi,
  de,
  es,
  fr,
  it,
  ru
};

const trans = (name,language) => {
  return I18n.t(name,{locale:language})
}

export {trans}

