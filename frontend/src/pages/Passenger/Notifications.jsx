import { Bell, Clock, AlertTriangle, CheckCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'success', title: 'Booking Confirmed', message: 'Your payment for Kigali to Rubavu was successful. Ticket ID: TKT-A8F9B2.', time: '2 mins ago', unread: true },
  { id: 2, type: 'alert', title: 'Delay Alert', message: 'Bus RAD 424 A is delayed by 15 mins due to heavy traffic.', time: '1 hour ago', unread: true },
  { id: 3, type: 'info', title: 'Travel Reminder', message: 'Your trip to Musanze is tomorrow at 08:00 AM. Be at the station 30 mins early.', time: '1 day ago', unread: false },
  { id: 4, type: 'success', title: 'Trip Completed', message: 'You have arrived at your destination! Please rate your trip.', time: '3 days ago', unread: false },
];

const Notifications = () => {
  const [filter, setFilter] = useState('All');
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'alert': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'info': default: return <Clock className="w-5 h-5 text-brand-blue" />;
    }
  };

  const getBgColor = (type) => {
    switch(type) {
      case 'success': return 'bg-green-50 border-green-100';
      case 'alert': return 'bg-red-50 border-red-100';
      case 'info': default: return 'bg-blue-50 border-blue-100';
    }
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
            <Bell className="w-6 h-6 text-brand-orange" /> Notifications
          </h2>
          <p className="text-gray-500 mt-1">Stay updated with your travel alerts and reminders.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border border-gray-200 rounded-lg p-1 flex shadow-sm">
            {['All', 'Unread', 'Alerts'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors
                  ${filter === f ? 'bg-brand-blue text-white shadow' : 'text-gray-500 hover:text-gray-800'}
                `}
              >
                {f}
              </button>
            ))}
          </div>
          <button 
            onClick={markAllRead}
            className="text-sm font-semibold text-brand-blue hover:underline bg-white px-3 py-2 rounded-lg border border-gray-200"
          >
            Mark all read
          </button>
        </div>
      </div>

      <div className="space-y-4 animate-fade-in">
        {notifications.map((notif) => (
          <div 
            key={notif.id} 
            className={`p-5 rounded-2xl border transition-all relative overflow-hidden group
              ${notif.unread ? 'bg-white shadow-sm border-gray-200' : 'bg-gray-50/50 border-transparent'}
              hover:shadow-md
            `}
          >
            {notif.unread && (
              <div className="absolute top-0 left-0 w-1 h-full bg-brand-orange"></div>
            )}
            
            <div className="flex gap-4">
              <div className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-full border ${getBgColor(notif.type)}`}>
                {getIcon(notif.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold ${notif.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                    {notif.title}
                  </h3>
                  <span className="text-xs font-semibold text-gray-400 whitespace-nowrap">{notif.time}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                  {notif.message}
                </p>
                {notif.type === 'alert' && (
                  <button className="text-xs font-bold text-brand-blue hover:underline">Track Live Status →</button>
                )}
              </div>
              
              <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity p-2 self-start rounded-full hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100 border-dashed">
            <Bell className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p>You're all caught up! No new notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
