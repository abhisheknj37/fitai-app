import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Bell,
  Plus,
  Moon,
  Sun,
  Palette,
  Music,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Sparkles
} from 'lucide-react';

export const Topbar = () => {
  const {
    user,
    setActiveTab,
    setIsLogActivityModalOpen,
    darkMode,
    toggleDarkMode,
    themeColor,
    changeTheme,
    unreadNotifications,
    notificationsOpen,
    setNotificationsOpen,
    isMusicPlayerOpen,
    setIsMusicPlayerOpen,
    isMusicPlaying,
    currentTrack
  } = useApp();

  const [themePickerOpen, setThemePickerOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'Step Goal Progress', time: '10m ago', text: 'You hit 65% of your 12,000 daily step goal!', icon: Flame, color: 'text-amber-500' },
    { id: 2, title: 'Hydration Reminder', time: '45m ago', text: 'Drink a glass of water (250ml) to stay on track.', icon: CheckCircle2, color: 'text-blue-500' },
    { id: 3, title: 'AI Assistant Insight', time: '2h ago', text: 'Your 8-week customized weight loss plan is ready.', icon: AlertTriangle, color: 'text-emerald-500' },
  ];

  const themes = [
    { id: 'emerald', name: 'Emerald Mint', color: '#10B981' },
    { id: 'cyan', name: 'Cyber Cyan', color: '#06B6D4' },
    { id: 'orange', name: 'Sunset Blaze', color: '#F97316' },
    { id: 'purple', name: 'Royal Violet', color: '#8B5CF6' },
    { id: 'rose', name: 'Crimson Rush', color: '#F43F5E' },
  ];

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Search Input */}
      <div className="relative w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700/60 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-400"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Workout Music Launcher */}
        <button
          onClick={() => setIsMusicPlayerOpen(!isMusicPlayerOpen)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
            isMusicPlaying
              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 shadow-xs'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
          }`}
          title="Workout Music Player"
        >
          <Music className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Music</span>
          {isMusicPlaying && (
            <span className="flex gap-0.5 items-end h-2.5">
              <span className="w-0.5 h-1.5 bg-emerald-500 animate-pulse"></span>
              <span className="w-0.5 h-2.5 bg-emerald-500 animate-pulse [animation-delay:0.2s]"></span>
              <span className="w-0.5 h-2 bg-emerald-500 animate-pulse [animation-delay:0.4s]"></span>
            </span>
          )}
        </button>

        {/* Theme Picker Dropdown */}
        <div className="relative">
          <button
            onClick={() => setThemePickerOpen(!themePickerOpen)}
            title="Change Theme Palette"
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors relative"
          >
            <Palette className="w-4 h-4" />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border border-white dark:border-slate-900"
              style={{ backgroundColor: themes.find((t) => t.id === themeColor)?.color || '#10B981' }}
            ></span>
          </button>

          {themePickerOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in-50 zoom-in-95">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 block">
                Select Color Theme
              </span>
              <div className="space-y-1">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      changeTheme(t.id);
                      setThemePickerOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      themeColor === t.id
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }}></span>
                      <span>{t.name}</span>
                    </div>
                    {themeColor === t.id && <span className="text-[10px] text-emerald-500 font-bold">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dark Mode Switcher */}
        <button
          onClick={toggleDarkMode}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900"></span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-3 z-50 animate-in fade-in-50 zoom-in-95">
              <div className="px-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-sm text-slate-900 dark:text-white">Notifications</span>
                <span className="text-[11px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                  {unreadNotifications} new
                </span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-72 overflow-y-auto">
                {notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div key={n.id} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer flex gap-3 transition-colors">
                      <Icon className={`w-4 h-4 mt-0.5 ${n.color}`} />
                      <div className="flex-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{n.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* User Capsule */}
        <div
          onClick={() => setActiveTab('profile')}
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20"
          />
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{user.name}</span>
            <span className="text-[10px] text-slate-400 leading-tight">{user.role}</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
        </div>

        {/* Log Activity Button */}
        <button
          onClick={() => setIsLogActivityModalOpen(true)}
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-sm shadow-emerald-600/30 transition-all duration-150"
        >
          <Plus className="w-4 h-4" />
          <span>Log Activity</span>
        </button>
      </div>
    </header>
  );
};
