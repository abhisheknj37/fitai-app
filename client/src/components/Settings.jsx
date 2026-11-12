import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Lock,
  Palette,
  Watch,
  Camera,
  CheckCircle2,
  Moon,
  Sun
} from 'lucide-react';

export const Settings = () => {
  const { user, setUser, darkMode, toggleDarkMode, themeColor, changeTheme, showToast } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('account');
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    password: '••••••••••'
  });
  const [syncDevices, setSyncDevices] = useState({
    apple: true,
    google: false,
    fitbit: true,
    garmin: false
  });
  const fileInputRef = useRef(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.updateProfile({ name: form.name, email: form.email, phone: form.phone });
      if (res.user) {
        setUser(res.user);
      }
      showToast('Profile settings updated successfully!');
    } catch (e) {
      showToast('Settings saved!');
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      setUser((prev) => ({ ...prev, avatar: base64 }));
      showToast('Avatar photo updated!');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage your account and preferences.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 overflow-x-auto no-scrollbar">
        {[
          { id: 'account', label: 'Account', icon: User },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'privacy', label: 'Privacy', icon: Lock },
          { id: 'appearance', label: 'Appearance', icon: Palette },
          { id: 'devices', label: 'Connected Devices', icon: Watch },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`pb-3 text-sm font-semibold flex items-center gap-2 transition-colors relative shrink-0 ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sub-tab 1: Account */}
      {activeSubTab === 'account' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form (Col 8) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card">
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-sm shadow-md shadow-emerald-600/30 transition-all"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>

          {/* Photo Section (Col 4) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-28 h-28 rounded-full object-cover ring-4 ring-emerald-500/20 shadow-md"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 rounded-full bg-emerald-600 text-white shadow-md hover:bg-emerald-700 transition-colors"
                title="Change Photo"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">{user.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{user.role}</p>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Change Photo
            </button>
          </div>
        </div>
      )}

      {/* Sub-tab 2: Appearance */}
      {activeSubTab === 'appearance' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-card max-w-xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Theme &amp; Display</h3>
            <p className="text-xs text-slate-400">Choose between light and dark modes.</p>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {darkMode ? 'Dark Theme' : 'Light Theme'}
                </p>
                <p className="text-xs text-slate-400">Reduce eye strain during night workouts</p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                darkMode
                  ? 'bg-slate-700 text-white hover:bg-slate-600'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {darkMode ? 'Switch to Light' : 'Switch to Dark'}
            </button>
          </div>

          {/* Color Palettes */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Brand Accent Color</h4>
            <p className="text-xs text-slate-400">Personalize your FitAI workspace with high-energy fitness themes.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                { id: 'emerald', name: 'Emerald Mint', desc: 'FitAI Classic Clean', hex: '#10B981' },
                { id: 'cyan', name: 'Cyber Cyan', desc: 'High-Tech Cardio', hex: '#06B6D4' },
                { id: 'orange', name: 'Sunset Blaze', desc: 'High Intensity Fuel', hex: '#F97316' },
                { id: 'purple', name: 'Royal Violet', desc: 'Mindful Power & Yoga', hex: '#8B5CF6' },
                { id: 'rose', name: 'Crimson Rush', desc: 'Heart-Pumping Beats', hex: '#F43F5E' },
              ].map((theme) => {
                const isSelected = themeColor === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => changeTheme(theme.id)}
                    className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-slate-900 dark:border-white shadow-md bg-slate-50 dark:bg-slate-800/80 ring-2 ring-slate-900/10 dark:ring-white/20'
                        : 'border-slate-200 dark:border-slate-700/60 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <span
                      className="w-8 h-8 rounded-xl shrink-0 shadow-sm flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: theme.hex }}
                    >
                      {isSelected ? '✓' : ''}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{theme.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{theme.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 3: Connected Devices */}
      {activeSubTab === 'devices' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-card max-w-xl space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Fitness Devices &amp; Wearables</h3>
          <p className="text-xs text-slate-400">Sync steps, sleep, and heart rate data automatically.</p>

          <div className="space-y-3">
            {[
              { id: 'apple', name: 'Apple Health', desc: 'Syncs Apple Watch & iPhone steps', connected: syncDevices.apple },
              { id: 'google', name: 'Google Fit', desc: 'Syncs Android wearables & active minutes', connected: syncDevices.google },
              { id: 'fitbit', name: 'Fitbit Sense / Charge', desc: 'Syncs sleep stages and resting HR', connected: syncDevices.fitbit },
              { id: 'garmin', name: 'Garmin Connect', desc: 'Syncs outdoor GPS routes and VO2 max', connected: syncDevices.garmin },
            ].map((dev) => (
              <div
                key={dev.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{dev.name}</h4>
                  <p className="text-xs text-slate-400">{dev.desc}</p>
                </div>
                <button
                  onClick={() => {
                    setSyncDevices((prev) => ({ ...prev, [dev.id]: !prev[dev.id] }));
                    showToast(`${dev.name} ${!dev.connected ? 'connected' : 'disconnected'}`);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    dev.connected
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {dev.connected ? 'Connected' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
