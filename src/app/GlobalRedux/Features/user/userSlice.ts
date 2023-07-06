'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserForm {
  "firstname": string,
  "lastname": string,
  "date": string,
}

interface user {
    "id": number,
    "firstname": string,
    "lastname": string,
    "birth_date": string,
}

export interface ComputerSlice {
  users : user[],
  showModal: boolean
  userForm: UserForm
}

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (thunkAPI) => {
    const response = await axios.get(`http://localhost:8000/users`);
    return response.data
  }
)

export const addUser = createAsyncThunk(
  'user/addUser',
  async (user: UserForm, thunkAPI) => {
    const response = await axios.post(`http://localhost:8000/users/add`, user);
    return response.data
  }
)

const initialState: ComputerSlice = {
  users : [],
  showModal: false,
  userForm: {
    firstname: "",
    lastname: "",
    date: ""
  }
}

export const computerSlice = createSlice({
    name: 'computer',
    initialState,
    reducers: {
      toggleModal: (state) => {
        state.showModal = !state.showModal
      },
      setFormUser: (state, action) => {
        state.userForm[action.payload.name as keyof UserForm] = action.payload.value;
      },
    },
    extraReducers(builder) {
      builder
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.users = action.payload
        })
        .addCase(addUser.fulfilled, (state, action) => {
          state.users.push(action.payload)
          state.showModal = !state.showModal
        })
    },
})

export const { toggleModal, setFormUser } = computerSlice.actions;

export default computerSlice.reducer;