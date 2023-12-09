"use client";

import { FC, PropsWithChildren, ReactNode, useCallback, useState } from "react";

import { Pagination } from "@/components/UI/Pagination";
import { ItemPerPageSelect } from "@/components/UI/ItemPerPageSelect";

import { ITEMS_PER_PAGE } from "@/consts/itemsPerPageSelect.const";

export const ListWithPagination: FC<PropsWithChildren> = ({ children }) => {
	const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE[0]);
	const [page, setPage] = useState(1);
	const [pageElems, setPageElems] = useState(
		(children as ReactNode[]).slice(
			itemsPerPage.value * (page - 1),
			itemsPerPage.value * page
		)
	);

	const pageCount = Math.ceil((children as ReactNode[]).length / itemsPerPage.value);

	const updateCurrentItemsPerPage = useCallback(
		(newItemsPerPage: ItemSelectOption) => {
			setItemsPerPage(newItemsPerPage);
			setPage(1);

			setPageElems((children as ReactNode[]).slice(0, newItemsPerPage.value));
		},
		[children]
	);

	const updateCurrentPage = useCallback(
		(newPage: number) => {
			setPage(newPage);

			setPageElems(
				(children as ReactNode[]).slice(
					itemsPerPage.value * (newPage - 1),
					itemsPerPage.value * newPage
				)
			);
		},
		[children, itemsPerPage.value]
	);

	return (
		<>
			<ItemPerPageSelect
				options={ITEMS_PER_PAGE}
				currentOption={itemsPerPage}
				changeOptions={updateCurrentItemsPerPage}
			/>

			{/* TODO: More flexible*/}
			<ul className="grid gap-3">{pageElems}</ul>

			<Pagination
				currentPage={page}
				totalPages={pageCount}
				changePage={updateCurrentPage}
			/>
		</>
	);
};