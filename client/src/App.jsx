import React from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { AIAssistant } from './components/AIAssistant';
import { Profile } from './components/Profile';
import { Workouts } from './components/Workouts';
import { Nutrition } from './components/Nutrition';
import { Tracking } from './components/Tracking';
import { HealthReports } from './components/HealthReports';
import { EmergencyAssistance } from './components/EmergencyAssistance';
import { Community } from './components/Community';
import { Settings } from './components/Settings';
import { MobilePreviewModal } from './components/MobilePreviewModal';
import { LogActivityModal } from './components/LogActivityModal';
import { CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

export default function App() {
  const { activeTab, toasts } = useApp();

  // If on Landing Page, show full landing layout
  if (activeTab === 'landing') {
    return (
      <div className="relative">
        <LandingPage />
        <MobilePreviewModal />
        <ToastContainer toasts={toasts} />
      </div>
    );
  }

  // App Layout with Sidebar & Topbar
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />

        <main className="flex-1 overflow-y-auto">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'profile' && <Profile />}
          {activeTab === 'ai-assistant' && <AIAssistant />}
          {activeTab === 'workouts' && <Workouts />}
          {activeTab === 'nutrition' && <Nutrition />}
          {activeTab === 'tracking' && <Tracking />}
          {activeTab === 'reports' && <HealthReports />}
          {activeTab === 'community' && <Community />}
          {activeTab === 'emergency' && <EmergencyAssistance />}
          {activeTab === 'settings' && <Settings />}
        </main>
      </div>

      {/* Modals & Overlays */}
      <MobilePreviewModal />
      <LogActivityModal />
      <ToastContainer toasts={toasts} />
    </div>
  );
}

// Toast Alert Overlay
const ToastContainer = ({ toasts }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold animate-in slide-in-from-bottom-5 duration-200 pointer-events-auto ${
            toast.type === 'danger'
              ? 'bg-red-600 text-white shadow-red-600/30'
              : toast.type === 'warning'
              ? 'bg-amber-500 text-white shadow-amber-500/30'
              : 'bg-emerald-600 text-white shadow-emerald-600/30'
          }`}
        >
          {toast.type === 'danger' ? (
            <AlertCircle className="w-4 h-4" />
          ) : toast.type === 'warning' ? (
            <AlertTriangle className="w-4 h-4" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
