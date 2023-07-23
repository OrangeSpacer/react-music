import { apiSlice } from "../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		loginUser: builder.mutation({
			query: (payload) => ({
				url: "/user/login",
				method: "POST",
				body: payload,
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				credentials: "include",
			}),
		}),
		registerUser: builder.mutation({
			query: (payload) => ({
				url: "/user/registration",
				method: "POST",
				body: payload,
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				credentials: "include",
			}),
		}),
		refreshUser: builder.mutation({
			query: () => ({
				url: "/user/refresh",
				method: "GET",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				credentials: "include",
			}),
		}),
		logouthUser: builder.mutation({
			query: () => ({
				url: "/user/logout",
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				credentials: "include",
			}),
		}),
	}),
});

export const {
	useLoginUserMutation,
	useRegisterUserMutation,
	useLogouthUserMutation,
	useRefreshUserMutation,
} = userApiSlice;
