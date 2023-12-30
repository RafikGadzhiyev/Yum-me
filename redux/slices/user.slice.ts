import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserActiveSession } from "@/app/appwrite";

interface IState {
	user: UserActiveSession | null;
}

const initialState: IState = {
	user: null,
};

const userSlice = createSlice({
	name: "slice/user",
	initialState,
	reducers: {
		updateUser() {
			//  do some stuff
		},
		removeUser() {
			//  do some stuff
		},
		readUser(state, action: PayloadAction<UserActiveSession | null>) {
			//  do some stuff
			state.user = action.payload;

			return state;
		},
	},
});

export const { readUser } = userSlice.actions;
export default userSlice.reducer;