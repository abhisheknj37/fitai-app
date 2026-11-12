import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
  ListMusic,
  Search,
  Sparkles,
  Flame,
  ChevronDown,
  ChevronUp,
  X,
  Radio,
  ExternalLink
} from 'lucide-react';

export const WorkoutMusicPlayer = () => {
  const {
    currentTrack,
    isMusicPlaying,
    isMusicPlayerOpen,
    setIsMusicPlayerOpen,
    playTrack,
    togglePlayMusic,
    nextTrack,
    prevTrack,
    musicVolume,
    setMusicVolume,
    musicPlaylists,
    showToast
  } = useApp();

  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(184);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaylistDrawerOpen, setIsPlaylistDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [activePlaylistId, setActivePlaylistId] = useState('pl-beast-mode');

  // Handle Audio Play/Pause Synchronization
  useEffect(() => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio auto-play prevented or network issue:', err.message);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isMusicPlaying, currentTrack]);

  // Volume synchronization
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : musicVolume;
    }
  }, [musicVolume, isMuted]);

  // MediaSession API setup for Lockscreen & Keyboard multimedia controls
  useEffect(() => {
    if ('mediaSession' in navigator && currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist,
        album: 'FitAI Workout Beats',
        artwork: [{ src: currentTrack.cover, sizes: '300x300', type: 'image/jpeg' }]
      });

      navigator.mediaSession.setActionHandler('play', () => togglePlayMusic());
      navigator.mediaSession.setActionHandler('pause', () => togglePlayMusic());
      navigator.mediaSession.setActionHandler('previoustrack', () => prevTrack());
      navigator.mediaSession.setActionHandler('nexttrack', () => nextTrack());
    }
  }, [currentTrack]);

  // Update track time
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Search tracks from backend & Audius API
  const handleSearchMusic = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      const res = await api.searchMusic(searchQuery);
      if (res.tracks) {
        setSearchResults(res.tracks);
        showToast(`Found ${res.tracks.length} workout tracks for "${searchQuery}"`);
      }
    } catch (err) {
      showToast('Error querying music stream');
    } finally {
      setSearching(false);
    }
  };

  // If user has not opened player or started music, show floating mini pill launcher
  if (!isMusicPlayerOpen) {
    return (
      <div className="fixed bottom-5 left-6 z-40 animate-in fade-in-50">
        <button
          onClick={() => {
            setIsMusicPlayerOpen(true);
            if (!isMusicPlaying) togglePlayMusic();
          }}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/90 dark:bg-white text-white dark:text-slate-900 shadow-xl border border-slate-700/60 dark:border-slate-200 hover:scale-105 transition-all text-xs font-bold group"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
            <Music className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
          </div>
          <span>Workout Beats</span>
          {isMusicPlaying && (
            <span className="flex gap-0.5 items-end h-3">
              <span className="w-0.5 h-2 bg-emerald-400 animate-pulse"></span>
              <span className="w-0.5 h-3 bg-emerald-400 animate-pulse [animation-delay:0.2s]"></span>
              <span className="w-0.5 h-1.5 bg-emerald-400 animate-pulse [animation-delay:0.4s]"></span>
            </span>
          )}
        </button>
      </div>
    );
  }

  const activePlaylist =
    musicPlaylists.find((p) => p.id === activePlaylistId) || musicPlaylists[0];

  return (
    <>
      {/* Hidden HTML5 Native Audio Engine */}
      <audio
        ref={audioRef}
        src={currentTrack?.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
        onLoadedMetadata={handleTimeUpdate}
      />

      {/* Main Persistent Floating Music Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800 shadow-2xl px-4 py-2.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Track Details */}
          <div className="flex items-center gap-3 min-w-[180px] sm:min-w-[240px]">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md flex-shrink-0 group">
              <img
                src={currentTrack?.cover}
                alt={currentTrack?.title}
                className="w-full h-full object-cover"
              />
              {isMusicPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5">
                  <span className="w-1 bg-white h-4 animate-bounce"></span>
                  <span className="w-1 bg-white h-6 animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-1 bg-white h-3 animate-bounce [animation-delay:0.3s]"></span>
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {currentTrack?.title || 'Workout Beats'}
                </h4>
                {currentTrack?.bpm && (
                  <span className="px-1.5 py-0.2 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold shrink-0">
                    {currentTrack.bpm} BPM
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {currentTrack?.artist || 'FitAI Radio'}
              </p>
            </div>
          </div>

          {/* Center: Playback Controls & Timeline */}
          <div className="flex-1 max-w-xl flex flex-col items-center gap-1">
            <div className="flex items-center gap-4">
              <button
                onClick={prevTrack}
                className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Previous track"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlayMusic}
                className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white flex items-center justify-center shadow-md shadow-emerald-600/30 transition-all"
                title={isMusicPlaying ? 'Pause' : 'Play'}
              >
                {isMusicPlaying ? (
                  <Pause className="w-4 h-4 fill-white" />
                ) : (
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                )}
              </button>

              <button
                onClick={nextTrack}
                className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Next track"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Seek Bar */}
            <div className="w-full flex items-center gap-2 text-[10px] text-slate-400 font-mono">
              <span className="w-8 text-right">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <span className="w-8">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right: Volume, Playlist Drawer Toggle & Minimize */}
          <div className="flex items-center gap-3">
            {/* Volume Control */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                {isMuted || musicVolume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-500" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : musicVolume}
                onChange={(e) => {
                  setMusicVolume(parseFloat(e.target.value));
                  setIsMuted(false);
                }}
                className="w-16 h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Playlist Drawer Button */}
            <button
              onClick={() => setIsPlaylistDrawerOpen(!isPlaylistDrawerOpen)}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isPlaylistDrawerOpen
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
              title="Browse Workout Stations"
            >
              <ListMusic className="w-4 h-4" />
              <span className="hidden md:inline">Playlists</span>
            </button>

            {/* Close / Minimize Player */}
            <button
              onClick={() => setIsMusicPlayerOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg transition-colors"
              title="Minimize player"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Workout Stations & Music Drawer */}
      {isPlaylistDrawerOpen && (
        <div className="fixed bottom-16 right-4 sm:right-8 z-50 w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">FitAI Music Stations</h3>
            </div>
            <button
              onClick={() => setIsPlaylistDrawerOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search bar for music API */}
          <form onSubmit={handleSearchMusic} className="my-3 flex gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search workout tracks, artists, BPM..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <button
              type="submit"
              disabled={searching}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl"
            >
              {searching ? '...' : 'Search'}
            </button>
          </form>

          {/* Station Pills */}
          <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar">
            {musicPlaylists.map((pl) => (
              <button
                key={pl.id}
                onClick={() => {
                  setActivePlaylistId(pl.id);
                  setSearchResults([]);
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                  activePlaylistId === pl.id && !searchResults.length
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {pl.title.split(' ')[0]} ({pl.bpm.split(' ')[0]})
              </button>
            ))}
          </div>

          {/* Tracks List */}
          <div className="max-h-60 overflow-y-auto space-y-2 pr-1 divide-y divide-slate-100 dark:divide-slate-800/60">
            {(searchResults.length > 0 ? searchResults : activePlaylist?.tracks || []).map((trk) => {
              const isPlayingThis = currentTrack?.id === trk.id && isMusicPlaying;
              return (
                <div
                  key={trk.id}
                  onClick={() => playTrack(trk)}
                  className={`pt-2 flex items-center justify-between p-2 rounded-xl cursor-pointer transition-colors ${
                    isPlayingThis
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={trk.cover}
                      alt={trk.title}
                      className="w-9 h-9 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">{trk.title}</p>
                      <p className="text-[10px] text-slate-400 truncate">{trk.artist}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400">{trk.durationFormatted}</span>
                    <button className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                      {isPlayingThis ? <Pause className="w-3 h-3 fill-white" /> : <Play className="w-3 h-3 fill-white ml-0.5" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* API Credit Footer */}
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-500" /> Audius API + High-BPM Streams
            </span>
            <span className="text-emerald-600 font-medium">Synced with Interval Timer</span>
          </div>
        </div>
      )}
    </>
  );
};
