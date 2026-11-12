import { initialData } from '../data/mockData.js';

let workoutState = JSON.parse(JSON.stringify(initialData.workouts));

export const getWorkouts = (req, res) => {
  res.status(200).json({
    success: true,
    data: workoutState
  });
};

export const setLevel = (req, res) => {
  const { level } = req.body;
  if (['Beginner', 'Intermediate', 'Advanced'].includes(level)) {
    workoutState.currentLevel = level;
  }
  res.status(200).json({
    success: true,
    data: workoutState
  });
};

export const generateNewPlan = (req, res) => {
  const { goal = 'Weight Loss', level = 'Beginner', daysPerWeek = 4 } = req.body;

  workoutState.currentLevel = level;
  workoutState.weeks[0] = {
    id: 1,
    title: `Week 1 – Customized ${goal} Routine`,
    subtitle: `${daysPerWeek} days per week • 30–45 minutes per session`,
    exercises: [
      {
        id: `ex-gen-1`,
        name: level === 'Advanced' ? 'Burpee Pull-ups' : 'Jumping Jacks',
        setsReps: '3 sets x 30 seconds',
        tag: 'Cardio',
        color: 'emerald',
        durationSec: 30,
        sets: 3,
        videoUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80',
        instructions: 'Elevate heart rate with consistent pace.'
      },
      {
        id: `ex-gen-2`,
        name: level === 'Advanced' ? 'Barbell Back Squats' : 'Air Squats',
        setsReps: '3 sets x 12 reps',
        tag: 'Strength',
        color: 'orange',
        reps: 12,
        sets: 3,
        videoUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=400&q=80',
        instructions: 'Maintain upright torso and strong core.'
      },
      {
        id: `ex-gen-3`,
        name: level === 'Advanced' ? 'Diamond Push-ups' : 'Standard Push-ups',
        setsReps: '3 sets x 10 reps',
        tag: 'Strength',
        color: 'orange',
        reps: 10,
        sets: 3,
        videoUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=400&q=80',
        instructions: 'Chest touching ground, elbows tight.'
      },
      {
        id: `ex-gen-4`,
        name: 'Plank with Shoulder Taps',
        setsReps: '3 sets x 45 seconds',
        tag: 'Core',
        color: 'blue',
        durationSec: 45,
        sets: 3,
        videoUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80',
        instructions: 'Resist hip rotation while touching opposite shoulder.'
      }
    ]
  };

  res.status(200).json({
    success: true,
    message: `New AI ${goal} plan generated successfully!`,
    data: workoutState
  });
};
