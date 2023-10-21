/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(window.localStorage.getItem('user')) || null,
  token: window.localStorage.getItem('token') || null,
  isAuthenticating: !!window.localStorage.getItem('token'),
  userId: window.localStorage.getItem('userId') || null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticating = true;
      state.user = action.payload.user;
      state.token = action.payload.result;
      state.userId = action.payload.userId;
    },
    loginFailed: (state, action) => {
      state.isAuthenticating = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, loginFailed } = authSlice.actions;
