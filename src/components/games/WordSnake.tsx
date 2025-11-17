import { ArrowLeft, Trophy, Heart, Star } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface WordSnakeProps {
  onExit: () => void;
  onComplete?: () => void;
}

interface Position {
  x: number;
  y: number;
}

interface Letter {
  char: string;
  position: Position;
  collected: boolean;
}

interface WordPair {
  sami: string;
  english: string;
  showSami: boolean; // true = show Sami, collect English; false = show English, collect Sami
}

const GRID_SIZE = 15;
const CELL_SIZE = 25;

export function WordSnake({ onExit, onComplete }: WordSnakeProps) {
  const wordPairs: WordPair[] = [
    { sami: 'BURES', english: 'HELLO', showSami: true },
    { sami: 'GIITU', english: 'THANK', showSami: false },
    { sami: 'BEAIVI', english: 'DAY', showSami: true },
    { sami: 'BOAZU', english: 'DEER', showSami: false },
    { sami: 'IDJA', english: 'NIGHT', showSami: true },
    { sami: 'VUOSTA', english: 'PLEASE', showSami: false },
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [snake, setSnake] = useState<Position[]>([{ x: 7, y: 7 }]);
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [letters, setLetters] = useState<Letter[]>([]);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const directionRef = useRef(direction);

  const currentWord = wordPairs[currentWordIndex];
  const targetWord = currentWord.showSami ? currentWord.english : currentWord.sami;
  const displayWord = currentWord.showSami ? currentWord.sami : currentWord.english;

  // Generate letters on the board
  const generateLetters = () => {
    const newLetters: Letter[] = [];
    const positions = new Set<string>();
    
    for (let i = 0; i < targetWord.length; i++) {
      let pos: Position;
      let attempts = 0;
      
      // Find a unique position that's not occupied
      do {
        pos = {
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        };
        attempts++;
      } while (
        (positions.has(`${pos.x},${pos.y}`) || (pos.x === 7 && pos.y === 7)) && 
        attempts < 100
      );
      
      positions.add(`${pos.x},${pos.y}`);
      
      newLetters.push({
        char: targetWord[i],
        position: pos,
        collected: false,
      });
    }
    
    setLetters(newLetters);
    setCurrentLetterIndex(0);
  };

  // Initialize letters when component mounts or word changes
  useEffect(() => {
    generateLetters();
    setSnake([{ x: 7, y: 7 }]);
    setDirection({ x: 1, y: 0 });
    directionRef.current = { x: 1, y: 0 };
  }, [currentWordIndex]);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      const key = e.key.toLowerCase();
      const currentDir = directionRef.current;

      switch (key) {
        case 'arrowup':
        case 'w':
          if (currentDir.y === 0) {
            setDirection({ x: 0, y: -1 });
            directionRef.current = { x: 0, y: -1 };
          }
          e.preventDefault();
          break;
        case 'arrowdown':
        case 's':
          if (currentDir.y === 0) {
            setDirection({ x: 0, y: 1 });
            directionRef.current = { x: 0, y: 1 };
          }
          e.preventDefault();
          break;
        case 'arrowleft':
        case 'a':
          if (currentDir.x === 0) {
            setDirection({ x: -1, y: 0 });
            directionRef.current = { x: -1, y: 0 };
          }
          e.preventDefault();
          break;
        case 'arrowright':
        case 'd':
          if (currentDir.x === 0) {
            setDirection({ x: 1, y: 0 });
            directionRef.current = { x: 1, y: 0 };
          }
          e.preventDefault();
          break;
        case ' ':
          setIsPaused(!isPaused);
          e.preventDefault();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver, isPaused]);

  // Touch/Swipe controls
  const [touchStart, setTouchStart] = useState<Position | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const currentDir = directionRef.current;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 30 && currentDir.x === 0) {
        setDirection({ x: 1, y: 0 });
        directionRef.current = { x: 1, y: 0 };
      } else if (deltaX < -30 && currentDir.x === 0) {
        setDirection({ x: -1, y: 0 });
        directionRef.current = { x: -1, y: 0 };
      }
    } else {
      if (deltaY > 30 && currentDir.y === 0) {
        setDirection({ x: 0, y: 1 });
        directionRef.current = { x: 0, y: 1 };
      } else if (deltaY < -30 && currentDir.y === 0) {
        setDirection({ x: 0, y: -1 });
        directionRef.current = { x: 0, y: -1 };
      }
    }

    setTouchStart(null);
  };

  // Game loop
  useEffect(() => {
    if (gameOver || isPaused) return;

    const gameLoop = setInterval(() => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        const newHead = {
          x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
          y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
        };

        // Check self collision
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setLives(prev => {
            const newLives = prev - 1;
            if (newLives <= 0) {
              setGameOver(true);
            }
            return newLives;
          });
          // Reset snake position
          return [{ x: 7, y: 7 }];
        }

        // Check letter collision
        const letterIndex = letters.findIndex(
          letter => !letter.collected && letter.position.x === newHead.x && letter.position.y === newHead.y
        );

        if (letterIndex !== -1) {
          const letter = letters[letterIndex];
          
          // Check if it's the correct letter in sequence
          if (letterIndex === currentLetterIndex) {
            // Correct letter!
            setLetters(prev => {
              const updated = [...prev];
              updated[letterIndex].collected = true;
              return updated;
            });
            setCurrentLetterIndex(prev => prev + 1);
            setScore(prev => prev + 10);
            
            // Check if word is complete
            if (currentLetterIndex + 1 === targetWord.length) {
              setTimeout(() => {
                if (currentWordIndex < wordPairs.length - 1) {
                  setCurrentWordIndex(prev => prev + 1);
                  setScore(prev => prev + 50); // Bonus for completing word
                } else {
                  // Game complete!
                  onComplete?.();
                  onExit();
                }
              }, 500);
            }
            
            // Grow snake
            return [newHead, ...prevSnake];
          } else {
            // Wrong letter - penalty!
            setMistakes(prev => prev + 1);
            setLives(prev => {
              const newLives = prev - 1;
              if (newLives <= 0) {
                setGameOver(true);
              }
              return newLives;
            });
            setScore(prev => Math.max(0, prev - 5));
            // Don't grow snake
            return [newHead, ...prevSnake.slice(0, -1)];
          }
        }

        // Normal movement
        return [newHead, ...prevSnake.slice(0, -1)];
      });
    }, 200);

    return () => clearInterval(gameLoop);
  }, [direction, gameOver, isPaused, letters, currentLetterIndex, currentWordIndex]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const handleRestart = () => {
    setCurrentWordIndex(0);
    setSnake([{ x: 7, y: 7 }]);
    setDirection({ x: 1, y: 0 });
    directionRef.current = { x: 1, y: 0 };
    setScore(0);
    setLives(3);
    setMistakes(0);
    setGameOver(false);
    setIsPaused(false);
    generateLetters();
  };

  // Build collected word display
  const collectedWord = letters
    .slice(0, currentLetterIndex)
    .map(l => l.char)
    .join('');

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1716392598602-9fb0b4d22ac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGdhbWUlMjBzY2VuZSUyMHBsYXlmdWx8ZW58MXx8fHwxNzYyMTgwMDgyfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="3D Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-lime-50/90 to-green-50/90"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="p-4 pb-2">
          <div className="flex items-center gap-2 mb-2">
            <button onClick={onExit} className="text-lime-600 hover:text-lime-700 flex items-center gap-1">
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1 flex items-center justify-center gap-2">
              <span className="text-2xl">🐍</span>
              <h2 className="text-gray-800">Word Snake</h2>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className={`transition-all ${i < lives ? 'text-red-500' : 'text-gray-400'}`}
                  fill={i < lives ? 'currentColor' : 'none'}
                  size={16}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" size={16} />
              <span className="text-lime-700">{score}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="text-blue-500" size={16} />
              <span className="text-lime-700">{currentWordIndex + 1}/{wordPairs.length}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 px-4 pb-4 space-y-2 overflow-y-auto">
          {/* Word Display */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-3 shadow-xl border-4 border-lime-300">
            <div className="text-center space-y-2">
              <p className="text-lime-700 text-xs">
                {currentWord.showSami ? '🇳🇴 Translate from Sami:' : '🇬🇧 Translate from English:'}
              </p>
              <h2 className="text-gray-900 tracking-wider">{displayWord}</h2>
              <div className="flex items-center justify-center gap-1">
                {targetWord.split('').map((letter, idx) => (
                  <div
                    key={idx}
                    className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${
                      idx < currentLetterIndex
                        ? 'bg-green-500 border-green-600 text-white scale-110'
                        : idx === currentLetterIndex
                        ? 'bg-yellow-300 border-yellow-500 text-gray-900 animate-pulse'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    <span className="text-xs">{idx < currentLetterIndex ? letter : idx === currentLetterIndex ? '?' : '·'}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600">
                Collect: <span className="text-lime-700">{collectedWord || '...'}</span>
                {currentLetterIndex < targetWord.length && (
                  <span className="text-yellow-600 ml-1 animate-pulse">
                    → Next: {targetWord[currentLetterIndex]}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Game Canvas */}
          <div 
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-2 shadow-xl border-4 border-lime-300 relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="mx-auto relative"
              style={{ 
                width: `${GRID_SIZE * CELL_SIZE}px`, 
                height: `${GRID_SIZE * CELL_SIZE}px`,
                backgroundColor: '#f0fdf4',
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
                borderRadius: '12px',
                border: '2px solid #86efac'
              }}
            >
              {/* Snake */}
              {snake.map((segment, index) => (
                <div
                  key={index}
                  className={`absolute rounded-lg transition-all ${
                    index === 0 
                      ? 'bg-gradient-to-br from-lime-500 to-green-600 border-2 border-lime-300 z-10' 
                      : 'bg-lime-400 z-5'
                  }`}
                  style={{
                    left: `${segment.x * CELL_SIZE}px`,
                    top: `${segment.y * CELL_SIZE}px`,
                    width: `${CELL_SIZE - 2}px`,
                    height: `${CELL_SIZE - 2}px`,
                  }}
                >
                  {index === 0 && (
                    <div className="w-full h-full flex items-center justify-center text-xs text-white">
                      {direction.x === 1 ? '→' : direction.x === -1 ? '←' : direction.y === -1 ? '↑' : '↓'}
                    </div>
                  )}
                </div>
              ))}

              {/* Letters */}
              {letters.map((letter, index) => {
                if (letter.collected) return null;
                
                const isNext = index === currentLetterIndex;
                const isWrong = index !== currentLetterIndex;
                
                return (
                  <div
                    key={index}
                    className={`absolute rounded-lg border-2 flex items-center justify-center transition-all ${
                      isNext
                        ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 border-yellow-600 animate-pulse shadow-lg'
                        : 'bg-gradient-to-br from-gray-200 to-gray-300 border-gray-400'
                    }`}
                    style={{
                      left: `${letter.position.x * CELL_SIZE}px`,
                      top: `${letter.position.y * CELL_SIZE}px`,
                      width: `${CELL_SIZE - 2}px`,
                      height: `${CELL_SIZE - 2}px`,
                      zIndex: 3,
                    }}
                  >
                    <span className={`text-xs ${isNext ? 'text-gray-900' : 'text-gray-600'}`}>
                      {letter.char}
                    </span>
                  </div>
                );
              })}

              {/* Pause overlay */}
              {isPaused && !gameOver && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-20">
                  <div className="bg-white rounded-2xl p-3 text-center">
                    <div className="text-2xl mb-1">⏸️</div>
                    <p className="text-gray-700 text-sm">Paused</p>
                    <p className="text-xs text-gray-500 mt-1">Press Space</p>
                  </div>
                </div>
              )}

              {/* Game Over overlay */}
              {gameOver && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg z-20">
                  <div className="bg-white rounded-2xl p-3 text-center">
                    <div className="text-2xl mb-1">💀</div>
                    <h3 className="text-red-700 text-sm">Game Over!</h3>
                    <p className="text-xs text-gray-600 mt-1">Score: {score}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-lime-100 rounded-2xl p-2 border-2 border-lime-300">
            <p className="text-lime-800 text-center text-xs">
              🎮 Arrow Keys/WASD/Swipe • Eat letters in order • Yellow = Next letter
            </p>
          </div>

          {/* Game Over Actions */}
          {gameOver && (
            <div className="space-y-2">
              <div className="bg-red-100 rounded-3xl p-3 shadow-xl border-4 border-red-300 text-center">
                <div className="text-3xl mb-1">💔</div>
                <h3 className="text-red-800 text-sm">Out of Lives!</h3>
                <p className="text-red-700 text-xs">Final Score: {score}</p>
                <p className="text-red-600 text-xs mt-1">Mistakes: {mistakes}</p>
              </div>
              
              <button
                onClick={handleRestart}
                className="w-full h-10 bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 border-3 border-lime-300 text-sm"
              >
                🔄 Play Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
