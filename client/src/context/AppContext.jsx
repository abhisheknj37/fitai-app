import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { api } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation: landing, dashboard, profile, ai-assistant, workouts, nutrition, tracking, reports, goals, community, emergency, settings
  const [activeTab, setActiveTab] = useState('landing');
  const [user, setUser] = useState({
    id: 'user_abhishek_01',
    name: 'Abhishek N J',
    role: 'Premium User',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    email: 'abhisheknj@example.com',
    phone: '+91 9876543210',
    age: 30,
    gender: 'Female',
    height: 165,
    weight: 72,
    weightChange: -1.5,
    activityLevel: 'Moderately Active',
    goal: 'Weight Loss',
    bmi: 22.8,
    bmiStatus: 'Normal (18.5 - 24.9)',
    suggestedCalorieIntake: 1850,
    dailyCalorieTarget: 2300,
    stepGoal: 12000,
    waterGoal: 2.5,
    sleepGoal: 8
  });

  const [todayStats, setTodayStats] = useState({
    weight: 72,
    weightChange: -1.5,
    bmi: 22.8,
    bmiCategory: 'Healthy',
    steps: 7856,
    stepsGoal: 12000,
    stepsPercentage: 65,
    caloriesBurned: 1850,
    caloriesTarget: 2300,
    caloriesLeft: 450,
    caloriesPercentage: 80,
    waterLiters: 1.8,
    waterGoalLiters: 2.5,
    waterPercentage: 72,
    sleepHours: 7,
    sleepGoalHours: 8,
    sleepPercentage: 88
  });

  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);
  const [isLogActivityModalOpen, setIsLogActivityModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [themeColor, setThemeColor] = useState('emerald'); // emerald | cyan | orange | purple | rose
  const [toasts, setToasts] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Workout Music States
  const [musicPlaylists, setMusicPlaylists] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({
    id: 'bm-1',
    title: 'Cyber Cardio Surge',
    artist: 'FitAI Beats',
    bpm: 155,
    duration: 184,
    durationFormatted: '3:04',
    cover: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=300&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=sport-electro-110825.mp3'
  });
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.8);
  const [allTracks, setAllTracks] = useState([]);

  // Toast notification trigger
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Change Theme Color
  const changeTheme = (newTheme) => {
    setThemeColor(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('fitai_theme', newTheme);
    showToast(`Switched theme to ${newTheme.toUpperCase()}`);
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('fitai_dark', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('fitai_dark', 'false');
      }
      return next;
    });
  };

  // Load saved theme on boot
  useEffect(() => {
    const savedTheme = localStorage.getItem('fitai_theme') || 'emerald';
    setThemeColor(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const savedDark = localStorage.getItem('fitai_dark') === 'true';
    if (savedDark) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Fetch initial profile, dashboard, and workout music data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const dashRes = await api.getDashboard();
        if (dashRes && dashRes.data) {
          setTodayStats(dashRes.data.todayStats);
        }
        const profRes = await api.getProfile();
        if (profRes && profRes.user) {
          setUser(profRes.user);
        }
        const musicRes = await api.getMusicPlaylists();
        if (musicRes && musicRes.playlists) {
          setMusicPlaylists(musicRes.playlists);
          const flatTracks = musicRes.playlists.flatMap((p) => p.tracks);
          setAllTracks(flatTracks);
          if (flatTracks.length > 0) {
            setCurrentTrack(flatTracks[0]);
          }
        }
      } catch (err) {
        console.info('Running with pre-loaded mock state while server connects.');
      }
    };
    loadInitialData();
  }, []);

  // Play a specific track
  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsMusicPlaying(true);
    setIsMusicPlayerOpen(true);
    showToast(`Now Playing: ${track.title} (${track.bpm} BPM) 🎵`);
  };

  // Toggle Music Play/Pause
  const togglePlayMusic = () => {
    setIsMusicPlaying((prev) => !prev);
  };

  // Next Track
  const nextTrack = () => {
    if (!allTracks.length) return;
    const currentIndex = allTracks.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % allTracks.length;
    setCurrentTrack(allTracks[nextIndex]);
    setIsMusicPlaying(true);
  };

  // Previous Track
  const prevTrack = () => {
    if (!allTracks.length) return;
    const currentIndex = allTracks.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + allTracks.length) % allTracks.length;
    setCurrentTrack(allTracks[prevIndex]);
    setIsMusicPlaying(true);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        user,
        setUser,
        todayStats,
        setTodayStats,
        isMobilePreviewOpen,
        setIsMobilePreviewOpen,
        isLogActivityModalOpen,
        setIsLogActivityModalOpen,
        darkMode,
        toggleDarkMode,
        themeColor,
        changeTheme,
        toasts,
        showToast,
        unreadNotifications,
        setUnreadNotifications,
        notificationsOpen,
        setNotificationsOpen,
        // Music API & Player
        musicPlaylists,
        currentTrack,
        isMusicPlaying,
        isMusicPlayerOpen,
        setIsMusicPlayerOpen,
        musicVolume,
        setMusicVolume,
        playTrack,
        togglePlayMusic,
        nextTrack,
        prevTrack
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
