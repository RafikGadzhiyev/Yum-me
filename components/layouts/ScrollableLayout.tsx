import { FC, PropsWithChildren } from "react";

export const ScrollableLayout: FC<PropsWithChildren> = ({ children }) => {
	return <div className="max-h-[100vh] w-full overflow-y-auto">{children}</div>;
};
