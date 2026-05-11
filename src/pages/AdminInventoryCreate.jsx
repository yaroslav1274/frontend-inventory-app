import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';

export default function AdminInventoryCreate() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    inventory_name: '',
    description: '',
    photo: null,
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, photo: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.inventory_name.trim()) {
      setValidationErrors({ inventory_name: "Назва інвентарю є обов'язковою" });
      return;
    }

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
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Додати нову позицію</h1>
        <Link to="/admin" className="text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium">
          &larr; Назад до списку
        </Link>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="inventory_name" className="block text-sm font-medium text-gray-700 mb-1">
            Назва інвентарю <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="inventory_name"
            name="inventory_name"
            value={formData.inventory_name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none transition-colors ${
              validationErrors.inventory_name 
                ? 'border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
            }`}
            placeholder="Введіть назву..."
          />
          {validationErrors.inventory_name && (
            <p className="mt-1 text-sm text-red-500">{validationErrors.inventory_name}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Опис
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
            placeholder="Додайте детальний опис інвентарю..."
          ></textarea>
        </div>

        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
            Фотографія (файл)
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
          />
          {formData.photo && (
            <p className="mt-2 text-sm text-green-600">
              Вибрано файл: {formData.photo.name}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
          <Link
            to="/admin"
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Скасувати
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-5 py-2.5 text-sm font-medium text-white rounded-md transition-colors shadow-sm flex items-center ${
              isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Збереження...
              </>
            ) : (
              'Зберегти позицію'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}