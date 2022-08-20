//Quand on swipe a droite c'Est dans ce state qu'on enregistre toutes les recettes likées.
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nbrOfRecipes: 3,
  matches: [],
};

export const matchSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    removeMatch: (state, action) => {
      state.matches = [
        ...state.matches.filter((i) => i._id !== action.payload._id),
      ];
    },
    addMatch: (state, action) => {
      console.log("added");
      state.matches = [...state.matches, action.payload];
    },
    resetMatches: (state, action) => {
      state.matches = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMatch, resetMatches, removeMatch } = matchSlice.actions;

export default matchSlice.reducer;
