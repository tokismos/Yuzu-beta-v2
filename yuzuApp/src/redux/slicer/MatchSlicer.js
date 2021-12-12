import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nbrOfRecipes: 3,
  matches: [],
};

export const matchSlice = createSlice({
  name: "matches ",
  initialState,
  reducers: {
    addMatch: (state, action) => {
      console.log("added");
      state.matches = [...state.matches, action.payload];
    },
    changeNumberOfRecipes: (state, action) => {
      state.nbrOfRecipes = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMatch, changeNumberOfRecipes } = matchSlice.actions;

export default matchSlice.reducer;
