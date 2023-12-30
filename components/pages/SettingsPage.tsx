"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLoading } from "@/hooks/useLoading";

import { account, databases, Query } from "@/app/appwrite";
import { RootStore } from "@/redux/store";

import { Button, Wrap } from "@chakra-ui/react";
import { Loading } from "../UI/Loading";
import { GenderRadioGroup } from "../UI/GenderRadioGroup";
import { FormInput } from "../UI/FormInput";
import { FormTextarea } from "../UI/FormTextarea";
import { ContentModal } from "../modals/ContentModal";

export const SettingsPageWrapper = () => {
	const { t } = useTranslation();
	const { startLoading, stopLoading, isLoading } = useLoading();

	const cachedUserHealthConfig = useSelector(
		(store: RootStore) => store.userHealthDataReducer.userHealthData,
	);

	const [healthConfig, setHealthConfig] = useState(
		structuredClone(cachedUserHealthConfig),
	);

	const resetConfig = () => {
		setHealthConfig(structuredClone(cachedUserHealthConfig));
	};

	const updateConfig = (key: string, value: string | number) => {
		setHealthConfig({
			...healthConfig,
			[key]: value,
		});
	};

	const updateConfigInDatabase = async () => {
		if (!healthConfig) return;

		startLoading();

		await databases.updateDocument(
			process.env.NEXT_PUBLIC_DATABASE_ID!,
			process.env.NEXT_PUBLIC_USER_COLLECTION_ID!,
			healthConfig.$id,
			JSON.stringify({
				weight: healthConfig.weight,
				height: healthConfig.height,
				age: healthConfig.age,
				gender: healthConfig.gender,
				calories_per_day: healthConfig.calories_per_day,
				contraindications: healthConfig.contraindications,
				wishes: healthConfig.wishes,
			}),
		);

		stopLoading();
	};

	useEffect(() => {
		account.get().then((user) => {
			databases
				.listDocuments(
					process.env.NEXT_PUBLIC_DATABASE_ID!,
					process.env.NEXT_PUBLIC_USER_COLLECTION_ID!,
					[
						Query.equal("email", user.email),
						Query.select([
							"$id",
							"email",
							"name",
							"last_name",
							"age",
							"weight",
							"height",
							"contraindications",
							"wishes",
							"gender",
							"calories_per_day",
							"role",
						]),
					],
				)
				.then((queryResult) => {
					setHealthConfig(structuredClone(queryResult.documents[0]));
				});
		});
	}, []);

	if (!healthConfig) {
		return <span>Wait, It takes few minutes</span>;
	}

	return (
		<div>
			<ContentModal config={JSON.stringify(healthConfig, null, 2)} />

			<div>
				<GenderRadioGroup
					initialGender={healthConfig?.gender}
					updateGender={(gender: string) => updateConfig("gender", gender)}
				/>
				<Wrap mb={4}>
					<FormInput<number, "number">
						initialValue={healthConfig?.weight}
						field="weight"
						labelValueKey="WEIGHT"
						placeholder="Your weight"
						type="number"
						updateValue={updateConfig}
					/>

					<FormInput<number, "number">
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
					<FormInput<number, "number">
						initialValue={healthConfig?.age}
						field="age"
						labelValueKey="AGE"
						placeholder="Your age"
						type="number"
						updateValue={updateConfig}
					/>

					<FormInput<number, "number">
						initialValue={healthConfig?.calories_per_day}
						field="calories_per_day"
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