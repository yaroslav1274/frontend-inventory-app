import { useState, useEffect } from 'react';
import { inventoryApi } from '../services/inventoryApi';
import { useFavorites } from '../hooks/useFavorites';
import InventoryCard from '../components/gallery/InventoryCard';
import InventoryQuickView from '../components/gallery/InventoryQuickView';

export default function Gallery() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // eslint-disable-next-line no-unused-vars
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  
  // eslint-disable-next-line no-unused-vars
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await inventoryApi.getAll();
        setInventory(response.data || []);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Не вдалося завантажити інвентар.');
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchGallery();
  }, []);

  const SkeletonCard = () => (
    <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 animate-pulse h-full flex flex-col">
      <div className="aspect-square bg-neutral-800/50 w-full"></div>
      <div className="p-4 mt-auto">
        <div className="h-5 bg-neutral-800 rounded w-3/4"></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-100">Галерея інвентарю</h1>
        <p className="text-neutral-400 mt-2">Переглядайте та обирайте найкраще обладнання</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg text-center mb-8">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          [...Array(8)].map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)
        ) : inventory.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-neutral-900 rounded-xl border border-neutral-800 border-dashed">
            <p className="text-neutral-400">Галерея порожня.</p>
          </div>
        ) : (
          inventory.map((item) => (
            <InventoryCard 
              key={item.id} 
              item={item} 
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={toggleFavorite}
              onClick={(item) => setSelectedItem(item)} // Відкриваємо Quick View
            />
          ))
        )}
      </div>
      <InventoryQuickView 
        isOpen={!!selectedItem} 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </div>
  );
}