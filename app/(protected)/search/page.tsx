export default async function SearchPage() {
	return (
		<div>
			<form className="flex  gap-2">
				<input
					className=" border-none outline-none rounded-md p-2 py-1 flex-1"
					placeholder="Search recipes"
				/>
				<button className="rounded-md px-2 bg-green-300 transition hover:bg-green-400 hover:text-white">
					Search
				</button>
			</form>
		</div>
	);
}
