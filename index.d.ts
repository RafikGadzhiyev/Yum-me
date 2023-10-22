declare global {
	interface String {
		toCapitalize(): string;
	}
}

String.prototype.toCapitalize = function () {
	return this[0].toUpperCase() + this.slice(1);
};

export {};

//TODO: Solbe issue with typescript
// Typescript does want to see this implementation
