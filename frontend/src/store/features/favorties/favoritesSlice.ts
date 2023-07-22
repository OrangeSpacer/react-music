import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMusicData } from "../../../types/music.interface";

interface favoritesState {
	favorties: IMusicData[] | null;
}

const initialState: favoritesState = {
	favorties: [],
};

export const favoritesSlice = createSlice({
	name: "favortiesSlice",
	initialState,
	reducers: {
		setFavorties: (state, action: PayloadAction<IMusicData[]>) => {
			state.favorties = action.payload;
		},
		deleteFavoritesForIdCheck: (state, action: PayloadAction<string>) => {
			const newFavorties = state.favorties?.filter((item) => !(item._id == action.payload));
			if (newFavorties) {
				state.favorties = newFavorties;
			}
			console.log(state.favorties);
		},
	},
});

export const { deleteFavoritesForIdCheck, setFavorties } = favoritesSlice.actions;

export default favoritesSlice.reducer;
