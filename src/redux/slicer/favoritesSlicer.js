//Notre redux slicer qui s'occupe d'ajouter,d'afficher,et de supprimer les favoris,
// ils s'enregistrent comme state global

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      console.log("added");
      state.favorites = [...action.payload];
    },
    addFavorite: (state, action) => {
      console.log("added");
      state.favorites = [...state.favorites, action.payload];
    },
    deleteFavorite: (state, action) => {
      console.log("added");
      state.favorites = [
        ...state.favorites.filter((item) => item != action.payload),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFavorites, addFavorite, deleteFavorite } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
