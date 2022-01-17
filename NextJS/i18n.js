module.exports = {
  locales: ["en", "es", "ru"],
  defaultLocale: "en",
  localeDetection: true,
  pages: {
    "*": ["cards"],
    "/": ["home"],
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./src/i18n/${lang}/${ns}.json`).then((m) => m.default),
};