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

// Admin Views
import {
  AdminLayout,
  DashboardOverview as AdminDashboardOverview,
  FleetMonitoring,
  CompaniesManagement,
  RouteMonitoring,
  RevenueControl,
  ComplianceViolations,
  AnalyticsReports,
  SystemSettings,
  AuditLogs
} from './pages/Admin';

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return <div className="flex h-screen items-center justify-center font-bold">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'company_admin') return <Navigate to="/company/dashboard" replace />;
    if (user.role === 'system_admin') return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/dashboard" replace />;
  }
  
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
            <ProtectedRoute allowedRoles={['company_admin']}>
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

        {/* Protected Government Admin Routes */}
        <Route 
          element={
            <ProtectedRoute allowedRoles={['system_admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboardOverview />} />
          <Route path="/admin/fleet" element={<FleetMonitoring />} />
          <Route path="/admin/companies" element={<CompaniesManagement />} />
          <Route path="/admin/routes" element={<RouteMonitoring />} />
          <Route path="/admin/revenue" element={<RevenueControl />} />
          <Route path="/admin/compliance" element={<ComplianceViolations />} />
          <Route path="/admin/reports" element={<AnalyticsReports />} />
          <Route path="/admin/settings" element={<SystemSettings />} />
          <Route path="/admin/audit" element={<AuditLogs />} />
        </Route>
        
        {/* Fallback Catch-All Route */}
        <Route path="*" element={<div className="flex h-screen items-center justify-center font-bold text-3xl text-red-600 bg-red-50">APPLICATION ROUTE NOT FOUND (404)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
