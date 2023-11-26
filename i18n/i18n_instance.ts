import i18n from "i18next";
import detect from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { dictionary } from "./dictionary";
import resourcesToBackend from "i18next-resources-to-backend";

i18n
	.use(detect)
	.use(initReactI18next)
	.use(
		resourcesToBackend((language: string) => import(`./languages/${language}.json`))
	)
	.init({
		lng: "en",
		load: "languageOnly",
		saveMissing: true,
		debug: process.env.NODE_ENV !== "production",
		fallbackLng: "en",
		resources: dictionary,
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
