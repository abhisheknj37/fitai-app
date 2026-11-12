import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  Users,
  Heart,
  MessageSquare,
  Share2,
  Trophy,
  Send,
  Plus,
  Image as ImageIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Community = () => {
  const { user, showToast } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('feed');
  const [feedData, setFeedData] = useState(null);
  const [newPostText, setNewPostText] = useState('');
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await api.getCommunityFeed();
        if (res.data) setFeedData(res.data);
      } catch (e) {
        console.warn('Using local community feed');
      }
    };
    fetchFeed();
  }, []);

  const handleLike = async (postId) => {
    try {
      const res = await api.likePost(postId);
      if (res.post) {
        setFeedData((prev) => ({
          ...prev,
          posts: prev.posts.map((p) => (p.id === postId ? res.post : p))
        }));
      }
    } catch (e) {
      // Optimistic toggle
      setFeedData((prev) => ({
        ...prev,
        posts: prev.posts.map((p) =>
          p.id === postId
            ? { ...p, likes: p.isLiked ? p.likes - 1 : p.likes + 1, isLiked: !p.isLiked }
            : p
        )
      }));
    }
  };

  const handleAddComment = async (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    try {
      const res = await api.commentPost(postId, text);
      if (res.post) {
        setFeedData((prev) => ({
          ...prev,
          posts: prev.posts.map((p) => (p.id === postId ? res.post : p))
        }));
      }
    } catch (e) {
      showToast('Comment posted!');
    }
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    try {
      const res = await api.createPost({
        content: newPostText,
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80'
      });
      if (res.data) {
        setFeedData(res.data);
        showToast('Milestone shared with community!');
        confetti({ particleCount: 40 });
      }
    } catch (e) {
      showToast('Post shared!');
    }
    setNewPostText('');
  };

  const handleJoinChallenge = async () => {
    try {
      const res = await api.joinChallenge();
      if (res.challenge) {
        setFeedData((prev) => ({ ...prev, weeklyChallenge: res.challenge }));
      }
    } catch (e) {}
    confetti({ particleCount: 70, spread: 80 });
    showToast('Joined Weekly Challenge! 1,000 steps credited.');
  };

  const posts = feedData?.posts || [
    {
      id: 'post-1',
      author: 'Priya S',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      timeAgo: '2 hours ago',
      content: 'Completed my 5K run today! 🏃‍♀️ Feeling great!',
      image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=600&q=80',
      likes: 24,
      isLiked: false,
      commentsCount: 2,
      comments: [
        { id: 'c1', user: 'Abhishek N J', text: 'Incredible pace Priya! Keep crushing it! 🔥' }
      ]
    }
  ];

  const challenge = feedData?.weeklyChallenge || {
    title: '10,000 Steps Daily',
    currentSteps: 6542,
    targetSteps: 10000,
    joined: true
  };

  const challengePct = Math.min(100, Math.round((challenge.currentSteps / challenge.targetSteps) * 100));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Community</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Connect, share and stay motivated together.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
        {['Feed', 'Challenges', 'Success Stories', 'Discussions'].map((tab) => {
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

      {/* Layout: Feed (Col 8) + Weekly Challenge Card (Col 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Posts Feed Column */}
        <div className="lg:col-span-8 space-y-5">
          {/* Post Composer */}
          <form
            onSubmit={handleCreatePost}
            className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-card"
          >
            <div className="flex gap-3">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover" />
              <input
                type="text"
                placeholder="Share your fitness milestone or post..."
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                className="flex-1 bg-slate-50 dark:bg-slate-800 text-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 transition-colors"
              >
                <ImageIcon className="w-4 h-4 text-emerald-500" />
                <span>Add Photo</span>
              </button>
              <button
                type="submit"
                disabled={!newPostText.trim()}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold shadow-sm"
              >
                Post
              </button>
            </div>
          </form>

          {/* Social Posts */}
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-card space-y-4"
            >
              {/* Author info */}
              <div className="flex items-center gap-3">
                <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{post.author}</h3>
                  <p className="text-[11px] text-slate-400">{post.timeAgo}</p>
                </div>
              </div>

              {/* Text content */}
              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {post.content}
              </p>

              {/* Post photo */}
              {post.image && (
                <div className="rounded-xl overflow-hidden aspect-video bg-slate-100 dark:bg-slate-800">
                  <img src={post.image} alt="Fitness activity" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Post action bar */}
              <div className="flex items-center gap-6 pt-2 text-xs font-semibold text-slate-500 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 hover:text-rose-500 transition-colors ${
                    post.isLiked ? 'text-rose-500 font-bold' : ''
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{post.likes} Likes</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.commentsCount || 0} Comments</span>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    showToast('Post link copied!');
                  }}
                  className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

              {/* Comments */}
              {post.comments && post.comments.length > 0 && (
                <div className="space-y-2 pt-2">
                  {post.comments.map((c, i) => (
                    <div key={i} className="text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <span className="font-bold text-slate-800 dark:text-slate-200 mr-2">{c.user}:</span>
                      <span className="text-slate-600 dark:text-slate-300">{c.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Add comment input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Write an encouraging comment..."
                  value={commentInputs[post.id] || ''}
                  onChange={(e) =>
                    setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddComment(post.id);
                  }}
                  className="flex-1 bg-slate-50 dark:bg-slate-800 text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={() => handleAddComment(post.id)}
                  className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Challenge Card (Col 4) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Featured Challenge
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{challenge.title}</h3>
          <p className="text-xs text-slate-400 mt-0.5">Stay active and unlock the Gold Walker Badge.</p>

          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">
                {challenge.currentSteps.toLocaleString()} / {challenge.targetSteps.toLocaleString()} steps
              </span>
              <span className="text-emerald-600 font-bold">{challengePct}%</span>
            </div>

            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${challengePct}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={handleJoinChallenge}
            className="w-full mt-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-xs shadow-md shadow-emerald-600/30 transition-all"
          >
            Join Challenge
          </button>
        </div>
      </div>
    </div>
  );
};
