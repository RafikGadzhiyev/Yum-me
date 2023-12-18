// ! TMP SOLUTION
// TODO: Add method vie *.d.types
String.prototype.toCapitalize = function () {
	return this[0].toUpperCase() + this.slice(1);
};

export const convertKeyToValue = (
	key: string,
	keyDelimiter: string,
	valueDelimiter: string,
	transform: StringTransformTypes
): string => {
	const keyParts = key.split(keyDelimiter);
	let result = "";

	for (let part of keyParts) {
		result += part + valueDelimiter;
	}

	return changeStringTransform(result, transform);
};

export const changeStringTransform = (
	string: string,
	newTransform: StringTransformTypes
): string => {
	let result = "";

	switch (newTransform) {
		case "capitalize":
			result = string.toCapitalize();
			break;
		case "lowercase":
			result = string.toLowerCase();
			break;
		case "uppercase":
			result = string.toUpperCase();
			break;
		default:
			// return initial string state
			result = string;
	}

	return result;
};