import { useContext, useState } from 'react';
import { 
  Bus, LayoutDashboard, Ticket, MapPin, 
  Bell, History, User, LogOut, Menu, X, Search 
} from 'lucide-react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PassengerLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Book Ticket', icon: Ticket, path: '/book' },
    { name: 'My Tickets', icon: Ticket, path: '/tickets' },
    { name: 'Live Tracking', icon: Location, path: '/tracking' },
    { name: 'Notifications', icon: Bell, path: '/notifications' },
    { name: 'Booking History', icon: History, path: '/history' },
    { name: 'Profile Settings', icon: User, path: '/profile' },
  ];

  return (
    <div className="flex h-screen bg-brand-light overflow-hidden font-sans text-brand-dark">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-30 flex flex-col 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 bg-brand-blue text-white shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <Bus className="h-6 w-6 text-brand-orange" />
            <span className="text-xl font-bold tracking-tight">MoveSmart</span>
          </Link>
          <button 
            className="ml-auto md:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Info (Mobile Optional but good for context) */}
        <div className="p-6 border-b border-gray-100 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-lg">
            {user?.name?.charAt(0) || 'P'}
          </div>
          <div className="overflow-hidden">
            <h3 className="font-bold text-sm truncate text-gray-800">{user?.name || 'Passenger'}</h3>
            <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-colors
                ${isActive 
                  ? 'bg-brand-blue text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-brand-orange'
                }
              `}
              onClick={() => setSidebarOpen(false)}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-100 shrink-0">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-red-50 hover:text-brand-red w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 md:px-8 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-64 focus-within:ring-2 focus-within:ring-brand-blue/30 focus-within:bg-white transition-all">
              <Search className="text-gray-400 w-4 h-4 mr-2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-400"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-brand-blue hover:bg-gray-50 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-2 w-2 h-2 bg-brand-orange rounded-full"></span>
            </button>
            <Link to="/profile" className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-full transition-colors">
              <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-sm shadow-inner">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </Link>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-brand-light p-4 md:p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default PassengerLayout;
