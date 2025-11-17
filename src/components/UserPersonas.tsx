import { useState } from 'react';
import { User, Briefcase, Target, Heart, Calendar, TrendingUp, Award, RefreshCw, BarChart3, Smartphone, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const personas = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'The Beginner',
    age: 28,
    occupation: 'Marketing Manager',
    avatar: 'SC',
    color: 'blue',
    image: '👩‍💼',
    tagline: `"I want to learn Spanish for my upcoming trip to Barcelona"`,
    
    demographics: {
      age: '28 years old',
      location: 'San Francisco, CA',
      education: "Bachelor's in Business",
      techSavvy: 'High - Uses apps daily',
    },
    
    goals: [
      'Complete first lesson within 24 hours of signing up',
      'Build a daily learning habit',
      'Learn basic conversational phrases',
      'Feel confident ordering food and asking directions',
    ],
    
    frustrations: [
      'Overwhelmed by too many lesson options',
      "Doesn't know where to start",
      'Worried about forgetting what she learned',
      'Limited time during busy workdays',
    ],
    
    motivations: [
      'Upcoming trip to Spain in 3 months',
      'Wants to connect with Spanish-speaking clients',
      'Enjoys gamification and rewards',
      'Likes tracking visible progress',
    ],
    
    behaviors: {
      frequency: 'Daily (morning routine)',
      sessionLength: '10-15 minutes',
      preferredTime: 'Morning with coffee (7-8 AM)',
      device: 'Smartphone during commute',
    },
    
    userJourney: 'New User - First Learning Session',
    keyScreens: ['Home', 'Lessons', 'Practice'],
    
    personality: {
      archetype: 'The Achiever',
      traits: ['Organized', 'Goal-oriented', 'Competitive', 'Visual learner'],
    },
    
    needs: [
      'Clear onboarding and first steps',
      'Visual progress indicators',
      'Streak tracking for motivation',
      'Quick daily lessons that fit her schedule',
    ],
    
    quote: 'I need an app that makes learning feel like progress, not homework.',
    
    usagePattern: 'Uses the app every morning before work, completes 1-2 lessons, checks streak calendar, and feels accomplished starting her day.',
  },
  
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'The Streak Keeper',
    age: 34,
    occupation: 'Software Engineer',
    avatar: 'MJ',
    color: 'green',
    image: '👨‍💻',
    tagline: `"I've learned something new every day for the past 147 days"`,
    
    demographics: {
      age: '34 years old',
      location: 'Austin, TX',
      education: "Master's in Computer Science",
      techSavvy: 'Very High - Developer',
    },
    
    goals: [
      'Maintain his 147-day learning streak',
      'Complete all lessons in the current path',
      'Achieve the "Year Warrior" badge (365 days)',
      'Master advanced grammar concepts',
    ],
    
    frustrations: [
      'Anxiety about breaking his streak',
      'Lessons sometimes feel too easy',
      'Wants more challenging content',
      'Limited advanced lessons available',
    ],
    
    motivations: [
      'Habit and routine are important to him',
      'Competitive - compares with friends streaks',
      'Loves collecting achievements and badges',
      'Pride in consistency and dedication',
    ],
    
    behaviors: {
      frequency: 'Daily (never misses)',
      sessionLength: '20-30 minutes',
      preferredTime: 'Lunch break (12-1 PM)',
      device: 'Smartphone + Tablet',
    },
    
    userJourney: 'Daily Learner - Maintaining Streak',
    keyScreens: ['Home', 'Practice', 'Progress'],
    
    personality: {
      archetype: 'The Perfectionist',
      traits: ['Disciplined', 'Analytical', 'Persistent', 'Data-driven'],
    },
    
    needs: [
      'Streak protection features',
      'Daily goal reminders',
      'Progress analytics and charts',
      'Achievement system with milestones',
    ],
    
    quote: "My streak isn't just numbers - it's proof of my commitment.",
    
    usagePattern: 'Checks app multiple times daily, completes 5+ lessons, analyzes progress charts weekly, shares achievements on social media.',
  },
  
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'The Achievement Hunter',
    age: 22,
    occupation: 'College Student',
    avatar: 'ER',
    color: 'purple',
    image: '👩‍🎓',
    tagline: `"Only 3 more badges until I unlock the Polyglot achievement!"`,
    
    demographics: {
      age: '22 years old',
      location: 'Los Angeles, CA',
      education: 'Undergraduate - International Relations',
      techSavvy: 'High - Gen Z digital native',
    },
    
    goals: [
      'Unlock all available achievements',
      'Complete all lesson categories',
      'Earn the highest-tier badges',
      'Compete with classmates on leaderboards',
    ],
    
    frustrations: [
      'Some achievements take too long to unlock',
      "Can't see friends' progress",
      'Wants more social features',
      'Wishes there were more badge categories',
    ],
    
    motivations: [
      'Collection and completion mindset',
      'Social validation and sharing',
      'Gamification elements',
      'Visual rewards and recognition',
    ],
    
    behaviors: {
      frequency: '4-5 times per week',
      sessionLength: '30-45 minutes',
      preferredTime: 'Evening (8-10 PM)',
      device: 'Smartphone',
    },
    
    userJourney: 'Achievement Hunter',
    keyScreens: ['Progress', 'Lessons', 'Practice'],
    
    personality: {
      archetype: 'The Collector',
      traits: ['Playful', 'Social', 'Ambitious', 'Creative'],
    },
    
    needs: [
      'Clear achievement requirements',
      'Visual badge display',
      'Progress percentage for each achievement',
      'Social sharing capabilities',
      'Way to suggest new achievement ideas',
    ],
    
    quote: 'Learning is fun when there\'s something to unlock!',
    
    usagePattern: 'Focuses on specific categories to unlock badges, frequently checks Progress tab, completes lessons in batches, shares milestones. Provides enthusiastic positive feedback after achieving major milestones and suggests new badge ideas.',
  },
  
  {
    id: 4,
    name: 'David Park',
    role: 'The Struggling Learner',
    age: 45,
    occupation: 'Teacher',
    avatar: 'DP',
    color: 'orange',
    image: '👨‍🏫',
    tagline: `"I keep reviewing the basics, but I want to make sure I really understand"`,
    
    demographics: {
      age: '45 years old',
      location: 'Seattle, WA',
      education: "Master's in Education",
      techSavvy: 'Medium - Prefers simple interfaces',
    },
    
    goals: [
      'Master the fundamentals before advancing',
      'Improve pronunciation with audio support',
      'Build confidence in speaking',
      'Review difficult concepts multiple times',
    ],
    
    frustrations: [
      'Feels rushed by daily goals',
      'Forgets previous lessons',
      'Anxious about making mistakes',
      'Wishes there was more review content',
    ],
    
    motivations: [
      "Wants to communicate with students' families",
      'Values depth over speed',
      'Prefers thorough understanding',
      'Enjoys incremental progress',
    ],
    
    behaviors: {
      frequency: '3-4 times per week',
      sessionLength: '15-20 minutes',
      preferredTime: 'Weekend mornings',
      device: 'Tablet (larger text)',
    },
    
    userJourney: 'Struggling Learner - Review & Practice',
    keyScreens: ['Practice', 'Lessons', 'Home'],
    
    personality: {
      archetype: 'The Methodical Learner',
      traits: ['Patient', 'Thorough', 'Cautious', 'Reflective'],
    },
    
    needs: [
      'Review and practice mode',
      'Audio pronunciation support',
      'Ability to repeat lessons without penalty',
      'Progress at own pace without pressure',
      'Easy way to report confusing lessons',
    ],
    
    quote: "I'd rather learn it right than learn it fast.",
    
    usagePattern: 'Reviews previous lessons frequently, uses audio features heavily, takes notes outside the app, practices speaking aloud. Often provides detailed feedback about confusing lessons via the Settings feedback option.',
  },
  
  {
    id: 5,
    name: 'Aisha Patel',
    role: 'The Explorer',
    age: 31,
    occupation: 'UX Designer',
    avatar: 'AP',
    color: 'pink',
    image: '👩‍🎨',
    tagline: `"I love browsing through all the lesson topics to see what's available"`,
    
    demographics: {
      age: '31 years old',
      location: 'New York, NY',
      education: "Bachelor's in Design",
      techSavvy: 'Very High - Design professional',
    },
    
    goals: [
      'Discover interesting lesson topics',
      'Learn vocabulary related to her interests',
      'Understand the full learning path',
      'Plan her learning journey strategically',
    ],
    
    frustrations: [
      "Can't jump to advanced topics immediately",
      'Limited search functionality',
      'Wants more lesson previews',
      'Wishes she could customize learning path',
    ],
    
    motivations: [
      'Curiosity and exploration',
      'Interest in language structure',
      'Enjoys discovering new content',
      'Likes having control and choice',
    ],
    
    behaviors: {
      frequency: '2-3 times per week',
      sessionLength: '20-25 minutes',
      preferredTime: 'Flexible - whenever inspired',
      device: 'Smartphone + Desktop',
    },
    
    userJourney: 'Explorer - Discovering Content',
    keyScreens: ['Lessons', 'Home', 'Practice'],
    
    personality: {
      archetype: 'The Curious Browser',
      traits: ['Inquisitive', 'Independent', 'Creative', 'Strategic'],
    },
    
    needs: [
      'Robust search and filtering',
      'Category-based browsing',
      'Lesson previews and descriptions',
      'Clear progression visualization',
      'Ability to suggest new topics and features',
    ],
    
    quote: 'I want to see the whole map before I start the journey.',
    
    usagePattern: 'Spends time in Lessons tab browsing, uses category filters frequently, plans ahead, completes lessons based on interest. As a UX designer, she frequently provides feature request feedback to improve the learning experience.',
  },
  
  {
    id: 6,
    name: 'Robert Kim',
    role: 'The Progress Tracker',
    age: 38,
    occupation: 'Data Analyst',
    avatar: 'RK',
    color: 'indigo',
    image: '👨‍💼',
    tagline: `"I check my weekly stats every Sunday to see my learning trends"`,
    
    demographics: {
      age: '38 years old',
      location: 'Chicago, IL',
      education: "Master's in Statistics",
      techSavvy: 'High - Data professional',
    },
    
    goals: [
      'Track learning metrics and trends',
      'Optimize study efficiency',
      'Maintain consistent weekly progress',
      'Identify patterns in learning performance',
    ],
    
    frustrations: [
      'Wants more detailed analytics',
      "Can't export data for personal tracking",
      'Limited time period options',
      'Wishes for comparison features',
    ],
    
    motivations: [
      'Data-driven decision making',
      'Self-improvement through metrics',
      'Optimization and efficiency',
      'Tangible evidence of progress',
    ],
    
    behaviors: {
      frequency: 'Daily (metrics-focused)',
      sessionLength: '15-20 minutes',
      preferredTime: 'Evening (9-10 PM)',
      device: 'Tablet for better charts',
    },
    
    userJourney: 'Progress Tracker',
    keyScreens: ['Progress', 'Home', 'Practice'],
    
    personality: {
      archetype: 'The Analyst',
      traits: ['Logical', 'Systematic', 'Detail-oriented', 'Quantitative'],
    },
    
    needs: [
      'Detailed progress charts',
      'Multiple time period views',
      'Performance metrics and KPIs',
      'Historical data comparison',
    ],
    
    quote: "You can't improve what you don't measure.",
    
    usagePattern: 'Reviews Progress tab daily, analyzes weekly trends, adjusts study schedule based on data, maintains detailed external logs.',
  },
];

const colorMap: { [key: string]: { bg: string; border: string; text: string; badge: string } } = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700' },
  green: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-700', badge: 'bg-green-100 text-green-700' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-700' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-500', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' },
  pink: { bg: 'bg-pink-50', border: 'border-pink-500', text: 'text-pink-700', badge: 'bg-pink-100 text-pink-700' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-500', text: 'text-indigo-700', badge: 'bg-indigo-100 text-indigo-700' },
};

export function UserPersonas() {
  const [selectedPersona, setSelectedPersona] = useState(personas[0]);

  const colors = colorMap[selectedPersona.color];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-800 mb-2">User Personas</h1>
          <p className="text-gray-600">Detailed profiles of Speallu users based on user journey analysis</p>
        </div>

        {/* Persona Selection */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {personas.map((persona) => {
            const personaColors = colorMap[persona.color];
            const isSelected = selectedPersona.id === persona.id;
            
            return (
              <button
                key={persona.id}
                onClick={() => setSelectedPersona(persona)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? `${personaColors.bg} ${personaColors.border} shadow-lg scale-105`
                    : 'bg-white border-gray-200 hover:shadow-md'
                }`}
              >
                <div className="text-4xl mb-2">{persona.image}</div>
                <h3 className={`text-sm mb-1 ${isSelected ? personaColors.text : 'text-gray-800'}`}>
                  {persona.name}
                </h3>
                <p className="text-xs text-gray-600">{persona.role}</p>
              </button>
            );
          })}
        </div>

        {/* Persona Details */}
        <div className="space-y-6">
          {/* Header Card */}
          <Card className={`border-4 ${colors.border}`}>
            <CardHeader className={colors.bg}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">{selectedPersona.image}</div>
                  <div>
                    <CardTitle className="text-gray-800 mb-1">{selectedPersona.name}</CardTitle>
                    <CardDescription className="text-gray-600 mb-2">
                      {selectedPersona.occupation} • {selectedPersona.age} years old
                    </CardDescription>
                    <Badge className={colors.badge}>{selectedPersona.role}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className={colors.text} size={18} />
                    <span className="text-sm text-gray-700">Primary Journey:</span>
                  </div>
                  <p className="text-sm text-gray-600">{selectedPersona.userJourney}</p>
                </div>
              </div>
              <div className={`mt-4 p-4 rounded-lg bg-white border-2 ${colors.border}`}>
                <p className="text-gray-700 italic text-center">{selectedPersona.tagline}</p>
              </div>
            </CardHeader>
          </Card>

          {/* Tabs Content */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="psychology">Psychology</TabsTrigger>
              <TabsTrigger value="behavior">Behavior</TabsTrigger>
              <TabsTrigger value="needs">Needs & Goals</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Demographics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User size={20} />
                      Demographics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-700">{selectedPersona.demographics.age}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-700">{selectedPersona.demographics.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-700">{selectedPersona.demographics.education}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Smartphone size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-700">{selectedPersona.demographics.techSavvy}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Usage Pattern */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock size={20} />
                      Usage Pattern
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">{selectedPersona.usagePattern}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quote */}
              <Card className={`border-l-4 ${colors.border}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">"</div>
                    <div>
                      <p className="text-gray-700 italic mb-2">{selectedPersona.quote}</p>
                      <p className="text-sm text-gray-500">— {selectedPersona.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Screens */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone size={20} />
                    Most Used Screens
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedPersona.keyScreens.map((screen, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {screen}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Psychology Tab */}
            <TabsContent value="psychology" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Goals */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target size={20} className="text-green-600" />
                      Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedPersona.goals.map((goal, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span className="text-sm text-gray-700">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Frustrations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <RefreshCw size={20} className="text-red-600" />
                      Frustrations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedPersona.frustrations.map((frustration, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">✗</span>
                          <span className="text-sm text-gray-700">{frustration}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Motivations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart size={20} className="text-pink-600" />
                      Motivations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedPersona.motivations.map((motivation, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-pink-600 mt-1">♥</span>
                          <span className="text-sm text-gray-700">{motivation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Personality */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award size={20} className="text-purple-600" />
                      Personality
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`mb-3 ${colors.text}`}>{selectedPersona.personality.archetype}</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPersona.personality.traits.map((trait, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Behavior Tab */}
            <TabsContent value="behavior" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Frequency & Time */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock size={20} />
                      Usage Frequency
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">How Often</p>
                      <p className={`${colors.text}`}>{selectedPersona.behaviors.frequency}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Session Length</p>
                      <p className={`${colors.text}`}>{selectedPersona.behaviors.sessionLength}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Preferred Time</p>
                      <p className={`${colors.text}`}>{selectedPersona.behaviors.preferredTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Device</p>
                      <p className={`${colors.text}`}>{selectedPersona.behaviors.device}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* User Journey Map */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp size={20} />
                      Typical User Journey
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{selectedPersona.userJourney}</p>
                    <div className={`p-4 rounded-lg ${colors.bg} border-2 ${colors.border}`}>
                      <p className="text-xs text-gray-500 mb-2">Navigation Flow:</p>
                      <div className="flex flex-wrap items-center gap-2">
                        {selectedPersona.keyScreens.map((screen, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Badge className={colors.badge}>{screen}</Badge>
                            {index < selectedPersona.keyScreens.length - 1 && (
                              <span className="text-gray-400">→</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Usage Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 size={20} />
                    Detailed Usage Pattern
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{selectedPersona.usagePattern}</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Needs & Goals Tab */}
            <TabsContent value="needs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target size={20} />
                    User Needs
                  </CardTitle>
                  <CardDescription>
                    Features and functionality this persona requires for success
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedPersona.needs.map((need, index) => (
                      <div key={index} className={`p-3 rounded-lg border-l-4 ${colors.border} bg-gray-50`}>
                        <p className="text-sm text-gray-700">{need}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Combined Goals & Frustrations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-t-4 border-t-green-500">
                  <CardHeader>
                    <CardTitle className="text-green-700">What They Want to Achieve</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedPersona.goals.map((goal, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">●</span>
                          <span className="text-sm text-gray-700">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-t-4 border-t-red-500">
                  <CardHeader>
                    <CardTitle className="text-red-700">What Holds Them Back</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedPersona.frustrations.map((frustration, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">●</span>
                          <span className="text-sm text-gray-700">{frustration}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Design Implications */}
              <Card className={`border-2 ${colors.border}`}>
                <CardHeader className={colors.bg}>
                  <CardTitle>Design Implications for {selectedPersona.name}</CardTitle>
                  <CardDescription>
                    How the app should be designed to meet this persona needs
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {selectedPersona.needs.map((need, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <span className={`text-xs ${colors.text}`}>{index + 1}</span>
                        </div>
                        <p className="text-sm text-gray-700">{need}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Summary Card */}
          <Card className={`border-2 ${colors.border}`}>
            <CardHeader className={colors.bg}>
              <CardTitle>Persona Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm text-gray-500 mb-2">Archetype</h4>
                  <p className={`${colors.text}`}>{selectedPersona.personality.archetype}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500 mb-2">Primary Goal</h4>
                  <p className="text-sm text-gray-700">{selectedPersona.goals[0]}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500 mb-2">Key Frustration</h4>
                  <p className="text-sm text-gray-700">{selectedPersona.frustrations[0]}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
