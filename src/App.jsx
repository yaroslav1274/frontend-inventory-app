import { Routes, Route } from 'react-router-dom';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="container mx-auto px-4 py-8">
        <Routes>
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