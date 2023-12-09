import { FC } from "react";
import { getPagination } from "@/utils/ui.util";
import clsx from "clsx";

interface IPaginationProps {
	currentPage: number;
	totalPages: number;
	withArrows?: boolean;

	changePage: (newPage: number) => void;
}

export const Pagination: FC<IPaginationProps> = ({
	currentPage,
	totalPages,
	withArrows,
	changePage,
}) => {
	const pagination = getPagination(totalPages, currentPage);

	return (
		<ul className="flex gap-2 items-center">
			<li>
				<button
					className="rounded-md mx-2 p-1 border bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
					onClick={() => changePage(currentPage - 1)}
					disabled={currentPage === 1}
				>
					-1
				</button>
			</li>

			{pagination.map((paginationElement, idx) => (
				<li key={idx}>
					<button
						className={clsx("rounded-md mx-2 p-1 border border-green-400", {
							" bg-green-300": paginationElement === currentPage,
						})}
						onClick={() => changePage(paginationElement)}
					>
						{paginationElement !== -1 ? paginationElement : "..."}
					</button>
				</li>
			))}

			<li>
				<button
					className="rounded-md mx-2 p-1 border bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
					onClick={() => changePage(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					+1
				</button>
			</li>
		</ul>
	);
};