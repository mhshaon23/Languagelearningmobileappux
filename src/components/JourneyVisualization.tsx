import { useState } from 'react';
import { ArrowRight, Target, TrendingUp, Users, Search, Award, BarChart3, Settings, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const journeys = [
  {
    id: 1,
    title: 'New User - First Learning Session',
    icon: Users,
    color: 'bg-blue-500',
    goal: 'Complete their first lesson and establish a learning routine',
    steps: [
      { screen: 'Home', action: 'Launch App', detail: 'Lands on Home Screen' },
      { screen: 'Home', action: 'View Welcome Message', detail: 'Sees personalized greeting and empty streak calendar' },
      { screen: 'Home', action: 'See Daily Goal', detail: 'Notices progress bar at 0/5 lessons' },
      { screen: 'Lessons', action: 'Tap "Continue Learning"', detail: 'Navigates to first recommended lesson' },
      { screen: 'Lessons', action: 'Switch to Lessons Tab', detail: 'Views lesson path with first lesson unlocked' },
      { screen: 'Lessons', action: 'Select First Lesson', detail: 'Opens lesson (blue border indicates current)' },
      { screen: 'Practice', action: 'Auto-navigate to Practice', detail: 'Begins interactive quiz' },
      { screen: 'Practice', action: 'Complete Questions', detail: 'Answers 10 questions (progress bar fills)' },
      { screen: 'Home', action: 'Return to Home', detail: 'Sees updated daily goal (1/5 lessons complete)' },
      { screen: 'Home', action: 'View Streak Update', detail: 'First day marked on streak calendar' },
    ],
    flow: ['Home', 'Lessons', 'Practice', 'Home'],
    metrics: ['Lesson completion rate', 'Time to first lesson completion', 'Return to app within 24 hours'],
  },
  {
    id: 2,
    title: 'Daily Learner - Maintaining Streak',
    icon: TrendingUp,
    color: 'bg-green-500',
    goal: 'Maintain their learning streak by completing daily goal',
    steps: [
      { screen: 'Home', action: 'Open App (Day 7)', detail: 'Home Screen shows 6-day streak' },
      { screen: 'Home', action: 'Check Streak Calendar', detail: 'Sees 6 consecutive days filled' },
      { screen: 'Home', action: 'Review Daily Goal', detail: 'Currently at 2/5 lessons (40% complete)' },
      { screen: 'Practice', action: 'Tap Continue Learning', detail: 'Resumes in-progress lesson' },
      { screen: 'Practice', action: 'Complete 3 More Lessons', detail: 'Uses Practice Screen for each' },
      { screen: 'Progress', action: 'Check Progress Tab', detail: 'Views daily goal completion (5/5)' },
      { screen: 'Home', action: 'See Streak Updated', detail: '7-day streak unlocked with visual celebration' },
      { screen: 'Progress', action: 'View Weekly Chart', detail: 'Progress tab shows consistent daily activity' },
      { screen: 'Progress', action: 'Check New Achievement', detail: 'Unlocked "Week Warrior" badge' },
    ],
    flow: ['Home', 'Practice', 'Practice', 'Practice', 'Progress', 'Home'],
    metrics: ['Streak retention rate', 'Daily active users (DAU)', 'Lessons per session', 'Achievement unlock rate'],
  },
  {
    id: 3,
    title: 'Achievement Hunter',
    icon: Award,
    color: 'bg-yellow-500',
    goal: 'Unlock achievements and badges',
    steps: [
      { screen: 'Progress', action: 'Navigate to Progress Tab', detail: 'Views current stats and achievements' },
      { screen: 'Progress', action: 'See Locked Achievements', detail: '3 earned (gold), 3 locked (gray)' },
      { screen: 'Home', action: 'Tap Quick Action', detail: 'From Home Screen' },
      { screen: 'Home', action: 'Review Requirements', detail: 'Understands what\'s needed' },
      { screen: 'Lessons', action: 'Navigate to Lessons', detail: 'Selects specific lesson category' },
      { screen: 'Lessons', action: 'Filter by Category', detail: 'Uses category chips (Basics, Grammar, Vocabulary)' },
      { screen: 'Practice', action: 'Complete Category Lessons', detail: 'Focuses on "Basics" category' },
      { screen: 'Progress', action: 'Return to Progress', detail: 'Sees new achievement unlocked' },
      { screen: 'Progress', action: 'Share Achievement', detail: 'Future: social sharing feature' },
    ],
    flow: ['Progress', 'Home', 'Lessons', 'Practice', 'Progress'],
    metrics: ['Achievement completion rate', 'Category completion rate', 'User engagement time'],
  },
  {
    id: 4,
    title: 'Struggling Learner - Review & Practice',
    icon: Target,
    color: 'bg-purple-500',
    goal: 'Review difficult content and improve weak areas',
    steps: [
      { screen: 'Home', action: 'Open App', detail: 'Home Screen shows stalled progress' },
      { screen: 'Home', action: 'Notice Progress Bar', detail: 'Stuck at 60% on current lesson' },
      { screen: 'Lessons', action: 'Navigate to Lessons', detail: 'Views lesson path' },
      { screen: 'Lessons', action: 'See Current Lesson', detail: 'Blue border, partial progress bar (66%)' },
      { screen: 'Lessons', action: 'Review Completed Lessons', detail: 'Taps green checkmark lesson' },
      { screen: 'Lessons', action: 'Access Lesson Details', detail: 'Reviews what was learned' },
      { screen: 'Practice', action: 'Use Quick Action', detail: 'Taps "Practice" from Home' },
      { screen: 'Practice', action: 'Enter Practice Mode', detail: 'Random review questions from all lessons' },
      { screen: 'Practice', action: 'Use Audio Support', detail: 'Taps speaker icon for pronunciation' },
      { screen: 'Practice', action: 'Use Voice Input', detail: 'Taps microphone for speaking practice' },
      { screen: 'Practice', action: 'Complete Practice Session', detail: 'Returns to Home' },
      { screen: 'Progress', action: 'See Updated Stats', detail: 'Progress tab shows improved performance' },
    ],
    flow: ['Home', 'Lessons', 'Practice', 'Progress'],
    metrics: ['Lesson retry rate', 'Practice mode usage', 'Audio feature engagement', 'Performance improvement over time'],
  },
  {
    id: 5,
    title: 'Explorer - Discovering Content',
    icon: Search,
    color: 'bg-pink-500',
    goal: 'Browse and explore available lessons and content',
    steps: [
      { screen: 'Lessons', action: 'Navigate to Lessons Tab', detail: 'Views full lesson path' },
      { screen: 'Lessons', action: 'Use Search Bar', detail: 'Searches for specific topic' },
      { screen: 'Lessons', action: 'Filter by Category', detail: 'Taps category chips to filter' },
      { screen: 'Lessons', action: 'Switch Categories', detail: 'Cycles through All, Basics, Grammar, Vocabulary' },
      { screen: 'Lessons', action: 'Review Lesson Progression', detail: 'Sees locked lessons below current' },
      { screen: 'Lessons', action: 'Understand Unlock Requirements', detail: 'Learns lessons unlock sequentially' },
      { screen: 'Lessons', action: 'Check Lesson Details', detail: 'Views lesson name, level, and progress' },
      { screen: 'Lessons', action: 'Plan Learning Path', detail: 'Identifies next 3-4 lessons to complete' },
      { screen: 'Home', action: 'Return to Home', detail: 'Prepares to continue structured learning' },
    ],
    flow: ['Lessons', 'Lessons', 'Lessons', 'Home'],
    metrics: ['Search usage', 'Category filter engagement', 'Lesson preview interactions', 'User retention after browsing'],
  },
  {
    id: 6,
    title: 'Progress Tracker',
    icon: BarChart3,
    color: 'bg-orange-500',
    goal: 'Monitor learning statistics and track improvement',
    steps: [
      { screen: 'Progress', action: 'Navigate to Progress Tab', detail: 'Main analytics view' },
      { screen: 'Progress', action: 'Review Stats Grid', detail: 'Sees 3 key metrics (days, lessons, points)' },
      { screen: 'Progress', action: 'Analyze Weekly Chart', detail: 'Views bar chart of daily activity' },
      { screen: 'Progress', action: 'Switch Time Period', detail: 'Changes from "Week" to "Month" view' },
      { screen: 'Progress', action: 'Review Achievements', detail: 'Scrolls to achievement grid' },
      { screen: 'Progress', action: 'Check Goal Progress', detail: 'Views current goal status (80% complete)' },
      { screen: 'Progress', action: 'Compare to Past Performance', detail: 'Identifies trends and patterns' },
      { screen: 'Home', action: 'Navigate to Home', detail: 'Motivated to continue learning' },
      { screen: 'Home', action: 'Set New Personal Goal', detail: 'Future: custom goal setting' },
    ],
    flow: ['Progress', 'Progress', 'Progress', 'Home'],
    metrics: ['Progress tab engagement', 'Chart interaction rate', 'Goal completion rate', 'Session frequency'],
  },
  {
    id: 7,
    title: 'Settings Manager',
    icon: Settings,
    color: 'bg-gray-500',
    goal: 'Configure app preferences and manage account',
    steps: [
      { screen: 'Settings', action: 'Navigate to Settings Tab', detail: 'Main settings view' },
      { screen: 'Settings', action: 'Review Account Section', detail: 'Personal information and profile' },
      { screen: 'Settings', action: 'Check Notifications', detail: 'Review notification preferences' },
      { screen: 'Settings', action: 'Toggle Settings', detail: 'Enable/disable push notifications' },
      { screen: 'Settings', action: 'Review Language Options', detail: 'Check interface language settings' },
      { screen: 'Settings', action: 'Tap Send Feedback Button', detail: 'Opens feedback dialog' },
      { screen: 'Settings', action: 'Select Emoji Rating', detail: 'Choose feeling (Terrible to Amazing)' },
      { screen: 'Settings', action: 'Select Feedback Category', detail: 'Bug Report, Feature Request, or General' },
      { screen: 'Settings', action: 'Write Optional Comments', detail: 'Share detailed thoughts' },
      { screen: 'Settings', action: 'Submit Feedback', detail: 'See confirmation message' },
      { screen: 'Settings', action: 'Access Help & Support', detail: 'Browse help resources' },
      { screen: 'Settings', action: 'Check About Section', detail: 'View app version and information' },
      { screen: 'Home', action: 'Return to Home', detail: 'Continue learning with updated preferences' },
    ],
    flow: ['Settings', 'Settings', 'Settings', 'Settings', 'Home'],
    metrics: ['Settings engagement rate', 'Notification opt-in rate', 'Feedback submission rate', 'Feedback quality (text provided)', 'Help resource access', 'User preference customization'],
  },
  {
    id: 8,
    title: 'Post-Lesson Feedback Provider',
    icon: MessageCircle,
    color: 'bg-teal-500',
    goal: 'Provide feedback after completing multiple lessons',
    steps: [
      { screen: 'Practice', action: 'Complete Practice Lesson', detail: 'Finish lesson quiz' },
      { screen: 'Practice', action: 'See Completion Animation', detail: 'Visual success feedback' },
      { screen: 'Practice', action: 'Automatic Feedback Prompt', detail: 'Triggered every 5 lessons' },
      { screen: 'Practice', action: 'View "How was this lesson?" Dialog', detail: 'Focused on lesson experience' },
      { screen: 'Practice', action: 'Select Emoji Rating', detail: 'Quick emotional response' },
      { screen: 'Practice', action: 'Write Optional Comments', detail: 'Share specific lesson feedback' },
      { screen: 'Practice', action: 'Submit or Skip', detail: 'Choose to provide or dismiss feedback' },
      { screen: 'Practice', action: 'Return to Practice', detail: 'Continue learning flow' },
      { screen: 'Practice', action: 'Complete Next Lesson', detail: 'Maintain momentum' },
    ],
    flow: ['Practice', 'Practice', 'Practice', 'Practice'],
    metrics: ['Feedback response rate (vs. skip rate)', 'Average ratings per lesson type', 'Feedback frequency', 'User engagement after feedback prompt', 'Lesson completion momentum maintained'],
  },
];

const screenColors: Record<string, string> = {
  Home: 'bg-blue-100 text-blue-700 border-blue-300',
  Lessons: 'bg-purple-100 text-purple-700 border-purple-300',
  Practice: 'bg-green-100 text-green-700 border-green-300',
  Progress: 'bg-orange-100 text-orange-700 border-orange-300',
  Settings: 'bg-gray-100 text-gray-700 border-gray-300',
};

export function JourneyVisualization() {
  const [selectedJourney, setSelectedJourney] = useState(0);
  const journey = journeys[selectedJourney];
  const Icon = journey.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-gray-900">Speallu - User Journey Visualization</h1>
          <p className="text-gray-600">Interactive visualization of 8 key user journeys through the mobile app wireframe</p>
        </div>

        {/* Journey Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Select Journey</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedJourney((prev) => (prev > 0 ? prev - 1 : journeys.length - 1))}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setSelectedJourney((prev) => (prev < journeys.length - 1 ? prev + 1 : 0))}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {journeys.map((j, idx) => {
              const JIcon = j.icon;
              return (
                <button
                  key={j.id}
                  onClick={() => setSelectedJourney(idx)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedJourney === idx
                      ? 'border-gray-900 bg-gray-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${j.color} text-white flex-shrink-0`}>
                      <JIcon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 truncate">{j.title}</h3>
                      <p className="text-xs text-gray-600 line-clamp-2">{j.goal}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Journey Details */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Journey Flow */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${journey.color} text-white`}>
                    <Icon size={28} />
                  </div>
                  <div className="flex-1">
                    <CardTitle>{journey.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Target size={16} />
                      {journey.goal}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {journey.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs flex-shrink-0">
                          {idx + 1}
                        </div>
                        {idx < journey.steps.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-300 my-1"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className={screenColors[step.screen]}>
                            {step.screen}
                          </Badge>
                          <span className="text-gray-900">{step.action}</span>
                        </div>
                        <p className="text-sm text-gray-600">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Screen Flow */}
            <Card>
              <CardHeader>
                <CardTitle>Screen Flow</CardTitle>
                <CardDescription>Navigation path through the app</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-2">
                  {journey.flow.map((screen, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Badge className={screenColors[screen]}>{screen}</Badge>
                      {idx < journey.flow.length - 1 && (
                        <ArrowRight size={16} className="text-gray-400" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Success Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Success Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {journey.metrics.map((metric, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-1.5 flex-shrink-0"></div>
                      <span className="text-gray-700">{metric}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Journey Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Journey Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Steps</span>
                  <span className="text-gray-900">{journey.steps.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Screens Visited</span>
                  <span className="text-gray-900">{new Set(journey.flow).size}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Navigation Hops</span>
                  <span className="text-gray-900">{journey.flow.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Screen Legend */}
        <Card>
          <CardHeader>
            <CardTitle>Screen Reference</CardTitle>
            <CardDescription>Understanding the app's main screens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
                <Badge className="mb-2 bg-blue-100 text-blue-700 border-blue-300">Home</Badge>
                <p className="text-sm text-gray-700">Daily streaks, goals, continue learning, quick actions</p>
              </div>
              <div className="p-4 border-2 border-purple-200 rounded-lg bg-purple-50">
                <Badge className="mb-2 bg-purple-100 text-purple-700 border-purple-300">Lessons</Badge>
                <p className="text-sm text-gray-700">Lesson path, categories, locked/unlocked content, search</p>
              </div>
              <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50">
                <Badge className="mb-2 bg-green-100 text-green-700 border-green-300">Practice</Badge>
                <p className="text-sm text-gray-700">Interactive quizzes, audio playback, voice input, progress tracking</p>
              </div>
              <div className="p-4 border-2 border-orange-200 rounded-lg bg-orange-50">
                <Badge className="mb-2 bg-orange-100 text-orange-700 border-orange-300">Progress</Badge>
                <p className="text-sm text-gray-700">Stats, charts, achievements, goals, performance analytics</p>
              </div>
              <div className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50">
                <Badge className="mb-2 bg-gray-100 text-gray-700 border-gray-300">Settings</Badge>
                <p className="text-sm text-gray-700">Account, notifications, language, help, about</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
