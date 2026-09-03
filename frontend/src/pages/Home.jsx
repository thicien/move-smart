import { MapPin, Calendar, Search } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative bg-brand-blue text-white py-20 lg:py-32 overflow-hidden">
        {/* Abstract Background Design */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pattern" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="40" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Seamless Nationwide <span className="text-brand-orange">Bus Travel</span>.
          </h1>
          <p className="text-lg md:text-xl text-brand-light/80 mb-10 max-w-2xl">
            Book your tickets easily, track your bus in real-time, and experience hassle-free urban and intercity travel.
          </p>

          <div className="bg-white text-brand-dark p-4 rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row gap-4 items-center">
            
            {/* Origin */}
            <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 w-full group focus-within:ring-2 focus-within:ring-brand-blue/20 focus-within:bg-white transition-all">
              <MapPin className="text-gray-400 mr-3 group-focus-within:text-brand-blue transition-colors" />
              <div className="flex flex-col text-left w-full">
                <span className="text-xs text-gray-500 font-semibold uppercase">Leaving From</span>
                <input 
                  type="text" 
                  placeholder="Kigali" 
                  className="bg-transparent border-none outline-none font-medium placeholder:font-normal placeholder:text-gray-300 w-full"
                />
              </div>
            </div>

            {/* Destination */}
            <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 w-full group focus-within:ring-2 focus-within:ring-brand-blue/20 focus-within:bg-white transition-all">
              <MapPin className="text-gray-400 mr-3 group-focus-within:text-brand-orange transition-colors" />
              <div className="flex flex-col text-left w-full">
                <span className="text-xs text-gray-500 font-semibold uppercase">Going To</span>
                <input 
                  type="text" 
                  placeholder="Rubavu" 
                  className="bg-transparent border-none outline-none font-medium placeholder:font-normal placeholder:text-gray-300 w-full"
                />
              </div>
            </div>

            {/* Date */}
            <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 w-full group focus-within:ring-2 focus-within:ring-brand-blue/20 focus-within:bg-white transition-all">
              <Calendar className="text-gray-400 mr-3 group-focus-within:text-brand-blue transition-colors" />
              <div className="flex flex-col text-left w-full">
                <span className="text-xs text-gray-500 font-semibold uppercase">Date of Travel</span>
                <input 
                  type="date" 
                  className="bg-transparent border-none outline-none font-medium text-gray-700 w-full"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button className="bg-brand-orange hover:bg-orange-600 text-white font-bold h-full px-8 py-4 rounded-xl shadow-lg hover:shadow-orange-500/50 transition-all flex items-center justify-center gap-2 group w-full md:w-auto mt-2 md:mt-0">
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="md:hidden">Search</span>
            </button>
            
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-brand-light/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-brand-blue w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Live Bus Tracking</h3>
              <p className="text-gray-500">Know exactly where your bus is and when it will arrive at the terminal in real time.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-brand-orange w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Booking</h3>
              <p className="text-gray-500">Choose your seat and book instantly through Tap&Go, MoMo, or directly with local agents.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="text-brand-blue w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Notifications</h3>
              <p className="text-gray-500">Receive SMS or push notifications for delays, departure reminders, and digital tickets.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
