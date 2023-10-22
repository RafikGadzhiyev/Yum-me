"use client";

import { FC, PropsWithChildren } from "react";
import {
	Accordion as AccordionContainer,
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
		<AccordionContainer
			allowToggle
			display="grid"
			gap={10}
		>
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
					padding={10}
					className="bg-[#81bb95] text-white"
				>
					{children}
				</AccordionPanel>
			</AccordionItem>
		</AccordionContainer>
	);
};
