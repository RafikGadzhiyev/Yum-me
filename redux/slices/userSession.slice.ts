import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
	session: User | null;
}

const initialState: IState = {
	session: null,
};

const userSessionSlice = createSlice({
	name: "slice/user",
	initialState,
	reducers: {
		updateUserSession() {
			//  do some stuff
		},
		removeUserSession() {
			//  do some stuff
		},
		readUserSession(state, action: PayloadAction<User | null>) {
			//  do some stuff
			state.session = action.payload;

			return state;
		},
	},
});

export const { readUserSession } = userSessionSlice.actions;
export default userSessionSlice.reducer;
