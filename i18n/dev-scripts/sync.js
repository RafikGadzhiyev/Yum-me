// Run from the root folder
// Run command: node i18n/dev-scripts/sync.js

const fs = require("fs/promises");

const LANGUAGES = ["ru", "en"];
const SYNC_BY = "en";

const FILE_PATH = "../../i18n/languages";
const FILE_EXTENSION = ".json";

const IGNORE_SORT_KEYS = ["DAY_OF_WEEK"];

const SYNC_BY_DICTIONARY = require(`${FILE_PATH}/${SYNC_BY}${FILE_EXTENSION}`);

for (let language of LANGUAGES) {
	const SYNC_FOR_DICTIONARY = require(`${FILE_PATH}/${language}${FILE_EXTENSION}`);

	const syncedDictionary =
		language !== SYNC_BY
			? syncTranslate(SYNC_BY_DICTIONARY, SYNC_FOR_DICTIONARY)
			: SYNC_BY_DICTIONARY;

	const sortDictionaryKeys = sortDictionaryKeysByType(syncedDictionary);

	fs.writeFile(
		`i18n/languages/${language}${FILE_EXTENSION}`,
		JSON.stringify(sortDictionaryKeys, null, 2)
	);
}

function sortDictionaryKeysByType(dictionary) {
	let stringTerms = {};
	let objectTerms = {};

	for (let key of Object.keys(dictionary)) {
		let term = dictionary[key];

		if (typeof term === "string" || IGNORE_SORT_KEYS.includes(key)) {
			stringTerms[key] = term;
		} else {
			objectTerms[key] = sortDictionaryKeysByType(term);
		}
	}

	stringTerms = sortDictionaryKeysAlphabetically(stringTerms);
	objectTerms = sortDictionaryKeysAlphabetically(objectTerms);

	return {
		...stringTerms,
		...objectTerms,
	};
}

function sortDictionaryKeysAlphabetically(dictionary) {
	return Object.fromEntries(
		Object.entries(dictionary).sort((a, b) => (a[0] <= b[0] ? -1 : 1))
	);
}

function syncTranslate(syncBy, syncFor) {
	const dict = {};

	for (let key of Object.keys(syncBy)) {
		let term = syncBy[key];

		if (typeof term === "string") {
			if (syncFor[key] !== undefined) {
				dict[key] = syncFor[key];
				continue;
			}

			dict[key] = term + " (Translate)";
		} else if (typeof term === "object") {
			dict[key] = syncTranslate(term, syncFor[key] || {});
		}
	}

	return dict;
}