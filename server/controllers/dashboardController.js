import { initialData } from '../data/mockData.js';

export const getDashboardData = (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: {
        name: initialData.user.name,
        role: initialData.user.role,
        avatar: initialData.user.avatar
      },
      todayStats: initialData.todayStats,
      weightProgress: initialData.weightProgress
    }
  });
};

export const logActivity = (req, res) => {
  const { type, amount } = req.body;
  const num = parseFloat(amount) || 0;

  if (type === 'steps') {
    initialData.todayStats.steps += Math.round(num);
    initialData.todayStats.stepsPercentage = Math.min(100, Math.round((initialData.todayStats.steps / initialData.todayStats.stepsGoal) * 100));
    // also add calories burned (~0.04 kcal per step)
    const burned = Math.round(num * 0.04);
    initialData.todayStats.caloriesBurned += burned;
    initialData.todayStats.caloriesLeft = Math.max(0, initialData.todayStats.caloriesTarget - initialData.todayStats.caloriesBurned);
    initialData.todayStats.caloriesPercentage = Math.min(100, Math.round((initialData.todayStats.caloriesBurned / initialData.todayStats.caloriesTarget) * 100));
  } else if (type === 'water') {
    initialData.todayStats.waterLiters = parseFloat((initialData.todayStats.waterLiters + num).toFixed(1));
    initialData.todayStats.waterPercentage = Math.min(100, Math.round((initialData.todayStats.waterLiters / initialData.todayStats.waterGoalLiters) * 100));
  } else if (type === 'sleep') {
    initialData.todayStats.sleepHours = num;
    initialData.todayStats.sleepPercentage = Math.min(100, Math.round((num / initialData.todayStats.sleepGoalHours) * 100));
  } else if (type === 'workout') {
    initialData.todayStats.caloriesBurned += Math.round(num);
    initialData.todayStats.caloriesLeft = Math.max(0, initialData.todayStats.caloriesTarget - initialData.todayStats.caloriesBurned);
    initialData.todayStats.caloriesPercentage = Math.min(100, Math.round((initialData.todayStats.caloriesBurned / initialData.todayStats.caloriesTarget) * 100));
  }

  res.status(200).json({
    success: true,
    message: 'Activity logged successfully!',
    todayStats: initialData.todayStats
  });
};
