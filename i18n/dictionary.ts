import { default as translationEn } from "./languages/en.json";
import { default as translationRu } from "./languages/ru.json";
import { default as translationKz } from "./languages/kz.json";
import { default as translationTr } from "./languages/tr.json";

import { ru, enUS, kk, tr } from "date-fns/locale";

export const dictionary = {
	en: {
		translation: translationEn,
	},
	ru: {
		translation: translationRu,
	},
	kk: {
		translation: translationKz,
	},
	tr: {
		translation: translationTr,
	},
};

export const LOCALE_BY_LANGUAGE: Record<string, Locale> = {
	kk: kk,
	ru: ru,
	tr: tr,
	en: enUS,
};

export const LANGUAGES = Object.keys(dictionary);
