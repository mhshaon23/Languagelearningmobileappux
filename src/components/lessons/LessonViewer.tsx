import { ArrowLeft, Volume2, Star, Trophy, BookOpen, Ear, Pencil, Mic, CheckCircle2, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface LessonViewerProps {
  lessonId: number;
  onExit: () => void;
  onComplete?: () => void;
}

interface VocabCard {
  id: number;
  sami: string;
  english: string;
  pronunciation?: string;
  emoji?: string;
  audioUrl?: string;
}

interface Lesson {
  id: number;
  title: string;
  description: string;
  emoji: string;
  vocabulary: VocabCard[];
}

type LearningMode = 'reading' | 'listening' | 'writing' | 'speaking';

export function LessonViewer({ lessonId, onExit, onComplete }: LessonViewerProps) {
  const [mode, setMode] = useState<LearningMode>('reading');
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [completedModes, setCompletedModes] = useState<Set<LearningMode>>(new Set());
  const [writingAnswers, setWritingAnswers] = useState<{ [key: number]: string }>({});
  const [speakingCompleted, setSpeakingCompleted] = useState<Set<number>>(new Set());
  const [listeningRevealed, setListeningRevealed] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);

  // A1 Level Northern Sami Lessons
  const lessons: Lesson[] = [
    {
      id: 1,
      title: 'Basic Greetings',
      description: 'Essential Sami greetings',
      emoji: '👋',
      vocabulary: [
        { id: 1, sami: 'Bures', english: 'Hello', pronunciation: 'BOO-res', emoji: '👋' },
        { id: 2, sami: 'Buorre eahket', english: 'Good morning', pronunciation: 'BWOR-reh EAH-ket', emoji: '🌅' },
        { id: 3, sami: 'Buorre beaivi', english: 'Good day', pronunciation: 'BWOR-reh BEA-vee', emoji: '☀️' },
        { id: 4, sami: 'Giitu', english: 'Thank you', pronunciation: 'GEE-too', emoji: '🙏' },
        { id: 5, sami: 'Vuostá', english: 'Please', pronunciation: 'VWOS-tah', emoji: '🙇' },
        { id: 6, sami: 'Oaidnaleapmai', english: 'See you later', pronunciation: 'OY-dna-leap-may', emoji: '👋' },
      ]
    },
    {
      id: 2,
      title: 'Numbers 1-10',
      description: 'Learn to count in Sami',
      emoji: '🔢',
      vocabulary: [
        { id: 1, sami: 'okta', english: 'one (1)', pronunciation: 'OK-ta', emoji: '1️⃣' },
        { id: 2, sami: 'guokte', english: 'two (2)', pronunciation: 'GWOK-teh', emoji: '2️⃣' },
        { id: 3, sami: 'golbma', english: 'three (3)', pronunciation: 'GOL-bma', emoji: '3️⃣' },
        { id: 4, sami: 'njeallje', english: 'four (4)', pronunciation: 'NYEAL-lyeh', emoji: '4️⃣' },
        { id: 5, sami: 'vihtta', english: 'five (5)', pronunciation: 'VIH-tta', emoji: '5️⃣' },
        { id: 6, sami: 'guhtta', english: 'six (6)', pronunciation: 'GUH-tta', emoji: '6️⃣' },
        { id: 7, sami: 'čieža', english: 'seven (7)', pronunciation: 'CHYE-zha', emoji: '7️⃣' },
        { id: 8, sami: 'gávcci', english: 'eight (8)', pronunciation: 'GAV-tsee', emoji: '8️⃣' },
        { id: 9, sami: 'ovcci', english: 'nine (9)', pronunciation: 'OV-tsee', emoji: '9️⃣' },
        { id: 10, sami: 'logi', english: 'ten (10)', pronunciation: 'LO-gee', emoji: '🔟' },
      ]
    },
    {
      id: 3,
      title: 'Colors',
      description: 'Basic colors in Sami',
      emoji: '🎨',
      vocabulary: [
        { id: 1, sami: 'ruksesbuolva', english: 'red', pronunciation: 'RUK-ses-BWOL-va', emoji: '🔴' },
        { id: 2, sami: 'alit', english: 'blue', pronunciation: 'AH-lit', emoji: '🔵' },
        { id: 3, sami: 'fiskat', english: 'green', pronunciation: 'FIS-kat', emoji: '🟢' },
        { id: 4, sami: 'fiskes', english: 'yellow', pronunciation: 'FIS-kes', emoji: '🟡' },
        { id: 5, sami: 'vilges', english: 'white', pronunciation: 'VIL-ges', emoji: '⚪' },
        { id: 6, sami: 'čáhppes', english: 'black', pronunciation: 'CHAHP-pes', emoji: '⚫' },
        { id: 7, sami: 'oránša', english: 'orange', pronunciation: 'o-RAHN-sha', emoji: '🟠' },
        { id: 8, sami: 'ruonit', english: 'brown', pronunciation: 'RWO-nit', emoji: '🟤' },
      ]
    },
  ];

  const currentLesson = lessons.find(l => l.id === lessonId) || lessons[0];

  const handleFlipCard = (cardId: number) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(cardId)) {
      newFlipped.delete(cardId);
    } else {
      newFlipped.add(cardId);
    }
    setFlippedCards(newFlipped);
  };

  const handleWritingSubmit = (cardId: number, answer: string) => {
    const card = currentLesson.vocabulary.find(v => v.id === cardId);
    if (card && answer.toLowerCase().trim() === card.sami.toLowerCase().trim()) {
      setScore(score + 10);
      return true;
    }
    return false;
  };

  const handleSpeakingComplete = (cardId: number) => {
    setSpeakingCompleted(new Set(speakingCompleted).add(cardId));
    setScore(score + 10);
  };

  const handleListeningReveal = (cardId: number) => {
    setListeningRevealed(new Set(listeningRevealed).add(cardId));
  };

  const playAudio = (text: string) => {
    // Use Web Speech API for text-to-speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'no-NO'; // Norwegian is closest to Northern Sami
      utterance.rate = 0.8; // Slower for learning
      utterance.pitch = 1.0;
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('Text-to-speech not supported');
    }
  };

  const checkModeComplete = () => {
    const vocabCount = currentLesson.vocabulary.length;
    
    if (mode === 'reading' && flippedCards.size === vocabCount) {
      setCompletedModes(new Set(completedModes).add('reading'));
    } else if (mode === 'writing') {
      const correctAnswers = Object.keys(writingAnswers).filter(key => {
        const card = currentLesson.vocabulary.find(v => v.id === parseInt(key));
        return card && writingAnswers[parseInt(key)]?.toLowerCase().trim() === card.sami.toLowerCase().trim();
      });
      if (correctAnswers.length === vocabCount) {
        setCompletedModes(new Set(completedModes).add('writing'));
      }
    } else if (mode === 'speaking' && speakingCompleted.size === vocabCount) {
      setCompletedModes(new Set(completedModes).add('speaking'));
    } else if (mode === 'listening' && listeningRevealed.size === vocabCount) {
      setCompletedModes(new Set(completedModes).add('listening'));
    }
  };

  useEffect(() => {
    checkModeComplete();
  }, [flippedCards, writingAnswers, speakingCompleted, listeningRevealed, mode]);

  const allModesComplete = completedModes.size === 4;

  const handleComplete = () => {
    onComplete?.();
    onExit();
  };

  const modes = [
    { id: 'reading' as LearningMode, icon: BookOpen, label: 'Reading', color: 'blue' },
    { id: 'listening' as LearningMode, icon: Ear, label: 'Listening', color: 'purple' },
    { id: 'writing' as LearningMode, icon: Pencil, label: 'Writing', color: 'green' },
    { id: 'speaking' as LearningMode, icon: Mic, label: 'Speaking', color: 'orange' },
  ];

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-gradient-to-b from-slate-900/98 to-gray-900/98">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1668294141622-18e9998a00f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF5ZnVsJTIwM2QlMjBpbGx1c3RyYXRpb24lMjBnYW1lfGVufDF8fHx8MTc2MjE4MDA4MXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Background"
          className="w-full h-full object-cover opacity-15"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="p-3 pb-2">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={onExit}
              className="text-white hover:text-yellow-300 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-lg px-2 py-1"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1 flex items-center justify-center gap-2">
              <span className="text-2xl">{currentLesson.emoji}</span>
              <h2 className="text-white">{currentLesson.title}</h2>
            </div>
            <div className="bg-yellow-500/90 backdrop-blur-sm rounded-xl px-3 py-1 border-2 border-yellow-300">
              <span className="text-white text-xs flex items-center gap-1">
                <Star size={12} fill="white" />
                {score}
              </span>
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="grid grid-cols-4 gap-1 bg-white/20 backdrop-blur-sm rounded-2xl p-1 border-2 border-white/30">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`relative flex flex-col items-center gap-1 py-2 rounded-xl transition-all ${
                  mode === m.id
                    ? 'bg-white text-gray-900 shadow-lg scale-105'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {completedModes.has(m.id) && (
                  <CheckCircle2 className="absolute -top-1 -right-1 text-green-500 bg-white rounded-full" size={14} />
                )}
                <m.icon size={18} />
                <span className="text-[10px]">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-3 pb-3 overflow-y-auto">
          {/* Completion Screen */}
          {allModesComplete ? (
            <div className="flex items-center justify-center h-full">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 border-4 border-yellow-400 shadow-2xl text-center space-y-4 animate-bounce" style={{ animationDuration: '1s', animationIterationCount: '2' }}>
                <div className="text-6xl mb-2">🎉</div>
                <h3 className="text-gray-900">Lesson Complete!</h3>
                <p className="text-gray-600">You've mastered all 4 modes!</p>
                
                <div className="bg-yellow-100 rounded-2xl p-4 border-2 border-yellow-300">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Trophy className="text-yellow-600" size={24} />
                    <span className="text-yellow-700">Total: {score} XP</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {modes.map(m => (
                      <div key={m.id} className="flex flex-col items-center gap-1">
                        <CheckCircle2 className="text-green-500" size={16} />
                        <span className="text-xs text-gray-600">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleComplete}
                  className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl transition-all shadow-xl border-3 border-green-300 active:scale-95"
                >
                  🏆 Complete Lesson
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Mode Instructions */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 border-3 border-white/50 shadow-lg mb-3">
                <h3 className="text-gray-900 text-sm mb-1">
                  {mode === 'reading' && '📖 Reading Mode: Tap cards to flip and reveal meanings'}
                  {mode === 'listening' && '🎧 Listening Mode: Listen and tap to reveal the word'}
                  {mode === 'writing' && '✍️ Writing Mode: Type the Sami word for each meaning'}
                  {mode === 'speaking' && '🗣️ Speaking Mode: Practice pronunciation out loud'}
                </h3>
                <p className="text-gray-600 text-xs">
                  {mode === 'reading' && 'Click all cards to complete this mode'}
                  {mode === 'listening' && 'Listen to audio and reveal all words'}
                  {mode === 'writing' && 'Spell each word correctly'}
                  {mode === 'speaking' && 'Practice saying each word 3 times'}
                </p>
              </div>

              {/* READING MODE - Flip Cards */}
              {mode === 'reading' && (
                <div className="grid grid-cols-2 gap-3">
                  {currentLesson.vocabulary.map((card) => {
                    const isFlipped = flippedCards.has(card.id);
                    return (
                      <div
                        key={card.id}
                        className="perspective-1000"
                        style={{ perspective: '1000px' }}
                      >
                        <div
                          onClick={() => handleFlipCard(card.id)}
                          className={`relative w-full h-40 cursor-pointer transition-transform duration-500 transform-style-3d ${
                            isFlipped ? 'rotate-y-180' : ''
                          }`}
                          style={{
                            transformStyle: 'preserve-3d',
                            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                          }}
                        >
                          {/* Front - Sami Word */}
                          <div
                            className="absolute inset-0 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-4 border-4 border-orange-300 shadow-xl flex flex-col items-center justify-center backface-hidden"
                            style={{ backfaceVisibility: 'hidden' }}
                          >
                            <div className="text-4xl mb-2">{card.emoji}</div>
                            <h4 className="text-white text-center">{card.sami}</h4>
                            <p className="text-orange-100 text-xs mt-2">Tap to reveal</p>
                          </div>

                          {/* Back - English Meaning */}
                          <div
                            className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl p-4 border-4 border-teal-300 shadow-xl flex flex-col items-center justify-center backface-hidden"
                            style={{
                              backfaceVisibility: 'hidden',
                              transform: 'rotateY(180deg)',
                            }}
                          >
                            <div className="text-4xl mb-2">{card.emoji}</div>
                            <h4 className="text-white text-center">{card.english}</h4>
                            {card.pronunciation && (
                              <p className="text-teal-100 text-xs mt-2">[{card.pronunciation}]</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* LISTENING MODE - Audio Cards */}
              {mode === 'listening' && (
                <div className="space-y-3">
                  {currentLesson.vocabulary.map((card) => {
                    const isRevealed = listeningRevealed.has(card.id);
                    return (
                      <div
                        key={card.id}
                        className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 border-3 border-purple-300 shadow-lg"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-3xl">{card.emoji}</div>
                          <div className="flex-1">
                            <p className="text-gray-600 text-sm">{card.english}</p>
                            {card.pronunciation && (
                              <p className="text-purple-600 text-xs italic">[{card.pronunciation}]</p>
                            )}
                          </div>
                          <button className="bg-purple-500 hover:bg-purple-600 text-white rounded-full p-3 shadow-lg transition-all active:scale-95" onClick={() => playAudio(card.sami)}>
                            <Volume2 size={20} />
                          </button>
                        </div>

                        {!isRevealed ? (
                          <button
                            onClick={() => handleListeningReveal(card.id)}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl py-2 border-2 border-purple-300 transition-all active:scale-95"
                          >
                            Reveal Word 👁️
                          </button>
                        ) : (
                          <div className="bg-green-100 rounded-xl p-3 border-2 border-green-300 text-center">
                            <h4 className="text-green-800">{card.sami}</h4>
                            <p className="text-green-600 text-xs mt-1">✓ Revealed</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* WRITING MODE - Type Answers */}
              {mode === 'writing' && (
                <div className="space-y-3">
                  {currentLesson.vocabulary.map((card) => {
                    const userAnswer = writingAnswers[card.id] || '';
                    const isCorrect = userAnswer.toLowerCase().trim() === card.sami.toLowerCase().trim();
                    const hasAttempted = userAnswer.length > 0;

                    return (
                      <div
                        key={card.id}
                        className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 border-3 border-green-300 shadow-lg"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-3xl">{card.emoji}</div>
                          <div className="flex-1">
                            <h4 className="text-gray-900">{card.english}</h4>
                            {card.pronunciation && (
                              <p className="text-green-600 text-xs italic">[{card.pronunciation}]</p>
                            )}
                          </div>
                        </div>

                        <input
                          type="text"
                          value={userAnswer}
                          onChange={(e) => setWritingAnswers({ ...writingAnswers, [card.id]: e.target.value })}
                          placeholder="Type the Sami word..."
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                            hasAttempted && isCorrect
                              ? 'border-green-500 bg-green-50 text-green-800'
                              : hasAttempted && !isCorrect
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-300 bg-white'
                          }`}
                        />

                        {hasAttempted && isCorrect && (
                          <div className="mt-2 flex items-center gap-2 text-green-700 text-sm">
                            <CheckCircle2 size={16} />
                            <span>Correct! {card.sami}</span>
                          </div>
                        )}

                        {hasAttempted && !isCorrect && userAnswer.length >= card.sami.length && (
                          <div className="mt-2 text-red-700 text-sm">
                            ✗ Try again! Hint: {card.sami.charAt(0)}...
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* SPEAKING MODE - Pronunciation Practice */}
              {mode === 'speaking' && (
                <div className="space-y-3">
                  {currentLesson.vocabulary.map((card) => {
                    const isCompleted = speakingCompleted.has(card.id);
                    return (
                      <div
                        key={card.id}
                        className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 border-3 border-orange-300 shadow-lg"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-3xl">{card.emoji}</div>
                          <div className="flex-1">
                            <h4 className="text-gray-900">{card.sami}</h4>
                            <p className="text-gray-600 text-sm">{card.english}</p>
                            {card.pronunciation && (
                              <p className="text-orange-600 text-xs italic mt-1">[{card.pronunciation}]</p>
                            )}
                          </div>
                          <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 shadow-lg transition-all active:scale-95" onClick={() => playAudio(card.sami)}>
                            <Volume2 size={20} />
                          </button>
                        </div>

                        <div className="bg-orange-50 rounded-xl p-3 border-2 border-orange-200 mb-3">
                          <p className="text-orange-800 text-sm">
                            🗣️ Say "<span className="font-bold">{card.sami}</span>" out loud 3 times
                          </p>
                        </div>

                        {!isCompleted ? (
                          <button
                            onClick={() => handleSpeakingComplete(card.id)}
                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl py-3 border-2 border-orange-300 transition-all active:scale-95 flex items-center justify-center gap-2"
                          >
                            <Mic size={18} />
                            I've practiced this word
                          </button>
                        ) : (
                          <div className="bg-green-100 rounded-xl p-3 border-2 border-green-300 text-center flex items-center justify-center gap-2">
                            <CheckCircle2 className="text-green-600" size={18} />
                            <span className="text-green-800">Practice Complete!</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Mode Progress */}
              <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-2xl p-3 border-2 border-white/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm">Mode Progress:</span>
                  <span className="text-white text-sm">
                    {mode === 'reading' && `${flippedCards.size}/${currentLesson.vocabulary.length} flipped`}
                    {mode === 'listening' && `${listeningRevealed.size}/${currentLesson.vocabulary.length} revealed`}
                    {mode === 'writing' && `${Object.values(writingAnswers).filter((ans, idx) => ans.toLowerCase().trim() === currentLesson.vocabulary[idx]?.sami.toLowerCase().trim()).length}/${currentLesson.vocabulary.length} correct`}
                    {mode === 'speaking' && `${speakingCompleted.size}/${currentLesson.vocabulary.length} practiced`}
                  </span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
                    style={{ 
                      width: `${
                        mode === 'reading' ? (flippedCards.size / currentLesson.vocabulary.length) * 100 :
                        mode === 'listening' ? (listeningRevealed.size / currentLesson.vocabulary.length) * 100 :
                        mode === 'writing' ? (Object.values(writingAnswers).filter((ans, idx) => ans.toLowerCase().trim() === currentLesson.vocabulary[idx]?.sami.toLowerCase().trim()).length / currentLesson.vocabulary.length) * 100 :
                        (speakingCompleted.size / currentLesson.vocabulary.length) * 100
                      }%` 
                    }}
                  ></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* CSS for 3D flip */}
      <style>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backfaceVisibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}