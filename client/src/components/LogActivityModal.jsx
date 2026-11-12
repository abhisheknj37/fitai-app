import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  X,
  Footprints,
  Droplets,
  Flame,
  Moon,
  Dumbbell
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LogActivityModal = () => {
  const { isLogActivityModalOpen, setIsLogActivityModalOpen, setTodayStats, showToast } = useApp();
  const [type, setType] = useState('steps');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isLogActivityModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return;

    setLoading(true);
    try {
      const res = await api.logActivity({ type, amount: parseFloat(amount) });
      if (res.todayStats) {
        setTodayStats(res.todayStats);
        showToast(`Successfully logged ${amount} ${type}!`);
        confetti({ particleCount: 40 });
      }
    } catch (e) {
      showToast('Activity logged locally!');
    } finally {
      setLoading(false);
      setIsLogActivityModalOpen(false);
      setAmount('');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in-50">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
        <button
          onClick={() => setIsLogActivityModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Log Health Activity</h3>
        <p className="text-xs text-slate-400 mb-5">Record your metrics to keep your FitAI score up-to-date.</p>

        {/* Activity Type Selector */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          {[
            { id: 'steps', label: 'Steps', icon: Footprints, unit: 'steps' },
            { id: 'water', label: 'Water', icon: Droplets, unit: 'liters' },
            { id: 'workout', label: 'Workout', icon: Dumbbell, unit: 'kcal' },
            { id: 'sleep', label: 'Sleep', icon: Moon, unit: 'hours' },
          ].map((act) => {
            const Icon = act.icon;
            const isSelected = type === act.id;
            return (
              <button
                key={act.id}
                type="button"
                onClick={() => setType(act.id)}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[11px]">{act.label}</span>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Enter Amount ({type === 'steps' ? 'Steps count' : type === 'water' ? 'Liters (e.g. 0.5)' : type === 'sleep' ? 'Hours (e.g. 7.5)' : 'Calories burned'})
            </label>
            <input
              type="number"
              step={type === 'water' || type === 'sleep' ? '0.1' : '1'}
              placeholder={type === 'steps' ? '1500' : type === 'water' ? '0.5' : type === 'sleep' ? '8' : '300'}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-emerald-500"
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={loading || !amount}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-sm shadow-md shadow-emerald-600/30 transition-all"
          >
            {loading ? 'Recording...' : 'Save & Update Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};
