import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Play,
  ArrowRight,
  Bot,
  Dumbbell,
  Apple,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  X
} from 'lucide-react';

export const LandingPage = () => {
  const { setActiveTab } = useApp();
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [authModal, setAuthModal] = useState(null); // 'login' | 'signup' | null
  const [email, setEmail] = useState('abhisheknj@example.com');
  const [password, setPassword] = useState('password123');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthModal(null);
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Navigation Bar */}
      <nav className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('landing')}>
          <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">FitAI</span>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#home" className="text-emerald-600 dark:text-emerald-400 font-semibold">Home</a>
          <button onClick={() => setActiveTab('dashboard')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Features</button>
          <button onClick={() => setActiveTab('reports')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Health Reports</button>
          <button onClick={() => setActiveTab('emergency')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Emergency SOS</button>
        </div>

        {/* Auth CTA Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAuthModal('login')}
            className="px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-semibold shadow-md shadow-emerald-600/30 transition-all duration-150"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-6 pb-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Your Personal <br />
              <span className="text-emerald-600 dark:text-emerald-400">AI Health &amp;</span> <br />
              Fitness Assistant
            </h1>

            <div className="space-y-2 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
              <p className="font-semibold text-slate-800 dark:text-slate-200">Smarter habits. Healthier you.</p>
              <p className="text-slate-500 dark:text-slate-400">
                Personalized workouts, nutrition, tracking and AI guidance – all in one place.
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-sm sm:text-base shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 transition-all duration-150 flex items-center gap-2 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setShowDemoModal(true)}
                className="px-6 py-3.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 text-slate-800 dark:text-slate-200 font-semibold text-sm sm:text-base border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-150 flex items-center gap-2.5"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-4 flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>100% Free Consultation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>24/7 AI Health Companion</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual with Floating AI Badges */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Soft emerald glow background */}
            <div className="absolute w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] rounded-full bg-emerald-200/50 dark:bg-emerald-900/30 blur-3xl -z-10"></div>

            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
                alt="FitAI Athletic Trainer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
            </div>

            {/* Floating Badge 1: AI Coach */}
            <div className="absolute top-6 right-2 sm:right-6 bg-white dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 animate-bounce [animation-duration:4s]">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">AI Coach</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">24/7 Guidance</p>
              </div>
            </div>

            {/* Floating Badge 2: Workout Plans */}
            <div className="absolute top-28 right-0 sm:-right-4 bg-white dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Workout Plans</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Personalized</p>
              </div>
            </div>

            {/* Floating Badge 3: Nutrition Tracking */}
            <div className="absolute bottom-28 right-2 sm:right-4 bg-white dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Apple className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Nutrition Tracking</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Smart Suggestions</p>
              </div>
            </div>

            {/* Floating Badge 4: Progress Insights */}
            <div className="absolute bottom-8 right-8 sm:right-12 bg-white dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Progress Insights</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Reach Your Goals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Tabs Bar */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveTab('workouts')}
            className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 hover:border-emerald-500 hover:shadow-md transition-all group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 group-hover:scale-105 transition-transform flex items-center justify-center">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Personalized Plans</p>
              <p className="text-[11px] text-slate-400">Custom routines</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('ai-assistant')}
            className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 hover:border-emerald-500 hover:shadow-md transition-all group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 group-hover:scale-105 transition-transform flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">AI Health Assistant</p>
              <p className="text-[11px] text-slate-400">24/7 smart coach</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('nutrition')}
            className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 hover:border-emerald-500 hover:shadow-md transition-all group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 group-hover:scale-105 transition-transform flex items-center justify-center">
              <Apple className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Nutrition Guidance</p>
              <p className="text-[11px] text-slate-400">Macro tracking</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('tracking')}
            className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 hover:border-emerald-500 hover:shadow-md transition-all group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 group-hover:scale-105 transition-transform flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Progress Tracking</p>
              <p className="text-[11px] text-slate-400">Metrics &amp; insights</p>
            </div>
          </button>
        </div>
      </section>

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in-50">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">FitAI Platform Demo</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Watch how FitAI continuously optimizes your workout regime, macronutrient distribution, and health score in real-time.
            </p>
            <div className="aspect-video w-full rounded-2xl bg-slate-950 flex flex-col items-center justify-center text-white relative overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80"
                alt="FitAI Demo Preview"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="z-10 flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/40 cursor-pointer hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-white ml-1" />
                </div>
                <p className="text-sm font-semibold tracking-wide">Interactive Platform Preview</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShowDemoModal(false);
                  setActiveTab('dashboard');
                }}
                className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md"
              >
                Launch Dashboard Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login / Auth Modal */}
      {authModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
            <button
              onClick={() => setAuthModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {authModal === 'login' ? 'Login to FitAI' : 'Create FitAI Account'}
              </h3>
            </div>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/30 transition-colors"
              >
                {authModal === 'login' ? 'Continue with Demo' : 'Sign Up & Launch'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
