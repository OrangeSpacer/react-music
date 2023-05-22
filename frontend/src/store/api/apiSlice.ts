import { BaseQueryApi,FetchArgs, createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { login, logout } from "../features/auth/authSlice"
import { RootState } from "../store"
import { ILogin } from "../../types/login.interface"

const baseQuery = fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).loginReducer.data?.token.accessToken
        if(token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    },
})

const baseQueryWithReauth = async (args:string | FetchArgs, api:BaseQueryApi, extraOptions: any ) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === 401 || result?.error?.status === 400) {
        console.log('sending refresh token')
        const refreshResult = await baseQuery("/user/refresh", api, extraOptions)
        if(refreshResult?.data) {

            api.dispatch(login(refreshResult.data as ILogin))
            result = await baseQuery(args, api, extraOptions)
        } else {
            console.log("logout")
            api.dispatch(logout())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})