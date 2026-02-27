import { useState } from 'react';
import { 
  PieChart as PieChartIcon, TrendingUp, TrendingDown, Download, BarChart2, FileText, Calendar, Filter
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer 
} from 'recharts';

const PASSENGER_TRENDS = [
  { name: 'Jan', passengers: 125000 },
  { name: 'Feb', passengers: 142000 },
  { name: 'Mar', passengers: 138000 },
  { name: 'Apr', passengers: 165000 },
  { name: 'May', passengers: 152000 },
  { name: 'Jun', passengers: 184000 },
  { name: 'Jul', passengers: 210000 },
];

const ROUTE_POPULARITY = [
  { name: 'Kigali - Musanze', value: 35 },
  { name: 'Kigali - Huye', value: 25 },
  { name: 'Kigali - Rubavu', value: 20 },
  { name: 'Kigali - Nyagatare', value: 12 },
  { name: 'Other', value: 8 },
];

const COMPANY_PERFORMANCE = [
  { name: 'Volcano', onTime: 92, delayed: 8 },
  { name: 'Ritco', onTime: 78, delayed: 22 },
  { name: 'KBS', onTime: 85, delayed: 15 },
  { name: 'Horizon', onTime: 88, delayed: 12 },
  { name: 'Stella', onTime: 95, delayed: 5 },
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#6366F1', '#94A3B8'];

const AnalyticsReports = () => {
  return (
    <div className="space-y-6 font-sans animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">National Analytics & Reports</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Deep insights into passenger trends, company performance, and sector growth.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Calendar className="w-4 h-4 text-emerald-600" /> This Year (2024)
          </button>
          <button className="bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-md flex items-center gap-2">
            <Download className="w-4 h-4" /> Export All Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Passenger Growth Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" /> Passenger Growth
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Monthly Ticket Sales count</p>
            </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PASSENGER_TRENDS} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12, fontWeight: 700}} tickFormatter={(value) => `${value / 1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="passengers" name="Total Passengers" stroke="#10B981" strokeWidth={4} dot={{r: 4, strokeWidth: 2, fill: '#fff'}} activeDot={{r: 6, strokeWidth: 0, fill: '#10B981'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Used Routes (Pie Chart) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-blue-500" /> Most Used Routes
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Ticket distribution</p>
            </div>
          </div>
          <div className="flex-1 min-h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ROUTE_POPULARITY}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {ROUTE_POPULARITY.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                  formatter={(value) => [`${value}%`, 'Market Share']}
                />
                <Legend iconType="circle" wrapperStyle={{fontSize: '12px', fontWeight: 'bold', paddingTop: '20px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Company Performance (Stacked Bar) */}
        <div className="bg-slate-900 rounded-xl shadow-md border border-slate-800 p-6 flex flex-col lg:col-span-2">
           <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-indigo-400" /> Operator Performance Ranking
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">On-time adherence vs Delays (%)</p>
            </div>
          </div>
          <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COMPANY_PERFORMANCE} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                <RechartsTooltip 
                  cursor={{fill: '#1e293b'}}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Legend wrapperStyle={{fontSize: '12px', fontWeight: 'bold', paddingTop: '10px'}} />
                <Bar dataKey="onTime" name="On-Time %" stackId="a" fill="#10B981" radius={[0, 0, 4, 4]} barSize={40} />
                <Bar dataKey="delayed" name="Delayed %" stackId="a" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsReports;
