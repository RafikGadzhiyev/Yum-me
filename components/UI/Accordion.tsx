import { FC, PropsWithChildren } from "react";

interface IAccordionProps extends PropsWithChildren {
	label: string;
}

export const Accordion: FC<IAccordionProps> = ({ children, label }) => {
	return (
		<div className="collapse join-item collapse-plus border-2 border-base-300 bg-base-200">
			<input
				type="checkbox"
				id="test"
				name="my-accordion-1"
			/>
			<div className="text-md collapse-title font-medium">
				<label htmlFor="test">{label}</label>
			</div>
			<div className="collapse-content">{children}</div>
		</div>
	);
};
