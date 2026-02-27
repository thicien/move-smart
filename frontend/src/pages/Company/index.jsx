export { default as CompanyLayout } from '../../layouts/CompanyLayout';
import CompanyDashboardHome from './DashboardOverview';
import ManageBuses from './ManageBuses';
import RoutesSchedules from './RoutesSchedules';

export { CompanyDashboardHome, ManageBuses, RoutesSchedules };
export const BookingsTickets = () => <div className="p-6 bg-white rounded-2xl shadow-sm"><h2 className="text-xl font-bold">Bookings & Tickets</h2></div>;
export const FleetTracking = () => <div className="p-6 bg-white rounded-2xl shadow-sm"><h2 className="text-xl font-bold">Fleet Tracking</h2></div>;
export const RevenueReports = () => <div className="p-6 bg-white rounded-2xl shadow-sm"><h2 className="text-xl font-bold">Revenue & Reports</h2></div>;
export const DriversManagement = () => <div className="p-6 bg-white rounded-2xl shadow-sm"><h2 className="text-xl font-bold">Drivers Management</h2></div>;
export const CompanyNotifications = () => <div className="p-6 bg-white rounded-2xl shadow-sm"><h2 className="text-xl font-bold">Notifications</h2></div>;
export const CompanySettings = () => <div className="p-6 bg-white rounded-2xl shadow-sm"><h2 className="text-xl font-bold">Company Settings</h2></div>;
