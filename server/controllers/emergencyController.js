import { initialData } from '../data/mockData.js';

let emergencyState = JSON.parse(JSON.stringify(initialData.emergency));
let activeAlert = null;

export const getEmergencyData = (req, res) => {
  res.status(200).json({
    success: true,
    data: emergencyState,
    activeAlert
  });
};

export const triggerSosAlert = (req, res) => {
  const { latitude, longitude, reason = 'Urgent Medical Assistance Required' } = req.body;

  const now = new Date();
  activeAlert = {
    alertId: `SOS-${Date.now()}`,
    timestamp: now.toISOString(),
    status: 'ACTIVE_DISPATCH',
    reason,
    location: {
      latitude: latitude || 12.9716,
      longitude: longitude || 77.5946,
      addressApprox: 'Indiranagar, Bangalore, Karnataka, India'
    },
    dispatchedTo: [
      emergencyState.ambulanceServiceName,
      ...emergencyState.contacts.map((c) => `${c.name} (${c.phone})`)
    ]
  };

  res.status(200).json({
    success: true,
    message: 'CRITICAL: SOS Alert dispatched! Ambulance and emergency contacts notified.',
    alert: activeAlert
  });
};

export const cancelSosAlert = (req, res) => {
  activeAlert = null;
  res.status(200).json({
    success: true,
    message: 'SOS Alert canceled by user.'
  });
};

export const addContact = (req, res) => {
  const { name, relationship, phone } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and phone are required.' });
  }

  const newContact = {
    id: `cont-${Date.now()}`,
    name,
    relationship: relationship || 'Family',
    phone
  };

  emergencyState.contacts.push(newContact);

  res.status(201).json({
    success: true,
    message: 'Emergency contact added successfully!',
    contacts: emergencyState.contacts
  });
};

export const deleteContact = (req, res) => {
  const { id } = req.params;
  emergencyState.contacts = emergencyState.contacts.filter((c) => c.id !== id);

  res.status(200).json({
    success: true,
    message: 'Emergency contact removed.',
    contacts: emergencyState.contacts
  });
};
