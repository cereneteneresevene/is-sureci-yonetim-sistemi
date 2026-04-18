import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5294/api'
});

export const getGorevler = () => API.get('/Gorev');
export const getGorev = (id) => API.get(`/Gorev/${id}`);
export const createGorev = (data) => API.post('/Gorev', data);
export const deleteGorev = (id) => API.delete(`/Gorev/${id}`);
export const updateGorev = (id, data) => API.put(`/Gorev/${id}`, data);