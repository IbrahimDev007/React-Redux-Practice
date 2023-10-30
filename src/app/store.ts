import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Fetures/Counter/slice";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatcher = ReturnType<typeof store.dispatch>;
