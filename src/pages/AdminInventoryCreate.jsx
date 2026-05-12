import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import InventoryForm from '../components/inventory/InventoryForm';

export default function AdminInventoryCreate() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const data = new FormData();
      data.append('inventory_name', formData.inventory_name);
      data.append('description', formData.description);
      if (formData.photo) {
        data.append('photo', formData.photo);
      }

      await inventoryApi.create(data);
      navigate('/admin');
    } catch (err) {
      console.error("Помилка створення:", err);
      setError("Не вдалося зберегти інвентар. Перевірте підключення до сервера.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-neutral-900 rounded-lg shadow-sm border border-neutral-800 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Додати нову позицію</h1>
        <Link to="/admin" className="text-neutral-400 hover:text-green-400 transition-colors text-sm font-medium">
          &larr; Назад до списку
        </Link>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <InventoryForm 
        onSubmit={handleCreateSubmit} 
        isSubmitting={isSubmitting} 
        submitButtonText="Зберегти позицію"
      />
    </div>
  );
}