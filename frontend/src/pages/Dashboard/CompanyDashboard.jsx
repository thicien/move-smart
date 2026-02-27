import { Users, Bus, Map, TrendingUp, DollarSign, Bell } from 'lucide-react';

const CompanyDashboard = () => {
  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">Company Operations Center</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your fleet, routes, and tickets in real-time.</p>
        </div>
        <div className="flex space-x-3">
          <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-brand-red rounded-full"></span>
          </button>
          <button className="bg-brand-blue hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-colors text-sm">
            + New Schedule
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="bg-blue-50 p-4 rounded-xl mr-4">
            <Bus className="w-6 h-6 text-brand-blue" />
          </div>
          <div>
            <span className="block text-xs font-bold text-gray-400 uppercase">Active Fleet</span>
            <span className="text-2xl font-black text-gray-800">42</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="bg-green-50 p-4 rounded-xl mr-4">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <span className="block text-xs font-bold text-gray-400 uppercase">Today's Passengers</span>
            <span className="text-2xl font-black text-gray-800">1,204</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="bg-orange-50 p-4 rounded-xl mr-4">
            <DollarSign className="w-6 h-6 text-brand-orange" />
          </div>
          <div>
            <span className="block text-xs font-bold text-gray-400 uppercase">Daily Revenue</span>
            <span className="text-2xl font-black text-gray-800">RWF 840K</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="bg-purple-50 p-4 rounded-xl mr-4">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <span className="block text-xs font-bold text-gray-400 uppercase">Occupancy Rate</span>
            <span className="text-2xl font-black text-gray-800">88%</span>
          </div>
        </div>
      </div>

      {/* Active Fleet View Mock */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Live Fleet Tracking</h3>
          <button className="text-sm text-brand-blue hover:underline font-semibold flex items-center gap-1">
            <Map className="w-4 h-4" /> Full Map View
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bus Card 1 */}
            <div className="border border-gray-200 rounded-xl p-4 hover:border-brand-blue transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center">
                    <Bus className="w-5 h-5 text-brand-dark" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">RAD 424 A</h4>
                    <span className="text-xs text-gray-500">Route: Kigali - Musanze</span>
                  </div>
                </div>
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div className="bg-brand-blue h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 font-semibold mb-4">
                <span>Kigali</span>
                <span>45% Completed</span>
                <span>Musanze</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-3 text-sm">
                <span className="text-gray-600">Seats: <strong className="text-brand-dark">28/30</strong></span>
                <span className="text-gray-600">Delay: <strong className="text-green-600">None</strong></span>
              </div>
            </div>

            {/* Bus Card 2 */}
            <div className="border border-gray-200 rounded-xl p-4 hover:border-brand-blue transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center">
                    <Bus className="w-5 h-5 text-brand-dark" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">RAC 911 E</h4>
                    <span className="text-xs text-gray-500">Route: Kigali - Huye</span>
                  </div>
                </div>
                <span className="w-3 h-3 bg-brand-yellow rounded-full animate-pulse"></span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div className="bg-brand-orange h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 font-semibold mb-4">
                <span>Kigali</span>
                <span>80% Completed</span>
                <span>Huye</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-3 text-sm">
                <span className="text-gray-600">Seats: <strong className="text-brand-dark">30/30</strong></span>
                <span className="text-gray-600">Delay: <strong className="text-brand-yellow">+5 mins</strong></span>
              </div>
            </div>

            {/* Addition stub */}
            <div className="border border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center text-gray-400 hover:text-brand-blue hover:border-brand-blue transition-all cursor-pointer min-h-[180px]">
              <Bus className="w-8 h-8 mb-2" />
              <span className="font-semibold text-sm">View All 42 Buses</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
