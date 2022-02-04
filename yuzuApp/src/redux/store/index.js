import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../slicer/recipeSlicer";
import matchesReducer from "../slicer/MatchSlicer";
import userReducer from "../slicer/userSlicer";
import notificationReducer from "../slicer/notificationSlicer";
import favoritesReducer from "../slicer/favoritesSlicer";

export const store = configureStore({
  reducer: {
    matchStore: matchesReducer,
    recipeStore: recipeReducer,
    userStore: userReducer,
    notificationStore: notificationReducer,
    favoritesStore: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const createDebugger = require("redux-flipper").default;

    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(createDebugger());
  },
});
