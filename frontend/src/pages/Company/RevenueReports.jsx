import { useState } from 'react';
import { 
  Download, Filter, Calendar, TrendingUp, DollarSign, 
  CreditCard, PieChart, BarChart2, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, Legend
} from 'recharts';

const WEEKLY_DATA = [
  { name: 'Mon', revenue: 450000 },
  { name: 'Tue', revenue: 520000 },
  { name: 'Wed', revenue: 480000 },
  { name: 'Thu', revenue: 610000 },
  { name: 'Fri', revenue: 850000 },
  { name: 'Sat', revenue: 950000 },
  { name: 'Sun', revenue: 890000 },
];

const ROUTE_PERFORMANCE = [
  { name: 'KGL - RSZ', value: 45, color: '#F97316' },  // Orange
  { name: 'KGL - RBV', value: 30, color: '#3B82F6' },  // Blue
  { name: 'KGL - HYE', value: 15, color: '#10B981' },  // Emerald
  { name: 'Other', value: 10, color: '#64748B' },      // Slate
];

const RECENT_TRANSACTIONS = [
  { id: 'TRX-101', date: 'Oct 24, 14:30', amount: 'RWF 15,000', method: 'Tap&Go', status: 'Settled' },
  { id: 'TRX-102', date: 'Oct 24, 15:15', amount: 'RWF 9,000', method: 'MTN MoMo', status: 'Processing' },
  { id: 'TRX-103', date: 'Oct 24, 16:00', amount: 'RWF 45,000', method: 'Bank Transfer', status: 'Settled' },
  { id: 'TRX-104', date: 'Oct 24, 16:45', amount: 'RWF 3,000', method: 'Cash (Agent)', status: 'Settled' },
];

const RevenueReports = () => {
  const [dateRange, setDateRange] = useState('This Week');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Financial Analytics</h2>
          <p className="text-gray-500 text-sm mt-1">Track revenue, tax withholdings, and route profitability.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors text-sm font-semibold shadow-sm outline-none"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Quarter</option>
          </select>
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-colors">
            <Download className="w-4 h-4" /> Export Financials
          </button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute right-0 top-0 opacity-5 group-hover:opacity-10 transition-opacity">
            <DollarSign className="w-32 h-32 transform translate-x-1/4 -translate-y-1/4" />
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100">
              <DollarSign className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md flex items-center gap-1">
               <TrendingUp className="w-3 h-3" /> +14%
            </span>
          </div>
          <span className="text-gray-500 text-sm font-semibold mb-1 block relative z-10">Gross Revenue</span>
          <span className="text-3xl font-black text-gray-800 relative z-10">4.75M <span className="text-sm text-gray-400 font-bold tracking-tight">RWF</span></span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
              <BarChart2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <span className="text-gray-500 text-sm font-semibold mb-1 block relative z-10">Net Company Share (95%)</span>
          <span className="text-3xl font-black text-gray-800 relative z-10">4.51M <span className="text-sm text-gray-400 font-bold tracking-tight">RWF</span></span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group border-l-4 border-l-slate-800">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
              <PieChart className="w-6 h-6 text-slate-700" />
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-1 rounded-md">Regulator</span>
          </div>
          <span className="text-gray-500 text-sm font-semibold mb-1 block relative z-10">Gov Tax Deducted (5%)</span>
          <span className="text-3xl font-black text-slate-800 relative z-10">237K <span className="text-sm text-slate-400 font-bold tracking-tight">RWF</span></span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
              <CreditCard className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <span className="text-gray-500 text-sm font-semibold mb-1 block relative z-10">Avg. Ticket Value</span>
          <span className="text-3xl font-black text-gray-800 relative z-10">3,850 <span className="text-sm text-gray-400 font-bold tracking-tight">RWF</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Revenue Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Weekly Performance</h3>
              <p className="text-sm text-gray-500">Gross daily income for the current week</p>
            </div>
          </div>
          <div className="flex-1 min-h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value / 1000}k`} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <RechartsTooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="revenue" fill="#F97316" radius={[6, 6, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Route Profitability Donut Chart */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Route Profitability</h3>
            <p className="text-sm text-gray-500">Revenue distribution by route</p>
          </div>
          <div className="flex-1 min-h-[300px] w-full flex flex-col items-center justify-center -mt-4">
            <ResponsiveContainer width="100%" height={240}>
              <RechartsPie>
                <Pie
                  data={ROUTE_PERFORMANCE}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {ROUTE_PERFORMANCE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`${value}%`, 'Share']}
                />
              </RechartsPie>
            </ResponsiveContainer>
            
            <div className="w-full grid grid-cols-2 gap-y-3 gap-x-2 mt-2 px-2">
              {ROUTE_PERFORMANCE.map((route) => (
                <div key={route.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: route.color }}></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700 truncate">{route.name}</span>
                    <span className="text-xs text-slate-500 font-medium">{route.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Settlements Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-800">Recent Gateway Settlements</h3>
          <button className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors">
            View All Transactions →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Payment Method</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Clearance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {RECENT_TRANSACTIONS.map((trx) => (
                <tr key={trx.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm font-semibold text-slate-700">{trx.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">{trx.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                      {trx.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-800">{trx.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {trx.status === 'Settled' ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                        <CheckCircle2 className="w-4 h-4" /> Settled
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600">
                        <AlertCircle className="w-4 h-4" /> Processing
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default RevenueReports;
