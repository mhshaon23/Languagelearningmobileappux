import { ArrowLeft, Trophy, Shuffle, Star, Zap, Check, X, Lightbulb } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface SamiScrabbleProps {
  onExit: () => void;
  onComplete?: () => void;
}

interface Letter {
  char: string;
  points: number;
  used: boolean;
  id: number;
}

interface Word {
  word: string;
  translation: string;
  points: number;
}

export function SamiScrabble({ onExit, onComplete }: SamiScrabbleProps) {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [currentWord, setCurrentWord] = useState('');
  const [foundWords, setFoundWords] = useState<Word[]>([]);
  const [message, setMessage] = useState('Create Sami words from the tiles! 🎲');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [hint, setHint] = useState('');
  const [combo, setCombo] = useState(0);
  const [animatingTiles, setAnimatingTiles] = useState<number[]>([]);

  // Northern Sami words that can be made
  const validWords = [
    { word: 'BURES', translation: 'Hello', points: 50, hint: 'How to greet someone' },
    { word: 'GIITU', translation: 'Thank you', points: 50, hint: 'Express gratitude' },
    { word: 'BUORRE', translation: 'Good', points: 60, hint: 'Something positive' },
    { word: 'BEAIVI', translation: 'Day', points: 60, hint: 'Opposite of night' },
    { word: 'IDJA', translation: 'Night', points: 40, hint: 'When stars appear' },
    { word: 'BOAZU', translation: 'Reindeer', points: 50, hint: 'Important Sami animal' },
    { word: 'VUOSTÁ', translation: 'Please', points: 60, hint: 'Polite request' },
    { word: 'ÁNBBAR', translation: 'Apple', points: 60, hint: 'A fruit' },
    { word: 'GAHPIR', translation: 'Cap', points: 60, hint: 'Worn on head' },
    { word: 'BEANA', translation: 'Dog', points: 50, hint: 'Loyal pet' },
    { word: 'BIILA', translation: 'Car', points: 50, hint: 'Vehicle' },
    { word: 'GÁHKKU', translation: 'Cake', points: 60, hint: 'Sweet dessert' },
  ];

  // Letter sets for different rounds
  const letterSets = [
    // Round 1: Easy words
    [
      { char: 'B', points: 3 }, { char: 'U', points: 1 }, { char: 'R', points: 1 },
      { char: 'E', points: 1 }, { char: 'S', points: 1 }, { char: 'G', points: 2 },
      { char: 'I', points: 1 }, { char: 'T', points: 1 },
    ],
    // Round 2: Medium words
    [
      { char: 'B', points: 3 }, { char: 'O', points: 1 }, { char: 'A', points: 1 },
      { char: 'Z', points: 5 }, { char: 'U', points: 1 }, { char: 'E', points: 1 },
      { char: 'V', points: 2 }, { char: 'I', points: 1 },
    ],
    // Round 3: Hard words
    [
      { char: 'V', points: 2 }, { char: 'U', points: 1 }, { char: 'O', points: 1 },
      { char: 'S', points: 1 }, { char: 'T', points: 1 }, { char: 'Á', points: 3 },
      { char: 'P', points: 2 }, { char: 'R', points: 1 },
    ],
  ];

  useEffect(() => {
    initializeRound(1);
  }, []);

  const initializeRound = (roundNumber: number) => {
    const letterSet = letterSets[Math.min(roundNumber - 1, letterSets.length - 1)];
    const newLetters = letterSet.map((letter, index) => ({
      ...letter,
      used: false,
      id: index,
    }));
    setLetters(newLetters);
    setCurrentWord('');
    setMessage(`Round ${roundNumber}! Create Sami words! 🎲`);
    setHint('');
  };

  const handleLetterClick = (letter: Letter) => {
    if (letter.used) return;
    
    setAnimatingTiles([...animatingTiles, letter.id]);
    setTimeout(() => {
      setAnimatingTiles(animatingTiles.filter(id => id !== letter.id));
    }, 300);

    setCurrentWord(currentWord + letter.char);
    setLetters(letters.map(l => 
      l.id === letter.id ? { ...l, used: true } : l
    ));
  };

  const calculateWordPoints = (word: string) => {
    let points = 0;
    for (let char of word) {
      const letter = letters.find(l => l.char === char && l.used);
      if (letter) points += letter.points;
    }
    return points;
  };

  const handleSubmit = () => {
    const wordUpper = currentWord.toUpperCase();
    const matchedWord = validWords.find(w => w.word === wordUpper);
    
    if (matchedWord && !foundWords.find(w => w.word === wordUpper)) {
      // Success!
      const wordPoints = calculateWordPoints(currentWord) * 10;
      const comboBonus = combo * 10;
      const totalPoints = matchedWord.points + wordPoints + comboBonus;
      
      setScore(score + totalPoints);
      setFoundWords([...foundWords, { ...matchedWord, points: totalPoints }]);
      setCombo(combo + 1);
      setShowSuccess(true);
      setMessage(`🎉 ${matchedWord.word}! (${matchedWord.translation}) +${totalPoints} points!`);
      
      setTimeout(() => setShowSuccess(false), 2000);
      
      // Check if we should advance to next round
      if (foundWords.length + 1 >= 3) {
        setTimeout(() => {
          if (round < 3) {
            setRound(round + 1);
            initializeRound(round + 1);
            setFoundWords([]);
            setCombo(0);
            setMessage('🎊 Round Complete! Next level!');
          } else {
            setMessage('🏆 Game Complete! You mastered Sami Scrabble!');
            setTimeout(() => {
              onComplete?.();
              onExit();
            }, 2000);
          }
        }, 2000);
      } else {
        // Reset for next word
        setTimeout(() => {
          initializeRound(round);
        }, 1500);
      }
    } else if (foundWords.find(w => w.word === wordUpper)) {
      // Already found
      setShowError(true);
      setMessage('❌ Already found that word!');
      setTimeout(() => {
        setShowError(false);
        handleClear();
      }, 1500);
      setCombo(0);
    } else {
      // Invalid word
      setShowError(true);
      setMessage('❌ Not a valid Sami word! Try again!');
      setTimeout(() => {
        setShowError(false);
        handleClear();
      }, 1500);
      setCombo(0);
    }
  };

  const handleClear = () => {
    setCurrentWord('');
    setLetters(letters.map(l => ({ ...l, used: false })));
    setMessage('Create Sami words from the tiles! 🎲');
  };

  const handleShuffle = () => {
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
    setLetters(shuffled.map((l, index) => ({ ...l, id: index })));
    setMessage('🔄 Tiles shuffled!');
  };

  const handleHint = () => {
    const unusedWords = validWords.filter(vw => 
      !foundWords.find(fw => fw.word === vw.word) &&
      canMakeWord(vw.word)
    );
    
    if (unusedWords.length > 0) {
      const randomWord = unusedWords[Math.floor(Math.random() * unusedWords.length)];
      setHint(`💡 Try: "${randomWord.hint}" (${randomWord.word.length} letters)`);
      setMessage('Hint revealed! 💡');
    } else {
      setHint('💡 No more words available with these tiles!');
    }
  };

  const canMakeWord = (word: string): boolean => {
    const availableLetters = letters.map(l => l.char);
    for (let char of word) {
      const index = availableLetters.indexOf(char);
      if (index === -1) return false;
      availableLetters.splice(index, 1);
    }
    return true;
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      
      // Type letters - find first unused matching letter
      const matchingLetter = letters.find(l => l.char === key && !l.used);
      if (matchingLetter) {
        handleLetterClick(matchingLetter);
      }
      // Enter to submit
      else if (e.key === 'Enter' && currentWord.length > 0) {
        handleSubmit();
      }
      // Backspace to remove last letter
      else if (e.key === 'Backspace' && currentWord.length > 0) {
        const lastChar = currentWord[currentWord.length - 1];
        const lastLetter = [...letters].reverse().find(l => l.char === lastChar && l.used);
        if (lastLetter) {
          setLetters(letters.map(l => 
            l.id === lastLetter.id ? { ...l, used: false } : l
          ));
          setCurrentWord(currentWord.slice(0, -1));
        }
      }
      // Escape to clear
      else if (e.key === 'Escape') {
        handleClear();
      }
      // Space to shuffle
      else if (e.key === ' ') {
        e.preventDefault();
        handleShuffle();
      }
      // H for hint
      else if (key === 'H') {
        handleHint();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentWord, letters]);

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1668294141622-18e9998a00f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF5ZnVsJTIwM2QlMjBpbGx1c3RyYXRpb24lMjBnYW1lfGVufDF8fHx8MTc2MjE4MDA4MXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="3D Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/95 to-orange-900/95"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="p-3 pb-2">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={onExit}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1 flex items-center justify-center gap-2">
              <span className="text-2xl">🎲</span>
              <h2 className="text-amber-300">Sami Scrabble</h2>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 bg-amber-400/20 px-3 py-1 rounded-full border-2 border-amber-400">
              <Trophy className="text-amber-400" size={16} />
              <span className="text-amber-300">{score}</span>
            </div>
            <div className="bg-purple-400/20 px-3 py-1 rounded-full border-2 border-purple-400">
              <span className="text-purple-300">Round {round}/3</span>
            </div>
            {combo > 0 && (
              <div className="flex items-center gap-1 bg-green-400/20 px-3 py-1 rounded-full border-2 border-green-400 animate-pulse">
                <Zap className="text-green-400" size={16} />
                <span className="text-green-300 text-xs">x{combo}</span>
              </div>
            )}
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 px-3 pb-3 overflow-y-auto space-y-2">
          {/* Character Guide */}
          <div className={`bg-white/10 backdrop-blur-sm rounded-3xl p-2 border-2 transition-all ${
            showSuccess ? 'border-green-400 animate-pulse' : 
            showError ? 'border-red-400 animate-pulse' : 
            'border-amber-400/50'
          }`}>
            <div className="flex items-center gap-2">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1629459347138-b34fcc7603cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGNhcnRvb24lMjBjaGFyYWN0ZXIlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzYyMTgwMDc5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Guide Character"
                className={`w-14 h-14 object-cover rounded-xl border-2 transition-all ${
                  showSuccess ? 'border-green-400 scale-110' : 
                  showError ? 'border-red-400' : 
                  'border-amber-400'
                }`}
              />
              <div className="flex-1">
                <p className={`text-xs transition-colors ${
                  showSuccess ? 'text-green-300' : 
                  showError ? 'text-red-300' : 
                  'text-amber-300'
                }`}>
                  {message}
                </p>
                {hint && (
                  <p className="text-purple-300 text-xs mt-1">{hint}</p>
                )}
              </div>
            </div>
          </div>

          {/* Current Word Display */}
          <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-5 border-4 border-amber-500/50 shadow-2xl">
            <div className="min-h-[72px] bg-amber-50/20 rounded-2xl border-3 border-amber-400/30 flex items-center justify-center px-2">
              {currentWord ? (
                <div className="flex gap-2 justify-center flex-wrap">
                  {currentWord.split('').map((char, index) => (
                    <div
                      key={index}
                      className="w-12 h-14 bg-gradient-to-br from-amber-200 to-orange-200 rounded-lg border-2 border-amber-400 flex items-center justify-center shadow-lg animate-bounce"
                      style={{ animationDelay: `${index * 0.1}s`, animationDuration: '0.5s', animationIterationCount: '1' }}
                    >
                      <span className="text-gray-900 text-2xl">{char}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-amber-300">Make a word...</p>
              )}
            </div>
          </div>

          {/* Letter Tiles */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-3 border-2 border-amber-400/50">
            <p className="text-amber-300 text-xs text-center mb-2">📱 Tap tiles or type letters</p>
            <div className="grid grid-cols-4 gap-2">
              {letters.map((letter) => (
                <button
                  key={letter.id}
                  onClick={() => handleLetterClick(letter)}
                  disabled={letter.used}
                  className={`aspect-square rounded-2xl border-4 transition-all shadow-lg flex flex-col items-center justify-center relative ${
                    letter.used
                      ? 'bg-gray-400/20 border-gray-500 opacity-40 cursor-not-allowed'
                      : 'bg-gradient-to-br from-amber-200 to-orange-200 border-amber-400 hover:scale-110 active:scale-95 hover:shadow-2xl'
                  } ${animatingTiles.includes(letter.id) ? 'animate-ping' : ''}`}
                >
                  <span className={`text-2xl ${letter.used ? 'text-gray-500' : 'text-gray-900'}`}>
                    {letter.char}
                  </span>
                  <span className={`text-[10px] absolute bottom-1 right-1 ${letter.used ? 'text-gray-500' : 'text-amber-700'}`}>
                    {letter.points}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleHint}
              className="h-12 bg-purple-500/80 hover:bg-purple-600/80 rounded-2xl border-3 border-purple-300 text-white transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
            >
              <Lightbulb size={18} />
              <span>Hint (H)</span>
            </button>
            <button
              onClick={handleShuffle}
              className="h-12 bg-blue-500/80 hover:bg-blue-600/80 rounded-2xl border-3 border-blue-300 text-white transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
            >
              <Shuffle size={18} />
              <span>Shuffle (Space)</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleClear}
              className="h-12 bg-gray-500/80 hover:bg-gray-600/80 rounded-2xl border-3 border-gray-300 text-white transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
            >
              <X size={18} />
              <span>Clear (Esc)</span>
            </button>
            <button
              onClick={handleSubmit}
              disabled={currentWord.length === 0}
              className="h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-2xl border-3 border-green-300 text-white transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95"
            >
              <Check size={18} />
              <span>Submit (Enter)</span>
            </button>
          </div>

          {/* Keyboard Controls Guide */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border-2 border-amber-400/50">
            <p className="text-amber-300 text-[10px] text-center">
              ⌨️ Type letters • Enter=submit • Backspace=undo • Esc=clear • Space=shuffle • H=hint
            </p>
          </div>

          {/* Found Words */}
          {foundWords.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-3 border-2 border-green-400/50 space-y-2">
              <h3 className="text-green-400 text-sm flex items-center gap-2">
                <Star className="text-green-400" size={16} />
                Found Words ({foundWords.length})
              </h3>
              {foundWords.map((word, index) => (
                <div
                  key={index}
                  className="bg-green-500/20 rounded-xl p-2 border-2 border-green-400 flex items-center justify-between"
                >
                  <div>
                    <p className="text-white text-sm">{word.word}</p>
                    <p className="text-green-300 text-xs">{word.translation}</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Trophy size={14} />
                    <span className="text-xs">+{word.points}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Progress to next round */}
          {foundWords.length > 0 && foundWords.length < 3 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border-2 border-purple-400/50">
              <p className="text-purple-300 text-xs text-center">
                🎯 Find {3 - foundWords.length} more word{3 - foundWords.length !== 1 ? 's' : ''} to advance!
              </p>
              <div className="mt-2 h-2 bg-purple-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${(foundWords.length / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}