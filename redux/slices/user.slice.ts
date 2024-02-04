import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Document } from "@/lib/appwrite";

// TODO: add use health data type
interface IState {
	user: Document | null;
	healthData: Document | null;
}

const initialState: IState = {
	user: null,
	healthData: null,
};

const userHealthData = createSlice({
	name: "slice/user_health_data",
	initialState,
	reducers: {
		updateUserHealthData() {
			//  do some stuff
		},
		removeUserHealthData() {
			//  do some stuff
		},
		readUserHealthData(state, action: PayloadAction<Document | null>) {
			const KEYS_FOR_REMOVE = [
				"$collectionId",
				"$createdAt",
				"$databaseId",
				"$permissions",
				"$updatedAt",
				"generated_foods",
				"created_at",
				"updated_at",
				"",
			];

			if (!action.payload) {
				return;
			}

			for (const keyForRemove of KEYS_FOR_REMOVE) {
				if (action.payload[keyForRemove]) {
					delete action.payload[keyForRemove];
				}
			}

			state.user = action.payload;

			state.healthData = {
				id: state.user.id,
				email: state.user.email,
				gender: state.user.gender,
				age: state.user.age,
				height: state.user.height,
				weight: state.user.weight,
				caloriesPerDay: state.user.caloriesPerDay,
				contraindications: state.user.contraindications,
				wishes: state.user.wishes,
			};

			return state;
		},
	},
});

export const { readUserHealthData } = userHealthData.actions;
export default userHealthData.reducer;
