import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import ConfirmModal from '../components/inventory/ConfirmModal';
import InventoryTable from '../components/inventory/InventoryTable';

export default function AdminInventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    
    try {
      await inventoryApi.delete(itemToDelete);
      setInventory(prev => prev.filter(item => item.id !== itemToDelete));
      console.log(`Елемент ${itemToDelete} видалено успішно`);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert('Не вдалося видалити елемент. Спробуйте ще раз.');
    }
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
        <InventoryTable inventory={inventory} onDeleteClick={handleDeleteClick} />
      )}
      <ConfirmModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Видалення інвентарю"
        message="Ви дійсно хочете видалити цей товар зі складу?"
      />
    </div>
  );
}