import { useState } from 'react';
import { 
  MapPin, AlertTriangle, ShieldAlert, Navigation, Search, Filter, Battery, Key, Bus, CheckCircle2
} from 'lucide-react';

const MOCK_FLEET = [
  { id: 'B-001', plate: 'RAB 123A', company: 'Volcano Express', route: 'Kigali → Musanze', speed: '65 km/h', status: 'On Schedule', lat: '1/3', lng: '1/4', color: 'bg-emerald-500' },
  { id: 'B-002', plate: 'RAC 456B', company: 'Ritco', route: 'Kigali → Huye', speed: '0 km/h', status: 'Stopped Too Long', lat: '1/2', lng: '2/3', color: 'bg-red-500' },
  { id: 'B-003', plate: 'RAD 789C', company: 'Horizon Express', route: 'Musanze → Rubavu', speed: '42 km/h', status: 'Delayed (+15m)', lat: '1/4', lng: '1/3', color: 'bg-amber-500' },
  { id: 'B-004', plate: 'RAE 101D', company: 'Capital Express', route: 'Kigali → Rubavu', speed: '98 km/h', status: 'Speeding Warning', lat: '2/3', lng: '1/2', color: 'bg-red-500' },
  { id: 'B-005', plate: 'RAF 202E', company: 'Stella Express', route: 'Kigali → Rwamagana', speed: '55 km/h', status: 'On Schedule', lat: '3/4', lng: '3/4', color: 'bg-emerald-500' },
];

const LiveBusTracking = () => {
  const [selectedBus, setSelectedBus] = useState(MOCK_FLEET[0]);

  return (
    <div className="h-[calc(100vh-8rem)] flex shadow-xl border border-slate-200 rounded-2xl overflow-hidden font-sans bg-white animate-fade-in relative">
      
      {/* Side Panel for Target Info & Alerts */}
      <aside className="w-96 bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl shrink-0">
        
        <div className="p-5 border-b border-slate-800 bg-slate-950">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Navigation className="w-5 h-5 text-sky-400" /> Live Telemetry Matrix
          </h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Global GPS Intercept / Rwanda</p>
        </div>

        <div className="p-4 border-b border-slate-800 bg-slate-900">
           <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Track bus plate (e.g., RAB 123A)..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-800 border-none outline-none rounded-lg text-sm text-white placeholder-slate-500 focus:ring-1 focus:ring-sky-500 font-bold"
            />
          </div>
        </div>

        {/* Selected Bus Telemetry Card */}
        {selectedBus && (
          <div className="p-4 bg-slate-800/50 m-4 rounded-xl border border-slate-700 shadow-inner">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-700/50">
               <div>
                  <h3 className="text-xl font-black text-white tracking-widest">{selectedBus.plate}</h3>
                  <p className="text-xs font-bold text-sky-400 uppercase mt-0.5">{selectedBus.company}</p>
               </div>
               <div className={`p-2 rounded-lg ${selectedBus.status.includes('Speeding') || selectedBus.status.includes('Stopped') ? 'bg-red-500/20 text-red-500 border border-red-500/30' : selectedBus.status.includes('Delayed') ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'}`}>
                 <Bus className="w-6 h-6" />
               </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-bold">Corridor</span>
                <span className="text-white font-black text-right">{selectedBus.route}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-bold">Current Velocity</span>
                <span className="text-white font-black font-mono text-lg">{selectedBus.speed}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-bold">ETA Destination</span>
                <span className="text-white font-black">14:45 PM</span>
              </div>
              
              <div className="pt-4 border-t border-slate-700/50">
                 <p className="text-[10px] uppercase font-bold text-slate-500 mb-2">Automated Compliance Agent</p>
                 {selectedBus.status.includes('Speeding') || selectedBus.status.includes('Stopped') ? (
                    <div className="bg-red-950 border border-red-900 p-3 rounded-lg flex items-start gap-3">
                       <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
                       <div>
                         <p className="text-xs font-black text-white">{selectedBus.status}</p>
                         <p className="text-[10px] text-red-300 mt-1 font-bold">Violation ticket will be automatically issued to operator if condition persists.</p>
                       </div>
                    </div>
                 ) : selectedBus.status.includes('Delayed') ? (
                    <div className="bg-amber-950 border border-amber-900 p-3 rounded-lg flex items-start gap-3">
                       <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                       <div>
                         <p className="text-xs font-black text-white">{selectedBus.status}</p>
                         <p className="text-[10px] text-amber-300 mt-1 font-bold">Passengers have been notified of schedule shift.</p>
                       </div>
                    </div>
                 ) : (
                    <div className="bg-emerald-950 border border-emerald-900 p-3 rounded-lg flex items-center gap-2 text-emerald-400">
                       <CheckCircle2 className="w-4 h-4" />
                       <span className="text-xs font-black">Nominal Operation</span>
                    </div>
                 )}
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
           <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Live Fleet Index</p>
           {MOCK_FLEET.map(bus => (
             <button 
               key={bus.id} 
               onClick={() => setSelectedBus(bus)}
               className={`w-full text-left p-3 rounded-lg border transition-colors flex items-center justify-between ${selectedBus?.id === bus.id ? 'bg-slate-800 border-slate-600' : 'bg-transparent border-slate-800 hover:bg-slate-800/50'}`}
             >
               <div>
                  <p className="text-sm font-black text-white">{bus.plate}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{bus.company}</p>
               </div>
               <div className={`w-3 h-3 rounded-full ${bus.color} border-2 border-slate-900`}></div>
             </button>
           ))}
        </div>

      </aside>
      
      <main className="flex-1 relative bg-slate-900">
        <div className="absolute top-4 right-4 z-20 flex bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
           <button className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 border-r border-slate-200 transition-colors flex items-center gap-2">
             <Filter className="w-4 h-4" /> Filters
           </button>
           <button className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
             Map Layers
           </button>
        </div>

        <div className="absolute inset-0 opacity-60 mix-blend-luminosity bg-[url('https://maps.wikimedia.org/osm-intl/12/2402/1534.png')] bg-cover bg-center"></div>
        
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/80 via-transparent to-transparent pointer-events-none z-10"></div>

        <div className="absolute inset-0 z-20 overflow-hidden">
          {MOCK_FLEET.map((bus, idx) => (
            <div 
              key={bus.id}
              className="absolute"
              style={{
                top: `${(idx + 1) * 20}%`,
                left: `${(idx + 1) * 15 + 10}%`
              }}
            >
              <div className="relative group cursor-pointer" onClick={() => setSelectedBus(bus)}>
                {selectedBus?.id === bus.id && (
                  <div className={`absolute -inset-2 rounded-full animate-ping opacity-75 ${bus.color}`}></div>
                )}
                
                <div className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow-2xl border-4 border-white ${bus.color}`}>
                   <Bus className="w-3.5 h-3.5 text-white" />
                </div>

                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-lg border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity font-bold uppercase tracking-widest pointer-events-none">
                  {bus.plate} • {bus.speed}
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </main>

    </div>
  );
};

export default LiveBusTracking;
