import { useState } from 'react';
import { 
  PieChart as PieChartIcon, Download, Calendar, Filter, TrendingUp, TrendingDown, MapPin
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, Legend
} from 'recharts';

const URBAN_RURAL = [
  { name: 'Urban Routes (Kigali Metro)', value: 65 },
  { name: 'Rural & Cross-District', value: 35 },
];

const PROFIT_ROUTES = [
  { route: 'KGL-MSZ', profit: 45.2, delay: 12 },
  { route: 'KGL-HUY', profit: 38.4, delay: 8 },
  { route: 'KGL-RBV', profit: 52.1, delay: 25 },
  { route: 'MSZ-RBV', profit: 18.5, delay: 5 },
  { route: 'KGL-RMG', profit: 24.8, delay: 18 },
];

const MONTHLY_GROWTH = [
  { month: 'Jan', pax: 1.2, rev: 4.5 },
  { month: 'Feb', pax: 1.4, rev: 5.2 },
  { month: 'Mar', pax: 1.3, rev: 4.8 },
  { month: 'Apr', pax: 1.8, rev: 6.9 },
  { month: 'May', pax: 2.1, rev: 7.8 },
  { month: 'Jun', pax: 2.4, rev: 8.5 },
];

const PIE_COLORS = ['#3B82F6', '#10B981'];

const TransportAnalytics = () => {
  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pb-5 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <PieChartIcon className="w-6 h-6 text-indigo-600" /> Advanced Transport Analytics
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Deep-dive multidimensional analysis of national fleet capacity and profitability.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4 text-indigo-600" /> Export Data Cube
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
             <div>
               <h3 className="text-lg font-black text-slate-800">Monthly Ticket Growth vs Revenue</h3>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">Millions (Pax & RWF)</p>
             </div>
             <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-lg focus:ring-indigo-500 py-1.5 px-3 outline-none">
                <option>2024 YTD</option>
                <option>2023</option>
             </select>
          </div>
          <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_GROWTH} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPax" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11, fontWeight: 700}} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Legend wrapperStyle={{fontSize: '11px', fontWeight: 'bold', paddingTop: '15px'}} />
                <Area type="monotone" dataKey="pax" name="Passenger Volume (M)" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorPax)" />
                <Area type="monotone" dataKey="rev" name="Gross Revenue (M)" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Urban vs Rural Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-500" /> Geographic Demand
            </h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">Rural vs Urban Load Shift</p>
          </div>
          <div className="flex-1 min-h-[250px] flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center flex-col z-10 pointer-events-none">
               <span className="text-3xl font-black text-slate-800">2.4M</span>
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Total Pax YTD</span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={URBAN_RURAL}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {URBAN_RURAL.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                  formatter={(value) => [`${value}%`, 'Demand Split']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
             <div className="flex items-center gap-2 text-xs font-bold">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div> Urban Metro
             </div>
             <div className="flex items-center gap-2 text-xs font-bold">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div> Rural Routes
             </div>
          </div>
        </div>

        {/* Most Profitable vs Delayed Routes */}
        <div className="lg:col-span-3 bg-slate-900 rounded-xl shadow-md border border-slate-800 p-6 flex flex-col text-white">
          <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                 Route Profitability & Congestion Index
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Comparing Top Routes: Profit Velocity vs Average Delay (Mins)</p>
            </div>
            <div className="flex items-center gap-2">
               <Filter className="w-4 h-4 text-slate-400" />
               <select className="bg-slate-800 border border-slate-700 text-white text-xs font-bold rounded focus:ring-sky-500 px-2 py-1 outline-none">
                  <option>Top 5 Highest Density</option>
                  <option>Top 5 Highest Delayed</option>
               </select>
            </div>
          </div>
          
          <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PROFIT_ROUTES} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="route" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 700}} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 700}} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 700}} />
                
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0F172A', color: '#fff', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Legend wrapperStyle={{fontSize: '11px', fontWeight: 'bold', paddingTop: '15px', color: '#94A3B8'}} />
                
                <Bar yAxisId="left" dataKey="profit" name="Route Revenue (M)" fill="#38BDF8" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar yAxisId="right" dataKey="delay" name="Avg Delay (Mins)" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};

export default TransportAnalytics;
