"use client";

import { useTranslation } from "react-i18next";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { Loading } from "@/components/UI/Loading";
import { SearchedUser } from "@/components/feature/SearchedUser";
import { Models } from "appwrite";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdSettings } from "react-icons/md";

export const SearchPageWrapper = () => {
	const searchInputRef = useRef<HTMLInputElement | null>(null);

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const { isLoading, sendRequest } = useFetch();
	const { t } = useTranslation();

	const [searchBy, setSearchBy] = useState("email");
	const [searchResults, setSearchResults] = useState<null | Array<Models.Document>>(
		null,
	);

	const savedQuery = searchParams.get("query");

	const searchHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!searchInputRef.current) {
			return;
		}

		await search(searchInputRef.current?.value);
	};

	const search = async (query: string) => {
		const mutableSearchParams = new URLSearchParams(searchParams.toString());

		mutableSearchParams.set("query", query);
		mutableSearchParams.set("searchBy", "email");

		router.push(pathname + "?" + mutableSearchParams.toString());

		const queryResult = await sendRequest(
			"GET",
			`/api/user?query=${query}&searchBy=${searchBy}`, // TODO: give opportunity to choose search field
		);
		setSearchResults(queryResult);
	};

	useEffect(() => {
		if (savedQuery) {
			search(savedQuery);
		}
	}, [savedQuery]);

	return (
		<>
			<form
				className="mb-2 flex items-center gap-4"
				onSubmit={searchHandler}
			>
				<input
					ref={searchInputRef}
					className="input input-bordered flex-1 rounded-md p-2 py-1"
					placeholder="Query"
				/>

				<div className="dropdown dropdown-end dropdown-bottom">
					<div
						className="btn"
						role="button"
						tabIndex={0}
					>
						<MdSettings size="25" />
					</div>

					<ul
						tabIndex={0}
						className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
					>
						<input
							className="input input-bordered input-sm w-full max-w-xs"
							placeholder="Search by"
							value={searchBy}
							onChange={(e) => setSearchBy(e.target.value)}
						/>
					</ul>
				</div>

				<button className="btn">{t("SEARCH")}</button>
			</form>
			<div className="flex h-full justify-center">
				{searchResults && !searchResults.length && <span>Nothing was found</span>}
				{searchResults && !!searchResults.length && (
					<ul className="flex w-full flex-wrap items-start justify-between gap-1">
						{searchResults.map((searchResult) => (
							<li
								className="card my-2 border-4 border-base-300 bg-base-200"
								key={searchResult.id}
							>
								<SearchedUser
									$id={searchResult.id}
									name={searchResult.name}
									email={searchResult.email}
									age={searchResult.age}
									role={searchResult.role}
								/>
							</li>
						))}
					</ul>
				)}
			</div>
			{isLoading && <Loading />}
		</>
	);
};
