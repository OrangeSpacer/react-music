import { IMusicData } from "../../../types/music.interface";
import { apiSlice } from "../apiSlice";

export const musicApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getMusicAll: builder.query<IMusicData[], string>({
			query: () => "/track/all",
		}),
		getYourMusic: builder.query<IMusicData[], string>({
			query: () => ({
				url: "/track/your",
				method: "GET",
			}),
		}),
		createTrack: builder.mutation({
			query: (payload) => ({
				url: "/track/add",
				method: "POST",
				body: payload,
			}),
		}),
		dleteYourTrack: builder.mutation({
			query: (payload) => ({
				url: `/track/delete?id=${payload}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useGetMusicAllQuery,
	useGetYourMusicQuery,
	useCreateTrackMutation,
	useDleteYourTrackMutation,
} = musicApi;
