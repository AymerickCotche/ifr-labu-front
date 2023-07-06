'use client';

import { configureStore } from '@reduxjs/toolkit';
import computerReducer from './Features/computer/computerSlice';
import userReducer from './Features/user/userSlice';
import adminReucer from './Features/admin/adminSlice';
import displayReducer from './Features/display/displaySlice';

export const store = configureStore({
    reducer: {
      computer: computerReducer,
      user: userReducer,
      admin: adminReucer,
      display: displayReducer

    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;