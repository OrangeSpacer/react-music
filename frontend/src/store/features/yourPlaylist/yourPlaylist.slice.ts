import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPlaylist } from "../../../types/playlist.interface";

interface yourPlaylistState {
    data: IPlaylist[] | null
}

const initialState: yourPlaylistState = {
    data: []
}

export const yourPlaylist = createSlice({
    name: "yourPlaylist",
    initialState,
    reducers: {
        setPlaylist: (state, action:PayloadAction<IPlaylist[]>) => {
            state.data = action.payload
        },
        deletePlaylist: (state,action: PayloadAction<number>) => {
            const newPlaylistArray = state.data
            newPlaylistArray?.splice(action.payload,1)
            state.data = newPlaylistArray
            
        }
    }
})

export const {deletePlaylist,setPlaylist} = yourPlaylist.actions 

export default yourPlaylist.reducer