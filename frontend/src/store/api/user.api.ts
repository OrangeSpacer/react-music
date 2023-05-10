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
                }
            })
        })
    })
})

export const {useLoginUserMutation} = userApi