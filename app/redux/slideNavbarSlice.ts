import { createSlice } from "@reduxjs/toolkit";

export interface SlideNavState {
  isOpen: boolean;
}

const initialState: SlideNavState = {
  isOpen: false,
};

export const slideNavSlice = createSlice({
  name: "Slide Navbar",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    setToFalse: (state) => {
      state.isOpen = false;
    },
    setToTrue: (state) => {
      state.isOpen = true;
    },
  },
});

export const { toggle, setToFalse, setToTrue } = slideNavSlice.actions;

export default slideNavSlice.reducer;
