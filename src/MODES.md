# Speallu - Wireframe & Prototype Modes

## Overview
The Speallu app now supports two distinct viewing modes that can be toggled seamlessly:

### 🎨 Wireframe Mode
- **Purpose**: Shows the original wireframe design with placeholder elements
- **Visual Style**: Clean borders, simple layouts, placeholder text
- **Components Location**: `/components/wireframe/`
- **Use Case**: Understanding structure, layout, and information architecture

### ✨ Prototype Mode (Interactive)
- **Purpose**: Fully functional, production-ready UI with real interactions
- **Visual Style**: Modern gradients, shadows, animations, and polished design
- **Components Location**: `/components/` (root level)
- **Use Case**: Testing user flows, demonstrating functionality, stakeholder presentations

## Features Available in Both Modes

### All Screens
- Login Screen
- Home Screen
- Lessons Screen
- Games/Quiz Screen
- Progress Screen
- Settings Screen

### Navigation
- Bottom tab navigation (when logged in)
- Screen transitions
- User authentication flow

### Additional Views
- User Journeys Visualization
- User Flow Diagram
- User Personas

## Toggle Between Modes

Click the **"View Prototype"** or **"View Wireframe"** button in the top-right corner to switch between modes instantly. The toggle button changes appearance based on the current mode:

- **In Wireframe Mode**: Purple button showing "View Prototype" with sparkles icon
- **In Prototype Mode**: White button showing "View Wireframe" with phone icon

## Prototype-Specific Features

The interactive prototype includes:

### Home Screen
- Live streak tracking with visual fire icons
- Animated progress bars
- Personalized user greeting
- Interactive quick action cards

### Lessons Screen
- Searchable lesson library
- Category filters
- Lesson status indicators (completed/current/locked)
- Progress tracking per lesson
- Unlock milestones

### Games/Quiz Screen
- 5 real Northern Sami language questions
- Multiple choice interaction
- Instant feedback (correct/incorrect)
- Score tracking
- Progress through questions
- Audio playback simulation

### Progress Screen
- Interactive charts (Recharts library)
- Weekly activity bar chart
- Monthly progress line chart
- Achievement system with unlock states
- Real-time goal tracking
- Statistics cards

### Settings Screen
- Functional toggle switches
- Interactive preference controls
- Profile management
- Notification settings
- Theme preferences

## File Structure

```
components/
├── wireframe/           # Wireframe versions
│   ├── LoginScreen.tsx
│   ├── HomeScreen.tsx
│   ├── LessonsScreen.tsx
│   ├── GamesScreen.tsx
│   ├── ProgressScreen.tsx
│   └── SettingsScreen.tsx
├── LoginScreen.tsx      # Prototype versions
├── HomeScreen.tsx
├── LessonsScreen.tsx
├── GamesScreen.tsx
├── ProgressScreen.tsx
├── SettingsScreen.tsx
└── ...
```

## Technology Stack

### Wireframe Mode
- React + TypeScript
- Tailwind CSS (borders, basic layouts)
- Lucide icons

### Prototype Mode
- React + TypeScript
- Tailwind CSS (gradients, shadows, animations)
- Lucide icons
- Recharts (for data visualization)
- Motion effects
- State management (useState hooks)

## Development Notes

- Both modes share the same app structure and navigation logic
- State is preserved when switching between modes
- The same FeedbackDialog component is used in both modes
- User journey, flow, and persona visualizations are independent of mode selection
