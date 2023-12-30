import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Document } from "@/app/appwrite";

// TODO: add use health data type

interface IState {
	userHealthData: Document | null;
}

const initialState: IState = {
	userHealthData: null,
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
				"$id",
				"$permissions",
				"$updatedAt",
				"generated_foods",
				"created_at",
				"updated_at",
				"id",
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

			return state;
		},
	},
});

export const { readUserHealthData } = userHealthData.actions;
export default userHealthData.reducer;