import { Link } from 'react-router-dom';

export default function InventoryTable({ inventory, onDeleteClick }) {
  if (inventory.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <p className="text-gray-500 mb-2">На складі поки немає інвентарю.</p>
        <p className="text-sm text-gray-400">Натисніть «Додати позицію», щоб створити перший запис.</p>
      </div>
    );
  }

  return (
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
                    onClick={() => onDeleteClick(item.id)} 
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
  );
}