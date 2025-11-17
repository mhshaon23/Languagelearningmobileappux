import { Volume2, Check, X, ArrowLeft, Star, Trophy } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface GreetingPracticeProps {
  onExit: () => void;
  onComplete?: () => void;
}

interface Greeting {
  id: number;
  sami: string;
  english: string;
  context: string;
  options: string[];
  correctAnswer: number;
}

export function GreetingPractice({ onExit, onComplete }: GreetingPracticeProps) {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const greetings: Greeting[] = [
    {
      id: 1,
      sami: 'Bures',
      english: 'Hello',
      context: 'General greeting',
      options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
      correctAnswer: 0,
    },
    {
      id: 2,
      sami: 'Ipmel ija',
      english: 'Good morning',
      context: 'Morning greeting',
      options: ['Good night', 'Good morning', 'Good evening', 'Good afternoon'],
      correctAnswer: 1,
    },
    {
      id: 3,
      sami: 'Maid don háliidat?',
      english: 'How are you?',
      context: 'Asking someone how they are',
      options: ['Where are you?', 'What is your name?', 'How are you?', 'How old are you?'],
      correctAnswer: 2,
    },
    {
      id: 4,
      sami: 'Mun lean buorre',
      english: 'I am good',
      context: 'Response to "How are you?"',
      options: ['I am tired', 'I am good', 'I am hungry', 'I am sad'],
      correctAnswer: 1,
    },
    {
      id: 5,
      sami: 'Giitu',
      english: 'Thank you',
      context: 'Expressing gratitude',
      options: ['Sorry', 'Please', 'Thank you', 'Excuse me'],
      correctAnswer: 2,
    },
    {
      id: 6,
      sami: 'Vuostá',
      english: 'Please',
      context: 'Polite request',
      options: ['Thank you', 'Please', 'Sorry', 'Excuse me'],
      correctAnswer: 1,
    },
    {
      id: 7,
      sami: 'Ándagassii',
      english: 'Goodbye',
      context: 'Casual farewell',
      options: ['Hello', 'See you later', 'Goodbye', 'Good night'],
      correctAnswer: 2,
    },
    {
      id: 8,
      sami: 'Oaidnaleapmai!',
      english: 'See you later!',
      context: 'Friendly farewell',
      options: ['Good morning', 'See you later!', 'Thank you', 'Welcome'],
      correctAnswer: 1,
    },
  ];

  const currentGreet = greetings[currentGreeting];
  const progress = ((currentGreeting + 1) / greetings.length) * 100;

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    if (index === currentGreet.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentGreeting < greetings.length - 1) {
      setCurrentGreeting(currentGreeting + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      onComplete?.();
      onExit();
    }
  };

  const playAudio = () => {
    console.log('Playing audio for:', currentGreet.sami);
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1733395445556-de9323e37a00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMDNkJTIwYmFja2dyb3VuZCUyMGFic3RyYWN0fGVufDF8fHx8MTc2MjE4MDA4MHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="3D Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-50/90 to-orange-50/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onExit}
              className="text-yellow-600 hover:text-yellow-700 flex items-center gap-2"
            >
              <ArrowLeft size={24} />
              <span>Exit</span>
            </button>
            <div className="flex-1 flex items-center justify-center gap-2">
              <span className="text-2xl">👋</span>
              <h2 className="text-gray-800">Greeting Practice</h2>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 h-3 bg-yellow-100 rounded-full overflow-hidden shadow-inner border-2 border-yellow-200">
              <div 
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-yellow-700 min-w-[3rem]">
              {currentGreeting + 1}/{greetings.length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-yellow-600">{currentGreet.context}</p>
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" size={16} />
              <p className="text-yellow-700">Score: {score}/{greetings.length}</p>
            </div>
          </div>
        </div>

        {/* Question Area */}
        <div className="flex-1 px-6 pb-6 flex flex-col overflow-y-auto">
          <div className="mb-4">
            <p className="text-gray-600 mb-2">What does this greeting mean?</p>
            <h2 className="text-gray-900">{currentGreet.sami}</h2>
          </div>

          {/* 3D Character Card with Audio */}
          <div className="rounded-3xl p-4 mb-4 bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-yellow-200 relative overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1740252117027-4275d3f84385?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGNhcnRvb24lMjBhdmF0YXIlMjBmcmllbmRseXxlbnwxfHx8fDE3NjIxODAwODJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="3D Character"
              className="w-full h-40 object-cover rounded-2xl mb-3 opacity-80"
            />
            <div className="text-center space-y-3">
              <button 
                onClick={playAudio}
                className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transition-all hover:scale-105 border-4 border-yellow-300 animate-pulse"
                style={{ animationDuration: '2s' }}
              >
                <Volume2 className="text-white" size={30} />
              </button>
              <p className="text-gray-500 text-xs flex items-center justify-center gap-2">
                <span>🔊</span>
                Tap to hear the greeting
              </p>
            </div>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-4">
            {currentGreet.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentGreet.correctAnswer;
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
                      ? 'bg-yellow-50 border-yellow-300'
                      : 'bg-white/90 backdrop-blur-sm border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
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

          {/* Feedback & Action */}
          {showFeedback && (
            <div className="space-y-3">
              <div className={`rounded-2xl p-4 border-4 ${
                selectedAnswer === currentGreet.correctAnswer
                  ? 'bg-green-100 border-green-300'
                  : 'bg-red-100 border-red-300'
              }`}>
                <p className={selectedAnswer === currentGreet.correctAnswer ? 'text-green-800' : 'text-red-800'}>
                  {selectedAnswer === currentGreet.correctAnswer 
                    ? '🎉 Perfect! Čáppa! (Great!)' 
                    : `❌ Not quite. The correct answer is "${currentGreet.options[currentGreet.correctAnswer]}"`
                  }
                </p>
              </div>
              
              <button
                onClick={handleNext}
                className="w-full h-14 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 border-4 border-yellow-300"
              >
                {currentGreeting < greetings.length - 1 ? '➡️ Next Greeting' : '🎊 Complete Practice'}
              </button>
            </div>
          )}

          {/* Skip Button */}
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