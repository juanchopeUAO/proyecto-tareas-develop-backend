import { api } from "../../../config/axios";

import { loginFailed, loginSuccess } from "./authSlice";
import { startLoading, stopLoading } from "../loadingSlice";

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await api.post("/user/login", { email, password });
      if (data.success) {
        window.localStorage.setItem("token", data.result);
        dispatch(loginSuccess(data));
      } else {
        dispatch(loginFailed(data.message));
      }
    } finally {
      dispatch(stopLoading());
    }
  };


