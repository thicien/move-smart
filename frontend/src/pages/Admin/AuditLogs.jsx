import { useState } from 'react';
import { 
  ClipboardList, Search, Filter, ShieldCheck, User, CalendarClock
} from 'lucide-react';

const MOCK_AUDIT = [
  { id: 'LOG-91024', timestamp: '2023-10-24 16:45:12', user: 'Admin User (Govt)', action: 'UPDATE_BASE_TAX', details: 'Changed national tax rate from 4.5% to 5.0%', ip: '197.243.22.1' },
  { id: 'LOG-91023', timestamp: '2023-10-24 14:12:05', user: 'System Automated', action: 'VIOLATION_GENERATED', details: 'Auto-issued 100K RWF fine to Horizon Express (RAB 102 C) for Major Route Deviation', ip: 'internal' },
  { id: 'LOG-91022', timestamp: '2023-10-24 09:30:00', user: 'Finance Dept', action: 'REVENUE_EXPORT', details: 'Exported Q3 2023 National Revenue Report', ip: '197.243.22.45' },
  { id: 'LOG-91021', timestamp: '2023-10-23 18:20:11', user: 'Admin User (Govt)', action: 'SUSPEND_COMPANY', details: 'Suspended operating license for Kigali Bus Services', ip: '197.243.22.1' },
  { id: 'LOG-91020', timestamp: '2023-10-23 11:15:44', user: 'Admin User (Govt)', action: 'REGISTER_COMPANY', details: 'Approved system access for new operator: Stella Express', ip: '197.243.22.1' },
  { id: 'LOG-91019', timestamp: '2023-10-22 15:40:22', user: 'System Automated', action: 'API_SYNC_FAILED', details: 'Payment gateway timeout during settlement batch 442', ip: 'internal' },
];

const AuditLogs = () => {
  return (
    <div className="space-y-6 font-sans animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" /> Immutable System Audit Logs
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Read-only historical trace of all critical actions and automated system events.</p>
        </div>
        <div className="flex items-center gap-3 border border-red-200 bg-red-50 text-red-700 px-4 py-2 rounded-lg text-xs font-bold shadow-inner">
          <CalendarClock className="w-4 h-4 text-red-600" /> Tamper Evident Tracing Active
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-slate-50">
          <div className="relative w-64 md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search trace ID, or IP..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" /> Filter Events
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Trace ID / Time</th>
                <th className="px-6 py-4">Actor</th>
                <th className="px-6 py-4">Event Context</th>
                <th className="px-6 py-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {MOCK_AUDIT.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-mono text-xs font-bold text-slate-700">{log.id}</p>
                    <p className="text-[11px] font-bold text-slate-400 mt-1">{log.timestamp}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className={`w-4 h-4 ${log.user.includes('System') ? 'text-amber-500' : 'text-emerald-600'}`} />
                      <div>
                        <p className="font-bold text-slate-800">{log.user}</p>
                        <p className="text-[10px] font-mono text-slate-400 uppercase">IP: {log.ip}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 border border-slate-200 text-slate-600 font-bold text-[10px] px-2 py-1 rounded-full tracking-widest uppercase">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium whitespace-normal min-w-[300px]">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-100 bg-slate-50 text-xs text-slate-500 flex justify-between items-center font-bold">
           <span>Showing continuous log block. Checksum: <span className="font-mono text-slate-400 ml-1">SHA256:8F4B...99A1</span></span>
           <div className="flex gap-2">
             <button disabled className="px-3 py-1 bg-white border border-gray-200 rounded text-slate-400">Previous</button>
             <button className="px-3 py-1 bg-white border border-gray-200 rounded text-slate-700 hover:bg-slate-100">Next Page</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
