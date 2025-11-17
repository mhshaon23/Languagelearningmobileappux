import { ChevronRight, Lock, CheckCircle2 } from 'lucide-react';

interface LessonsScreenProps {
  scrollToCurrent?: boolean;
}

export function LessonsScreen({ scrollToCurrent = false }: LessonsScreenProps) {
  return (
    <div className="p-6 space-y-6 bg-purple-50/30">
      {/* Header */}
      <div>
        <div className="h-8 w-48 border-2 border-purple-300 rounded mb-2 flex items-center justify-center">
          <span className="text-xs text-purple-600">Your Learning Path</span>
        </div>
        <div className="h-4 w-32 border border-purple-300 rounded flex items-center justify-center">
          <span className="text-xs text-purple-600">Subtitle</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="h-12 border-2 border-purple-300 rounded-lg flex items-center px-4 bg-white">
        <div className="h-4 w-24 border border-purple-300 rounded flex items-center justify-center">
          <span className="text-xs text-purple-600">Search...</span>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <div className="h-8 px-4 border-2 border-purple-700 bg-purple-100 text-purple-700 rounded-full flex items-center whitespace-nowrap">
          <span className="text-xs">All</span>
        </div>
        <div className="h-8 px-4 border border-purple-300 rounded-full flex items-center whitespace-nowrap bg-white">
          <span className="text-xs text-purple-600">Basics</span>
        </div>
        <div className="h-8 px-4 border border-purple-300 rounded-full flex items-center whitespace-nowrap bg-white">
          <span className="text-xs text-purple-600">Grammar</span>
        </div>
        <div className="h-8 px-4 border border-purple-300 rounded-full flex items-center whitespace-nowrap bg-white">
          <span className="text-xs text-purple-600">Vocabulary</span>
        </div>
      </div>

      {/* Lesson Path */}
      <div className="space-y-4">
        {/* Completed Lesson */}
        <div className="border-2 border-purple-300 rounded-lg p-4 bg-green-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-600" size={24} />
              <div>
                <div className="h-5 w-40 border border-purple-300 rounded mb-1 flex items-center px-2">
                  <span className="text-xs text-purple-600">Completed Lesson</span>
                </div>
                <div className="h-3 w-24 border border-purple-300 rounded flex items-center px-2">
                  <span className="text-xs text-purple-600">Level 1</span>
                </div>
              </div>
            </div>
            <div className="h-6 w-12 border border-purple-300 rounded flex items-center justify-center">
              <span className="text-xs text-purple-600">100%</span>
            </div>
          </div>
          <div className="w-full h-2 bg-green-200 rounded-full">
            <div className="h-full w-full bg-green-600 rounded-full"></div>
          </div>
        </div>

        {/* Current Lesson */}
        <div className="border-2 border-purple-700 rounded-lg p-4 bg-purple-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border-2 border-purple-700"></div>
              <div>
                <div className="h-5 w-40 border border-purple-300 rounded mb-1 flex items-center px-2">
                  <span className="text-xs text-purple-700">Current Lesson</span>
                </div>
                <div className="h-3 w-24 border border-purple-300 rounded flex items-center px-2">
                  <span className="text-xs text-purple-600">Level 2</span>
                </div>
              </div>
            </div>
            <ChevronRight className="text-purple-700" size={20} />
          </div>
          <div className="w-full h-2 bg-purple-200 rounded-full">
            <div className="h-full w-2/3 bg-purple-700 rounded-full"></div>
          </div>
        </div>

        {/* Locked Lessons */}
        {['Locked Lesson 1', 'Locked Lesson 2', 'Locked Lesson 3'].map((title, i) => (
          <div key={i} className="border-2 border-purple-300 rounded-lg p-4 opacity-60 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="text-purple-400" size={24} />
                <div>
                  <div className="h-5 w-40 border border-purple-300 rounded mb-1 flex items-center px-2">
                    <span className="text-xs text-purple-600">{title}</span>
                  </div>
                  <div className="h-3 w-24 border border-purple-300 rounded flex items-center px-2">
                    <span className="text-xs text-purple-600">Level {i + 3}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
