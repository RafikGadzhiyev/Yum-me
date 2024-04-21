import { FC } from "react";
import { getUserFullName } from "@/utils/post.utils";
import { useTranslation } from "react-i18next";

interface IProfilePageHeaderProps {
	user: User;
}

export const ProfilePageHeader: FC<IProfilePageHeaderProps> = ({ user }) => {
	const { t } = useTranslation();

	return (
		<header className="flex h-[350px] flex-col items-center py-2">
			<div className="mb-3 h-[100px] w-[100px] rounded-full bg-base-300"></div>
			<span className="swap-on text-3xl font-bold">{getUserFullName(user)}</span>
			<div className="mt-4">
				<div className="cols grid grid-cols-2 justify-end gap-3">
					<span>
						{t("AGE")}: {user.age}
					</span>
					<span>
						{t("GENDER")}: {t(user.gender)}
					</span>
				</div>

				<div className="flex grid  grid-cols-2 items-center gap-3">
					<span>
						{t("WEIGHT")}: {user.weight}
					</span>
					<span>
						{t("HEIGHT")}: {user.height}
					</span>
				</div>
			</div>
		</header>
	);
};
