import { ArrowLeft, Trophy, Star } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface WordSearchProps {
  onExit: () => void;
  onComplete?: () => void;
}

interface Word {
  word: string;
  translation: string;
}

export function WordSearch({ onExit, onComplete }: WordSearchProps) {
  const words: Word[] = [
    { word: 'BURES', translation: 'Hello' },
    { word: 'GIITU', translation: 'Thank you' },
    { word: 'BEAIVI', translation: 'Day' },
    { word: 'IDJA', translation: 'Night' },
    { word: 'BOAZU', translation: 'Reindeer' },
  ];

  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<number[]>([]);

  // Simple grid for demo (in real app, generate programmatically)
  const grid = [
    ['B', 'U', 'R', 'E', 'S', 'X'],
    ['O', 'G', 'I', 'I', 'T', 'U'],
    ['A', 'B', 'E', 'A', 'I', 'V'],
    ['Z', 'O', 'A', 'Z', 'U', 'I'],
    ['U', 'I', 'D', 'J', 'A', 'X'],
  ];

  const progress = (foundWords.length / words.length) * 100;

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const cellIndex = rowIndex * grid[0].length + colIndex;
    if (selectedCells.includes(cellIndex)) {
      setSelectedCells(selectedCells.filter(c => c !== cellIndex));
    } else {
      setSelectedCells([...selectedCells, cellIndex]);
    }
  };

  const handleCheckWord = () => {
    // Simple word check logic (in real app, implement proper word detection)
    const selectedLetters = selectedCells
      .sort((a, b) => a - b)
      .map(index => {
        const row = Math.floor(index / grid[0].length);
        const col = index % grid[0].length;
        return grid[row][col];
      })
      .join('');

    const matchedWord = words.find(w => w.word === selectedLetters);
    if (matchedWord && !foundWords.includes(matchedWord.word)) {
      setFoundWords([...foundWords, matchedWord.word]);
      setSelectedCells([]);
      
      if (foundWords.length + 1 === words.length) {
        setTimeout(() => {
          onComplete?.();
          onExit();
        }, 1000);
      }
    } else {
      setSelectedCells([]);
    }
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1716392598602-9fb0b4d22ac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGdhbWUlMjBzY2VuZSUyMHBsYXlmdWx8ZW58MXx8fHwxNzYyMTgwMDgyfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="3D Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-50/90 to-teal-50/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onExit}
              className="text-green-600 hover:text-green-700 flex items-center gap-2"
            >
              <ArrowLeft size={24} />
              <span>Exit</span>
            </button>
            <div className="flex-1 flex items-center justify-center gap-2">
              <span className="text-2xl">🔍</span>
              <h2 className="text-gray-800">Word Search</h2>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 h-3 bg-green-100 rounded-full overflow-hidden shadow-inner border-2 border-green-200">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-green-700">
              {foundWords.length}/{words.length}
            </span>
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 px-6 pb-6 overflow-y-auto space-y-4">
          {/* 3D Character */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-xl border-4 border-green-300">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1739513275763-84d4393a84ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwM2QlMjBjaGFyYWN0ZXIlMjBkZXNpZ258ZW58MXx8fHwxNzYyMTgwMDgyfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Character"
              className="w-full h-40 object-cover rounded-2xl mb-3 opacity-80"
            />
            <p className="text-center text-green-700">Find the Sami words! 🔎</p>
          </div>

          {/* Word Grid */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-4 border-green-300">
            <div className="space-y-2">
              {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-2">
                  {row.map((letter, colIndex) => {
                    const cellIndex = rowIndex * grid[0].length + colIndex;
                    const isSelected = selectedCells.includes(cellIndex);
                    
                    return (
                      <button
                        key={colIndex}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        className={`w-12 h-12 rounded-xl border-2 transition-all flex items-center justify-center ${
                          isSelected
                            ? 'bg-green-400 border-green-600 text-white scale-110'
                            : 'bg-white border-green-200 hover:bg-green-50'
                        }`}
                      >
                        <span className="text-gray-800">{letter}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {selectedCells.length > 0 && (
              <button
                onClick={handleCheckWord}
                className="w-full mt-4 h-12 rounded-2xl border-4 border-green-300 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white transition-all shadow-lg"
              >
                Check Word ✓
              </button>
            )}
          </div>

          {/* Word List */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-4 border-green-300 space-y-2">
            <h3 className="text-gray-800 mb-3">Find these words:</h3>
            {words.map((word, index) => (
              <div
                key={index}
                className={`rounded-2xl p-3 border-2 transition-all ${
                  foundWords.includes(word.word)
                    ? 'bg-green-100 border-green-400 line-through'
                    : 'bg-white border-green-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{word.word}</span>
                  <span className="text-sm text-gray-500">{word.translation}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Completion */}
          {foundWords.length === words.length && (
            <div className="bg-green-100 rounded-3xl p-6 shadow-xl border-4 border-green-300 text-center">
              <div className="text-4xl mb-2">🎉</div>
              <h3 className="text-green-800 mb-2">Čáppa! You found all words!</h3>
              <div className="flex items-center justify-center gap-2 mt-3">
                <Trophy className="text-yellow-500" size={20} />
                <span className="text-green-700">+80 XP</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}