import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  Droplets,
  Footprints,
  Moon,
  Flame,
  Scale,
  Plus,
  Minus,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const Tracking = () => {
  const { todayStats, setTodayStats, showToast } = useApp();
  const [activeMetricTab, setActiveMetricTab] = useState('water');
  const [weeklyWater, setWeeklyWater] = useState([
    { day: 'Mon', amount: 2.0 },
    { day: 'Tue', amount: 2.2 },
    { day: 'Wed', amount: 1.8 },
    { day: 'Thu', amount: 2.4 },
    { day: 'Fri', amount: 2.1 },
    { day: 'Sat', amount: 2.5 },
    { day: 'Sun', amount: todayStats.waterLiters }
  ]);

  const handleWaterDelta = async (delta) => {
    try {
      const res = await api.updateWater(delta);
      if (res.water) {
        setTodayStats((prev) => ({
          ...prev,
          waterLiters: res.water.currentLiters,
          waterPercentage: res.water.percentage
        }));
        setWeeklyWater(res.water.weekly);
        showToast(res.message);
      }
    } catch (err) {
      // Optimistic update
      const newL = Math.max(0, parseFloat((todayStats.waterLiters + delta).toFixed(2)));
      const pct = Math.min(100, Math.round((newL / todayStats.waterGoalLiters) * 100));
      setTodayStats((prev) => ({ ...prev, waterLiters: newL, waterPercentage: pct }));
      showToast(delta > 0 ? '+250ml logged!' : '-250ml removed');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Tracking</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Track your daily activities and health metrics.
        </p>
      </div>

      {/* Metric Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 overflow-x-auto no-scrollbar">
        {[
          { id: 'steps', label: 'Steps', icon: Footprints },
          { id: 'water', label: 'Water Intake', icon: Droplets },
          { id: 'sleep', label: 'Sleep', icon: Moon },
          { id: 'calories', label: 'Calories', icon: Flame },
          { id: 'weight', label: 'Weight', icon: Scale },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeMetricTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveMetricTab(tab.id)}
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

      {/* Main Content Area */}
      {activeMetricTab === 'water' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Water Intake Card (Col 5) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col justify-between items-center text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider self-start">
              Hydration Goal
            </span>

            {/* Big Water Drop Icon */}
            <div className="my-6 w-24 h-24 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-500 flex items-center justify-center shadow-inner">
              <Droplets className="w-12 h-12 fill-blue-500/20" />
            </div>

            {/* Liter numbers */}
            <div className="space-y-1">
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {todayStats.waterLiters} <span className="text-lg font-medium text-slate-400">/ {todayStats.waterGoalLiters} L</span>
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                {todayStats.waterPercentage}% of your goal
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-xs mt-4 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${todayStats.waterPercentage}%` }}
              ></div>
            </div>

            {/* Minus / Plus Quick Buttons */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => handleWaterDelta(-0.25)}
                className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-sm active:scale-95 transition-all"
                title="Remove 250ml"
              >
                <Minus className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleWaterDelta(+0.25)}
                className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-md shadow-emerald-600/30 active:scale-95 transition-all"
                title="Add 250ml glass of water"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">1 Tap = 250ml glass</p>
          </div>

          {/* Weekly Progress Bar Chart (Col 7) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Weekly Progress</h2>
                <p className="text-xs text-slate-400">Daily water intake in liters</p>
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-xl">
                Avg: 2.1 L/day
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyWater} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 3]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#1E293B',
                      borderRadius: '0.75rem',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                    formatter={(val) => [`${val} Liters`, 'Intake']}
                  />
                  <Bar dataKey="amount" fill="#38BDF8" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
              <span>Goal: 2.5 L</span>
              <span className="text-emerald-600 font-semibold">Consistent this week</span>
            </div>
          </div>
        </div>
      )}

      {/* Alternative Metric Views */}
      {activeMetricTab !== 'water' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-card text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
            {activeMetricTab === 'steps' && <Footprints className="w-8 h-8" />}
            {activeMetricTab === 'sleep' && <Moon className="w-8 h-8" />}
            {activeMetricTab === 'calories' && <Flame className="w-8 h-8" />}
            {activeMetricTab === 'weight' && <Scale className="w-8 h-8" />}
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize">
            {activeMetricTab} Tracker
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Viewing detailed daily logs and historical trend analysis for {activeMetricTab}.
          </p>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white pt-2">
            {activeMetricTab === 'steps' && `${todayStats.steps.toLocaleString()} steps`}
            {activeMetricTab === 'sleep' && `${todayStats.sleepHours} hrs`}
            {activeMetricTab === 'calories' && `${todayStats.caloriesBurned} kcal`}
            {activeMetricTab === 'weight' && `${todayStats.weight} kg`}
          </div>
        </div>
      )}
    </div>
  );
};
