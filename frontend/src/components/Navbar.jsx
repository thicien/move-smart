import { Link } from 'react-router-dom';
import { Bus, User } from 'lucide-react';

const Navbar = () => {
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
          <a href="#track" className="hover:text-brand-orange transition-colors">Track Bus</a>
          
          <Link 
            to="/login" 
            className="flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white px-5 py-2 rounded-full transition-all shadow-lg hover:shadow-orange-500/30"
          >
            <User className="h-4 w-4" />
            Sign In / Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
