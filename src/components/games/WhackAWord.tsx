import { ArrowLeft, Trophy, Timer } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface WhackAWordProps {
  onExit: () => void;
  onComplete?: () => void;
}

interface Mole {
  id: number;
  word: string;
  translation: string;
  isCorrect: boolean;
  visible: boolean;
}

export function WhackAWord({ onExit, onComplete }: WhackAWordProps) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [moles, setMoles] = useState<Mole[]>(
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      word: '',
      translation: '',
      isCorrect: false,
      visible: false,
    }))
  );

  const samiWords = [
    { word: 'BURES', translation: 'Hello', correct: true },
    { word: 'GIITU', translation: 'Thank you', correct: true },
    { word: 'WRONG', translation: 'Incorrect', correct: false },
    { word: 'BEAIVI', translation: 'Day', correct: true },
    { word: 'IDJA', translation: 'Night', correct: true },
    { word: 'BAD', translation: 'Wrong word', correct: false },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete?.();
            onExit();
          }, 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const moleTimer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 6);
      const randomWord = samiWords[Math.floor(Math.random() * samiWords.length)];
      setMoles((prev) =>
        prev.map((mole, i) =>
          i === randomIndex
            ? { ...mole, ...randomWord, isCorrect: randomWord.correct, visible: true }
            : { ...mole, visible: false }
        )
      );
    }, 1500);

    return () => {
      clearInterval(timer);
      clearInterval(moleTimer);
    };
  }, []);

  const handleMoleClick = (mole: Mole) => {
    if (mole.visible && mole.isCorrect) {
      setScore(score + 10);
      setMoles((prev) =>
        prev.map((m) => (m.id === mole.id ? { ...m, visible: false } : m))
      );
    }
  };

  // Keyboard controls (1-6 for holes)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const keyNum = parseInt(e.key);
      if (keyNum >= 1 && keyNum <= 6) {
        const mole = moles[keyNum - 1];
        handleMoleClick(mole);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [moles, score]);

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1760434685862-5f2b29748cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWJyYW50JTIwM2QlMjBzY2VuZSUyMGNvbG9yZnVsfGVufDF8fHx8MTc2MjE4MDA4Mnww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="3D Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/90 to-pink-50/90"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={onExit} className="text-rose-600 hover:text-rose-700 flex items-center gap-2">
              <ArrowLeft size={24} />
              <span>Exit</span>
            </button>
            <div className="flex-1 flex items-center justify-center gap-2">
              <span className="text-2xl">🔨</span>
              <h2 className="text-gray-800">Whack-a-Word</h2>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" size={20} />
              <span className="text-rose-700">Score: {score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Timer className="text-rose-500" size={20} />
              <span className="text-rose-700">{timeLeft}s</span>
            </div>
          </div>
        </div>

        <div className="flex-1 px-6 pb-6 space-y-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-xl border-4 border-rose-300">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1739513275763-84d4393a84ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwM2QlMjBjaGFyYWN0ZXIlMjBkZXNpZ258ZW58MXx8fHwxNzYyMTgwMDgyfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Character"
              className="w-full h-24 object-cover rounded-2xl mb-3 opacity-80"
            />
            <p className="text-center text-rose-700">Tap or press 1-6 keys! 🔨</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {moles.map((mole) => (
              <button
                key={mole.id}
                onClick={() => handleMoleClick(mole)}
                className={`h-32 rounded-3xl border-4 transition-all relative ${
                  mole.visible
                    ? 'bg-gradient-to-br from-rose-100 to-pink-100 border-rose-300 shadow-xl scale-105'
                    : 'bg-white/50 border-gray-200'
                }`}
              >
                <div className="absolute top-2 left-2 w-7 h-7 bg-rose-200 rounded-full flex items-center justify-center text-sm text-rose-700 border-2 border-rose-400">
                  {mole.id + 1}
                </div>
                {mole.visible && (
                  <div className="text-center">
                    <p className="text-gray-900 mb-1">{mole.word}</p>
                    <p className="text-gray-600 text-sm">{mole.translation}</p>
                  </div>
                )}
              </button>
            ))}
          </div>

          {timeLeft === 0 && (
            <div className="bg-rose-100 rounded-3xl p-6 shadow-xl border-4 border-rose-300 text-center">
              <div className="text-4xl mb-2">🎉</div>
              <h3 className="text-rose-800 mb-2">Time's up!</h3>
              <p className="text-rose-700">Final Score: {score}</p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <Trophy className="text-yellow-500" size={20} />
                <span className="text-rose-700">+{score} XP</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
