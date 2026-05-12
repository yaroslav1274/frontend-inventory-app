import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem('inventory_favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Помилка читання з localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('inventory_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item) => {
    setFavorites((prevFavorites) => {
      const isExist = prevFavorites.find((fav) => fav.id === item.id);
      if (isExist) {
        return prevFavorites.filter((fav) => fav.id !== item.id);
      }
      return [...prevFavorites, item];
    });
  };

  const isFavorite = (id) => {
    return favorites.some((fav) => fav.id === id);
  };

  return { favorites, toggleFavorite, isFavorite };
}