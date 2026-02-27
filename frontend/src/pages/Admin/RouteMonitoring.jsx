import { useState } from 'react';
import { 
  Route as RouteIcon, TrendingUp, TrendingDown, Clock, Activity, AlertCircle, Map 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

const MOCK_ROUTES = [
  { id: 'R-01', origin: 'Kigali', destination: 'Musanze', density: 95, avgDelay: '15m', status: 'Over-served', traffic: 'High' },
  { id: 'R-02', origin: 'Kigali', destination: 'Huye', density: 82, avgDelay: '8m', status: 'Balanced', traffic: 'Medium' },
  { id: 'R-03', origin: 'Kigali', destination: 'Rubavu', density: 88, avgDelay: '22m', status: 'Over-served', traffic: 'High' },
  { id: 'R-04', origin: 'Kigali', destination: 'Nyagatare', density: 45, avgDelay: '5m', status: 'Under-served', traffic: 'Low' },
  { id: 'R-05', origin: 'Muhanga', destination: 'Karongi', density: 60, avgDelay: '10m', status: 'Balanced', traffic: 'Medium' },
];

const ROUTE_DATA = [
  { name: 'KGL-MUS', density: 95 },
  { name: 'KGL-HUY', density: 82 },
  { name: 'KGL-RUB', density: 88 },
  { name: 'KGL-NYA', density: 45 },
  { name: 'MUH-KAR', density: 60 },
];

const RouteMonitoring = () => {
  return (
    <div className="space-y-6 font-sans animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">National Route Monitoring</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Analyze traffic density, delays, and distribution of national routes.</p>
        </div>
        <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition-colors flex items-center gap-2 border border-slate-700">
          <Map className="w-4 h-4 text-sky-400" /> View Heatmap
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Monitored Routes</p>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-black text-slate-800">142</span>
            <span className="text-sm font-bold text-emerald-500 flex items-center mb-1"><TrendingUp className="w-4 h-4 mr-1"/> 4%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Under-served Routes</p>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-black text-amber-600">18</span>
            <span className="text-xs font-bold text-slate-400 mb-1">Needs attention</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">High Traffic / Congestion</p>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-black text-red-600">24</span>
            <span className="text-sm font-bold text-red-500 flex items-center mb-1"><TrendingUp className="w-4 h-4 mr-1"/> 12%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">National Avg Delay</p>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-black text-slate-800">12<span className="text-lg">m</span></span>
            <span className="text-sm font-bold text-emerald-500 flex items-center mb-1"><TrendingDown className="w-4 h-4 mr-1"/> 2m</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Table */}
        <div className="col-span-1 lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-slate-800">Active Route Diagnostics</h3>
            <span className="bg-sky-100 text-sky-700 text-xs font-bold px-2 py-1 rounded">Live Data</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white border-b border-gray-100 text-slate-400 font-bold text-xs uppercase">
                <tr>
                  <th className="px-5 py-3">Route</th>
                  <th className="px-5 py-3">Traffic</th>
                  <th className="px-5 py-3 text-center">Density</th>
                  <th className="px-5 py-3 text-center">Avg Delay</th>
                  <th className="px-5 py-3 text-right">Service Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {MOCK_ROUTES.map((route, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                         <div className="p-1.5 bg-slate-100 rounded text-slate-500">
                           <RouteIcon className="w-4 h-4" />
                         </div>
                         <span className="font-bold text-slate-800">{route.origin} → {route.destination}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                        route.traffic === 'High' ? 'bg-red-50 text-red-600' : 
                        route.traffic === 'Medium' ? 'bg-amber-50 text-amber-600' : 
                        'bg-emerald-50 text-emerald-600'
                      }`}>
                        {route.traffic}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${route.density > 80 ? 'bg-red-500' : route.density > 50 ? 'bg-slate-400' : 'bg-amber-400'}`} 
                            style={{width: `${route.density}%`}}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-600 w-8">{route.density}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center font-bold text-slate-700">
                      {route.avgDelay}
                    </td>
                    <td className="px-5 py-4 text-right">
                       <span className={`text-xs font-bold flex items-center justify-end gap-1 ${
                         route.status === 'Over-served' ? 'text-red-600' :
                         route.status === 'Under-served' ? 'text-amber-600' : 'text-emerald-600'
                       }`}>
                         {route.status !== 'Balanced' && <AlertCircle className="w-3 h-3" />}
                         {route.status}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Traffic Density Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col">
          <h3 className="font-bold text-slate-800 mb-6">Top Route Density</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ROUTE_DATA} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11, fontWeight: 700}} width={60} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar dataKey="density" radius={[0, 4, 4, 0]} barSize={20}>
                  {ROUTE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.density > 80 ? '#EF4444' : entry.density > 50 ? '#0F172A' : '#F59E0B'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs font-bold text-slate-500">
             <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-sm"></div> Over-capacity</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-900 rounded-sm"></div> Balanced</div>
             <div className="flex items-center gap-2 mt-1"><div className="w-3 h-3 bg-amber-500 rounded-sm"></div> Under-capacity</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteMonitoring;
