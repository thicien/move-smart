import { useState } from 'react';
import { 
  ShieldAlert, AlertTriangle, Search, Filter, Clock, MapPin, FastForward, CheckCircle2, FileWarning
} from 'lucide-react';

const MOCK_VIOLATIONS = [
  { id: 'V-1049', type: 'Late Departure', severity: 'Low', bus: 'RAB 123A', company: 'Volcano Express', time: '14:20 PM', details: '+25 mins late leaving Kigali Bus Park', status: 'Pending Review' },
  { id: 'V-1050', type: 'Speed Violation', severity: 'Critical', bus: 'RAC 456B', company: 'Ritco', time: '14:05 PM', details: '98 km/h on 60 km/h zone (Kigali-Huye Highway)', status: 'Fine Issued' },
  { id: 'V-1051', type: 'Route Deviation', severity: 'High', bus: 'RAD 789C', company: 'Horizon Express', time: '13:45 PM', details: 'Off official corridor for >3km. Suspected unauthorized stop.', status: 'Investigating' },
  { id: 'V-1052', type: 'Late Arrival', severity: 'Medium', bus: 'RAE 101D', company: 'Capital Express', time: '13:10 PM', details: '+45 mins late arriving at Rubavu Terminal', status: 'Warning Sent' },
  { id: 'V-1053', type: 'Speed Violation', severity: 'Critical', bus: 'RAF 202E', company: 'Stella Express', time: '12:30 PM', details: '105 km/h on 80 km/h zone', status: 'Pending Review' },
];

const DelayViolation = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getSeverityBadge = (severity) => {
    switch(severity) {
      case 'Critical':
        return <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-widest rounded border border-red-200">Critical</span>;
      case 'High':
        return <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-700 text-[10px] font-black uppercase tracking-widest rounded border border-orange-200">High</span>;
      case 'Medium':
        return <span className="inline-flex items-center px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded border border-amber-200">Medium</span>;
      case 'Low':
        return <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-widest rounded border border-slate-200">Low</span>;
      default:
        return null;
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'Late Departure':
      case 'Late Arrival':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'Speed Violation':
        return <FastForward className="w-5 h-5 text-red-500" />;
      case 'Route Deviation':
        return <MapPin className="w-5 h-5 text-orange-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pb-5 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-red-600" /> Automated Delay & Violation Feed
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Algorithmic detection of timetable breaches and GPS telemetry violations.</p>
        </div>
      </div>

      {/* 4 KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-red-50 rounded-xl p-5 shadow-sm border border-red-200">
          <div className="flex items-center justify-between mb-2">
             <div className="p-2 bg-red-100 rounded-lg text-red-600">
               <ShieldAlert className="w-4 h-4" />
             </div>
             <span className="text-xs font-bold text-red-700 uppercase tracking-widest">Active Critical</span>
          </div>
          <p className="text-3xl font-black text-red-900 leading-none mt-2">12</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
             <div className="p-2 bg-amber-50 rounded-lg text-amber-600 border border-amber-100">
               <Clock className="w-4 h-4" />
             </div>
             <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Avg Delay</span>
          </div>
          <p className="text-3xl font-black text-slate-800 leading-none mt-2">18<span className="text-sm text-slate-400 font-bold">m</span></p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
             <div className="p-2 bg-orange-50 rounded-lg text-orange-600 border border-orange-100">
               <MapPin className="w-4 h-4" />
             </div>
             <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Route Breaches</span>
          </div>
          <p className="text-3xl font-black text-slate-800 leading-none mt-2">4</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
             <div className="p-2 bg-blue-50 rounded-lg text-blue-600 border border-blue-100">
               <FastForward className="w-4 h-4" />
             </div>
             <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Speed Arrests</span>
          </div>
          <p className="text-3xl font-black text-slate-800 leading-none mt-2">24</p>
        </div>

      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search incident by Plate or Company..." 
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium text-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 bg-slate-50 focus:outline-none focus:border-red-500">
             <option>All Incident Types</option>
             <option>Speed Violations</option>
             <option>Route Deviations</option>
             <option>Schedule Delays</option>
          </select>
          <button className="bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
             <Filter className="w-4 h-4" /> Filter Pending
          </button>
        </div>
      </div>

      {/* Violation Feed / Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
           <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Live Incident Log</h3>
           <span className="text-xs font-bold text-slate-500">Auto-refreshing...</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-200 text-slate-400 text-[10px] uppercase tracking-widest">
                <th className="px-6 py-4 font-black">Time & Type</th>
                <th className="px-6 py-4 font-black">Operator Target</th>
                <th className="px-6 py-4 font-black">Algorithmic Evidence</th>
                <th className="px-6 py-4 font-black text-center">Threat Level</th>
                <th className="px-6 py-4 font-black text-center">Enforcement Status</th>
                <th className="px-6 py-4 font-black text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_VIOLATIONS.map((violation) => (
                <tr key={violation.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-3">
                       <div className="shrink-0 p-2 bg-slate-100 border border-slate-200 rounded-lg">
                         {getIcon(violation.type)}
                       </div>
                       <div>
                         <p className="text-sm font-black text-slate-900 whitespace-nowrap">{violation.type}</p>
                         <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">{violation.time}</p>
                       </div>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <div>
                       <p className="text-sm font-black text-slate-800">{violation.bus}</p>
                       <p className="text-xs font-bold text-slate-500 uppercase">{violation.company}</p>
                     </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                     <p className="text-xs font-medium text-slate-700 leading-relaxed bg-slate-50 p-2 rounded border border-slate-200">
                       {violation.details}
                     </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {getSeverityBadge(violation.severity)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {violation.status === 'Pending Review' ? (
                       <span className="inline-flex items-center px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-wider rounded border border-amber-200">
                         Review Required
                       </span>
                    ) : violation.status === 'Fine Issued' ? (
                       <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider rounded border border-emerald-200">
                         <CheckCircle2 className="w-3 h-3" /> Penalty Enforced
                       </span>
                    ) : (
                       <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider rounded border border-slate-200">
                         {violation.status}
                       </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider rounded shadow-md transition-colors opacity-0 group-hover:opacity-100 flex items-center gap-2 ml-auto">
                       <FileWarning className="w-3.5 h-3.5" /> Issue Fine
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

export default DelayViolation;
