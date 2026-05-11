import axios from 'axios';

const API_URL = 'http://localhost:5173/api'; 

const apiClient = axios.create({
  baseURL: API_URL,
});

export const inventoryApi = {
  getAll: () => apiClient.get('/inventory'),

  getById: (id) => apiClient.get(`/inventory/${id}`),

  create: (formData) => apiClient.post('/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  updateData: (id, data) => apiClient.put(`/inventory/${id}`, data, {
    headers: { 'Content-Type': 'application/json' }
  }),

  updatePhoto: (id, formData) => apiClient.put(`/inventory/${id}/photo`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  delete: (id) => apiClient.delete(`/inventory/${id}`)
};