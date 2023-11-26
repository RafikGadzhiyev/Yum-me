import { configureStore } from "@reduxjs/toolkit";
import { isProd } from "@/utils/nodeEnvType.util";
import userSlice from "./slices/user.slice";

export const store = configureStore({
	reducer: {
		userReducer: userSlice,
	},
	devTools: !isProd,
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
