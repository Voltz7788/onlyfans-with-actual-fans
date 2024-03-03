import { createSlice } from "@reduxjs/toolkit";

export interface UploadMediaModalState {
  isOpen: boolean;
  filesToBeUploaded: File[];
}

const initialState: UploadMediaModalState = {
  isOpen: false,
  filesToBeUploaded: [],
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
    addFilesToBeUploaded: (state, action) => {
      state.filesToBeUploaded = action.payload;
    },
    clearFilesToBeUploaded: (state) => {
      state.filesToBeUploaded = [];
    },
  },
});

export const {
  toggle,
  setToFalse,
  addFilesToBeUploaded,
  clearFilesToBeUploaded,
} = uploadMediaModalSlice.actions;

export default uploadMediaModalSlice.reducer;
