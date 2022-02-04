import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listNotification: false,
  cuisineNotification: false,
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
