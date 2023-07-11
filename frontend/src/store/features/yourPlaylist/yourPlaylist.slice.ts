import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPlaylist } from "../../../types/playlist.interface";
import { IMusicBlock } from "../../../components/MusicBlock/MusicBlock.props";

interface yourPlaylistState {
    data: IPlaylist[] | null
    music?: IMusicBlock[] | null
}

const initialState: yourPlaylistState = {
    data: [],
    music: []
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
        },
        setMusicInPlaylist: (state,action: PayloadAction<IMusicBlock[]>) => {
            state.music = action.payload
        },
        removeMusicInPlaylist: (state,action: PayloadAction<number>) => {
            const newArray = state.music
            newArray?.splice(action.payload,1)
            state.music = newArray
        },
    }
})

export const {deletePlaylist,setPlaylist,setMusicInPlaylist, removeMusicInPlaylist} = yourPlaylist.actions 

export default yourPlaylist.reducer