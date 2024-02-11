import { createSlice } from "@reduxjs/toolkit";

export interface PostButtonsState {
  updateActive: boolean;
}

const initialState: PostButtonsState = {
  updateActive: false,
};

export const postButtonsSlice = createSlice({
  name: "Post Buttons",
  initialState,
  reducers: {
    toggle: (state) => {
      state.updateActive = !state.updateActive;
    },
  },
});

export const { toggle } = postButtonsSlice.actions;

export default postButtonsSlice.reducer;
