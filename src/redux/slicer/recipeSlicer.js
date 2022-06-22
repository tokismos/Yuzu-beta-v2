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
    setFilters: (state, { payload }) => {
      return { ...state, activeFilters: payload };
    },
    removeFilter: (state, { payload }) => ({ ...state, activeFilters: state.activeFilters.filter(i => Object.values(i) !== payload) }),
    resetFilters: (state) => ({ ...state, activeFilters: [] }),
    changeTime: (state, { payload }) => {
      const filteredState = state.activeFilters.filter(i => Object.keys(i).includes("tempsCuisson"));
      if (payload === 0) return { ...state, activeFilters: [...filteredState] };
      return { ...state, activeFilters: [...filteredState, { tempsCuisson: payload }] }
    },
    addFilter: (state, action) => ({ ...state, activeFilters: [...state.activeFilters, { [action.payload.type]: action.payload.name }] })
  },
});

// Action creators are generated for each case reducer function
export const {
  removeFilter,
  addFilter,
  changeTime,
  resetFilters,
} = recipeSlice.actions;

export default recipeSlice.reducer;
