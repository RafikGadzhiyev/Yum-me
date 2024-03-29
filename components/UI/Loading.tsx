export const Loading = () => {
	return (
		<div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
			<div className="rounded-full w-[50px] h-[50px]  border-r border-r-white animate-spin shadow-[5px_0_20px_-10px_white]"></div>
		</div>
	);
};
