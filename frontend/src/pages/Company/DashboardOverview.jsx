import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Bus, Users, TrendingUp, DollarSign, Map, Route as RouteIcon, 
  AlertTriangle, ShieldCheck, MapPin
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, ResponsiveContainer as RC, LineChart, Line, AreaChart, Area
} from 'recharts';

const REVENUE_DATA = [
  { name: 'Jan', revenue: 4000, expected: 2400 },
  { name: 'Feb', revenue: 3000, expected: 1398 },
  { name: 'Mar', revenue: 2000, expected: 9800 },
  { name: 'Apr', revenue: 2780, expected: 3908 },
  { name: 'May', revenue: 1890, expected: 4800 },
  { name: 'Jun', revenue: 2390, expected: 3800 },
  { name: 'Jul', revenue: 3490, expected: 4300 },
];

const CompanyDashboardHome = () => {
  const [stats, setStats] = useState({
    totalBuses: 0,
    totalSchedules: 0,
    totalTickets: 0,
    totalGrossRevenue: 0,
    totalRevenue: 0,
    totalTaxes: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        if (!user || user.role !== 'company_admin') return;
        
        const res = await axios.get(`http://127.0.0.1:5000/api/companies/${user.id}/dashboard-stats`, {
           headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (error) {
        console.error('Failed to load company stats', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Operational Overview</h2>
          <p className="text-gray-500 text-sm mt-1">Real-time metrics for your fleet and bookings.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
            Download PDF Report
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-colors">
            + Dispatch Bus
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Bus className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">+4 active</span>
          </div>
          <span className="text-gray-500 text-sm font-medium mb-1">Total Fleet</span>
          <span className="text-3xl font-black text-gray-800">{stats.totalBuses}</span>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">+12%</span>
          </div>
          <span className="text-gray-500 text-sm font-medium mb-1">Tickets Sold Today</span>
          <span className="text-3xl font-black text-gray-800">{stats.totalTickets}</span>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
               <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md">100% Transparent</span>
          </div>
          <span className="text-gray-500 text-sm font-medium mb-1">Company Net Earnings (95%)</span>
          <span className="text-3xl font-black text-gray-800">RWF {(stats.totalRevenue || 0).toLocaleString()}</span>
          
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-500">
             <span>Gross: {(stats.totalGrossRevenue || 0).toLocaleString()}</span>
             <span className="text-orange-500">Fee: {(stats.totalTaxes || 0).toLocaleString()}</span>
             <span className="text-emerald-600">Net: {(stats.totalRevenue || 0).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-50 p-3 rounded-xl">
              <RouteIcon className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Active Routes</p>
              <p className="text-xl font-bold text-gray-800">14</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-50 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Buses on Road</p>
              <p className="text-xl font-bold text-gray-800">28 / 42</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-red-50 p-3 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Delayed Buses</p>
              <p className="text-xl font-bold text-red-600">3</p>
            </div>
          </div>
          <button className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded hover:bg-red-100 transition-colors">
            View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Monthly Revenue</h3>
              <p className="text-sm text-gray-500">Gross income over the last 7 months</p>
            </div>
            <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#1F2937', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Active Fleet Map</h3>
              <p className="text-sm text-gray-500">Live GPS tracking overview</p>
            </div>
            <button className="text-orange-500 hover:text-orange-600 bg-orange-50 p-2 rounded-lg">
              <Map className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 bg-slate-100 rounded-xl relative overflow-hidden min-h-[300px] border border-slate-200">
             <div className="absolute inset-0 opacity-20 bg-[url('https://maps.wikimedia.org/osm-intl/12/2402/1534.png')] bg-cover bg-center"></div>
             
             <div className="absolute top-1/4 left-1/3 text-green-600 animate-bounce">
               <MapPin className="w-6 h-6 fill-white" />
             </div>
             <div className="absolute top-1/2 left-1/2 text-orange-500 animate-bounce delay-100">
               <MapPin className="w-6 h-6 fill-white" />
             </div>
             <div className="absolute bottom-1/3 right-1/4 text-red-500 animate-bounce delay-200">
               <MapPin className="w-6 h-6 fill-white" />
             </div>

             <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-800">Bus RAD 424 A</span>
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">On Time</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mb-1">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Kigali</span>
                  <span>Rubavu</span>
                </div>
             </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CompanyDashboardHome;
