import { initialData } from '../data/mockData.js';

let waterProgress = [...initialData.weeklyWaterProgress];

export const getTrackingData = (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      water: {
        currentLiters: initialData.todayStats.waterLiters,
        goalLiters: initialData.todayStats.waterGoalLiters,
        percentage: initialData.todayStats.waterPercentage,
        weekly: waterProgress
      },
      steps: {
        current: initialData.todayStats.steps,
        goal: initialData.todayStats.stepsGoal,
        percentage: initialData.todayStats.stepsPercentage
      },
      sleep: {
        hours: initialData.todayStats.sleepHours,
        goal: initialData.todayStats.sleepGoalHours,
        percentage: initialData.todayStats.sleepPercentage
      },
      calories: {
        burned: initialData.todayStats.caloriesBurned,
        target: initialData.todayStats.caloriesTarget,
        left: initialData.todayStats.caloriesLeft
      },
      weight: {
        current: initialData.todayStats.weight,
        history: initialData.weightProgress
      }
    }
  });
};

export const updateWater = (req, res) => {
  const { delta } = req.body; // e.g. +0.25 (one glass) or -0.25
  const change = parseFloat(delta) || 0.25;

  let newAmount = parseFloat((initialData.todayStats.waterLiters + change).toFixed(2));
  if (newAmount < 0) newAmount = 0;
  if (newAmount > 10) newAmount = 10;

  initialData.todayStats.waterLiters = newAmount;
  initialData.todayStats.waterPercentage = Math.min(
    100,
    Math.round((newAmount / initialData.todayStats.waterGoalLiters) * 100)
  );

  // Update today's entry in weekly chart (assume Sunday is today)
  waterProgress[6].amount = newAmount;

  res.status(200).json({
    success: true,
    message: change > 0 ? 'Water intake logged (+250ml)!' : 'Water intake reduced (-250ml)!',
    water: {
      currentLiters: initialData.todayStats.waterLiters,
      goalLiters: initialData.todayStats.waterGoalLiters,
      percentage: initialData.todayStats.waterPercentage,
      weekly: waterProgress
    }
  });
};
