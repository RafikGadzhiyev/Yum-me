import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Document } from "@/lib/appwrite";

// TODO: add use health data type

interface IState {
	userHealthData: Document | null;
	bio: Document | null;
}

const initialState: IState = {
	userHealthData: null,
	bio: null,
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

			state.userHealthData = action.payload;

			state.bio = {
				id: state.userHealthData.id,
				email: state.userHealthData.email,
				gender: state.userHealthData.gender,
				age: state.userHealthData.age,
				height: state.userHealthData.height,
				weight: state.userHealthData.weight,
				caloriesPerDay: state.userHealthData.caloriesPerDay,
				contraindications: state.userHealthData.contraindications,
				wishes: state.userHealthData.wishes,
			};

			return state;
		},
	},
});

export const { readUserHealthData } = userHealthData.actions;
export default userHealthData.reducer;
