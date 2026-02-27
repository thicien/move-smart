import { useState } from 'react';
import { Route as RouteIcon, Plus, Search, Calendar, MapPin, Clock, DollarSign, MoreVertical, Edit2, Trash2 } from 'lucide-react';

const MOCK_ROUTES = [
  { id: 1, origin: 'Kigali', destination: 'Musanze', duration: '2h 15m', distance: '95 km', base_price: 'RWF 3,000', active_schedules: 6 },
  { id: 2, origin: 'Kigali', destination: 'Rubavu', duration: '3h 30m', distance: '150 km', base_price: 'RWF 4,500', active_schedules: 8 },
  { id: 3, origin: 'Kigali', destination: 'Huye', duration: '2h 45m', distance: '125 km', base_price: 'RWF 3,500', active_schedules: 4 },
  { id: 4, origin: 'Musanze', destination: 'Rubavu', duration: '1h 20m', distance: '65 km', base_price: 'RWF 2,000', active_schedules: 5 },
];

const RoutesSchedules = () => {
  const [view, setView] = useState('list'); // 'list' | 'add_route'
  const [searchTerm, setSearchTerm] = useState('');

  const renderRoutes = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Routes & Schedules</h2>
          <p className="text-gray-500 text-sm mt-1">Configure your travel paths and daily departure timings.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search routes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/30 outline-none text-sm w-full md:w-64"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors text-sm font-semibold shadow-sm">
            <Calendar className="w-4 h-4" /> View Calendar
          </button>
          <button 
            onClick={() => setView('add_route')}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" /> Create Route
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MOCK_ROUTES.filter(r => r.origin.toLowerCase().includes(searchTerm.toLowerCase()) || r.destination.toLowerCase().includes(searchTerm.toLowerCase())).map((route) => (
          <div key={route.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:border-indigo-100 transition-colors group relative overflow-hidden">
            {/* Background Map Decoration */}
            <div className="absolute right-0 top-0 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <svg width="200" height="200" viewBox="0 0 100 100">
                 <path d="M10,50 Q30,10 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5"/>
              </svg>
            </div>

            <div className="flex justify-between items-start mb-6 z-10">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                  <RouteIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 text-lg font-bold text-slate-800">
                      <span>{route.origin}</span>
                      <span className="text-slate-300">→</span>
                      <span>{route.destination}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 mt-1">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {route.duration}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {route.distance}</span>
                    <span className="flex items-center gap-1 font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded ml-auto">
                      {route.active_schedules} Active Daily
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex justify-between items-center z-10">
              <div>
                <span className="text-xs font-bold text-slate-400 tracking-wider uppercase block mb-1">Base Price / Seat</span>
                <span className="text-xl font-bold text-slate-800 flex items-center gap-1">
                  {route.base_price}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  Edit Route
                </button>
                <button className="px-3 py-1.5 text-sm font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors">
                  Schedules
                </button>
              </div>
            </div>
          </div>
        ))}
        {MOCK_ROUTES.length === 0 && (
          <div className="col-span-2 p-12 text-center text-slate-500 bg-white rounded-2xl border border-gray-100">
            No routes found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );

  const renderAddRoute = () => (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
        <button 
          onClick={() => setView('list')}
          className="text-slate-500 hover:text-slate-800 font-medium text-sm flex items-center gap-1 transition-colors"
        >
          ← Back to Routes
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Route Configuration Engine</h2>
          <p className="text-gray-500 text-sm mt-1">Design a new travel path and set base pricing.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Visual Header */}
        <div className="bg-indigo-600 px-8 py-6 flex justify-between items-center text-white relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
           <div className="relative z-10 w-full flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full border-2 border-white bg-indigo-600 z-10"></div>
                <span className="mt-2 font-bold uppercase tracking-widest text-xs text-indigo-200">Origin</span>
              </div>
              <div className="flex-1 h-0.5 bg-indigo-400 mx-4 relative flex items-center justify-center">
                 <Bus className="w-5 h-5 text-indigo-300 absolute" />
              </div>
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-white z-10 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-indigo-600"></div></div>
                <span className="mt-2 font-bold uppercase tracking-widest text-xs text-indigo-200">Destination</span>
              </div>
           </div>
        </div>

        <div className="p-8">
          <form className="space-y-8">
            {/* Core Route Detail Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">Geography</h3>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Origin City / Terminal</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="e.g. Kigali, Nyabugogo" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/30 outline-none text-slate-800 font-semibold" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Destination City / Terminal</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500" />
                    <input type="text" placeholder="e.g. Rubavu, Gisenyi" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/30 outline-none text-slate-800 font-semibold" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">Logistics & Economics</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Distance</label>
                    <input type="text" placeholder="e.g. 150 km" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/30 outline-none text-slate-800" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Est. Duration</label>
                    <input type="text" placeholder="e.g. 3h 30m" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/30 outline-none text-slate-800" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Standard Ticket Price (RWF)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="number" placeholder="4500" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none text-emerald-700 font-bold" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
              <button 
                type="button" 
                onClick={() => setView('list')}
                className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={() => { alert('Route Created'); setView('list'); }}
                className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-md transition-colors"
              >
                Save Master Route
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {view === 'list' && renderRoutes()}
      {view === 'add_route' && renderAddRoute()}
    </>
  );
};

export default RoutesSchedules;
