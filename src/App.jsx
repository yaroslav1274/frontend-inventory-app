import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';
import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';

function App() {
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 font-sans selection:bg-green-500/30 selection:text-green-200">
      
      <header className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center font-bold text-neutral-950">
              I
            </div>
            <span className="text-xl font-bold text-neutral-100 tracking-tight">Inventory<span className="text-green-500">Pro</span></span>
          </div>
          
          <nav className="flex space-x-1 sm:space-x-4">
            <Link 
              to="/gallery" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/gallery') ? 'bg-neutral-800 text-green-400' : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50'}`}
            >
              Галерея
            </Link>
            <Link 
              to="/favorites" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/favorites') ? 'bg-neutral-800 text-green-400' : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50'}`}
            >
              Улюблені
            </Link>
            <div className="w-px h-6 bg-neutral-700 my-auto mx-2 hidden sm:block"></div>
            <Link 
              to="/admin" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hidden sm:block ${isActive('/admin') ? 'bg-green-500/10 text-green-500' : 'text-neutral-400 hover:text-green-400'}`}
            >
              Адмін-панель
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/gallery" replace />} />
          
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/favorites" element={<Favorites />} />

          <Route path="/admin" element={<AdminInventory />} />
          <Route path="/admin/create" element={<AdminInventoryCreate />} />
          <Route path="/admin/edit/:id" element={<AdminInventoryEdit />} />
          <Route path="/admin/details/:id" element={<AdminInventoryDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;