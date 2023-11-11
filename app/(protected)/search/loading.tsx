import { Skeleton } from "@/components/UI/Skeleton";

export default function SearchPageLoading() {
	return (
		<div className="animate-pulse">
			<Skeleton
				width="100%"
				height="40px"
				rounded
			/>
		</div>
	);
}
