import { useState, useEffect } from 'react';
import { 
  DollarSign, Search, Edit2, AlertTriangle, ShieldAlert,
  Settings, CheckCircle2, TrendingUp, Info
} from 'lucide-react';

import axios from 'axios';

const FarePricing = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get('http://127.0.0.1:5000/api/admin/routes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRoutes(res.data);
    } catch (error) {
      console.error('Failed to fetch routes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleEdit = (route) => {
    setSelectedRoute({ ...route });
    setShowConfigModal(true);
  };

  const handlePolicyChange = (e) => {
    setSelectedRoute({ ...selectedRoute, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  const handleUpdatePolicy = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://127.0.0.1:5000/api/admin/routes/${selectedRoute.id}`, {
        base_fare: selectedRoute.base_fare,
        min_fare: selectedRoute.min_fare,
        max_fare: selectedRoute.max_fare,
        tax_percentage: selectedRoute.tax_percentage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowConfigModal(false);
      fetchRoutes();
    } catch (error) {
      console.error('Failed to update policy:', error);
      alert(error.response?.data?.message || 'Failed to update policy');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pb-5 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-emerald-600" /> National Fare & Taxation Policy
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Define legal price boundaries and government deduction percentages per corridor.</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md transition-colors flex items-center gap-2">
            <Settings className="w-4 h-4" /> Global Tax Rules
          </button>
        </div>
      </div>

      {/* Global Alerts */}
      <div className="flex flex-col gap-3">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-blue-900">Dynamic Pricing Authority Enforcement</h4>
            <p className="text-sm text-blue-800 mt-1 font-medium">
              If a transport company attempts to publish a bus schedule with a price exceeding the <span className="font-bold underline">Maximum Fare</span> set here, the backend will automatically block the schedule and flag a <span className="font-bold text-red-600">Price Violation</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by route code or name..." 
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 bg-slate-50 focus:outline-none focus:border-emerald-500">
            <option>All Routes</option>
            <option>Pending Rate Review</option>
            <option>Highest Tax Bracket</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-slate-300 text-xs uppercase tracking-widest border-b border-slate-800">
                <th className="px-6 py-4 font-black">Route Matrix</th>
                <th className="px-6 py-4 font-black">Base Estimate</th>
                <th className="px-6 py-4 font-black">Legal Bounds (Min - Max)</th>
                <th className="px-6 py-4 font-black text-center">Govt Tax Cut</th>
                <th className="px-6 py-4 font-black text-center">Policy Status</th>
                <th className="px-6 py-4 font-black text-right">Configure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500 font-medium">
                    Loading pricing policies...
                  </td>
                </tr>
              ) : routes.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500 font-medium">
                    No routes found. Please create official routes first.
                  </td>
                </tr>
              ) : routes.map((route) => (
                <tr key={route.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-black text-slate-900 leading-tight">{route.name}</p>
                    <p className="text-xs font-bold text-slate-500 mt-1 font-mono">{route.code}</p>
                  </td>
                  <td className="px-6 py-4">
                     <span className="text-lg font-black text-slate-800">{(route.base_fare || 0).toLocaleString()} <span className="text-xs text-slate-400">RWF</span></span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded border border-slate-200">
                         {(route.min_fare || 0).toLocaleString()} RWF
                       </span>
                       <span className="text-slate-400 font-black">-</span>
                       <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-bold rounded border border-red-100">
                         {(route.max_fare || 0).toLocaleString()} RWF
                       </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-black">{route.tax_percentage || 0}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {(route.max_fare > 0 && route.tax_percentage > 0) ? (
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex justify-center items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Enforced
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-amber-600 uppercase tracking-widest flex justify-center items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Pending Config
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleEdit(route)}
                      className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 border border-transparent hover:border-emerald-200 rounded-lg transition-colors inline-flex items-center gap-2 text-sm font-bold"
                    >
                      <Edit2 className="w-4 h-4" /> Edit Rules
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Configuration Modal */}
      {showConfigModal && selectedRoute && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col">
            
            <div className="p-6 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-emerald-400" /> 
                  Modify Route Policy
                </h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Target: {selectedRoute.name} ({selectedRoute.code})</p>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Target Revenue Deduction (%)</label>
                  <div className="flex items-center gap-4">
                     <input type="number" name="tax_percentage" value={selectedRoute.tax_percentage} onChange={handlePolicyChange} className="w-32 p-3 border border-emerald-300 rounded-lg text-2xl font-black text-emerald-700 bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center" />
                     <p className="text-sm font-medium text-slate-600 leading-tight">
                       This percentage will be automatically sliced from every passenger ticket purchased on this route and deposited into the Government Reserve.
                     </p>
                  </div>
               </div>

               <div className="space-y-4">
                 <div>
                   <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Base Fare/Estimate (RWF)</label>
                   <input type="number" name="base_fare" value={selectedRoute.base_fare} onChange={handlePolicyChange} className="w-full p-3 border border-slate-300 rounded-lg text-lg font-bold focus:outline-none focus:border-emerald-500 text-slate-500 bg-slate-50" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Legal Minimum Fare (RWF)</label>
                     <input type="number" name="min_fare" value={selectedRoute.min_fare} onChange={handlePolicyChange} className="w-full p-3 border border-slate-300 rounded-lg text-lg font-bold focus:outline-none focus:border-emerald-500" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Legal Maximum Fare (RWF)</label>
                     <div className="relative">
                       <input type="number" name="max_fare" value={selectedRoute.max_fare} onChange={handlePolicyChange} className="w-full p-3 border border-red-300 rounded-lg text-lg font-bold text-red-700 bg-red-50 focus:outline-none focus:border-red-500" />
                       <AlertTriangle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5" />
                     </div>
                     <p className="text-[10px] uppercase font-bold text-red-600 mt-1 text-right">Hard Ceiling Trigger</p>
                   </div>
                 </div>
               </div>
            </div>

            <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => setShowConfigModal(false)}
                className="px-5 py-2.5 text-slate-600 font-bold hover:bg-slate-200 rounded-lg transition-colors text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdatePolicy}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-lg shadow-md transition-colors text-sm flex items-center gap-2"
              >
                Enforce Policy Update
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default FarePricing;
