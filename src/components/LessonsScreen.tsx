import { ChevronRight, Lock, CheckCircle2, Search, Play, Star, Zap, Sparkles, Book } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { LessonViewer } from './lessons/LessonViewer';

interface LessonsScreenProps {
  scrollToCurrent?: boolean;
}

export function LessonsScreen({ scrollToCurrent = false }: LessonsScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const currentLessonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (scrollToCurrent && currentLessonRef.current) {
      setTimeout(() => {
        currentLessonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [scrollToCurrent]);

  const categories = ['All', 'Basics', 'Grammar', 'Vocabulary', 'Culture'];

  // A1 Level Northern Sami Lessons
  const lessons = [
    // UNIT 1: BASICS
    {
      id: 1,
      title: 'Basic Greetings',
      description: 'Essential Sami greetings and polite expressions',
      category: 'Basics',
      level: 'A1',
      progress: 100,
      status: 'completed',
      subLessons: 6,
      emoji: '👋',
      topics: ['Bures', 'Giitu', 'Vuostá', 'Oaidnaleapmai']
    },
    {
      id: 2,
      title: 'Numbers 1-10',
      description: 'Learn to count from 1 to 10',
      category: 'Basics',
      level: 'A1',
      progress: 67,
      status: 'current',
      subLessons: 5,
      emoji: '🔢',
      topics: ['okta', 'guokte', 'golbma', 'vihtta', 'logi']
    },
    {
      id: 3,
      title: 'Colors',
      description: 'Basic colors in Northern Sami',
      category: 'Vocabulary',
      level: 'A1',
      progress: 0,
      status: 'unlocked',
      subLessons: 4,
      emoji: '🎨',
      topics: ['ruksesbuolva', 'alit', 'fiskat', 'vilges']
    },
    {
      id: 4,
      title: 'Family Members',
      description: 'Words for family and relatives',
      category: 'Vocabulary',
      level: 'A1',
      progress: 0,
      status: 'locked',
      subLessons: 7,
      emoji: '👨‍👩‍👧‍👦',
      topics: ['eadni', 'áhčči', 'oabbá', 'viellja']
    },
    {
      id: 5,
      title: 'Days of the Week',
      description: 'Learn all seven days',
      category: 'Basics',
      level: 'A1',
      progress: 0,
      status: 'locked',
      subLessons: 4,
      emoji: '📅',
      topics: ['vuossárga', 'mánnodat', 'gaskavahkku', 'duorastat']
    },
    {
      id: 6,
      title: 'Common Verbs',
      description: 'Essential action words',
      category: 'Grammar',
      level: 'A1',
      progress: 0,
      status: 'locked',
      subLessons: 8,
      emoji: '🏃',
      topics: ['leat', 'mannat', 'boahtit', 'dahkat']
    },
    {
      id: 7,
      title: 'Food & Drink',
      description: 'Common food vocabulary',
      category: 'Vocabulary',
      level: 'A1',
      progress: 0,
      status: 'locked',
      subLessons: 6,
      emoji: '🍽️',
      topics: ['bierggu', 'gáfe', 'láibi', 'vuosttu']
    },
    {
      id: 8,
      title: 'Animals',
      description: 'Common Sami animals',
      category: 'Vocabulary',
      level: 'A1',
      progress: 0,
      status: 'locked',
      subLessons: 5,
      emoji: '🦌',
      topics: ['boazu', 'gussa', 'čáhci', 'loddi']
    },
    {
      id: 9,
      title: 'Weather Words',
      description: 'Describe the weather',
      category: 'Vocabulary',
      level: 'A1',
      progress: 0,
      status: 'locked',
      subLessons: 5,
      emoji: '🌤️',
      topics: ['beaivi', 'muohta', 'bárti', 'čáhci']
    },
    {
      id: 10,
      title: 'Basic Questions',
      description: 'Ask simple questions',
      category: 'Grammar',
      level: 'A1',
      progress: 0,
      status: 'locked',
      subLessons: 6,
      emoji: '❓',
      topics: ['Maid', 'Geat', 'Gos', 'Goas']
    },
    {
      id: 11,
      title: 'Personal Pronouns',
      description: 'I, you, he, she, we, they',
      category: 'Grammar',
      level: 'A1',
      progress: 0,
      status: 'locked',
      subLessons: 4,
      emoji: '👤',
      topics: ['mun', 'don', 'son', 'mii']
    },
    {
      id: 12,
      title: 'Numbers 11-20',
      description: 'Continue counting',
      category: 'Basics',
      level: 'A1',
      progress: 0,
      status: 'locked',
      subLessons: 4,
      emoji: '🔢',
      topics: ['oktanuppelohkái', 'guoktenuppelohkái']
    },
    {
      id: 13,
      title: 'Sami Culture Introduction',
      description: 'Learn about Sami traditions',
      category: 'Culture',
      level: 'A1',
      progress: 0,
      status: 'locked',
      subLessons: 5,
      emoji: '🏔️',
      topics: ['Sápmi', 'duodji', 'joik', 'lavvu']
    },
    {
      id: 14,
      title: 'Body Parts',
      description: 'Basic body vocabulary',
      category: 'Vocabulary',
      level: 'A1',
      progress: 0,
      status: 'locked',
      subLessons: 6,
      emoji: '🙋',
      topics: ['oaivi', 'giehta', 'juolgi', 'čalbmi']
    },
    {
      id: 15,
      title: 'Clothing',
      description: 'Common clothing items',
      category: 'Vocabulary',
      level: 'A1',
      progress: 0,
      status: 'locked',
      subLessons: 5,
      emoji: '👕',
      topics: ['gákti', 'skuovva', 'láhka', 'beavdi']
    }
  ];

  const filteredLessons = selectedCategory === 'All' 
    ? lessons 
    : lessons.filter(lesson => lesson.category === selectedCategory);

  const completedCount = lessons.filter(l => l.status === 'completed').length;
  const totalLessons = lessons.length;
  const overallProgress = Math.round((completedCount / totalLessons) * 100);

  if (selectedLesson !== null) {
    return (
      <LessonViewer
        lessonId={selectedLesson}
        onExit={() => setSelectedLesson(null)}
        onComplete={() => {
          // Update lesson progress
          const lessonIndex = lessons.findIndex(l => l.id === selectedLesson);
          if (lessonIndex !== -1) {
            lessons[lessonIndex].progress = 100;
            lessons[lessonIndex].status = 'completed';
            // Unlock next lesson
            if (lessonIndex + 1 < lessons.length && lessons[lessonIndex + 1].status === 'locked') {
              lessons[lessonIndex + 1].status = 'unlocked';
            }
          }
        }}
      />
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-b from-violet-100 via-purple-50 to-pink-100 min-h-full">
      {/* Header with playful elements */}
      <div className="flex items-center gap-3">
        <span className="text-3xl">📚</span>
        <div className="flex-1">
          <h1 className="text-gray-900 mb-1 flex items-center gap-2">
            A1 Learning Path
            <Sparkles className="text-purple-500 animate-pulse" size={20} />
          </h1>
          <p className="text-purple-600">Beginner Northern Sami 🚀</p>
        </div>
        <div className="bg-white rounded-2xl px-4 py-2 border-3 border-purple-300 shadow-lg">
          <div className="text-center">
            <div className="text-2xl text-purple-600">{completedCount}/{totalLessons}</div>
            <div className="text-xs text-gray-600">Complete</div>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-white rounded-3xl p-4 border-4 border-purple-300 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700">Overall Progress</span>
          <span className="text-purple-700 px-3 py-1 bg-purple-100 rounded-full border-2 border-purple-300">
            {overallProgress}%
          </span>
        </div>
        <div className="w-full h-4 bg-purple-100 rounded-full overflow-hidden border-2 border-purple-200">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Categories - Fun pill buttons */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 h-11 rounded-full whitespace-nowrap transition-all border-2 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg border-purple-400 scale-110'
                : 'bg-white text-purple-600 border-purple-200 hover:border-purple-400 hover:scale-105'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Lesson Cards */}
      <div className="space-y-4">
        {filteredLessons.map((lesson) => (
          <button
            key={lesson.id}
            ref={lesson.status === 'current' ? currentLessonRef : null}
            disabled={lesson.status === 'locked'}
            onClick={() => {
              if (lesson.status !== 'locked') {
                setSelectedLesson(lesson.id);
              }
            }}
            className={`w-full rounded-3xl p-5 transition-all relative overflow-hidden text-left ${
              lesson.status === 'completed'
                ? 'bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 border-4 border-green-300 shadow-lg hover:shadow-xl hover:scale-105'
                : lesson.status === 'current'
                ? 'bg-gradient-to-br from-white to-purple-50 border-4 border-purple-400 shadow-2xl hover:shadow-2xl hover:scale-105 active:scale-95'
                : lesson.status === 'unlocked'
                ? 'bg-white border-4 border-blue-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                : 'bg-white border-4 border-gray-200 opacity-50'
            }`}
          >
            {/* Decorative elements */}
            {lesson.status === 'current' && (
              <>
                <Star className="absolute top-2 right-2 text-yellow-400 animate-spin" size={20} style={{ animationDuration: '3s' }} />
                <Zap className="absolute bottom-2 left-2 text-purple-400 animate-pulse" size={16} />
              </>
            )}

            <div className="flex items-start gap-4 mb-3">
              {/* Icon */}
              <div className={`p-3 rounded-2xl text-3xl ${
                lesson.status === 'completed'
                  ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-md'
                  : lesson.status === 'current'
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-md animate-pulse'
                  : lesson.status === 'unlocked'
                  ? 'bg-gradient-to-br from-blue-400 to-cyan-500 shadow-md'
                  : 'bg-gray-200'
              }`}>
                <span className="block w-10 h-10 flex items-center justify-center">
                  {lesson.status === 'locked' ? <Lock size={24} className="text-gray-400" /> : lesson.emoji}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className={`mb-1 ${lesson.status === 'locked' ? 'text-gray-400' : 'text-gray-900'}`}>
                      {lesson.title}
                    </h3>
                    <p className={`text-sm mb-2 ${lesson.status === 'locked' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {lesson.description}
                    </p>
                  </div>
                  {lesson.status !== 'locked' && (
                    <ChevronRight className={
                      lesson.status === 'current' ? 'text-purple-600' : 
                      lesson.status === 'completed' ? 'text-green-600' : 'text-blue-600'
                    } size={24} />
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs border ${
                    lesson.category === 'Basics' ? 'bg-blue-100 text-blue-700 border-blue-300' :
                    lesson.category === 'Grammar' ? 'bg-purple-100 text-purple-700 border-purple-300' :
                    lesson.category === 'Vocabulary' ? 'bg-pink-100 text-pink-700 border-pink-300' :
                    'bg-orange-100 text-orange-700 border-orange-300'
                  }`}>
                    {lesson.category}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700 border border-gray-300">
                    Level {lesson.level}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs bg-white text-gray-600 border border-gray-300 flex items-center gap-1">
                    <Book size={10} />
                    {lesson.subLessons} parts
                  </span>
                </div>

                {/* Sample topics */}
                {lesson.status !== 'locked' && lesson.topics && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {lesson.topics.slice(0, 4).map((topic, index) => (
                      <span key={index} className="text-xs px-2 py-0.5 bg-white/60 rounded-full border border-gray-200">
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Progress Bar */}
            {lesson.status !== 'locked' && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Progress</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    lesson.status === 'completed' 
                      ? 'text-green-700 bg-green-200 border border-green-300' 
                      : lesson.status === 'current'
                      ? 'text-purple-700 bg-purple-200 border border-purple-300'
                      : 'text-blue-700 bg-blue-200 border border-blue-300'
                  }`}>
                    {lesson.progress}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200">
                  <div 
                    className={`h-full transition-all ${
                      lesson.status === 'completed' 
                        ? 'bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500' 
                        : lesson.status === 'current'
                        ? 'bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500'
                        : 'bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500'
                    }`}
                    style={{ width: `${lesson.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Completion badge */}
            {lesson.status === 'completed' && (
              <div className="absolute top-3 left-3 bg-green-500 text-white rounded-full p-1">
                <CheckCircle2 size={16} />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Motivational Card */}
      <div className="rounded-3xl p-6 bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 border-4 border-yellow-300 shadow-xl relative overflow-hidden">
        <Sparkles className="absolute top-2 right-2 text-yellow-500 animate-bounce" size={20} />
        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg border-2 border-yellow-300">
            🎯
          </div>
          <div>
            <h4 className="text-gray-900">Keep Going!</h4>
            <p className="text-gray-600">
              {completedCount === 0 ? 'Start your first lesson today!' :
               completedCount < 5 ? 'You\'re making great progress!' :
               completedCount < 10 ? 'Halfway there! Keep it up!' :
               'Almost done with A1 level! 🎉'}
            </p>
          </div>
        </div>
      </div>

      {/* Level Info */}
      <div className="bg-white/80 rounded-3xl p-4 border-2 border-purple-200">
        <h4 className="text-gray-900 mb-2 flex items-center gap-2">
          <span>ℹ️</span>
          About A1 Level
        </h4>
        <p className="text-gray-600 text-sm">
          A1 is the beginner level. You'll learn basic phrases, simple grammar, and everyday vocabulary. 
          Perfect for starting your Northern Sami journey! 🌟
        </p>
      </div>
    </div>
  );
}
