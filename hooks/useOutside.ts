import { useCallback, useEffect, useRef } from "react";

export const useOutsideClick = <T extends HTMLElement>(callback: () => void) => {
	const ref = useRef<T>(null);

	useEffect(() => {
		const onMouseUp = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
				callback();
			}
		};

		document.addEventListener("pointerup", onMouseUp);

		return () => document.removeEventListener("pointerup", onMouseUp);
	}, [callback]);

	return ref;
};