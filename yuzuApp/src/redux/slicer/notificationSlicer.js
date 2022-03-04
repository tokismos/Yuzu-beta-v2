//C'est ici où on s'occupe des notifications en rouge qui s'affichent en bas dans la Bottom bar quand on crée la lsite
// de course. si c'est null c'a s'affiche pas sinon quand c'Est true ca s'affiche

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listNotification: null,
  cuisineNotification: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setListNotification: (state, action) => {
      state.listNotification = action.payload;
    },
    setCuisineNotification: (state, action) => {
      state.cuisineNotification = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setListNotification, setCuisineNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
