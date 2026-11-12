import jwt from 'jsonwebtoken';
import { initialData } from '../data/mockData.js';
import { AppError } from '../middleware/errorHandler.js';

let currentUser = { ...initialData.user };

const JWT_SECRET = process.env.JWT_SECRET || 'fitai_super_secret_jwt_key_2026_fitness_health';

export const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // Demo user credentials check or accept demo login
  const token = jwt.sign(
    { id: currentUser.id, email: currentUser.email, name: currentUser.name, role: currentUser.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.status(200).json({
    success: true,
    message: 'Login successful! Welcome back to FitAI.',
    token,
    user: currentUser
  });
};

export const register = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new AppError('Please provide name, email, and password', 400));
  }

  currentUser.name = name;
  currentUser.email = email;

  const token = jwt.sign(
    { id: currentUser.id, email: currentUser.email, name: currentUser.name, role: currentUser.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.status(201).json({
    success: true,
    message: 'Account created successfully! Welcome to FitAI.',
    token,
    user: currentUser
  });
};

export const getProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: currentUser
  });
};

export const updateProfile = (req, res) => {
  const updates = req.body;

  // Calculate new BMI if height/weight updated
  const height = updates.height ? parseFloat(updates.height) : currentUser.height;
  const weight = updates.weight ? parseFloat(updates.weight) : currentUser.weight;

  let bmi = currentUser.bmi;
  let bmiStatus = currentUser.bmiStatus;
  let suggestedCalorieIntake = currentUser.suggestedCalorieIntake;

  if (height && weight) {
    const heightInMeters = height / 100;
    bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
    if (bmi < 18.5) bmiStatus = 'Underweight (< 18.5)';
    else if (bmi <= 24.9) bmiStatus = 'Normal (18.5 - 24.9)';
    else if (bmi <= 29.9) bmiStatus = 'Overweight (25 - 29.9)';
    else bmiStatus = 'Obese (≥ 30)';

    // Suggested calories estimation
    const goal = updates.goal || currentUser.goal;
    const base = weight * 24;
    if (goal === 'Weight Loss') suggestedCalorieIntake = Math.round(base * 1.1);
    else if (goal === 'Muscle Gain') suggestedCalorieIntake = Math.round(base * 1.4);
    else suggestedCalorieIntake = Math.round(base * 1.25);
  }

  currentUser = {
    ...currentUser,
    ...updates,
    bmi,
    bmiStatus,
    suggestedCalorieIntake
  };

  // Sync with today's stats
  initialData.todayStats.weight = currentUser.weight;
  initialData.todayStats.bmi = currentUser.bmi;

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully!',
    user: currentUser
  });
};

export const updateAvatar = (req, res, next) => {
  if (req.file) {
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    currentUser.avatar = base64Image;
  } else if (req.body.avatarUrl) {
    currentUser.avatar = req.body.avatarUrl;
  } else {
    return next(new AppError('No avatar image provided', 400));
  }

  res.status(200).json({
    success: true,
    message: 'Profile picture updated successfully!',
    avatar: currentUser.avatar
  });
};
