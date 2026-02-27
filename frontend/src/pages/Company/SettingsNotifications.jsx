import { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Building2, Landmark, Smartphone, Save } from 'lucide-react';

const CompanySettings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold text-gray-800">Company Configuration</h2>
        <p className="text-gray-500 text-sm mt-1">Manage your enterprise profile, API integrations, and billing settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Settings Navigation Sidebar */}
        <div className="col-span-1 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-orange-600 font-bold rounded-xl shadow-sm border border-orange-100 transition-colors text-sm">
            <Building2 className="w-5 h-5" /> Enterprise Profile
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 font-semibold hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors text-sm">
            <Landmark className="w-5 h-5" /> Banking & Payouts
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 font-semibold hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors text-sm">
            <Smartphone className="w-5 h-5" /> API Webhooks (Tap&Go)
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 font-semibold hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors text-sm">
            <Shield className="w-5 h-5" /> Security & Access
          </button>
        </div>

        {/* Settings Content Area */}
        <div className="col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
          <form className="space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-6">
              <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-300">
                <span className="text-2xl font-black text-slate-400">MS</span>
              </div>
              <div>
                <button type="button" className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 shadow-sm">
                  Upload New Logo
                </button>
                <p className="text-xs text-slate-400 mt-2">Recommended size: 256x256px (PNG, JPG)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Legal Enterprise Name</label>
                <input type="text" defaultValue="MoveSmart Transport Ltd." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500/30 focus:bg-white outline-none text-slate-800 font-semibold" />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">RDB Registration Number (TIN)</label>
                <input type="text" disabled defaultValue="108923485" className="w-full px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg outline-none text-slate-500 cursor-not-allowed font-mono text-sm" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Support Contact Phone</label>
                <input type="text" defaultValue="+250 788 000 000" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500/30 focus:bg-white outline-none text-slate-800" />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Government API Integration Sync</label>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-emerald-800 block">RURA Compliance Gateway Active</span>
                    <span className="text-xs text-emerald-600 font-medium">Auto-syncing taxes and manifests to government portal.</span>
                  </div>
                  <span className="bg-emerald-500 w-3 h-3 rounded-full shadow-md shadow-emerald-500/50 animate-pulse"></span>
                </div>
              </div>
            </div>

            <div className="pt-8 flex justify-end">
              <button type="button" className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-bold shadow-md transition-colors">
                <Save className="w-4 h-4" /> Save Configuration
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export const CompanyNotifications = () => {
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">System Alerts</h2>
        </div>
        <button className="text-sm font-semibold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors">
          Mark All as Read
        </button>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-50">
         <div className="p-4 bg-orange-50 hover:bg-orange-100/50 transition-colors flex gap-4">
           <div className="mt-1"><Shield className="w-5 h-5 text-orange-500" /></div>
           <div>
             <h4 className="font-bold text-slate-800 text-sm">Regulatory Update Required</h4>
             <p className="text-xs text-slate-600 mt-1">RURA requires an update to your fleet manifest documentation by the end of the month.</p>
             <span className="text-[10px] font-bold text-orange-600 mt-2 block">2 HOURS AGO</span>
           </div>
         </div>
         <div className="p-4 hover:bg-slate-50 transition-colors flex gap-4">
           <div className="mt-1"><Landmark className="w-5 h-5 text-emerald-500" /></div>
           <div>
             <h4 className="font-bold text-slate-800 text-sm">Tap&Go Settlement Complete</h4>
             <p className="text-xs text-slate-600 mt-1">RWF 450,000 has been successfully settled to your corporate bank account.</p>
             <span className="text-[10px] font-bold text-slate-400 mt-2 block">YESTERDAY</span>
           </div>
         </div>
      </div>
    </div>
  );
};

export { CompanySettings };
