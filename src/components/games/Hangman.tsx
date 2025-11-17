import { ArrowLeft, Trophy, Heart, Lightbulb } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface HangmanProps {
  onExit: () => void;
  onComplete?: () => void;
}

interface Word {
  word: string;
  hint: string;
  translation: string;
  category: string;
  emoji: string;
}

export function Hangman({ onExit, onComplete }: HangmanProps) {
  const words: Word[] = [
    { word: 'BURES', hint: 'A greeting', translation: 'Hello', category: 'Greetings', emoji: '👋' },
    { word: 'GIITU', hint: 'Expression of gratitude', translation: 'Thank you', category: 'Greetings', emoji: '🙏' },
    { word: 'BEAIVI', hint: 'Opposite of night', translation: 'Day', category: 'Time', emoji: '☀️' },
    { word: 'BOAZU', hint: 'Important animal in Sami culture', translation: 'Reindeer', category: 'Animals', emoji: '🦌' },
    { word: 'VUOSTÁ', hint: 'Polite request word', translation: 'Please', category: 'Polite', emoji: '🙇' },
    { word: 'IDJA', hint: 'When stars appear', translation: 'Night', category: 'Time', emoji: '🌙' },
    { word: 'BUORRE', hint: 'Something positive', translation: 'Good', category: 'Basic', emoji: '👍' },
    { word: 'EADNI', hint: 'Female parent', translation: 'Mother', category: 'Family', emoji: '👩' },
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const currentWord = words[currentWordIndex];
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZČĐŊŠŦŽ'.split('');
  
  const displayWord = currentWord.word
    .split('')
    .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
    .join(' ');

  const isWon = currentWord.word.split('').every(letter => guessedLetters.includes(letter));
  const isLost = wrongGuesses >= 6;

  const handleLetterClick = (letter: string) => {
    if (guessedLetters.includes(letter) || isWon || isLost) return;

    const newGuessed = [...guessedLetters, letter];
    setGuessedLetters(newGuessed);

    if (!currentWord.word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const handleNext = () => {
    if (currentWordIndex < words.length - 1) {
      if (isWon) setScore(score + 1);
      setCurrentWordIndex(currentWordIndex + 1);
      setGuessedLetters([]);
      setWrongGuesses(0);
      setShowHint(false);
    } else {
      onComplete?.();
      onExit();
    }
  };

  // Keyboard support - type letters directly
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (alphabet.includes(key) && !isWon && !isLost) {
        handleLetterClick(key);
      } else if (e.key === 'Enter' && (isWon || isLost)) {
        handleNext();
      } else if (key === 'H') {
        setShowHint(!showHint);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [guessedLetters, isWon, isLost, showHint]);

  // 3D Hangman SVG Drawing - Progressive body parts
  const HangmanDrawing = () => {
    return (
      <svg viewBox="0 0 200 250" className="w-full h-full">
        {/* Gallows - Always visible */}
        <line x1="20" y1="230" x2="180" y2="230" stroke="#8B4513" strokeWidth="4" strokeLinecap="round" />
        <line x1="50" y1="230" x2="50" y2="20" stroke="#8B4513" strokeWidth="4" strokeLinecap="round" />
        <line x1="50" y1="20" x2="130" y2="20" stroke="#8B4513" strokeWidth="4" strokeLinecap="round" />
        <line x1="130" y1="20" x2="130" y2="50" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />
        
        {/* Mistake 1: Head */}
        {wrongGuesses >= 1 && (
          <g className="animate-bounce" style={{ animationDuration: '0.5s', animationIterationCount: '1' }}>
            <circle cx="130" cy="70" r="20" fill="#FFD700" stroke="#FF6B6B" strokeWidth="3" />
            {/* Face - happy/sad based on game state */}
            <circle cx="123" cy="67" r="2" fill="#333" />
            <circle cx="137" cy="67" r="2" fill="#333" />
            {wrongGuesses >= 3 ? (
              <path d="M 120 78 Q 130 75 140 78" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
            ) : (
              <path d="M 120 75 Q 130 78 140 75" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
            )}
          </g>
        )}
        
        {/* Mistake 2: Body */}
        {wrongGuesses >= 2 && (
          <g className="animate-pulse" style={{ animationDuration: '0.5s', animationIterationCount: '2' }}>
            <line x1="130" y1="90" x2="130" y2="150" stroke="#4A90E2" strokeWidth="8" strokeLinecap="round" />
            {/* Shirt details */}
            <circle cx="130" cy="100" r="3" fill="#FFF" />
            <circle cx="130" cy="110" r="3" fill="#FFF" />
            <circle cx="130" cy="120" r="3" fill="#FFF" />
          </g>
        )}
        
        {/* Mistake 3: Left Arm */}
        {wrongGuesses >= 3 && (
          <g className="animate-pulse" style={{ animationDuration: '0.5s', animationIterationCount: '2' }}>
            <line x1="130" y1="100" x2="100" y2="130" stroke="#FFB6C1" strokeWidth="6" strokeLinecap="round" />
            {/* Hand */}
            <circle cx="100" cy="130" r="4" fill="#FFD700" />
          </g>
        )}
        
        {/* Mistake 4: Right Arm */}
        {wrongGuesses >= 4 && (
          <g className="animate-pulse" style={{ animationDuration: '0.5s', animationIterationCount: '2' }}>
            <line x1="130" y1="100" x2="160" y2="130" stroke="#FFB6C1" strokeWidth="6" strokeLinecap="round" />
            {/* Hand */}
            <circle cx="160" cy="130" r="4" fill="#FFD700" />
          </g>
        )}
        
        {/* Mistake 5: Left Leg */}
        {wrongGuesses >= 5 && (
          <g className="animate-pulse" style={{ animationDuration: '0.5s', animationIterationCount: '2' }}>
            <line x1="130" y1="150" x2="110" y2="190" stroke="#9B59B6" strokeWidth="6" strokeLinecap="round" />
            {/* Foot */}
            <ellipse cx="110" cy="195" rx="8" ry="4" fill="#333" />
          </g>
        )}
        
        {/* Mistake 6: Right Leg */}
        {wrongGuesses >= 6 && (
          <g className="animate-pulse" style={{ animationDuration: '0.5s', animationIterationCount: '2' }}>
            <line x1="130" y1="150" x2="150" y2="190" stroke="#9B59B6" strokeWidth="6" strokeLinecap="round" />
            {/* Foot */}
            <ellipse cx="150" cy="195" rx="8" ry="4" fill="#333" />
          </g>
        )}

        {/* Fun decorative elements when safe */}
        {wrongGuesses === 0 && (
          <g>
            <text x="130" y="120" fontSize="40" textAnchor="middle" fill="#4CAF50">😊</text>
          </g>
        )}
      </svg>
    );
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1668294141622-18e9998a00f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF5ZnVsJTIwM2QlMjBpbGx1c3RyYXRpb24lMjBnYW1lfGVufDF8fHx8MTc2MjE4MDA4MXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="3D Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className={`absolute inset-0 transition-all duration-500 ${
          isWon ? 'bg-gradient-to-b from-green-500/95 to-emerald-500/95' :
          isLost ? 'bg-gradient-to-b from-red-500/95 to-orange-500/95' :
          'bg-gradient-to-b from-purple-500/95 to-pink-500/95'
        }`}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="p-3 pb-2">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={onExit}
              className="text-purple-200 hover:text-white flex items-center gap-1"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1 flex items-center justify-center gap-2">
              <span className="text-2xl">🎯</span>
              <h2 className="text-purple-100">Hangman</h2>
            </div>
          </div>

          {/* Lives and Progress */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[...Array(6)].map((_, i) => (
                <Heart
                  key={i}
                  className={`transition-all ${
                    i < (6 - wrongGuesses) ? 'text-red-400' : 'text-gray-500'
                  }`}
                  fill={i < (6 - wrongGuesses) ? 'currentColor' : 'none'}
                  size={16}
                />
              ))}
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1 border-2 border-white/30">
              <span className="text-white text-sm">
                Word {currentWordIndex + 1}/{words.length}
              </span>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 px-3 pb-3 overflow-y-auto space-y-2">
          {/* 3D Character Being Drawn */}
          <div className={`bg-white/20 backdrop-blur-sm rounded-3xl p-4 border-4 transition-all ${
            isWon ? 'border-green-300' :
            isLost ? 'border-red-400' :
            wrongGuesses >= 4 ? 'border-red-400 animate-pulse' :
            'border-purple-400/50'
          }`}>
            <div className="bg-white/90 rounded-2xl p-4 h-64 flex items-center justify-center relative">
              <HangmanDrawing />
              {wrongGuesses === 0 && (
                <div className="absolute bottom-2 left-0 right-0 text-center">
                  <p className="text-green-600 text-xs">Safe! No mistakes yet! 🎉</p>
                </div>
              )}
            </div>
            <div className="mt-2 flex items-center justify-center gap-2">
              <div className={`px-3 py-1 rounded-full text-xs ${
                wrongGuesses === 0 ? 'bg-green-100 text-green-700' :
                wrongGuesses <= 2 ? 'bg-yellow-100 text-yellow-700' :
                wrongGuesses <= 4 ? 'bg-orange-100 text-orange-700' :
                'bg-red-100 text-red-700'
              }`}>
                {wrongGuesses === 0 ? '✨ Perfect!' :
                 wrongGuesses === 1 ? '😊 1 mistake' :
                 wrongGuesses === 2 ? '😐 2 mistakes' :
                 wrongGuesses === 3 ? '😰 3 mistakes' :
                 wrongGuesses === 4 ? '😱 4 mistakes!' :
                 wrongGuesses === 5 ? '💀 5 mistakes!!' :
                 '☠️ 6 mistakes!!!'}
              </div>
            </div>
          </div>

          {/* Category and Emoji */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 border-2 border-white/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentWord.emoji}</span>
              <div>
                <p className="text-white text-xs">{currentWord.category}</p>
                <p className="text-purple-200 text-[10px]">{currentWord.translation}</p>
              </div>
            </div>
            <button
              onClick={() => setShowHint(!showHint)}
              className="bg-yellow-500/80 hover:bg-yellow-600/80 rounded-xl px-3 py-1 border-2 border-yellow-300 flex items-center gap-1 transition-all active:scale-95"
            >
              <Lightbulb size={14} className="text-white" />
              <span className="text-white text-xs">Hint (H)</span>
            </button>
          </div>

          {/* Hint - toggleable */}
          {showHint && (
            <div className="bg-yellow-500/80 backdrop-blur-sm rounded-2xl p-3 border-2 border-yellow-300 animate-pulse">
              <p className="text-white text-sm text-center">
                💡 {currentWord.hint}
              </p>
            </div>
          )}

          {/* Word Display */}
          <div className={`bg-white/95 backdrop-blur-sm rounded-3xl p-6 border-4 transition-all ${
            isWon ? 'border-green-400 shadow-green-500/50 shadow-2xl' :
            isLost ? 'border-red-400 shadow-red-500/50 shadow-2xl' :
            'border-purple-400/50 shadow-xl'
          }`}>
            <h3 className="text-gray-900 tracking-wider text-center mb-2" style={{ fontSize: '1.75rem', letterSpacing: '0.5rem' }}>
              {displayWord}
            </h3>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="h-2 bg-purple-200 rounded-full flex-1 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${(guessedLetters.filter(l => currentWord.word.includes(l)).length / currentWord.word.split('').filter((v, i, a) => a.indexOf(v) === i).length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Result Messages */}
          {isWon && (
            <div className="bg-green-500/90 backdrop-blur-sm rounded-3xl p-5 border-4 border-green-300 text-center space-y-3 animate-bounce" style={{ animationDuration: '0.5s', animationIterationCount: '3' }}>
              <div className="text-4xl">🎉</div>
              <h3 className="text-white">Čáppa! (Great!)</h3>
              <p className="text-green-100">You guessed: <span className="font-bold">{currentWord.word}</span></p>
              <button
                onClick={handleNext}
                className="w-full h-12 bg-white hover:bg-green-50 text-green-700 rounded-2xl transition-all shadow-xl border-3 border-green-200 active:scale-95"
              >
                {currentWordIndex < words.length - 1 ? '➡️ Next Word' : '🎊 Complete Game'}
              </button>
            </div>
          )}

          {isLost && (
            <div className="bg-red-500/90 backdrop-blur-sm rounded-3xl p-5 border-4 border-red-300 text-center space-y-3">
              <div className="text-4xl">😢</div>
              <h3 className="text-white">Game Over</h3>
              <p className="text-red-100">The word was: <span className="font-bold">{currentWord.word}</span></p>
              <p className="text-red-200 text-sm">({currentWord.translation})</p>
              <button
                onClick={handleNext}
                className="w-full h-12 bg-white hover:bg-red-50 text-red-700 rounded-2xl transition-all shadow-xl border-3 border-red-200 active:scale-95"
              >
                {currentWordIndex < words.length - 1 ? '➡️ Try Next Word' : 'Finish Game'}
              </button>
            </div>
          )}

          {/* Keyboard Controls Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border-2 border-white/30">
            <p className="text-purple-200 text-[10px] text-center">
              ⌨️ Type letters • Enter=next • H=hint
            </p>
          </div>

          {/* Alphabet */}
          {!isWon && !isLost && (
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-3 border-2 border-white/30">
              <h4 className="text-white text-sm text-center mb-2">Tap or type a letter:</h4>
              <div className="flex flex-wrap justify-center gap-1.5">
                {alphabet.map(letter => {
                  const isGuessed = guessedLetters.includes(letter);
                  const isCorrect = currentWord.word.includes(letter);
                  
                  return (
                    <button
                      key={letter}
                      onClick={() => handleLetterClick(letter)}
                      disabled={isGuessed}
                      className={`w-9 h-9 rounded-xl border-2 transition-all text-xs ${
                        isGuessed
                          ? isCorrect
                            ? 'bg-green-500 border-green-300 text-white scale-110'
                            : 'bg-red-500 border-red-400 text-white opacity-40 line-through'
                          : 'bg-white/90 border-purple-300 hover:bg-purple-100 hover:border-purple-400 active:scale-95 hover:scale-105'
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Score */}
          {(isWon || isLost) && (
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 border-2 border-white/30 flex items-center justify-center gap-2">
              <Trophy className="text-yellow-300" size={20} />
              <span className="text-white">Score: {score}/{words.length}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}