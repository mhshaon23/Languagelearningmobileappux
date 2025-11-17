# Speallu - Wireframe Documentation

## Overview
This is a comprehensive mobile-first wireframe for Speallu, a language learning application built with React and Tailwind CSS. The wireframe includes interactive screens, user journey documentation, flow diagrams, and detailed user personas.

## Application Screens

### 1. Login Screen
**Purpose:** Entry point for user authentication

**Features:**
- Facebook login integration
- Gmail login integration
- Clean, minimal design
- Social authentication options

**Navigation:** Once authenticated → Home Screen

---

### 2. Home Screen
**Purpose:** Mission control for daily learning activities

**Features:**
- **Dynamic Milestone System:** Personalized achievement prompts based on user progress (see Dynamic Milestone System section below)
- **Daily Streak Calendar:** Visual representation of consecutive learning days with 7-day grid (M-S)
- **Daily Goals Widget:** Progress bar showing lessons completed (e.g., 3/5 lessons)
- **Continue Learning Card:** Smart resume feature that shows:
  - **For New Users:** First recommended lesson to start
  - **For Active Learners:** Last incomplete lesson
  - **For Returning Users:** Next lesson in learning path
  - **Card Contents:**
    - Large lesson icon (category visual)
    - Lesson title (e.g., "Greetings & Introductions")
    - Brief description
    - Level badge (Beginner/Intermediate/Advanced)
    - Progress indicator (e.g., "3/10 completed")
  - **Action:** One-tap to jump directly to Games Screen with lesson loaded
  - **Benefit:** Eliminates navigation friction - fastest path to learning
- **Quick Action Buttons:**
  - **Badges:** Quick access to view achievements and earned badges
  - **Schedule:** View or set learning schedule and reminders
- **Personalized Greeting:** "Welcome back!" message with user name and avatar

**Navigation:** Accessible via bottom navigation

**Continue Learning Intelligence:**
- **New Users:** Shows first lesson ("Start Your First Lesson")
- **In-Progress:** Shows incomplete lesson with progress (e.g., "5/10 completed")
- **Completed:** Shows next recommended lesson in learning path
- **Benefit:** Removes decision paralysis and navigation steps

---

### 3. Lessons Screen
**Purpose:** Browse and discover learning content

**Features:**
- **Search Bar:** Find specific lessons or topics
- **Category Filters:** All, Basics, Grammar, Vocabulary
- **Learning Path Visualization:**
  - Completed lessons (green checkmark)
  - Current lesson (blue border with progress indicator)
  - Locked lessons (gray lock icon)
- **Progress Bars:** Visual indication of lesson completion
- **Sequential Unlocking:** Lessons unlock as previous ones are completed

**Navigation:** Accessible via bottom navigation; tap lesson → Games Screen

---

### 4. Games Screen
**Purpose:** Interactive learning through gamified quizzes

**Features:**
- **Progress Bar:** Shows current question position (e.g., 4/10)
- **Question Display:** Clear presentation of learning content
- **Multiple Choice Answers:** 4 options with visual selection feedback
- **Interactive Controls:**
  - Speaker icon for audio pronunciation
  - Microphone for voice input
  - Check button to validate answers
- **Real-time Feedback:** Immediate validation of answers
- **Completion Tracking:** Updates daily goals and lesson progress

**Special Behavior:** After every 5 completed lessons, triggers feedback prompt

**Navigation:** Accessible via bottom navigation or from Lessons Screen

---

### 5. Progress Screen
**Purpose:** Track learning statistics and achievements

**Features:**
- **Statistics Overview:**
  - Total study days
  - Lessons completed
  - Total points earned
- **Activity Charts:** Weekly/Monthly bar charts showing daily activity
- **Achievement System:**
  - Earned badges (gold/color)
  - Locked achievements (grayscale)
  - Visual grid display
- **Goal Tracking:** Current progress toward milestones
- **Performance Analytics:** Historical data visualization

**Navigation:** Accessible via bottom navigation

---

### 6. Settings Screen
**Purpose:** Configure app preferences and manage account

**Features:**
- **Profile Section:** 
  - User name and email display
  - Edit profile information
- **Learning Preferences:**
  - Learning Language selection (e.g., Spanish)
  - Daily Goal adjustment (e.g., 20 min)
- **Notifications:** 
  - Daily Reminder toggle switch
  - Streak Alerts toggle switch
- **Send Feedback (Highlighted):** 
  - Gradient blue-to-purple background
  - Direct access to feedback dialog
  - Prominent call-to-action
- **Support & Info:**
  - Help Center access
  - About section with app version (v1.0.0)

**Navigation:** Accessible via bottom navigation

---

## Interactive Features

### Dynamic Milestone System
A personalized achievement system that adapts to each user's learning journey and progress.

#### **Implementation Location**
- **Prototype:** `/components/HomeScreen.tsx`
- **Wireframe:** `/components/wireframe/HomeScreen.tsx`

#### **How It Works**
The milestone system uses priority-based logic to determine which message is most relevant to the user at any given time. It analyzes user state data including:
- Current and best streak counts
- Lessons completed today vs. daily goal
- Total lessons completed
- Current unit progress
- Vocabulary words learned
- Days since last activity
- Current CEFR level

#### **Milestone Priority System**
The system shows milestones in this priority order:

**Priority 1: First-Time User**
- **Trigger:** User has completed 0 lessons
- **Message:** "Start your first lesson!"
- **Purpose:** Onboarding and encouraging first action

**Priority 2: Return After Break**
- **Trigger:** 4+ days since last activity
- **Message:** "Welcome back!"
- **Purpose:** Re-engagement for inactive users

**Priority 3: Streak Milestone Approaching**
- **Trigger:** One day away from milestone (7, 14, 30, 50, or 100 days)
- **Message:** "Reach an 8-day streak today!" (example)
- **Purpose:** Motivate daily consistency

**Priority 4: Daily Goal Not Met**
- **Trigger:** Lessons completed today < daily goal
- **Message:** "Complete 2 more lessons today!" (example)
- **Purpose:** Keep users on track with their goals

**Priority 5: Unit Completion Close**
- **Trigger:** 1-2 lessons remaining in current unit
- **Message:** "Finish Unit 2 today!" (example)
- **Purpose:** Encourage completion of learning units

**Priority 6: Vocabulary Milestones**
- **Trigger:** Within 5 words of milestone (50, 100, 250, 500, 1000 words)
- **Message:** "Learn 3 more words!" (example)
- **Purpose:** Celebrate vocabulary growth

**Priority 7: Perfect Week Possible**
- **Trigger:** 6 days completed in current week
- **Message:** "Complete a perfect week!"
- **Purpose:** Encourage weekly consistency

**Priority 8: Level Up Approaching**
- **Trigger:** Near completion of current CEFR level
- **Message:** "Reach A1.2 soon!"
- **Purpose:** Celebrate progression through proficiency levels

**Default: Daily Motivation**
- **Trigger:** When no specific milestone is active
- **Messages:** Rotates between motivational phrases
  - "Keep learning today!"
  - "Challenge yourself today!"
  - "Grow your skills today!"
- **Purpose:** General encouragement

#### **User State Interface**
```typescript
interface UserState {
  currentStreak: number;
  bestStreak: number;
  lessonsCompletedToday: number;
  totalLessonsCompleted: number;
  dailyGoal: number;
  currentUnit: number;
  lessonsInCurrentUnit: number;
  totalLessonsInUnit: number;
  wordsLearned: number;
  daysSinceLastActivity: number;
  currentLevel: string; // CEFR level (e.g., "A1.1", "A1.2")
}
```

#### **Milestone Output**
Each milestone returns:
- **Emoji:** Visual icon (e.g., 🎉, 🔥, 🎯, 🏆, 📚, ✨, ⬆️, 🌟, 👋, 💪, 🌱)
- **Title:** Action-oriented main message
- **Subtitle:** Supporting context or encouragement

#### **Benefits**
- **Personalized:** Each user sees relevant milestones for their journey
- **Motivational:** Uses action verbs to encourage specific behaviors
- **Dynamic:** Changes based on real-time user progress
- **Varied:** Rotates messages to avoid repetition
- **Goal-Oriented:** Focuses on achievable next steps

#### **Future Enhancements**
- Connect to real user data from backend/state management
- Add A/B testing for different message variations
- Track which milestones drive most engagement
- Add seasonal/holiday-themed milestones
- Include social milestones (e.g., "Catch up with your friends!")
- Add game-specific achievements (e.g., "Play your first game!")

---

### Feedback System
A comprehensive dual-trigger feedback system designed to capture user sentiment and improve the app experience.

#### **FeedbackDialog Component**
Modal interface with two contexts:
1. **Post-Lesson Context** - "How was this lesson?"
2. **Settings Context** - "Send Feedback"

#### **Trigger Points**

**1. Automatic Post-Lesson Prompt**
- Triggers every 5 completed lessons
- Non-intrusive timing (after success moment)
- Quick emotional feedback focus
- Maintains learning momentum
- Title: "How was this lesson?"

**2. Manual Settings Access**
- Highlighted button in Settings screen
- Always available on-demand
- Gradient visual treatment for visibility
- Comprehensive feedback options
- Title: "Send Feedback"

#### **Feedback Components**

**Emoji Rating System (Required)**
Five emotional states:
- 😞 Terrible
- 😕 Poor
- 😐 Okay
- 🙂 Good
- 😍 Amazing

**Category Selection (Settings Context Only)**
Three feedback types:
- Bug Report
- Feature Request
- General Feedback

**Text Input (Optional)**
- Placeholder: "Share your thoughts..."
- 24-line textarea
- Completely optional
- Captures detailed feedback

**Action Buttons**
- **Skip:** Dismiss without submitting
- **Submit:** Send feedback (requires emoji selection)
- Visual disabled state when no rating selected

#### **Success Flow**
1. User submits feedback
2. Show celebration animation (🎉)
3. Display "Thank you!" message
4. Note: "Your feedback helps us improve."
5. Auto-close after 2 seconds
6. Return to previous screen

#### **Data Captured**
- Emoji rating value
- Feedback category (if from Settings)
- Optional text comments
- Context (post-lesson or settings)
- Timestamp (implicit)

#### **User Experience Principles**
- Never interrupt active learning
- Make skipping easy and guilt-free
- Celebrate every submission
- Quick interaction (< 30 seconds)
- Optional depth for motivated users

---

## Navigation Structure

### Bottom Navigation Bar
Always visible when logged in, providing instant access to:
- **Home** (Blue house icon)
- **Lessons** (Purple book icon)
- **Practice** (Green lightning icon)
- **Progress** (Orange bar chart icon)
- **Settings** (Gray gear icon)

### Primary User Flows
```
Login → Home → Lessons → Practice → Progress → Settings
  ↓       ↓        ↓         ↓          ↓          ↓
[Auth] [Start] [Browse]  [Learn]   [Track]  [Configure]
```

---

## Documentation Files

### `/USER_JOURNEYS.md`
Detailed documentation of 8 key user journeys:
1. **New User - First Learning Session**
2. **Daily Learner - Maintaining Streak**
3. **Achievement Hunter**
4. **Struggling Learner - Review & Practice**
5. **Explorer - Discovering Content**
6. **Progress Tracker**
7. **Settings Manager** (includes Send Feedback flow)
8. **Post-Lesson Feedback Provider** (automatic prompt)

Each journey includes:
- User goals
- Step-by-step flow
- Key screens involved
- Success metrics

### Interactive Visualizations

#### **User Journey Visualization** (`/components/JourneyVisualization.tsx`)
- Interactive selection of 8 user journeys
- Step-by-step journey flow with screen badges
- Screen flow diagrams
- Success metrics for each journey
- Journey statistics (steps, screens, navigation hops)
- Color-coded screen reference guide
- Includes both feedback journeys (manual and auto-triggered)

#### **User Flow Diagram** (`/components/UserFlowDiagram.tsx`)
- Complete navigation path visualization
- Screen color coding legend
- Interaction details for each screen
- Bottom navigation explanation
- Feedback system flow (dual triggers)
- Logout flow
- Key user interactions reference

#### **User Personas** (`/components/UserPersonas.tsx`)
Six detailed user personas:
1. **Sarah Chen** - The Beginner
2. **Marcus Johnson** - The Streak Keeper
3. **Emma Rodriguez** - The Achievement Hunter
4. **David Park** - The Struggling Learner
5. **Aisha Patel** - The Explorer
6. **Robert Kim** - The Progress Tracker

Each persona includes:
- Demographics (age, location, education, tech savvy)
- Goals and motivations
- Frustrations and pain points
- Personality traits and archetype
- Usage patterns and behaviors
- Most used screens
- Typical user journey
- Feedback behavior (where applicable)

---

## Screen Color Coding

Consistent color system used across all documentation:

| Screen | Color | Usage |
|--------|-------|-------|
| **Login** | Indigo | Authentication entry point |
| **Home** | Blue | Daily hub and starting point |
| **Lessons** | Purple | Content browsing and discovery |
| **Practice** | Green | Active learning and quizzes |
| **Progress** | Orange | Analytics and achievements |
| **Settings** | Gray | Configuration and preferences |

---

## Key Design Principles

### Mobile-First Approach
- Optimized for 375x812px viewport (iPhone X/11/12)
- Touch-friendly interface elements
- Clear visual hierarchy
- Minimal text, maximum clarity

### Gamification Elements
- Daily streak tracking
- Achievement badges
- Progress bars and visual feedback
- Point system
- Milestone celebrations

### Learning Psychology
- Sequential lesson unlocking (scaffolded learning)
- Immediate feedback on practice questions
- Visual progress indicators (motivation)
- Multiple learning modes (flexibility)
- Review and practice options (reinforcement)

### User Engagement
- Daily goal system (habit formation)
- Streak mechanics (retention)
- Achievement system (long-term engagement)
- Quick actions (reduced friction)
- Continue learning feature (easy re-entry)

---

## Component Architecture

### Main Components
- **App.tsx** - Main application container with view switching and feedback orchestration
- **LoginScreen.tsx** - Authentication interface
- **HomeScreen.tsx** - Daily dashboard
- **LessonsScreen.tsx** - Content browser
- **PracticeScreen.tsx** - Interactive quiz interface with lesson completion tracking
- **ProgressScreen.tsx** - Analytics dashboard
- **SettingsScreen.tsx** - Configuration panel with Send Feedback CTA
- **FeedbackDialog.tsx** - Reusable user feedback modal (dual context)

### Documentation Components
- **JourneyVisualization.tsx** - Interactive journey explorer
- **UserFlowDiagram.tsx** - Navigation flow diagram
- **UserPersonas.tsx** - Detailed persona profiles

---

## View Modes

The wireframe includes multiple view modes accessible via top navigation:

1. **Wireframe View** - Interactive mobile wireframe (default)
2. **User Journeys View** - Journey visualization and exploration
3. **User Flow View** - Complete navigation diagram
4. **Personas View** - Detailed user persona profiles

---

## Success Metrics

### Engagement Metrics
- Daily Active Users (DAU)
- Streak retention rate
- Lessons per session
- Session frequency
- Time to first lesson completion

### Learning Metrics
- Lesson completion rate
- Practice mode usage
- Performance improvement over time
- Category completion rate

### Feature Metrics
- Achievement unlock rate
- Progress tab engagement
- Settings engagement rate
- **Feedback submission rate** (post-lesson vs. settings)
- **Feedback skip rate** (conversion optimization)
- **Feedback quality** (text provided percentage)
- **Category distribution** (bugs vs. features vs. general)
- **Sentiment trends** (emoji rating averages)
- Search and filter usage

---

## Future Enhancements

### Suggested Features
- Social learning (compete with friends, share progress)
- Custom study plans and goal setting
- Spaced repetition reminders
- Offline lesson downloads
- Community challenges and leaderboards
- Certificate achievements
- Lesson bookmarking
- Premium subscription features

### Additional User Journeys
- Social Learner
- Customizer (advanced settings)
- Offline Learner
- Subscription Journey
- Onboarding Journey

---

## Technical Stack

- **Framework:** React
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **UI Components:** Shadcn/ui
- **Charts:** Recharts (for Progress screen visualizations)

---

## Getting Started

1. View the interactive wireframe in the default mode
2. Click through the bottom navigation to explore all screens
3. Switch to "User Journeys" to see how different users interact with the app
4. Review "User Flow" for complete navigation patterns
5. Explore "Personas" to understand target users in depth

---

## Notes

- The wireframe is fully interactive and demonstrates real user flows
- No backend integration - all data is mock/demonstration
- Feedback system is implemented but submissions are logged to console
- Design follows mobile-first principles with clean, minimal aesthetics
- Color coding is consistent across all documentation for easy reference

---

## Contact & Feedback

This wireframe serves as a comprehensive design document for stakeholders, developers, and designers. Use the interactive views to understand user needs, navigation patterns, and feature requirements.
