import { default as translationEn } from "./languages/en.json";
import { default as translationRu } from "./languages/ru.json";

export const dictionary = {
	en: {
		translation: translationEn,
	},
	ru: {
		translation: translationRu,
	},
};

export const LANGUAGES = Object.keys(dictionary);
