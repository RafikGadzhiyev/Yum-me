"use client";

import { HTMLInputTypeAttribute, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "@/hooks/useFetch";

import { RootStore } from "@/redux/store";

import { Button, Wrap } from "@chakra-ui/react";
import { Loading } from "../UI/Loading";
import { GenderRadioGroup } from "../UI/GenderRadioGroup";
import { FormInput } from "../UI/FormInput";
import { FormTextarea } from "../UI/FormTextarea";
import { ContentModal } from "../modals/ContentModal";
import { readUserHealthData } from "@/redux/slices/user.slice";

export const SettingsPageWrapper = () => {
	const { t } = useTranslation();
	const { isLoading, sendRequest } = useFetch();

	const cachedUserHealthConfig = useSelector(
		(store: RootStore) => store.userHealthDataReducer.user,
	);

	const dispatch = useDispatch();

	const [healthConfig, setHealthConfig] = useState(
		structuredClone(cachedUserHealthConfig),
	);

	const resetConfig = () => {
		setHealthConfig(structuredClone(cachedUserHealthConfig));
	};

	const getValueWithCorrectType = (value: string, type: HTMLInputTypeAttribute) => {
		switch (type) {
			case "number":
				return parseInt(value);
			default:
				return value;
		}
	};

	const updateConfig = (
		key: string,
		value: string,
		type: HTMLInputTypeAttribute,
	) => {
		const valueWithCorrectType = getValueWithCorrectType(value, type);

		setHealthConfig({
			...healthConfig,
			[key]: valueWithCorrectType,
		});
	};

	const updateConfigInDatabase = async () => {
		if (!healthConfig) return;

		const searchQuery = {
			email: healthConfig.email,
		};

		const user = await sendRequest(
			"PATCH",
			"/api/user",
			{
				searchQuery,
				fieldsToUpdate: healthConfig,
			},
			{
				"Content-Type": "application/json",
			},
		);

		dispatch(readUserHealthData(user));
	};

	useEffect(() => {
		setHealthConfig(structuredClone(cachedUserHealthConfig));
	}, [cachedUserHealthConfig]);

	if (!healthConfig) {
		return <span>Wait, It takes few minutes</span>;
	}

	return (
		<div>
			<ContentModal
				content={JSON.stringify(healthConfig, null, 2)}
				label="USER_HEALTH_CONFIG"
			/>

			<div>
				<GenderRadioGroup
					initialGender={healthConfig?.gender}
					updateGender={(gender: string) => updateConfig("gender", gender, "text")}
				/>
				<Wrap mb={4}>
					<FormInput
						initialValue={healthConfig?.weight}
						field="weight"
						labelValueKey="WEIGHT"
						placeholder="Your weight"
						type="number"
						updateValue={updateConfig}
					/>

					<FormInput
						initialValue={healthConfig?.height}
						field="height"
						labelValueKey="HEIGHT"
						placeholder="Your height"
						type="number"
						updateValue={updateConfig}
					/>
				</Wrap>

				<Wrap
					direction="column"
					mb={4}
				>
					<FormInput
						initialValue={healthConfig?.age}
						field="age"
						labelValueKey="AGE"
						placeholder="Your age"
						type="number"
						updateValue={updateConfig}
					/>

					<FormInput
						initialValue={healthConfig?.caloriesPerDay}
						field="caloriesPerDay"
						labelValueKey="CALORIES_PER_DAY"
						placeholder="Your calories per day"
						type="number"
						updateValue={updateConfig}
					/>
				</Wrap>

				<Wrap direction="column">
					<FormTextarea
						initialValue={healthConfig?.contraindications}
						labelValueKey="CONTRAINDICATIONS"
						field="contraindications"
						placeholder="Your contraindications"
						updateValue={updateConfig}
					/>

					<FormTextarea
						initialValue={healthConfig?.wishes}
						labelValueKey="WISHES"
						field="wishes"
						placeholder="Your wishes"
						updateValue={updateConfig}
					/>
				</Wrap>

				<Wrap my={3}>
					<Button
						variant="ghost"
						colorScheme="green"
						onClick={updateConfigInDatabase}
					>
						{t("SAVE")}
					</Button>

					<Button
						variant="ghost"
						colorScheme="red"
						onClick={resetConfig}
					>
						{t("RESET")}
					</Button>
				</Wrap>
			</div>

			{isLoading && <Loading />}
		</div>
	);
};
