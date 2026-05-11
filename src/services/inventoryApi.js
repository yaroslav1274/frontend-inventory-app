import axios from 'axios';

const API_URL = 'http://localhost:5173/api'; 

const apiClient = axios.create({
  baseURL: API_URL,
});

export const inventoryApi = {
  getAll: () => {
    return Promise.resolve({
      data: [
        { 
          id: 1, 
          inventory_name: 'Офісне крісло', 
          description: 'Ергономічне крісло з підтримкою спини', 
          photoUrl: 'https://via.placeholder.com/150' 
        },
        { 
          id: 2, 
          inventory_name: 'Монітор Dell 27"', 
          description: '4K монітор для роботи з графікою та кодом', 
          photoUrl: 'https://via.placeholder.com/150' 
        },
        { 
          id: 3, 
          inventory_name: 'Механічна клавіатура', 
          description: 'Клавіатура на синіх світчах', 
          photoUrl: ''
        }
      ]
    });
  },

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