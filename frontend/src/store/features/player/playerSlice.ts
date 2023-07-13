import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMusicData } from "../../../types/music.interface";

interface PlayerState {
    tracks: IMusicData[],
    currentTrack: IMusicData | null,
    isPlaying: boolean
}

const initialState: PlayerState = {
    currentTrack: null,
    isPlaying: false,
    tracks: []
}

export const playerSlice = createSlice({
    name: "playerSlice",
    initialState,
    reducers: {
        setPlayerTracks: (state,action: PayloadAction<IMusicData[]>) => {
            state.tracks = action.payload
        },
        setCurrentTrack: (state,action: PayloadAction<string>) => {
            const indexTrack = state.tracks.findIndex(track => track._id == action.payload)
            state.currentTrack = state.tracks[indexTrack]
        },
        playMusic: (state) => {
            state.isPlaying = true
        },
        pauseMusic: (state) => {
            state.isPlaying = false
        }
    }
})

export const {setCurrentTrack,setPlayerTracks,pauseMusic,playMusic} = playerSlice.actions

export default playerSlice.reducer