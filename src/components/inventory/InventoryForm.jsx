import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function InventoryForm({ 
  initialData, 
  onSubmit, 
  isSubmitting, 
  submitButtonText = "Зберегти",
  showPhotoField = true,
  cancelLink = "/admin"
}) {
  const [formData, setFormData] = useState({
    inventory_name: '',
    description: '',
    photo: null,
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(prev => ({
        ...prev,
        inventory_name: initialData.inventory_name || '',
        description: initialData.description || ''
      }));
    }
  }, [initialData]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.inventory_name.trim()) {
      setValidationErrors({ inventory_name: "Назва інвентарю є обов'язковою" });
      return;
    }

    onSubmit(formData);
  };

  return (
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

      {showPhotoField && (
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
      )}

      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
        <Link
          to={cancelLink}
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
          {isSubmitting ? 'Обробка...' : submitButtonText}
        </button>
      </div>
    </form>
  );
}