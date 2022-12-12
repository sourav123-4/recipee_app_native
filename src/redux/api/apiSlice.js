import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://tasty.p.rapidapi.com/recipes/list',
    headers: {
      'X-RapidAPI-Key': 'e43073c99dmsh408c3c265afefe4p154d75jsn6adfc04b0ae9',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
    },
    method: 'GET',
  }),
  endpoints: builder => ({
    getAllRecipes: builder.query({
      query: () => ({}),
    }),
  }),
});

export const {useGetAllRecipesQuery} = recipeApi;
