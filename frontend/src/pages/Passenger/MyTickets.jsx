import { Ticket, Calendar, Clock, MapPin, Download } from 'lucide-react';

const MOCK_TICKETS = [
  {
    id: 'TKT-A8F9B2',
    company: 'Volcano Express',
    from: 'Kigali',
    to: 'Rubavu',
    date: 'Oct 24, 2026',
    departure: '08:00',
    seat: '12',
    status: 'Upcoming'
  },
  {
    id: 'TKT-X9M2L1',
    company: 'Horizon Express',
    from: 'Kigali',
    to: 'Huye',
    date: 'Oct 28, 2026',
    departure: '14:30',
    seat: '05',
    status: 'Upcoming'
  }
];

const MyTickets = () => {
  return (
    <div className="max-w-5xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">My Tickets</h2>
          <p className="text-gray-500 mt-1">View and manage your upcoming journeys.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
        {MOCK_TICKETS.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
            
            {/* Ticket Header */}
            <div className="bg-brand-blue p-4 text-white flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-brand-light/70 uppercase tracking-widest block mb-0.5">Ticket Code</span>
                <span className="text-lg font-mono font-bold tracking-wider">{ticket.id}</span>
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                {ticket.status}
              </div>
            </div>

            {/* Ticket Body */}
            <div className="p-6">
              <h3 className="font-black text-xl text-brand-orange mb-6">{ticket.company}</h3>
              
              <div className="flex items-center justify-between mb-6 relative before:content-[''] before:absolute before:h-0.5 before:bg-gray-100 before:w-full before:top-1/2 before:-translate-y-1/2 before:z-0">
                <div className="bg-white z-10 pr-4">
                  <span className="text-xs text-gray-500 font-bold uppercase block mb-1">From</span>
                  <span className="font-black text-lg text-brand-dark">{ticket.from}</span>
                </div>
                <div className="bg-white z-10 px-2">
                  <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center border-2 border-white shadow-sm">
                    <MapPin className="w-4 h-4 text-brand-blue" />
                  </div>
                </div>
                <div className="bg-white z-10 pl-4 text-right">
                  <span className="text-xs text-gray-500 font-bold uppercase block mb-1">To</span>
                  <span className="font-black text-lg text-brand-dark">{ticket.to}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100 mb-6">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-bold uppercase mb-1">
                    <Calendar className="w-3.5 h-3.5" /> Date
                  </div>
                  <strong className="text-brand-dark text-sm">{ticket.date}</strong>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-bold uppercase mb-1">
                    <Clock className="w-3.5 h-3.5" /> Time
                  </div>
                  <strong className="text-brand-dark text-sm">{ticket.departure}</strong>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1.5 text-xs text-gray-500 font-bold uppercase mb-1">
                    Seat
                  </div>
                  <strong className="text-brand-orange text-xl font-black">{ticket.seat}</strong>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-brand-light hover:bg-gray-200 text-brand-dark font-bold py-2.5 rounded-xl transition-colors border border-gray-200 text-sm flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
                <button className="flex-1 bg-brand-blue hover:bg-blue-800 text-white font-bold py-2.5 rounded-xl transition-colors shadow-md text-sm">
                  View Live Tracking
                </button>
              </div>
            </div>
            
            {/* Cutout punch holes */}
            <div className="absolute top-[72px] -left-3 w-6 h-6 bg-brand-light rounded-full border-r border-gray-100"></div>
            <div className="absolute top-[72px] -right-3 w-6 h-6 bg-brand-light rounded-full border-l border-gray-100"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;
