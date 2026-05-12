import { Link } from 'react-router-dom';

export default function InventoryTable({ inventory, onDeleteClick }) {
  if (inventory.length === 0) {
    return (
      <div className="text-center py-16 bg-neutral-950 rounded-lg border border-dashed border-neutral-700">
        <p className="text-neutral-400 mb-2">На складі поки немає інвентарю.</p>
        <p className="text-sm text-neutral-500">Натисніть «Додати позицію», щоб створити перший запис.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-neutral-950 border-b border-neutral-800">
            <th className="p-4 font-semibold text-green-500 rounded-tl-lg">Фото</th>
            <th className="p-4 font-semibold text-green-500">Назва інвентарю</th>
            <th className="p-4 font-semibold text-green-500">Опис</th>
            <th className="p-4 font-semibold text-green-500 text-center rounded-tr-lg">Дії</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {inventory.map((item) => (
            <tr key={item.id} className="hover:bg-neutral-800/50 transition-colors">
              <td className="p-4">
                <div className="w-16 h-16 bg-neutral-950 border border-neutral-700 rounded overflow-hidden flex items-center justify-center">
                  {item.photoUrl ? (
                    <img src={item.photoUrl} alt={item.inventory_name} className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  )}
                </div>
              </td>
              <td className="p-4 font-medium text-neutral-200">{item.inventory_name}</td>
              <td className="p-4 text-neutral-400 text-sm max-w-xs truncate" title={item.description}>
                {item.description}
              </td>
              <td className="p-4">
                <div className="flex justify-center items-center space-x-3 text-sm">
                  <Link to={`/admin/details/${item.id}`} className="text-green-400 hover:text-green-300 font-medium transition-colors">
                    Переглянути
                  </Link>
                  <span className="text-neutral-700">|</span>
                  <Link to={`/admin/edit/${item.id}`} className="text-amber-500 hover:text-amber-400 font-medium transition-colors">
                    Редагувати
                  </Link>
                  <span className="text-neutral-700">|</span>
                  <button 
                    onClick={() => onDeleteClick(item.id)} 
                    className="text-red-500 hover:text-red-400 font-medium transition-colors"
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