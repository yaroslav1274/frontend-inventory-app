// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';

export default function InventoryQuickView({ isOpen, item, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-neutral-900 rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row border border-neutral-800 transform transition-all">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-full md:w-1/2 bg-neutral-950 flex items-center justify-center min-h-[300px] md:min-h-[400px]">
          {item.photoUrl ? (
            <img 
              src={item.photoUrl} 
              alt={item.inventory_name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center p-6">
              <svg className="w-16 h-16 mx-auto text-neutral-800 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span className="text-neutral-600 font-medium">Фото відсутнє</span>
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col">
          <div className="uppercase tracking-widest text-xs font-bold text-green-500 mb-2">
            Деталі інвентарю
          </div>
          <h2 className="text-3xl font-bold text-neutral-100 mb-6">
            {item.inventory_name}
          </h2>
          
          <div className="flex-grow">
            <h3 className="text-sm font-medium text-neutral-500 mb-2">Опис</h3>
            <p className="text-neutral-300 leading-relaxed bg-neutral-950/50 p-4 rounded-xl border border-neutral-800/50">
              {item.description || <span className="italic opacity-50">Опис відсутній...</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}