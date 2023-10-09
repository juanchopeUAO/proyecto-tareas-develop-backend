import { api } from '../config/axios';

const BASE_URL = '/api/assignment';
const USER_ID = localStorage.getItem('userId');

export const assignmentsService = {
  getAll: async () => {
    const response = await api.get(`${BASE_URL}/user/${USER_ID}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post(BASE_URL, {
      ...data,
      userid: USER_ID,
      assignment: 'assignment',
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`${BASE_URL}/${id}`);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`${BASE_URL}/${id}`, data);
    return response.data;
  },
};
