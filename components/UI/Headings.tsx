import { FC, PropsWithChildren } from "react";

export const H1: FC<PropsWithChildren> = ({ children }) => {
	return <h1 className="font-bold text-2xl">{children}</h1>;
};
