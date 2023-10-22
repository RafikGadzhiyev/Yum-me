export const Loading = () => {
	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
			<div className="rounded-full w-[50px] h-[50px]  border-r border-r-white animate-spin shadow-[5px_0_20px_-10px_white]"></div>
		</div>
	);
};
