import { useState, useEffect } from 'react';
import { Route as RouteIcon, Search, Calendar, MapPin, Clock, DollarSign, Plus, XCircle, Map, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const RoutesSchedules = () => {
  const { user } = useAuth();
  const [routes, setRoutes] = useState([]);
  const [buses, setBuses] = useState([]);
  const [schedules, setSchedules] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const [formData, setFormData] = useState({
    bus_id: '',
    driver_name: '',
    driver_phone: '',
    departure_time: '',
    arrival_time: '',
    price: '',
    available_seats: ''
  });

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch Official Routes
      const routesRes = await axios.get('http://127.0.0.1:5000/api/admin/routes', { headers });
      setRoutes(routesRes.data);

      // Fetch Company Buses
      const busesRes = await axios.get(`http://127.0.0.1:5000/api/companies/${user.id}/buses`, { headers });
      setBuses(busesRes.data);

      // Fetch Company Schedules
      const schedRes = await axios.get(`http://127.0.0.1:5000/api/companies/${user.id}/schedules`, { headers });
      setSchedules(schedRes.data);

    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const openScheduleModal = (route) => {
    setSelectedRoute(route);
    setFormData({
      bus_id: '',
      driver_name: '',
      driver_phone: '',
      departure_time: '',
      arrival_time: '',
      price: '',
      available_seats: ''
    });
    setIsModalOpen(true);
  };

  const handleBusSelection = (e) => {
    const busId = e.target.value;
    const selectedBus = buses.find(b => b.id.toString() === busId);
    if (selectedBus) {
      setFormData(prev => ({
        ...prev,
        bus_id: busId,
        driver_name: selectedBus.driver_name || '',
        driver_phone: selectedBus.driver_phone || '',
        price: selectedBus.seat_price || '',
        available_seats: selectedBus.capacity || ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        bus_id: '',
        driver_name: '',
        driver_phone: '',
        price: '',
        available_seats: ''
      }));
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveSchedule = async (e) => {
    e.preventDefault();
    if (!formData.bus_id || !formData.departure_time || !formData.arrival_time) {
      alert("Please fill in all required fields (Bus, Departure, Arrival)");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://127.0.0.1:5000/api/companies/schedules', {
        ...formData,
        route_id: selectedRoute.id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setIsModalOpen(false);
      fetchData(); // Refresh to show new schedule
    } catch (error) {
       console.error('Failed to save schedule:', error);
       alert(error.response?.data?.message || 'Failed to save schedule');
    }
  };

  // Helper to find how many schedules exist for a route
  const getSchedulesForRoute = (routeId) => {
    return schedules.filter(s => s.route_id === routeId);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pb-5 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <RouteIcon className="w-6 h-6 text-indigo-600" /> Dispatch & Scheduling
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">View official routes and dispatch available buses for trips.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by route code, origin, or destination..." 
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-widest">
                <th className="px-6 py-4 font-black">Route Code & Name</th>
                <th className="px-6 py-4 font-black">Path Details</th>
                <th className="px-6 py-4 font-black">Metrics</th>
                <th className="px-6 py-4 font-black">Schedules</th>
                <th className="px-6 py-4 font-black text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500 font-medium">
                    Loading routes and schedules...
                  </td>
                </tr>
              ) : routes.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.code.toLowerCase().includes(searchTerm.toLowerCase())).map((route) => {
                const count = getSchedulesForRoute(route.id).length;
                return (
                <tr key={route.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-100 shrink-0">
                        <Map className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{route.name}</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{route.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <span className="text-slate-900 font-bold">{route.origin}</span>
                      <MapPin className="w-3 h-3 text-emerald-500" />
                      <span className="text-slate-900 font-bold">{route.destination}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Dist: <span className="text-slate-900">{route.distance || '0'} km</span></p>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Est: <span className="text-slate-900">{route.estimated_duration || '0'} mins</span></p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {count} Active Trips
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => openScheduleModal(route)} 
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors text-xs flex items-center gap-2 ml-auto"
                    >
                      <Calendar className="w-3.5 h-3.5" /> Schedule Trip
                    </button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
          {routes.length === 0 && !loading && (
             <div className="p-12 text-center text-slate-500 font-medium border-t border-slate-200">
               No routes exist in the system yet.
             </div>
          )}
        </div>
      </div>

      {/* Rendering Active Schedules Below */}
      {schedules.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" /> Today's Scheduled Dispatches
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {schedules.map(sched => (
               <div key={sched.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col hover:border-indigo-200 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-black text-slate-800 text-base">{sched.Route?.name}</h4>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">{sched.Route?.code} | Dist: {sched.Route?.distance}km</p>
                    </div>
                    <div className="bg-indigo-50 text-indigo-700 font-black text-sm px-3 py-1 rounded-lg border border-indigo-100">
                      {new Date(sched.departure_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-3 border border-slate-100">
                     {sched.Bus?.image_url ? (
                        <img src={`http://127.0.0.1:5000${sched.Bus.image_url}`} alt="Bus" className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100">
                          <Bus className="w-6 h-6" />
                        </div>
                     )}
                     <div className="flex-1">
                       <p className="text-sm font-bold text-slate-800 uppercase">{sched.Bus?.license_plate}</p>
                       <p className="text-xs text-slate-500 font-medium">{sched.driver_name} {sched.driver_phone && `• ${sched.driver_phone}`}</p>
                     </div>
                     <div className="text-right">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Seats</p>
                       <p className="text-sm font-black text-slate-800">{sched.available_seats}</p>
                     </div>
                  </div>
               </div>
            ))}
          </div>
        </div>
      )}

      {/* Creation Modal */}
      {isModalOpen && selectedRoute && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50">
              <div>
                <h3 className="text-lg font-black text-slate-800">Dispatch Trip: {selectedRoute.name}</h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Route Distance: {selectedRoute.distance}km • Est. Time: {selectedRoute.estimated_duration} mins
                </p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-white p-2 rounded-lg border border-slate-200 transition-colors">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto w-full">
              <form onSubmit={handleSaveSchedule} className="space-y-6">
                
                {/* Vehicle Selection */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">1. Select Vehicle & Personnel</h4>
                  
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1">Assign Bus</label>
                    <select name="bus_id" value={formData.bus_id} onChange={handleBusSelection} required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 appearance-none">
                      <option value="">-- Choose a Bus --</option>
                      {/* Only list buses mapped to this route, or buses mapped to no route, or all buses if company logic allows */}
                      {buses.map(b => (
                        <option key={b.id} value={b.id}>{b.license_plate} - {b.capacity} Seats ({b.driver_name || 'No Driver Set'})</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1">Driver Name</label>
                      <input type="text" name="driver_name" value={formData.driver_name} onChange={handleInputChange} placeholder="Driver Name" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800" />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1">Driver Phone Number</label>
                      <input type="text" name="driver_phone" value={formData.driver_phone} onChange={handleInputChange} placeholder="Phone" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800" />
                    </div>
                  </div>
                </div>

                {/* Timing */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">2. Timing Configuration</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1">Departure Time</label>
                      <input type="datetime-local" name="departure_time" value={formData.departure_time} onChange={handleInputChange} required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800" />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1">Arrival Time</label>
                      <input type="datetime-local" name="arrival_time" value={formData.arrival_time} onChange={handleInputChange} required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800" />
                    </div>
                  </div>
                </div>

                {/* Logistics */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">3. Logistics Confirmed</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1">Ticket Price (RWF)</label>
                      <input type="number" name="price" value={formData.price} onChange={handleInputChange} required className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-sm font-black text-slate-800" />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1">Available Seats To Sell</label>
                      <input type="number" name="available_seats" value={formData.available_seats} onChange={handleInputChange} required className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-sm font-black text-slate-800" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end gap-3 flex-wrap">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 text-slate-600 font-bold hover:bg-slate-200 rounded-lg transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-lg shadow-md transition-colors text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Finalize Schedule Dispatch
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutesSchedules;
