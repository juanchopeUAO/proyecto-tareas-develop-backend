import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(window.localStorage.getItem("user")) || null,
  token: window.localStorage.getItem("token") || null,
  isAuthenticating: !!window.localStorage.getItem("token"),
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticating = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailed: (state, action) => {
      state.isAuthenticating = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, loginFailed } =
  authSlice.actions;
