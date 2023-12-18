import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@supabase/supabase-js";

// TODO: add use health data type

interface IState {
	userHealthData: any | null;
}

const initialState: IState = {
	userHealthData: null,
};

const userHealthData = createSlice({
	name: "slice/user_health_data",
	initialState,
	reducers: {
		updateUserHealthData(state) {
			//  do some stuff
		},
		removeUserHealthData(state) {
			//  do some stuff
		},
		readUserHealthData(state, action: PayloadAction<any | null>) {
			const KEYS_FOR_REMOVE = ["generated_foods", "created_at", "updated_at", "id"];

			for (let keyForRemove of KEYS_FOR_REMOVE) {
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