import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMusicData } from "../../../types/music.interface";

interface yourMusicState {
    data: IMusicData[] | null
}

const initialState: yourMusicState = {
    data: []
}

export const yourMusicSlice = createSlice({
    name: "yourMusic",
    initialState,
    reducers: {
        setMusic: (state, action: PayloadAction<IMusicData[]>) => {
            state.data = action.payload
        },
        deleteMusic: (state, action: PayloadAction<IMusicData[]>) => {
            state.data = action.payload
        }
    }
})

export const {setMusic, deleteMusic} = yourMusicSlice.actions

export default yourMusicSlice.reducer