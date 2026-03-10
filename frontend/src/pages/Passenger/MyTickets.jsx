import { useState, useEffect } from 'react';
import axios from 'axios';
import { Download, Loader2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // We can grab the currently logged in user from localStorage to display passenger name
  // Note: in a real app, this might come from AuthContext
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : { name: 'Passenger' };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to view yours tickets.');
          setLoading(false);
          return;
        }

        const res = await axios.get('http://127.0.0.1:5000/api/bookings/my-bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setTickets(res.data);
      } catch (err) {
        console.error('Failed to fetch tickets:', err);
        setError('Failed to load your tickets.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleDownloadPDF = (ticketId, ticketCode) => {
    const element = document.getElementById(`ticket-${ticketId}`);
    if (!element) return;
    
    const opt = {
      margin:       0.5,
      filename:     `MoveSmart_Ticket_${ticketCode}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-10 h-10 animate-spin text-brand-orange mb-4" />
        <p className="text-gray-500 font-bold">Loading your tickets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-2xl border border-red-100 max-w-2xl mx-auto">
        <p className="text-brand-red font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">My Tickets</h2>
          <p className="text-gray-500 mt-1">View your booking history and receipts.</p>
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
           <p className="text-gray-500 font-bold">You don't have any tickets yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start animate-fade-in">
          {tickets.map((ticket) => {
            const schedule = ticket.Schedule || {};
            const route = schedule.Route || {};
            const bus = schedule.Bus || {};
            const company = bus.Company || {};
            const payment = ticket.Payments?.[0] || {}; // Payment might be an array or single object depending on association
            const paymentMethod = payment.method || 'Unknown';
            const paymentStatus = ticket.payment_status || 'PAID';
            
            const issueDate = new Date(ticket.createdAt).toLocaleString('en-GB', { 
               day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' 
            });

            return (
              <div key={ticket.id} className="flex flex-col items-center mb-4">
                {/* The Ticket Receipt itself */}
                <div id={`ticket-${ticket.id}`} className="bg-white border-2 border-gray-800 p-8 text-left relative overflow-hidden mb-4 w-full max-w-sm mx-auto font-mono text-sm text-gray-900 shadow-xl">
                  <div className="text-center mb-6 border-b-2 border-dashed border-gray-800 pb-4">
                    <h1 className="text-xl font-black tracking-widest uppercase text-brand-dark">MoveSmart Ticket</h1>
                  </div>
                  
                  <div className="space-y-1 mb-6">
                    <div className="flex justify-between"><span>Ticket ID:</span> <strong>MS-{new Date(ticket.createdAt).getFullYear()}-{(ticket.id).toString().padStart(6, '0')}</strong></div>
                    <div className="flex justify-between"><span>Booking Code:</span> <strong>{ticket.ticket_code}</strong></div>
                    <div className="flex justify-between"><span>Issued:</span> <strong>{issueDate}</strong></div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-bold border-b border-gray-300 pb-1 mb-2 uppercase text-xs text-brand-orange">Passenger Information</h3>
                    <div className="flex justify-between space-x-4"><span className="shrink-0">Name:</span> <strong className="truncate text-right">{user.name}</strong></div>
                    <div className="flex justify-between"><span>Phone:</span> <strong>{user.phone || 'Not provided'}</strong></div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-bold border-b border-gray-300 pb-1 mb-2 uppercase text-xs text-brand-orange">Journey Information</h3>
                    <div className="flex justify-between"><span>Company:</span> <strong className="text-right">{company.name || 'N/A'}</strong></div>
                    <div className="flex justify-between"><span>Bus:</span> <strong>{bus.license_plate || 'N/A'}</strong></div>
                    <div className="flex justify-between"><span>Route:</span> <strong>{route.origin || 'N/A'} → {route.destination || 'N/A'}</strong></div>
                    <div className="flex justify-between"><span>Departure:</span> <strong>{route.origin || 'N/A'} Bus Park</strong></div>
                    <div className="flex justify-between"><span>Departure Time:</span> <strong>{schedule.departure_time ? new Date(schedule.departure_time).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) : 'N/A'}</strong></div>
                    <div className="flex justify-between"><span>Arrival:</span> <strong>{route.destination || 'N/A'} Bus Terminal</strong></div>
                    <div className="flex justify-between"><span>Arrival Time:</span> <strong>{schedule.arrival_time ? new Date(schedule.arrival_time).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) : 'N/A'}</strong></div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-bold border-b border-gray-300 pb-1 mb-2 uppercase text-xs text-brand-orange">Seat Information</h3>
                    <div className="flex justify-between"><span>Seat Number:</span> <strong>{ticket.seat_number}</strong></div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-bold border-b border-gray-300 pb-1 mb-2 uppercase text-xs text-brand-orange">Payment Details</h3>
                    <div className="flex justify-between"><span>Ticket Price:</span> <strong>{Number(schedule.price || 0).toLocaleString()} RWF</strong></div>
                    <div className="flex justify-between"><span>Payment Method:</span> <strong>{paymentMethod}</strong></div>
                    <div className="flex justify-between"><span>Transaction ID:</span> <strong>TXN-{(payment.id || 0).toString().padStart(6, '0')}</strong></div>
                    <div className="flex justify-between"><span>Status:</span> <strong className={paymentStatus === 'PAID' ? 'text-green-600' : 'text-gray-900'}>{paymentStatus.toUpperCase()}</strong></div>
                  </div>

                  <div className="space-y-1 mb-6 text-xs">
                    <div className="flex justify-between"><span>Route Code:</span> <strong>{route.code || 'N/A'}</strong></div>
                    <div className="flex justify-between"><span>Tax Included:</span> <strong>5%</strong></div>
                  </div>

                  <div className="text-center mb-6">
                    <div className="inline-block p-1 border-2 border-gray-800 mb-1">
                      <div className="w-20 h-20 bg-white flex flex-wrap content-start">
                        {Array.from({length: 25}).map((_, i) => (
                          <div key={i} className={`w-4 h-4 ${(ticket.id * i) % 3 === 0 ? 'bg-black' : 'bg-transparent'}`}></div>
                        ))}
                      </div>
                    </div>
                    <div className="font-bold tracking-widest text-xs mb-1">[ QR CODE ]</div>
                  </div>

                  <div className="text-center border-t-2 border-dashed border-gray-800 pt-4">
                    <p className="font-bold uppercase text-xs">Please arrive 30 minutes before departure</p>
                  </div>
                </div>

                {/* Actions outside the receipt */}
                <button 
                  onClick={() => handleDownloadPDF(ticket.id, ticket.ticket_code)}
                  className="w-full max-w-sm flex items-center justify-center gap-2 bg-brand-light hover:bg-gray-200 text-brand-dark font-bold py-3 rounded-xl transition-colors border border-gray-300 shadow-sm"
                >
                  <Download className="w-5 h-5" /> Download Digital Copy
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
