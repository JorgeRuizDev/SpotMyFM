module.exports = {
  locales: ["en", "es"],
  defaultLocale: "en",
  localeDetection: true,
  pages: {
    "*": ["cards", "views", "settings", "home"],
    "/": ["home"],
    "/settings": ["settings"],
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./src/i18n/${lang}/${ns}.json`).then((m) => m.default),
};
