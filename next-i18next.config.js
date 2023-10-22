/** @type {import('next-i18next').UserConfig} */
module.exports = {
	i18n: {
		defaultLocale: "en",
		locales: ["en", "ru"],
	},
	localePath: (locale) => `./i18n/languages/${locale}.json`,
};
