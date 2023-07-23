import { IMusicData } from "../../../types/music.interface";
import { apiSlice } from "../apiSlice";

export const favoritesApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllFavorites: builder.mutation<IMusicData[], string>({
			query: () => "/favorites/all",
		}),
		addInFavorties: builder.mutation<string, object>({
			query: (payload) => ({
				url: "/favorites/add",
				method: "POST",
				body: payload,
			}),
		}),
		deleteInFavorties: builder.mutation<string, object>({
			query: (payload) => ({
				url: "/favorites/remove",
				method: "POST",
				body: payload,
			}),
		}),
	}),
});

export const {
	useGetAllFavoritesMutation,
	useAddInFavortiesMutation,
	useDeleteInFavortiesMutation,
} = favoritesApi;
