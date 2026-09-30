import { useState } from 'react';
import { Ticket, Search, Filter, Download, MoreVertical, CheckCircle2, XCircle, Clock, Eye } from 'lucide-react';

const MOCK_TICKETS = [
  { id: 'TKT-8901', passenger: 'Alice Uwase', bus: 'B-001 / RAD 424 A', route: 'Kigali - Musanze', seat: '12', date: 'Oct 24, 2023', price: 'RWF 3,000', status: 'Completed', payment: 'Tap&Go' },
  { id: 'TKT-8902', passenger: 'Jean Baptiste', bus: 'B-004 / RAF 882 K', route: 'Kigali - Rubavu', seat: '05', date: 'Oct 24, 2023', price: 'RWF 4,500', status: 'Upcoming', payment: 'MoMo' },
  { id: 'TKT-8903', passenger: 'Sarah M.', bus: 'B-002 / RAC 911 E', route: 'Kigali - Huye', seat: '22', date: 'Oct 25, 2023', price: 'RWF 3,500', status: 'Upcoming', payment: 'Card' },
  { id: 'TKT-8904', passenger: 'David N.', bus: 'B-001 / RAD 424 A', route: 'Kigali - Musanze', seat: '14', date: 'Oct 24, 2023', price: 'RWF 3,000', status: 'Cancelled', payment: 'Refunded' },
];

const BookingsTickets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredTickets = MOCK_TICKETS.filter(ticket => {
    const matchesSearch = ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ticket.passenger.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ticket.route.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Upcoming':  return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default:          return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'Upcoming':  return <Clock className="w-3.5 h-3.5" />;
      case 'Cancelled': return <XCircle className="w-3.5 h-3.5" />;
      default:          return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">o
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Bookings & Tickets</h2>
          <p className="text-gray-500 text-sm mt-1">Manage passenger reservations, sales, and manifests.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors text-sm font-semibold shadow-sm">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-colors">
            Sales Report
          </button>
        </div>
      </div>

      {/* Filters Area */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search ID, passenger, or route..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/30 outline-none text-sm w-full transition-all text-slate-800"
            />
          </div>
          <button className="flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 px-4 py-2.5 rounded-xl transition-colors text-sm font-semibold">
            <Filter className="w-4 h-4" /> Date Range
          </button>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
          {['All', 'Upcoming', 'Completed', 'Cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                statusFilter === status 
                  ? 'bg-white text-slate-800 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-500">
                <th className="px-6 py-4 text-xs uppercase tracking-wider">Ticket ID & Date</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider">Passenger</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider">Route & Bus</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider">Seat & Price</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100">
                        <Ticket className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 font-mono">{ticket.id}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{ticket.date}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-700">{ticket.passenger}</div>
                    <div className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded inline-block mt-1">Paid via {ticket.payment}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-800">{ticket.route}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Bus: {ticket.bus}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="text-orange-600 bg-orange-50 px-2 py-0.5 rounded text-xs">Seat {ticket.seat}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 font-medium">{ticket.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusStyle(ticket.status)}`}>
                      {getStatusIcon(ticket.status)}
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded" title="More Options">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTickets.length === 0 && (
            <div className="p-12 flex flex-col items-center justify-center text-slate-500">
              <Ticket className="w-12 h-12 text-slate-300 mb-3" />
              <p className="text-lg font-semibold text-slate-600">No tickets found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsTickets;
