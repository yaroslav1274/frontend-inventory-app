import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';

export default function AdminInventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const response = await inventoryApi.getAll(); 
        setInventory(response.data || []);
        setError(null);
      } catch (err) {
        setError('Помилка при завантаженні інвентарю. Спробуйте пізніше.');
        console.error("Помилка завантаження:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const handleDeleteClick = (id) => {
    console.log("Клік по видаленню для ID:", id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-500 font-medium animate-pulse">Завантаження інвентарю...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Управління складом</h1>
        <Link 
          to="/admin/create" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-medium transition-colors shadow-sm"
        >
          + Додати позицію
        </Link>
      </div>

      {inventory.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500 mb-2">На складі поки немає інвентарю.</p>
          <p className="text-sm text-gray-400">Натисніть «Додати позицію», щоб створити перший запис.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-600 rounded-tl-lg">Фото</th>
                <th className="p-4 font-semibold text-gray-600">Назва інвентарю</th>
                <th className="p-4 font-semibold text-gray-600">Опис</th>
                <th className="p-4 font-semibold text-gray-600 text-center rounded-tr-lg">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded overflow-hidden flex items-center justify-center">
                      {item.photoUrl ? (
                        <img src={item.photoUrl} alt={item.inventory_name} className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-gray-900">{item.inventory_name}</td>
                  <td className="p-4 text-gray-600 text-sm max-w-xs truncate" title={item.description}>
                    {item.description}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center items-center space-x-3 text-sm">
                      <Link to={`/admin/details/${item.id}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                        Переглянути
                      </Link>
                      <span className="text-gray-300">|</span>
                      <Link to={`/admin/edit/${item.id}`} className="text-amber-600 hover:text-amber-800 font-medium transition-colors">
                        Редагувати
                      </Link>
                      <span className="text-gray-300">|</span>
                      <button 
                        onClick={() => handleDeleteClick(item.id)} 
                        className="text-red-600 hover:text-red-800 font-medium transition-colors"
                      >
                        Видалити
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}