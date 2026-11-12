import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Smartphone,
  Flame,
  Droplets,
  Moon,
  Footprints,
  Bot,
  Send,
  Play,
  ArrowRight,
  Sparkles,
  Apple
} from 'lucide-react';

export const MobilePreviewModal = () => {
  const { isMobilePreviewOpen, setIsMobilePreviewOpen, user, todayStats } = useApp();
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  if (!isMobilePreviewOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in-50">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-6xl w-full max-h-[92vh] flex flex-col relative text-white">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold">FitAI Mobile App Showcase (As shown in reference mockup)</h2>
          </div>
          <button
            onClick={() => setIsMobilePreviewOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Phones Grid Container */}
        <div className="flex-1 overflow-y-auto py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {/* Phone 1: Splash / Welcome */}
            <div className="w-[240px] h-[480px] bg-slate-950 rounded-[38px] p-2.5 shadow-2xl border-4 border-slate-700 flex flex-col relative overflow-hidden">
              {/* Notch */}
              <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-2 shrink-0"></div>

              {/* Screen Content */}
              <div className="flex-1 rounded-[28px] bg-gradient-to-b from-[#0F382E] via-[#092B23] to-[#041D17] p-5 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 mb-3">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-white">FitAI</h3>
                <p className="text-[11px] text-emerald-200 mt-2 leading-relaxed max-w-[160px]">
                  Your Personal Health &amp; Fitness Assistant
                </p>

                <div className="mt-8 w-full space-y-2">
                  <button className="w-full py-2.5 rounded-full bg-emerald-500 text-white font-bold text-xs shadow-md">
                    Get Started
                  </button>
                  <button className="w-full py-2 text-xs font-semibold text-emerald-200/80 hover:text-white">
                    Login
                  </button>
                </div>
              </div>
            </div>

            {/* Phone 2: Mobile Dashboard */}
            <div className="w-[240px] h-[480px] bg-slate-950 rounded-[38px] p-2.5 shadow-2xl border-4 border-slate-700 flex flex-col relative overflow-hidden text-slate-800">
              <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-2 shrink-0"></div>

              <div className="flex-1 rounded-[28px] bg-slate-50 p-3.5 flex flex-col overflow-y-auto no-scrollbar space-y-3">
                {/* Greeting */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400">Good Morning</p>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">Abhishek</h4>
                  </div>
                  <img src={user.avatar} alt="User" className="w-7 h-7 rounded-full object-cover" />
                </div>

                {/* 2 Top Pills */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white p-2 rounded-xl shadow-xs border border-slate-100">
                    <span className="text-[10px] text-slate-400">Steps</span>
                    <p className="text-xs font-bold text-indigo-600">7,856</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl shadow-xs border border-slate-100">
                    <span className="text-[10px] text-slate-400">Weight</span>
                    <p className="text-xs font-bold text-emerald-600">72 kg</p>
                  </div>
                </div>

                {/* Quick stats mini row */}
                <div className="flex justify-between bg-white p-2 rounded-xl border border-slate-100 text-[10px]">
                  <div className="flex items-center gap-1 text-blue-500">
                    <Droplets className="w-3 h-3" />
                    <span>1.8L</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Flame className="w-3 h-3" />
                    <span>1,850</span>
                  </div>
                  <div className="flex items-center gap-1 text-purple-500">
                    <Moon className="w-3 h-3" />
                    <span>7h</span>
                  </div>
                </div>

                {/* Today's Plan */}
                <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                  <span className="text-[9px] font-bold text-emerald-700 uppercase">Today's Plan</span>
                  <p className="text-[11px] font-bold text-slate-900 mt-0.5">Full Body HIIT</p>
                  <p className="text-[9px] text-slate-500">30 min • 4 exercises</p>
                  <button className="mt-2 w-full py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-bold">
                    Start Workout
                  </button>
                </div>
              </div>
            </div>

            {/* Phone 3: Mobile AI Chat */}
            <div className="w-[240px] h-[480px] bg-slate-950 rounded-[38px] p-2.5 shadow-2xl border-4 border-slate-700 flex flex-col relative overflow-hidden text-slate-800">
              <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-2 shrink-0"></div>

              <div className="flex-1 rounded-[28px] bg-slate-50 p-3.5 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-900">FitAI Assistant</h4>
                      <span className="text-[9px] text-emerald-600 font-semibold">• Online</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl shadow-xs border border-slate-100 text-[10px] text-slate-700 leading-relaxed">
                    Here's a customized home workout plan for you:
                  </div>

                  <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200">
                    <p className="text-[10px] font-bold text-slate-900">Home Workout Plan</p>
                    <p className="text-[9px] text-slate-500">20 mins cardio + core</p>
                    <button className="mt-1.5 w-full py-1 rounded-lg bg-emerald-600 text-white text-[9px] font-bold">
                      View Plan
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pt-2">
                  <input
                    type="text"
                    placeholder="Ask assistant..."
                    className="flex-1 text-[10px] px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                  <button className="p-1.5 bg-emerald-600 text-white rounded-lg">
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Phone 4: Mobile Nutrition */}
            <div className="w-[240px] h-[480px] bg-slate-950 rounded-[38px] p-2.5 shadow-2xl border-4 border-slate-700 flex flex-col relative overflow-hidden text-slate-800">
              <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-2 shrink-0"></div>

              <div className="flex-1 rounded-[28px] bg-slate-50 p-3.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <h4 className="text-[11px] font-bold text-slate-900">Nutrition</h4>
                    <span className="text-[9px] text-slate-400">Calorie Tracking</span>
                  </div>

                  {/* Ring */}
                  <div className="my-4 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full border-4 border-emerald-500 flex flex-col items-center justify-center bg-white shadow-xs">
                      <span className="text-base font-extrabold text-slate-900">1,850</span>
                      <span className="text-[9px] text-slate-400">kcal</span>
                    </div>

                    <div className="flex gap-2 text-[9px] font-semibold mt-3">
                      <span className="text-blue-500">45% C</span>
                      <span className="text-emerald-500">25% P</span>
                      <span className="text-amber-500">30% F</span>
                    </div>
                  </div>

                  {/* Today's Meals */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Today's Meals</span>
                    <div className="p-1.5 bg-white rounded-lg border border-slate-100 flex items-center justify-between text-[10px]">
                      <span className="font-semibold text-slate-800">Oats with Fruits</span>
                      <span className="text-slate-400 font-bold">350 kcal</span>
                    </div>
                  </div>
                </div>

                <button className="w-full py-1.5 rounded-lg bg-emerald-600 text-white text-[10px] font-bold">
                  + Log Food
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
