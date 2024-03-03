import { createSlice } from "@reduxjs/toolkit";

export interface UploadMediaModalState {
  isOpen: boolean;
  filesToBeUploaded: File | null;
}

const initialState: UploadMediaModalState = {
  isOpen: false,
  filesToBeUploaded: null,
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
    addFileToBeUploaded: (state, action) => {
      state.filesToBeUploaded = action.payload;
    },
    clearFilesToBeUploaded: (state) => {
      state.filesToBeUploaded = null;
    },
  },
});

export const {
  toggle,
  setToFalse,
  addFileToBeUploaded,
  clearFilesToBeUploaded,
} = uploadMediaModalSlice.actions;

export default uploadMediaModalSlice.reducer;
