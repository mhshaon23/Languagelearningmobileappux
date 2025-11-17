import { Award, Calendar, Flame, Trophy } from 'lucide-react';
import { GoalIcon } from './GoalIcon';

interface HomeScreenProps {
  onNavigateToLessons?: () => void;
  onNavigateToGames?: () => void;
  onNavigateToProgress?: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToCurrentLesson?: () => void;
}

// User state interface for milestone determination
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
  currentLevel: string;
}

// Milestone type
interface Milestone {
  emoji: string;
  title: string;
  subtitle: string;
}

// Function to determine which milestone to show
function getDynamicMilestone(state: UserState): Milestone {
  // Priority 1: First-time user
  if (state.totalLessonsCompleted === 0) {
    return {
      emoji: '🌟',
      title: 'Start your first lesson!',
      subtitle: 'Begin your Northern Sami journey',
    };
  }

  // Priority 2: Return after break (4+ days inactive)
  if (state.daysSinceLastActivity >= 4) {
    return {
      emoji: '👋',
      title: 'Welcome back!',
      subtitle: 'Continue where you left off',
    };
  }

  // Priority 3: Streak milestone approaching (one away from milestone)
  const nextStreakMilestone = [7, 14, 30, 50, 100].find(m => m === state.currentStreak + 1);
  if (nextStreakMilestone) {
    return {
      emoji: '🔥',
      title: `Reach a ${nextStreakMilestone}-day streak today!`,
      subtitle: 'Keep your momentum going',
    };
  }

  // Priority 4: Daily goal not met yet
  if (state.lessonsCompletedToday < state.dailyGoal) {
    const remaining = state.dailyGoal - state.lessonsCompletedToday;
    return {
      emoji: '🎯',
      title: `Complete ${remaining} more lesson${remaining > 1 ? 's' : ''} today!`,
      subtitle: 'Stay on track with your daily goal',
    };
  }

  // Priority 5: Unit completion close (1-2 lessons remaining in unit)
  const lessonsLeftInUnit = state.totalLessonsInUnit - state.lessonsInCurrentUnit;
  if (lessonsLeftInUnit > 0 && lessonsLeftInUnit <= 2) {
    return {
      emoji: '🏆',
      title: `Finish Unit ${state.currentUnit} today!`,
      subtitle: `Only ${lessonsLeftInUnit} lesson${lessonsLeftInUnit > 1 ? 's' : ''} left`,
    };
  }

  // Priority 6: Vocabulary milestones approaching
  const nextVocabMilestone = [50, 100, 250, 500, 1000].find(m => state.wordsLearned >= m - 5 && state.wordsLearned < m);
  if (nextVocabMilestone) {
    const wordsNeeded = nextVocabMilestone - state.wordsLearned;
    return {
      emoji: '📚',
      title: `Learn ${wordsNeeded} more word${wordsNeeded > 1 ? 's' : ''}!`,
      subtitle: `Reach ${nextVocabMilestone} total words learned`,
    };
  }

  // Priority 7: Perfect week possible (6 days completed this week)
  if (state.currentStreak % 7 === 6) {
    return {
      emoji: '✨',
      title: 'Complete a perfect week!',
      subtitle: 'One more day to go',
    };
  }

  // Priority 8: Level up approaching
  if (state.currentLevel === 'A1.1' && state.totalLessonsCompleted >= 18) {
    return {
      emoji: '⬆️',
      title: 'Reach A1.2 soon!',
      subtitle: 'Continue your progress',
    };
  }

  // Default: Daily motivation
  const motivationalMessages = [
    { emoji: '🎉', title: 'Keep learning today!', subtitle: 'Every lesson brings progress' },
    { emoji: '💪', title: 'Challenge yourself today!', subtitle: 'Push your limits' },
    { emoji: '🌱', title: 'Grow your skills today!', subtitle: 'Consistency is key' },
  ];
  
  // Rotate based on current streak to add variety
  return motivationalMessages[state.currentStreak % motivationalMessages.length];
}

export function HomeScreen({ onNavigateToLessons, onNavigateToGames, onNavigateToProgress, onNavigateToSettings, onNavigateToCurrentLesson }: HomeScreenProps) {
  // Simulated user state - in a real app, this would come from a database or state management
  const userState: UserState = {
    currentStreak: 7,
    bestStreak: 12,
    lessonsCompletedToday: 3,
    totalLessonsCompleted: 45,
    dailyGoal: 5,
    currentUnit: 2,
    lessonsInCurrentUnit: 4,
    totalLessonsInUnit: 5,
    wordsLearned: 148,
    daysSinceLastActivity: 0,
    currentLevel: 'A1.1',
  };

  const milestone = getDynamicMilestone(userState);
  return (
    <div className="p-6 space-y-6 bg-blue-50/30">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-blue-700 bg-blue-100 border border-blue-300 rounded px-2 py-1 inline-block">
          Welcome back!
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onNavigateToSettings}
            className="cursor-pointer"
            aria-label="View Profile"
          >
            <div className="h-8 w-24 border-2 border-blue-300 rounded flex items-center justify-center hover:border-blue-500 transition-colors">
              <span className="text-xs text-blue-600">User Name</span>
            </div>
          </button>
          <button 
            onClick={onNavigateToSettings}
            className="cursor-pointer"
            aria-label="View Profile"
          >
            <div className="w-12 h-12 rounded-full border-2 border-blue-300 flex items-center justify-center hover:border-blue-500 transition-colors">
              <span className="text-xs text-blue-600">Avatar</span>
            </div>
          </button>
        </div>
      </div>

      {/* Dynamic Milestone */}
      <div className="border-2 border-yellow-400 rounded-lg p-4 bg-yellow-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-lg">{milestone.emoji}</span>
          </div>
          <div className="flex-1">
            <div className="h-5 w-full border border-yellow-400 rounded mb-1 flex items-center px-2">
              <span className="text-xs text-yellow-900 truncate">{milestone.title}</span>
            </div>
            <div className="h-4 w-3/4 border border-yellow-300 rounded flex items-center px-2">
              <span className="text-xs text-yellow-700 truncate">{milestone.subtitle}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Play a Game */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: '#D81E05' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy style={{ color: '#D81E05' }} size={24} />
            <div className="h-6 w-32 border rounded flex items-center justify-center" style={{ borderColor: '#D81E05' }}>
              <span className="text-xs" style={{ color: '#D81E05' }}>Play a Game</span>
            </div>
          </div>
          <div className="text-right">
            <div className="h-6 w-12 border-2 rounded flex items-center justify-center mb-1" style={{ borderColor: '#D81E05' }}>
              <span className="text-xs" style={{ color: '#D81E05' }}>0/5</span>
            </div>
            <span className="text-xs" style={{ color: '#D81E05' }}>completed</span>
          </div>
        </div>
      </div>

      {/* Streak Card */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: '#003C88' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame style={{ color: '#003C88' }} size={24} />
            <div className="h-6 w-24 border rounded flex items-center justify-center" style={{ borderColor: '#003C88' }}>
              <span className="text-xs" style={{ color: '#003C88' }}>Build Your Streak</span>
            </div>
          </div>
          <div className="h-8 w-16 border-2 rounded flex items-center justify-center" style={{ borderColor: '#003C88' }}>
            <span className="text-xs" style={{ color: '#003C88' }}>7 Days</span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
            <div key={i} className="aspect-square border rounded flex items-center justify-center" style={{ borderColor: '#003C88' }}>
              <span className="text-xs" style={{ color: '#003C88' }}>{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reach Your Goal */}
      <div className="border-2 border-blue-300 rounded-lg p-4 bg-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <GoalIcon size={20} className="text-blue-600" />
            <div className="h-5 w-32 border border-blue-300 rounded flex items-center justify-center">
              <span className="text-xs text-blue-600">Reach Your Goal</span>
            </div>
          </div>
          <div className="text-xs text-blue-700 bg-blue-100 border border-blue-300 rounded px-2 py-1">
            3/5 lessons
          </div>
        </div>
        <div className="w-full h-3 bg-blue-100 rounded-full overflow-hidden">
          <div className="h-full w-3/5 bg-blue-600 rounded-full"></div>
        </div>
      </div>

      {/* Continue Learning */}
      <div>
        <div className="h-6 w-40 border border-blue-300 rounded mb-3 flex items-center justify-center">
          <span className="text-xs text-blue-600">Continue Learning</span>
        </div>
        <div className="border-2 border-blue-300 rounded-lg p-4 bg-white">
          <div className="flex gap-4">
            <div className="w-16 h-16 border-2 border-blue-300 rounded-lg flex-shrink-0 flex items-center justify-center">
              <span className="text-xs text-blue-600 text-center">Icon</span>
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-5 w-full border border-blue-300 rounded flex items-center px-2">
                <span className="text-xs text-blue-600">Lesson Title</span>
              </div>
              <div className="h-4 w-3/4 border border-blue-300 rounded flex items-center px-2">
                <span className="text-xs text-blue-600">Description</span>
              </div>
              <div className="flex gap-2 mt-2">
                <div className="h-6 w-16 border border-blue-300 rounded flex items-center justify-center">
                  <span className="text-xs text-blue-600">Level</span>
                </div>
                <div className="h-6 w-20 border border-blue-300 rounded flex items-center justify-center">
                  <span className="text-xs text-blue-600">Progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="h-6 w-32 border border-blue-300 rounded mb-3 flex items-center justify-center">
          <span className="text-xs text-blue-600">Quick Actions</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="border-2 border-blue-300 rounded-lg p-4 aspect-square flex flex-col items-center justify-center gap-2 bg-white">
            <Award className="text-blue-600" size={32} />
            <div className="h-4 w-20 border border-blue-300 rounded flex items-center justify-center">
              <span className="text-xs text-blue-600">Badges</span>
            </div>
          </div>
          <div className="border-2 border-blue-300 rounded-lg p-4 aspect-square flex flex-col items-center justify-center gap-2 bg-white">
            <Calendar className="text-blue-600" size={32} />
            <div className="h-4 w-20 border border-blue-300 rounded flex items-center justify-center">
              <span className="text-xs text-blue-600">Schedule</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
