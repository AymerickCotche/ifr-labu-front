'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface DisplaySlice {
  today: string,
  mobileMenu: boolean
}

const initialState: DisplaySlice = {
  today: '',
  mobileMenu: false,
}

export const displaySlice = createSlice({
    name: 'display',
    initialState,
    reducers: {
      setToday: (state, action) => {
        state.today = action.payload;
      },
      toggleMobileMenu: (state, action) => {
        state.mobileMenu = action.payload;
      },
    }
})

export const { setToday, toggleMobileMenu} = displaySlice.actions;

export default displaySlice.reducer;