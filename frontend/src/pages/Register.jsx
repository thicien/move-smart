import { useState, useContext } from 'react';
import { Bus, Mail, Lock, User, Phone, ArrowRight, Building, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'passenger',
    companyName: '',
    registrationNumber: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: formData.role,
      ...(formData.role === 'company_admin' && {
        companyName: formData.companyName,
        registrationNumber: formData.registrationNumber
      })
    });

    if (result.success) {
      // Typically, one might auto-login or redirect to login page.
      navigate('/login');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-brand-light flex items-center justify-center p-4 py-8">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 border border-gray-100">
        
        <div className="flex flex-col items-center mb-8">
          <div className="bg-orange-50 p-4 rounded-full mb-4">
            <User className="h-10 w-10 text-brand-orange" />
          </div>
          <h2 className="text-2xl font-bold text-brand-dark">Create an Account</h2>
          <p className="text-sm text-gray-500 mt-1">Join MoveSmart to book your tickets easily</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 text-brand-red p-3 rounded-lg text-sm border border-red-100 flex items-center gap-2">
            <span className="font-semibold">Error:</span> {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue focus:bg-white outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue focus:bg-white outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+250 7XX XXX XXX"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue focus:bg-white outline-none transition-all"
                />
              </div>
            </div>

            {/* Account Role */}
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Account Type</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select 
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue focus:bg-white outline-none transition-all appearance-none cursor-pointer text-gray-700"
                >
                  <option value="passenger">Passenger Account</option>
                  <option value="company_admin">Company Administrator</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Company Specific Fields */}
            {formData.role === 'company_admin' && (
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in mt-2 border-t border-gray-100 pt-5">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Company Name</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="text" 
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. MoveSmart Ltd"
                      className="w-full pl-10 pr-4 py-3 bg-orange-50/30 border border-orange-100 rounded-xl focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange focus:bg-white outline-none transition-all"
                      required={formData.role === 'company_admin'}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Registration Number (TIN)</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="text" 
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      placeholder="e.g. 108923485"
                      className="w-full pl-10 pr-4 py-3 bg-orange-50/30 border border-orange-100 rounded-xl focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange focus:bg-white outline-none transition-all"
                      required={formData.role === 'company_admin'}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue focus:bg-white outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Confirm</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue focus:bg-white outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full mt-4 bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-orange-500/50 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-blue font-bold hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
