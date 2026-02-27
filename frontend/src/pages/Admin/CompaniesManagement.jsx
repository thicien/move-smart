import { useState } from 'react';
import { 
  Building2, Search, Filter, MoreVertical, Eye, AlertTriangle, ShieldOff, CheckCircle2, XCircle
} from 'lucide-react';

const MOCK_COMPANIES = [
  { id: 1, name: 'Volcano Express', buses: 45, routes: 12, revenue: '14.5M RWF', tax: '725K RWF', score: 98, status: 'Active' },
  { id: 2, name: 'Horizon Express', buses: 32, routes: 8, revenue: '9.2M RWF', tax: '460K RWF', score: 92, status: 'Active' },
  { id: 3, name: 'Ritco', buses: 85, routes: 34, revenue: '28.4M RWF', tax: '1.42M RWF', score: 85, status: 'Warning' },
  { id: 4, name: 'Kigali Bus Services', buses: 112, routes: 22, revenue: '35.1M RWF', tax: '1.75M RWF', score: 72, status: 'Suspended' },
  { id: 5, name: 'Stella Express', buses: 18, routes: 4, revenue: '4.8M RWF', tax: '240K RWF', score: 95, status: 'Active' },
];

const CompaniesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="space-y-6 font-sans animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Companies Management</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Oversight and regulatory control of registered transport operators.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition-colors flex items-center gap-2 border border-emerald-700">
          <Building2 className="w-4 h-4" /> Register New Operator
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by company name or VAT number..." 
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter Status
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-gray-200 text-slate-500 font-bold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Operator Name</th>
                <th className="px-6 py-4 text-center">Fleet Size</th>
                <th className="px-6 py-4 text-center">Active Routes</th>
                <th className="px-6 py-4 text-right">Monthly Rev.</th>
                <th className="px-6 py-4 text-right">Gov. Tax (5%)</th>
                <th className="px-6 py-4 text-center">Compliance</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_COMPANIES.map((company) => (
                <tr key={company.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-600 font-bold text-xs">
                        {company.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{company.name}</p>
                        <p className="text-xs text-slate-500">ID: TIN-{100000000 + company.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-semibold text-slate-700">{company.buses}</td>
                  <td className="px-6 py-4 text-center font-semibold text-slate-700">{company.routes}</td>
                  <td className="px-6 py-4 text-right font-black text-slate-800">{company.revenue}</td>
                  <td className="px-6 py-4 text-right font-black text-emerald-600 bg-emerald-50/30">{company.tax}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${company.score >= 90 ? 'bg-emerald-500' : company.score >= 80 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${company.score}%` }}
                        ></div>
                      </div>
                      <span className={`font-bold text-xs ${company.score >= 90 ? 'text-emerald-700' : company.score >= 80 ? 'text-amber-700' : 'text-red-700'}`}>
                        {company.score}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold border ${
                      company.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      company.status === 'Warning' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {company.status === 'Active' && <CheckCircle2 className="w-3 h-3" />}
                      {company.status === 'Warning' && <AlertTriangle className="w-3 h-3" />}
                      {company.status === 'Suspended' && <XCircle className="w-3 h-3" />}
                      {company.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:bg-white hover:text-blue-600 rounded-md border border-transparent hover:border-slate-200 shadow-sm transition-all" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:bg-white hover:text-amber-600 rounded-md border border-transparent hover:border-slate-200 shadow-sm transition-all" title="Issue Warning">
                        <AlertTriangle className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-md border border-transparent hover:border-red-200 shadow-sm transition-all" title="Suspend License">
                        <ShieldOff className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 bg-slate-50 text-xs text-slate-500 flex justify-between items-center font-medium">
          <span>Showing 1 to 5 of 24 operators</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 bg-white rounded hover:bg-gray-50 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-gray-200 bg-white rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesManagement;
