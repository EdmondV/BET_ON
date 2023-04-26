import enTranslationMessages from './translations/en.json';
// import deTranslationMessages from './translations/de.json';
// import jaTranslationMessages from './translations/ja.json';
import ruTranslationMessages from './translations/ru.json';

export const DEFAULT_LOCALE = 'en';

export const appLocales = [
  'en',
  // 'ru',
  // 'ja',
];

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
    : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
      ? defaultFormattedMessages[key]
      : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  }, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  // de: formatTranslationMessages('de', deTranslationMessages),
  // ja: formatTranslationMessages('ja', jaTranslationMessages),
  ru: formatTranslationMessages('ru', ruTranslationMessages),
};
