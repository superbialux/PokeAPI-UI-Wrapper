import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import PokemonType from './types';

interface PokemonShortInfo {
  name: string;
  url: string;
}

interface PokemonFullInfo {
  abilities: { ability: { name: string } }[];
  base_experience: number;
  sprites: {
    front_default: string | null;
  };
  height: number;
  weight: number;
  types: { type: { name: string } }[]; // good idea to transform the response but gotta go fast
  stats: { base_stat: number; stat: { name: string } }[];
}

interface PaginatedData<T> {
  count: number;
  next: string;
  previous: string | null;
  results: T[];
}

export const pokeapi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (builder) => ({
    getPokemons: builder.query<PaginatedData<PokemonShortInfo>, { num: number; page: number }>({
      query: ({ num, page }) => `/pokemon?limit=${num}&offset=${(page - 1) * num}`,
    }),
    getPokemonByName: builder.query<PokemonFullInfo, { name: string }>({
      query: ({ name }) => `/pokemon/${name}`,
    }),
    getPokemonTypes: builder.query<PokemonType[], void>({
      query: () => `/type`,
      transformResponse: (response: { results: PokemonType[] }) => response.results,
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonByNameQuery, useGetPokemonTypesQuery } = pokeapi;
