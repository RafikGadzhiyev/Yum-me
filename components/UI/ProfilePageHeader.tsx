import { FC } from "react";
import { getUserFullName } from "@/utils/post.utils";

interface IProfilePageHeaderProps {
	user: User;
}

export const ProfilePageHeader: FC<IProfilePageHeaderProps> = ({ user }) => {
	return (
		<header className="flex h-[350px] flex-col items-center py-2">
			<div className="mb-3 h-[100px] w-[100px] rounded-full bg-base-300"></div>
			<span className="text-3xl font-bold">{getUserFullName(user)}</span>
			<div>
				<h1 className="mb-2 text-center text-xl font-bold">User info</h1>
				<div className="flex items-center gap-3">
					<span>Age: {user.age}</span>
					<span>Gender: {user.gender}</span>
				</div>

				<div className="flex items-center gap-3">
					<span>Weight: {user.weight}</span>
					<span>Height: {user.height}</span>
				</div>
			</div>
		</header>
	);
};