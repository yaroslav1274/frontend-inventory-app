import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';

export default function AdminInventoryEdit() {
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [textData, setTextData] = useState({
    inventory_name: '',
    description: ''
  });
  const [isUpdatingText, setIsUpdatingText] = useState(false);
  const [textUpdateSuccess, setTextUpdateSuccess] = useState(false);

  const [photoFile, setPhotoFile] = useState(null);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState('');
  const [isUpdatingPhoto, setIsUpdatingPhoto] = useState(false);
  const [photoUpdateSuccess, setPhotoUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const response = await inventoryApi.getById(id);
        const item = response.data;
        
        setTextData({
          inventory_name: item.inventory_name || '',
          description: item.description || ''
        });
        setCurrentPhotoUrl(item.photoUrl || '');
        setError(null);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Не вдалося завантажити дані для редагування.');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setTextData(prev => ({ ...prev, [name]: value }));
    setTextUpdateSuccess(false); // Ховаємо повідомлення про успіх при нових змінах
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!textData.inventory_name.trim()) {
      alert("Назва інвентарю є обов'язковою!");
      return;
    }

    try {
      setIsUpdatingText(true);
      await inventoryApi.updateData(id, textData); 
      setTextUpdateSuccess(true);
      setTimeout(() => setTextUpdateSuccess(false), 3000);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Помилка оновлення текстових даних.");
    } finally {
      setIsUpdatingText(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    setPhotoUpdateSuccess(false);
  };

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    if (!photoFile) {
      alert("Будь ласка, виберіть новий файл зображення.");
      return;
    }

    try {
      setIsUpdatingPhoto(true);
      const formData = new FormData();
      formData.append('photo', photoFile);

      await inventoryApi.updatePhoto(id, formData);
      setPhotoUpdateSuccess(true);
      setPhotoFile(null);
      setCurrentPhotoUrl(URL.createObjectURL(photoFile));
      setTimeout(() => setPhotoUpdateSuccess(false), 3000);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Помилка оновлення фотографії.");
    } finally {
      setIsUpdatingPhoto(false);
      document.getElementById('photo-upload').value = "";
    }
  };

  if (loading) {
    return <div className="text-center py-10 animate-pulse text-gray-500">Завантаження даних...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-10 font-medium">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Редагування #{id}</h1>
        <Link to="/admin" className="text-gray-500 hover:text-gray-800 text-sm font-medium">&larr; Повернутися</Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Оновлення інформації</h2>
        <form onSubmit={handleTextSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Назва інвентарю *</label>
            <input
              type="text"
              name="inventory_name"
              value={textData.inventory_name}
              onChange={handleTextChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Опис</label>
            <textarea
              name="description"
              value={textData.description}
              onChange={handleTextChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
            ></textarea>
          </div>
          <div className="flex items-center justify-between pt-2">
            {textUpdateSuccess ? (
              <span className="text-green-600 text-sm font-medium">Дані успішно оновлено!</span>
            ) : <span></span>}
            <button
              type="submit"
              disabled={isUpdatingText}
              className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
            >
              {isUpdatingText ? 'Збереження...' : 'Зберегти текст'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Оновлення фотографії</h2>
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-1/3">
            <p className="text-sm font-medium text-gray-700 mb-2">Поточне фото:</p>
            <div className="bg-gray-100 rounded-md border border-gray-200 h-40 flex items-center justify-center overflow-hidden">
              {currentPhotoUrl ? (
                <img src={currentPhotoUrl} alt="Поточне" className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm text-gray-400">Фото відсутнє</span>
              )}
            </div>
          </div>

          <form onSubmit={handlePhotoSubmit} className="w-full md:w-2/3 flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Виберіть нове зображення</label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition-colors"
              />
            </div>
            
            <div className="flex items-center justify-between pt-2 mt-auto">
              {photoUpdateSuccess ? (
                <span className="text-green-600 text-sm font-medium">Фото успішно завантажено!</span>
              ) : <span></span>}
              <button
                type="submit"
                disabled={isUpdatingPhoto || !photoFile}
                className="px-5 py-2 bg-gray-800 text-white text-sm font-medium rounded-md hover:bg-gray-900 disabled:bg-gray-400 transition-colors"
              >
                {isUpdatingPhoto ? 'Завантаження...' : 'Завантажити фото'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}