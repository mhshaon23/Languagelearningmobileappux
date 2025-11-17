import { Volume2, Check, X, ArrowLeft, Trophy, Languages } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface TranslationTestProps {
  onExit: () => void;
  onComplete?: () => void;
}

interface Translation {
  sami: string;
  english: string;
  category: string;
  options: string[];
  correctAnswer: number;
  direction: 'samiToEnglish' | 'englishToSami';
}

export function TranslationTest({ onExit, onComplete }: TranslationTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const questions: Translation[] = [
    {
      sami: 'Bures',
      english: 'Hello',
      category: 'Greetings',
      options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
      correctAnswer: 0,
      direction: 'samiToEnglish',
    },
    {
      sami: 'Giitu',
      english: 'Thank you',
      category: 'Expressions',
      options: ['Giitu', 'Bures', 'Vuostá', 'Ándagassii'],
      correctAnswer: 0,
      direction: 'englishToSami',
    },
    {
      sami: 'Boazu',
      english: 'Reindeer',
      category: 'Animals',
      options: ['Reindeer', 'Bear', 'Wolf', 'Fox'],
      correctAnswer: 0,
      direction: 'samiToEnglish',
    },
    {
      sami: 'Beaivi',
      english: 'Day',
      category: 'Time',
      options: ['Beaivi', 'Idja', 'Eahket', 'Iđit'],
      correctAnswer: 0,
      direction: 'englishToSami',
    },
    {
      sami: 'Guhkkin',
      english: 'Far',
      category: 'Location',
      options: ['Near', 'Far', 'Here', 'There'],
      correctAnswer: 1,
      direction: 'samiToEnglish',
    },
    {
      sami: 'Čáppa',
      english: 'Good/Great',
      category: 'Expressions',
      options: ['Čáppa', 'Buorre', 'Háliidat', 'Vázzit'],
      correctAnswer: 0,
      direction: 'englishToSami',
    },
    {
      sami: 'Vuostá',
      english: 'Please',
      category: 'Polite Words',
      options: ['Please', 'Thank you', 'Sorry', 'Excuse me'],
      correctAnswer: 0,
      direction: 'samiToEnglish',
    },
    {
      sami: 'Oaidnaleapmai',
      english: 'See you later',
      category: 'Farewells',
      options: ['Oaidnaleapmai', 'Ándagassii', 'Bures', 'Manan'],
      correctAnswer: 0,
      direction: 'englishToSami',
    },
  ];

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    if (index === currentQ.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      onComplete?.();
      onExit();
    }
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1745045650344-fd019ababf92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJ0b29uJTIwc3R5bGUlMjAzZCUyMHJlbmRlcnxlbnwxfHx8fDE3NjIxODAwODJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="3D Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/90 to-purple-50/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onExit}
              className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2"
            >
              <ArrowLeft size={24} />
              <span>Exit</span>
            </button>
            <div className="flex-1 flex items-center justify-center gap-2">
              <span className="text-2xl">🌐</span>
              <h2 className="text-gray-800">Translation Test</h2>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 h-3 bg-indigo-100 rounded-full overflow-hidden shadow-inner border-2 border-indigo-200">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-indigo-700">
              {currentQuestion + 1}/{questions.length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-indigo-600">{currentQ.category}</p>
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" size={16} />
              <p className="text-indigo-700">Score: {score}/{questions.length}</p>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 px-6 pb-6 flex flex-col overflow-y-auto">
          {/* Translation Direction */}
          <div className="mb-4">
            <div className="bg-indigo-100 rounded-2xl p-3 border-4 border-indigo-300 flex items-center justify-center gap-2 mb-4">
              <Languages className="text-indigo-600" size={20} />
              <span className="text-indigo-700">
                {currentQ.direction === 'samiToEnglish' ? 'Sami → English' : 'English → Sami'}
              </span>
            </div>
            <p className="text-gray-600 mb-2">
              {currentQ.direction === 'samiToEnglish' ? 'Translate to English:' : 'Translate to Sami:'}
            </p>
            <h2 className="text-gray-900">
              {currentQ.direction === 'samiToEnglish' ? currentQ.sami : currentQ.english}
            </h2>
          </div>

          {/* 3D Character Card */}
          <div className="rounded-3xl p-4 mb-4 bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-indigo-200 relative overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1739513275763-84d4393a84ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwM2QlMjBjaGFyYWN0ZXIlMjBkZXNpZ258ZW58MXx8fHwxNzYyMTgwMDgyfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Character"
              className="w-full h-40 object-cover rounded-2xl mb-3 opacity-80"
            />
            <div className="text-center">
              <button 
                onClick={() => console.log('Playing audio')}
                className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transition-all hover:scale-105 border-4 border-indigo-300"
              >
                <Volume2 className="text-white" size={30} />
              </button>
              <p className="text-gray-500 mt-2 text-xs">🔊 Listen</p>
            </div>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-4">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQ.correctAnswer;
              const showCorrect = showFeedback && isCorrect;
              const showWrong = showFeedback && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={`w-full rounded-2xl p-4 transition-all border-4 hover:scale-105 active:scale-95 ${
                    showCorrect
                      ? 'bg-green-100 border-green-500 shadow-xl'
                      : showWrong
                      ? 'bg-red-100 border-red-500 shadow-xl'
                      : isSelected
                      ? 'bg-indigo-50 border-indigo-300'
                      : 'bg-white/90 backdrop-blur-sm border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={
                      showCorrect ? 'text-green-700' :
                      showWrong ? 'text-red-700' :
                      'text-gray-700'
                    }>
                      {option}
                    </span>
                    {showCorrect && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="text-white" size={16} />
                      </div>
                    )}
                    {showWrong && (
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <X className="text-white" size={16} />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className="space-y-3">
              <div className={`rounded-2xl p-4 border-4 ${
                selectedAnswer === currentQ.correctAnswer
                  ? 'bg-green-100 border-green-300'
                  : 'bg-red-100 border-red-300'
              }`}>
                <p className={selectedAnswer === currentQ.correctAnswer ? 'text-green-800' : 'text-red-800'}>
                  {selectedAnswer === currentQ.correctAnswer 
                    ? '🎉 Perfect translation!' 
                    : `❌ Correct: "${currentQ.options[currentQ.correctAnswer]}"`
                  }
                </p>
              </div>
              
              <button
                onClick={handleNext}
                className="w-full h-14 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 border-4 border-indigo-300"
              >
                {currentQuestion < questions.length - 1 ? '➡️ Next' : '🎊 Complete'}
              </button>
            </div>
          )}

          {!showFeedback && (
            <button 
              onClick={() => handleNext()}
              className="w-full h-12 border-4 border-gray-300 rounded-2xl bg-white/90 backdrop-blur-sm hover:bg-gray-50 transition-colors text-gray-600"
            >
              Skip ⏭️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}