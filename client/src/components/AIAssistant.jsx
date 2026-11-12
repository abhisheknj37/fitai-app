import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  Bot,
  Send,
  Plus,
  Dumbbell,
  Utensils,
  Heart,
  Sparkles,
  Volume2,
  Trash2,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const AIAssistant = () => {
  const { setActiveTab, user } = useApp();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Load chat history from backend
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.getAiHistory();
        if (res.messages) {
          setMessages(res.messages);
        }
      } catch (err) {
        console.warn('Using local chat history');
      }
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || loading) return;

    const question = inputText.trim();
    setInputText('');

    // Optimistically append user message
    const tempUserMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, tempUserMsg]);
    setLoading(true);

    try {
      const res = await api.askAi(question);
      if (res.messages) {
        setMessages(res.messages);
      } else if (res.reply) {
        setMessages((prev) => [...prev, res.reply]);
      }
    } catch (err) {
      // Fallback AI reply
      const fallbackReply = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `Here is my recommendation for: "${question}"\n\n1. Target a consistent caloric deficit of ~350-500 kcal.\n2. Incorporate 3x strength training and 2x cardio per week.\n3. Drink at least 2.5L of water daily and sleep 7-8 hours.\n\nKeep up the great work!`,
        quickCards: [
          { title: 'Workout Plan', subtitle: '8-week customized plan', icon: 'dumbbell' },
          { title: 'Diet Plan', subtitle: 'Indian food suggestions', icon: 'utensils' }
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickCardClick = (cardTitle) => {
    if (cardTitle.toLowerCase().includes('workout')) {
      setActiveTab('workouts');
    } else if (cardTitle.toLowerCase().includes('diet') || cardTitle.toLowerCase().includes('meal')) {
      setActiveTab('nutrition');
    } else if (cardTitle.toLowerCase().includes('lifestyle') || cardTitle.toLowerCase().includes('report')) {
      setActiveTab('reports');
    } else {
      setInputText(`Tell me more about ${cardTitle}`);
    }
  };

  const handleNewChat = async () => {
    try {
      await api.clearAiChat();
    } catch (e) {}
    setMessages([
      {
        id: 'msg-welcome',
        sender: 'ai',
        text: `Hello ${user.name}! I am your FitAI Assistant. How can I guide your workout, diet, or recovery today?`,
        quickCards: [
          { title: 'Workout Plan', subtitle: '8-week customized plan', icon: 'dumbbell' },
          { title: 'Diet Plan', subtitle: 'Indian food suggestions', icon: 'utensils' },
          { title: 'Lifestyle Tips', subtitle: 'Sleep, stress & habits', icon: 'heart' }
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*#]/g, ''));
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto h-[calc(100vh-5rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Health Assistant</h1>
            <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Online
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Ask anything about fitness, nutrition, health and wellness.
          </p>
        </div>

        <button
          onClick={handleNewChat}
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-sm shadow-emerald-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Chat Messages Flow */}
      <div className="flex-1 overflow-y-auto py-6 space-y-6 pr-2">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-9 h-9 rounded-xl bg-emerald-500 flex-shrink-0 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 mt-1">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div className={`max-w-2xl space-y-3 ${isUser ? 'items-end' : 'items-start'}`}>
                {/* Bubble */}
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed shadow-card ${
                    isUser
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  <div className={`flex items-center justify-between mt-2 pt-1 border-t ${
                    isUser ? 'border-white/20 text-emerald-100' : 'border-slate-100 dark:border-slate-800 text-slate-400'
                  } text-[11px]`}>
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleSpeak(msg.text)}
                        title="Read aloud"
                        className="p-1 hover:text-emerald-500 transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Quick Action Cards (If available on AI response) */}
                {msg.quickCards && msg.quickCards.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    {msg.quickCards.map((card, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickCardClick(card.title)}
                        className="p-3 bg-white dark:bg-slate-900 hover:bg-emerald-50/60 dark:hover:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-800 text-left transition-all hover:border-emerald-500 hover:shadow-md group"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {card.title.toLowerCase().includes('workout') ? (
                            <Dumbbell className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                          ) : card.title.toLowerCase().includes('diet') ? (
                            <Utensils className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                          ) : (
                            <Heart className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
                          )}
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{card.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{card.subtitle}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {isUser && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-xl object-cover ring-2 ring-emerald-500/20 flex-shrink-0 mt-1"
                />
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3.5 justify-start">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex-shrink-0 flex items-center justify-center text-white">
              <Bot className="w-5 h-5 animate-spin" />
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-card flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-xs text-slate-400 ml-2">FitAI is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 shrink-0">
          <Sparkles className="w-3 h-3 text-emerald-500" /> Suggestions:
        </span>
        {[
          'Suggest high-protein Indian snacks',
          'How to burn belly fat faster?',
          'What is my optimal water intake?'
        ].map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => setInputText(prompt)}
            className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 whitespace-nowrap transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Bottom Input Form */}
      <form onSubmit={handleSend} className="pt-2 relative">
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-sm focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask your health question..."
            className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || loading}
            className="p-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl shadow-md shadow-emerald-600/30 transition-all duration-150 active:scale-95 flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
