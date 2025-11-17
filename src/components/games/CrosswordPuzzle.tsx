import { ArrowLeft, Check, Trophy, Lightbulb, Sparkles, Volume2, PartyPopper } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CrosswordPuzzleProps {
  onExit: () => void;
  onComplete?: () => void;
}

interface Word {
  word: string;
  clue: string;
  englishClue: string;
  direction: 'across' | 'down';
  startRow: number;
  startCol: number;
  number: number;
}

interface CellData {
  letter: string;
  revealed: boolean;
  number?: number;
  isPartOfWord: boolean;
}

export function CrosswordPuzzle({ onExit, onComplete }: CrosswordPuzzleProps) {
  const GRID_SIZE = 9;

  const words: Word[] = [
    { word: 'BURES', clue: 'Common greeting', englishClue: 'Hello', direction: 'across', startRow: 1, startCol: 1, number: 1 },
    { word: 'BUORRE', clue: 'Positive word', englishClue: 'Good', direction: 'down', startRow: 1, startCol: 1, number: 1 },
    { word: 'GIITU', clue: 'Expression of gratitude', englishClue: 'Thank you', direction: 'across', startRow: 3, startCol: 2, number: 2 },
    { word: 'BEAIVI', clue: 'Opposite of night', englishClue: 'Day', direction: 'across', startRow: 5, startCol: 1, number: 3 },
    { word: 'IDJA', clue: 'When you sleep', englishClue: 'Night', direction: 'down', startRow: 3, startCol: 4, number: 4 },
    { word: 'BOAZU', clue: 'Important Sami animal', englishClue: 'Reindeer', direction: 'across', startRow: 7, startCol: 3, number: 5 },
  ];

  const [grid, setGrid] = useState<CellData[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [completedWords, setCompletedWords] = useState<number[]>([]);
  const [hints, setHints] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [characterMessage, setCharacterMessage] = useState('Tap a clue to start! 🧩');

  // Initialize grid
  useEffect(() => {
    const newGrid: CellData[][] = Array(GRID_SIZE)
      .fill(null)
      .map(() =>
        Array(GRID_SIZE)
          .fill(null)
          .map(() => ({ letter: '', revealed: false, isPartOfWord: false }))
      );

    // Place words in grid
    words.forEach((word) => {
      for (let i = 0; i < word.word.length; i++) {
        const row = word.direction === 'across' ? word.startRow : word.startRow + i;
        const col = word.direction === 'across' ? word.startCol + i : word.startCol;
        
        if (row < GRID_SIZE && col < GRID_SIZE) {
          newGrid[row][col] = {
            letter: word.word[i],
            revealed: false,
            number: i === 0 ? word.number : undefined,
            isPartOfWord: true,
          };
        }
      }
    });

    setGrid(newGrid);
  }, []);

  const progress = (completedWords.length / words.length) * 100;

  const handleClueClick = (word: Word) => {
    setSelectedWord(word);
    setSelectedCell({ row: word.startRow, col: word.startCol });
    setCharacterMessage(`🎯 Find: ${word.englishClue} (${word.word.length} letters)`);
  };

  const handleCellClick = (row: number, col: number) => {
    if (grid[row][col].isPartOfWord) {
      setSelectedCell({ row, col });
    }
  };

  const handleRevealLetter = () => {
    if (!selectedCell || !selectedWord) return;
    
    const newGrid = [...grid];
    const { row, col } = selectedCell;
    
    if (!newGrid[row][col].revealed) {
      newGrid[row][col] = { ...newGrid[row][col], revealed: true };
      setGrid(newGrid);
      setScore(score - 5);
      setCharacterMessage('💡 Letter revealed! Keep going!');
      
      // Check if word is complete
      checkWordCompletion(selectedWord, newGrid);
    }
  };

  const handleRevealWord = () => {
    if (!selectedWord || completedWords.includes(selectedWord.number)) return;
    
    const newGrid = [...grid];
    
    for (let i = 0; i < selectedWord.word.length; i++) {
      const row = selectedWord.direction === 'across' ? selectedWord.startRow : selectedWord.startRow + i;
      const col = selectedWord.direction === 'across' ? selectedWord.startCol + i : selectedWord.startCol;
      
      if (row < GRID_SIZE && col < GRID_SIZE) {
        newGrid[row][col] = { ...newGrid[row][col], revealed: true };
      }
    }
    
    setGrid(newGrid);
    setHints([...hints, selectedWord.number]);
    setScore(score - 20);
    setCompletedWords([...completedWords, selectedWord.number]);
    setCharacterMessage('🌟 Word revealed! Try the next one!');
    setSelectedWord(null);
  };

  const checkWordCompletion = (word: Word, currentGrid: CellData[][]) => {
    let isComplete = true;
    
    for (let i = 0; i < word.word.length; i++) {
      const row = word.direction === 'across' ? word.startRow : word.startRow + i;
      const col = word.direction === 'across' ? word.startCol + i : word.startCol;
      
      if (row < GRID_SIZE && col < GRID_SIZE) {
        if (!currentGrid[row][col].revealed) {
          isComplete = false;
          break;
        }
      }
    }
    
    if (isComplete && !completedWords.includes(word.number)) {
      setCompletedWords([...completedWords, word.number]);
      const bonus = hints.includes(word.number) ? 20 : 50;
      setScore(score + bonus);
      setCharacterMessage(`🎉 Čáppa! (Great!) +${bonus} points!`);
      
      if (completedWords.length + 1 === words.length) {
        setShowCelebration(true);
        setTimeout(() => {
          onComplete?.();
          onExit();
        }, 3000);
      }
    }
  };

  const handleLetterInput = (letter: string) => {
    if (!selectedCell) return;
    
    const newGrid = [...grid];
    const { row, col } = selectedCell;
    
    if (newGrid[row][col].isPartOfWord && !newGrid[row][col].revealed) {
      const correctLetter = newGrid[row][col].letter;
      
      if (letter.toUpperCase() === correctLetter) {
        newGrid[row][col] = { ...newGrid[row][col], revealed: true };
        setGrid(newGrid);
        setScore(score + 10);
        setCharacterMessage('✅ Correct! Buorre! (Good!)');
        
        // Move to next cell
        if (selectedWord) {
          const nextPos = getNextCellPosition(row, col, selectedWord);
          if (nextPos) {
            setSelectedCell(nextPos);
          }
          
          // Check word completion
          checkWordCompletion(selectedWord, newGrid);
        }
      } else {
        setCharacterMessage('❌ Try again! Keep guessing!');
      }
    }
  };

  const getNextCellPosition = (row: number, col: number, word: Word) => {
    if (word.direction === 'across') {
      const newCol = col + 1;
      if (newCol < word.startCol + word.word.length && newCol < GRID_SIZE) {
        return { row, col: newCol };
      }
    } else {
      const newRow = row + 1;
      if (newRow < word.startRow + word.word.length && newRow < GRID_SIZE) {
        return { row: newRow, col };
      }
    }
    return null;
  };

  const playAudio = () => {
    if (selectedWord) {
      console.log('Playing audio for:', selectedWord.word);
      setCharacterMessage(`🔊 "${selectedWord.word}" - ${selectedWord.englishClue}`);
    }
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1760434685862-5f2b29748cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWJyYW50JTIwM2QlMjBzY2VuZSUyMGNvbG9yZnVsfGVufDF8fHx8MTc2MjE4MDA4Mnww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="3D Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/90 to-blue-50/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="p-4 pb-3">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={onExit}
              className="text-purple-600 hover:text-purple-700 flex items-center gap-2"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1 flex items-center justify-center gap-2">
              <span className="text-2xl">📝</span>
              <h2 className="text-gray-800">Sami Crossword</h2>
            </div>
            <div className="flex items-center gap-1 bg-purple-100 px-3 py-1 rounded-full border-2 border-purple-300">
              <Trophy className="text-yellow-500" size={16} />
              <span className="text-purple-700 text-sm">{score}</span>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-purple-100 rounded-full overflow-hidden border-2 border-purple-200">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-purple-700 text-sm min-w-[3rem]">
              {completedWords.length}/{words.length}
            </span>
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 px-4 pb-4 overflow-y-auto space-y-3">
          {/* 3D Character Helper with Animation */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-3 shadow-xl border-4 border-purple-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-4xl animate-bounce">✨</div>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1629459347138-b34fcc7603cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGNhcnRvb24lMjBjaGFyYWN0ZXIlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzYyMTgwMDc5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Helper Character"
                  className="w-20 h-20 object-cover rounded-2xl border-2 border-purple-200"
                />
                {showCelebration && (
                  <div className="absolute -top-2 -right-2">
                    <PartyPopper className="text-yellow-500 animate-bounce" size={24} />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-purple-700 text-sm">{characterMessage}</p>
              </div>
            </div>
          </div>

          {/* Crossword Grid */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-xl border-4 border-purple-300">
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                  const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                  const isPartOfSelectedWord = selectedWord && (
                    (selectedWord.direction === 'across' && 
                      rowIndex === selectedWord.startRow && 
                      colIndex >= selectedWord.startCol && 
                      colIndex < selectedWord.startCol + selectedWord.word.length) ||
                    (selectedWord.direction === 'down' && 
                      colIndex === selectedWord.startCol && 
                      rowIndex >= selectedWord.startRow && 
                      rowIndex < selectedWord.startRow + selectedWord.word.length)
                  );

                  return (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      disabled={!cell.isPartOfWord}
                      className={`aspect-square relative flex items-center justify-center text-xs transition-all ${
                        !cell.isPartOfWord
                          ? 'bg-gray-200 cursor-not-allowed'
                          : isSelected
                          ? 'bg-purple-300 border-4 border-purple-500 shadow-lg scale-110 z-10'
                          : isPartOfSelectedWord
                          ? 'bg-purple-100 border-2 border-purple-400'
                          : cell.revealed
                          ? 'bg-green-100 border-2 border-green-400'
                          : 'bg-white border-2 border-purple-200 hover:bg-purple-50 hover:scale-105'
                      } rounded-lg`}
                    >
                      {cell.number && (
                        <span className="absolute top-0 left-0.5 text-[8px] text-purple-600">
                          {cell.number}
                        </span>
                      )}
                      {cell.revealed && (
                        <span className="text-gray-900">{cell.letter}</span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Letter Input Keyboard */}
          {selectedCell && selectedWord && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-3 shadow-xl border-4 border-purple-300 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-gray-800 text-sm flex items-center gap-2">
                  <span>{selectedWord.direction === 'across' ? '→' : '↓'}</span>
                  <span>{selectedWord.number}. {selectedWord.clue}</span>
                </h4>
                <button
                  onClick={playAudio}
                  className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-all"
                >
                  <Volume2 className="text-white" size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-9 gap-1">
                {['A', 'Á', 'B', 'C', 'Č', 'D', 'Đ', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ŋ', 'O', 'P', 'R', 'S', 'Š', 'T', 'Ŧ', 'U', 'V', 'Z', 'Ž'].map((letter) => (
                  <button
                    key={letter}
                    onClick={() => handleLetterInput(letter)}
                    className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 border-2 border-purple-300 rounded-lg text-xs active:scale-95 transition-all hover:scale-110"
                  >
                    {letter}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleRevealLetter}
                  className="flex-1 h-10 rounded-2xl border-3 border-yellow-300 bg-yellow-100 hover:bg-yellow-200 transition-all flex items-center justify-center gap-1 text-sm"
                >
                  <Lightbulb className="text-yellow-600" size={16} />
                  <span className="text-yellow-700">Letter (-5)</span>
                </button>
                <button
                  onClick={handleRevealWord}
                  className="flex-1 h-10 rounded-2xl border-3 border-orange-300 bg-orange-100 hover:bg-orange-200 transition-all flex items-center justify-center gap-1 text-sm"
                >
                  <Sparkles className="text-orange-600" size={16} />
                  <span className="text-orange-700">Word (-20)</span>
                </button>
              </div>
            </div>
          )}

          {/* Clues List */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-xl border-4 border-purple-300 space-y-2">
            <h3 className="text-gray-800 flex items-center gap-2 mb-2">
              <span>📋</span>
              <span>Clues</span>
            </h3>
            
            {/* Across */}
            <div className="space-y-2">
              <p className="text-purple-700 text-sm">→ Across</p>
              {words.filter(w => w.direction === 'across').map((word) => (
                <button
                  key={word.number}
                  onClick={() => handleClueClick(word)}
                  className={`w-full text-left rounded-xl p-2 border-2 transition-all text-sm ${
                    completedWords.includes(word.number)
                      ? 'bg-green-100 border-green-400 opacity-60'
                      : selectedWord?.number === word.number
                      ? 'bg-purple-100 border-purple-400 shadow-lg scale-105'
                      : 'bg-white border-purple-200 hover:border-purple-300 hover:scale-105'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">
                      <span className="text-purple-600">{word.number}.</span> {word.clue} ({word.word.length})
                    </span>
                    {completedWords.includes(word.number) && (
                      <Check className="text-green-500" size={16} />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Down */}
            <div className="space-y-2">
              <p className="text-purple-700 text-sm">↓ Down</p>
              {words.filter(w => w.direction === 'down').map((word) => (
                <button
                  key={word.number}
                  onClick={() => handleClueClick(word)}
                  className={`w-full text-left rounded-xl p-2 border-2 transition-all text-sm ${
                    completedWords.includes(word.number)
                      ? 'bg-green-100 border-green-400 opacity-60'
                      : selectedWord?.number === word.number
                      ? 'bg-purple-100 border-purple-400 shadow-lg scale-105'
                      : 'bg-white border-purple-200 hover:border-purple-300 hover:scale-105'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">
                      <span className="text-purple-600">{word.number}.</span> {word.clue} ({word.word.length})
                    </span>
                    {completedWords.includes(word.number) && (
                      <Check className="text-green-500" size={16} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Completion Celebration */}
          {showCelebration && (
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-6 shadow-xl border-4 border-green-300 text-center animate-pulse">
              <div className="text-6xl mb-3 animate-bounce">🎉</div>
              <h3 className="text-green-800 mb-2">Čáppa! (Great!)</h3>
              <p className="text-green-700 mb-3">You completed the crossword!</p>
              <div className="flex items-center justify-center gap-2 bg-white/50 rounded-2xl p-3 border-2 border-green-300">
                <Trophy className="text-yellow-500 animate-spin" size={24} style={{ animationDuration: '3s' }} />
                <span className="text-green-800">Final Score: {score} points!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
