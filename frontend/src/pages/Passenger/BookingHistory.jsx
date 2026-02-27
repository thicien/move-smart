import { Download, Search, Filter, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const MOCK_HISTORY = [
  { id: 'TKT-9J2K1', date: 'Oct 15, 2025', route: 'Kigali - Musanze', company: 'Virunga Express', price: 3000, status: 'Completed' },
  { id: 'TKT-8L4P7', date: 'Sep 22, 2025', route: 'Rubavu - Kigali', company: 'Volcano Express', price: 4000, status: 'Completed' },
  { id: 'TKT-3M9Q2', date: 'Aug 05, 2025', route: 'Kigali - Huye', company: 'Horizon Express', price: 3500, status: 'Completed' },
  { id: 'TKT-1N7B4', date: 'Jul 18, 2025', route: 'Kigali - Rwamagana', company: 'Ritco', price: 1500, status: 'Cancelled' },
];

const BookingHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">Booking History</h2>
          <p className="text-gray-500 mt-1">View all your past trips and payment receipts.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by Ticket ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue/30 outline-none text-sm w-full md:w-64"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors text-sm font-semibold shadow-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Ticket ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_HISTORY.filter(t => t.id.toLowerCase().includes(searchTerm.toLowerCase())).map((trip) => (
                <tr key={trip.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono font-bold text-brand-dark">{trip.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {trip.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">
                    {trip.route}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {trip.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-brand-dark">RWF {trip.price}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold
                      ${trip.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}
                    `}>
                      {trip.status === 'Completed' && <CheckCircle className="w-3.5 h-3.5" />}
                      {trip.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-brand-blue hover:text-blue-800 font-semibold text-sm flex items-center justify-end gap-1.5 ml-auto transition-colors">
                      <Download className="w-4 h-4" /> Receipt
                    </button>
                  </td>
                </tr>
              ))}
              {MOCK_HISTORY.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    No booking history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
