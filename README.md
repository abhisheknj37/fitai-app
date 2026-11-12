# FitAI - Personal AI Health & Fitness Platform

**Live Demo:** [https://fitai-platform.onrender.com](https://fitai-platform.onrender.com)  
**Hosting:** Render (Node.js web service, Singapore region)

A complete, full-stack AI health and fitness web application replicating the exact 12-screen design system: Landing Page, Dashboard, AI Assistant, Profile, Workouts, Nutrition, Tracking, Health Reports, Emergency SOS, Community, Settings, and Mobile Preview.

---

## 🌟 Key Features & Modules

1. **Landing Page**: Modern hero section featuring the athletic trainer visual, 4 floating AI badges, CTAs (*Get Started* and *Watch Demo*), and feature discovery pills.
2. **Dashboard Overview**:
   - 4 KPI metric cards: **Current Weight (72 kg)**, **BMI Normal (22.8)**, **Steps Today (7,856 / 12,000)**, **Calories Burned (1,850)**.
   - Interactive **Weight Progress line chart** (Jan–Jun timeline with 70kg target line).
   - **Today's Goals** completion meters (Steps 65%, Water 72%, Calories 80%, Sleep 88%).
3. **AI Health Assistant**:
   - Conversational health coach answering fitness, workout, hydration, and nutritional questions.
   - Structured guidance cards for *Workout Plan*, *Diet Plan (Indian food suggestions)*, and *Lifestyle Tips*.
   - Text-to-Speech (audio read aloud) and custom prompt chips.
4. **My Profile**:
   - Editable health metrics: Age, Gender, Height, Weight, Activity Level, Fitness Goal.
   - Dynamic real-time **BMI gauge slider** and **Suggested Calorie Intake calculator** (1,850 kcal/day).
5. **Workout Plans**:
   - Week 1–4 progressive splits (Full Body, Strength, Cardio, Core & Flexibility).
   - Exercise cards (Jumping Jacks, Squats, Push-ups, Plank) with sets, reps, and tags.
   - Interactive **Exercise Video player & interval workout countdown timer** with completion confetti.
   - **AI Workout Generator** to generate new custom routines.
6. **Nutrition & Diet**:
   - Daily meal cards: Breakfast (*Oats with Fruits - 350 kcal*), Lunch (*Brown Rice + Dal + Veg - 650 kcal*), Dinner (*Grilled Chicken + Salad - 450 kcal*).
   - **Calorie Breakdown Donut Chart** (Carbs 45%, Protein 25%, Fats 30%).
   - **Food Image Analysis AI Scanner**: simulates computer vision analysis on uploaded meal photos.
7. **Activity Tracking**:
   - Water intake monitor (1.8 / 2.5 L - 72%) with animated level and `[-]` / `[+]` 250ml logging buttons.
   - Weekly progress bar chart (Mon–Sun).
   - Dedicated trackers for Steps, Sleep, Calories, and Weight.
8. **Health Reports**:
   - **Overall Health Score circular gauge (85 - Good)**.
   - Key Insights list with positive and warning indicators.
   - Export report summary action.
9. **Emergency Assistance (SOS)**:
   - Red **SOS Alert** button with 5-second countdown buzzer cancellation and simulated responder broadcast.
   - Direct emergency dialer for **108 Ambulance**.
   - Nearest hospitals directory with distance indicators and phone numbers.
   - Live GPS location beacon.
   - Emergency contacts manager.
10. **Community Hub**:
    - Social feed with activity posts (e.g. Priya S 5K run), like counters, comments, and post composer.
    - **Weekly Challenge** banner: 10,000 Steps Daily with live progress bar and *Join Challenge* action.
11. **Settings & Preferences**:
    - Account profile updates and custom photo avatar uploader.
    - Appearance: Light / Dark mode toggle.
    - Connected fitness devices sync (Apple Health, Google Fit, Fitbit, Garmin).
12. **Mobile App Showcase**:
    - Modal simulator displaying the exact 4 mobile phone mockups (Splash, Mobile Dashboard, Mobile AI Chat, and Mobile Nutrition).

---

## 🛠️ Architecture & Tech Stack

### Frontend (`/client`)
- **React 19** + **Vite**
- **Tailwind CSS** with custom Emerald brand theme (`#10B981`)
- **Lucide React** (feather icons)
- **Recharts** (SVG Line charts, Donut charts, Bar charts)
- **Canvas-Confetti** (celebration animations)

### Backend (`/server`)
- **Node.js** + **Express.js** (ES Modules)
- **Express Middlewares**:
  - `auth.middleware.js`: JWT token verification and user extraction
  - `logger.middleware.js`: Structured HTTP request logger with status colorization and latency measurement
  - `rateLimiter.middleware.js`: Express rate limiting against brute-force and DDoS
  - `validation.middleware.js`: Schema and health metric validation
  - `security.middleware.js`: Helmet headers (CSP, HSTS, frame protection) & CORS configuration
  - `errorHandler.middleware.js`: Centralized error catching with standardized JSON output
  - `upload.middleware.js`: Multer memory upload handling for avatar & food analysis

---

## 🚀 Quickstart (Local Development)

### 1. Install Dependencies
```bash
# From the project root
npm run install:all
```

### 2. Run in Development Mode
You can start both server and client concurrently:

**Terminal 1 (Backend API):**
```bash
cd server
npm run dev
# Server starts at http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
# Vite starts at http://localhost:5173
```

---

## 📦 Single-Process Production Build

The Express backend can automatically serve the built React frontend from `/client/dist`:

```bash
# 1. Build the frontend
npm run build:client

# 2. Start the unified production server
npm run start
```
Open **`http://localhost:5000`** in your browser to access the complete application!

---

## 🐳 Containerized Deployment (Docker)

### One-Click Docker Compose
```bash
docker-compose up --build -d
```
The application will be compiled in a multi-stage Docker build and served at **`http://localhost:5000`**.

### Manual Docker Build
```bash
docker build -t fitai-app .
docker run -p 5000:5000 fitai-app
```

---

## ☁️ Cloud Deployment Options

### Option A: Render.com (Recommended)
1. Push this repository to GitHub.
2. Go to **Render Dashboard** -> **New Blueprint Instance**.
3. Select this repo; Render will automatically detect `render.yaml` and deploy the service with automatic SSL and zero configuration.

### Option B: Railway.app / Heroku
1. Create a new service on Railway connected to your GitHub repo.
2. The included `Procfile` and root `package.json` will automatically install dependencies, build the client, and start the Express server.

### Option C: Vercel (Frontend) + Cloud API (Backend)
1. Deploy the `/client` directory to Vercel using the included `vercel.json`.
2. Deploy `/server` to any Node host (Render, Fly.io, Railway, DigitalOcean).
3. Set `VITE_API_URL` environment variable on Vercel pointing to your live backend domain.

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service healthcheck & uptime |
| `POST` | `/api/auth/login` | User login (generates JWT) |
| `GET` | `/api/dashboard` | Key stat cards & weight timeline |
| `POST` | `/api/dashboard/log-activity` | Log steps, water, sleep, calories |
| `POST` | `/api/ai/chat` | AI health assistant conversational engine |
| `GET` | `/api/workouts` | Workout routines & weekly splits |
| `POST` | `/api/workouts/generate` | AI custom workout routine generator |
| `GET` | `/api/nutrition` | Daily meals & macro distribution |
| `POST` | `/api/nutrition/analyze-image`| AI meal photo scanner |
| `POST` | `/api/tracking/water` | Water logger (+/- 250ml) |
| `GET` | `/api/reports` | Health score (85) & key insights |
| `POST` | `/api/emergency/sos` | Trigger emergency SOS broadcast |
| `GET` | `/api/community/feed` | Community social posts & challenge |
