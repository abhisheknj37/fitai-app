import { initialData } from '../data/mockData.js';

let chatMessages = [...initialData.chatHistory];

export const getChatHistory = (req, res) => {
  res.status(200).json({
    success: true,
    messages: chatMessages
  });
};

export const sendMessage = async (req, res) => {
  const { question } = req.body;

  if (!question || !question.trim()) {
    return res.status(400).json({ success: false, message: 'Question cannot be empty' });
  }

  const userMsgId = `msg-${Date.now()}`;
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Store user message
  const userMsg = {
    id: userMsgId,
    sender: 'user',
    text: question.trim(),
    timestamp: timeStr
  };
  chatMessages.push(userMsg);

  // Generate intelligent contextual response
  const lowerQ = question.toLowerCase();
  let aiReplyText = '';
  let quickCards = [];

  if (lowerQ.includes('lose') || lowerQ.includes('weight') || lowerQ.includes('fat') || lowerQ.includes('5 kg')) {
    aiReplyText = `Sure! Here's a personalized plan for you:

1. **Daily calorie target**: 1600–1700 kcal (a moderate 400-500 kcal deficit)
2. **Workout**: 30–45 min (alternate cardio + progressive strength training 4x/week)
3. **Diet**: High protein (1.6g per kg target ~ 115g), low refined carbs, plenty of fiber

I've created a detailed 8-week plan for you tailored to your current 72 kg weight. Click any card below to jump right in!`;
    quickCards = [
      { title: 'Workout Plan', subtitle: '8-week customized plan', icon: 'dumbbell' },
      { title: 'Diet Plan', subtitle: 'Indian food suggestions', icon: 'utensils' },
      { title: 'Lifestyle Tips', subtitle: 'Sleep, stress & habits', icon: 'heart' }
    ];
  } else if (lowerQ.includes('workout') || lowerQ.includes('exercise') || lowerQ.includes('gym')) {
    aiReplyText = `Here is your optimal 4-day split for this week:

- **Day 1: Full Body Strength** (Squats, Push-ups, Rows - 35 mins)
- **Day 2: HIIT & Core** (Jumping jacks, Plank, Mountain climbers - 25 mins)
- **Day 3: Active Recovery** (Stretching & 30-min walk)
- **Day 4: Upper Body & Conditioning** (Push variations & Core stability)

Remember to warm up with 5 minutes of dynamic stretches before each session!`;
    quickCards = [
      { title: 'Start Week 1 Plan', subtitle: 'Beginner Full Body', icon: 'dumbbell' },
      { title: 'Exercise Library', subtitle: 'Form guides & video demos', icon: 'play' }
    ];
  } else if (lowerQ.includes('diet') || lowerQ.includes('food') || lowerQ.includes('meal') || lowerQ.includes('protein') || lowerQ.includes('nutrition')) {
    aiReplyText = `To hit your 1,850 kcal target with balanced macronutrients (45% Carbs, 25% Protein, 30% Healthy Fats):

- **Breakfast**: Rolled oats with almond milk, chia seeds, and banana (350 kcal)
- **Lunch**: Brown rice with yellow dal, paneer or boiled egg, and sautéed greens (650 kcal)
- **Evening Snack**: Roasted chickpeas / sprouts salad or whey protein shake (200 kcal)
- **Dinner**: Grilled chicken breast or tofu stir-fry with mixed vegetables (450 kcal)

Total: ~1,650 kcal, leaving you an easy 200 kcal buffer!`;
    quickCards = [
      { title: 'View Today Meals', subtitle: 'Breakfast, Lunch & Dinner', icon: 'utensils' },
      { title: 'Analyze Meal Photo', subtitle: 'AI image macronutrient scanner', icon: 'camera' }
    ];
  } else if (lowerQ.includes('water') || lowerQ.includes('hydrate')) {
    aiReplyText = `Hydration is key for metabolism and muscle recovery!
Your target is **2.5 Liters per day**. You are currently at **1.8 Liters (72%)**.

💡 *Pro Tip: Drink 1 full glass (250ml) before each meal and keep a reusable bottle on your desk.*`;
    quickCards = [
      { title: 'Log 250ml Water', subtitle: 'Add to today tally', icon: 'droplet' }
    ];
  } else {
    aiReplyText = `Thank you for asking! As your FitAI Coach, I recommend focusing on three core pillars:
1. **Consistency**: 30 minutes of moderate activity daily makes an 80% difference.
2. **Whole Foods**: Prioritize lean protein, high-fiber greens, and complex carbohydrates.
3. **Rest & Recovery**: Aim for 7-8 hours of restful sleep every night to facilitate hormonal balance and fat loss.

How can I help you customize your plan today?`;
    quickCards = [
      { title: 'Workout Plan', subtitle: 'Explore workouts', icon: 'dumbbell' },
      { title: 'Diet Plan', subtitle: 'Healthy meal suggestions', icon: 'utensils' },
      { title: 'Health Report', subtitle: 'View score & insights', icon: 'activity' }
    ];
  }

  const aiMsg = {
    id: `msg-${Date.now() + 1}`,
    sender: 'ai',
    text: aiReplyText,
    quickCards,
    timestamp: timeStr
  };
  chatMessages.push(aiMsg);

  res.status(200).json({
    success: true,
    reply: aiMsg,
    messages: chatMessages
  });
};

export const clearChat = (req, res) => {
  chatMessages = [...initialData.chatHistory];
  res.status(200).json({
    success: true,
    message: 'Chat history cleared to default!',
    messages: chatMessages
  });
};
