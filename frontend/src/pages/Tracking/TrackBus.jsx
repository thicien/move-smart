import { useState, useEffect } from 'react';
import { Bus, MapPin, Search, Navigation } from 'lucide-react';
import axios from 'axios';

const TrackBus = () => {
  const [ticketCode, setTicketCode] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!ticketCode) return;
    
    setLoading(true);
    setError('');

    try {
      // In a fully integrated app, this would hit `/api/tracking/ticket/${ticketCode}` 
      // which would return the Bus coordinates and Schedule associated with the booking ticket code.
      // Simulating a successful fetch for the UI demonstration:
      setTimeout(() => {
        setTrackingData({
          busPlate: 'RAD 424 A',
          origin: 'Kigali',
          destination: 'Musanze',
          status: 'On Time',
          completed: 65,
          speed: '72 km/h',
          eta: '45 mins',
          lastUpdated: new Date().toLocaleTimeString()
        });
        setLoading(false);
      }, 1000);

    } catch (err) {
      setError('Could not find tracking data for this ticket code.');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Panel: Search & Info */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-brand-dark mb-4">Track Your Ride</h2>
            
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Enter Ticket Code (e.g. A8F9B2)"
                  value={ticketCode}
                  onChange={(e) => setTicketCode(e.target.value.toUpperCase())}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue focus:bg-white outline-none transition-all uppercase"
                />
              </div>
              <button 
                type="submit"
                disabled={loading || !ticketCode}
                className="w-full bg-brand-orange hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl shadow-md transition-colors flex justify-center items-center"
              >
                {loading ? 'Searching...' : 'Find Bus'}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}
          </div>

          {/* Tracking Details Card */}
          {trackingData && (
            <div className="bg-white rounded-2xl shadow-sm border border-brand-blue p-6 animate-fade-in relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-10"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wilder block mb-1">Vehicle</span>
                  <span className="text-xl font-black text-brand-dark flex items-center gap-2">
                    <Bus className="w-5 h-5 text-brand-blue" />
                    {trackingData.busPlate}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wilder block mb-1">Status</span>
                  <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                    {trackingData.status}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-xs text-brand-dark font-bold mb-2">
                  <span>{trackingData.origin}</span>
                  <span>{trackingData.destination}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 mb-2 overflow-hidden shadow-inner">
                  <div 
                    className="bg-brand-blue h-full rounded-full transition-all duration-1000 relative" 
                    style={{ width: `${trackingData.completed}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-brand-orange rounded-full shadow-md translate-x-1/2"></div>
                  </div>
                </div>
                <div className="text-center text-xs font-semibold text-gray-500">
                  {trackingData.completed}% Journey Completed
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <span className="block text-xs text-gray-500 mb-1">Current Speed</span>
                  <span className="font-bold text-gray-800">{trackingData.speed}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500 mb-1">Est. Time of Arrival</span>
                  <span className="font-bold text-brand-orange">{trackingData.eta}</span>
                </div>
              </div>
              
              <div className="mt-6 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                <Navigation className="w-3 h-3" /> Last updated: {trackingData.lastUpdated}
              </div>
            </div>
          )}

        </div>

        {/* Right Panel: Map Area */}
        <div className="w-full md:w-2/3 h-[600px] bg-gray-200 rounded-2xl border border-gray-300 overflow-hidden relative shadow-inner">
          {/* Map Mockup Placeholder */}
          <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=-1.9441,30.0619&zoom=10&size=800x600&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0x333333&style=feature:landscape|element:geometry|color:0xf5f5f5&style=feature:water|element:geometry|color:0xcbd5e1&key=YOUR_API_KEY_MOCK')] bg-cover bg-center opacity-60 mix-blend-multiply"></div>
          
          {!trackingData ? (
             <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/70 backdrop-blur-sm">
                <MapPin className="w-16 h-16 text-gray-400 mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold text-gray-700">Live Map</h3>
                <p className="text-gray-500 max-w-xs text-center mt-2">Enter your ticket code to see the live position of your bus on the map.</p>
             </div>
          ) : (
            <>
              {/* Route Line Mock */}
              <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 200 400 Q 400 300 600 200" fill="transparent" stroke="#1E3A8A" strokeWidth="6" strokeDasharray="10, 10" className="opacity-50" />
              </svg>

              {/* Pin Mock */}
              <div className="absolute z-20 top-[40%] left-[55%] animate-pulse">
                <div className="relative -ml-4 -mt-8">
                  <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center shadow-lg shadow-orange-500/50 absolute z-10">
                    <Bus className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-3 h-3 bg-black rounded-full absolute top-[1.8rem] left-2.5 opacity-30 shadow-xl"></div>
                </div>
              </div>
              
              {/* Info Window Mock */}
              <div className="absolute z-30 top-[28%] left-[50%] bg-white px-4 py-2 rounded-xl shadow-xl font-bold text-sm text-brand-dark whitespace-nowrap border border-gray-100">
                {trackingData.busPlate} - {trackingData.speed}
              </div>
            </>
          )}

          {/* Map Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-30">
            <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:text-brand-blue hover:bg-gray-50 transition-colors">
              <span className="text-xl font-bold">+</span>
            </button>
            <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:text-brand-blue hover:bg-gray-50 transition-colors">
              <span className="text-xl font-bold">-</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrackBus;
