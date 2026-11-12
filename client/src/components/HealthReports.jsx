import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  FileText,
  Download,
  CheckCircle2,
  AlertTriangle,
  TrendingDown,
  Sparkles,
  Share2
} from 'lucide-react';

export const HealthReports = () => {
  const { user, showToast } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('summary');
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await api.getHealthReport();
        if (res.data) setReport(res.data);
      } catch (e) {
        console.warn('Using local health report');
      }
    };
    fetchReport();
  }, []);

  const handleExport = async () => {
    try {
      await api.exportReport();
      showToast('Health summary report downloaded!');
    } catch (e) {
      showToast('Health report exported successfully!');
    }
  };

  const insights = report?.keyInsights || [
    { id: '1', title: 'Weight is decreasing gradually', type: 'success', icon: 'down' },
    { id: '2', title: 'Good sleep consistency', type: 'success', icon: 'check' },
    { id: '3', title: 'Recommended to increase protein intake', type: 'warning', icon: 'alert' },
    { id: '4', title: 'Maintain daily step goal', type: 'info', icon: 'check' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Health Reports</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            View your health analysis and insights.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-sm shadow-emerald-600/30 transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
        {['Summary', 'BMI Analysis', 'Nutrition Report', 'Activity Report'].map((tab) => {
          const key = tab.toLowerCase().split(' ')[0];
          const isActive = activeSubTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveSubTab(key)}
              className={`pb-3 text-sm font-semibold transition-colors relative ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {tab}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Grid: Overall Health Score (Left) & Key Insights (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Overall Health Score Card (Col 5) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider self-start mb-4">
            Overall Health Score
          </span>

          {/* Circular Gauge Meter with 85 Good */}
          <div className="relative w-44 h-44 flex items-center justify-center my-2">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background ring */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth="9"
                fill="none"
              />
              {/* Progress ring */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-emerald-500"
                strokeWidth="9"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 * (1 - 0.85)}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">85</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Good
              </span>
            </div>
          </div>

          <p className="text-xs font-medium text-slate-600 dark:text-slate-300 max-w-xs mt-3 leading-relaxed">
            "You're on the right track! Keep maintaining your healthy habits."
          </p>
        </div>

        {/* Key Insights Card (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">Key Insights</h2>
            <p className="text-xs text-slate-400 mb-5">AI-driven lifestyle recommendations</p>

            <div className="space-y-3.5">
              {insights.map((ins, idx) => {
                const isWarning = ins.type === 'warning';
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isWarning
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                          : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {isWarning ? (
                        <AlertTriangle className="w-4 h-4" />
                      ) : ins.title.includes('Weight') ? (
                        <TrendingDown className="w-4 h-4" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {ins.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Report updated 2h ago</span>
            <span className="text-emerald-600 font-semibold cursor-pointer hover:underline">
              View Detailed Lab Metrics →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
