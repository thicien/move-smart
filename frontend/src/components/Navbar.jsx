import { Link } from 'react-router-dom';
import { Bus, User, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-brand-blue text-white shadow-md z-50 h-16 flex items-center">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Bus className="h-6 w-6 text-brand-orange" />
          <span className="text-xl font-bold tracking-tight">MoveSmart</span>
        </Link>
        
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-brand-orange transition-colors">Home</Link>
          <a href="#destinations" className="hover:text-brand-orange transition-colors">Destinations</a>
          <Link to="/track" className="hover:text-brand-orange transition-colors">Track Bus</Link>
          
          {user ? (
            <div className="flex items-center gap-4 ml-4">
              <Link to="/dashboard" className="text-white hover:text-brand-orange transition-colors hidden sm:block">
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
      </div>
    </nav>
  );
};

export default Navbar;
