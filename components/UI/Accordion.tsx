"use client";

import { FC, PropsWithChildren } from "react";
import {
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
} from "@chakra-ui/react";

interface IAccordionProps extends PropsWithChildren {
	label: string;
}

export const Accordion: FC<IAccordionProps> = ({ children, label }) => {
	return (
		<AccordionItem className="overflow-hidden rounded-md border-none bg-neutral">
			<h2>
				<AccordionButton className=" p-2 transition">
					<span className="text-neutral-content">{label}</span>
					<AccordionIcon />
				</AccordionButton>
			</h2>
			<AccordionPanel
				padding={5}
				className="prose max-w-full bg-base-300"
			>
				{children}
			</AccordionPanel>
		</AccordionItem>
	);
};