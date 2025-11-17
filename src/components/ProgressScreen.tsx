import { useState, useRef, useEffect } from 'react';
import { TrendingUp, Star, Target, Award, Flame, BookOpen, Zap, Calendar as CalendarIcon, LineChart as LineChartIcon, Trophy, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip } from 'recharts';

interface ProgressScreenProps {
  scrollToMonthly?: boolean;
}

export function ProgressScreen({ scrollToMonthly = false }: ProgressScreenProps) {
  const [monthViewType, setMonthViewType] = useState<'graph' | 'calendar'>('calendar');
  const monthlyProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollToMonthly && monthlyProgressRef.current) {
      // Small delay to ensure the component is fully rendered
      setTimeout(() => {
        monthlyProgressRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [scrollToMonthly]);
  const weekData = [
    { day: 'Mon', minutes: 25 },
    { day: 'Tue', minutes: 35 },
    { day: 'Wed', minutes: 20 },
    { day: 'Thu', minutes: 40 },
    { day: 'Fri', minutes: 30 },
    { day: 'Sat', minutes: 15 },
    { day: 'Sun', minutes: 38 },
  ];

  const monthData = [
    { week: 'W1', lessons: 12 },
    { week: 'W2', lessons: 15 },
    { week: 'W3', lessons: 10 },
    { week: 'W4', lessons: 18 },
  ];

  // Calendar data for October 2025 (current month)
  const calendarData = [
    // Days of the month with activity status
    { day: 1, active: true, lessons: 2 },
    { day: 2, active: true, lessons: 3 },
    { day: 3, active: false, lessons: 0 },
    { day: 4, active: true, lessons: 1 },
    { day: 5, active: true, lessons: 4 },
    { day: 6, active: true, lessons: 2 },
    { day: 7, active: true, lessons: 3 },
    { day: 8, active: true, lessons: 2 },
    { day: 9, active: false, lessons: 0 },
    { day: 10, active: true, lessons: 1 },
    { day: 11, active: true, lessons: 3 },
    { day: 12, active: true, lessons: 2 },
    { day: 13, active: true, lessons: 4 },
    { day: 14, active: true, lessons: 2 },
    { day: 15, active: false, lessons: 0 },
    { day: 16, active: true, lessons: 3 },
    { day: 17, active: true, lessons: 2 },
    { day: 18, active: true, lessons: 1 },
    { day: 19, active: true, lessons: 3 },
    { day: 20, active: true, lessons: 2 },
    { day: 21, active: true, lessons: 4 },
    { day: 22, active: false, lessons: 0 },
    { day: 23, active: true, lessons: 2 },
    { day: 24, active: true, lessons: 3 },
    { day: 25, active: false, lessons: 0 }, // today
    { day: 26, active: false, lessons: 0 },
    { day: 27, active: false, lessons: 0 },
    { day: 28, active: false, lessons: 0 },
    { day: 29, active: false, lessons: 0 },
    { day: 30, active: false, lessons: 0 },
    { day: 31, active: false, lessons: 0 },
  ];

  // Pad the start of the calendar (October 2025 starts on Wednesday)
  const calendarStartPadding = 3; // 0=Sunday, 3=Wednesday

  const achievements = [
    { id: 1, name: 'First Step', icon: '🎯', unlocked: true, description: 'Complete your first lesson' },
    { id: 2, name: 'Week Warrior', icon: '📅', unlocked: true, description: '7 day streak' },
    { id: 3, name: 'Quick Learner', icon: '⚡', unlocked: true, description: 'Complete 10 lessons' },
    { id: 4, name: 'Grammar Pro', icon: '📚', unlocked: false, description: 'Master all grammar lessons' },
    { id: 5, name: 'Vocabulary Master', icon: '💬', unlocked: false, description: 'Learn 100 words' },
    { id: 6, name: 'Perfect Week', icon: '🌟', unlocked: false, description: 'Complete all daily goals for a week' },
  ];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-b from-orange-100 via-amber-50 to-yellow-100 min-h-full">
      {/* Header - Super fun */}
      <div className="flex items-center gap-3">
        <span className="text-3xl animate-bounce" style={{ animationDuration: '2s' }}>📊</span>
        <div>
          <h1 className="text-gray-900 mb-1 flex items-center gap-2">
            Your Progress
            <Trophy className="text-yellow-500 animate-pulse" size={24} />
          </h1>
          <p className="text-orange-600">Look how far you've come! 🎉</p>
        </div>
      </div>

      {/* Stats Grid - More playful */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-3xl p-4 text-center bg-gradient-to-br from-red-100 to-orange-100 shadow-xl border-4 border-orange-300 hover:scale-105 transition-all">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg border-2 border-orange-300 animate-pulse">
            <Flame className="text-white" size={28} />
          </div>
          <div className="text-gray-900 mb-1">7</div>
          <p className="text-gray-600">Day Streak 🔥</p>
        </div>
        <div className="rounded-3xl p-4 text-center bg-gradient-to-br from-blue-100 to-indigo-100 shadow-xl border-4 border-blue-300 hover:scale-105 transition-all">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg border-2 border-blue-300">
            <BookOpen className="text-white" size={28} />
          </div>
          <div className="text-gray-900 mb-1">42</div>
          <p className="text-gray-600">Lessons 📚</p>
        </div>
        <div className="rounded-3xl p-4 text-center bg-gradient-to-br from-yellow-100 to-amber-100 shadow-xl border-4 border-yellow-300 hover:scale-105 transition-all">
          <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg border-2 border-yellow-300 animate-bounce" style={{ animationDuration: '2s' }}>
            <Zap className="text-white" size={28} />
          </div>
          <div className="text-gray-900 mb-1">850</div>
          <p className="text-gray-600">XP Points ⚡</p>
        </div>
      </div>

      {/* Weekly Activity Chart - Fun colors */}
      <div className="rounded-3xl p-6 bg-white shadow-xl border-4 border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 shadow-md">
              <TrendingUp className="text-white" size={20} />
            </div>
            <h3 className="text-gray-900">This Week 📈</h3>
          </div>
          <span className="text-purple-600 bg-purple-100 px-3 py-1 rounded-full border-2 border-purple-300">163 min</span>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekData}>
              <XAxis 
                dataKey="day" 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Bar 
                dataKey="minutes" 
                fill="url(#colorGradient)" 
                radius={[12, 12, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-gray-500 text-center mt-2 flex items-center justify-center gap-2">
          <span>⏱️</span>
          Daily study time (minutes)
        </p>
      </div>

      {/* Monthly Progress - Fun design */}
      <div ref={monthlyProgressRef} className="rounded-3xl p-6 bg-white shadow-xl border-4 border-green-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 flex items-center gap-2">
            Monthly Progress
            <Sparkles className="text-green-500 animate-pulse" size={20} />
          </h3>
          <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 border-2 border-gray-200">
            <button
              onClick={() => setMonthViewType('calendar')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                monthViewType === 'calendar'
                  ? 'bg-white text-green-600 shadow-md border-2 border-green-300'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <CalendarIcon size={16} />
              <span className="text-xs">Calendar</span>
            </button>
            <button
              onClick={() => setMonthViewType('graph')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                monthViewType === 'graph'
                  ? 'bg-white text-green-600 shadow-md border-2 border-green-300'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <LineChartIcon size={16} />
              <span className="text-xs">Graph</span>
            </button>
          </div>
        </div>

        {monthViewType === 'graph' ? (
          <>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="week" 
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '2px solid #86efac',
                      borderRadius: '12px' 
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="lessons" 
                    stroke="#22c55e" 
                    strokeWidth={4}
                    dot={{ fill: '#22c55e', r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-gray-500 text-center mt-2">Lessons completed per week 📊</p>
          </>
        ) : (
          <>
            <div className="mb-3">
              <p className="text-center text-gray-600">October 2025 🗓️</p>
            </div>
            {/* Calendar Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-center text-xs text-gray-500 py-1">
                  {day}
                </div>
              ))}
            </div>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Padding for start of month */}
              {Array.from({ length: calendarStartPadding }).map((_, i) => (
                <div key={`pad-${i}`} className="aspect-square" />
              ))}
              {/* Calendar days */}
              {calendarData.map((dayData) => (
                <div
                  key={dayData.day}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all border-2 ${
                    dayData.active
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-md border-green-300 hover:scale-110'
                      : dayData.day === 25
                      ? 'border-orange-400 text-orange-600 bg-orange-50 border-dashed'
                      : 'bg-gray-50 text-gray-400 border-gray-100'
                  }`}
                >
                  <span className="text-xs">{dayData.day}</span>
                  {dayData.active && dayData.lessons > 0 && (
                    <div className="flex gap-0.5 mt-0.5">
                      {Array.from({ length: Math.min(dayData.lessons, 3) }).map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-white rounded-full" />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-md border-2 border-green-300" />
                <span className="text-xs text-gray-600">Active ✅</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 border-2 border-dashed border-orange-400 bg-orange-50 rounded-md" />
                <span className="text-xs text-gray-600">Today 📍</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Achievements - Super fun */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 flex items-center gap-2">
            Achievements
            <Trophy className="text-yellow-500" size={20} />
          </h3>
          <span className="text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full border-2 border-yellow-300">3/6 unlocked 🏆</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((achievement) => (
            <button
              key={achievement.id}
              className={`rounded-3xl p-4 flex flex-col items-center gap-2 transition-all border-4 ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-100 to-amber-100 border-yellow-300 shadow-xl hover:scale-110'
                  : 'bg-white border-gray-200 opacity-40'
              }`}
            >
              <div className={`text-3xl ${achievement.unlocked ? 'scale-110 animate-bounce' : 'grayscale'}`} style={{ animationDuration: achievement.unlocked ? '2s' : '0s' }}>
                {achievement.icon}
              </div>
              <p className={`text-xs text-center ${achievement.unlocked ? 'text-gray-900' : 'text-gray-400'}`}>
                {achievement.name}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Weekly Goal - Vibrant */}
      <div className="rounded-3xl p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-2xl border-4 border-purple-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-white/40">
            <Target className="text-white" size={24} />
          </div>
          <h3 className="flex items-center gap-2">
            Weekly Goal
            <span className="text-xl">🎯</span>
          </h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-white/95">Complete 20 lessons</p>
            <span className="bg-white/20 px-3 py-1 rounded-full border-2 border-white/30">16/20</span>
          </div>
          <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden border-2 border-white/30">
            <div className="h-full w-4/5 bg-white rounded-full shadow-lg"></div>
          </div>
          <p className="text-white/90 flex items-center gap-2">
            <span>💪</span>
            4 more lessons to reach your goal! Almost there!
          </p>
        </div>
      </div>

      {/* Learning Stats - Fun cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-3xl p-5 bg-gradient-to-br from-blue-100 to-cyan-100 shadow-xl border-4 border-blue-300">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 shadow-md">
              <Award className="text-white" size={20} />
            </div>
            <p className="text-gray-700">Accuracy</p>
          </div>
          <div className="text-gray-900 flex items-center gap-2">
            87%
            <span className="text-xl">🎯</span>
          </div>
          <p className="text-gray-600">Quiz average</p>
        </div>
        <div className="rounded-3xl p-5 bg-gradient-to-br from-green-100 to-emerald-100 shadow-xl border-4 border-green-300">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 shadow-md">
              <BookOpen className="text-white" size={20} />
            </div>
            <p className="text-gray-700">Words</p>
          </div>
          <div className="text-gray-900 flex items-center gap-2">
            156
            <span className="text-xl">📚</span>
          </div>
          <p className="text-gray-600">Vocabulary</p>
        </div>
      </div>
    </div>
  );
}
