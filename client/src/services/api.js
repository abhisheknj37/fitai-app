const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

/**
 * Common fetch helper with JSON and JWT token handling
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('fitai_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  } catch (err) {
    console.warn(`API Error [${endpoint}]:`, err.message);
    throw err;
  }
}

export const api = {
  // Auth & Profile
  login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (user) => request('/auth/register', { method: 'POST', body: JSON.stringify(user) }),
  getProfile: () => request('/auth/profile'),
  updateProfile: (profile) => request('/auth/profile', { method: 'PUT', body: JSON.stringify(profile) }),
  
  // Dashboard
  getDashboard: () => request('/dashboard'),
  logActivity: (activity) => request('/dashboard/log-activity', { method: 'POST', body: JSON.stringify(activity) }),

  // AI Assistant
  getAiHistory: () => request('/ai/history'),
  askAi: (question) => request('/ai/chat', { method: 'POST', body: JSON.stringify({ question }) }),
  clearAiChat: () => request('/ai/clear', { method: 'DELETE' }),

  // Workouts
  getWorkouts: () => request('/workouts'),
  setWorkoutLevel: (level) => request('/workouts/level', { method: 'POST', body: JSON.stringify({ level }) }),
  generateWorkoutPlan: (payload) => request('/workouts/generate', { method: 'POST', body: JSON.stringify(payload) }),

  // Nutrition
  getNutrition: () => request('/nutrition'),
  addMeal: (meal) => request('/nutrition/meals', { method: 'POST', body: JSON.stringify(meal) }),
  analyzeFoodImage: (data) => request('/nutrition/analyze-image', { method: 'POST', body: JSON.stringify(data) }),

  // Tracking
  getTracking: () => request('/tracking'),
  updateWater: (delta) => request('/tracking/water', { method: 'POST', body: JSON.stringify({ delta }) }),

  // Health Reports
  getHealthReport: () => request('/reports'),
  exportReport: () => request('/reports/export'),

  // Emergency
  getEmergencyData: () => request('/emergency'),
  triggerSos: (payload) => request('/emergency/sos', { method: 'POST', body: JSON.stringify(payload || {}) }),
  cancelSos: () => request('/emergency/cancel-sos', { method: 'POST' }),
  addEmergencyContact: (contact) => request('/emergency/contacts', { method: 'POST', body: JSON.stringify(contact) }),
  deleteEmergencyContact: (id) => request('/emergency/contacts/' + id, { method: 'DELETE' }),

  // Community
  getCommunityFeed: () => request('/community/feed'),
  createPost: (post) => request('/community/posts', { method: 'POST', body: JSON.stringify(post) }),
  likePost: (id) => request('/community/posts/' + id + '/like', { method: 'POST' }),
  commentPost: (id, text) => request('/community/posts/' + id + '/comment', { method: 'POST', body: JSON.stringify({ text }) }),
  joinChallenge: () => request('/community/challenge/join', { method: 'POST' }),

  // Workout Music
  getMusicPlaylists: () => request('/music/playlists'),
  getMusicPlaylistById: (id) => request(`/music/playlists/${id}`),
  searchMusic: (q) => request(`/music/search?q=${encodeURIComponent(q || '')}`)
};
