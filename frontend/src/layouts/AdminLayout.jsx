import { useState, useContext } from 'react';
import { 
  Building2, LayoutDashboard, Route as RouteIcon, ShieldAlert,
  Settings, LogOut, Menu, X, Search, Bell, Map, PieChart, Landmark, FileText, DollarSign
} from 'lucide-react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'National Overview', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Route Management', icon: RouteIcon, path: '/admin/routes' },
    { name: 'Fare & Pricing Control', icon: DollarSign, path: '/admin/fares' },
    { name: 'Revenue & Tax Monitoring', icon: Landmark, path: '/admin/revenue' },
    { name: 'Company Performance', icon: Building2, path: '/admin/companies' },
    { name: 'Live Bus Tracking', icon: Map, path: '/admin/tracking' },
    { name: 'Delay & Violation', icon: ShieldAlert, path: '/admin/violations' },
    { name: 'Transport Analytics', icon: PieChart, path: '/admin/analytics' },
    { name: 'Reports & Exports', icon: FileText, path: '/admin/reports' },
    { name: 'System Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans text-slate-800">
      
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Government Formal Styling (Slate 900) */}
      <aside 
        className={`fixed xl:static inset-y-0 left-0 w-72 bg-slate-900 text-slate-300 shadow-2xl transform transition-transform duration-300 ease-in-out z-30 flex flex-col 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'}`}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 bg-slate-950 shrink-0 border-b border-slate-700">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-emerald-600 flex items-center justify-center shadow-sm">
               <ShieldAlert className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white leading-tight">National Transport</span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest leading-none">Regulator Panel</span>
            </div>
          </Link>
          <button 
            className="ml-auto xl:hidden text-slate-400 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-slate-700 flex items-center gap-4 shrink-0 bg-slate-900/50">
          <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400 font-bold text-xl border border-slate-600">
            {user?.name?.charAt(0) || 'G'}
          </div>
          <div className="overflow-hidden">
            <h3 className="font-bold text-sm text-white truncate">{user?.name || 'Gov Official'}</h3>
            <p className="text-xs text-emerald-500 font-medium truncate uppercase tracking-wider">System Admin</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Core Systems</p>
          {navLinks.map((link, index) => (
            <div key={link.name}>
              {index === 1 && <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-widest mt-6 mb-3">Core Authority</p>}
              {index === 5 && <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-widest mt-6 mb-3">Tracking & Compliance</p>}
              {index === 7 && <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-widest mt-6 mb-3">Data & Administration</p>}
              <NavLink
                to={link.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all group
                  ${isActive 
                    ? 'bg-slate-800 text-white shadow-inner border border-slate-700 border-l-4 border-l-emerald-500' 
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200 border border-transparent border-l-4'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <link.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-emerald-500' : 'text-slate-500 group-hover:text-slate-300'}`} />
                    <span className="text-sm">{link.name}</span>
                  </>
                )}
              </NavLink>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700 shrink-0 bg-slate-950">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 rounded-lg font-medium text-slate-400 hover:bg-red-900/30 hover:text-red-400 w-full transition-colors group border border-transparent hover:border-red-900/50"
          >
            <LogOut className="w-5 h-5 text-slate-500 group-hover:text-red-400 transition-colors" />
            Secure Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-100">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 xl:px-8 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              className="xl:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="hidden lg:flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-96 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all shadow-inner">
              <Search className="text-gray-400 w-4 h-4 mr-2" />
              <input 
                type="text" 
                placeholder="Search companies, routes, or license plates (National Database)..." 
                className="bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-400 text-gray-800"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 xl:gap-5">
            <button className="relative p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white animate-pulse"></span>
            </button>
            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-gray-800 leading-tight">{user?.name || 'Authorized Official'}</p>
                <p className="text-xs text-gray-500 font-medium tracking-wide">Dept. of Transport</p>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;
