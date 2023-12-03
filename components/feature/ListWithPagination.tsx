"use client";

import { FC, PropsWithChildren, ReactNode, useState } from "react";
import clsx from "clsx";

const ITEMS_PER_PAGE = [5, 10, 25, 50, 100];

export const ListWithPagination: FC<PropsWithChildren> = ({ children }) => {
	const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE[0]);
	const [page, setPage] = useState(1);

	const pageCount = Math.ceil((children as ReactNode[]).length / itemsPerPage);

	const updateCurrentItemsPerPage = (newItemsPerPage: number) => {
		setItemsPerPage(newItemsPerPage);
		setPage(1);
	};

	const updateCurrentPage = (newPage: number) => {
		setPage(newPage);
	};

	const getPagination = (pages: number, currentPage: number) => {
		const pagination = [1];

		let beforeCurrentPage = currentPage - 1;
		let afterCurrentPage = currentPage + 1;

		if (beforeCurrentPage > 2) {
			pagination.push(-1);
		}

		if (beforeCurrentPage > 1) {
			pagination.push(beforeCurrentPage);
		}

		if (currentPage !== 1 && currentPage !== pages) {
			pagination.push(currentPage);
		}

		if (afterCurrentPage < pages) {
			pagination.push(afterCurrentPage);
		}

		if (afterCurrentPage < pages - 1) {
			pagination.push(-1);
		}

		if (pages > 1) {
			pagination.push(pages);
		}

		return pagination;
	};

	const pageElems = (children as ReactNode[]).slice(
		itemsPerPage * (page - 1),
		itemsPerPage * page
	);

	const pagination = getPagination(pageCount, page);

	return (
		<>
			<div>
				{ITEMS_PER_PAGE.map((itemPerPage) => (
					<button
						key={`per-page-${itemPerPage}`}
						className={clsx("rounded-md mx-2 p-1 border border-green-400", {
							" bg-green-300": itemPerPage === itemsPerPage
						})}
						onClick={() => updateCurrentItemsPerPage(itemPerPage)}
					>
						{itemPerPage}
					</button>
				))}
			</div>
			{/* TODO: Do it more flexible*/}
			<ul className="grid gap-3">{pageElems}</ul>

			<ul className="flex gap-2 items-center">
				<li>
					<button
						className="rounded-md mx-2 p-1 border bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
						onClick={() => updateCurrentPage(page - 1)}
						disabled={page === 1}
					>
						-1
					</button>
				</li>

				{pagination.map((paginationElement, idx) => (
					<li key={idx}>
						<button
							className={clsx("rounded-md mx-2 p-1 border border-green-400", {
								" bg-green-300": paginationElement === page
							})}
							onClick={() => updateCurrentPage(paginationElement)}
						>
							{paginationElement !== -1 ? paginationElement : "..."}
						</button>
					</li>
				))}

				<button
					className="rounded-md mx-2 p-1 border bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
					onClick={() => updateCurrentPage(page + 1)}
					disabled={page === pageCount}
				>
					+1
				</button>
			</ul>
		</>
	);
};
