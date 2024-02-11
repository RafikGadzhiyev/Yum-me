import { FC } from "react";

import { $Enums } from "@prisma/client";
import { RadioButtonWithLabel } from "@/components/UI/RadioButtonWithLabel";

interface IGenderRadioGroupProps {
	initialGender: string;
	updateGender: (gender: string) => void;
}

export const GenderRadioGroup: FC<IGenderRadioGroupProps> = ({
	initialGender,
	updateGender,
}) => {
	return (
		<div>
			{Object.keys($Enums.Gender).map((gender) => (
				<div
					key={gender}
					className="form-control"
				>
					<RadioButtonWithLabel
						checked={initialGender === gender}
						update={() => updateGender(gender)}
						contentKey={gender}
					/>
				</div>
			))}
		</div>
	);
};
