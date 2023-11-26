import { default as translationEn } from "./languages/en.json";
import { default as translationRu } from "./languages/ru.json";
import {ru, enUS} from 'date-fns/locale'

export const dictionary = {
	en: {
		translation: translationEn,
	},
	ru: {
		translation: translationRu,
	},
};

export const LOCALE_BY_LANGUAGE: Record<string, Locale> = {
	ru,
	en: enUS
}

export const LANGUAGES = Object.keys(dictionary);
