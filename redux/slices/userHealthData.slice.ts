import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// TODO: add use health data type

interface IState {
	userHealthData: User | null;
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
		readUserHealthData(state, action: PayloadAction<User | null>) {
			const KEYS_FOR_REMOVE = ["generated_foods", "created_at", "updated_at", "id"];

			if (!action.payload) {
				return;
			}

			for (const keyForRemove of KEYS_FOR_REMOVE) {
				// @ts-expect-error Need to think!
				if (action.payload[keyForRemove]) {
					// @ts-expect-error Need to think
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