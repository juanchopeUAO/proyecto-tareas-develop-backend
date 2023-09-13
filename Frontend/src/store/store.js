import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth/authSlice";
import { loadingSlice } from "./slices/loadingSlice";

export const store = configureStore({
  reducer: {
    user: authSlice.reducer,
    loading: loadingSlice.reducer,
  },
});
