import { Volume2, Check, X, ArrowLeft, Trophy } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface BasicPhrasesProps {
  onExit: () => void;
  onComplete?: () => void;
}

interface Phrase {
  sami: string;
  english: string;
  context: string;
  options: string[];
  correctAnswer: number;
}

export function BasicPhrases({ onExit, onComplete }: BasicPhrasesProps) {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const phrases: Phrase[] = [
    {
      sami: 'Bures',
      english: 'Hello',
      context: 'Basic greeting',
      options: ['Hello', 'Goodbye', 'Thank you', 'Sorry'],
      correctAnswer: 0,
    },
    {
      sami: 'Maid don namahuvvá?',
      english: 'What is your name?',
      context: 'Asking for name',
      options: ['How are you?', 'What is your name?', 'Where do you live?', 'How old are you?'],
      correctAnswer: 1,
    },
    {
      sami: 'Mun namahuvvan...',
      english: 'My name is...',
      context: 'Introducing yourself',
      options: ['I am from...', 'My name is...', 'I live in...', 'I like...'],
      correctAnswer: 1,
    },
    {
      sami: 'Giitu',
      english: 'Thank you',
      context: 'Expressing gratitude',
      options: ['Sorry', 'Please', 'Thank you', 'Excuse me'],
      correctAnswer: 2,
    },
    {
      sami: 'Vuostá',
      english: 'Please',
      context: 'Polite request',
      options: ['Thank you', 'Please', 'Sorry', 'Welcome'],
      correctAnswer: 1,
    },
    {
      sami: 'Juo',
      english: 'Yes',
      context: 'Affirmation',
      options: ['No', 'Yes', 'Maybe', 'I don\'t know'],
      correctAnswer: 1,
    },
    {
      sami: 'Ii',
      english: 'No',
      context: 'Negation',
      options: ['Yes', 'No', 'Maybe', 'Never'],
      correctAnswer: 1,
    },
    {
      sami: 'Maid don háliidat?',
      english: 'How are you?',
      context: 'Asking about well-being',
      options: ['What do you want?', 'Where are you?', 'How are you?', 'Who are you?'],
      correctAnswer: 2,
    },
  ];

  const currentP = phrases[currentPhrase];
  const progress = ((currentPhrase + 1) / phrases.length) * 100;

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    if (index === currentP.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentPhrase < phrases.length - 1) {
      setCurrentPhrase(currentPhrase + 1);
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
          src="https://images.unsplash.com/photo-1760434685862-5f2b29748cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWJyYW50JTIwM2QlMjBzY2VuZSUyMGNvbG9yZnVsfGVufDF8fHx8MTc2MjE4MDA4Mnww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="3D Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/90 to-blue-50/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onExit}
              className="text-cyan-600 hover:text-cyan-700 flex items-center gap-2"
            >
              <ArrowLeft size={24} />
              <span>Exit</span>
            </button>
            <div className="flex-1 flex items-center justify-center gap-2">
              <span className="text-2xl">💬</span>
              <h2 className="text-gray-800">Basic Phrases</h2>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 h-3 bg-cyan-100 rounded-full overflow-hidden shadow-inner border-2 border-cyan-200">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-cyan-700">
              {currentPhrase + 1}/{phrases.length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-cyan-600">{currentP.context}</p>
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" size={16} />
              <p className="text-cyan-700">Score: {score}/{phrases.length}</p>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 px-6 pb-6 flex flex-col overflow-y-auto">
          <div className="mb-4">
            <p className="text-gray-600 mb-2">What does this phrase mean?</p>
            <h2 className="text-gray-900">{currentP.sami}</h2>
          </div>

          {/* 3D Character Card */}
          <div className="rounded-3xl p-4 mb-4 bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-cyan-200 relative overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1760434600537-024e2771d580?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHJlbmRlciUyMGNoYXJhY3RlciUyMGN1dGV8ZW58MXx8fHwxNzYyMTgwMDgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Character"
              className="w-full h-40 object-cover rounded-2xl mb-3 opacity-80"
            />
            <div className="text-center">
              <button 
                onClick={() => console.log('Playing audio')}
                className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transition-all hover:scale-105 border-4 border-cyan-300 animate-pulse"
                style={{ animationDuration: '2s' }}
              >
                <Volume2 className="text-white" size={30} />
              </button>
              <p className="text-gray-500 mt-2 text-xs">🔊 Tap to listen</p>
            </div>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-4">
            {currentP.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentP.correctAnswer;
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
                      ? 'bg-cyan-50 border-cyan-300'
                      : 'bg-white/90 backdrop-blur-sm border-gray-200 hover:border-cyan-300 hover:bg-cyan-50'
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
                selectedAnswer === currentP.correctAnswer
                  ? 'bg-green-100 border-green-300'
                  : 'bg-red-100 border-red-300'
              }`}>
                <p className={selectedAnswer === currentP.correctAnswer ? 'text-green-800' : 'text-red-800'}>
                  {selectedAnswer === currentP.correctAnswer 
                    ? '🎉 Čáppa! Perfect!' 
                    : `❌ The correct answer is "${currentP.options[currentP.correctAnswer]}"`
                  }
                </p>
              </div>
              
              <button
                onClick={handleNext}
                className="w-full h-14 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 border-4 border-cyan-300"
              >
                {currentPhrase < phrases.length - 1 ? '➡️ Next Phrase' : '🎊 Complete'}
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