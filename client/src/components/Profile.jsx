import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  User,
  Activity,
  Target,
  Edit3,
  Check,
  Flame,
  Info
} from 'lucide-react';

export const Profile = () => {
  const { user, setUser, setTodayStats, showToast } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('health'); // 'personal' | 'health' | 'goals'
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    age: user.age,
    gender: user.gender,
    height: user.height,
    weight: user.weight,
    activityLevel: user.activityLevel,
    goal: user.goal
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.updateProfile(formData);
      if (res.user) {
        setUser(res.user);
        setTodayStats((prev) => ({
          ...prev,
          weight: res.user.weight,
          bmi: res.user.bmi
        }));
        showToast('Profile updated & metrics recalculated!');
      }
      setIsEditing(false);
    } catch (err) {
      showToast('Profile updated in local storage!');
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  };

  // Live BMI calculation
  const heightM = (formData.height || 165) / 100;
  const currentBmi = parseFloat(((formData.weight || 72) / (heightM * heightM)).toFixed(1));
  const bmiPercentage = Math.min(100, Math.max(0, ((currentBmi - 15) / (35 - 15)) * 100));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Profile</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage your personal information and health data.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            isEditing
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/30'
          }`}
        >
          {isEditing ? (
            <>
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Cancel Editing</span>
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
        <button
          onClick={() => setActiveSubTab('personal')}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 transition-colors relative ${
            activeSubTab === 'personal'
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Personal Info</span>
          {activeSubTab === 'personal' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400"></span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('health')}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 transition-colors relative ${
            activeSubTab === 'health'
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Health Metrics</span>
          {activeSubTab === 'health' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400"></span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('goals')}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 transition-colors relative ${
            activeSubTab === 'goals'
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Fitness Goals</span>
          {activeSubTab === 'goals' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400"></span>
          )}
        </button>
      </div>

      {/* Main Form and Metric Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <form onSubmit={handleSave} className="space-y-5">
            {activeSubTab === 'personal' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    disabled={!isEditing}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-emerald-500 disabled:opacity-75"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    disabled={!isEditing}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-emerald-500 disabled:opacity-75"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    disabled={!isEditing}
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-emerald-500 disabled:opacity-75"
                  />
                </div>
              </div>
            )}

            {(activeSubTab === 'health' || activeSubTab === 'goals') && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      disabled={!isEditing}
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-emerald-500 disabled:opacity-75"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                      Gender
                    </label>
                    <select
                      name="gender"
                      disabled={!isEditing}
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-emerald-500 disabled:opacity-75"
                    >
                      <option>Female</option>
                      <option>Male</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                      Height
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="height"
                        disabled={!isEditing}
                        value={formData.height}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-emerald-500 disabled:opacity-75 pr-10"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">cm</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                      Weight
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="weight"
                        disabled={!isEditing}
                        value={formData.weight}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-emerald-500 disabled:opacity-75 pr-10"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">kg</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                      Activity Level
                    </label>
                    <select
                      name="activityLevel"
                      disabled={!isEditing}
                      value={formData.activityLevel}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-emerald-500 disabled:opacity-75"
                    >
                      <option>Sedentary</option>
                      <option>Lightly Active</option>
                      <option>Moderately Active</option>
                      <option>Very Active</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                      Goal
                    </label>
                    <select
                      name="goal"
                      disabled={!isEditing}
                      value={formData.goal}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-emerald-500 disabled:opacity-75"
                    >
                      <option>Weight Loss</option>
                      <option>Muscle Gain</option>
                      <option>Maintain Fitness</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {isEditing && (
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/30 transition-all"
                >
                  {saving ? 'Recalculating Metrics...' : 'Save Profile & Recalculate'}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Dynamic Metric Cards (Col 5) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Card 1: Your BMI */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Your BMI
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
                Normal (18.5 - 24.9)
              </span>
            </div>

            <div className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              {currentBmi}
            </div>

            {/* BMI Colored Slider Gauge */}
            <div className="space-y-1.5">
              <div className="relative h-2.5 w-full rounded-full overflow-hidden flex">
                <div className="w-[18%] bg-blue-400" title="Underweight < 18.5"></div>
                <div className="w-[32%] bg-emerald-500" title="Normal 18.5 - 24.9"></div>
                <div className="w-[25%] bg-amber-400" title="Overweight 25 - 29.9"></div>
                <div className="w-[25%] bg-rose-500" title="Obese ≥ 30"></div>
              </div>

              {/* Indicator Arrow */}
              <div className="relative h-4 w-full">
                <div
                  className="absolute -top-1 -translate-x-1/2 flex flex-col items-center transition-all duration-300"
                  style={{ left: `${bmiPercentage}%` }}
                >
                  <div className="w-2 h-2 rotate-45 bg-slate-900 dark:bg-white"></div>
                </div>
              </div>

              <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
                <span>Underweight</span>
                <span className="text-emerald-600 font-bold">Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </div>
          </div>

          {/* Card 2: Suggested Calorie Intake */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Suggested Calorie Intake
            </span>

            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                {user.suggestedCalorieIntake.toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">kcal/day</span>
            </div>

            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              Calculated based on your basal metabolic rate (BMR) and moderately active lifestyle for sustainable weight loss.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
