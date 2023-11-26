import { configureStore } from "@reduxjs/toolkit";
import { isProd } from "@/utils/nodeEnvType.util";
import userSlice from "./slices/user.slice";
import userHealthDataSlice from "./slices/userHealthData.slice";

export const store = configureStore({
	reducer: {
		userReducer: userSlice,
		userHealthDataReducer: userHealthDataSlice,
	},
	devTools: !isProd,
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
