'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchComputers = createAsyncThunk(
  'computer/fetchComputers',
  async (thunkAPI) => {
    const response = await axios.get(`http://localhost:8000/computers`);
    return response.data
  }
)

interface computer {
    "id": number,
    "name": string,
    "cpu": string,
    "gpu": string,
    "ram": string,
    "attribued_to": string
}

export interface ComputerSlice {
  computers : computer[],
}

const initialState: ComputerSlice = {
  computers : [],
}

export const computerSlice = createSlice({
    name: 'computer',
    initialState,
    reducers: {
      
    },
    extraReducers(builder) {
      builder.addCase(fetchComputers.fulfilled, (state, action) => {
        state.computers = action.payload;
      })
    },
})

export const { } = computerSlice.actions;

export default computerSlice.reducer;