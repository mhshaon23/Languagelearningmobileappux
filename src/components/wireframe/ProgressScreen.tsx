import { TrendingUp, Star, Target } from 'lucide-react';

interface ProgressScreenProps {
  scrollToMonthly?: boolean;
}

export function ProgressScreen({ scrollToMonthly = false }: ProgressScreenProps) {
  return (
    <div className="p-6 space-y-6 bg-orange-50/30">
      {/* Header */}
      <div>
        <div className="h-8 w-40 border-2 border-orange-300 rounded mb-2 flex items-center justify-center">
          <span className="text-xs text-orange-600">Your Progress</span>
        </div>
        <div className="h-4 w-48 border border-orange-300 rounded flex items-center justify-center">
          <span className="text-xs text-orange-600">Track your learning journey</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="border-2 border-orange-300 rounded-lg p-3 text-center bg-white">
          <div className="h-8 w-12 border-2 border-orange-300 rounded mx-auto mb-2 flex items-center justify-center">
            <span className="text-xs text-orange-600">42</span>
          </div>
          <div className="h-3 w-16 border border-orange-300 rounded mx-auto flex items-center justify-center">
            <span className="text-xs text-orange-600">Days</span>
          </div>
        </div>
        <div className="border-2 border-orange-300 rounded-lg p-3 text-center bg-white">
          <div className="h-8 w-12 border-2 border-orange-300 rounded mx-auto mb-2 flex items-center justify-center">
            <span className="text-xs text-orange-600">128</span>
          </div>
          <div className="h-3 w-16 border border-orange-300 rounded mx-auto flex items-center justify-center">
            <span className="text-xs text-orange-600">Lessons</span>
          </div>
        </div>
        <div className="border-2 border-orange-300 rounded-lg p-3 text-center bg-white">
          <div className="h-8 w-12 border-2 border-orange-300 rounded mx-auto mb-2 flex items-center justify-center">
            <span className="text-xs text-orange-600">850</span>
          </div>
          <div className="h-3 w-16 border border-orange-300 rounded mx-auto flex items-center justify-center">
            <span className="text-xs text-orange-600">Points</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="border-2 border-orange-300 rounded-lg p-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 w-32 border border-orange-300 rounded flex items-center justify-center">
            <span className="text-xs text-orange-600">Activity Chart</span>
          </div>
          <div className="h-8 px-3 border border-orange-300 rounded flex items-center">
            <span className="text-xs text-orange-700">Week</span>
          </div>
        </div>
        <div className="h-48 border border-orange-300 rounded flex items-end justify-between p-4 gap-2">
          {[60, 80, 45, 90, 70, 30, 85].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-orange-200 rounded-t"
              style={{ height: `${height}%` }}
            ></div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-orange-700">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <div className="h-6 w-40 border border-orange-300 rounded mb-3 flex items-center justify-center">
          <span className="text-xs text-orange-600">Achievements</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {['First', 'Week', 'Pro', 'Lock 1', 'Lock 2', 'Lock 3'].map((label, i) => (
            <div
              key={i}
              className={`border-2 ${
                i < 3 ? 'border-yellow-400 bg-yellow-50' : 'border-orange-300 bg-white'
              } rounded-lg p-3 flex flex-col items-center gap-2`}
            >
              <Star
                className={i < 3 ? 'text-yellow-400' : 'text-orange-300'}
                size={32}
                fill={i < 3 ? 'currentColor' : 'none'}
              />
              <div className="h-3 w-12 border border-orange-300 rounded flex items-center justify-center">
                <span className="text-xs text-orange-600">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div className="border-2 border-orange-300 rounded-lg p-4 bg-white">
        <div className="flex items-center gap-2 mb-4">
          <Target className="text-orange-600" size={20} />
          <div className="h-5 w-32 border border-orange-300 rounded flex items-center justify-center">
            <span className="text-xs text-orange-600">Weekly Goal</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-4 w-40 border border-orange-300 rounded flex items-center px-2">
              <span className="text-xs text-orange-600">Complete 20 lessons</span>
            </div>
            <div className="h-4 w-12 border border-orange-300 rounded flex items-center justify-center">
              <span className="text-xs text-orange-600">16/20</span>
            </div>
          </div>
          <div className="w-full h-2 bg-orange-100 rounded-full">
            <div className="h-full w-4/5 bg-orange-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
