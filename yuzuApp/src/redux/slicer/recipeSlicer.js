// c'Est la ou on enregistre tout les recettes comme state general,et puis la meme chose pour les filtres
// enregistrés

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeFilters: [],
  recipes: null,
};

export const recipeSlice = createSlice({
  name: "activeFilters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      console.log("name", action.payload.name);
      console.log("item", action.payload.item);
      state.activeFilters = action.payload;
    },
    removeFilters: (state) => {
      state.activeFilters = [];
    },
    setRecipes: (state, action) => {
      state.recipes = action.payload;
      console.log("setted");
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFilters, removeFilters, setRecipes } = recipeSlice.actions;

export default recipeSlice.reducer;
