import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import { LOCALE_BY_LANGUAGE } from "@/i18n/dictionary";
import { FC } from "react";

interface IPostHeader {
	author: string;
	role: string;
	isNew: boolean;
	created_at: Date;
}

export const PostHeader: FC<IPostHeader> = ({ author, isNew, created_at, role }) => {
	const { i18n } = useTranslation();
	return (
		<div className="items center flex justify-start shadow-gray-400">
			<div className="flex flex-col">
				<span>{author}</span>
				{!isNew && (
					<div className="-translate-y-1/4 text-sm text-gray-500">
						<span>{role}</span>
						<span>
							{" "}
							·{" "}
							{formatDistanceToNow(new Date(created_at), {
								addSuffix: true,
								locale: LOCALE_BY_LANGUAGE[i18n.language],
							})}
						</span>
					</div>
				)}
			</div>
		</div>
	);
};