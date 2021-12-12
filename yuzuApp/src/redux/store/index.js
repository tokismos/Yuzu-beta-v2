import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../slicer/recipeSlicer";
import matchesReducer from "../slicer/MatchSlicer";
import userReducer from "../slicer/userSlicer";

export const store = configureStore({
  reducer: {
    matchStore: matchesReducer,
    recipeStore: recipeReducer,
    userStore: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const createDebugger = require("redux-flipper").default;

    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(createDebugger());
  },
});
