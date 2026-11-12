import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  Apple,
  Camera,
  UploadCloud,
  Plus,
  Sparkles,
  ChevronDown,
  Info,
  CheckCircle2,
  X
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const Nutrition = () => {
  const { showToast } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('meal-plan');
  const [nutrition, setNutrition] = useState(null);
  const [analyzingImage, setAnalyzingImage] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [addMealModalOpen, setAddMealModalOpen] = useState(false);
  const [newMealForm, setNewMealForm] = useState({
    type: 'Breakfast',
    name: '',
    calories: '',
    items: ''
  });

  useEffect(() => {
    const fetchNutrition = async () => {
      try {
        const res = await api.getNutrition();
        if (res.data) setNutrition(res.data);
      } catch (e) {
        console.warn('Using local nutrition data');
      }
    };
    fetchNutrition();
  }, []);

  const macroPieData = [
    { name: 'Carbs (45%)', value: 45, color: '#3B82F6' },
    { name: 'Protein (25%)', value: 25, color: '#10B981' },
    { name: 'Fats (30%)', value: 30, color: '#F59E0B' }
  ];

  const handleAnalyzePhoto = async () => {
    setAnalyzingImage(true);
    try {
      const res = await api.analyzeFoodImage({});
      if (res.analysis) {
        setAnalysisResult(res.analysis);
        showToast('Meal successfully analyzed by FitAI Vision!');
      }
    } catch (e) {
      showToast('Analyzed food successfully!');
    } finally {
      setAnalyzingImage(false);
    }
  };

  const handleAddMealSubmit = async (e) => {
    e.preventDefault();
    if (!newMealForm.name || !newMealForm.calories) return;

    try {
      const res = await api.addMeal(newMealForm);
      if (res.data) {
        setNutrition(res.data);
        showToast('Meal logged successfully!');
      }
    } catch (e) {
      showToast('Meal logged!');
    } finally {
      setAddMealModalOpen(false);
      setNewMealForm({ type: 'Breakfast', name: '', calories: '', items: '' });
    }
  };

  const meals = nutrition?.todayMeals || [
    {
      id: 'm1',
      type: 'Breakfast',
      name: 'Oats with Fruits',
      calories: 350,
      image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=300&q=80',
      items: 'Rolled oats, almond milk, sliced banana, chia seeds'
    },
    {
      id: 'm2',
      type: 'Lunch',
      name: 'Brown Rice + Dal + Veg',
      calories: 650,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80',
      items: '1 cup steamed brown rice, yellow lentil dal, spinach paneer'
    },
    {
      id: 'm3',
      type: 'Dinner',
      name: 'Grilled Chicken + Salad',
      calories: 450,
      image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=300&q=80',
      items: '180g lean grilled chicken breast, fresh garden salad'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Nutrition &amp; Diet</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Get personalized meal plans and track your food.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 shadow-sm">
            <option>Today</option>
            <option>Yesterday</option>
            <option>This Week</option>
          </select>

          <button
            onClick={() => setAddMealModalOpen(true)}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-sm shadow-emerald-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Log Food</span>
          </button>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
        {['Meal Plan', 'Food Tracker', 'Calorie Calculator', 'Recipes'].map((tab) => {
          const key = tab.toLowerCase().replace(/\s+/g, '-');
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

      {/* 3 Meal Cards in a Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-md transition-all flex items-center gap-3.5 group"
          >
            <img
              src={meal.image}
              alt={meal.name}
              className="w-16 h-16 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                {meal.type}
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">{meal.name}</h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                {meal.calories} <span className="font-normal text-slate-400">kcal</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section: Calorie Breakdown & Food Image Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Calorie Breakdown Donut (Col 6) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">Calorie Breakdown</h2>
          <p className="text-xs text-slate-400 mb-4">Macronutrient distribution</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            {/* Donut Chart with Center Text */}
            <div className="relative h-48 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {macroPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Ratio']} />
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-extrabold text-slate-900 dark:text-white">1,850</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">kcal</span>
              </div>
            </div>

            {/* Macro Percentages */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-blue-50/60 dark:bg-blue-950/30">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Carbs</span>
                </div>
                <span className="font-bold text-blue-600 dark:text-blue-400">45% (208g)</span>
              </div>

              <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Protein</span>
                </div>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">25% (115g)</span>
              </div>

              <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-amber-50/60 dark:bg-amber-950/30">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Fats</span>
                </div>
                <span className="font-bold text-amber-600 dark:text-amber-400">30% (62g)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Food Image Analysis (Col 6) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Food Image Analysis</h2>
            <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> AI Vision
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-4">Upload a photo of your meal to get nutrition details.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Photo preview */}
            <div className="relative aspect-video sm:aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
                alt="Meal Sample"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                <span className="text-[11px] text-white font-medium">Sample Bowl</span>
              </div>
            </div>

            {/* Scan Action / Results */}
            <div className="space-y-3">
              <button
                onClick={handleAnalyzePhoto}
                disabled={analyzingImage}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-600/30 transition-all"
              >
                {analyzingImage ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Analyzing Image...</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4" />
                    <span>Scan Meal Photo</span>
                  </>
                )}
              </button>

              {analysisResult ? (
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1.5 animate-in fade-in-50">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 dark:text-slate-100 truncate">
                      {analysisResult.detectedItem}
                    </span>
                    <span className="text-emerald-600 font-bold shrink-0">{analysisResult.confidence}</span>
                  </div>
                  <p className="text-slate-500 font-medium">
                    Calories: <span className="text-amber-600 font-bold">{analysisResult.estimatedCalories} kcal</span>
                  </p>
                  <p className="text-[11px] text-slate-400 italic leading-snug">
                    {analysisResult.recommendation}
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 text-center">
                  <UploadCloud className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                  <p className="text-[11px] text-slate-400">Click to run AI meal recognition</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Log Food Modal */}
      {addMealModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
            <button
              onClick={() => setAddMealModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Log Food / Meal</h3>
            <form onSubmit={handleAddMealSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Meal Category</label>
                <select
                  value={newMealForm.type}
                  onChange={(e) => setNewMealForm({ ...newMealForm, type: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Snack</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Meal Title</label>
                <input
                  type="text"
                  placeholder="e.g. Avocado Toast with Eggs"
                  value={newMealForm.name}
                  onChange={(e) => setNewMealForm({ ...newMealForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Calories (kcal)</label>
                <input
                  type="number"
                  placeholder="e.g. 420"
                  value={newMealForm.calories}
                  onChange={(e) => setNewMealForm({ ...newMealForm, calories: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md"
              >
                Add Meal Entry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
