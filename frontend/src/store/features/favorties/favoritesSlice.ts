import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface favoritesState {
    favorties: string[] | null
}

const initialState: favoritesState = {
    favorties: []
}

export const favoritesSlice = createSlice({
    name: "favortiesSlice",
    initialState,
    reducers: {
        setFavortiesCheck: (state, action: PayloadAction<string[]>) => {
            state.favorties = action.payload
        },
        deleteFavoritesForIdCheck: (state, action: PayloadAction<string>) => {
            const newFavorties = state.favorties?.filter(item => !(item == action.payload))
            if(newFavorties){
                state.favorties = newFavorties
            }
            console.log(state.favorties)
        }
    }
})

export const {deleteFavoritesForIdCheck,setFavortiesCheck} = favoritesSlice.actions

export default favoritesSlice.reducer