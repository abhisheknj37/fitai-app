/**
 * FitAI Workout Music Controller
 * Provides curated high-BPM workout playlists and integrates with external Music APIs.
 */

// Curated high-energy workout playlists with real streaming audio sources
const workoutPlaylists = [
  {
    id: 'pl-beast-mode',
    title: 'Beast Mode HIIT & Cardio',
    bpm: '145 - 165 BPM',
    genre: 'High Energy EDM / Trap',
    cover: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80',
    tracks: [
      {
        id: 'bm-1',
        title: 'Cyber Cardio Surge',
        artist: 'FitAI Beats',
        bpm: 155,
        duration: 184,
        durationFormatted: '3:04',
        cover: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=300&q=80',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=sport-electro-110825.mp3'
      },
      {
        id: 'bm-2',
        title: 'Power Sprint Ignition',
        artist: 'Apex Kinetic',
        bpm: 160,
        duration: 165,
        durationFormatted: '2:45',
        cover: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=300&q=80',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=action-sport-breakbeat-15753.mp3'
      },
      {
        id: 'bm-3',
        title: 'Titan Energy Overdrive',
        artist: 'Pulse Core',
        bpm: 150,
        duration: 210,
        durationFormatted: '3:30',
        cover: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=300&q=80',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3?filename=workout-11226.mp3'
      }
    ]
  },
  {
    id: 'pl-iron-power',
    title: 'Heavy Iron & Strength',
    bpm: '130 - 145 BPM',
    genre: 'Rock & Aggressive Bass',
    cover: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=400&q=80',
    tracks: [
      {
        id: 'ip-1',
        title: 'Deadlift Anthem',
        artist: 'Iron Forge',
        bpm: 135,
        duration: 198,
        durationFormatted: '3:18',
        cover: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=300&q=80',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f77c30.mp3?filename=sport-rock-trailer-124442.mp3'
      },
      {
        id: 'ip-2',
        title: 'Never Back Down',
        artist: 'Valkyrie Sound',
        bpm: 140,
        duration: 172,
        durationFormatted: '2:52',
        cover: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=300&q=80',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c350117495.mp3?filename=powerful-energetic-rock-trailer-110196.mp3'
      }
    ]
  },
  {
    id: 'pl-runners-flow',
    title: "Runner's Rhythm Flow",
    bpm: '150 - 170 BPM',
    genre: 'Melodic Drum & Bass',
    cover: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=400&q=80',
    tracks: [
      {
        id: 'rf-1',
        title: '5K Sunset Pace',
        artist: 'Horizon Step',
        bpm: 155,
        duration: 215,
        durationFormatted: '3:35',
        cover: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=300&q=80',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/02/07/audio_d1e8ef0bb2.mp3?filename=motivational-epic-sport-18544.mp3'
      },
      {
        id: 'rf-2',
        title: 'Neon Marathon',
        artist: 'Velocity',
        bpm: 165,
        duration: 190,
        durationFormatted: '3:10',
        cover: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=300&q=80',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=sport-electro-110825.mp3'
      }
    ]
  },
  {
    id: 'pl-recovery-zen',
    title: 'Yoga & Recovery Ambient',
    bpm: '75 - 95 BPM',
    genre: 'Lo-Fi Chill & Ambient Healing',
    cover: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80',
    tracks: [
      {
        id: 'rz-1',
        title: 'Post-Workout Deep Breath',
        artist: 'Zenith Mind',
        bpm: 80,
        duration: 240,
        durationFormatted: '4:00',
        cover: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=300&q=80',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'
      },
      {
        id: 'rz-2',
        title: 'Muscle Rejuvenation',
        artist: 'Equilibrium',
        bpm: 85,
        duration: 220,
        durationFormatted: '3:40',
        cover: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=300&q=80',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_73138b0e77.mp3?filename=chill-abstract-intention-12099.mp3'
      }
    ]
  }
];

export const getPlaylists = (req, res) => {
  res.status(200).json({
    success: true,
    playlists: workoutPlaylists
  });
};

export const getPlaylistById = (req, res) => {
  const { id } = req.params;
  const playlist = workoutPlaylists.find((p) => p.id === id);

  if (!playlist) {
    return res.status(404).json({ success: false, message: 'Playlist not found' });
  }

  res.status(200).json({
    success: true,
    playlist
  });
};

export const searchMusic = async (req, res) => {
  const query = (req.query.q || '').toLowerCase();

  // Search within internal curated tracks
  const allTracks = workoutPlaylists.flatMap((p) => p.tracks.map((t) => ({ ...t, playlistTitle: p.title })));
  let matches = allTracks.filter(
    (t) =>
      t.title.toLowerCase().includes(query) ||
      t.artist.toLowerCase().includes(query) ||
      (t.playlistTitle && t.playlistTitle.toLowerCase().includes(query))
  );

  // If query is broad or no matches, return all tracks
  if (matches.length === 0) {
    matches = allTracks;
  }

  // Also query external Audius open API if available
  let externalTracks = [];
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const audiusRes = await fetch(
      `https://discoveryprovider.audius.co/v1/tracks/trending?app_name=FITAI_APP&limit=5`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (audiusRes.ok) {
      const data = await audiusRes.json();
      if (data && data.data) {
        externalTracks = data.data.map((track) => ({
          id: `audius-${track.id}`,
          title: track.title,
          artist: track.user ? track.user.name : 'Audius Artist',
          bpm: 140,
          duration: track.duration || 180,
          durationFormatted: `${Math.floor((track.duration || 180) / 60)}:${String((track.duration || 180) % 60).padStart(2, '0')}`,
          cover: track.artwork ? track.artwork['480x480'] || track.artwork['150x150'] : workoutPlaylists[0].cover,
          audioUrl: `https://discoveryprovider.audius.co/v1/tracks/${track.id}/stream?app_name=FITAI_APP`,
          source: 'Audius API'
        }));
      }
    }
  } catch (err) {
    // Graceful fallback to high-quality internal streaming tracks
  }

  res.status(200).json({
    success: true,
    tracks: [...matches, ...externalTracks]
  });
};
