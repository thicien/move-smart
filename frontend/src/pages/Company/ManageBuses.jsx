import { useState } from 'react';
import { Bus, Plus, Search, Filter, MoreVertical, Edit2, Trash2, Eye, ShieldCheck, Wrench } from 'lucide-react';

const MOCK_BUSES = [
  { id: 1, number: 'B-001', plate: 'RAD 424 A', seats: 30, type: 'VIP', driver: 'John Nsengimana', status: 'Active', route: 'Kigli - Musanze' },
  { id: 2, number: 'B-002', plate: 'RAC 911 E', seats: 45, type: 'Standard', driver: 'Paul Kagabo', status: 'Active', route: 'Kigali - Huye' },
  { id: 3, number: 'B-003', plate: 'RAB 102 C', seats: 30, type: 'Standard', driver: 'Unassigned', status: 'Maintenance', route: 'N/A' },
  { id: 4, number: 'B-004', plate: 'RAF 882 K', seats: 30, type: 'VIP', driver: 'Eric Mugisha', status: 'Active', route: 'Kigali - Rubavu' },
];

const ManageBuses = () => {
  const [view, setView] = useState('list'); // 'list' | 'add' | 'details'
  const [searchTerm, setSearchTerm] = useState('');

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
            onClick={() => setView('add')}
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
              {MOCK_BUSES.filter(b => b.plate.toLowerCase().includes(searchTerm.toLowerCase()) || b.number.toLowerCase().includes(searchTerm.toLowerCase())).map((bus) => (
                <tr key={bus.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100">
                        <Bus className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">{bus.number}</div>
                        <div className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded mt-1 inline-block border border-slate-200">{bus.plate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-700">{bus.type}</div>
                    <div className="text-xs text-slate-500">{bus.seats} Seats</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-800">{bus.driver}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-600">{bus.route}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold
                      ${bus.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}
                    `}>
                      {bus.status === 'Active' ? <ShieldCheck className="w-3.5 h-3.5" /> : <Wrench className="w-3.5 h-3.5" />}
                      {bus.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {MOCK_BUSES.length === 0 && (
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
          <h2 className="text-2xl font-bold text-gray-800">Register New Bus</h2>
          <p className="text-gray-500 text-sm mt-1">Add a new vehicle to your operational fleet.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Internal Bus Number/ID</label>
              <input type="text" placeholder="e.g. B-015" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 text-slate-800" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">License Plate Number</label>
              <input type="text" placeholder="e.g. RAD 123 B" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 text-slate-800" />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Number of Seats</label>
              <input type="number" min="10" max="70" placeholder="e.g. 30" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 text-slate-800" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bus Type</label>
              <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:bg-white outline-none transition-all text-slate-800 appearance-none">
                <option value="Standard">Standard (Regular Seats)</option>
                <option value="VIP">VIP (Reclining, AC, WiFi)</option>
                <option value="Mini">Mini-bus (Coaster)</option>
              </select>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">GPS Tracker Device ID</label>
              <input type="text" placeholder="Hardware ID for Live Tracking integration" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 font-mono text-sm text-slate-800" />
              <p className="text-xs text-slate-400 mt-1">Required for real-time fleet map monitoring.</p>
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
                type="button"
                onClick={() => { alert('Bus Registered'); setView('list'); }}
                className="px-6 py-2.5 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 shadow-md transition-colors"
              >
                Save & Register Bus
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
      {view === 'add' && renderAddForm()}
      {/* Details view could go here, omitting for brevity to keep the file focused on the main dual requirement */}
    </>
  );
};

export default ManageBuses;
