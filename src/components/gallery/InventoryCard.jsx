export default function InventoryCard({ item, isFavorite, onToggleFavorite, onClick }) {
  return (
    <div 
      onClick={() => onClick(item)}
      className="group relative bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-green-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-green-500/10 flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-950 flex items-center justify-center">
        {item.photoUrl ? (
          <img 
            src={item.photoUrl} 
            alt={item.inventory_name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        ) : (
          <svg className="w-12 h-12 text-neutral-700 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(item);
        }}
        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 z-10 ${
          isFavorite 
            ? 'bg-neutral-900/80 text-red-500 hover:bg-neutral-900' 
            : 'bg-neutral-900/50 text-neutral-400 hover:text-red-400 hover:bg-neutral-900/80'
        }`}
        aria-label="Додати в улюблені"
      >
        <svg 
          className="w-5 h-5 transition-transform active:scale-75" 
          fill={isFavorite ? "currentColor" : "none"} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isFavorite ? (
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          )}
        </svg>
      </button>

      <div className="p-4 mt-auto">
        <h3 className="text-lg font-medium text-neutral-200 truncate group-hover:text-green-400 transition-colors">
          {item.inventory_name}
        </h3>
      </div>
    </div>
  );
}