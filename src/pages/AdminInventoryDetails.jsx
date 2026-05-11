import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import InventoryDetails from '../components/inventory/InventoryDetails';

export default function AdminInventoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        const response = await inventoryApi.getById(id);
        setItem(response.data);
        setError(null);
      } catch (err) {
        console.error("Помилка завантаження деталей:", err);
        setError("Не вдалося завантажити інформацію про інвентар. Можливо, його було видалено.");
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-500 font-medium animate-pulse">Завантаження деталей...</div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-lg text-center shadow-sm">
          <p className="mb-4 font-medium">{error || "Позицію не знайдено"}</p>
          <button 
            onClick={() => navigate('/admin')}
            className="px-5 py-2 bg-white border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            Повернутися до списку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Деталі інвентарю #{item.id}</h1>
        <div className="flex space-x-3">
          <Link 
            to="/admin" 
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            &larr; Назад
          </Link>
          <Link 
            to={`/admin/edit/${item.id}`} 
            className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-md hover:bg-amber-700 transition-colors shadow-sm"
          >
            Редагувати
          </Link>
        </div>
      </div>

      <InventoryDetails item={item} />
    </div>
  );
}