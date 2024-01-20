import { FC } from "react";
import clsx from "clsx";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

import { getPagination } from "@/utils/ui.util";

import { BREAKING_ITEM_IDENTIFIER } from "@/consts/pagination.const";

interface IPaginationProps extends Alignment {
	currentPage: number;
	totalPages: number;

	withArrows?: boolean;

	changePage: (newPage: number) => void;
}

export const Pagination: FC<IPaginationProps> = ({
	currentPage,
	totalPages,
	horizontalAlign,
	verticalAlign,
	withArrows,
	changePage,
}) => {
	const pagination = getPagination(totalPages, currentPage);

	return (
		<ul
			className={clsx("flex items-center gap-1", {
				"justify-center": horizontalAlign === "center",
				"justify-right": horizontalAlign === "right",
				"items-start": verticalAlign === "top",
				"items-end": verticalAlign === "bottom",
			})}
		>
			{withArrows && (
				<li>
					<button
						className="btn btn-square btn-sm mx-2 p-1"
						onClick={() => changePage(currentPage - 1)}
						disabled={currentPage === 1}
					>
						<FaAngleLeft />
					</button>
				</li>
			)}

			{pagination.map((paginationElement, idx) => (
				<li key={idx}>
					{paginationElement !== BREAKING_ITEM_IDENTIFIER ? (
						<button
							className={clsx("btn btn-square btn-sm mx-2 p-1", {
								"bg-accent-content": paginationElement === currentPage,
							})}
							onClick={() => changePage(paginationElement)}
						>
							{paginationElement}
						</button>
					) : (
						<span className="select-none">...</span>
					)}
				</li>
			))}

			{withArrows && (
				<li>
					<button
						className="btn btn-square btn-sm mx-2 p-1"
						onClick={() => changePage(currentPage + 1)}
						disabled={currentPage === totalPages}
					>
						<FaAngleRight />
					</button>
				</li>
			)}
		</ul>
	);
};