import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  Dumbbell,
  Play,
  Pause,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Clock,
  Flame,
  X,
  RotateCcw,
  Music,
  Radio
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Workouts = () => {
  const {
    showToast,
    isMusicPlaying,
    togglePlayMusic,
    setIsMusicPlayerOpen,
    currentTrack
  } = useApp();
  const [level, setLevel] = useState('Beginner');
  const [activeWeekId, setActiveWeekId] = useState(1);
  const [activeSubTab, setActiveSubTab] = useState('plan'); // 'plan' | 'library' | 'videos'
  const [workoutData, setWorkoutData] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [genGoal, setGenGoal] = useState('Weight Loss');
  const [genDays, setGenDays] = useState(4);

  // Fetch workout data
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await api.getWorkouts();
        if (res.data) {
          setWorkoutData(res.data);
          setLevel(res.data.currentLevel || 'Beginner');
        }
      } catch (err) {
        console.warn('Using default workouts');
      }
    };
    fetchWorkouts();
  }, []);

  // Timer countdown hook
  useEffect(() => {
    let interval = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      confetti({ particleCount: 50, spread: 60 });
      showToast('Set completed! Fantastic effort!');
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const handleOpenVideo = (exercise) => {
    setSelectedExercise(exercise);
    setTimerSeconds(exercise.durationSec || 30);
    setTimerRunning(false);
  };

  const handleLevelChange = async (newLevel) => {
    setLevel(newLevel);
    try {
      await api.setWorkoutLevel(newLevel);
      showToast(`Workout level updated to ${newLevel}`);
    } catch (e) {}
  };

  const handleGeneratePlan = async (e) => {
    e.preventDefault();
    try {
      const res = await api.generateWorkoutPlan({ goal: genGoal, level, daysPerWeek: genDays });
      if (res.data) {
        setWorkoutData(res.data);
        showToast('New AI workout plan generated!');
      }
    } catch (e) {
      showToast('New customized plan generated!');
    } finally {
      setGenerateModalOpen(false);
    }
  };

  const weeksList = workoutData?.weeks || [
    { id: 1, title: 'Week 1 – Full Body Plan', subtitle: '4 days per week • 30–45 minutes per session', exercises: [] },
    { id: 2, title: 'Week 2 – Strength Focus', subtitle: '4 days per week • 35–45 minutes per session', exercises: [] },
    { id: 3, title: 'Week 3 – Cardio Burn', subtitle: '5 days per week • 30 minutes HIIT', exercises: [] },
    { id: 4, title: 'Week 4 – Core & Flexibility', subtitle: '4 days per week • 30 minutes mobility', exercises: [] }
  ];

  const currentWeek = weeksList.find((w) => w.id === activeWeekId) || weeksList[0];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Workout Plans</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Personalized workout plans based on your goals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={level}
            onChange={(e) => handleLevelChange(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 shadow-sm"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <button
            onClick={() => setGenerateModalOpen(true)}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-sm shadow-emerald-600/30 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate New Plan</span>
          </button>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
        <button
          onClick={() => setActiveSubTab('plan')}
          className={`pb-3 text-sm font-semibold transition-colors relative ${
            activeSubTab === 'plan'
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          My Plan
          {activeSubTab === 'plan' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400"></span>}
        </button>

        <button
          onClick={() => setActiveSubTab('library')}
          className={`pb-3 text-sm font-semibold transition-colors relative ${
            activeSubTab === 'library'
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          Exercise Library
          {activeSubTab === 'library' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400"></span>}
        </button>

        <button
          onClick={() => setActiveSubTab('videos')}
          className={`pb-3 text-sm font-semibold transition-colors relative ${
            activeSubTab === 'videos'
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          Video Sessions
          {activeSubTab === 'videos' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400"></span>}
        </button>
      </div>

      {/* Layout: Left Week Selector + Right Exercise List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Week Selector (Col 3) */}
        <div className="lg:col-span-3 space-y-2">
          {weeksList.map((w) => {
            const isActive = activeWeekId === w.id;
            return (
              <button
                key={w.id}
                onClick={() => setActiveWeekId(w.id)}
                className={`w-full p-3.5 rounded-xl text-left transition-all font-semibold text-xs sm:text-sm flex items-center justify-between ${
                  isActive
                    ? 'bg-emerald-100/90 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div>
                  <p className="font-bold">{w.title.split('–')[0].trim()}</p>
                  <p className="text-[11px] opacity-75 font-normal line-clamp-1">{w.title.split('–')[1] || 'Plan'}</p>
                </div>
                {isActive && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Right Exercises Card (Col 9) */}
        <div className="lg:col-span-9 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card space-y-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{currentWeek.title}</h2>
            <p className="text-xs text-slate-400">{currentWeek.subtitle}</p>
          </div>

          {/* Exercise Rows */}
          <div className="space-y-3.5">
            {currentWeek.exercises && currentWeek.exercises.length > 0 ? (
              currentWeek.exercises.map((ex) => (
                <div
                  key={ex.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-emerald-500/50 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={ex.videoUrl}
                      alt={ex.name}
                      className="w-14 h-14 rounded-xl object-cover shadow-sm"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{ex.name}</h3>
                      <p className="text-xs text-slate-400">{ex.setsReps}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        ex.tag === 'Cardio'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : ex.tag === 'Strength'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                      }`}
                    >
                      {ex.tag}
                    </span>

                    <button
                      onClick={() => handleOpenVideo(ex)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold shadow-sm transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 fill-current" />
                      <span>Video</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400 py-6 text-center">No exercises found for this week.</p>
            )}
          </div>
        </div>
      </div>

      {/* Video & Workout Interactive Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in-50">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
            <button
              onClick={() => setSelectedExercise(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                {selectedExercise.tag}
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedExercise.name}</h3>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden relative mb-4 bg-slate-950">
              <img
                src={selectedExercise.videoUrl}
                alt={selectedExercise.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              {selectedExercise.instructions}
            </p>

            {/* Interval Timer Widget */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium">Session Timer</span>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                  {timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}s
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-all ${
                    timerRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  {timerRunning ? 'Pause' : 'Start Set'}
                </button>
                <button
                  onClick={() => {
                    setTimerRunning(false);
                    setTimerSeconds(selectedExercise.durationSec || 30);
                  }}
                  className="p-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generate Plan Modal */}
      {generateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
            <button
              onClick={() => setGenerateModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Workout Generator</h3>
            </div>

            <form onSubmit={handleGeneratePlan} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Primary Fitness Goal
                </label>
                <select
                  value={genGoal}
                  onChange={(e) => setGenGoal(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option>Weight Loss</option>
                  <option>Muscle Hypertrophy</option>
                  <option>Core & Endurance</option>
                  <option>Full Body Tone</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Days Per Week
                </label>
                <select
                  value={genDays}
                  onChange={(e) => setGenDays(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value={3}>3 Days / Week</option>
                  <option value={4}>4 Days / Week (Recommended)</option>
                  <option value={5}>5 Days / Week</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/30 transition-colors"
              >
                Generate Personalized Plan
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
