import { Volume2, Check, X, ArrowLeft, Star, Trophy } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface MultipleChoiceMasterProps {
  onExit: () => void;
  onComplete?: () => void;
}

interface Question {
  id: number;
  samiWord: string;
  english: string;
  options: string[];
  correctAnswer: number;
  category: string;
  imageUrl: string;
}

export function MultipleChoiceMaster({ onExit, onComplete }: MultipleChoiceMasterProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const questions: Question[] = [
    {
      id: 1,
      samiWord: 'Bures',
      english: 'What does this greeting mean?',
      options: ['Goodbye', 'Hello', 'Thank you', 'Please'],
      correctAnswer: 1,
      category: 'Greetings',
      imageUrl: 'https://images.unsplash.com/photo-1461532257246-777de18cd58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVldGluZyUyMGhhbmRzaGFrZSUyMGZyaWVuZGx5fGVufDF8fHx8MTc2MjQzMjk0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 2,
      samiWord: 'Giitu',
      english: 'What does this word mean?',
      options: ['Hello', 'Thank you', 'Goodbye', 'Sorry'],
      correctAnswer: 1,
      category: 'Common Phrases',
      imageUrl: 'https://images.unsplash.com/photo-1727377202632-d69857701847?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFuayUyMHlvdSUyMGdyYXRpdHVkZXxlbnwxfHx8fDE3NjI0MzE0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 3,
      samiWord: 'Maid don namahuvvá?',
      english: 'What does this phrase mean?',
      options: ['How are you?', 'What is your name?', 'Where are you from?', 'Nice to meet you'],
      correctAnswer: 1,
      category: 'Questions',
      imageUrl: 'https://images.unsplash.com/photo-1461532257246-777de18cd58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVldGluZyUyMGhhbmRzaGFrZSUyMGZyaWVuZGx5fGVufDF8fHx8MTc2MjQzMjk0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 4,
      samiWord: 'Vuostá',
      english: 'What does this word mean?',
      options: ['Hello', 'Please', 'Goodbye', 'Sorry'],
      correctAnswer: 1,
      category: 'Common Phrases',
      imageUrl: 'https://images.unsplash.com/photo-1727377202632-d69857701847?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFuayUyMHlvdSUyMGdyYXRpdHVkZXxlbnwxfHx8fDE3NjI0MzE0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 5,
      samiWord: 'Guhkkin',
      english: 'What does this word mean?',
      options: ['Near', 'Far', 'Here', 'There'],
      correctAnswer: 1,
      category: 'Location',
      imageUrl: 'https://images.unsplash.com/photo-1558744277-055768e085ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBhdGglMjBoaWtpbmd8ZW58MXx8fHwxNzYyNDMyOTQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 6,
      samiWord: 'Boađe',
      english: 'What does this word mean?',
      options: ['Go', 'Come', 'Stay', 'Leave'],
      correctAnswer: 1,
      category: 'Verbs',
      imageUrl: 'https://images.unsplash.com/photo-1558744277-055768e085ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBhdGglMjBoaWtpbmd8ZW58MXx8fHwxNzYyNDMyOTQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 7,
      samiWord: 'Mus lea gárrii',
      english: 'What does this phrase mean?',
      options: ['I am hungry', 'I am tired', 'I am happy', 'I am cold'],
      correctAnswer: 0,
      category: 'Feelings',
      imageUrl: 'https://images.unsplash.com/photo-1685358268305-c621b38e75d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMG51bWJlcnMlMjBsZWFybmluZ3xlbnwxfHx8fDE3NjI0MzI5NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 8,
      samiWord: 'Beaivi',
      english: 'What does this word mean?',
      options: ['Night', 'Day', 'Morning', 'Evening'],
      correctAnswer: 1,
      category: 'Time',
      imageUrl: 'https://images.unsplash.com/photo-1602151902007-79afc1dd57f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmN0aWMlMjBsYWtlJTIwc2NlbmljfGVufDF8fHx8MTc2MjQzMjk0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
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

  const playAudio = () => {
    console.log('Playing audio for:', currentQ.samiWord);
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
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/90 to-indigo-50/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onExit}
              className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              <ArrowLeft size={24} />
              <span>Exit</span>
            </button>
            <div className="flex-1 flex items-center justify-center gap-2">
              <span className="text-2xl">✅</span>
              <h2 className="text-gray-800">Multiple Choice Master</h2>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 h-3 bg-blue-100 rounded-full overflow-hidden shadow-inner border-2 border-blue-200">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-blue-700 min-w-[3rem]">
              {currentQuestion + 1}/{questions.length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-blue-600">{currentQ.category}</p>
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" size={16} />
              <p className="text-blue-700">Score: {score}/{questions.length}</p>
            </div>
          </div>
        </div>

        {/* Question Area */}
        <div className="flex-1 px-6 pb-6 flex flex-col overflow-y-auto">
          <div className="mb-3">
            <p className="text-gray-600 mb-2">{currentQ.english}</p>
            <h2 className="text-gray-900">{currentQ.samiWord}</h2>
          </div>

          {/* Contextual Image */}
          <div className="rounded-3xl overflow-hidden mb-3 bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-blue-200">
            <ImageWithFallback
              src={currentQ.imageUrl}
              alt={currentQ.category}
              className="w-full h-48 object-cover"
            />
            <div className="text-center py-2">
              <button 
                onClick={playAudio}
                className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transition-all hover:scale-105 border-4 border-blue-300 animate-pulse"
                style={{ animationDuration: '2s' }}
              >
                <Volume2 className="text-white" size={28} />
              </button>
            </div>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-3">
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
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-white/90 backdrop-blur-sm border-gray-200 hover:border-blue-300 hover:bg-blue-50'
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
                selectedAnswer === currentQ.correctAnswer
                  ? 'bg-green-100 border-green-300'
                  : 'bg-red-100 border-red-300'
              }`}>
                <p className={selectedAnswer === currentQ.correctAnswer ? 'text-green-800' : 'text-red-800'}>
                  {selectedAnswer === currentQ.correctAnswer 
                    ? '🎉 Excellent! Čáppa! (Great!)' 
                    : `❌ Not quite. The correct answer is "${currentQ.options[currentQ.correctAnswer]}"`
                  }
                </p>
              </div>
              
              <button
                onClick={handleNext}
                className="w-full h-14 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 border-4 border-blue-300"
              >
                {currentQuestion < questions.length - 1 ? '➡️ Next Question' : '🎊 Complete Game'}
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