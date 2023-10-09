import { api } from '../../../config/axios';
import { loginFailed, loginSuccess } from './authSlice';
import { startLoading, stopLoading } from '../LoadingSlice';

export const login = ({ email, password }) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const { data } = await api.post('/user/login', { email, password });
    if (data.success) {
      window.localStorage.setItem('token', data.result);
      window.localStorage.setItem('userId', data.userId);
      dispatch(loginSuccess(data));
      window.location.reload();
    } else {
      dispatch(loginFailed(data.message));
      throw new Error(data.message);
    }
  } finally {
    dispatch(stopLoading());
  }
};
