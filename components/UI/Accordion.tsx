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
		<AccordionItem className="bg-slate-300 rounded-md overflow-hidden">
			<h2>
				<AccordionButton
					className="transition p-2 bg-slate-300"
					_expanded={{ bg: "#87EEAB" }}
				>
					<span>{label}</span>
					<AccordionIcon />
				</AccordionButton>
			</h2>
			<AccordionPanel
				padding={5}
				className="bg-[#81bb95] text-white prose max-w-full"
			>
				{children}
			</AccordionPanel>
		</AccordionItem>
	);
};
