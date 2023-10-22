// ! TMP SOLUTION
String.prototype.toCapitalize = function () {
	return this[0].toUpperCase() + this.slice(1);
};

export const convertKeyToValue = (
	key: string,
	keyDelimeter: string,
	valueDelimeter: string,
	transform: StringTransformTypes
): string => {
	const keyParts = key.split(keyDelimeter);
	let result = "";

	for (let part of keyParts) {
		result += part + valueDelimeter;
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
			result = "";
	}

	return result;
};
