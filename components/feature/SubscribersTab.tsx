import { useSelector } from "react-redux";
import { RootStore } from "@/redux/store";
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { Loading } from "@/components/UI/Loading";
import { SearchedUser } from "@/components/feature/SearchedUser";
import { Role } from "@prisma/client";

export const SubscribersTab = () => {
	const { sendRequest, isLoading } = useFetch();
	const currentUser = useSelector(
		(store: RootStore) => store.userHealthDataReducer.user,
	);

	const [subscribers, setSubscribers] = useState([]);

	useEffect(() => {
		sendRequest("GET", `/api/subscribers?_ids=${currentUser?.subscribers}`).then(
			(response) => {
				setSubscribers(response.subscribers || []);
			},
		);
	}, [sendRequest, currentUser?.subscribers]);

	return (
		<>
			<div>
				<ul className="flex w-full flex-wrap items-start gap-1">
					{subscribers.map((subscriber: User) => (
						<li
							className="card my-2 border-4 border-base-300 bg-base-200"
							key={subscriber.id}
						>
							<SearchedUser
								key={subscriber.id}
								$id={subscriber.id}
								name={subscriber.name}
								email={subscriber.email}
								age={subscriber.age}
								role={subscriber.role as Role}
							/>
						</li>
					))}
				</ul>
			</div>
			{isLoading && <Loading />}
		</>
	);
};
