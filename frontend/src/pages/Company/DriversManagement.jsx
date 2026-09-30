import { useState } from 'react';
import { Users, UserPlus, Search, Phone, Bus, Star, ShieldCheck, MoreVertical } from 'lucide-react';

const MOCK_DRIVERS = [
  { id: 1, name: 'John Nsengimana', license: 'RWA-DL-892', phone: '+250 788 123 456', bus: 'B-001 (RAD 424 A)', trips: 142, rating: 4.8, status: 'Active' },
  { id: 2, name: 'Paul Kagabo', license: 'RWA-DL-334', phone: '+250 788 987 654', bus: 'B-002 (RAC 911 E)', trips: 89, rating: 4.5, status: 'Active' },
  { id: 3, name: 'Eric Mugisha', license: 'RWA-DL-115', phone: '+250 788 444 555', bus: 'B-004 (RAF 882 K)', trips: 210, rating: 4.9, status: 'Active' },
  { id: 4, name: 'Claude Nzirorera', license: 'RWA-DL-772', phone: '+250 788 222 333', bus: 'B-010 (RAG 234 Z)', trips: 45, rating: 4.2, status: 'Off-Duty' },
];

const DriversManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Driver Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage personnel, track performance, and handle assignments.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by name or license..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500/30 outline-none text-sm w-full md:w-64 text-slate-800"
            />
          </div>
          <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-colors">
            <UserPlus className="w-4 h-4" /> Add Driver
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_DRIVERS.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).map((driver) => (
          <div key={driver.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center relative hover:shadow-md transition-shadow group">
             <div className="absolute top-4 right-4">
               {driver.status === 'Active' ? (
                 <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Active
                 </span>
               ) : (
                 <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Off-Duty
                 </span>
               )}
             </div>

             <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 mt-2">
               <Users className="w-8 h-8 text-slate-400" />
             </div>
             
             <h3 className="font-bold text-slate-800 text-lg">{driver.name}</h3>
             <p className="text-xs font-mono text-slate-500 mt-1 bg-slate-50 px-2 py-1 rounded border border-slate-200">
                License: {driver.license}
             </p>

             <div className="w-full mt-6 space-y-3">
               <div className="flex items-center justify-between text-sm">
                 <span className="text-slate-500 flex items-center gap-2"><Phone className="w-4 h-4" /> Contact</span>
                 <span className="font-semibold text-slate-700">{driver.phone}</span>
               </div>
               <div className="flex items-center justify-between text-sm">
                 <span className="text-slate-500 flex items-center gap-2"><Bus className="w-4 h-4" /> Assigned Bus</span>
                 <span className="font-bold text-orange-600">{driver.bus}</span>
               </div>
               <div className="flex items-center justify-between text-sm pt-3 border-t border-slate-50">
                 <span className="text-slate-500 text-xs uppercase font-bold tracking-wider">Performance</span>
                 <div className="flex items-center gap-3">
                   <span className="text-slate-700 font-bold text-xs">{driver.trips} Trips</span>
                   <span className="flex items-center gap-1 font-bold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded text-xs">
                     <Star className="w-3 h-3 fill-amber-500" /> {driver.rating}
                   </span>
                 </div>
               </div>
             </div>

             <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <button className="p-1.5 text-slate-400 hover:text-slate-800 bg-slate-50 rounded-lg hover:bg-slate-100 border border-slate-200">
                 <MoreVertical className="w-4 h-4" />
               </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriversManagement;
