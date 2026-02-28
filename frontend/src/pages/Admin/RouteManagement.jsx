import { useState } from 'react';
import { 
  MapPin, Plus, Search, Edit2, Trash2, CheckCircle2, XCircle, Route as RouteIcon,
  Map, MoreVertical, ShieldAlert
} from 'lucide-react';

// Mock DB routes
const MOCK_ROUTES = [
  { id: 'RT-001', code: 'KGL-MSZ', name: 'Kigali → Musanze', origin: 'Kigali (Nyabugogo)', destination: 'Musanze (City Center)', distance: '110 km', time: '2h 15m', status: 'Active', companies: 4 },
  { id: 'RT-002', code: 'KGL-HUY', name: 'Kigali → Huye', origin: 'Kigali (Nyabugogo)', destination: 'Huye (Bus Park)', distance: '130 km', time: '3h 0m', status: 'Active', companies: 3 },
  { id: 'RT-003', code: 'KGL-RBV', name: 'Kigali → Rubavu', origin: 'Kigali (Nyabugogo)', destination: 'Rubavu (Border)', distance: '160 km', time: '3h 45m', status: 'Active', companies: 5 },
  { id: 'RT-004', code: 'MSZ-RBV', name: 'Musanze → Rubavu', origin: 'Musanze', destination: 'Rubavu', distance: '65 km', time: '1h 30m', status: 'Suspended', companies: 0 },
  { id: 'RT-005', code: 'KGL-RMG', name: 'Kigali → Rwamagana', origin: 'Kigali (Remera)', destination: 'Rwamagana', distance: '60 km', time: '1h 10m', status: 'Active', companies: 2 },
];

const RouteManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pb-5 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <RouteIcon className="w-6 h-6 text-sky-600" /> National Route Registry
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Define, approve, and manage official transport corridors.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Create Official Route
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by route code, origin, or destination..." 
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 focus:outline-none focus:border-sky-500 bg-slate-50">
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="suspended">Suspended Only</option>
          </select>
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
                <th className="px-6 py-4 font-black">Operators</th>
                <th className="px-6 py-4 font-black text-center">Status</th>
                <th className="px-6 py-4 font-black text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ROUTES.map((route) => (
                <tr key={route.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
                        <Map className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{route.name}</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{route.id} | {route.code}</p>
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
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Dist: <span className="text-slate-900">{route.distance}</span></p>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Est: <span className="text-slate-900">{route.time}</span></p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-black bg-blue-50 text-blue-700 border border-blue-100">
                      {route.companies} Companies
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {route.status === 'Active' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-100">
                        <CheckCircle2 className="w-3.5 h-3.5" /> ACTIVE
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-black bg-slate-100 text-slate-600 border border-slate-200">
                        <XCircle className="w-3.5 h-3.5" /> SUSPENDED
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded transition-colors" title="Edit Route">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {route.status === 'Active' ? (
                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Suspend Route">
                          <ShieldAlert className="w-4 h-4" />
                        </button>
                      ) : (
                        <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors" title="Activate Route">
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {MOCK_ROUTES.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500 font-medium">
                    No routes found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm">
          <span className="font-bold text-slate-600">Showing 5 official routes</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-slate-300 rounded bg-white text-slate-600 font-bold hover:bg-slate-50 transition-colors disabled:opacity-50">Prev</button>
            <button className="px-3 py-1.5 border border-slate-300 rounded bg-white text-slate-600 font-bold hover:bg-slate-50 transition-colors disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>

      {/* Creation Modal (Concept) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50">
              <div>
                <h3 className="text-lg font-black text-slate-800">Create Official Route</h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Register string path into National Database</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-white p-2 rounded-lg border border-slate-200 transition-colors">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Route Code</label>
                    <input type="text" placeholder="e.g. KGL-MSZ" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Origin City/Stop</label>
                    <input type="text" placeholder="Kigali" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold " />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Destination City/Stop</label>
                    <input type="text" placeholder="Musanze" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Official Name</label>
                    <input type="text" placeholder="Kigali → Musanze" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Distance (KM)</label>
                      <input type="number" placeholder="110" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Est. Time (Mins)</label>
                      <input type="number" placeholder="135" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Initial Status</label>
                    <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold">
                      <option>Active / Open for Operation</option>
                      <option>Suspended / Under Maintenance</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs font-medium text-amber-800 leading-relaxed font-bold">
                  <strong>Notice:</strong> Creating an official route does NOT automatically set its fare constraints or taxation logic. You must configure those in the <span className="underline cursor-pointer text-amber-900">Fare & Pricing Control</span> module.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 text-slate-600 font-bold hover:bg-slate-200 rounded-lg transition-colors text-sm"
              >
                Cancel
              </button>
              <button className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-black rounded-lg shadow-md transition-colors text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Save Official Route
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteManagement;
