import { useState } from 'react';
import { 
  Building2, Search, Filter, ShieldAlert, CheckCircle2, AlertTriangle, 
  Map, Bus, Clock, FileWarning, Eye
} from 'lucide-react';

const COMPANY_STATS = [
  { 
    id: 'C001', name: 'Volcano Express', regNo: 'RWF-2023-VLC', routes: 12, buses: 145, 
    tickets: 12450, delayRate: '4.2%', complaints: 3, status: 'Compliant' 
  },
  { 
    id: 'C002', name: 'Ritco', regNo: 'RWF-1998-RTC', routes: 24, buses: 210, 
    tickets: 15200, delayRate: '8.5%', complaints: 12, status: 'Warning' 
  },
  { 
    id: 'C004', name: 'Stella Express', regNo: 'RWF-2015-STL', routes: 6, buses: 54, 
    tickets: 5600, delayRate: '15.2%', complaints: 24, status: 'Violation' 
  },
  { 
    id: 'C003', name: 'Horizon Express', regNo: 'RWF-2012-HRZ', routes: 8, buses: 92, 
    tickets: 8400, delayRate: '2.1%', complaints: 1, status: 'Compliant' 
  },
  { 
    id: 'C005', name: 'Capital Express', regNo: 'RWF-2018-CPT', routes: 5, buses: 48, 
    tickets: 4200, delayRate: '5.8%', complaints: 4, status: 'Compliant' 
  },
];

const CompanyPerformance = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Compliant':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-widest rounded border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Compliant
          </span>
        );
      case 'Warning':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-black uppercase tracking-widest rounded border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5" /> Warning
          </span>
        );
      case 'Violation':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 text-xs font-black uppercase tracking-widest rounded border border-red-200">
             <ShieldAlert className="w-3.5 h-3.5" /> Violation
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pb-5 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-600" /> Operator Performance Oversight
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Monitor active fleet capacity, delay rates, and enforce regulatory compliance.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Find company by name or registration..." 
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 bg-slate-50 focus:outline-none focus:border-indigo-500">
             <option>All Operators</option>
             <option>Violations Only</option>
             <option>Warnings Only</option>
             <option>Top Performers</option>
          </select>
          <button className="bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
             <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      {/* Companies Grid View / Table View Hybrid (Using a robust table for gov data) */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-slate-300 text-[11px] uppercase tracking-widest">
                <th className="px-6 py-4 font-black">Transport Entity</th>
                <th className="px-6 py-4 font-black">Capacity Metrics</th>
                <th className="px-6 py-4 font-black">Service Quality</th>
                <th className="px-6 py-4 font-black text-center">Compliance Status</th>
                <th className="px-6 py-4 font-black text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {COMPANY_STATS.map((company) => (
                <tr key={company.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-3">
                       <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-bold shrink-0">
                         {company.name.charAt(0)}
                       </div>
                       <div>
                         <p className="text-base font-black text-slate-900 leading-tight">{company.name}</p>
                         <p className="text-[10px] font-bold text-slate-500 font-mono mt-0.5">{company.regNo}</p>
                       </div>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Map className="w-4 h-4 text-slate-400" />
                        <span className="font-black text-slate-800">{company.routes}</span>
                        <span className="text-xs font-bold text-slate-500 uppercase">Active Routes</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Bus className="w-4 h-4 text-slate-400" />
                        <span className="font-black text-slate-800">{company.buses}</span>
                        <span className="text-xs font-bold text-slate-500 uppercase">Fleet Size</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                       <div className="flex items-center gap-2 text-sm">
                          <Clock className={`w-4 h-4 ${parseFloat(company.delayRate) > 10 ? 'text-red-500' : parseFloat(company.delayRate) > 5 ? 'text-amber-500' : 'text-emerald-500'}`} />
                          <span className="font-black text-slate-800">{company.delayRate}</span>
                          <span className="text-xs font-bold text-slate-500 uppercase">Avg Delay</span>
                       </div>
                       <div className="flex items-center gap-2 text-sm">
                          <FileWarning className={`w-4 h-4 ${company.complaints > 10 ? 'text-red-500' : 'text-slate-400'}`} />
                          <span className="font-black text-slate-800">{company.complaints}</span>
                          <span className="text-xs font-bold text-slate-500 uppercase">Complaints</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {getStatusBadge(company.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-200 rounded-lg transition-colors inline-flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100">
                      <Eye className="w-4 h-4" /> Audit Operator
                    </button>
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

export default CompanyPerformance;
