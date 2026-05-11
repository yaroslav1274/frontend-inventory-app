import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';

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

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center min-h-[300px] h-full">
            {item.photoUrl ? (
              <img 
                src={item.photoUrl} 
                alt={item.inventory_name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-6">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span className="text-gray-400 text-sm">Зображення відсутнє</span>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col">
          <div className="mb-6">
            <h2 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-1">Назва інвентарю</h2>
            <p className="text-xl font-medium text-gray-900">{item.inventory_name}</p>
          </div>

          <div className="mb-6 flex-grow">
            <h2 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-1">Опис</h2>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-100 min-h-[120px] h-full">
              {item.description ? (
                <p className="text-gray-700 whitespace-pre-wrap">{item.description}</p>
              ) : (
                <p className="text-gray-400 italic">Опис відсутній</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}