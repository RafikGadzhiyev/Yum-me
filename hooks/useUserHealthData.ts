import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "@/redux/store";
import { readUserHealthData } from "@/redux/slices/userHealthData.slice";
import { getUsers } from "@/api/user";
import { Query } from "@/lib/appwrite";

export const useUserHealthData = (email: string) => {
	const dispatch = useDispatch(); // If null -> update from database
	const userHealthDataFromStore = useSelector(
		(store: RootStore) => store.userHealthDataReducer.userHealthData,
	);

	// By default value from store
	const [userHealthData, setUserHealthData] = useState(userHealthDataFromStore);

	useEffect(() => {
		if (!userHealthData) {
			getUsers([Query.equal("email", email)]).then((users) => {
				// getting first user instance if we have multiple instance with the same email
				const user = users[0];

				// updating current state
				setUserHealthData(user);

				//updating state in store
				dispatch(readUserHealthData(user));
			});
		}
	}, [dispatch, email, userHealthData]);

	return userHealthData;
};