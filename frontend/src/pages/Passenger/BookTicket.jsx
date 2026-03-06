import { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, Users, Filter, CreditCard, ArrowRight, CheckCircle2, Bus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const BookTicket = () => {
  const navigate = useNavigate();
  // Flow steps: 1=Search, 2=Select Seat, 3=Payment Method, 4=Success
  const [step, setStep] = useState(1);
  
  // Search State
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1
  });
  const [results, setResults] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  // Seat Selection State
  const [selectedSeats, setSelectedSeats] = useState([]);
  const mockBookedSeats = [3, 7, 8, 12, 15, 22]; // Simulated booked seats

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    // Initial load: Fetch all available schedules
    const fetchInitialSchedules = async () => {
      try {
        setIsProcessing(true);
        const res = await axios.get('http://127.0.0.1:5000/api/bookings/schedules/search');
        setResults(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error('Failed to load initial schedules', error);
        setResults([]);
      } finally {
        setIsProcessing(false);
      }
    };
    fetchInitialSchedules();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setIsProcessing(true);
      const res = await axios.get('http://127.0.0.1:5000/api/bookings/schedules/search', {
        params: {
          from: searchParams.from,
          to: searchParams.to,
          date: searchParams.date,
          passengers: searchParams.passengers
        }
      });
      setResults(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Failed to search buses', error);
      alert('Failed to search available buses.');
      setResults([]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSelectSchedule = (schedule) => {
    setSelectedSchedule(schedule);
    setStep(2); // Move to seat selection
  };

  const toggleSeat = (seatId) => {
    if (mockBookedSeats.includes(seatId)) return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length < searchParams.passengers) {
        setSelectedSeats([...selectedSeats, seatId]);
      } else {
        alert(`You only requested ${searchParams.passengers} passenger(s).`);
      }
    }
  };

  const proceedToPayment = () => {
    if (selectedSeats.length < searchParams.passengers) {
      alert('Please select seats for all passengers.');
      return;
    }
    setStep(3);
  };

  const handlePayment = async () => {
    if (!paymentMethod) return alert('Select a payment method.');
    setIsProcessing(true);
    
    try {
      const token = localStorage.getItem('token');
      // Using seat number strategy: sending selected seats to API
      // Currently the created API primarily handles 1 seat per POST in schema.
      // We will loop through the selected seats to book them or modify the backend to accept an array.
      // Since schema uses a single seat string, we will convert the seats to a comma separated list for one booking.

      const res = await axios.post('http://127.0.0.1:5000/api/bookings', {
        schedule_id: selectedSchedule.id,
        seat_number: selectedSeats.join(', '),
        amount: selectedSeats.length * selectedSchedule.price,
        method: paymentMethod
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTicketData({
         ...selectedSchedule,
         ticket_code: res.data.booking.ticket_code,
         seats: selectedSeats.join(', '),
         passenger_name: 'Passenger' // In a full app, map from user profile
      });
      
      setStep(4);
    } catch (error) {
       console.error('Payment Error', error);
       alert(error.response?.data?.message || 'Payment failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('ticket-pdf-content');
    const opt = {
      margin:       0.5,
      filename:     `MoveSmart_Ticket_${ticketData?.ticket_code || 'Trip'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="max-w-5xl mx-auto pb-10">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8 px-4 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-orange -z-10 rounded transition-all duration-500" 
             style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
        
        {['Search', 'Seat Selection', 'Payment', 'Ticket'].map((label, idx) => (
          <div key={label} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md transition-colors
              ${step > idx + 1 ? 'bg-green-500 text-white' : step === idx + 1 ? 'bg-brand-orange text-white ring-4 ring-orange-100' : 'bg-white text-gray-400 border border-gray-200'}
            `}>
              {step > idx + 1 ? <CheckCircle2 className="w-6 h-6" /> : idx + 1}
            </div>
            <span className={`text-xs mt-2 font-bold ${step >= idx + 1 ? 'text-brand-dark' : 'text-gray-400'}`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* --- STEP 1: SEARCH & FILTER --- */}
      {step === 1 && (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-brand-dark mb-4">Find Your Journey</h2>
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" required placeholder="From (e.g. Kigali)" 
                  value={searchParams.from} onChange={e => setSearchParams({...searchParams, from: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/30 focus:bg-white outline-none"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" required placeholder="To (e.g. Rubavu)" 
                  value={searchParams.to} onChange={e => setSearchParams({...searchParams, to: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/30 focus:bg-white outline-none"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="date" required 
                  value={searchParams.date} onChange={e => setSearchParams({...searchParams, date: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/30 focus:bg-white outline-none"
                />
              </div>
              <div className="relative flex">
                <div className="relative flex-1">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="number" min="1" max="5" required
                    value={searchParams.passengers} onChange={e => setSearchParams({...searchParams, passengers: parseInt(e.target.value)})}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-l-xl focus:ring-2 focus:ring-brand-blue/30 focus:bg-white outline-none"
                  />
                </div>
                <button type="submit" disabled={isProcessing} className="bg-brand-orange hover:bg-orange-600 text-white font-bold px-6 rounded-r-xl transition-colors disabled:bg-orange-300">
                  {isProcessing ? 'Searching...' : 'Search'}
                </button>
              </div>
            </form>
          </div>

          {Array.isArray(results) && results.length > 0 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-700">Available Buses ({results.length})</h3>
                <button className="flex items-center gap-2 text-sm text-brand-blue font-semibold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                   <Filter className="w-4 h-4" /> Filter
                </button>
              </div>
              
              {results.map((bus) => (
                <div key={bus.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
                  {/* Company & Rating */}
                  <div className="flex flex-col md:w-1/4">
                    <span className="font-black text-lg text-brand-dark">{bus.company}</span>
                    <span className="text-sm font-semibold text-yellow-500 bg-yellow-50 px-2 py-0.5 rounded w-max mt-1">★ {bus.rating} Rating</span>
                  </div>

                  {/* Timeline */}
                  <div className="flex items-center justify-between flex-1 w-full relative before:content-[''] before:absolute before:h-0.5 before:bg-gray-200 before:w-full before:top-1/2 before:-translate-y-1/2 before:z-0">
                    <div className="bg-white z-10 pr-4 text-center">
                      <span className="block font-black text-xl text-brand-dark">{bus.departure}</span>
                      <span className="text-xs text-gray-500 font-bold uppercase">{searchParams.from || 'Origin'}</span>
                    </div>
                    
                    <div className="bg-white z-10 px-2 text-brand-orange">
                      <Bus className="w-6 h-6" />
                    </div>

                    <div className="bg-white z-10 pl-4 text-center">
                      <span className="block font-black text-xl text-brand-dark">{bus.arrival}</span>
                      <span className="text-xs text-gray-500 font-bold uppercase">{searchParams.to || 'Dest'}</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex flex-col items-center md:items-end md:w-1/4 gap-2 w-full">
                    <div className="text-center md:text-right">
                      <span className="block text-2xl font-black text-brand-blue">RWF {bus.price}</span>
                      <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">{bus.seats} Seats left</span>
                    </div>
                    <button 
                      onClick={() => handleSelectSchedule(bus)}
                      className="w-full md:w-auto bg-brand-dark hover:bg-gray-800 text-white font-bold px-6 py-2.5 rounded-xl transition-colors"
                    >
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(!Array.isArray(results) || results.length === 0) && !isProcessing && step === 1 && (
            <div className="text-center py-10 bg-gray-50 rounded-2xl border border-gray-100 mt-6">
              <p className="text-gray-500 font-medium">Search to see available trips.</p>
            </div>
          )}
        </div>
      )}

      {/* --- STEP 2: SEAT SELECTION --- */}
      {step === 2 && (
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 animate-fade-in flex flex-col md:flex-row gap-10">
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-brand-dark mb-2">Select Your Seats</h2>
            <p className="text-gray-500 mb-8">Click on the available seats to select them. You need to select {searchParams.passengers} seat(s).</p>
            
            <div className="flex items-center gap-6 mb-8 text-sm font-bold">
               <div className="flex items-center gap-2"><div className="w-5 h-5 bg-white border-2 border-green-500 rounded text-center leading-4 text-green-500">✓</div> Available</div>
               <div className="flex items-center gap-2"><div className="w-5 h-5 bg-brand-orange border-2 border-brand-orange rounded"></div> Selected</div>
               <div className="flex items-center gap-2"><div className="w-5 h-5 bg-gray-200 border-2 border-gray-300 rounded text-center leading-4 text-gray-400">×</div> Booked</div>
            </div>

            {/* Bus Layout Mock */}
            <div className="bg-gray-50 border border-gray-200 p-8 rounded-[3rem] w-max mx-auto shadow-inner relative">
               {/* Driver Area */}
               <div className="w-full flex justify-end mb-8 border-b-2 border-gray-300 pb-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-xl flex items-center justify-center text-gray-500 text-xs font-bold">Driver</div>
               </div>

               {/* Seats Grid */}
               <div className="grid grid-cols-4 gap-x-8 gap-y-4">
                  {Array.from({ length: 30 }).map((_, i) => {
                    const seatNum = i + 1;
                    const isBooked = mockBookedSeats.includes(seatNum);
                    const isSelected = selectedSeats.includes(seatNum);
                    
                    return (
                      <button
                        key={seatNum}
                        onClick={() => toggleSeat(seatNum)}
                        disabled={isBooked}
                        className={`w-12 h-12 rounded-t-xl rounded-b-sm font-bold text-sm transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center
                          ${isBooked ? 'bg-gray-200 text-gray-400 border-b-4 border-gray-300 cursor-not-allowed' : 
                            isSelected ? 'bg-brand-orange text-white border-b-4 border-orange-700 shadow-md shadow-orange-500/30' : 
                            'bg-white text-green-600 border-2 border-green-500 border-b-4 hover:bg-green-50 cursor-pointer'}
                        `}
                      >
                        {seatNum}
                      </button>
                    )
                  })}
               </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-2xl border border-gray-200 self-start sticky top-6">
            <h3 className="font-bold text-xl text-brand-dark mb-4">Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Route</span>
                <strong className="text-brand-dark">{searchParams.from} to {searchParams.to}</strong>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Company</span>
                <strong className="text-brand-dark">{selectedSchedule.company}</strong>
              </div>
              <div className="flex justify-between text-sm border-b border-gray-200 pb-3">
                <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Departure</span>
                <strong className="text-brand-dark">{searchParams.date} at {selectedSchedule.departure}</strong>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Seats selected</span>
                <strong className="text-brand-orange text-lg">
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                </strong>
              </div>
            </div>

            <div className="flex justify-between items-center bg-brand-blue text-white p-4 rounded-xl mb-6 shadow-md">
              <span className="font-bold">Total Price:</span>
              <span className="font-black text-xl">RWF {selectedSeats.length * selectedSchedule.price}</span>
            </div>

            <button 
              onClick={proceedToPayment}
              disabled={selectedSeats.length < searchParams.passengers}
              className="w-full bg-brand-orange hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 group shadow-lg"
            >
              Continue to Payment <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => setStep(1)}
              className="w-full mt-3 bg-white hover:bg-gray-100 text-gray-600 font-bold py-2.5 rounded-xl transition-colors border border-gray-200"
            >
              Back to Search
            </button>
          </div>

        </div>
      )}

      {/* --- STEP 3: PAYMENT INTEGRATION --- */}
      {step === 3 && (
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 max-w-3xl mx-auto animate-fade-in relative overflow-hidden">
          <h2 className="text-2xl font-bold text-brand-dark mb-2 text-center">Complete Your Payment</h2>
          <p className="text-gray-500 text-center mb-10">Select a payment method to securely purchase your ticket.</p>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-4">
              {['Tap&Go QR', 'MTN Mobile Money', 'Airtel Money'].map((method) => (
                <label 
                  key={method}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all
                    ${paymentMethod === method ? 'border-brand-orange bg-orange-50 scale-[1.02] shadow-md' : 'border-gray-200 hover:border-brand-blue'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment_method" 
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-brand-orange focus:ring-brand-orange"
                    />
                    <span className="font-bold text-brand-dark">{method}</span>
                  </div>
                  <CreditCard className={`w-6 h-6 ${paymentMethod === method ? 'text-brand-orange' : 'text-gray-400'}`} />
                </label>
              ))}
            </div>

            <div className="w-full md:w-2/5 flex flex-col items-center justify-center p-6 bg-brand-light rounded-2xl border border-gray-200">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wilder mb-2">Total Amount due</span>
              <span className="text-3xl font-black text-brand-blue mb-8">RWF {selectedSeats.length * selectedSchedule.price}</span>
              
              <button
                onClick={handlePayment}
                disabled={!paymentMethod || isProcessing}
                className="w-full bg-brand-orange hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-orange-500/50 flex items-center justify-center"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  `Pay RWF ${selectedSeats.length * selectedSchedule.price}`
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- STEP 4: TICKET GENERATION --- */}
      {step === 4 && (
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-green-100 max-w-2xl mx-auto text-center animate-fade-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-brand-dark mb-2">Payment Successful!</h2>
          <p className="text-gray-500 mb-8">Your ticket has been generated and sent to your phone/email.</p>

          <div id="ticket-pdf-content" className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-8 text-left relative overflow-hidden mb-8 shadow-sm">
            {/* Header / Logo simulation */}
            <div className="flex justify-between items-start mb-6 border-b-2 border-brand-orange pb-4">
               <div>
                  <h1 className="text-2xl font-black text-brand-blue tracking-tight">MoveSmart</h1>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Official E-Ticket</p>
               </div>
               <div className="text-right">
                 <div className="bg-brand-blue text-white font-black px-4 py-1.5 rounded-lg text-sm inline-block shadow-sm">
                   {ticketData?.ticket_code || 'TKT-PENDING'}
                 </div>
                 <p className="text-[10px] text-gray-400 font-mono mt-2 text-right">Scannable Validation ID</p>
               </div>
            </div>
            
            <h3 className="font-black text-2xl text-brand-orange mb-1">{ticketData?.company || selectedSchedule.company}</h3>
            <p className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-wider">{ticketData?.bus?.license_plate || 'Assigned Vehicle'}</p>
            
            <div className="grid grid-cols-2 gap-y-6 text-sm bg-gray-50/50 p-4 rounded-xl">
              <div>
                <span className="block text-gray-500 font-bold uppercase text-xs mb-1">Route Corridor</span>
                <strong className="text-gray-900 text-base">{ticketData?.route?.origin || searchParams.from} ➔ {ticketData?.route?.destination || searchParams.to}</strong>
              </div>
              <div>
                <span className="block text-gray-500 font-bold uppercase text-xs mb-1">Date & Time</span>
                <strong className="text-gray-900 text-base">{searchParams.date} at {ticketData?.departure || selectedSchedule.departure}</strong>
              </div>
              <div>
                <span className="block text-gray-500 font-bold uppercase text-xs mb-1">Lead Passenger</span>
                <strong className="text-gray-900 text-base">{ticketData?.passenger_name}</strong>
              </div>
              <div>
                <span className="block text-gray-500 font-bold uppercase text-xs mb-1">Reserved Seat(s)</span>
                <strong className="text-brand-orange text-xl font-black">{ticketData?.seats}</strong>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-end">
               <div>
                 <span className="block text-xs font-bold text-gray-400 mb-0.5">Payment Method</span>
                 <p className="font-bold text-gray-700">{paymentMethod}</p>
               </div>
               <div className="text-right mt-4 md:mt-0">
                  <span className="block text-xs font-bold text-gray-500 uppercase">Total Paid</span>
                  <span className="block text-xl font-black text-green-600">
                    RWF {selectedSeats.length * selectedSchedule.price}
                  </span>
               </div>
            </div>
            
            <div className="mt-8 text-center text-[10px] text-gray-400 border-t border-gray-100 pt-4 px-10 leading-relaxed uppercase">
               Please arrive 30 minutes prior to departure. Keep this document digital or physically printed. Present upon boarding.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleDownloadPDF}
              className="bg-brand-blue hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-colors"
            >
              Download PDF Ticket
            </button>
            <button 
              onClick={() => navigate('/tracking')}
              className="bg-brand-light hover:bg-gray-200 text-brand-blue font-bold py-3 px-6 rounded-xl border border-blue-200 transition-colors"
            >
              Track Bus Live
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

export default BookTicket;
