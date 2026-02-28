import { useState } from 'react';
import { 
  Building2, Bus, Ticket, Landmark, TrendingUp, TrendingDown,
  Activity, Clock, FileText, Download, Route as RouteIcon, Map, AlertTriangle, ShieldAlert
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, AreaChart, Area, Legend, PieChart, Pie, Cell
} from 'recharts';

const REVENUE_TREND = [
  { name: 'Mon', revenue: 9.2, tax: 0.46 },
  { name: 'Tue', revenue: 10.5, tax: 0.52 },
  { name: 'Wed', revenue: 11.2, tax: 0.56 },
  { name: 'Thu', revenue: 12.8, tax: 0.64 },
  { name: 'Fri', revenue: 15.4, tax: 0.77 },
  { name: 'Sat', revenue: 18.2, tax: 0.91 },
  { name: 'Sun', revenue: 17.5, tax: 0.87 },
];

const TICKET_SALES = [
  { time: '06:00', sales: 4500 },
  { time: '09:00', sales: 8200 },
  { time: '12:00', sales: 6100 },
  { time: '15:00', sales: 9800 },
  { time: '18:00', sales: 12400 },
  { time: '21:00', sales: 3200 },
];

const DELAY_STATS = [
  { reason: 'Traffic', value: 45 },
  { reason: 'Mechanical', value: 25 },
  { reason: 'Weather', value: 15 },
  { reason: 'Operational', value: 15 },
];
const COLORS = ['#F59E0B', '#EF4444', '#3B82F6', '#64748B'];

const AdminDashboardOverview = () => {
  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pb-5 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">National Transport Control</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Real-time macro operations, revenue monitoring, and compliance alerts.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4 text-emerald-600" /> Export PDF Summary
          </button>
        </div>
      </div>

      {/* 8 Primary KPIs Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* KPI 1: Active Routes */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="bg-sky-50 p-3 rounded-lg border border-sky-100 shrink-0">
            <RouteIcon className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-0.5">Active Routes</p>
            <p className="text-2xl font-black text-slate-800 leading-none">142</p>
          </div>
        </div>

        {/* KPI 2: Registered Companies */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 shrink-0">
            <Building2 className="w-5 h-5 text-slate-600" />
          </div>
          <div>
             <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-0.5">Companies</p>
             <div className="flex items-baseline gap-2">
               <p className="text-2xl font-black text-slate-800 leading-none">24</p>
               <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">All Regulated</span>
             </div>
          </div>
        </div>

        {/* KPI 3: Total Buses Daily */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 shrink-0">
            <Bus className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-0.5">Buses Running</p>
            <p className="text-2xl font-black text-slate-800 leading-none">842 <span className="text-sm text-slate-400">/ 915</span></p>
          </div>
        </div>

        {/* KPI 4: Tickets Sold */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 shrink-0">
            <Ticket className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-0.5">Tickets Sold Today</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-black text-slate-800 leading-none">44.2k</p>
              <span className="text-[10px] font-bold text-emerald-600 flex items-center"><TrendingUp className="w-3 h-3 mr-0.5"/> 8%</span>
            </div>
          </div>
        </div>

        {/* KPI 5: Total Revenue */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 shrink-0">
            <Landmark className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-0.5">Gross Revenue (Today)</p>
            <p className="text-2xl font-black text-slate-800 leading-none">170M <span className="text-[10px] text-slate-400 uppercase">RWF</span></p>
          </div>
        </div>

        {/* KPI 6: Government Tax */}
        <div className="bg-slate-900 rounded-xl p-4 shadow-md border border-slate-800 flex items-center gap-4 overflow-hidden relative">
          <div className="absolute right-0 top-0 opacity-10">
            <Landmark className="w-16 h-16 transform translate-x-1/4 -translate-y-1/4 text-white" />
          </div>
          <div className="bg-emerald-500/20 p-3 rounded-lg border border-emerald-500/30 shrink-0 relative z-10">
            <Landmark className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-0.5">Govt Tax (5%) Auto-Deducted</p>
            <p className="text-2xl font-black text-white leading-none">8.5M <span className="text-[10px] text-emerald-400 uppercase">RWF</span></p>
          </div>
        </div>

        {/* KPI 7: Delayed Buses */}
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border border-l-amber-500 border-slate-200 flex items-center gap-4 group cursor-pointer hover:bg-slate-50 transition-colors">
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 shrink-0 group-hover:bg-amber-100 transition-colors">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-0.5">Delayed Buses</p>
            <p className="text-2xl font-black text-amber-600 leading-none">45 <span className="text-[10px] text-slate-400 font-medium">Flagged</span></p>
          </div>
        </div>

        {/* KPI 8: Price Violation Alerts */}
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border border-l-red-500 border-slate-200 flex items-center gap-4 group cursor-pointer hover:bg-slate-50 transition-colors">
          <div className="bg-red-50 p-3 rounded-lg border border-red-100 shrink-0 group-hover:bg-red-100 transition-colors">
            <ShieldAlert className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-0.5">Price Violations</p>
            <p className="text-2xl font-black text-red-600 leading-none">12 <span className="text-[10px] text-slate-400 font-medium">Action Needed</span></p>
          </div>
        </div>
      </div>

      {/* Analytics Charts - Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Daily Ticket Sales Graph */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
               <h3 className="text-lg font-black text-slate-800">Daily Ticket Sales</h3>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">Real-time purchase velocity</p>
            </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TICKET_SALES} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11, fontWeight: 700}} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0F172A', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="sales" name="Tickets" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Trend Graph */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
             <div>
               <h3 className="text-lg font-black text-slate-800">Revenue & Tax Trend (Weekly)</h3>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">Gross vs Govt Auto-Collection (M RWF)</p>
             </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11, fontWeight: 700}} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Legend wrapperStyle={{fontSize: '11px', fontWeight: 'bold', paddingTop: '10px'}} />
                <Line type="monotone" dataKey="revenue" name="Gross Transport Rev" stroke="#94A3B8" strokeWidth={3} dot={{r: 4}} />
                <Line type="monotone" dataKey="tax" name="Tax Auto-Deducted" stroke="#10B981" strokeWidth={4} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Analytics Charts - Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Delay Statistics */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" /> Delay Statistics
            </h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">Categorized breakdown of delayed runs</p>
          </div>
          <div className="flex-1 min-h-[250px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DELAY_STATS}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {DELAY_STATS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                  formatter={(value) => [`${value}%`, 'Percentage']}
                />
                <Legend iconType="circle" wrapperStyle={{fontSize: '11px', fontWeight: 'bold', paddingTop: '15px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Route Performance Snapshot */}
        <div className="lg:col-span-2 bg-slate-900 rounded-xl shadow-md border border-slate-800 p-6 flex flex-col text-white">
          <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Map className="w-5 h-5 text-sky-400" /> Route Performance Diagnostic Alerts
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time status of top national corridors</p>
            </div>
            <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg border border-slate-700 transition-colors focus:outline-none">
              View All Routes
            </button>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:bg-slate-800 transition-colors">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded bg-slate-950 flex items-center justify-center font-bold text-xs text-slate-500 border border-slate-800">R1</div>
                 <div>
                   <p className="font-bold text-white text-sm">Kigali → Musanze</p>
                   <p className="text-[10px] text-slate-400 font-mono uppercase">110 km | Max Fare: 3000 RWF</p>
                 </div>
               </div>
               <div className="text-right">
                 <span className="inline-block px-2 py-1 bg-red-900/30 text-red-400 border border-red-900/50 rounded text-xs font-bold uppercase tracking-wide">
                   Over Congested (+22m Avg Delay)
                 </span>
               </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:bg-slate-800 transition-colors">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded bg-slate-950 flex items-center justify-center font-bold text-xs text-slate-500 border border-slate-800">R2</div>
                 <div>
                   <p className="font-bold text-white text-sm">Kigali → Huye</p>
                   <p className="text-[10px] text-slate-400 font-mono uppercase">130 km | Max Fare: 4500 RWF</p>
                 </div>
               </div>
               <div className="text-right">
                 <span className="inline-block px-2 py-1 bg-emerald-900/30 text-emerald-400 border border-emerald-900/50 rounded text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                   Healthy <TrendingUp className="w-3 h-3" />
                 </span>
               </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:bg-slate-800 transition-colors">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded bg-slate-950 flex items-center justify-center font-bold text-xs text-slate-500 border border-slate-800">R4</div>
                 <div>
                   <p className="font-bold text-white text-sm">Kigali → Rubavu</p>
                   <p className="text-[10px] text-slate-400 font-mono uppercase">160 km | Max Fare: 5500 RWF</p>
                 </div>
               </div>
               <div className="text-right">
                 <span className="inline-block px-2 py-1 bg-amber-900/30 text-amber-400 border border-amber-900/50 rounded text-xs font-bold uppercase tracking-wide">
                   2 Price Violations Detected
                 </span>
               </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboardOverview;
