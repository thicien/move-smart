import { useState } from 'react';
import { 
  FileText, Download, Calendar, Filter, FileSpreadsheet, ShieldAlert,
  Landmark, Activity, CheckCircle2, Copy
} from 'lucide-react';

const REPORTS_HISTORY = [
  { id: 'REP-2024-001', name: 'National Fleet Status Overview', type: 'PDF', date: 'Oct 24, 2024', generatedBy: 'Gov System Auto' },
  { id: 'REP-2024-002', name: 'Weekly Revenue & Tax Ledger', type: 'CSV', date: 'Oct 23, 2024', generatedBy: 'System Admin' },
  { id: 'REP-2024-003', name: 'Q3 Congestion & Delay Matrix', type: 'PDF', date: 'Oct 01, 2024', generatedBy: 'Transport Regulator' },
  { id: 'REP-2024-004', name: 'Operator Violation Audit', type: 'CSV', date: 'Sep 28, 2024', generatedBy: 'Compliance Dept' },
];

const ReportsExports = () => {
  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pb-5 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-slate-600" /> Data Extracts & Governance Reports
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Generate official transport documentation and financial ledgers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
         
         {/* Generator Panel */}
         <div className="lg:col-span-2 space-y-6 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="mb-4">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <Filter className="w-5 h-5 text-indigo-500" /> Generate New Report
              </h3>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Select Domain & Parameters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
               
               {/* Type 1 */}
               <div className="border-2 border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-xl p-4 cursor-pointer transition-colors group focus:border-indigo-500 relative overflow-hidden">
                 <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500">
                    <CheckCircle2 className="w-5 h-5" />
                 </div>
                 <Activity className="w-8 h-8 text-sky-500 mb-3" />
                 <h4 className="font-black text-slate-800">National Status</h4>
                 <p className="text-xs text-slate-500 font-medium mt-1">Fleet size, route health, active operators.</p>
               </div>

               {/* Type 2 */}
               <div className="border-2 border-emerald-500 bg-emerald-50 rounded-xl p-4 cursor-pointer relative overflow-hidden shadow-sm">
                 <div className="absolute top-2 right-2 text-emerald-500">
                    <CheckCircle2 className="w-5 h-5" />
                 </div>
                 <Landmark className="w-8 h-8 text-emerald-600 mb-3" />
                 <h4 className="font-black text-emerald-900">Revenue Ledger</h4>
                 <p className="text-xs text-emerald-700 font-medium mt-1">Gross sales, tax fractions, operator splits.</p>
               </div>

               {/* Type 3 */}
               <div className="border-2 border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-xl p-4 cursor-pointer transition-colors group">
                 <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500">
                    <CheckCircle2 className="w-5 h-5" />
                 </div>
                 <ShieldAlert className="w-8 h-8 text-red-500 mb-3" />
                 <h4 className="font-black text-slate-800">Violation Audit</h4>
                 <p className="text-xs text-slate-500 font-medium mt-1">Algorithmic delays, speeding fines, deviations.</p>
               </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
               <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" /> Start Range
                  </label>
                  <input type="date" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-500" />
               </div>
               <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" /> End Range
                  </label>
                  <input type="date" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-500" />
               </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-slate-100">
              <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-black tracking-wide shadow-md transition-colors flex items-center justify-center gap-2">
                 <FileText className="w-5 h-5" /> Generate PDF Deck
              </button>
              <button className="flex-1 bg-white border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 py-3 rounded-lg font-black tracking-wide shadow-sm transition-colors flex items-center justify-center gap-2">
                 <FileSpreadsheet className="w-5 h-5 text-emerald-600" /> Export CSV Data
              </button>
            </div>
         </div>

         {/* History Sidebar */}
         <div className="bg-slate-900 rounded-xl shadow-md border border-slate-800 text-white flex flex-col">
            <div className="p-5 border-b border-slate-800">
               <h3 className="text-lg font-black">Generation Queue</h3>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Recent Data Extracts</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2">
               {REPORTS_HISTORY.map(report => (
                 <div key={report.id} className="p-3 bg-slate-800/50 hover:bg-slate-800 border-b border-slate-800/50 transition-colors flex items-center justify-between group">
                    <div>
                       <div className="flex items-center gap-2">
                          {report.type === 'PDF' ? (
                            <FileText className="w-4 h-4 text-red-400" />
                          ) : (
                            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                          )}
                          <p className="text-sm font-bold leading-tight line-clamp-1">{report.name}</p>
                       </div>
                       <p className="text-[10px] text-slate-400 font-mono mt-1">{report.id} • {report.date}</p>
                    </div>
                    <button className="text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-slate-700 rounded-lg">
                       <Download className="w-4 h-4" />
                    </button>
                 </div>
               ))}
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 text-center">
               <button className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest flex items-center gap-2 mx-auto">
                 <Copy className="w-3.5 h-3.5" /> Access Full Archive
               </button>
            </div>
         </div>

      </div>

    </div>
  );
};

export default ReportsExports;
