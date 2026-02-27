import { 
  Building2, Bus, Ticket, Landmark, TrendingUp, AlertTriangle, ShieldAlert, MapPin, 
  Activity, Clock, FileText, Download 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, AreaChart, Area
} from 'recharts';

const REVENUE_DATA = [
  { name: 'Jan', revenue: 14000, tax: 700 },
  { name: 'Feb', revenue: 23000, tax: 1150 },
  { name: 'Mar', revenue: 20000, tax: 1000 },
  { name: 'Apr', revenue: 27800, tax: 1390 },
  { name: 'May', revenue: 18900, tax: 945 },
  { name: 'Jun', revenue: 23900, tax: 1195 },
  { name: 'Jul', revenue: 34900, tax: 1745 },
];

const AdminDashboardOverview = () => {
  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pb-5 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">National Transport Overview</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Real-time macro-level data and compliance metrics across Rwanda.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-gray-300 text-slate-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4" /> Download National Report
          </button>
          <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-colors flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" /> Live System Status
          </button>
        </div>
      </div>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        {/* Companies */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex flex-col relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
              <Building2 className="w-5 h-5 text-slate-700" />
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">All Active</span>
          </div>
          <span className="text-slate-500 text-sm font-bold mb-1 uppercase tracking-wider">Registered Companies</span>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-slate-900 leading-none">24</span>
          </div>
        </div>

        {/* Active Buses */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
              <Bus className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">92% Online</span>
          </div>
          <span className="text-slate-500 text-sm font-bold mb-1 uppercase tracking-wider">Active Buses Nationwide</span>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-slate-900 leading-none">842</span>
            <span className="text-sm font-bold text-slate-400 mb-0.5">/ 915</span>
          </div>
        </div>

        {/* Tickets Sold */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100">
              <Ticket className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 18%
            </span>
          </div>
          <span className="text-slate-500 text-sm font-bold mb-1 uppercase tracking-wider">Tickets Sold Today</span>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-slate-900 leading-none">42,508</span>
          </div>
        </div>

        {/* Gov Revenue */}
        <div className="bg-slate-900 rounded-xl p-5 shadow-md border border-slate-800 flex flex-col relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10">
            <Landmark className="w-32 h-32 transform translate-x-1/4 -translate-y-1/4 text-white" />
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <Landmark className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">Daily Tax</span>
          </div>
          <span className="text-slate-300 text-sm font-bold mb-1 uppercase tracking-wider relative z-10">Gov Revenue Today (5%)</span>
          <div className="flex items-end gap-2 relative z-10">
            <span className="text-3xl font-black text-white leading-none flex items-baseline gap-1">
              <span className="text-lg text-emerald-400">RWF</span> 8.5M
            </span>
          </div>
        </div>

      </div>

      {/* Secondary Metrics & Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-sky-50 p-3 rounded-xl border border-sky-100">
              <RouteIcon className="w-6 h-6 text-sky-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Routes</p>
              <p className="text-xl font-black text-slate-800">142</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border-l-4 border-l-amber-500 border border-gray-200 p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Delayed Buses</p>
              <p className="text-xl font-black text-amber-600">45</p>
            </div>
          </div>
          <button className="text-xs font-bold text-amber-700 hover:text-amber-800 underline">View List</button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border-l-4 border-l-red-500 border border-gray-200 p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-red-50 p-3 rounded-xl border border-red-100">
              <ShieldAlert className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Violations</p>
              <p className="text-xl font-black text-red-600">12</p>
            </div>
          </div>
          <button className="text-xs font-bold text-red-700 hover:text-red-800 underline">Intervene</button>
        </div>

      </div>

      {/* Complex Layout: Chart + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Chart */}
        <div className="col-span-1 lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
               <h3 className="text-lg font-black text-slate-800">Monthly Tax Revenue</h3>
               <p className="text-sm font-medium text-slate-500">Government collected 5% tax from general ticket sales</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2 outline-none">
              <option>2023 / 2024</option>
              <option>2022 / 2023</option>
            </select>
          </div>
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTax" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12, fontWeight: 600}} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0F172A', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="tax" name="Tax Recovered (M)" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorTax)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Map Preview */}
        <div className="col-span-1 bg-slate-900 rounded-xl shadow-md border border-slate-800 p-1 flex flex-col relative overflow-hidden">
           <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center text-white p-3 bg-black/60 backdrop-blur-md rounded-lg border border-slate-700">
             <div>
                <h3 className="text-sm font-black tracking-wide">National Fleet</h3>
                <p className="text-xs text-emerald-400 font-bold">842 Buses Active</p>
             </div>
             <button className="bg-emerald-600 hover:bg-emerald-500 text-white p-1.5 rounded transition-colors" title="Expand Map">
               <MapPin className="w-5 h-5" />
             </button>
           </div>
           
           <div className="flex-1 rounded-lg relative overflow-hidden bg-slate-800 min-h-[350px]">
             {/* Map Background Simulation */}
             <div className="absolute inset-0 opacity-40 mix-blend-luminosity bg-[url('https://maps.wikimedia.org/osm-intl/12/2402/1534.png')] bg-cover bg-center"></div>
             
             {/* Clusters / Pins */}
             <div className="absolute top-1/3 left-1/4">
               <div className="w-10 h-10 bg-emerald-500/20 rounded-full animate-ping absolute"></div>
               <div className="relative w-10 h-10 bg-emerald-600 border-2 border-slate-900 rounded-full flex items-center justify-center text-white font-black text-xs shadow-lg">145</div>
             </div>

             <div className="absolute bottom-1/4 right-1/3">
               <div className="w-8 h-8 bg-blue-500/20 rounded-full animate-ping absolute"></div>
               <div className="relative w-8 h-8 bg-blue-600 border-2 border-slate-900 rounded-full flex items-center justify-center text-white font-black text-xs shadow-lg">92</div>
             </div>

             <div className="absolute top-1/2 right-1/4">
               <div className="w-6 h-6 bg-amber-500/20 rounded-full animate-ping absolute"></div>
               <div className="relative w-6 h-6 bg-amber-500 border-2 border-slate-900 rounded-full flex items-center justify-center text-white font-black text-[10px] shadow-lg">18</div>
             </div>
             
             <div className="absolute bottom-8 left-8">
               <div className="w-5 h-5 bg-red-500/20 rounded-full animate-ping absolute"></div>
               <div className="relative w-5 h-5 bg-red-500 border-2 border-slate-900 rounded-full flex items-center justify-center text-white font-black text-[10px] shadow-lg">3</div>
             </div>
           </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboardOverview;
