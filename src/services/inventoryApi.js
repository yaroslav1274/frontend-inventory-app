let localDatabase = [
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
];

export const inventoryApi = {
  getAll: () => {
    return Promise.resolve({ data: [...localDatabase] });
  },

  getById: (id) => {
    const item = localDatabase.find(i => i.id === parseInt(id));
    if (item) return Promise.resolve({ data: item });
    return Promise.reject(new Error('Не знайдено'));
  },

  create: (formData) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newItem = {
          id: Date.now(),
          inventory_name: formData.get('inventory_name'),
          description: formData.get('description'),
          photoUrl: formData.get('photo') ? URL.createObjectURL(formData.get('photo')) : ''
        };
        
        localDatabase.push(newItem);
        resolve({ data: { message: "Позицію успішно створено", id: newItem.id } });
      }, 500);
    });
  },

  updateData: (id, data) => {
    const index = localDatabase.findIndex(i => i.id === parseInt(id));
    if (index !== -1) {
      localDatabase[index] = { ...localDatabase[index], ...data };
      return Promise.resolve({ data: { message: "Текст оновлено" } });
    }
    return Promise.reject(new Error('Не знайдено'));
  },

  updatePhoto: (id, formData) => {
    const index = localDatabase.findIndex(i => i.id === parseInt(id));
    if (index !== -1 && formData.get('photo')) {
      localDatabase[index].photoUrl = URL.createObjectURL(formData.get('photo'));
      return Promise.resolve({ data: { message: "Фото оновлено" } });
    }
    return Promise.reject(new Error('Не знайдено'));
  },

  delete: (id) => {
    localDatabase = localDatabase.filter(i => i.id !== parseInt(id));
    return Promise.resolve({ data: { message: "Видалено" } });
  }
};