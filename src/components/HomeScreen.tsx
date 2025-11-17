import image_62efdb2f3ecfa43120df30ff3a91c543e864f869 from "figma:asset/62efdb2f3ecfa43120df30ff3a91c543e864f869.png";
import image_62efdb2f3ecfa43120df30ff3a91c543e864f869 from "figma:asset/62efdb2f3ecfa43120df30ff3a91c543e864f869.png";
import { Flame, Check, X } from "lucide-react";
import { GoalIcon } from "./GoalIcon";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import mascotImage from "figma:asset/65afa01bce1cd2f973d3252185f7f1d550d3952a.png";

interface HomeScreenProps {
  onNavigateToLessons?: () => void;
  onNavigateToProgress?: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToCurrentLesson?: () => void;
  onNavigateToGames?: () => void;
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
      emoji: "🌟",
      title: "Start your first lesson!",
      subtitle: "Begin your Northern Sami journey",
    };
  }

  // Priority 2: Return after break (4+ days inactive)
  if (state.daysSinceLastActivity >= 4) {
    return {
      emoji: "👋",
      title: "Welcome back!",
      subtitle: "Continue where you left off",
    };
  }

  // Priority 3: Streak milestone approaching (one away from milestone)
  const nextStreakMilestone = [7, 14, 30, 50, 100].find(
    (m) => m === state.currentStreak + 1,
  );
  if (nextStreakMilestone) {
    return {
      emoji: "🔥",
      title: `Reach a ${nextStreakMilestone}-day streak today!`,
      subtitle: "Keep your momentum going",
    };
  }

  // Priority 4: Daily goal not met yet
  if (state.lessonsCompletedToday < state.dailyGoal) {
    const remaining =
      state.dailyGoal - state.lessonsCompletedToday;
    return {
      emoji: "🎯",
      title: `Complete ${remaining} more lesson${remaining > 1 ? "s" : ""} today!`,
      subtitle: "Stay on track with your daily goal",
    };
  }

  // Priority 5: Unit completion close (1-2 lessons remaining in unit)
  const lessonsLeftInUnit =
    state.totalLessonsInUnit - state.lessonsInCurrentUnit;
  if (lessonsLeftInUnit > 0 && lessonsLeftInUnit <= 2) {
    return {
      emoji: "🏆",
      title: `Finish Unit ${state.currentUnit} today!`,
      subtitle: `Only ${lessonsLeftInUnit} lesson${lessonsLeftInUnit > 1 ? "s" : ""} left`,
    };
  }

  // Priority 6: Vocabulary milestones approaching
  const nextVocabMilestone = [50, 100, 250, 500, 1000].find(
    (m) =>
      state.wordsLearned >= m - 5 && state.wordsLearned < m,
  );
  if (nextVocabMilestone) {
    const wordsNeeded = nextVocabMilestone - state.wordsLearned;
    return {
      emoji: "📚",
      title: `Learn ${wordsNeeded} more word${wordsNeeded > 1 ? "s" : ""}!`,
      subtitle: `Reach ${nextVocabMilestone} total words learned`,
    };
  }

  // Priority 7: Perfect week possible (6 days completed this week)
  if (state.currentStreak % 7 === 6) {
    return {
      emoji: "✨",
      title: "Complete a perfect week!",
      subtitle: "One more day to go",
    };
  }

  // Priority 8: Level up approaching
  if (
    state.currentLevel === "A1.1" &&
    state.totalLessonsCompleted >= 18
  ) {
    return {
      emoji: "⬆️",
      title: "Reach A1.2 soon!",
      subtitle: "Continue your progress",
    };
  }

  // Default: Daily motivation
  const motivationalMessages = [
    {
      emoji: "🎉",
      title: "Keep learning today!",
      subtitle: "Every lesson brings progress",
    },
    {
      emoji: "💪",
      title: "Challenge yourself today!",
      subtitle: "Push your limits",
    },
    {
      emoji: "🌱",
      title: "Grow your skills today!",
      subtitle: "Consistency is key",
    },
  ];

  // Rotate based on current streak to add variety
  return motivationalMessages[
    state.currentStreak % motivationalMessages.length
  ];
}

export function HomeScreen({
  onNavigateToLessons,
  onNavigateToProgress,
  onNavigateToSettings,
  onNavigateToCurrentLesson,
  onNavigateToGames,
}: HomeScreenProps) {
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
    currentLevel: "A1.1",
  };

  const milestone = getDynamicMilestone(userState);

  const weekDays = [
    { day: "M", completed: true },
    { day: "T", completed: true },
    { day: "W", completed: true },
    { day: "T", completed: true },
    { day: "F", completed: true },
    { day: "S", completed: true },
    { day: "S", completed: false },
  ];

  const streakProgress = 80; // 80% progress towards goal

  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-gray-800 tracking-wide mb-6">
            YOUR LEARNING JOURNEY
          </h1>

          {/* Mascot Character */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-lg bg-[rgba(215,215,215,0)]">
                <img
                  src={
                    image_62efdb2f3ecfa43120df30ff3a91c543e864f869
                  }
                  alt="Speallu Mascot"
                  className="w-28 h-28 object-contain rounded-[50px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 shadow-lg space-y-6 hover:shadow-xl transition-shadow">
          {/* Today's Quest */}
          <button
            onClick={onNavigateToCurrentLesson}
            className="w-full text-left space-y-4 cursor-pointer hover:opacity-90 transition-opacity"
          >
            
            <h2 className="text-gray-800 mb-2">
              Complete{" "}
              {userState.dailyGoal -
                userState.lessonsCompletedToday}{" "}
              more lesson
              {userState.dailyGoal -
                userState.lessonsCompletedToday >
              1
                ? "s"
                : ""}{" "}
              to earn a daily goal!
            </h2>
            <p className="text-gray-600">Stay on track with your daily goal</p>
          </button>
        </div>

        <div className="w-full bg-white rounded-3xl p-6 shadow-lg mt-6 text-left hover:shadow-xl transition-shadow">
          {/* Current Streak */}
          <button
            onClick={onNavigateToProgress}
            className="w-full text-left space-y-4 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="flex items-center justify-between">
              <div className="flex-3">
                <h3 className="text-gray-800">
                  Build Your Streak
                </h3>
              </div>
              <div className="flex-1 text-right">
                Best <div>12 Days</div>
              </div>
            </div>

            {/* Week Days */}
            <div className="flex justify-between gap-2 mt-4">
              {weekDays.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                      item.completed
                        ? "bg-green-500 border-green-500"
                        : "bg-gray-200 border-gray-300"
                    }`}
                  >
                    {item.completed ? (
                      <Check
                        className="text-white"
                        size={20}
                        strokeWidth={3}
                      />
                    ) : item.day === "T" && i === 3 ? (
                      <X
                        className="text-gray-500"
                        size={20}
                        strokeWidth={3}
                      />
                    ) : item.day === "F" ? (
                      <X
                        className="text-gray-500"
                        size={20}
                        strokeWidth={3}
                      />
                    ) : (
                      <span className="text-gray-600">
                        {item.day}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-600">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </button>

          {/* 7-Day Streak */}
          <button
            onClick={onNavigateToProgress}
            className="w-full text-left space-y-4 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <h3 className="text-gray-800 mb-4">
              7-DAY STREAK! 🔥
            </h3>
          </button>

          {/* Level Badge and Title */}
          <div className="flex items-center gap-4">
            {/* Shield Badge */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-28 bg-gradient-to-b from-blue-400 to-blue-600 rounded-t-3xl rounded-b-lg shadow-lg flex flex-col items-center justify-center border-4 border-yellow-400 relative">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-20 h-6 bg-yellow-400 rounded-t-xl"></div>
                <span className="text-white text-xs mb-1">
                  LEVEL 5
                </span>
                <span className="text-yellow-300 text-2xl">
                  ⭐
                </span>
              </div>
            </div>

            {/* Language Explorer Text */}
            <div>
              <h2 className="text-gray-800">
                LANGUAGE EXPLORER!
              </h2>
            </div>
          </div>
        </div>

        {/* Play a Game Card */}
        <button
          onClick={onNavigateToGames}
          className="w-full bg-white cursor-pointer rounded-3xl p-6 shadow-lg mt-6 text-left hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-800">PLAY A GAME! 🎮</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Test your skills and have fun! Challenge yourself
            with interactive games.
          </p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-purple-100 rounded-2xl p-2 text-center">
              <span className="text-3xl">🎯</span>
              <p className="text-purple-700 mt-2">Matching</p>
            </div>
            <div className="flex-1 bg-blue-100 rounded-2xl p-2 text-center">
              <span className="text-3xl">🗣️</span>
              <p className="text-blue-700 mt-2">Speaking</p>
            </div>
            <div className="flex-1 bg-green-100 rounded-2xl p-2 text-center">
              <span className="text-3xl">🧩</span>
              <p className="text-green-700 mt-3"> Puzzle </p>
            </div>
          </div>
        </button>

        {/* Lesson Progress Card */}
        <button
          onClick={onNavigateToLessons}
          className="w-full bg-white cursor-pointer rounded-3xl p-6 shadow-lg mt-6 text-left hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-800">Reach Your Goal</h2>
            <span className="text-gray-800">2/3</span>
          </div>
          <p className="text-gray-600 mb-4">
            Amazing work! You're almost there - just 1 more
            lesson to complete this unit! 💪
          </p>

          {/* Progress circles */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-500 border-4 border-green-600 flex items-center justify-center shadow-lg">
                <Check
                  className="text-white"
                  size={28}
                  strokeWidth={3}
                />
              </div>
              <span className="text-xs text-gray-600 mt-2">
                Lesson 1
              </span>
            </div>
            <div className="w-8 h-1 bg-green-500"></div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-500 border-4 border-green-600 flex items-center justify-center shadow-lg">
                <Check
                  className="text-white"
                  size={28}
                  strokeWidth={3}
                />
              </div>
              <span className="text-xs text-gray-600 mt-2">
                Lesson 2
              </span>
            </div>
            <div className="w-8 h-1 bg-gray-300"></div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center shadow-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <span className="text-xs text-gray-600 mt-2">
                Lesson 3
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}