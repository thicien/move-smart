import { useContext, useState } from 'react';
import { 
  Bus, LayoutDashboard, Route as RouteIcon, Users, 
  Settings, LogOut, Menu, X, Search, Bell, Map, PieChart, Ticket,
  SidebarClose
} from 'lucide-react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CompanyLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard Overview', icon: LayoutDashboard, path: '/company/dashboard' },
    { name: 'Manage Buses', icon: Bus, path: '/company/buses' },
    { name: 'Routes & Schedules', icon: RouteIcon, path: '/company/routes' },
    { name: 'Bookings & Tickets', icon: Ticket, path: '/company/bookings' },
    { name: 'Fleet Tracking', icon: Map, path: '/company/tracking' },
    { name: 'Revenue & Reports', icon: PieChart, path: '/company/reports' },
    { name: 'Drivers Management', icon: Users, path: '/company/drivers' },
    { name: 'Notifications', icon: Bell, path: '/company/notifications' },
    { name: 'Company Settings', icon: Settings, path: '/company/settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside 
        className={`fixed xl:static inset-y-0 left-0 w-72 bg-slate-900 text-slate-300 shadow-2xl transform transition-transform duration-300 ease-in-out z-30 flex flex-col 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'}`}
      >
        <div className="h-16 flex items-center px-6 bg-slate-950 shrink-0 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-2">
            <Bus className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold tracking-tight text-white">MoveSmart</span>
            <span className="ml-2 text-xs font-semibold bg-orange-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">ERP</span>
          </Link>
          <button 
            className="ml-auto xl:hidden hover:text-white transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 border-b border-slate-800 flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white font-bold text-xl border border-slate-600 shadow-inner">
            {user?.name?.charAt(0) || 'C'}
          </div>
          <div className="overflow-hidden">
            <h3 className="font-bold text-sm text-white truncate">{user?.name || 'Transport Co.'}</h3>
            <p className="text-xs text-slate-400 truncate">Administrator Portal</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Management</p>
          {navLinks.map((link, index) => (
            <div key={link.name}>
              {index === 7 && <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-widest mt-6 mb-3">System</p>}
              <NavLink
                to={link.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all group
                  ${isActive 
                    ? 'bg-slate-800 text-white shadow-md border border-slate-700' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <link.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-orange-500' : 'text-slate-500 group-hover:text-slate-300'}`} />
                    {link.name}
                  </>
                )}
              </NavLink>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 shrink-0 bg-slate-900/50">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 w-full transition-colors group"
          >
            <LogOut className="w-5 h-5 text-slate-500 group-hover:text-red-400 transition-colors" />
            Secure Logout
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
        
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 xl:px-8 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              className="xl:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="hidden lg:flex items-center bg-slate-100 border border-transparent rounded-xl px-3 py-2 w-80 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500/50 focus-within:bg-white transition-all shadow-sm">
              <Search className="text-slate-400 w-4 h-4 mr-2" />
              <input 
                type="text" 
                placeholder="Search buses, routes, or ticket IDs..." 
                className="bg-transparent border-none outline-none w-full text-sm placeholder:text-slate-400 text-slate-700"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 xl:gap-5">
            <button className="relative p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-slate-700 leading-tight">{user?.name || 'Company Admin'}</p>
                <p className="text-xs text-slate-500 font-medium tracking-wide">Manager</p>
              </div>
              <Link to="/company/settings" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-sm shadow-md hover:ring-2 hover:ring-orange-500 hover:ring-offset-2 transition-all cursor-pointer border border-slate-700">
                {user?.name?.charAt(0) || 'C'}
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default CompanyLayout;
