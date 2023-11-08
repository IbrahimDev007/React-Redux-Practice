import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Fetures/Counter/slice";
import { pokemonAPI } from "../Services/Pokemon";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		[pokemonAPI.reducerPath]: pokemonAPI.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(pokemonAPI.middleware);
	},
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatcher = ReturnType<typeof store.dispatch>;
