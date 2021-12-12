import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessTokenFb: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("added user to redux");
      state.user = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessTokenFb = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setAccessToken } = userSlice.actions;

export default userSlice.reducer;
