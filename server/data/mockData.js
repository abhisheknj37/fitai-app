export const initialData = {
  user: {
    id: 'user_abhishek_01',
    name: 'Abhishek N J',
    email: 'abhisheknj@example.com',
    phone: '+91 9876543210',
    role: 'Premium User',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    age: 30,
    gender: 'Female',
    height: 165, // cm
    weight: 72, // kg
    weightChange: -1.5,
    activityLevel: 'Moderately Active',
    goal: 'Weight Loss',
    bmi: 22.8,
    bmiStatus: 'Normal (18.5 - 24.9)',
    suggestedCalorieIntake: 1850,
    dailyCalorieTarget: 2300,
    stepGoal: 12000,
    waterGoal: 2.5, // Liters
    sleepGoal: 8 // Hours
  },

  todayStats: {
    weight: 72,
    weightChange: -1.5,
    bmi: 22.8,
    bmiCategory: 'Healthy',
    steps: 7856,
    stepsGoal: 12000,
    stepsPercentage: 65,
    caloriesBurned: 1850,
    caloriesTarget: 2300,
    caloriesLeft: 450,
    caloriesPercentage: 80,
    waterLiters: 1.8,
    waterGoalLiters: 2.5,
    waterPercentage: 72,
    sleepHours: 7,
    sleepGoalHours: 8,
    sleepPercentage: 88
  },

  weightProgress: [
    { month: 'Jan', weight: 78.0, target: 70 },
    { month: 'Feb', weight: 76.5, target: 70 },
    { month: 'Mar', weight: 75.0, target: 70 },
    { month: 'Apr', weight: 74.2, target: 70 },
    { month: 'May', weight: 72.8, target: 70 },
    { month: 'Jun', weight: 72.0, target: 70 }
  ],

  weeklyWaterProgress: [
    { day: 'Mon', amount: 2.0 },
    { day: 'Tue', amount: 2.2 },
    { day: 'Wed', amount: 1.8 },
    { day: 'Thu', amount: 2.4 },
    { day: 'Fri', amount: 2.1 },
    { day: 'Sat', amount: 2.5 },
    { day: 'Sun', amount: 1.8 }
  ],

  workouts: {
    currentLevel: 'Beginner',
    activeWeek: 1,
    weeks: [
      {
        id: 1,
        title: 'Week 1 – Full Body Plan',
        subtitle: '4 days per week • 30–45 minutes per session',
        exercises: [
          {
            id: 'ex-1',
            name: 'Jumping Jacks',
            setsReps: '3 sets x 30 seconds',
            tag: 'Cardio',
            color: 'emerald',
            durationSec: 30,
            sets: 3,
            videoUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80',
            instructions: 'Start with feet together and arms at sides. Jump feet out while raising arms overhead. Return and repeat.'
          },
          {
            id: 'ex-2',
            name: 'Squats',
            setsReps: '3 sets x 12 reps',
            tag: 'Strength',
            color: 'orange',
            reps: 12,
            sets: 3,
            videoUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=400&q=80',
            instructions: 'Stand shoulder-width apart, push hips back, bend knees until thighs are parallel to ground, push back up.'
          },
          {
            id: 'ex-3',
            name: 'Push-ups',
            setsReps: '3 sets x 10 reps',
            tag: 'Strength',
            color: 'orange',
            reps: 10,
            sets: 3,
            videoUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=400&q=80',
            instructions: 'Keep body in straight plank, lower chest to floor with elbows at 45 degrees, press back up.'
          },
          {
            id: 'ex-4',
            name: 'Plank',
            setsReps: '3 sets x 45 seconds',
            tag: 'Core',
            color: 'blue',
            durationSec: 45,
            sets: 3,
            videoUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80',
            instructions: 'Hold forearms on ground, engage core, keep neck neutral and back flat without sagging.'
          }
        ]
      },
      {
        id: 2,
        title: 'Week 2 – Strength Focus',
        subtitle: '4 days per week • 35–45 minutes per session',
        exercises: [
          {
            id: 'ex-21',
            name: 'Dumbbell Lunges',
            setsReps: '3 sets x 12 reps',
            tag: 'Strength',
            color: 'orange',
            reps: 12,
            sets: 3,
            videoUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80',
            instructions: 'Step forward into 90-degree lunge, keeping chest upright.'
          },
          {
            id: 'ex-22',
            name: 'Glute Bridges',
            setsReps: '3 sets x 15 reps',
            tag: 'Strength',
            color: 'orange',
            reps: 15,
            sets: 3,
            videoUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80',
            instructions: 'Drive through heels to lift hips towards ceiling.'
          }
        ]
      },
      {
        id: 3,
        title: 'Week 3 – Cardio Burn',
        subtitle: '5 days per week • 30 minutes HIIT',
        exercises: [
          {
            id: 'ex-31',
            name: 'High Knees',
            setsReps: '4 sets x 30 seconds',
            tag: 'Cardio',
            color: 'emerald',
            durationSec: 30,
            sets: 4,
            videoUrl: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=400&q=80',
            instructions: 'Run in place lifting knees to hip height vigorously.'
          },
          {
            id: 'ex-32',
            name: 'Burpees',
            setsReps: '3 sets x 10 reps',
            tag: 'Cardio',
            color: 'emerald',
            reps: 10,
            sets: 3,
            videoUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=400&q=80',
            instructions: 'Drop into squat, kick feet back to plank, push up, jump up.'
          }
        ]
      },
      {
        id: 4,
        title: 'Week 4 – Core & Flexibility',
        subtitle: '4 days per week • 30 minutes mobility & core',
        exercises: [
          {
            id: 'ex-41',
            name: 'Bicycle Crunches',
            setsReps: '3 sets x 20 reps',
            tag: 'Core',
            color: 'blue',
            reps: 20,
            sets: 3,
            videoUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=400&q=80',
            instructions: 'Alternate opposite elbow to opposite knee with control.'
          },
          {
            id: 'ex-42',
            name: 'Cobra Stretch & Child Pose',
            setsReps: '3 sets x 40 seconds',
            tag: 'Flexibility',
            color: 'emerald',
            durationSec: 40,
            sets: 3,
            videoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80',
            instructions: 'Gently stretch spinal extensors and hip flexors.'
          }
        ]
      }
    ]
  },

  nutrition: {
    totalCalories: 1850,
    macros: {
      carbsPercent: 45,
      proteinPercent: 25,
      fatsPercent: 30,
      carbsGrams: 208,
      proteinGrams: 115,
      fatsGrams: 62
    },
    todayMeals: [
      {
        id: 'meal-1',
        type: 'Breakfast',
        name: 'Oats with Fruits',
        calories: 350,
        image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=300&q=80',
        items: 'Rolled oats, almond milk, sliced banana, chia seeds, honey'
      },
      {
        id: 'meal-2',
        type: 'Lunch',
        name: 'Brown Rice + Dal + Veg',
        calories: 650,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80',
        items: '1 cup steamed brown rice, yellow lentil dal, sautéed spinach & paneer'
      },
      {
        id: 'meal-3',
        type: 'Dinner',
        name: 'Grilled Chicken + Salad',
        calories: 450,
        image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=300&q=80',
        items: '180g lean grilled chicken breast, fresh green salad, olive oil dressing'
      }
    ]
  },

  healthReport: {
    overallScore: 85,
    scoreStatus: 'Good',
    message: "You're on the right track! Keep maintaining your healthy habits.",
    keyInsights: [
      {
        id: 'ins-1',
        title: 'Weight is decreasing gradually',
        type: 'success',
        icon: 'trending-down'
      },
      {
        id: 'ins-2',
        title: 'Good sleep consistency',
        type: 'success',
        icon: 'check-circle'
      },
      {
        id: 'ins-3',
        title: 'Recommended to increase protein intake',
        type: 'warning',
        icon: 'alert-triangle'
      },
      {
        id: 'ins-4',
        title: 'Maintain daily step goal',
        type: 'info',
        icon: 'check-circle'
      }
    ],
    bmiAnalysis: {
      current: 22.8,
      category: 'Normal (18.5 - 24.9)',
      riskLevel: 'Low Risk',
      healthyRange: '58 kg - 75 kg'
    },
    activityBreakdown: {
      weeklyActiveMinutes: 210,
      targetActiveMinutes: 240,
      averageDailySteps: 8450
    }
  },

  emergency: {
    ambulanceNumber: '108',
    ambulanceServiceName: '108 Emergency Medical Services',
    nearbyHospitals: [
      {
        id: 'hosp-1',
        name: 'City Care Multispeciality Hospital',
        distance: '1.2 km away',
        address: '4th Block, Koramangala, Metro Zone',
        phone: '+91 80 2345 6789',
        emergencyServices: '24/7 Trauma, ICU, Cardiac Care'
      },
      {
        id: 'hosp-2',
        name: 'Apollo Lifeline Hospital',
        distance: '2.5 km away',
        address: 'Outer Ring Road, Health City',
        phone: '+91 80 4123 4567',
        emergencyServices: '24/7 Emergency & Ambulance'
      },
      {
        id: 'hosp-3',
        name: 'Fortis Health Center',
        distance: '3.8 km away',
        address: '15th Cross, Indiranagar',
        phone: '+91 80 5566 7788',
        emergencyServices: '24/7 Stroke & Urgent Care Unit'
      }
    ],
    contacts: [
      {
        id: 'cont-1',
        name: 'Dr. Ramesh Kumar',
        relationship: 'Family Physician',
        phone: '+91 98450 12345'
      },
      {
        id: 'cont-2',
        name: 'Priya Sharma',
        relationship: 'Spouse / Primary Contact',
        phone: '+91 98450 98765'
      }
    ]
  },

  community: {
    weeklyChallenge: {
      title: '10,000 Steps Daily',
      currentSteps: 6542,
      targetSteps: 10000,
      joined: true,
      rewardBadge: 'Gold Walker Badge'
    },
    posts: [
      {
        id: 'post-1',
        author: 'Priya S',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        timeAgo: '2 hours ago',
        content: 'Completed my 5K run today! 🏃‍♀️ Feeling great!',
        image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=600&q=80',
        likes: 24,
        isLiked: false,
        commentsCount: 6,
        comments: [
          { id: 'c1', user: 'Abhishek N J', text: 'Incredible pace Priya! Keep crushing it! 🔥' },
          { id: 'c2', user: 'Vikram Mehta', text: 'What route did you run today?' }
        ]
      },
      {
        id: 'post-2',
        author: 'Karan Dave',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        timeAgo: '5 hours ago',
        content: 'Down 3 kg this month following the FitAI high-protein diet plan! Consistency is key 💪🥗',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80',
        likes: 42,
        isLiked: true,
        commentsCount: 9,
        comments: [
          { id: 'c3', user: 'Sneha Patel', text: 'Inspiring progress Karan!' }
        ]
      }
    ]
  },

  chatHistory: [
    {
      id: 'msg-1',
      sender: 'user',
      text: 'I want to lose 5 kg in 2 months. Can you suggest a plan?',
      timestamp: '9:41 AM'
    },
    {
      id: 'msg-2',
      sender: 'ai',
      text: `Sure! Here's a personalized plan for you:

1. **Daily calorie target**: 1600–1700 kcal
2. **Workout**: 30–45 min (cardio + strength)
3. **Diet**: High protein, low refined carbs

I've created a detailed 8-week plan for you. Select any of the cards below to view the full schedule.`,
      quickCards: [
        { title: 'Workout Plan', subtitle: '8-week customized plan', icon: 'dumbbell' },
        { title: 'Diet Plan', subtitle: 'Indian food suggestions', icon: 'utensils' },
        { title: 'Lifestyle Tips', subtitle: 'Sleep, stress & habits', icon: 'heart' }
      ],
      timestamp: '9:42 AM'
    }
  ]
};
