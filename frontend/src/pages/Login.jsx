import { useState, useContext } from 'react';
import { Bus, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await login(email, password);
    
    if (result.success) {
      if (result.user.role === 'company_admin') {
        navigate('/company/dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-brand-light flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 border border-gray-100">
        
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-50 p-4 rounded-full mb-4">
            <Bus className="h-10 w-10 text-brand-blue" />
          </div>
          <h2 className="text-2xl font-bold text-brand-dark">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">Sign in to your MoveSmart account</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 text-brand-red p-3 rounded-lg text-sm border border-red-100 flex items-center gap-2">
            <span className="font-semibold">Error:</span> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yours@example.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue focus:bg-white outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <a href="#" className="text-xs text-brand-orange hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue focus:bg-white outline-none transition-all"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-orange-500/50 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-blue font-bold hover:underline">
            Register as Passenger
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400">
          <span>Agent Login</span> | <span>Company Portal</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
