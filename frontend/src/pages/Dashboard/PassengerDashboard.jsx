import { Bus, MapPin, Calendar, Clock, CreditCard } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const PassengerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // In a real scenario, this matches the backend endpoint setup
        const res = await axios.get('http://localhost:5000/api/bookings/my-bookings');
        setBookings(res.data);
      } catch (error) {
        console.error('Failed to fetch bookings', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-brand-blue rounded-2xl p-8 text-white shadow-lg flex justify-between items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="10" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h2>
          <p className="text-brand-light/80">Manage your trips and upcoming bookings easily.</p>
        </div>
        <div className="bg-white/20 p-4 rounded-full relative z-10 hidden md:block">
          <Bus className="h-12 w-12 text-white" />
        </div>
      </div>

      {/* Bookings Section */}
      <h3 className="text-xl font-bold text-gray-800">Your Recent Bookings</h3>
      
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading your trips...</div>
      ) : bookings.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center">
          <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bus className="text-gray-400 w-8 h-8" />
          </div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">No upcoming trips</h4>
          <p className="text-gray-500 mb-6">You don't have any bus tickets booked yet.</p>
          <a href="/" className="bg-brand-orange hover:bg-orange-600 text-white px-6 py-2 rounded-xl inline-block transition-colors font-semibold">
            Book a Ticket Now
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col relative overflow-hidden group">
              {/* Status Ribbon */}
              <div className={`absolute top-0 right-0 px-4 py-1 text-xs font-bold text-white rounded-bl-xl shadow-sm
                ${booking.payment_status === 'completed' ? 'bg-green-500' : 'bg-brand-yellow text-gray-800'}`}>
                {booking.payment_status.toUpperCase()}
              </div>

              <div className="flex justify-between items-start mb-6 pt-2">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wilder block mb-1">Ticket ID</span>
                  <span className="text-lg font-mono font-bold text-brand-dark">{booking.ticket_code}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-gray-400 uppercase block mb-1">Seat</span>
                  <span className="text-xl font-bold text-brand-orange">{booking.seat_number}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <MapPin className="text-brand-blue" />
                  <div>
                    <span className="block text-xs text-gray-500 font-semibold mb-1">Origin</span>
                    <span className="font-bold text-gray-800">{booking.Schedule?.Route?.origin || 'Kigali'}</span>
                  </div>
                </div>
                <ArrowRight className="text-gray-300" />
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="block text-xs text-gray-500 font-semibold mb-1">Destination</span>
                    <span className="font-bold text-gray-800">{booking.Schedule?.Route?.destination || 'Rubavu'}</span>
                  </div>
                  <MapPin className="text-brand-orange" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">
                    {booking.Schedule ? new Date(booking.Schedule.departure_time).toLocaleDateString() : 'Date TBD'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">
                    {booking.Schedule ? new Date(booking.Schedule.departure_time).toLocaleTimeString() : 'Time TBD'}
                  </span>
                </div>
              </div>

              <button className="mt-6 w-full py-2 bg-brand-light hover:bg-gray-200 text-brand-dark font-semibold rounded-lg transition-colors border border-gray-200 text-sm">
                View Full Ticket details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PassengerDashboard;
