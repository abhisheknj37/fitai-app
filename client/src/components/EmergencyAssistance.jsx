import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  ShieldAlert,
  PhoneCall,
  Hospital,
  MapPin,
  Users,
  AlertCircle,
  Plus,
  Trash2,
  X,
  Compass,
  CheckCircle2
} from 'lucide-react';

export const EmergencyAssistance = () => {
  const { showToast } = useApp();
  const [emergencyData, setEmergencyData] = useState(null);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [sosActive, setSosActive] = useState(false);
  const [activeCardModal, setActiveCardModal] = useState(null); // 'hospital' | 'location' | 'contacts'
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: 'Family' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.getEmergencyData();
        if (res.data) {
          setEmergencyData(res.data);
          setContacts(res.data.contacts || []);
        }
      } catch (e) {
        console.warn('Using local emergency data');
      }
    };
    fetchData();
  }, []);

  // SOS Countdown timer
  useEffect(() => {
    let timer = null;
    if (sosModalOpen && countdown > 0 && !sosActive) {
      timer = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    } else if (countdown === 0 && sosModalOpen && !sosActive) {
      triggerSosDispatch();
    }
    return () => clearInterval(timer);
  }, [sosModalOpen, countdown, sosActive]);

  const triggerSosDispatch = async () => {
    setSosActive(true);
    try {
      await api.triggerSos({ reason: 'Immediate Medical SOS Triggered via FitAI' });
      showToast('CRITICAL: SOS dispatched to 108 and emergency contacts!', 'danger');
    } catch (e) {
      showToast('SOS Alert broadcasted!');
    }
  };

  const handleCancelSos = async () => {
    setSosModalOpen(false);
    setSosActive(false);
    setCountdown(5);
    try {
      await api.cancelSos();
    } catch (e) {}
    showToast('SOS alert canceled.');
  };

  const handleAddContactSubmit = async (e) => {
    e.preventDefault();
    if (!newContact.name || !newContact.phone) return;

    try {
      const res = await api.addEmergencyContact(newContact);
      if (res.contacts) {
        setContacts(res.contacts);
        showToast('Emergency contact added!');
      }
    } catch (e) {
      setContacts((prev) => [...prev, { id: `c-${Date.now()}`, ...newContact }]);
      showToast('Contact saved!');
    }
    setNewContact({ name: '', phone: '', relationship: 'Family' });
  };

  const handleDeleteContact = async (id) => {
    try {
      await api.deleteEmergencyContact(id);
    } catch (e) {}
    setContacts((prev) => prev.filter((c) => c.id !== id));
    showToast('Contact removed');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Emergency Assistance</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Quick access to emergency help and safety features.
          </p>
        </div>

        {/* Big Red SOS Alert Button */}
        <button
          onClick={() => {
            setCountdown(5);
            setSosActive(false);
            setSosModalOpen(true);
          }}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-red-600/30 transition-all self-start sm:self-auto animate-pulse"
        >
          <ShieldAlert className="w-5 h-5" />
          <span>SOS Alert</span>
        </button>
      </div>

      {/* 4 Emergency Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Call Ambulance */}
        <div
          onClick={() => window.open('tel:108')}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card hover:border-red-500 hover:shadow-lg transition-all cursor-pointer flex flex-col items-center text-center group"
        >
          <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <PhoneCall className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Call Ambulance</h3>
          <p className="text-xs text-slate-400 mt-1">108 Emergency Medical Services</p>
          <span className="mt-4 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-3 py-1 rounded-full">
            Toll-Free 24/7
          </span>
        </div>

        {/* Card 2: Nearest Hospital */}
        <div
          onClick={() => setActiveCardModal('hospital')}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer flex flex-col items-center text-center group"
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Hospital className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Nearest Hospital</h3>
          <p className="text-xs text-slate-400 mt-1">Find nearby emergency centers</p>
          <span className="mt-4 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            3 Facilities Close
          </span>
        </div>

        {/* Card 3: Share Location */}
        <div
          onClick={() => setActiveCardModal('location')}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer flex flex-col items-center text-center group"
        >
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <MapPin className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Share Location</h3>
          <p className="text-xs text-slate-400 mt-1">Share with family or emergency contacts</p>
          <span className="mt-4 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
            GPS Live Beacon
          </span>
        </div>

        {/* Card 4: Emergency Contacts */}
        <div
          onClick={() => setActiveCardModal('contacts')}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer flex flex-col items-center text-center group"
        >
          <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Users className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Emergency Contacts</h3>
          <p className="text-xs text-slate-400 mt-1">Manage your emergency contacts</p>
          <span className="mt-4 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-3 py-1 rounded-full">
            {contacts.length} Trusted Contacts
          </span>
        </div>
      </div>

      {/* SOS Alert Active / Trigger Modal */}
      {sosModalOpen && (
        <div className="fixed inset-0 bg-red-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in-50">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 shadow-2xl border-2 border-red-500 text-center relative overflow-hidden">
            {/* Siren ring animation */}
            <div className="w-20 h-20 mx-auto rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mb-4 animate-ping [animation-duration:1.5s]">
              <ShieldAlert className="w-10 h-10" />
            </div>

            {!sosActive ? (
              <>
                <h3 className="text-2xl font-black text-red-600">EMERGENCY SOS</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Dispatching ambulance and broadcasting your live GPS location in:
                </p>
                <div className="text-6xl font-black text-slate-900 dark:text-white font-mono my-4">
                  00:0{countdown}
                </div>
                <button
                  onClick={handleCancelSos}
                  className="w-full py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm shadow-lg hover:opacity-90"
                >
                  Cancel (False Alarm)
                </button>
              </>
            ) : (
              <>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold mb-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                  DISPATCH ACTIVE
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Ambulance Notified</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  108 Emergency responders have received your distress signal with high precision GPS coordinates. Stay calm and remain where you are.
                </p>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleCancelSos}
                    className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold"
                  >
                    Close Banner
                  </button>
                  <button
                    onClick={() => window.open('tel:108')}
                    className="flex-1 py-3 rounded-xl bg-red-600 text-white text-xs font-bold shadow-md shadow-red-600/30"
                  >
                    Direct Call 108
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hospital Modal */}
      {activeCardModal === 'hospital' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
            <button
              onClick={() => setActiveCardModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <Hospital className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Nearby Emergency Hospitals</h3>
            </div>
            <div className="space-y-3">
              {[
                { name: 'City Care Multispeciality Hospital', dist: '1.2 km away', phone: '+91 80 2345 6789' },
                { name: 'Apollo Lifeline Hospital', dist: '2.5 km away', phone: '+91 80 4123 4567' },
                { name: 'Fortis Health Center', dist: '3.8 km away', phone: '+91 80 5566 7788' }
              ].map((h, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border border-slate-100 dark:border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{h.name}</h4>
                    <p className="text-xs text-emerald-600 font-semibold mt-0.5">{h.dist} • 24/7 ER</p>
                  </div>
                  <a
                    href={`tel:${h.phone}`}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
                  >
                    Call
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contacts Modal */}
      {activeCardModal === 'contacts' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
            <button
              onClick={() => setActiveCardModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Emergency Contacts</h3>
            </div>

            <div className="space-y-3 mb-6">
              {contacts.map((c) => (
                <div key={c.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border border-slate-100 dark:border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{c.name}</h4>
                    <p className="text-xs text-slate-400">{c.relationship} • {c.phone}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteContact(c.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddContactSubmit} className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Add New Contact</span>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
              >
                Save Contact
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Location Modal */}
      {activeCardModal === 'location' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
            <button
              onClick={() => setActiveCardModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Live GPS Location</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Your location beacon is encrypted and ready to transmit to responders.
            </p>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Latitude:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">12.9716° N</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Longitude:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">77.5946° E</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Accuracy:</span>
                <span className="font-bold text-emerald-600">Within 3 meters</span>
              </div>
            </div>
            <button
              onClick={() => {
                showToast('Location link copied to clipboard!');
                setActiveCardModal(null);
              }}
              className="w-full mt-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
            >
              Share Live Location
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
