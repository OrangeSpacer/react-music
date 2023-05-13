import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILogin } from "../../types/login.interface";

interface authState {
    data: ILogin | null
}

const initialState: authState = {
    data: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state,action: PayloadAction<ILogin>) => {
            localStorage.setItem("token",action.payload.token.accessToken)
            state.data = action.payload
        },
        refresh: (state,action: PayloadAction<ILogin>) => {
            localStorage.setItem("token",action.payload.token.accessToken)
            state.data = action.payload
        },
        logout: (state) => {
            localStorage.removeItem("token")
            state.data = null
        }
    }
})

export const {login,logout,refresh} = authSlice.actions

export default authSlice.reducer