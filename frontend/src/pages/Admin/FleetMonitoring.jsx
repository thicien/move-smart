import { useState } from 'react';
import { 
  MapPin, Navigation, Search, Filter, Layers, Zap, Clock, AlertTriangle, X
} from 'lucide-react';

const MOCK_BUSES = [
  { id: 'B-001', company: 'Volcano Express', plate: 'RAD 424 A', driver: 'John Nsengimana', route: 'Kigali - Musanze', speed: '65 km/h', status: 'On Schedule', eta: '14:30', delay: '0 min', lat: 35, lng: 40, color: 'emerald' },
  { id: 'B-082', company: 'Horizon Express', plate: 'RAB 102 C', driver: 'Paul Kagabo', route: 'Kigali - Huye', speed: '55 km/h', status: 'Slight Delay', eta: '15:15', delay: '12 min', lat: 60, lng: 55, color: 'amber' },
  { id: 'B-145', company: 'Ritco', plate: 'RAC 911 E', driver: 'Eric Mugisha', route: 'Kigali - Rubavu', speed: '0 km/h', status: 'Major Delay', eta: '16:00', delay: '45 min', lat: 75, lng: 20, color: 'red' },
  { id: 'B-012', company: 'Kigali Bus Services', plate: 'RAF 882 K', driver: 'Grace Umutoni', route: 'Kigali - Nyabugogo', speed: 'Offline', status: 'Offline', eta: '--:--', delay: '--', lat: 50, lng: 50, color: 'slate' },
];

const FleetMonitoring = () => {
  const [selectedBus, setSelectedBus] = useState(null);
  const [filter, setFilter] = useState('All');

  const filteredBuses = filter === 'All' 
    ? MOCK_BUSES 
    : MOCK_BUSES.filter(b => b.status === filter);

  return (
    <div className="h-[calc(100vh-6rem)] -m-4 md:-m-6 lg:-m-8 flex flex-col md:flex-row relative font-sans overflow-hidden bg-slate-900 animate-fade-in">
      
      <div className="flex-1 relative z-0">
        {/* Placeholder Map Background */}
        <div className="absolute inset-0 opacity-30 mix-blend-luminosity bg-[url('https://maps.wikimedia.org/osm-intl/12/2402/1534.png')] bg-cover bg-center transition-all duration-1000"></div>
        
        {/* Map Overlays & Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10 pointer-events-none">
          <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-700 pointer-events-auto w-80">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <Navigation className="w-5 h-5 text-emerald-500" /> Live National Fleet
            </h3>
            <p className="text-slate-400 text-xs mt-1">Real-time GPS synchronization</p>
            
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Find bus by plate or ID..." 
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-emerald-500/50 outline-none placeholder:text-slate-500"
              />
            </div>

            {/* Quick Filters */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-bold">
              <button onClick={() => setFilter('All')} className={`py-1.5 rounded border transition-colors ${filter === 'All' ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-800 border-transparent text-slate-400 hover:bg-slate-700'}`}>All (842)</button>
              <button onClick={() => setFilter('On Schedule')} className={`py-1.5 rounded border transition-colors flex items-center justify-center gap-1 ${filter === 'On Schedule' ? 'bg-emerald-900/50 border-emerald-500/50 text-emerald-400' : 'bg-slate-800 border-transparent text-slate-400 hover:bg-slate-700'}`}><div className="w-2 h-2 rounded-full bg-emerald-500"></div> On Time</button>
              <button onClick={() => setFilter('Slight Delay')} className={`py-1.5 rounded border transition-colors flex items-center justify-center gap-1 ${filter === 'Slight Delay' ? 'bg-amber-900/50 border-amber-500/50 text-amber-400' : 'bg-slate-800 border-transparent text-slate-400 hover:bg-slate-700'}`}><div className="w-2 h-2 rounded-full bg-amber-500"></div> Delayed</button>
              <button onClick={() => setFilter('Major Delay')} className={`py-1.5 rounded border transition-colors flex items-center justify-center gap-1 ${filter === 'Major Delay' ? 'bg-red-900/50 border-red-500/50 text-red-400' : 'bg-slate-800 border-transparent text-slate-400 hover:bg-slate-700'}`}><div className="w-2 h-2 rounded-full bg-red-500"></div> Violation</button>
            </div>
          </div>

          <div className="flex flex-col gap-2 pointer-events-auto">
            <button className="bg-slate-900/90 backdrop-blur text-white p-2.5 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors shadow-lg" title="Map Layers">
              <Layers className="w-5 h-5" />
            </button>
            <button className="bg-slate-900/90 backdrop-blur text-white p-2.5 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors shadow-lg" title="Current Traffic">
              <Zap className="w-5 h-5 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Map Pins */}
        {filteredBuses.map((bus) => (
          <div 
            key={bus.id} 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
            style={{ top: `${bus.lat}%`, left: `${bus.lng}%` }}
            onClick={() => setSelectedBus(bus)}
          >
            {bus.status !== 'Offline' && (
              <div className={`absolute -inset-2 bg-${bus.color}-500/20 rounded-full animate-ping`}></div>
            )}
            <div className={`relative w-6 h-6 bg-${bus.color}-500 border-2 border-slate-900 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-125`}>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            
            {/* Tooltip on hover */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-700">
              {bus.plate}
            </div>
          </div>
        ))}
      </div>

      {/* Side Panel (Bus Details) */}
      <div className={`w-full md:w-96 bg-slate-950 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col transition-all duration-300 z-20 ${selectedBus ? 'translate-x-0' : 'translate-y-full md:translate-y-0 md:translate-x-full absolute right-0 inset-y-0 h-full'}`}>
        {selectedBus && (
          <>
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
               <div>
                  <h3 className="font-black text-white text-lg">{selectedBus.plate}</h3>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mt-1 uppercase tracking-widest bg-slate-800 text-${selectedBus.color}-400 border border-${selectedBus.color}-500/30`}>
                    {selectedBus.status}
                  </span>
               </div>
               <button onClick={() => setSelectedBus(null)} className="p-1.5 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors">
                 <X className="w-5 h-5" />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
              
              {/* Telemetry */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Current Speed</p>
                  <p className="text-xl font-black text-white">{selectedBus.speed}</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">GPS Update</p>
                  <p className="text-xl font-black text-white flex items-center gap-1.5"><Zap className="w-4 h-4 text-emerald-500" /> Live</p>
                </div>
              </div>

              {/* Journey details */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">Journey Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Route</span>
                    <span className="text-sm font-bold text-white">{selectedBus.route}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Company</span>
                    <span className="text-sm font-bold text-white">{selectedBus.company}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Driver</span>
                    <span className="text-sm font-bold text-white">{selectedBus.driver}</span>
                  </div>
                </div>
              </div>

              {/* Schedule Info */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">Schedule Adherence</h4>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Clock className={`w-5 h-5 mt-0.5 text-${selectedBus.color}-500`} />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-slate-400">Est. Arrival Time</span>
                        <span className="text-sm font-black text-white">{selectedBus.eta}</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-xs text-slate-400">Delay Time</span>
                         <span className={`text-xs font-bold text-${selectedBus.color}-400`}>+{selectedBus.delay}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg transition-colors text-sm shadow-lg shadow-emerald-900/20">
                  View Full Manifest
                </button>
                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-lg transition-colors text-sm border border-slate-700 hover:border-slate-600 flex items-center justify-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Flag for Review
                </button>
              </div>

            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default FleetMonitoring;
