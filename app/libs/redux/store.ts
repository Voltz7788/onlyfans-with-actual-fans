import { configureStore } from "@reduxjs/toolkit";
import slideNavbarReducer from "../redux/slideNavbarSlice";
import postButtonsReducer from "../redux/postButtonsSlice";

export const store = configureStore({
  reducer: {
    slideNavbar: slideNavbarReducer,
    postButtons: postButtonsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
