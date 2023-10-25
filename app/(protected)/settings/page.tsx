"use client";

import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

export default function SettingsPage() {
	const GENDERS = ["male", "female"];

	const [gender, setGender] = useState(GENDERS[0]);

	return (
		<div>
			<RadioGroup
				value={gender}
				onChange={setGender}
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
					/>
				</div>
				<div className="flex flex-col items-start gap-2">
					<label className="font-bold text-2xl">Height</label>
					<input
						className="rounded-md p-2 py-1 "
						placeholder="Your weight"
						type="number"
					/>
				</div>
			</div>
			<div className="flex flex-col items-start gap-2">
				<label className="font-bold text-2xl">Age</label>
				<input
					className="rounded-md p-2 py-1 "
					placeholder="Your weight"
					type="number"
				/>
			</div>
			<div className="flex flex-col items-start gap-2">
				<label className="font-bold text-2xl">Calories per day</label>
				<input
					className="rounded-md p-2 py-1 "
					placeholder="Your weight"
					type="number"
				/>
			</div>
			<div className="flex flex-col items-stretch gap-4  w-full">
				<div className="flex flex-col items-start gap-2">
					<label className="font-bold text-2xl">Contraindications</label>
					<textarea
						className="rounded-md p-2 py-1 w-full h-60 resize-none"
						placeholder="Your weight"
					/>
				</div>
				<div className="flex flex-col items-start gap-2">
					<label className="font-bold text-2xl">Wishes</label>
					<textarea
						className="rounded-md p-2 py-1 w-full h-60 resize-none"
						placeholder="Your weight"
					/>
				</div>
			</div>
		</div>
	);
}
