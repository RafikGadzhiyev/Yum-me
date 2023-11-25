"use client";

import { FC, PropsWithChildren, useState } from "react";

import { RadioGroup } from "@headlessui/react";
import { ContentModal } from "../modals/ContentModal";
import { Loading } from "../UI/Loading";

import { useFetch } from "@/hooks/useFetch";
import { useTranslation } from "react-i18next";

const GENDERS = ["male", "female"];

interface ISettingsPageProps extends PropsWithChildren {
	config: any;
	user: any;
}

export const SettingsPageWrapper: FC<ISettingsPageProps> = ({
	config,
	user,
}) => {
	const { t } = useTranslation();

	const { isLoading, sendRequest } = useFetch();
	const [healthConfig, setHealthConfig] = useState(structuredClone(config));

	const updateConfig = (key: string, value: string) => {
		setHealthConfig({
			...healthConfig,
			[key]: value,
		});
	};

	const resetConfig = () => {
		setHealthConfig(structuredClone(config));
	};

	const updateConfigInDatabase = () => {
		sendRequest("POST", `/api/health_data?email=${user?.email}`, healthConfig, {
			"Content-Type": "application/json",
		});
	};

	return (
		<div>
			<ContentModal config={JSON.stringify(healthConfig, null, 2)} />
			<div>
				<RadioGroup
					value={healthConfig.gender}
					onChange={(value: string) => updateConfig("gender", value)}
					className="flex flex-col items-start"
				>
					<RadioGroup.Label className="font-bold text-2xl">
						{t("GENDER")}
					</RadioGroup.Label>
					<div className="flex items-center gap-2">
						{GENDERS.map((gender) => (
							<RadioGroup.Option
								value={gender}
								key={gender}
								className="bg-slate-500 capitalize text-white my-3 p-2 py-1 rounded-md ui-checked:bg-green-600 cursor-pointer"
							>
								{t(gender.toUpperCase())}
							</RadioGroup.Option>
						))}
					</div>
				</RadioGroup>
				<div className="flex  items-center gap-4  w-full">
					<div className="flex flex-col items-start gap-2">
						<label className="font-bold text-2xl">{t("WEIGHT")}</label>
						<input
							className="rounded-md p-2 py-1 "
							placeholder="Your weight"
							type="number"
							value={parseFloat(healthConfig.weight)}
							onChange={(e) => updateConfig("weight", e.target.value)}
						/>
					</div>
					<div className="flex flex-col items-start gap-2">
						<label className="font-bold text-2xl">{t("HEIGHT")}</label>
						<input
							className="rounded-md p-2 py-1 "
							placeholder="Your weight"
							type="number"
							value={parseFloat(healthConfig.height)}
							onChange={(e) => updateConfig("height", e.target.value)}
						/>
					</div>
				</div>
				<div className="flex flex-col items-start gap-2">
					<label className="font-bold text-2xl">{t("AGE")}</label>
					<input
						className="rounded-md p-2 py-1 "
						placeholder="Your weight"
						type="number"
						value={healthConfig.age}
						onChange={(e) => updateConfig("age", e.target.value)}
					/>
				</div>
				<div className="flex flex-col items-start gap-2">
					<label className="font-bold text-2xl">{t("CALORIES_PER_DAY")}</label>
					<input
						className="rounded-md p-2 py-1 "
						placeholder="Your weight"
						type="number"
						value={healthConfig.calories_per_day}
						onChange={(e) => updateConfig("calories_per_day", e.target.value)}
					/>
				</div>
				<div className="flex flex-col items-stretch gap-4  w-full">
					<div className="flex flex-col items-start gap-2">
						<label className="font-bold text-2xl">
							{t("CONTRAINDICATIONS")}
						</label>
						<textarea
							className="rounded-md p-2 py-1 w-full h-60 resize-none"
							placeholder="Your weight"
							value={healthConfig.contraindications}
							onChange={(e) =>
								updateConfig("contraindications", e.target.value)
							}
						/>
					</div>
					<div className="flex flex-col items-start gap-2">
						<label className="font-bold text-2xl">{t("WISHES")}</label>
						<textarea
							className="rounded-md p-2 py-1 w-full h-60 resize-none"
							placeholder="Your wishes"
							value={healthConfig.wishes}
							onChange={(e) => updateConfig("wishes", e.target.value)}
						/>
					</div>
				</div>

				<div className="my-2 flex items-center gap-2">
					<button
						className="min-w-[150px] rounded-md p-2 bg-green-300 py-1 transition hover:bg-green-400"
						onClick={updateConfigInDatabase}
					>
						{t("SAVE")}
					</button>

					<button
						onClick={resetConfig}
						className="min-w-[150px] rounded-md p-2 bg-red-300 py-1 transition hover:bg-red-400"
					>
						{t("RESET")}
					</button>
				</div>
			</div>

			{isLoading && <Loading />}
		</div>
	);
};
