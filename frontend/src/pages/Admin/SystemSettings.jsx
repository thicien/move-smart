import { useState } from 'react';
import { 
  Settings, ShieldCheck, Landmark, MessageSquare, Key, Save, AlertCircle
} from 'lucide-react';

const SystemSettings = () => {
  return (
    <div className="space-y-6 font-sans animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">System Configuration</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage national transport parameters, tax rules, and API integrations.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-md transition-colors flex items-center gap-2 border border-emerald-700">
          <Save className="w-4 h-4" /> Save Configuration
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Navigation / Tabs */}
        <div className="md:col-span-1 space-y-2">
           <button className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
             <Landmark className="w-5 h-5" /> Financial & Tax Rules
           </button>
           <button className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 bg-white text-slate-600 font-bold border border-transparent hover:bg-slate-50 transition-colors">
             <ShieldCheck className="w-5 h-5 text-slate-400" /> Compliance Thresholds
           </button>
           <button className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 bg-white text-slate-600 font-bold border border-transparent hover:bg-slate-50 transition-colors">
             <MessageSquare className="w-5 h-5 text-slate-400" /> Notifications & SMS
           </button>
           <button className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 bg-white text-slate-600 font-bold border border-transparent hover:bg-slate-50 transition-colors">
             <Key className="w-5 h-5 text-slate-400" /> API Gateway Keys
           </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 space-y-6">
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-black text-slate-800 mb-4 border-b border-gray-100 pb-2">National Tax Parameters</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Standard Government Tax Baseline (%)</label>
                <p className="text-xs text-slate-500 mb-2">This percentage is automatically deducted from all gross ticket sales nationwide.</p>
                <div className="relative w-1/3">
                  <input type="number" defaultValue="5.0" step="0.1" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-slate-800 font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none pr-8" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
                </div>
              </div>

              <div className="pt-4">
                <label className="block text-sm font-bold text-slate-700 mb-1">Tax Collection Frequency</label>
                <select className="w-1/2 border border-slate-300 rounded-lg px-4 py-2 text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                  <option>Real-time (Per Ticket)</option>
                  <option>Daily Batch</option>
                  <option>Weekly Settlement</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3 text-blue-800">
               <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
               <div className="text-sm">
                 <p className="font-bold">Audit Impact Warning</p>
                 <p className="mt-1 opacity-90">Changing the base tax rate will not affect historical records. Newly issued tickets will apply the updated configuration immediately upon saving.</p>
               </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-black text-slate-800 mb-4 border-b border-gray-100 pb-2">Revenue Allocation Accounts</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Central Bank Routing Number</label>
                <input type="text" defaultValue="BNR-0091-TX-2024" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-slate-800 font-mono focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Finance Ministry Contact Email</label>
                <input type="email" defaultValue="revenues@minecofin.gov.rw" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default SystemSettings;
