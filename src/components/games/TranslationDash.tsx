import { ArrowLeft, Trophy, Timer, Zap, Star, Flame, Heart, Target } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface TranslationDashProps {
  onExit: () => void;
  onComplete?: () => void;
}

interface Question {
  sami: string;
  english: string;
  category: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export function TranslationDash({ onExit, onComplete }: TranslationDashProps) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<number[]>([]);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [characterMood, setCharacterMood] = useState<'happy' | 'excited' | 'sad' | 'neutral'>('neutral');
  const [level, setLevel] = useState(1);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  // Northern Sami vocabulary database
  const allQuestions: Question[] = [
    // Easy - Greetings & Basic
    { sami: 'BURES', english: 'HELLO', category: 'Greetings', icon: '👋', difficulty: 'easy' },
    { sami: 'GIITU', english: 'THANK YOU', category: 'Greetings', icon: '🙏', difficulty: 'easy' },
    { sami: 'BUORRE', english: 'GOOD', category: 'Basic', icon: '👍', difficulty: 'easy' },
    { sami: 'BÁHKKA', english: 'BAD', category: 'Basic', icon: '👎', difficulty: 'easy' },
    { sami: 'VUOSTÁ', english: 'PLEASE', category: 'Polite', icon: '🙇', difficulty: 'easy' },
    
    // Easy - Time
    { sami: 'BEAIVI', english: 'DAY', category: 'Time', icon: '☀️', difficulty: 'easy' },
    { sami: 'IDJA', english: 'NIGHT', category: 'Time', icon: '🌙', difficulty: 'easy' },
    { sami: 'IĐIT', english: 'MORNING', category: 'Time', icon: '🌅', difficulty: 'easy' },
    { sami: 'EAHKET', english: 'EVENING', category: 'Time', icon: '🌆', difficulty: 'easy' },
    
    // Medium - Animals
    { sami: 'BOAZU', english: 'REINDEER', category: 'Animals', icon: '🦌', difficulty: 'medium' },
    { sami: 'BEANA', english: 'DOG', category: 'Animals', icon: '🐕', difficulty: 'medium' },
    { sami: 'GUSSA', english: 'COW', category: 'Animals', icon: '🐄', difficulty: 'medium' },
    { sami: 'FUONCCIS', english: 'BIRD', category: 'Animals', icon: '🐦', difficulty: 'medium' },
    { sami: 'GUOLLI', english: 'FISH', category: 'Animals', icon: '🐟', difficulty: 'medium' },
    
    // Medium - Family
    { sami: 'ÁHČČI', english: 'FATHER', category: 'Family', icon: '👨', difficulty: 'medium' },
    { sami: 'EADNI', english: 'MOTHER', category: 'Family', icon: '👩', difficulty: 'medium' },
    { sami: 'MÁNNÁ', english: 'CHILD', category: 'Family', icon: '👶', difficulty: 'medium' },
    { sami: 'VIELLJA', english: 'BROTHER', category: 'Family', icon: '👦', difficulty: 'medium' },
    
    // Medium - Nature
    { sami: 'LUONDU', english: 'NATURE', category: 'Nature', icon: '🌲', difficulty: 'medium' },
    { sami: 'ČÁHCI', english: 'WATER', category: 'Nature', icon: '💧', difficulty: 'medium' },
    { sami: 'DOLLA', english: 'FIRE', category: 'Nature', icon: '🔥', difficulty: 'medium' },
    { sami: 'MUOHTA', english: 'SNOW', category: 'Nature', icon: '❄️', difficulty: 'medium' },
    
    // Hard - Actions
    { sami: 'OĐASMIT', english: 'SLEEP', category: 'Actions', icon: '😴', difficulty: 'hard' },
    { sami: 'BORRAT', english: 'EAT', category: 'Actions', icon: '🍽️', difficulty: 'hard' },
    { sami: 'JUHKAT', english: 'DRINK', category: 'Actions', icon: '🥤', difficulty: 'hard' },
    { sami: 'VÁZZIT', english: 'WALK', category: 'Actions', icon: '🚶', difficulty: 'hard' },
    
    // Hard - Colors
    { sami: 'VIELGAT', english: 'WHITE', category: 'Colors', icon: '⚪', difficulty: 'hard' },
    { sami: 'ČÁHPPAT', english: 'BLACK', category: 'Colors', icon: '⚫', difficulty: 'hard' },
    { sami: 'RUOKSAT', english: 'RED', category: 'Colors', icon: '🔴', difficulty: 'hard' },
    { sami: 'VIHER', english: 'GREEN', category: 'Colors', icon: '🟢', difficulty: 'hard' },
  ];

  // Get questions by difficulty level
  const getQuestionsForLevel = () => {
    if (level === 1) return allQuestions.filter(q => q.difficulty === 'easy');
    if (level === 2) return allQuestions.filter(q => q.difficulty === 'easy' || q.difficulty === 'medium');
    return allQuestions;
  };

  const [questions, setQuestions] = useState(getQuestionsForLevel());
  const currentQ = questions[currentQuestion];

  // Generate wrong answers
  const generateOptions = () => {
    if (!currentQ) return [];
    
    const correctAnswer = currentQ.english;
    const wrongAnswers = allQuestions
      .filter(q => q.english !== correctAnswer && q.category === currentQ.category)
      .map(q => q.english)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    // If not enough wrong answers from same category, add from other categories
    while (wrongAnswers.length < 3) {
      const randomQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];
      if (randomQuestion.english !== correctAnswer && !wrongAnswers.includes(randomQuestion.english)) {
        wrongAnswers.push(randomQuestion.english);
      }
    }
    
    const options = [correctAnswer, ...wrongAnswers];
    return options.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (currentQ) {
      setCurrentOptions(generateOptions());
    }
  }, [currentQuestion]);

  // Timer
  useEffect(() => {
    if (gameOver || timeLeft === 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          setTimeout(() => {
            onComplete?.();
            onExit();
          }, 3000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameOver]);

  // Level up check
  useEffect(() => {
    if (questionsAnswered > 0 && questionsAnswered % 10 === 0 && level < 3) {
      setLevel(level + 1);
      setQuestions(getQuestionsForLevel());
      setCharacterMood('excited');
      setTimeout(() => setCharacterMood('neutral'), 2000);
    }
  }, [questionsAnswered]);

  const handleAnswer = (selectedAnswer: string) => {
    if (showCorrect || showWrong || gameOver) return;

    const isCorrect = selectedAnswer === currentQ.english;

    if (isCorrect) {
      // Correct answer
      const basePoints = currentQ.difficulty === 'easy' ? 10 : currentQ.difficulty === 'medium' ? 15 : 20;
      const streakBonus = streak * 5;
      const speedBonus = timeLeft > 50 ? 10 : timeLeft > 40 ? 5 : 0;
      const totalPoints = basePoints + streakBonus + speedBonus;

      setScore(score + totalPoints);
      setStreak(streak + 1);
      setShowCorrect(true);
      setCharacterMood('happy');
      setAnsweredCorrectly([...answeredCorrectly, currentQuestion]);
      setQuestionsAnswered(questionsAnswered + 1);

      setTimeout(() => {
        setShowCorrect(false);
        setCharacterMood('neutral');
        nextQuestion();
      }, 1000);
    } else {
      // Wrong answer
      setShowWrong(true);
      setCharacterMood('sad');
      setStreak(0);
      setLives(lives - 1);

      if (lives - 1 === 0) {
        setGameOver(true);
        setTimeout(() => {
          onComplete?.();
          onExit();
        }, 3000);
      } else {
        setTimeout(() => {
          setShowWrong(false);
          setCharacterMood('neutral');
          nextQuestion();
        }, 1500);
      }
    }
  };

  const nextQuestion = () => {
    // Shuffle to get a new random question
    const nextIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(nextIndex);
  };

  // Keyboard controls (1-4 for options)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const keyNum = parseInt(e.key);
      if (keyNum >= 1 && keyNum <= 4 && currentOptions[keyNum - 1]) {
        handleAnswer(currentOptions[keyNum - 1]);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentOptions, showCorrect, showWrong, gameOver]);

  if (!currentQ) return null;

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1668294141622-18e9998a00f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF5ZnVsJTIwM2QlMjBpbGx1c3RyYXRpb24lMjBnYW1lfGVufDF8fHx8MTc2MjE4MDA4MXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="3D Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className={`absolute inset-0 transition-all duration-500 ${
          showCorrect ? 'bg-gradient-to-b from-green-500/95 to-emerald-500/95' :
          showWrong ? 'bg-gradient-to-b from-red-500/95 to-orange-500/95' :
          'bg-gradient-to-b from-cyan-500/95 to-blue-600/95'
        }`}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="p-3 pb-2">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={onExit}
              className="text-cyan-200 hover:text-white flex items-center gap-1"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1 flex items-center justify-center gap-2">
              <span className="text-2xl">⚡</span>
              <h2 className="text-cyan-100">Translation Dash</h2>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-2 py-1 border-2 border-white/30 flex items-center justify-center gap-1">
              <Timer className="text-white" size={14} />
              <span className={`text-white text-sm ${timeLeft <= 10 ? 'animate-pulse' : ''}`}>{timeLeft}s</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-2 py-1 border-2 border-white/30 flex items-center justify-center gap-1">
              <Trophy className="text-yellow-300" size={14} />
              <span className="text-white text-sm">{score}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-2 py-1 border-2 border-white/30 flex items-center justify-center gap-1">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className={i < lives ? 'text-red-400' : 'text-gray-500'}
                  fill={i < lives ? 'currentColor' : 'none'}
                  size={14}
                />
              ))}
            </div>
          </div>

          {/* Streak & Level */}
          <div className="flex items-center gap-2">
            {streak > 0 && (
              <div className="flex-1 bg-orange-500/80 backdrop-blur-sm rounded-xl px-3 py-1 border-2 border-orange-300 flex items-center justify-center gap-1 animate-pulse">
                <Flame className="text-yellow-300" size={14} />
                <span className="text-white text-xs">x{streak} Streak!</span>
              </div>
            )}
            <div className="bg-purple-500/80 backdrop-blur-sm rounded-xl px-3 py-1 border-2 border-purple-300">
              <span className="text-white text-xs">⭐ Level {level}</span>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 px-3 pb-3 overflow-y-auto space-y-2">
          {/* 3D Character with Mood */}
          <div className={`bg-white/20 backdrop-blur-sm rounded-3xl p-3 border-4 transition-all ${
            showCorrect ? 'border-green-300 animate-bounce' :
            showWrong ? 'border-red-300 shake' :
            'border-white/40'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`relative transition-transform ${
                showCorrect ? 'scale-110 rotate-12' :
                showWrong ? 'scale-90' :
                'scale-100'
              }`}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1629459347138-b34fcc7603cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGNhcnRvb24lMjBjaGFyYWN0ZXIlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzYyMTgwMDc5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Character"
                  className={`w-16 h-16 object-cover rounded-2xl border-3 ${
                    showCorrect ? 'border-green-400' :
                    showWrong ? 'border-red-400' :
                    'border-white'
                  }`}
                />
                <div className="absolute -top-1 -right-1 text-2xl">
                  {characterMood === 'happy' ? '😄' :
                   characterMood === 'excited' ? '🤩' :
                   characterMood === 'sad' ? '😢' : '😊'}
                </div>
              </div>
              <div className="flex-1">
                <p className={`text-xs transition-all ${
                  showCorrect ? 'text-green-100' :
                  showWrong ? 'text-red-100' :
                  'text-white'
                }`}>
                  {showCorrect ? '🎉 Perfect! Keep going!' :
                   showWrong ? '💔 Oops! Try again!' :
                   gameOver ? '⏰ Time\'s up!' :
                   'Translate quickly!'}
                </p>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-5 border-4 border-white/50 shadow-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-cyan-100 rounded-xl px-3 py-1 border-2 border-cyan-300">
                <span className="text-cyan-700 text-xs">{currentQ.category}</span>
              </div>
              <div className="flex-1"></div>
              <span className="text-3xl">{currentQ.icon}</span>
            </div>
            
            <div className="text-center mb-3">
              <p className="text-gray-600 text-xs mb-2">Translate to English:</p>
              <h2 className="text-gray-900 text-3xl tracking-wide mb-2">{currentQ.sami}</h2>
              <div className="flex items-center justify-center gap-2">
                <Target className="text-cyan-500" size={14} />
                <p className="text-cyan-600 text-xs">
                  {currentQ.difficulty === 'easy' ? '10 pts' : currentQ.difficulty === 'medium' ? '15 pts' : '20 pts'}
                  {streak > 0 && ` + ${streak * 5} streak`}
                </p>
              </div>
            </div>

            <p className="text-cyan-600 text-xs text-center">💡 Tap or press 1-4 keys</p>
          </div>

          {/* Answer Options */}
          <div className="space-y-2">
            {currentOptions.map((option, index) => {
              const isCorrect = option === currentQ.english;
              const shouldShowCorrect = showCorrect && isCorrect;
              const shouldShowWrong = showWrong && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={showCorrect || showWrong || gameOver}
                  className={`w-full rounded-2xl p-4 transition-all border-4 relative ${
                    shouldShowCorrect
                      ? 'bg-green-500 border-green-300 scale-105 shadow-2xl'
                      : shouldShowWrong
                      ? 'bg-red-200 border-red-400 opacity-50'
                      : 'bg-white/90 backdrop-blur-sm border-white/50 hover:scale-105 hover:bg-cyan-50 hover:border-cyan-300 active:scale-95 shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-cyan-500 rounded-full flex items-center justify-center text-white text-sm border-2 border-cyan-300">
                        {index + 1}
                      </div>
                      <span className={`${
                        shouldShowCorrect ? 'text-white' :
                        shouldShowWrong ? 'text-red-700' :
                        'text-gray-800'
                      }`}>
                        {option}
                      </span>
                    </div>
                    {shouldShowCorrect && (
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-300 animate-spin" size={20} />
                        <Zap className="text-yellow-300" size={20} />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Game Over Screen */}
          {gameOver && (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 border-4 border-white/50 shadow-2xl text-center space-y-3">
              <div className="text-5xl mb-2">
                {lives === 0 ? '💔' : '⏰'}
              </div>
              <h3 className="text-gray-900">
                {lives === 0 ? 'No More Lives!' : 'Time\'s Up!'}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Trophy className="text-yellow-500" size={24} />
                  <span className="text-gray-700">Final Score: {score}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Target className="text-cyan-500" size={20} />
                  <span className="text-gray-600 text-sm">Questions: {questionsAnswered}</span>
                </div>
                {streak > 3 && (
                  <div className="flex items-center justify-center gap-2">
                    <Flame className="text-orange-500" size={20} />
                    <span className="text-gray-600 text-sm">Best Streak: {streak}</span>
                  </div>
                )}
              </div>
              <p className="text-cyan-600 text-sm">Great effort! Keep practicing! 🎯</p>
            </div>
          )}
        </div>
      </div>

      {/* CSS for shake animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
