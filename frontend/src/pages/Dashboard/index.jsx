import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import PassengerDashboard from './PassengerDashboard';
import CompanyDashboard from './CompanyDashboard';
// import AdminDashboard from './AdminDashboard'; // For government scope if implemented

const DashboardLayout = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-brand-dark font-bold text-xl">Loading...</div>;
  }

  // Protect Route
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex">
      {/* Sidebar (Mocked for layout) */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Menu</p>
          <nav className="space-y-2">
            <a href="#" className="block px-4 py-2 rounded-xl bg-brand-light text-brand-blue font-bold">
              Overview
            </a>
            <a href="#" className="block px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 font-semibold transition-colors">
              Tickets
            </a>
            {user.role === 'company_admin' && (
              <>
                <a href="#" className="block px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 font-semibold transition-colors">
                  Fleet Management
                </a>
                <a href="#" className="block px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 font-semibold transition-colors">
                  Schedules
                </a>
                <a href="#" className="block px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 font-semibold transition-colors">
                  Analytics
                </a>
              </>
            )}
            <a href="#" className="block px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 font-semibold transition-colors">
              Settings
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8">
        
        {/* Render Dashboard based on User Role */}
        {user.role === 'passenger' && <PassengerDashboard />}
        {user.role === 'company_admin' && <CompanyDashboard />}
        
        {/* Fallback for agent/government not full designed yet */}
        {(user.role === 'government' || user.role === 'agent') && (
           <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
             <h2 className="text-2xl font-bold mb-2 text-brand-dark">Portal Under Construction</h2>
             <p className="text-gray-500">The specific tools for {user.role}s are currently being built.</p>
           </div>
        )}

      </main>
    </div>
  );
};

export default DashboardLayout;
