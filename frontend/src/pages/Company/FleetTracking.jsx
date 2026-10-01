import { useState } from 'react';
import { Map, MapPin, Navigation, SignalHigh, AlertTriangle, AlertCircle, Search, Filter } from 'lucide-react';

const MOCK_FLEET = [
  { id: 'B-001', plate: 'RAD 424 A', route: 'Kigali - Musanze', speed: '65 km/h', eta: '1h 15m', driver: 'John N.', status: 'on_time', coordinates: { top: '30%', left: '45%' } },
  { id: 'B-002', plate: 'RAC 911 E', route: 'Kigali - Huye', speed: '40 km/h', eta: '2h 30m', driver: 'Paul K.', status: 'slight_delay', coordinates: { top: '60%', left: '40%' } },
  { id: 'B-004', plate: 'RAF 882 K', route: 'Kigali - Rubavu', speed: '0 km/h', eta: 'Unknown', driver: 'Eric M.', status: 'major_delay', coordinates: { top: '45%', left: '25%' } },
  { id: 'B-010', plate: 'RAG 234 Z', route: 'Musanze - Rubavu', speed: '55 km/h', eta: '45m', driver: 'Claude N.', status: 'on_time', coordinates: { top: '25%', left: '35%' } },
];

const FleetTracking = () => {
  const [selectedBus, setSelectedBus] = useState(MOCK_FLEET[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'on_time': return 'bg-emerald-500 text-emerald-500';
      case 'slight_delay': return 'bg-amber-500 text-amber-500';
      case 'major_delay': return 'bg-red-500 text-red-500';
      default: return 'bg-slate-500 text-slate-500';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'on_time': return 'On Time';
      case 'slight_delay': return 'Slight Delay';
      case 'major_delay': return 'Major Delay';
      default: return 'Unknown';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'on_time': return 'bg-emerald-50';
      case 'slight_delay': return 'bg-amber-50';
      case 'major_delay': return 'bg-red-50';
      default: return 'bg-slate-50';
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4 animate-fade-in relative z-0">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 shrink-0 border-b border-gray-200 pb-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Live Fleet Tracking</h2>
          <p className="text-gray-500 text-sm mt-1">Real-time GPS telemetry and schedule adherence monitoring.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
             <SignalHigh className="w-4 h-4 text-emerald-500 animate-pulse" /> Live Telemetry Linked
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        <div className="flex-1 bg-slate-100 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden flex flex-col">
          <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start pointer-events-none">
            <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg border border-white flex gap-2 pointer-events-auto">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Find bus..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-slate-300 outline-none text-sm w-48 text-slate-800"
                />
              </div>
              <button className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white flex flex-col gap-2 text-xs font-semibold text-slate-600 pointer-events-auto">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span> On Time (38)</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50"></span> Slight Delay (3)</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50"></span> Major Delay (1)</div>
            </div>
          </div>
          <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/11/1201/1032.png')] bg-cover bg-center opacity-60 mix-blend-multiply cursor-crosshair"></div>
          
          {/* Map Grid overlay for technical look */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

          {/* Plotting Buses */}
          {MOCK_FLEET.filter(b => b.id.toLowerCase().includes(searchTerm.toLowerCase()) || b.route.toLowerCase().includes(searchTerm.toLowerCase())).map((bus) => (
            <div 
              key={bus.id} 
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 z-20 ${selectedBus.id === bus.id ? 'scale-125 z-30' : ''}`}
              style={{ top: bus.coordinates.top, left: bus.coordinates.left }}
              onClick={() => setSelectedBus(bus)}
            >
              <div className="relative">
                 {/* Ping animation backing */}
                 <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${getStatusColor(bus.status).split(' ')[0]}`}></div>
                 
                 {/* Pin graphic */}
                 <div className={`relative flex flex-col items-center group`}>
                   <div className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shadow-lg ${getStatusColor(bus.status).split(' ')[0]}`}>
                     <Navigation className="w-4 h-4 text-white transform rotate-45" />
                   </div>
                   
                   {/* Tooltip */}
                   <div className={`absolute top-full mt-1 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${selectedBus.id === bus.id ? 'opacity-100' : ''}`}>
                     {bus.id}
                   </div>
                 </div>
              </div>
            </div>
          ))}

        </div>

        {/* Selected Bus Telemetry Panel */}
        <div className="w-full lg:w-96 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col shrink-0 overflow-y-auto">
          <div className={`p-6 border-b border-slate-100 text-white relative overflow-hidden ${getStatusColor(selectedBus.status).split(' ')[0]}`}>
             <div className="absolute top-0 right-0 opacity-20 transform translate-x-1/4 -translate-y-1/4">
               <MapPin className="w-32 h-32" />
             </div>
             <div className="relative z-10">
               <div className="flex justify-between items-start mb-2">
                 <span className="text-sm font-bold opacity-80 uppercase tracking-widest bg-black/20 px-2 py-1 rounded">Telemetry Lock</span>
                 <span className="text-xs font-bold bg-white text-slate-800 px-2 py-1 rounded shadow-sm flex items-center gap-1">
                   <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedBus.status).split(' ')[0]}`}></div>
                   {getStatusLabel(selectedBus.status)}
                 </span>
               </div>
               <h3 className="text-3xl font-black tabular-nums">{selectedBus.id}</h3>
               <p className="font-medium opacity-90 mt-1">{selectedBus.plate}</p>
             </div>
          </div>

          <div className="p-6 space-y-6 flex-1">
            
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Assigned Route</span>
              <div className="font-bold text-lg text-slate-800">{selectedBus.route}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border ${getStatusBg(selectedBus.status)} border-${getStatusColor(selectedBus.status).split('-')[1]}-100`}>
                <span className="block text-xs font-bold text-slate-500 uppercase mb-1">Current Speed</span>
                <span className={`text-2xl font-black tabular-nums ${getStatusColor(selectedBus.status).split(' ')[1]}`}>{selectedBus.speed}</span>
              </div>
              <div className={`p-4 rounded-xl border ${getStatusBg(selectedBus.status)} border-${getStatusColor(selectedBus.status).split('-')[1]}-100`}>
                <span className="block text-xs font-bold text-slate-500 uppercase mb-1">Live ETA</span>
                <span className={`text-2xl font-black tabular-nums ${getStatusColor(selectedBus.status).split(' ')[1]}`}>{selectedBus.eta}</span>
              </div>
            </div>

            <div className="space-y-4">
               <h4 className="text-xs font-bold text-slate-400 uppercase border-b border-slate-100 pb-2">Schedule Comparison</h4>
               
               <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                 <div className="relative">
                   <div className="absolute left-[-26px] top-1.5 w-3 h-3 rounded-full border-2 border-emerald-500 bg-white"></div>
                   <div className="flex justify-between">
                     <span className="font-bold text-sm text-slate-700">Departed Origin</span>
                     <span className="text-xs font-semibold text-slate-500">08:00 AM</span>
                   </div>
                   <span className="text-xs text-slate-400 block mt-0.5">On time</span>
                 </div>
                 
                 <div className="relative">
                   <div className={`absolute left-[-26px] top-1.5 w-3 h-3 rounded-full border-2 bg-white ${selectedBus.status === 'on_time' ? 'border-emerald-500' : 'border-amber-500'}`}></div>
                   <div className="flex justify-between">
                     <span className="font-bold text-sm text-slate-700">Current Position</span>
                     <span className="text-xs font-semibold text-slate-500">Live</span>
                   </div>
                   {selectedBus.status !== 'on_time' && (
                     <span className="text-xs text-amber-600 font-bold block mt-0.5 flex items-center gap-1">
                       <AlertTriangle className="w-3 h-3" /> Traffic detected ahead
                     </span>
                   )}
                 </div>

                 <div className="relative pt-6">
                   <div className="absolute left-[-26px] bottom-1.5 w-3 h-3 rounded-full border-2 border-slate-300 bg-white"></div>
                   <div className="flex justify-between">
                     <span className="font-bold text-sm text-slate-500">Expected Arrival</span>
                     <span className={`text-xs font-semibold ${selectedBus.status !== 'on_time' ? 'text-red-500 line-through' : 'text-slate-500'}`}>10:15 AM</span>
                   </div>
                   {selectedBus.status !== 'on_time' && (
                     <div className="flex justify-between mt-1">
                       <span className="font-bold text-sm text-amber-600">Revised ETA</span>
                       <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                         <AlertCircle className="w-3 h-3" /> ~10:30 AM
                       </span>
                     </div>
                   )}
                 </div>
               </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase">Operating Driver</span>
                <span className="font-bold text-slate-700 text-sm mt-0.5 block">{selectedBus.driver}</span>
              </div>
              <button className="text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors">
                Contact Driver
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default FleetTracking;
