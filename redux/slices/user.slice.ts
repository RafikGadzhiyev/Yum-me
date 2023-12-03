import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@supabase/supabase-js";

interface IState {
	user: User | null;
}

const initialState: IState = {
	user: null,
};

const userSlice = createSlice({
	name: "slice/user",
	initialState,
	reducers: {
		updateUser(state) {
			//  do some stuff
		},
		removeUser(state) {
			//  do some stuff
		},
		readUser(state, action: PayloadAction<User | null>) {
			//  do some stuff
			state.user = action.payload;

			return state;
		},
	},
});

export const { readUser } = userSlice.actions;
export default userSlice.reducer;