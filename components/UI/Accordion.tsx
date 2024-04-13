import { FC, PropsWithChildren, ReactNode } from "react";

interface IAccordionProps extends PropsWithChildren {
	label: string;
	append?: ReactNode;
}

export const Accordion: FC<IAccordionProps> = ({ children, label, append }) => {
	return (
		<div className="collapse join-item collapse-plus border-2 border-base-300 bg-base-200">
			<input
				type="checkbox"
				id="test"
				name="my-accordion-1"
			/>
			<div className="text-md collapse-title flex items-center font-medium">
				<label htmlFor="test">{label}</label>

				<div
					data-slot="#append"
					className="ml-auto"
				>
					{append}
				</div>
			</div>
			<div className="collapse-content">{children}</div>
		</div>
	);
};
