import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMusicData } from "../../../types/music.interface";

interface PlayerState {
	tracks: IMusicData[];
	currentTrack: IMusicData | null;
	isPlaying: boolean;
	durationTrack: number;
	volumeTrack: number;
	currentTime: number;
}

const initialState: PlayerState = {
	currentTrack: null,
	isPlaying: false,
	durationTrack: 0,
	currentTime: 0,
	volumeTrack: 50,
	tracks: [],
};

export const playerSlice = createSlice({
	name: "playerSlice",
	initialState,
	reducers: {
		setPlayerTracks: (state, action: PayloadAction<IMusicData[]>) => {
			state.tracks = action.payload;
		},
		setCurrentTrack: (state, action: PayloadAction<string>) => {
			const indexTrack = state.tracks.findIndex((track) => track._id == action.payload);
			state.currentTrack = state.tracks[indexTrack];
		},
		playMusic: (state) => {
			state.isPlaying = true;
		},
		pauseMusic: (state) => {
			state.isPlaying = false;
		},
		setDuration: (state, action: PayloadAction<number>) => {
			state.durationTrack = action.payload;
		},
		setCurrentTime: (state, action: PayloadAction<number>) => {
			state.currentTime = action.payload;
		},
		setVolumeTrack: (state, action: PayloadAction<number>) => {
			state.volumeTrack = action.payload;
		},
	},
});

export const {
	setCurrentTrack,
	setPlayerTracks,
	pauseMusic,
	playMusic,
	setDuration,
	setCurrentTime,
	setVolumeTrack,
} = playerSlice.actions;

export default playerSlice.reducer;
