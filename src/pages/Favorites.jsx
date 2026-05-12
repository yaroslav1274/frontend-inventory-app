import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import InventoryCard from '../components/gallery/InventoryCard';
import InventoryQuickView from '../components/gallery/InventoryQuickView';

export default function Favorites() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [selectedItem, setSelectedItem] = React.useState(null);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-100 flex items-center gap-3">
            Улюблені 
            <span className="bg-green-500/10 text-green-400 text-sm py-1 px-3 rounded-full font-medium border border-green-500/20">
              {favorites.length}
            </span>
          </h1>
          <p className="text-neutral-400 mt-2">Ваш персональний список збереженого інвентарю</p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-24 bg-neutral-900 rounded-2xl border border-neutral-800 border-dashed flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-neutral-950 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-neutral-200 mb-2">Список порожній</h3>
          <p className="text-neutral-400 max-w-md mx-auto mb-6">
            Ви ще не додали жодного інвентарю до улюблених. Перейдіть до галереї, щоб знайти щось цікаве.
          </p>
          <Link 
            to="/gallery" 
            className="bg-green-500 hover:bg-green-400 text-neutral-950 px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-green-500/20"
          >
            Перейти до Галереї
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((item) => (
            <InventoryCard 
              key={item.id} 
              item={item} 
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={toggleFavorite}
              onClick={(item) => setSelectedItem(item)}
            />
          ))}
        </div>
      )}

      <InventoryQuickView 
        isOpen={!!selectedItem} 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </div>
  );
}