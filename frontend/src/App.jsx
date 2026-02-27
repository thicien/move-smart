import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TrackBus from './pages/Tracking/TrackBus';
import PassengerLayout from './layouts/PassengerLayout';
// Passenger Views
import { 
  DashboardHome, BookTicket, MyTickets, 
  LiveTracking, Notifications, BookingHistory, ProfileSettings 
} from './pages/Passenger';
import PassengerDashboard from './pages/Dashboard/PassengerDashboard';

// Company Views
import {
  CompanyLayout,
  CompanyDashboardHome,
  ManageBuses,
  RoutesSchedules,
  BookingsTickets,
  FleetTracking,
  RevenueReports,
  DriversManagement,
  CompanyNotifications,
  CompanySettings
} from './pages/Company';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return <div className="flex h-screen items-center justify-center font-bold">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
};

// Layout wrapping for standard pages (Navbar + Content)
const StandardLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow pt-16">
      {children}
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Standard Navbar */}
        <Route path="/" element={<StandardLayout><Home /></StandardLayout>} />
        <Route path="/login" element={<StandardLayout><Login /></StandardLayout>} />
        <Route path="/register" element={<StandardLayout><Register /></StandardLayout>} />
        <Route path="/track" element={<StandardLayout><TrackBus /></StandardLayout>} />

        {/* Protected Passenger Dashboard Routes */}
        <Route 
          element={
            <ProtectedRoute>
              <PassengerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<PassengerDashboard />} />
          <Route path="/book" element={<BookTicket />} />
          <Route path="/tickets" element={<MyTickets />} />
          <Route path="/tracking" element={<LiveTracking />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/history" element={<BookingHistory />} />
          <Route path="/profile" element={<ProfileSettings />} />
        </Route>

        {/* Protected Company ERP Routes */}
        <Route 
          element={
            <ProtectedRoute>
              <CompanyLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/company/dashboard" element={<CompanyDashboardHome />} />
          <Route path="/company/buses" element={<ManageBuses />} />
          <Route path="/company/routes" element={<RoutesSchedules />} />
          <Route path="/company/bookings" element={<BookingsTickets />} />
          <Route path="/company/tracking" element={<FleetTracking />} />
          <Route path="/company/reports" element={<RevenueReports />} />
          <Route path="/company/drivers" element={<DriversManagement />} />
          <Route path="/company/notifications" element={<CompanyNotifications />} />
          <Route path="/company/settings" element={<CompanySettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
