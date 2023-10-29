"use client";

import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { UserHealthConfig } from "@/mocks/AIResponse.mock";
import { ContentModal } from "../UI/ContentModal";

const GENDERS = ["male", "female"];

export const SettingsPageWrapper = () => {
	const [gender, setGender] = useState(GENDERS[0]);
	const [healthConfig, setHealthConfig] = useState(
		structuredClone(UserHealthConfig)
	);

	const updateConfig = (key: string, value: string) => {
		setHealthConfig({
			...healthConfig,
			[key]: value,
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
						Gender
					</RadioGroup.Label>
					<div className="flex items-center gap-2">
						{GENDERS.map((gender) => (
							<RadioGroup.Option
								value={gender}
								key={gender}
								className="bg-slate-500 capitalize text-white my-3 p-2 py-1 rounded-md ui-checked:bg-green-600 cursor-pointer"
							>
								{gender}
							</RadioGroup.Option>
						))}
					</div>
				</RadioGroup>
				<div className="flex  items-center gap-4  w-full">
					<div className="flex flex-col items-start gap-2">
						<label className="font-bold text-2xl">Weight</label>
						<input
							className="rounded-md p-2 py-1 "
							placeholder="Your weight"
							type="number"
							value={parseFloat(healthConfig.weight)}
							onChange={(e) => updateConfig("weight", e.target.value)}
						/>
					</div>
					<div className="flex flex-col items-start gap-2">
						<label className="font-bold text-2xl">Height</label>
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
					<label className="font-bold text-2xl">Age</label>
					<input
						className="rounded-md p-2 py-1 "
						placeholder="Your weight"
						type="number"
						value={healthConfig.age}
						onChange={(e) => updateConfig("age", e.target.value)}
					/>
				</div>
				<div className="flex flex-col items-start gap-2">
					<label className="font-bold text-2xl">Calories per day</label>
					<input
						className="rounded-md p-2 py-1 "
						placeholder="Your weight"
						type="number"
						value={healthConfig.caloriesPerDay}
						onChange={(e) => updateConfig("caloriesPerDay", e.target.value)}
					/>
				</div>
				<div className="flex flex-col items-stretch gap-4  w-full">
					<div className="flex flex-col items-start gap-2">
						<label className="font-bold text-2xl">Contraindications</label>
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
						<label className="font-bold text-2xl">Wishes</label>
						<textarea
							className="rounded-md p-2 py-1 w-full h-60 resize-none"
							placeholder="Your wishes"
							value={healthConfig.wishes}
							onChange={(e) => updateConfig("wishes", e.target.value)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
