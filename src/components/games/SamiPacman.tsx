import { ArrowLeft, Trophy, Heart, Zap, Star, Check } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface SamiPacmanProps {
  onExit: () => void;
  onComplete?: () => void;
}

interface Position {
  row: number;
  col: number;
}

interface Ghost {
  id: number;
  position: Position;
  emoji: string;
  name: string;
}

interface WordDot {
  position: Position;
  letter: string;
  word: string;
  collected: boolean;
  isPowerUp: boolean;
}

type CellType = 'wall' | 'path' | 'dot' | 'powerup' | 'empty';

export function SamiPacman({ onExit, onComplete }: SamiPacmanProps) {
  const GRID_SIZE = 11;
  const GAME_SPEED = 400;

  // Sami words to collect
  const samiWords = [
    { word: 'BURES', translation: 'Hello', points: 50 },
    { word: 'GIITU', translation: 'Thank you', points: 50 },
    { word: 'BEAIVI', translation: 'Day', points: 60 },
  ];

  // Create maze layout (1 = wall, 0 = path)
  const createMaze = (): number[][] => {
    const maze = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
    
    // Add outer walls
    for (let i = 0; i < GRID_SIZE; i++) {
      maze[0][i] = 1;
      maze[GRID_SIZE - 1][i] = 1;
      maze[i][0] = 1;
      maze[i][GRID_SIZE - 1] = 1;
    }
    
    // Add internal walls
    for (let i = 3; i < GRID_SIZE - 3; i += 3) {
      for (let j = 2; j < GRID_SIZE - 2; j++) {
        if (j !== Math.floor(GRID_SIZE / 2)) maze[i][j] = 1;
      }
    }
    
    const center = Math.floor(GRID_SIZE / 2);
    for (let i = 2; i < GRID_SIZE - 2; i++) {
      if (i !== center) maze[i][center] = 1;
    }
    
    return maze;
  };

  const [maze] = useState(createMaze());
  const [pacmanPos, setPacmanPos] = useState<Position>({ row: 1, col: 1 });
  const [pacmanDirection, setPacmanDirection] = useState<'up' | 'down' | 'left' | 'right'>('right');
  const [ghosts, setGhosts] = useState<Ghost[]>([
    { id: 1, position: { row: 1, col: GRID_SIZE - 2 }, emoji: '👻', name: 'Boo' },
    { id: 2, position: { row: GRID_SIZE - 2, col: 1 }, emoji: '😈', name: 'Devil' },
  ]);
  const [wordDots, setWordDots] = useState<WordDot[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isPoweredUp, setIsPoweredUp] = useState(false);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [collectedWords, setCollectedWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState('');
  const [mouthOpen, setMouthOpen] = useState(true);
  const [message, setMessage] = useState('Collect Sami words! 🎮');

  // Initialize word dots
  useEffect(() => {
    const dots: WordDot[] = [];
    let wordIndex = 0;
    
    for (let row = 1; row < GRID_SIZE - 1; row++) {
      for (let col = 1; col < GRID_SIZE - 1; col++) {
        if (maze[row][col] === 0 && !(row === 1 && col === 1)) {
          const currentWordData = samiWords[wordIndex % samiWords.length];
          const letterIndex = dots.filter(d => d.word === currentWordData.word).length;
          
          if (letterIndex < currentWordData.word.length) {
            dots.push({
              position: { row, col },
              letter: currentWordData.word[letterIndex],
              word: currentWordData.word,
              collected: false,
              isPowerUp: letterIndex === 0,
            });
          }
          
          if (letterIndex + 1 >= currentWordData.word.length) {
            wordIndex++;
          }
        }
      }
    }
    
    setWordDots(dots);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMouthOpen(prev => !prev);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const movePacman = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameStatus !== 'playing') return;
    
    const newPos = { ...pacmanPos };
    
    switch (direction) {
      case 'up':
        newPos.row = Math.max(0, newPos.row - 1);
        break;
      case 'down':
        newPos.row = Math.min(GRID_SIZE - 1, newPos.row + 1);
        break;
      case 'left':
        newPos.col = Math.max(0, newPos.col - 1);
        break;
      case 'right':
        newPos.col = Math.min(GRID_SIZE - 1, newPos.col + 1);
        break;
    }
    
    if (maze[newPos.row][newPos.col] !== 1) {
      setPacmanPos(newPos);
      setPacmanDirection(direction);
      
      const dotIndex = wordDots.findIndex(
        d => !d.collected && d.position.row === newPos.row && d.position.col === newPos.col
      );
      
      if (dotIndex !== -1) {
        const dot = wordDots[dotIndex];
        const newWordDots = [...wordDots];
        newWordDots[dotIndex].collected = true;
        setWordDots(newWordDots);
        
        setCurrentWord(prev => prev + dot.letter);
        setScore(prev => prev + (dot.isPowerUp ? 20 : 10));
        setMessage(`+${dot.isPowerUp ? 20 : 10} ${dot.letter}`);
        
        const wordData = samiWords.find(w => w.word === dot.word);
        const wordCompleted = newWordDots
          .filter(d => d.word === dot.word && d.collected)
          .length === dot.word.length;
        
        if (wordCompleted && wordData) {
          setCollectedWords(prev => [...prev, dot.word]);
          setScore(prev => prev + wordData.points);
          setMessage(`🎉 ${wordData.word} (${wordData.translation})! +${wordData.points}!`);
          setCurrentWord('');
          
          const allWordsCollected = samiWords.every(w => 
            [...collectedWords, dot.word].includes(w.word)
          );
          
          if (allWordsCollected) {
            setGameStatus('won');
            setTimeout(() => {
              onComplete?.();
            }, 3000);
          }
        }
        
        if (dot.isPowerUp) {
          setIsPoweredUp(true);
          setMessage('⚡ Power-up! Chase the ghosts!');
          setTimeout(() => setIsPoweredUp(false), 5000);
        }
      }
    }
  }, [pacmanPos, maze, wordDots, gameStatus, collectedWords, samiWords, onComplete]);

  useEffect(() => {
    if (gameStatus !== 'playing') return;
    
    const interval = setInterval(() => {
      setGhosts(prevGhosts => 
        prevGhosts.map(ghost => {
          const directions: Array<'up' | 'down' | 'left' | 'right'> = ['up', 'down', 'left', 'right'];
          const validMoves = directions.filter(dir => {
            const newPos = { ...ghost.position };
            
            switch (dir) {
              case 'up': newPos.row--; break;
              case 'down': newPos.row++; break;
              case 'left': newPos.col--; break;
              case 'right': newPos.col++; break;
            }
            
            return newPos.row >= 0 && newPos.row < GRID_SIZE &&
                   newPos.col >= 0 && newPos.col < GRID_SIZE &&
                   maze[newPos.row][newPos.col] !== 1;
          });
          
          if (validMoves.length > 0) {
            const randomDir = validMoves[Math.floor(Math.random() * validMoves.length)];
            const newPos = { ...ghost.position };
            
            switch (randomDir) {
              case 'up': newPos.row--; break;
              case 'down': newPos.row++; break;
              case 'left': newPos.col--; break;
              case 'right': newPos.col++; break;
            }
            
            return { ...ghost, position: newPos };
          }
          
          return ghost;
        })
      );
    }, GAME_SPEED);
    
    return () => clearInterval(interval);
  }, [gameStatus, maze]);

  useEffect(() => {
    if (gameStatus !== 'playing') return;
    
    const collision = ghosts.some(
      ghost => ghost.position.row === pacmanPos.row && ghost.position.col === pacmanPos.col
    );
    
    if (collision) {
      if (isPoweredUp) {
        setScore(prev => prev + 100);
        setMessage('👻 Ghost eaten! +100!');
      } else {
        setLives(prev => {
          const newLives = prev - 1;
          if (newLives <= 0) {
            setGameStatus('lost');
            setMessage('Game Over! 😢');
          } else {
            setMessage(`💔 Ouch! ${newLives} lives left!`);
          }
          return newLives;
        });
        setPacmanPos({ row: 1, col: 1 });
      }
    }
  }, [pacmanPos, ghosts, gameStatus, isPoweredUp]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          e.preventDefault();
          movePacman('up');
          break;
        case 'ArrowDown':
        case 's':
          e.preventDefault();
          movePacman('down');
          break;
        case 'ArrowLeft':
        case 'a':
          e.preventDefault();
          movePacman('left');
          break;
        case 'ArrowRight':
        case 'd':
          e.preventDefault();
          movePacman('right');
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePacman]);

  const getPacmanEmoji = () => {
    if (!mouthOpen) return '🟡';
    
    switch (pacmanDirection) {
      case 'up': return '🔼';
      case 'down': return '🔽';
      case 'left': return '◀️';
      case 'right': return '▶️';
      default: return '😮';
    }
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1716392598602-9fb0b4d22ac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGdhbWUlMjBzY2VuZSUyMHBsYXlmdWx8ZW58MXx8fHwxNzYyMTgwMDgyfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="3D Background"
          className="w-full h-full object-cover opacity-20"
        />
        {/* WCAG compliant darker background */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/98 to-purple-950/98"></div>
      </div>

      {/* Content - Fixed structure */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header - Fixed */}
        <div className="p-3 pb-2 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={onExit}
              className="text-yellow-300 hover:text-yellow-200 flex items-center gap-1"
              aria-label="Exit game"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1 flex items-center justify-center gap-2">
              <span className="text-2xl" aria-hidden="true">👾</span>
              <h2 className="text-yellow-300">Sami Pac-Man</h2>
            </div>
          </div>

          {/* Stats - WCAG compliant */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 bg-yellow-900/40 px-3 py-1 rounded-full border-2 border-yellow-400">
              <Trophy className="text-yellow-300" size={16} />
              <span className="text-yellow-100">{score}</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(lives)].map((_, i) => (
                <Heart key={i} className="text-red-400" fill="currentColor" size={16} />
              ))}
            </div>
            {isPoweredUp && (
              <div className="flex items-center gap-1 bg-purple-900/40 px-3 py-1 rounded-full border-2 border-purple-300 animate-pulse">
                <Zap className="text-purple-200" size={16} />
                <span className="text-purple-100 text-xs">POWER!</span>
              </div>
            )}
          </div>
        </div>

        {/* Game Area - Flexible with minimum height */}
        <div className="flex-1 px-3 pb-3 min-h-0 relative">
          {/* Game content container - always visible */}
          <div className="h-full flex flex-col gap-2 overflow-y-auto">
            {/* Message - Fixed height */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-2 border-2 border-yellow-400/70 flex-shrink-0">
              <div className="flex items-center gap-2">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1739513275763-84d4393a84ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwM2QlMjBjaGFyYWN0ZXIlMjBkZXNpZ258ZW58MXx8fHwxNzYyMTgwMDgyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Guide character"
                  className="w-10 h-10 object-cover rounded-xl border-2 border-yellow-400"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-yellow-100 text-xs truncate">{message}</p>
                  {currentWord && (
                    <p className="text-purple-200 text-xs truncate">Collecting: {currentWord}...</p>
                  )}
                </div>
              </div>
            </div>

            {/* Game Maze - Fixed aspect ratio, always visible */}
            <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-2 border-4 border-blue-400/70 shadow-2xl flex-shrink-0">
              <div 
                className="grid gap-[2px] w-full mx-auto"
                style={{ 
                  gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                  maxWidth: '100%'
                }}
              >
                {maze.map((row, rowIndex) =>
                  row.map((cell, colIndex) => {
                    const isPacman = pacmanPos.row === rowIndex && pacmanPos.col === colIndex;
                    const ghost = ghosts.find(g => g.position.row === rowIndex && g.position.col === colIndex);
                    const dot = wordDots.find(d => !d.collected && d.position.row === rowIndex && d.position.col === colIndex);
                    
                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`aspect-square flex items-center justify-center transition-all ${
                          cell === 1
                            ? 'bg-blue-600 border border-blue-400 rounded-sm'
                            : 'bg-blue-950/60'
                        }`}
                      >
                        {isPacman && (
                          <span className="text-[20px] sm:text-[24px] animate-pulse leading-none" aria-label="Pac-Man">{getPacmanEmoji()}</span>
                        )}
                        {ghost && (
                          <span className={`text-[20px] sm:text-[24px] leading-none ${isPoweredUp ? 'animate-bounce opacity-50' : 'animate-pulse'}`} aria-label={`Ghost ${ghost.name}`}>
                            {isPoweredUp ? '😱' : ghost.emoji}
                          </span>
                        )}
                        {dot && !isPacman && !ghost && (
                          <span className={dot.isPowerUp ? 'text-yellow-300 text-[14px] sm:text-[16px] animate-pulse leading-none' : 'text-yellow-200 text-[10px] sm:text-[12px] leading-none'} aria-label={`Letter ${dot.letter}`}>
                            {dot.isPowerUp ? '⭐' : dot.letter}
                          </span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Control Buttons - Fixed */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-3 border-2 border-yellow-400/70 flex-shrink-0">
              <p className="text-yellow-100 text-xs text-center mb-2">Controls</p>
              <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto">
                <div></div>
                <button
                  onClick={() => movePacman('up')}
                  className="aspect-square bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl border-3 border-blue-300 flex items-center justify-center active:scale-95 transition-all shadow-lg"
                  aria-label="Move up"
                >
                  <span className="text-xl">⬆️</span>
                </button>
                <div></div>
                <button
                  onClick={() => movePacman('left')}
                  className="aspect-square bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl border-3 border-blue-300 flex items-center justify-center active:scale-95 transition-all shadow-lg"
                  aria-label="Move left"
                >
                  <span className="text-xl">⬅️</span>
                </button>
                <button
                  onClick={() => movePacman('down')}
                  className="aspect-square bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl border-3 border-blue-300 flex items-center justify-center active:scale-95 transition-all shadow-lg"
                  aria-label="Move down"
                >
                  <span className="text-xl">⬇️</span>
                </button>
                <button
                  onClick={() => movePacman('right')}
                  className="aspect-square bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl border-3 border-blue-300 flex items-center justify-center active:scale-95 transition-all shadow-lg"
                  aria-label="Move right"
                >
                  <span className="text-xl">➡️</span>
                </button>
              </div>
              <p className="text-yellow-100 text-[10px] text-center mt-2">Or use arrow keys / WASD</p>
            </div>

            {/* Word Progress - Compact */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-3 border-2 border-yellow-400/70 flex-shrink-0">
              <h3 className="text-yellow-100 text-sm flex items-center gap-2 mb-2">
                <Star className="text-yellow-300" size={14} />
                Words to Collect
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {samiWords.map((word) => (
                  <div
                    key={word.word}
                    className={`rounded-xl p-2 border-2 transition-all text-center ${
                      collectedWords.includes(word.word)
                        ? 'bg-green-700/40 border-green-400'
                        : 'bg-purple-800/40 border-purple-300'
                    }`}
                  >
                    {collectedWords.includes(word.word) ? (
                      <Check className="text-green-200 mx-auto" size={16} aria-label={`${word.word} collected`} />
                    ) : (
                      <span className="text-white text-xs">{word.word}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Overlay screens - positioned absolutely to prevent layout shift */}
          {gameStatus !== 'playing' && (
            <div className="absolute inset-0 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm z-10">
              {/* Win Screen */}
              {gameStatus === 'won' && (
                <div className="bg-gradient-to-br from-green-700/95 to-emerald-700/95 backdrop-blur-sm rounded-3xl p-6 border-4 border-green-400 text-center w-full max-w-sm animate-bounce" style={{ animationDuration: '1s', animationIterationCount: '2' }}>
                  <div className="text-6xl mb-3" aria-hidden="true">🎉</div>
                  <h3 className="text-white mb-2">Čáppa! (Great!)</h3>
                  <p className="text-green-100 mb-4">You collected all Sami words!</p>
                  <div className="flex items-center justify-center gap-2 bg-white/20 rounded-2xl p-3 border-2 border-white/50 mb-4">
                    <Trophy className="text-yellow-200" size={24} />
                    <span className="text-white">Score: {score} points!</span>
                  </div>
                  <button
                    onClick={onExit}
                    className="w-full h-12 bg-green-600 hover:bg-green-500 rounded-2xl border-2 border-green-300 text-white transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={18} />
                    <span>Back to Games</span>
                  </button>
                </div>
              )}

              {/* Game Over Screen */}
              {gameStatus === 'lost' && (
                <div className="bg-gradient-to-br from-red-700/95 to-orange-700/95 backdrop-blur-sm rounded-3xl p-6 border-4 border-red-400 text-center w-full max-w-sm">
                  <div className="text-6xl mb-3" aria-hidden="true">😢</div>
                  <h3 className="text-white mb-2">Game Over!</h3>
                  <p className="text-red-100 mb-4">Try again to collect more words!</p>
                  <button
                    onClick={onExit}
                    className="w-full h-12 bg-red-600 hover:bg-red-500 rounded-2xl border-2 border-red-300 text-white transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={18} />
                    <span>Back to Games</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
