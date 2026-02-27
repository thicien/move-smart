import { useState } from 'react';
import { 
  ShieldAlert, AlertTriangle, AlertCircle, Clock, NavigationOff, Zap, MapPin, Search, Filter, CheckCircle2, FileWarning
} from 'lucide-react';

const VIOLATIONS = [
  { id: 'V-8910', busId: 'RAD 424 A', company: 'Volcano Express', driver: 'John Nsengimana', type: 'Speed Violation', detail: '85 km/h in 60 km/h zone', time: '10 mins ago', fine: '50,000 RWF', severity: 'High', status: 'Pending' },
  { id: 'V-8909', busId: 'RAC 911 E', company: 'Ritco', driver: 'Eric Mugisha', type: 'Late Departure', detail: 'Departed 45 mins late', time: '2 hrs ago', fine: '20,000 RWF', severity: 'Medium', status: 'Pending' },
  { id: 'V-8908', busId: 'RAB 102 C', company: 'Horizon Express', driver: 'Paul Kagabo', type: 'Route Deviation', detail: 'Off approved KGL-HUY path', time: '5 hrs ago', fine: '100,000 RWF', severity: 'Critical', status: 'Issued' },
  { id: 'V-8907', busId: 'RAF 882 K', company: 'Kigali Bus Services', driver: 'Grace Umutoni', type: 'GPS Offline', detail: 'No telemetry for 30 mins', time: '1 day ago', fine: '10,000 RWF', severity: 'Low', status: 'Resolved' },
  { id: 'V-8906', busId: 'RAG 551 D', company: 'Stella Express', driver: 'David Muneza', type: 'Overbooking', detail: '42 passengers on 38 capacity', time: '2 days ago', fine: '200,000 RWF', severity: 'Critical', status: 'Issued' },
];

const ViolationIcon = ({ type }) => {
  switch (type) {
    case 'Speed Violation': return <div className="p-2 bg-red-100 rounded-lg"><Zap className="w-5 h-5 text-red-600" /></div>;
    case 'Late Departure': return <div className="p-2 bg-amber-100 rounded-lg"><Clock className="w-5 h-5 text-amber-600" /></div>;
    case 'Route Deviation': return <div className="p-2 bg-purple-100 rounded-lg"><MapPin className="w-5 h-5 text-purple-600" /></div>;
    case 'GPS Offline': return <div className="p-2 bg-slate-200 rounded-lg"><NavigationOff className="w-5 h-5 text-slate-600" /></div>;
    case 'Overbooking': return <div className="p-2 bg-rose-100 rounded-lg"><AlertTriangle className="w-5 h-5 text-rose-600" /></div>;
    default: return <div className="p-2 bg-gray-100 rounded-lg"><AlertCircle className="w-5 h-5 text-gray-600" /></div>;
  }
};

const ComplianceViolations = () => {
  return (
    <div className="space-y-6 font-sans animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Compliance & Violations</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Automated detection of transport infractions and regulatory enforcement.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter Rules
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-md flex items-center gap-2 border border-red-800">
            <FileWarning className="w-4 h-4" /> Issue Manual Fine
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="bg-red-50 p-3 rounded-xl border border-red-100">
            <ShieldAlert className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-xl font-black text-slate-800">142</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Offenses</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-xl font-black text-slate-800">85</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Review</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-xl font-black text-slate-800">1,204</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Resolved (YTD)</p>
          </div>
        </div>
        <div className="bg-slate-900 rounded-xl p-4 shadow-md border border-slate-800 flex items-center gap-4">
          <div className="bg-emerald-500/20 p-3 rounded-xl border border-emerald-500/30">
            <AlertCircle className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-xl font-black text-white">12.5M <span className="text-xs font-semibold text-emerald-400">RWF</span></p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Fines Collected</p>
          </div>
        </div>
      </div>

      {/* Main Violations List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-slate-50">
          <div className="relative w-64 md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Bus ID or Driver..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-lg px-3 py-2 outline-none">
              <option>All Severities</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {VIOLATIONS.map((violation, idx) => (
            <div key={idx} className="p-5 hover:bg-slate-50/50 transition-colors flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              
              {/* Type & Severity */}
              <div className="flex flex-1 items-start gap-4 min-w-[300px]">
                <ViolationIcon type={violation.type} />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-800 text-base">{violation.type}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      violation.severity === 'Critical' ? 'bg-red-600 text-white' :
                      violation.severity === 'High' ? 'bg-red-100 text-red-700' :
                      violation.severity === 'Medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {violation.severity}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-600">{violation.detail}</p>
                  <p className="text-xs font-bold text-slate-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Detected {violation.time}
                  </p>
                </div>
              </div>

              {/* Entity Details */}
              <div className="flex-1 grid grid-cols-2 gap-4 text-sm min-w-[250px]">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Vehicle & operator</p>
                  <p className="font-bold text-slate-800">{violation.busId}</p>
                  <p className="text-slate-600">{violation.company}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Driver</p>
                  <p className="font-bold text-slate-800">{violation.driver}</p>
                  <p className="text-slate-500 text-xs">ID: {1000 + idx}</p>
                </div>
              </div>

              {/* Fine & Status */}
              <div className="flex flex-row lg:flex-col justify-between items-center lg:items-end w-full lg:w-48 gap-4 lg:gap-2 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6">
                <div className="text-left lg:text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Penalty Fine</p>
                  <p className="font-black text-slate-800 text-lg">{violation.fine}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border ${
                    violation.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    violation.status === 'Issued' ? 'bg-red-50 text-red-700 border-red-200' :
                    'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {violation.status}
                  </span>
                  {violation.status === 'Pending' && (
                    <button className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1 rounded text-xs font-bold transition-colors shadow shadow-slate-900/20">
                      Issue Fine
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-100 bg-slate-50 text-xs text-slate-500 flex justify-center font-bold">
          <button className="hover:text-red-600 transition-colors uppercase tracking-wider">View Older Violations...</button>
        </div>
      </div>
    </div>
  );
};

export default ComplianceViolations;
