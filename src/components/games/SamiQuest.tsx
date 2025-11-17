import { ArrowLeft, Trophy, Map, Compass } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface SamiQuestProps {
  onExit: () => void;
  onComplete?: () => void;
}

interface QuestStep {
  id: number;
  title: string;
  description: string;
  challenge: string;
  options: string[];
  correctAnswer: number;
  reward: number;
  imageUrl: string;
}

export function SamiQuest({ onExit, onComplete }: SamiQuestProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [totalXP, setTotalXP] = useState(0);

  const quest: QuestStep[] = [
    {
      id: 1,
      title: 'The Village',
      description: 'You arrive at a Sami village. An elder greets you.',
      challenge: 'How do you respond to "Bures"?',
      options: ['Bures!', 'Goodbye', 'Maybe later', 'I don\'t know'],
      correctAnswer: 0,
      reward: 25,
      imageUrl: 'https://images.unsplash.com/photo-1761433068624-e1030169a932?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1pJTIwdmlsbGFnZSUyMGN1bHR1cmV8ZW58MXx8fHwxNzYyNDMyOTQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 2,
      title: 'The Reindeer Herder',
      description: 'You meet a reindeer herder who offers help.',
      challenge: 'How do you say "Thank you" in Sami?',
      options: ['Bures', 'Giitu', 'Vuostá', 'Manan'],
      correctAnswer: 1,
      reward: 25,
      imageUrl: 'https://images.unsplash.com/photo-1707550511844-a5d913deb20b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWluZGVlciUyMGFyY3RpY3xlbnwxfHx8fDE3NjI0MzI5NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 3,
      title: 'The Mountain Path',
      description: 'You need to ask for directions.',
      challenge: 'What is "Please" in Northern Sami?',
      options: ['Giitu', 'Bures', 'Vuostá', 'Idja'],
      correctAnswer: 2,
      reward: 25,
      imageUrl: 'https://images.unsplash.com/photo-1558744277-055768e085ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBhdGglMjBoa2ltaW5n8ZW58MXx8fHwxNzYyNDMyOTQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 4,
      title: 'The Sacred Lake',
      description: 'You discover a beautiful lake during the day.',
      challenge: 'What is the Sami word for "Day"?',
      options: ['Idja', 'Beaivi', 'Eahket', 'Iđit'],
      correctAnswer: 1,
      reward: 25,
      imageUrl: 'https://images.unsplash.com/photo-1602151902007-79afc1dd57f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmN0aWMlMjBsYWtlJTIwc2NlbmljfGVufDF8fHx8MTc2MjQzMjk0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 5,
      title: 'The Elder\'s Wisdom',
      description: 'The elder shares ancient wisdom with you.',
      challenge: 'How do you say "Good/Great" in Sami?',
      options: ['Čáppa', 'Buorre', 'Háliidat', 'Vázzit'],
      correctAnswer: 0,
      reward: 50,
      imageUrl: 'https://images.unsplash.com/photo-1729012766654-200ca141e7c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3JkaWMlMjBlbGRlciUyMHdpc2RvbXxlbnwxfHx8fDE3NjI0MzI5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 6,
      title: 'Journey\'s End',
      description: 'Your quest through Sápmi is complete!',
      challenge: 'How do you say "See you later"?',
      options: ['Bures', 'Giitu', 'Oaidnaleapmai', 'Vuostá'],
      correctAnswer: 2,
      reward: 50,
      imageUrl: 'https://images.unsplash.com/photo-1602151902007-79afc1dd57f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmN0aWMlMjBsYWtlJTIwc2NlbmljfGVufDF8fHx8MTc2MjQzMjk0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  const currentQuest = quest[currentStep];
  const progress = ((currentStep + 1) / quest.length) * 100;

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    if (index === currentQuest.correctAnswer) {
      setTotalXP(totalXP + currentQuest.reward);
    }
  };

  const handleNext = () => {
    if (currentStep < quest.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      onComplete?.();
      onExit();
    }
  };

  // Keyboard controls (1-4 for options, Enter for next)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const keyNum = parseInt(e.key);
      if (keyNum >= 1 && keyNum <= 4 && keyNum <= currentQuest.options.length && !showFeedback) {
        handleAnswerSelect(keyNum - 1);
      } else if (e.key === 'Enter' && showFeedback) {
        handleNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentQuest, showFeedback, selectedAnswer, currentStep, totalXP]);

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1668294141622-18e9998a00f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF5ZnVsJTIwM2QlMjBpbGx1c3RyYXRpb24lMjBnYW1lfGVufDF8fHx8MTc2MjE4MDA4MXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="3D Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/90 to-teal-50/90"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={onExit} className="text-emerald-600 hover:text-emerald-700 flex items-center gap-2">
              <ArrowLeft size={24} />
              <span>Exit</span>
            </button>
            <div className="flex-1 flex items-center justify-center gap-2">
              <span className="text-2xl">🗺️</span>
              <h2 className="text-gray-800">Sami Quest</h2>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 h-3 bg-emerald-100 rounded-full overflow-hidden shadow-inner border-2 border-emerald-200">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-emerald-700">
              {currentStep + 1}/{quest.length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="text-emerald-500" size={16} />
              <p className="text-emerald-600">{currentQuest.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" size={16} />
              <p className="text-emerald-700">{totalXP} XP</p>
            </div>
          </div>
        </div>

        <div className="flex-1 px-6 pb-6 overflow-y-auto space-y-3">
          {/* Quest Image */}
          <div className="rounded-3xl overflow-hidden bg-white/90 backdrop-blur-sm shadow-xl border-4 border-emerald-300">
            <ImageWithFallback
              src={currentQuest.imageUrl}
              alt={currentQuest.title}
              className="w-full h-32 object-cover"
            />
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-xl border-4 border-emerald-300">
            <p className="text-gray-700 text-center">{currentQuest.description}</p>
          </div>

          <div className="bg-emerald-100 rounded-3xl p-4 shadow-xl border-4 border-emerald-300">
            <div className="flex items-center gap-2 mb-2">
              <Map className="text-emerald-600" size={20} />
              <h3 className="text-emerald-800">Challenge:</h3>
            </div>
            <p className="text-emerald-700 mb-2">{currentQuest.challenge}</p>
            <p className="text-emerald-600 text-xs text-center">💡 Tap or press 1-4 keys</p>
          </div>

          <div className="space-y-3">
            {currentQuest.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuest.correctAnswer;
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
                      ? 'bg-emerald-50 border-emerald-300'
                      : 'bg-white/90 backdrop-blur-sm border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <span className={
                    showCorrect ? 'text-green-700' :
                    showWrong ? 'text-red-700' :
                    'text-gray-700'
                  }>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="space-y-3">
              <div className={`rounded-2xl p-4 border-4 ${
                selectedAnswer === currentQuest.correctAnswer
                  ? 'bg-green-100 border-green-300'
                  : 'bg-red-100 border-red-300'
              }`}>
                <p className={selectedAnswer === currentQuest.correctAnswer ? 'text-green-800' : 'text-red-800'}>
                  {selectedAnswer === currentQuest.correctAnswer 
                    ? `🎉 Čáppa! +${currentQuest.reward} XP` 
                    : `❌ Try again! Correct: "${currentQuest.options[currentQuest.correctAnswer]}"`
                  }
                </p>
              </div>
              
              <button
                onClick={handleNext}
                className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 border-4 border-emerald-300"
              >
                {currentStep < quest.length - 1 ? '🗺️ Continue Quest' : '🎊 Complete Quest'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}