import { useState, useContext } from 'react';
import { User, Mail, Phone, Lock, Save, Trash2 } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const ProfileSettings = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Simulate API update call
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-dark">Profile Settings</h2>
        <p className="text-gray-500 mt-1">Manage your account details and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Avatar & Quick Info */}
        <div className="col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-brand-orange to-orange-400 rounded-full flex items-center justify-center text-white text-3xl font-black mb-4 shadow-lg shadow-orange-500/30 border-4 border-white">
              {user?.name?.charAt(0) || 'P'}
            </div>
            <h3 className="font-bold text-xl text-gray-900">{user?.name || 'Passenger Name'}</h3>
            <p className="text-sm text-gray-500 mb-6">{user?.email || 'passenger@example.com'}</p>
            
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="w-full bg-brand-light hover:bg-gray-200 text-brand-dark font-semibold py-2 rounded-xl transition-colors text-sm border border-gray-200"
            >
              {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </button>
          </div>

          <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
            <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
              <Trash2 className="w-4 h-4" /> Danger Zone
            </h4>
            <p className="text-xs text-red-600 mb-4 leading-relaxed">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="w-full bg-white border border-red-200 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 font-semibold py-2 rounded-xl transition-colors text-sm">
              Delete Account
            </button>
          </div>
        </div>

        {/* Right Side: Forms */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          
          {/* Personal Information */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-brand-dark border-b border-gray-100 pb-4 mb-6">Personal Information</h3>
            
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                      type="text" 
                      name="name"
                      disabled={!isEditing}
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/30 focus:bg-white outline-none transition-all disabled:opacity-60 disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                      type="tel" 
                      name="phone"
                      disabled={!isEditing}
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/30 focus:bg-white outline-none transition-all disabled:opacity-60 disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input 
                    type="email" 
                    name="email"
                    disabled={!isEditing}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/30 focus:bg-white outline-none transition-all disabled:opacity-60 disabled:bg-gray-100"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="pt-4 flex justify-end">
                  <button type="submit" className="bg-brand-orange hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg transition-colors flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Security */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-brand-dark border-b border-gray-100 pb-4 mb-6">Security</h3>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-200">
                  <Lock className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Password</h4>
                  <p className="text-xs text-gray-500">Last changed 3 months ago</p>
                </div>
              </div>
              <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold px-4 py-2 rounded-lg text-sm transition-colors shadow-sm">
                Change Password
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
