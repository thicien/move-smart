import { useState } from 'react';
import { 
  Landmark, Download, Calendar, DollarSign, TrendingUp, Filter, FileSpreadsheet, Building2 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

const MONTHLY_REVENUE = [
  { name: 'Jan', gross: 250, tax: 12.5 },
  { name: 'Feb', gross: 280, tax: 14.0 },
  { name: 'Mar', gross: 310, tax: 15.5 },
  { name: 'Apr', gross: 290, tax: 14.5 },
  { name: 'May', gross: 350, tax: 17.5 },
  { name: 'Jun', gross: 420, tax: 21.0 },
];

const COMPANY_TAX = [
  { name: 'Volcano Exp', tax: 8.5 },
  { name: 'Ritco', tax: 14.2 },
  { name: 'KBS', tax: 9.8 },
  { name: 'Horizon', tax: 6.4 },
  { name: 'Stella Exp', tax: 3.1 },
];

const MOCK_AUDIT = [
  { id: 'TX-9921', date: '2023-10-24 14:30', company: 'Ritco', route: 'KGL-MUS', gross: '5,000 RWF', tax: '250 RWF', status: 'Collected' },
  { id: 'TX-9922', date: '2023-10-24 14:32', company: 'Volcano Express', route: 'KGL-RUB', gross: '4,500 RWF', tax: '225 RWF', status: 'Collected' },
  { id: 'TX-9923', date: '2023-10-24 14:35', company: 'Kigali Bus Services', route: 'KGL-NYA', gross: '1,000 RWF', tax: '50 RWF', status: 'Pending' },
  { id: 'TX-9924', date: '2023-10-24 14:40', company: 'Horizon Express', route: 'KGL-HUY', gross: '3,500 RWF', tax: '175 RWF', status: 'Collected' },
  { id: 'TX-9925', date: '2023-10-24 14:45', company: 'Ritco', route: 'KGL-MUS', gross: '5,000 RWF', tax: '250 RWF', status: 'Voided' },
];

const RevenueControl = () => {
  return (
    <div className="space-y-6 font-sans animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Revenue & Tax Control</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Automated Transport Tax Calculation (5% Base) and Financial Audits.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Export Excel
          </button>
          <button className="bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-md flex items-center gap-2">
            <Download className="w-4 h-4" /> Download PDF Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-emerald-600 rounded-xl p-6 shadow-md border border-emerald-700 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10">
            <DollarSign className="w-32 h-32 transform translate-x-1/4 -translate-y-1/4 text-white" />
          </div>
          <p className="text-emerald-100 text-sm font-bold uppercase tracking-wider mb-2 relative z-10">Daily Gov Revenue</p>
          <div className="flex items-end gap-2 relative z-10">
            <span className="text-3xl font-black leading-none">8.5M <span className="text-lg">RWF</span></span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Weekly Revenue</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-black text-slate-800">54.2M <span className="text-sm">RWF</span></span>
            <span className="text-xs font-bold text-emerald-500 flex items-center mb-1"><TrendingUp className="w-3 h-3 mr-1"/> 12%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Monthly Revenue</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-black text-slate-800">242.8M <span className="text-sm">RWF</span></span>
            <span className="text-xs font-bold text-emerald-500 flex items-center mb-1"><TrendingUp className="w-3 h-3 mr-1"/> 8%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Annual Revenue (YTD)</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-black text-slate-800">1.84B <span className="text-sm">RWF</span></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Tax Trend */}
        <div className="col-span-1 lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-slate-800">Government Tax Growth (Millions RWF)</h3>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-bold text-slate-600 hover:bg-slate-100">
              <Calendar className="w-3 h-3" /> 2023
            </button>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_REVENUE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="taxGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12, fontWeight: 700}} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0F172A', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="tax" name="Tax Collected (M)" stroke="#10B981" strokeWidth={4} fillOpacity={1} fill="url(#taxGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tax by Company */}
        <div className="bg-slate-900 text-white rounded-xl shadow-md border border-slate-800 p-6 flex flex-col">
          <h3 className="text-lg font-black mb-6 flex items-center gap-2"><Building2 className="w-5 h-5 text-emerald-500" /> Tax by Company (M RWF)</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COMPANY_TAX} layout="vertical" margin={{ top: 0, right: 10, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#1e293b" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} width={80} />
                <RechartsTooltip 
                  cursor={{fill: '#1e293b'}}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#34d399', fontWeight: 'bold' }}
                />
                <Bar dataKey="tax" radius={[0, 4, 4, 0]} barSize={20}>
                  {COMPANY_TAX.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={'#34d399'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Payment Audit Logs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><Landmark className="w-5 h-5 text-slate-500" /> Tax Payment Audit Log</h3>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-3 h-3" /> Filter Range
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-gray-100 text-slate-400 font-bold text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Operator</th>
                <th className="px-6 py-4 text-center">Route Segment</th>
                <th className="px-6 py-4 text-right">Ticket Gross</th>
                <th className="px-6 py-4 text-right font-black text-slate-700">Gov Tax (5%)</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_AUDIT.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-slate-500 font-bold">{log.id}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{log.date}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">{log.company}</td>
                  <td className="px-6 py-4 text-center text-slate-600 font-medium">{log.route}</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-700">{log.gross}</td>
                  <td className="px-6 py-4 text-right font-black text-emerald-600 bg-emerald-50/20">{log.tax}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center justify-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                      log.status === 'Collected' ? 'bg-emerald-100 text-emerald-700' :
                      log.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 bg-slate-50 text-xs text-slate-500 flex justify-center font-bold">
          <button className="hover:text-emerald-600 transition-colors uppercase tracking-wider">Load More Records...</button>
        </div>
      </div>

    </div>
  );
};

export default RevenueControl;
