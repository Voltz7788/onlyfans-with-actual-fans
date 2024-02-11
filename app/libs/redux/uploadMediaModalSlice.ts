import { createSlice } from "@reduxjs/toolkit";

export interface UploadMediaModalState {
  isOpen: boolean;
}

const initialState: UploadMediaModalState = {
  isOpen: false,
};

export const uploadMediaModalSlice = createSlice({
  name: "Upload Media Modal",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    setToFalse: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggle, setToFalse } = uploadMediaModalSlice.actions;

export default uploadMediaModalSlice.reducer;
