import { useState } from 'react';
import { 
  Settings, ShieldAlert, Users, Database, Key, Clock, Save, 
  Trash2, Plus, Edit2, AlertTriangle, UserCheck
} from 'lucide-react';

const MOCK_ADMINS = [
  { id: 1, name: 'Director General RURA', email: 'dg@rura.gov.rw', role: 'Super Admin', status: 'Active', lastLogin: 'Today 08:30 AM' },
  { id: 2, name: 'Chief Revenue Officer', email: 'revenue@rra.gov.rw', role: 'Revenue Auditor', status: 'Active', lastLogin: 'Today 10:15 AM' },
  { id: 3, name: 'Head of Compliance', email: 'compliance@rura.gov.rw', role: 'Enforcement Chief', status: 'Active', lastLogin: 'Yesterday 16:45 PM' },
  { id: 4, name: 'System Analyst', email: 'it.admin@rura.gov.rw', role: 'System Admin', status: 'Suspended', lastLogin: 'Oct 15, 2024' },
];

const SystemSettings = () => {
  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pb-5 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-slate-600" /> Platform Configuration
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage top-level regulators, audit retention, and core system parameters.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Settings Form Column */}
        <div className="lg:col-span-1 space-y-6">
           
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
             <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
               <Database className="w-5 h-5 text-indigo-500" />
               <h3 className="text-base font-black text-slate-800">Audit Log Retention</h3>
             </div>
             
             <div className="space-y-4">
                <div>
                   <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Immutable Log Lifespan</label>
                   <select className="flex w-full px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 bg-slate-50 focus:border-indigo-500 outline-none">
                     <option>1 Year (Regulatory Default)</option>
                     <option>3 Years (Extended Audit)</option>
                     <option>5 Years (Maximum Security)</option>
                   </select>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                   <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                   <p className="text-xs font-bold text-amber-800 leading-relaxed">
                     Modifying retention policy requires confirmation via Multi-Factor Authentication. Expired logs are wiped automatically.
                   </p>
                </div>
                <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-bold transition-colors">
                  Save Policy Policy
                </button>
             </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
             <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
               <ShieldAlert className="w-5 h-5 text-red-500" />
               <h3 className="text-base font-black text-slate-800">Security & Authentication</h3>
             </div>
             
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <div>
                     <p className="text-sm font-black text-slate-800">Enforce 2FA strictly</p>
                     <p className="text-[10px] font-bold text-slate-500 uppercase">Applies to all Gov Admins</p>
                   </div>
                   <div className="w-10 h-6 bg-emerald-500 rounded-full cursor-pointer relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow"></div>
                   </div>
                </div>
                <div className="flex items-center justify-between">
                   <div>
                     <p className="text-sm font-black text-slate-800">Auto-Suspend Stale</p>
                     <p className="text-[10px] font-bold text-slate-500 uppercase">Lock accounts &gt; 60 days</p>
                   </div>
                   <div className="w-10 h-6 bg-emerald-500 rounded-full cursor-pointer relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow"></div>
                   </div>
                </div>
             </div>
           </div>

        </div>

        {/* Admin Management Column */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
           
           <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-slate-50 rounded-t-xl">
             <div>
               <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                 <Users className="w-5 h-5 text-indigo-500" /> Registered Government Operators
               </h3>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Role-Based Access Control</p>
             </div>
             <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition-colors flex items-center gap-2">
               <Plus className="w-4 h-4" /> Provision New Admin
             </button>
           </div>

           <div className="flex-1 overflow-x-auto">
             <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-slate-200 text-slate-400 text-[10px] uppercase tracking-widest">
                    <th className="px-6 py-4 font-black">Admin Identity</th>
                    <th className="px-6 py-4 font-black">Assigned Authority</th>
                    <th className="px-6 py-4 font-black text-center">Security Status</th>
                    <th className="px-6 py-4 font-black">Last Access</th>
                    <th className="px-6 py-4 font-black text-right">Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_ADMINS.map(admin => (
                    <tr key={admin.id} className="hover:bg-slate-50 transition-colors group">
                       <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                             {admin.name.charAt(0)}
                           </div>
                           <div>
                             <p className="text-sm font-black text-slate-900">{admin.name}</p>
                             <p className="text-[10px] text-slate-500 font-bold tracking-widest">{admin.email}</p>
                           </div>
                         </div>
                       </td>
                       <td className="px-6 py-4">
                         <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-wider border border-slate-200">
                           {admin.role === 'Super Admin' && <Key className="w-3 h-3 text-indigo-500" />}
                           {admin.role}
                         </span>
                       </td>
                       <td className="px-6 py-4 text-center">
                         {admin.status === 'Active' ? (
                            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                              <UserCheck className="w-3 h-3" /> Active
                            </span>
                         ) : (
                            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider border border-slate-200">
                              Suspended
                            </span>
                         )}
                       </td>
                       <td className="px-6 py-4">
                         <span className="text-xs font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded select-all cursor-text">{admin.lastLogin}</span>
                       </td>
                       <td className="px-6 py-4 text-right">
                         <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="Edit Rights">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            {admin.role !== 'Super Admin' && (
                              <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Revoke Access">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                         </div>
                       </td>
                    </tr>
                  ))}
                </tbody>
             </table>
           </div>

        </div>

      </div>

    </div>
  );
};

export default SystemSettings;
