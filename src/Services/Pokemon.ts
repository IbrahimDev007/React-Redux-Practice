// rtk query api create
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
type Pokemon = {
	species: string[];
	sprites: string[];
	// ============
};

export const pokemonAPI = createApi({
	reducerPath: "pokemonApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
	endpoints: (builder) => ({
		getPokeonByName: builder.query<Pokemon, string>({
			query: (name: string) => `pokemon/${name}`,
		}),
	}),
});
export const { useGetPokeonByNameQuery } = pokemonAPI;
