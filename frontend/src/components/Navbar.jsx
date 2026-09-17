import { Link } from 'react-router-dom';
import { Bus, User, LogOut, Menu, X } from 'lucide-react';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-brand-blue text-white shadow-md z-50 h-16 flex items-center">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Bus className="h-6 w-6 text-brand-orange" />
          <span className="text-xl font-bold tracking-tight">MoveSmart</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-brand-orange transition-colors">Home</Link>
          <a href="#destinations" className="hover:text-brand-orange transition-colors">Destinations</a>
          <Link to="/track" className="hover:text-brand-orange transition-colors">Track Bus</Link>
          
          {user ? (
            <div className="flex items-center gap-4 ml-4">
              <Link to="/dashboard" className="text-white hover:text-brand-orange transition-colors">
                Dashboard
              </Link>
              <button 
                onClick={logout}
                className="flex items-center justify-center p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                title="Logout"
              >
                <LogOut className="h-4 w-4 text-white" />
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white px-5 py-2 rounded-full transition-all shadow-lg hover:shadow-orange-500/30"
            >
              <User className="h-4 w-4" />
              Sign In / Register
            </Link>
          )}
        </div>

        <button 
          className="md:hidden p-2 text-white hover:text-brand-orange transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-brand-blue border-t border-blue-800 shadow-xl flex flex-col px-4 py-4 gap-4 text-sm font-medium animate-fade-in z-50">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors w-full text-left">Home</Link>
          <a href="#destinations" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors w-full text-left">Destinations</a>
          <Link to="/track" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors w-full text-left">Track Bus</Link>
          <hr className="border-blue-800 my-2" />
          {user ? (
            <div className="flex flex-col gap-4">
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors">Dashboard</Link>
              <button 
                onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-2 text-red-300 hover:text-red-400 w-full text-left"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-600 text-white px-5 py-2.5 rounded-full transition-all shadow-lg text-center"
            >
              <User className="h-4 w-4" /> Sign In / Register
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
