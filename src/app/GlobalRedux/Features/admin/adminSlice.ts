'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface FormLogin  {
  email: string,
  password: string,
}

interface FormSubscribe  {
  email: string,
  password: string,
  firstname: string,
  lastname: string,
}
  
export interface AdminSlice {
    formLogin: FormLogin,
    formSubscribe: FormSubscribe
    isConnected: boolean,
    message: string,
    administrator: {
      id: number | null,
      email: string,
      firstname: string,
      lastname: string,
      password: string,
    }
}

export const login = createAsyncThunk(
  'admin/login',
  async (administrator : FormLogin, thunkAPI) => {
    const response = await axios.post(`http://localhost:8000/administrator/login`, administrator);
    console.log(response.data)
    return response.data
  }
)

export const subscribe = createAsyncThunk(
  'admin/subscribe',
  async (administrator : FormSubscribe, thunkAPI) => {
    const response = await axios.post(`http://localhost:8000/administrator/subscribe`, administrator);
    return response.data
  }
)

const initialState: AdminSlice = {
    formLogin: {
      email: '',
      password: "",
    },
    formSubscribe: {
      email: '',
      password: "",
      firstname: "",
      lastname: "",
    },
    isConnected: false,
    message: '',
    administrator: {
      id: null,
      email: "",
      firstname: "",
      lastname: "",
      password: "",
    }
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
      setFormLogin: (state, action) => {
        state.formLogin[action.payload.name as keyof FormLogin] = action.payload.value;
      },
      setFormSubscribe: (state, action) => {
        state.formSubscribe[action.payload.name as keyof FormSubscribe] = action.payload.value;
      },
    },
    extraReducers(builder) {
      builder
        .addCase(login.fulfilled, (state, action) => {
          state.administrator = action.payload;
          state.isConnected = true;
        })
        .addCase(subscribe.fulfilled, (state, action) => {
          state.administrator = action.payload;
          state.isConnected = true;
        })
      
    },
})

export const { setFormLogin, setFormSubscribe } = adminSlice.actions;

export default adminSlice.reducer;