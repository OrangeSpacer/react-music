import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "loginApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://127.0.0.1:5000/user"}),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (payload) => ({
                url: "/login",
                method: "POST",
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                credentials: "include"
            })
        }),
        registerUser: builder.mutation({
            query: (payload) => ({
                url: "/registration",
                method: "POST",
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                credentials: "include"
            })
        }),
        refreshUser: builder.mutation({
            query: () => ({
                url: "/refresh",
                method: "GET",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                credentials: "include"
            })
        }),
        logouthUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                credentials: "include"
            })
        })
    })
})

export const {useLoginUserMutation,useRegisterUserMutation,useRefreshUserMutation, useLogouthUserMutation} = userApi