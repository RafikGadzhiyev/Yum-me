import { FC } from "react";
import { Roles } from "@/enums/roles.enum";
import Link from "next/link";
import { ROUTES } from "@/consts/routes.const";

interface ISearchedUserProps {
	$id: string;
	name: string;
	email: string;
	age: number;
	role: Roles;
}

export const SearchedUser: FC<ISearchedUserProps> = ({
	$id,
	name,
	email,
	age,
	role,
}) => {
	return (
		<div className="card-body">
			<div className="card-title items-start">
				<span>{name}</span>
			</div>
			<div className="flex flex-col">
				<span className="-translate-y-3">{email}</span>
				<span>Age: {age}</span>
				<span>Role: {role}</span>
			</div>

			<div className="my-auto flex items-center gap-3">
				<Link
					className="btn bg-base-100"
					href={`${ROUTES.PROFILE.path}?id=${$id}`}
				>
					Open
				</Link>
				{/*<button className="btn bg-base-100">Open</button>*/}
				<button className="btn bg-base-100">Message</button>
			</div>
		</div>
	);
};