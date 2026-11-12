import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Scale,
  Activity,
  Footprints,
  Flame,
  Plus,
  TrendingDown,
  Droplets,
  Moon,
  ChevronDown,
  ArrowDownRight
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

export const Dashboard = () => {
  const { todayStats, setIsLogActivityModalOpen } = useApp();
  const [timeRange, setTimeRange] = useState('6 Months');

  const weightData = [
    { month: 'Jan', weight: 78.0, target: 70 },
    { month: 'Feb', weight: 76.5, target: 70 },
    { month: 'Mar', weight: 75.0, target: 70 },
    { month: 'Apr', weight: 74.2, target: 70 },
    { month: 'May', weight: 72.8, target: 70 },
    { month: 'Jun', weight: todayStats.weight, target: 70 }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Welcome back! Here's your health overview.</p>
        </div>

        <button
          onClick={() => setIsLogActivityModalOpen(true)}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm shadow-emerald-600/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Log Activity</span>
        </button>
      </div>

      {/* 4 Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Weight */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{todayStats.weight}</span>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">kg</span>
              </div>
              <p className="text-xs text-slate-400">Current Weight</p>
              <div className="flex items-center gap-1 mt-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <ArrowDownRight className="w-3.5 h-3.5" />
                <span>{todayStats.weightChange} kg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stat 2: BMI */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{todayStats.bmi}</span>
              <p className="text-xs text-slate-400">BMI (Normal)</p>
              <span className="inline-block mt-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                {todayStats.bmiCategory}
              </span>
            </div>
          </div>
        </div>

        {/* Stat 3: Steps */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Footprints className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {todayStats.steps.toLocaleString()}
              </span>
              <p className="text-xs text-slate-400">Steps Today</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">{todayStats.stepsPercentage}%</span> of {todayStats.stepsGoal.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Stat 4: Calories */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {todayStats.caloriesBurned.toLocaleString()}
              </span>
              <p className="text-xs text-slate-400">Calories Burned</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                <span className="text-amber-600 dark:text-amber-400 font-bold">{todayStats.caloriesLeft}</span> left
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Weight Progress & Today's Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weight Progress Chart (Col 8) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Weight Progress</h2>
              <p className="text-xs text-slate-400">Track your weekly and monthly transformation</p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
              >
                <option>3 Months</option>
                <option>6 Months</option>
                <option>1 Year</option>
              </select>
            </div>
          </div>

          {/* Current weight tooltip capsule */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-slate-600 dark:text-slate-400">Actual Weight (kg)</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 h-0.5 border-t border-dashed border-slate-400"></span>
                <span className="text-slate-400">Target (70 kg)</span>
              </div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300">
              Current: {todayStats.weight} kg
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis domain={[65, 82]} stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#1E293B',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                  formatter={(value) => [`${value} kg`, 'Weight']}
                />
                <ReferenceLine y={70} stroke="#94A3B8" strokeDasharray="4 4" />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#10B981', strokeWidth: 2, stroke: '#FFFFFF' }}
                  activeDot={{ r: 7, fill: '#059669' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today's Goals (Col 4) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">Today's Goals</h2>
            <p className="text-xs text-slate-400 mb-6">Daily completion status</p>

            <div className="space-y-4">
              {/* Goal 1: Steps */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Footprints className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Steps</p>
                    <p className="text-[11px] text-slate-400">{todayStats.steps.toLocaleString()} / {todayStats.stepsGoal.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${todayStats.stepsPercentage}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 w-8 text-right">
                    {todayStats.stepsPercentage}%
                  </span>
                </div>
              </div>

              {/* Goal 2: Water */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Water</p>
                    <p className="text-[11px] text-slate-400">{todayStats.waterLiters} / {todayStats.waterGoalLiters} L</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${todayStats.waterPercentage}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 w-8 text-right">
                    {todayStats.waterPercentage}%
                  </span>
                </div>
              </div>

              {/* Goal 3: Calories */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Calories</p>
                    <p className="text-[11px] text-slate-400">{todayStats.caloriesBurned} / {todayStats.caloriesTarget}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${todayStats.caloriesPercentage}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 w-8 text-right">
                    {todayStats.caloriesPercentage}%
                  </span>
                </div>
              </div>

              {/* Goal 4: Sleep */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                    <Moon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Sleep</p>
                    <p className="text-[11px] text-slate-400">{todayStats.sleepHours} / {todayStats.sleepGoalHours} Hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: `${todayStats.sleepPercentage}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 w-8 text-right">
                    {todayStats.sleepPercentage}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold cursor-pointer hover:underline">
              Daily Average Completion: 76.2%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
