import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Fetures/Counter/slice";
import { pokemonAPI } from "../Services/Pokemon";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postApi } from "../Services/Post";

const pokemonMiddleware = pokemonAPI.middleware;
const postMiddleware = postApi.middleware;

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		[pokemonAPI.reducerPath]: pokemonAPI.reducer,
		[postApi.reducerPath]: postApi.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		const defaultMiddleware = getDefaultMiddleware();
		const PokemonMiddleware = [...defaultMiddleware, pokemonMiddleware];
		const PostMiddleware = [...defaultMiddleware, postMiddleware];
		return [...PokemonMiddleware, ...PostMiddleware];
	},
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatcher = ReturnType<typeof store.dispatch>;
