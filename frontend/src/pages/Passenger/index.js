// Simple stubs to let routing work before full implementation
import BookTicket from './BookTicket';
import MyTickets from './MyTickets';
import BookingHistory from './BookingHistory';
import TrackBus from '../Tracking/TrackBus';
import Notifications from './Notifications';
import ProfileSettings from './ProfileSettings';

// We map Live Tracking directly to TrackBus component
export const LiveTracking = TrackBus; 

export const DashboardHome = () => <div className="p-6 bg-white rounded-2xl shadow-sm"><h2 className="text-xl font-bold">Dashboard Home</h2><p>Overview of passenger activity goes here...</p></div>;
export { BookTicket, MyTickets, BookingHistory, Notifications, ProfileSettings };
