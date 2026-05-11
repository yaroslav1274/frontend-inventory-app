export default function InventoryDetails({ item }) {
  if (!item) return null;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2">
        <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center min-h-[300px] h-full">
          {item.photoUrl ? (
            <img 
              src={item.photoUrl} 
              alt={item.inventory_name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center p-6">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span className="text-gray-400 text-sm">Зображення відсутнє</span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col">
        <div className="mb-6">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-1">Назва інвентарю</h2>
          <p className="text-xl font-medium text-gray-900">{item.inventory_name}</p>
        </div>

        <div className="mb-6 flex-grow">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-1">Опис</h2>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-100 min-h-[120px] h-full">
            {item.description ? (
              <p className="text-gray-700 whitespace-pre-wrap">{item.description}</p>
            ) : (
              <p className="text-gray-400 italic">Опис відсутній</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}