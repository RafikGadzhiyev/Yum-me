"use client";

import { FC, PropsWithChildren, useState } from "react";

import { useFetch } from "@/hooks/useFetch";
import { useTranslation } from "react-i18next";

import { Button, Wrap } from "@chakra-ui/react";
import { Loading } from "../UI/Loading";
import { GenderRadioGroup } from "../UI/GenderRadioGroup";
import { FormInput } from "../UI/FormInput";
import { FormTextarea } from "../UI/FormTextarea";
import { ContentModal } from "../modals/ContentModal";

interface ISettingsPageProps extends PropsWithChildren {
	config: any;
	user: any;
}

export const SettingsPageWrapper: FC<ISettingsPageProps> = ({ config, user }) => {
	const { t } = useTranslation();
	const { isLoading, sendRequest } = useFetch();

	const [healthConfig, setHealthConfig] = useState(structuredClone(config));

	const resetConfig = () => {
		setHealthConfig(structuredClone(config));
	};

	const updateConfig = (key: string, value: string | number) => {
		setHealthConfig({
			...healthConfig,
			[key]: value,
		});
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
				<GenderRadioGroup
					initialGender={healthConfig.gender}
					updateGender={(gender: string) => updateConfig("gender", gender)}
				/>
				<Wrap mb={4}>
					<FormInput<number, "number">
						initialValue={parseFloat(healthConfig.weight)}
						field="weight"
						labelValueKey="WEIGHT"
						placeholder="Your weight"
						type="number"
						updateValue={updateConfig}
					/>

					<FormInput<number, "number">
						initialValue={parseFloat(healthConfig.height)}
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
						initialValue={parseInt(healthConfig.age)}
						field="age"
						labelValueKey="AGE"
						placeholder="Your age"
						type="number"
						updateValue={updateConfig}
					/>

					<FormInput<number, "number">
						initialValue={parseFloat(healthConfig.calories_per_day)}
						field="calories_per_day"
						labelValueKey="CALORIES_PER_DAY"
						placeholder="Your calories per day"
						type="number"
						updateValue={updateConfig}
					/>
				</Wrap>

				<Wrap direction="column">
					<FormTextarea
						initialValue={healthConfig.contraindications}
						labelValueKey="CONTRAINDICATIONS"
						field="contraindications"
						placeholder="Your contraindications"
						updateValue={updateConfig}
					/>

					<FormTextarea
						initialValue={healthConfig.wishes}
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
