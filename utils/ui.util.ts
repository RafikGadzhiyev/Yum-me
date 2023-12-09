import { BREAKING_ITEM_IDENTIFIER } from "@/consts/pagination.const";

export const getPagination = (totalPages: number, currentPage: number) => {
	if (totalPages <= 1) return [];

	const pagination = [1];

	let beforeCurrentPage = currentPage - 1;
	let afterCurrentPage = currentPage + 1;

	if (beforeCurrentPage > 2) {
		pagination.push(BREAKING_ITEM_IDENTIFIER);
	}

	if (beforeCurrentPage > 1) {
		pagination.push(beforeCurrentPage);
	}

	if (currentPage !== 1 && currentPage !== totalPages) {
		pagination.push(currentPage);
	}

	if (afterCurrentPage < totalPages) {
		pagination.push(afterCurrentPage);
	}

	if (afterCurrentPage < totalPages - 1) {
		pagination.push(BREAKING_ITEM_IDENTIFIER);
	}

	if (totalPages > 1) {
		pagination.push(totalPages);
	}

	return pagination;
};