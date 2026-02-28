import { useState } from 'react';
import { 
  Landmark, Download, Calendar, DollarSign, TrendingUp, Filter, FileSpreadsheet, Building2
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';

const REVENUE_TRENDS = [
  { name: 'Mon', gross: 22.4, tax: 1.12 },
  { name: 'Tue', gross: 24.5, tax: 1.22 },
  { name: 'Wed', gross: 23.8, tax: 1.19 },
  { name: 'Thu', gross: 26.2, tax: 1.31 },
  { name: 'Fri', gross: 32.5, tax: 1.62 },
  { name: 'Sat', gross: 38.4, tax: 1.92 },
  { name: 'Sun', gross: 35.2, tax: 1.76 },
];

const COMPANY_REVENUE = [
  { id: 'C001', name: 'Volcano Express', tickets: 12450, gross: '37,350,000', taxPercent: 5, govShare: '1,867,500', comShare: '35,482,500', status: 'Settled' },
  { id: 'C002', name: 'Ritco', tickets: 15200, gross: '45,600,000', taxPercent: 5, govShare: '2,280,000', comShare: '43,320,000', status: 'Settled' },
  { id: 'C003', name: 'Horizon Express', tickets: 8400, gross: '25,200,000', taxPercent: 5, govShare: '1,260,000', comShare: '23,940,000', status: 'Pending Transfer' },
  { id: 'C004', name: 'Stella Express', tickets: 5600, gross: '16,800,000', taxPercent: 5, govShare: '840,000', comShare: '15,960,000', status: 'Pending Transfer' },
  { id: 'C005', name: 'Capital Express', tickets: 4200, gross: '12,600,000', taxPercent: 5, govShare: '630,000', comShare: '11,970,000', status: 'Settled' },
];

const RevenueMonitoring = () => {
  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pb-5 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
             <Landmark className="w-6 h-6 text-emerald-600" /> Revenue & Tax Control
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Automated taxation models and national gross ticket revenue splitting.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Export Excel
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Download PDF Report
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Gross Ticket Revenue (Today)</p>
            <DollarSign className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-3xl font-black text-slate-800">137.5M <span className="text-xs text-slate-500 font-medium">RWF</span></p>
        </div>
        
        <div className="bg-slate-900 rounded-xl p-5 shadow-sm border border-slate-800 relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10">
             <Landmark className="w-24 h-24 transform translate-x-1/4 -translate-y-1/4 text-white" />
          </div>
          <div className="flex items-center justify-between mb-2 relative z-10">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Govt Tax Processed</p>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-black text-white relative z-10">6.8M <span className="text-xs text-emerald-400 font-medium">RWF</span></p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Company Share (95%)</p>
            <Building2 className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-3xl font-black text-slate-800">130.7M <span className="text-xs text-slate-500 font-medium">RWF</span></p>
        </div>

        <div className="bg-amber-50 rounded-xl p-5 shadow-sm border border-amber-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-amber-700 uppercase tracking-widest">Pending Bank Transfer</p>
            <Calendar className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-3xl font-black text-amber-900">42.1M <span className="text-xs text-amber-700 font-medium">RWF</span></p>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
             <div>
               <h3 className="text-lg font-black text-slate-800">Revenue & Automated Taxation Trend</h3>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">7-Day Trailing Gross Operations (Millions RWF)</p>
             </div>
             <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-lg focus:ring-emerald-500 focus:border-emerald-500 px-3 py-1.5 outline-none">
                <option>Trailing 7 Days</option>
                <option>This Month</option>
                <option>Last Month</option>
             </select>
          </div>
          <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11, fontWeight: 700}} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Legend wrapperStyle={{fontSize: '11px', fontWeight: 'bold', paddingTop: '15px'}} />
                <Bar dataKey="gross" name="Gross Revenue" fill="#94A3B8" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="tax" name="Automatically Collected Tax" fill="#10B981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <div>
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">Daily Revenue Split Ledger</h3>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">Granular company breakdowns for Today</p>
            </div>
            <button className="bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter Records
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-slate-200 text-slate-500 text-xs uppercase tracking-widest">
                  <th className="px-6 py-4 font-black">Transport Operator</th>
                  <th className="px-6 py-4 font-black text-right">Tickets Sold</th>
                  <th className="px-6 py-4 font-black text-right">Gross Generated</th>
                  <th className="px-6 py-4 font-black text-right bg-emerald-50/50">Govt Share (Tax)</th>
                  <th className="px-6 py-4 font-black text-right text-slate-800">Company Share</th>
                  <th className="px-6 py-4 font-black text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPANY_REVENUE.map((company) => (
                  <tr key={company.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {company.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{company.name}</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{company.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-bold text-slate-700">{company.tickets.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-black text-slate-900">{company.gross} <span className="text-[10px] font-bold text-slate-500">RWF</span></span>
                    </td>
                    <td className="px-6 py-4 text-right bg-emerald-50/30">
                      <span className="text-sm font-black text-emerald-600">{company.govShare} <span className="text-[10px] font-bold text-emerald-400">RWF</span></span>
                      <p className="text-[10px] font-bold text-emerald-500 uppercase">({company.taxPercent}% Deduction)</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-black text-slate-800">{company.comShare} <span className="text-[10px] font-bold text-slate-500">RWF</span></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {company.status === 'Settled' ? (
                         <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider rounded border border-slate-200">
                           Auto-Settled
                         </span>
                      ) : (
                         <span className="inline-flex items-center px-2 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-wider rounded border border-amber-200">
                           Pending Bank Transfer
                         </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-center">
            <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 underline">View Full Audit Ledger</button>
          </div>
        </div>

    </div>
  );
};

export default RevenueMonitoring;
