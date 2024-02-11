"use client";

import { FC, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

interface IContentWrapper extends PropsWithChildren {
	label: string; // Either string or Key for i18n
	content: string;
}

export const ContentModal: FC<IContentWrapper> = ({ content, label }) => {
	const { t, i18n } = useTranslation();

	return (
		<>
			<label
				htmlFor="user_health_data_modal"
				className="btn btn-success"
			>
				{t("SHOW_CONFIG")}
			</label>

			<input
				type="checkbox"
				id="user_health_data_modal"
				className="modal-toggle"
			/>

			<div
				className="modal"
				role="dialog"
			>
				<div className="modal-box">
					<h3 className="text-lg font-bold">
						{i18n.exists(label) ? t(label) : label}
					</h3>
					<pre className="whitespace-pre-wrap py-4">{content}</pre>
				</div>

				<label
					className="modal-backdrop"
					htmlFor="user_health_data_modal"
				/>
			</div>
		</>
	);
};
