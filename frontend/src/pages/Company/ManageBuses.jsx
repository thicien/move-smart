import { useState, useEffect, useRef } from 'react';
import { Bus, Plus, Search, Filter, Edit2, Trash2, Eye, ShieldCheck, Wrench, Upload } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ManageBuses = () => {
  const { user } = useAuth();
  const [view, setView] = useState('list'); // 'list' | 'add' | 'edit'
  const [searchTerm, setSearchTerm] = useState('');
  
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    id: null,
    license_plate: '',
    capacity: 30,
    route_id: '',
    seat_price: '',
    driver_name: '',
    driver_phone: '',
    image: null,
    status: 'active'
  });
  
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    fetchBuses();
    fetchRoutes();
  }, []);

  const fetchBuses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://127.0.0.1:5000/api/companies/${user.id}/buses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBuses(res.data);
    } catch (error) {
      console.error('Failed to fetch buses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoutes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://127.0.0.1:5000/api/admin/routes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRoutes(res.data);
    } catch (error) {
      console.error('Failed to fetch routes:', error);
    }
  };

  // Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Live price validation
    if (name === 'seat_price' || name === 'route_id') {
      const rId = name === 'route_id' ? value : formData.route_id;
      const sPrice = name === 'seat_price' ? parseFloat(value) : parseFloat(formData.seat_price);
      
      const selectedRoute = routes.find(r => r.id.toString() === rId.toString());
      if (selectedRoute && selectedRoute.max_fare > 0 && sPrice > selectedRoute.max_fare) {
        setValidationError(`Price exceeds Gov limit of ${selectedRoute.max_fare} RWF!`);
      } else {
        setValidationError('');
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveBus = async (e) => {
    e.preventDefault();
    if (validationError) {
      alert("Cannot save: " + validationError);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const submitData = new FormData();
      submitData.append('company_id', user.id);
      submitData.append('license_plate', formData.license_plate);
      submitData.append('capacity', formData.capacity);
      submitData.append('route_id', formData.route_id);
      submitData.append('seat_price', formData.seat_price);
      submitData.append('driver_name', formData.driver_name);
      submitData.append('driver_phone', formData.driver_phone);
      submitData.append('status', formData.status);
      if (formData.image instanceof File) {
        submitData.append('image', formData.image);
      }

      if (view === 'edit') {
        await axios.put(`http://127.0.0.1:5000/api/companies/buses/${formData.id}`, submitData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post('http://127.0.0.1:5000/api/companies/buses', submitData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      
      setView('list');
      fetchBuses();
      resetForm();
    } catch (error) {
       console.error('Failed to save bus:', error);
       alert(error.response?.data?.message || 'Failed to save bus');
    }
  };

  const handleDeleteBus = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this bus?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://127.0.0.1:5000/api/companies/buses/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchBuses();
      } catch (error) {
        console.error('Failed to delete bus:', error);
      }
    }
  };

  const openEdit = (bus) => {
    setFormData({
      id: bus.id,
      license_plate: bus.license_plate,
      capacity: bus.capacity,
      route_id: bus.route_id || '',
      seat_price: bus.seat_price || '',
      driver_name: bus.driver_name || '',
      driver_phone: bus.driver_phone || '',
      status: bus.status,
      image: bus.image_url
    });
    setPreviewImage(bus.image_url ? `http://127.0.0.1:5000${bus.image_url}` : null);
    setValidationError('');
    setView('edit');
  };

  const resetForm = () => {
    setFormData({ id: null, license_plate: '', capacity: 30, route_id: '', seat_price: '', driver_name: '', driver_phone: '', image: null, status: 'active' });
    setPreviewImage(null);
    setValidationError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const renderList = () => (
    <div className="space-y-6 animate-fade-in">
      {/* List Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Fleet Management</h2>
          <p className="text-gray-500 text-sm mt-1">Monitor and configure your active operation vehicles.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by plate or number..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/30 outline-none text-sm w-full md:w-64"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors text-sm font-semibold shadow-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button 
            onClick={() => { resetForm(); setView('add'); }}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" /> Add New Bus
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Bus Info</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type & Seats</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Driver</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Current Route</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                 <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500 font-medium">Loading buses...</td>
                 </tr>
              ) : buses.filter(b => b.license_plate.toLowerCase().includes(searchTerm.toLowerCase())).map((bus) => (
                <tr key={bus.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {bus.image_url ? (
                        <img src={`http://127.0.0.1:5000${bus.image_url}`} alt="Bus" className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100">
                          <Bus className="w-6 h-6" />
                        </div>
                      )}
                      <div>
                        <div className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded border border-slate-200">{bus.license_plate}</div>
                        <div className="text-xs text-slate-500 mt-1">ID: #{bus.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-700">{bus.capacity} Seats</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">{(bus.seat_price || 0).toLocaleString()} RWF / Seat</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-500">{bus.driver_name || 'Unassigned'}</div>
                    {bus.driver_phone && <div className="text-xs text-slate-400 mt-0.5">{bus.driver_phone}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-700">{bus.Route ? bus.Route.name : 'Unassigned'}</div>
                    {bus.Route && <div className="text-xs text-slate-500 font-mono">{bus.Route.code}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold
                      ${bus.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}
                    `}>
                      {bus.status === 'active' ? <ShieldCheck className="w-3.5 h-3.5" /> : <Wrench className="w-3.5 h-3.5" />}
                      {bus.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(bus)} className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteBus(bus.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {buses.length === 0 && !loading && (
            <div className="p-12 text-center text-slate-500">
              No buses found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAddForm = () => (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
        <button 
          onClick={() => setView('list')}
          className="text-slate-500 hover:text-slate-800 font-medium text-sm flex items-center gap-1 transition-colors"
        >
          ← Back to Fleet
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{view === 'edit' ? 'Edit Bus Specifications' : 'Register New Bus'}</h2>
          <p className="text-gray-500 text-sm mt-1">Configure vehicle details and physical upload imagery.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleSaveBus}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Image Upload spanning top */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bus Image / Photo</label>
              <div 
                 className={`border-2 border-dashed ${previewImage ? 'border-orange-500 bg-orange-50' : 'border-slate-300 bg-slate-50'} rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-50 transition-colors relative`}
                 onClick={() => fileInputRef.current?.click()}
              >
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="h-48 rounded-lg object-contain" />
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 mb-3 border border-slate-200">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-bold text-slate-700">Click to upload bus image</p>
                    <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 5MB</p>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">License Plate Number</label>
              <input type="text" name="license_plate" value={formData.license_plate} onChange={handleInputChange} required placeholder="e.g. RAD 123 B" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 text-slate-800 font-mono font-bold" />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Number of Seats</label>
              <input type="number" name="capacity" value={formData.capacity} onChange={handleInputChange} required min="10" max="100" placeholder="e.g. 30" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 text-slate-800" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                <span>Assigned Driver Name</span>
              </label>
              <input type="text" name="driver_name" value={formData.driver_name} onChange={handleInputChange} placeholder="e.g. John Bosco Nsengimana" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:bg-white outline-none transition-all text-slate-800 font-medium placeholder:text-slate-400" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                <span>Driver Phone Number</span>
              </label>
              <input type="text" name="driver_phone" value={formData.driver_phone} onChange={handleInputChange} placeholder="e.g. +250 788 123 456" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:bg-white outline-none transition-all text-slate-800 font-medium placeholder:text-slate-400" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Official Route</label>
              <select name="route_id" value={formData.route_id} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:bg-white outline-none transition-all text-slate-800 appearance-none">
                <option value="">-- No Assignment --</option>
                {routes.map(r => (
                  <option key={r.id} value={r.id}>{r.name} ({r.code}) - Max ${r.max_fare}RWF</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                <span>Price per Seat (RWF)</span>
                {validationError && <span className="text-red-500 animate-pulse">{validationError}</span>}
              </label>
              <input type="number" name="seat_price" value={formData.seat_price} onChange={handleInputChange} className={`w-full px-4 py-2.5 bg-slate-50 border ${validationError ? 'border-red-400 ring-2 ring-red-500/20' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:bg-white outline-none transition-all text-slate-800 font-bold`} />
              {formData.route_id && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <p className="text-xs font-bold text-blue-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Recommended Gov Bounds
                  </p>
                  <p className="text-sm text-blue-600 mt-1 font-medium">
                    {(() => {
                      const r = routes.find(r => r.id.toString() === formData.route_id.toString());
                      return r && r.max_fare > 0 ? `${r.min_fare} RWF - ${r.max_fare} RWF` : 'No bounds currently enforced for this route.';
                    })()}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Operating Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:bg-white outline-none transition-all text-slate-800 appearance-none">
                <option value="active">Active In Fleet</option>
                <option value="maintenance">Under Maintenance</option>
                <option value="inactive">Decommissioned / Inactive</option>
              </select>
            </div>

            <div className="space-y-1 md:col-span-2 pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button 
                type="button" 
                onClick={() => setView('list')}
                className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={!!validationError}
                className={`px-6 py-2.5 ${validationError ? 'bg-red-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'} text-white font-bold rounded-xl shadow-md transition-colors`}
              >
                {view === 'edit' ? 'Update Details' : 'Save & Register Bus'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {view === 'list' && renderList()}
      {view === 'add' || view === 'edit' ? renderAddForm() : null}
      {/* Details view could go here, omitting for brevity to keep the file focused on the main dual requirement */}
    </>
  );
};

export default ManageBuses;
