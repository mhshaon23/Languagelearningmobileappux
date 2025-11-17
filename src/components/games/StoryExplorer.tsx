import { ArrowLeft, Star, Trophy, Volume2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface StoryExplorerProps {
  onExit: () => void;
  onComplete?: () => void;
}

interface DialogueLine {
  speaker: 'npc' | 'player' | 'both';
  npcText?: string;
  npcTextEnglish?: string;
  playerChoices?: {
    samiText: string;
    englishText: string;
    nextLine: number;
    isCorrect?: boolean;
  }[];
}

interface Conversation {
  id: number;
  title: string;
  location: string;
  locationEmoji: string;
  npcName: string;
  npcAvatar: string;
  playerAvatar: string;
  background: string;
  dialogue: DialogueLine[];
}

export function StoryExplorer({ onExit, onComplete }: StoryExplorerProps) {
  const [currentConversation, setCurrentConversation] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [score, setScore] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [conversationComplete, setConversationComplete] = useState(false);

  // Conversations/Stories with different scenarios
  const conversations: Conversation[] = [
    {
      id: 1,
      title: 'Meeting on the Street',
      location: 'City Street',
      locationEmoji: '🏙️',
      npcName: 'Anna',
      npcAvatar: 'https://images.unsplash.com/photo-1740252117027-4275d3f84385?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGNhcnRvb24lMjBhdmF0YXIlMjBmcmllbmRseXxlbnwxfHx8fDE3NjIxODAwODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      playerAvatar: 'https://images.unsplash.com/photo-1629459347138-b34fcc7603cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGNhcnRvb24lMjBjaGFyYWN0ZXIlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzYyMTgwMDc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      background: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc3RyZWV0JTIwY2FydG9vbnxlbnwxfHx8fDE3NjIxODAwODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      dialogue: [
        {
          speaker: 'npc',
          npcText: 'Bures!',
          npcTextEnglish: 'Hello!',
        },
        {
          speaker: 'player',
          playerChoices: [
            { samiText: 'Bures!', englishText: 'Hello!', nextLine: 2, isCorrect: true },
            { samiText: 'Giitu', englishText: 'Thank you', nextLine: 2, isCorrect: false },
            { samiText: 'Manan', englishText: 'I\'m leaving', nextLine: 2, isCorrect: false },
          ],
        },
        {
          speaker: 'npc',
          npcText: 'Maid don namahuvvá?',
          npcTextEnglish: 'What is your name?',
        },
        {
          speaker: 'player',
          playerChoices: [
            { samiText: 'Mun naman lea Sara', englishText: 'My name is Sara', nextLine: 4, isCorrect: true },
            { samiText: 'Mun lean buorre', englishText: 'I am good', nextLine: 4, isCorrect: false },
            { samiText: 'Oaidnaleapmai', englishText: 'See you later', nextLine: 4, isCorrect: false },
          ],
        },
        {
          speaker: 'npc',
          npcText: 'Lihkku! Mun lean Anna. Maid don háliidat?',
          npcTextEnglish: 'Nice! I am Anna. How are you?',
        },
        {
          speaker: 'player',
          playerChoices: [
            { samiText: 'Mun lean buorre, giitu!', englishText: 'I am good, thank you!', nextLine: 6, isCorrect: true },
            { samiText: 'Bures beaivvi', englishText: 'Good day', nextLine: 6, isCorrect: false },
            { samiText: 'Mun manan', englishText: 'I am leaving', nextLine: 6, isCorrect: false },
          ],
        },
        {
          speaker: 'npc',
          npcText: 'Čáppa! Maid don dahkat dál?',
          npcTextEnglish: 'Great! What are you doing now?',
        },
        {
          speaker: 'player',
          playerChoices: [
            { samiText: 'Mun manan gávpogii', englishText: 'I am going to the store', nextLine: 8, isCorrect: true },
            { samiText: 'Mun juhkan gáfe', englishText: 'I drink coffee', nextLine: 8, isCorrect: false },
            { samiText: 'Mun váldon biilla', englishText: 'I take the car', nextLine: 8, isCorrect: false },
          ],
        },
        {
          speaker: 'npc',
          npcText: 'Buorre! Háliidatgo ahte mun boađán duinna?',
          npcTextEnglish: 'Good! Would you like me to come with you?',
        },
        {
          speaker: 'player',
          playerChoices: [
            { samiText: 'Juo, giitu!', englishText: 'Yes, thank you!', nextLine: 10, isCorrect: true },
            { samiText: 'Ii, giitu', englishText: 'No, thank you', nextLine: 10, isCorrect: true },
            { samiText: 'Bures', englishText: 'Hello', nextLine: 10, isCorrect: false },
          ],
        },
        {
          speaker: 'npc',
          npcText: 'Oaidnaleapmai maŋŋel!',
          npcTextEnglish: 'See you later!',
        },
        {
          speaker: 'player',
          playerChoices: [
            { samiText: 'Oaidnaleapmai!', englishText: 'See you later!', nextLine: -1, isCorrect: true },
            { samiText: 'Bures', englishText: 'Hello', nextLine: -1, isCorrect: false },
            { samiText: 'Giitu', englishText: 'Thank you', nextLine: -1, isCorrect: false },
          ],
        },
      ],
    },
    {
      id: 2,
      title: 'At the Café',
      location: 'Sami Café',
      locationEmoji: '☕',
      npcName: 'Biret',
      npcAvatar: 'https://images.unsplash.com/photo-1760434600537-024e2771d580?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHJlbmRlciUyMGNoYXJhY3RlciUyMGN1dGV8ZW58MXx8fHwxNzYyMTgwMDgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      playerAvatar: 'https://images.unsplash.com/photo-1739513275763-84d4393a84ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwM2QlMjBjaGFyYWN0ZXIlMjBkZXNpZ258ZW58MXx8fHwxNzYyMTgwMDgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      background: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY2FmZXxlbnwxfHx8fDE3NjIxODAwODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      dialogue: [
        {
          speaker: 'npc',
          npcText: 'Buresboahtin! Maid don áiggot juhkat?',
          npcTextEnglish: 'Welcome! What do you want to drink?',
        },
        {
          speaker: 'player',
          playerChoices: [
            { samiText: 'Mun áiggun juhkat gáfe', englishText: 'I want to drink coffee', nextLine: 2, isCorrect: true },
            { samiText: 'Mun áiggun borrat', englishText: 'I want to eat', nextLine: 2, isCorrect: false },
            { samiText: 'Mun manan', englishText: 'I am leaving', nextLine: 2, isCorrect: false },
          ],
        },
        {
          speaker: 'npc',
          npcText: 'Buorre! Háliidatgo maid mielki?',
          npcTextEnglish: 'Good! Would you also like milk?',
        },
        {
          speaker: 'player',
          playerChoices: [
            { samiText: 'Juo, giitu', englishText: 'Yes, thank you', nextLine: 4, isCorrect: true },
            { samiText: 'Ii, giitu', englishText: 'No, thank you', nextLine: 4, isCorrect: true },
            { samiText: 'Oaidnaleapmai', englishText: 'See you later', nextLine: 4, isCorrect: false },
          ],
        },
        {
          speaker: 'npc',
          npcText: 'Háliidatgo maid gáhkku?',
          npcTextEnglish: 'Would you also like cake?',
        },
        {
          speaker: 'player',
          playerChoices: [
            { samiText: 'Juo, mun háliidan gáhkku', englishText: 'Yes, I would like cake', nextLine: 6, isCorrect: true },
            { samiText: 'Ii, mun in háliit', englishText: 'No, I don\'t want it', nextLine: 6, isCorrect: true },
            { samiText: 'Bures', englishText: 'Hello', nextLine: 6, isCorrect: false },
          ],
        },
        {
          speaker: 'npc',
          npcText: 'Leat čáppa! Gávnnat juo sadji ja mun boan gáfe.',
          npcTextEnglish: 'You are nice! Find a seat and I will bring the coffee.',
        },
        {
          speaker: 'player',
          playerChoices: [
            { samiText: 'Giitu ollu!', englishText: 'Thank you very much!', nextLine: -1, isCorrect: true },
            { samiText: 'Bures', englishText: 'Hello', nextLine: -1, isCorrect: false },
            { samiText: 'Manan', englishText: 'I\'m leaving', nextLine: -1, isCorrect: false },
          ],
        },
      ],
    },
  ];

  const currentConvo = conversations[currentConversation];
  const currentDialogue = currentConvo.dialogue[currentLine];
  const progress = ((currentLine + 1) / currentConvo.dialogue.length) * 100;

  const handleChoice = (choice: { samiText: string; englishText: string; nextLine: number; isCorrect?: boolean }) => {
    setSelectedChoice(currentLine);
    
    // Award points for correct choices
    if (choice.isCorrect) {
      setScore(score + 10);
    }

    setTimeout(() => {
      if (choice.nextLine === -1) {
        // Conversation complete
        setConversationComplete(true);
      } else {
        setCurrentLine(choice.nextLine);
        setSelectedChoice(null);
        setShowTranslation(false);
      }
    }, 1000);
  };

  const handleNextConversation = () => {
    if (currentConversation < conversations.length - 1) {
      setCurrentConversation(currentConversation + 1);
      setCurrentLine(0);
      setSelectedChoice(null);
      setConversationComplete(false);
      setShowTranslation(false);
    } else {
      onComplete?.();
      onExit();
    }
  };

  // Keyboard support for choices (1-3)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const keyNum = parseInt(e.key);
      if (currentDialogue.speaker === 'player' && currentDialogue.playerChoices) {
        if (keyNum >= 1 && keyNum <= currentDialogue.playerChoices.length && !selectedChoice) {
          handleChoice(currentDialogue.playerChoices[keyNum - 1]);
        }
      } else if (e.key === 'Enter' && conversationComplete) {
        handleNextConversation();
      } else if (e.key.toLowerCase() === 't') {
        setShowTranslation(!showTranslation);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentDialogue, selectedChoice, conversationComplete, showTranslation]);

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Cartoon Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={currentConvo.background}
          alt={currentConvo.location}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-purple-900/30 to-pink-900/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="p-3 pb-2 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={onExit}
              className="text-white hover:text-yellow-300 flex items-center gap-1"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1 flex items-center justify-center gap-2">
              <span className="text-2xl">📖</span>
              <h2 className="text-white">Story Explorer</h2>
            </div>
          </div>

          {/* Location & Progress */}
          <div className="flex items-center justify-between mb-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1 border-2 border-white/30">
              <span className="text-white text-xs flex items-center gap-1">
                <span>{currentConvo.locationEmoji}</span>
                {currentConvo.location}
              </span>
            </div>
            <div className="bg-yellow-500/80 backdrop-blur-sm rounded-xl px-3 py-1 border-2 border-yellow-300">
              <span className="text-white text-xs flex items-center gap-1">
                <Star size={12} />
                {score} pts
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-white/20 rounded-full overflow-hidden border border-white/30">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Dialogue Area */}
        <div className="flex-1 px-3 pb-3 overflow-y-auto">
          {!conversationComplete ? (
            <div className="h-full flex flex-col justify-end space-y-3">
              {/* NPC Character & Speech Bubble */}
              {currentDialogue.speaker === 'npc' && (
                <div className="flex items-end gap-2 animate-slideInLeft">
                  {/* NPC Avatar */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <ImageWithFallback
                        src={currentConvo.npcAvatar}
                        alt={currentConvo.npcName}
                        className="w-20 h-20 object-cover rounded-full border-4 border-blue-400 shadow-xl"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
                    </div>
                  </div>

                  {/* Speech Bubble */}
                  <div className="flex-1 relative">
                    <div className="bg-white/95 backdrop-blur-sm rounded-3xl rounded-bl-sm p-4 shadow-2xl border-3 border-blue-400 relative">
                      {/* Bubble tail */}
                      <div className="absolute -left-2 bottom-0 w-4 h-4 bg-white/95 transform rotate-45 border-l-3 border-b-3 border-blue-400"></div>
                      
                      <div className="flex items-start gap-2 mb-2">
                        <p className="text-blue-600 text-xs">{currentConvo.npcName}</p>
                        <button
                          onClick={() => setShowTranslation(!showTranslation)}
                          className="ml-auto text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1"
                        >
                          <Volume2 size={12} />
                          T
                        </button>
                      </div>
                      
                      <p className="text-gray-900 mb-1">{currentDialogue.npcText}</p>
                      
                      {showTranslation && (
                        <p className="text-gray-600 text-sm italic border-t border-blue-200 pt-2 mt-2">
                          {currentDialogue.npcTextEnglish}
                        </p>
                      )}
                    </div>

                    {/* Continue button for NPC lines */}
                    <button
                      onClick={() => {
                        setCurrentLine(currentLine + 1);
                        setShowTranslation(false);
                      }}
                      className="mt-2 w-full bg-blue-500/80 hover:bg-blue-600/80 text-white rounded-2xl py-2 border-2 border-blue-300 transition-all active:scale-95"
                    >
                      Continue ➡️
                    </button>
                  </div>
                </div>
              )}

              {/* Player Choices */}
              {currentDialogue.speaker === 'player' && currentDialogue.playerChoices && (
                <div className="space-y-2">
                  {/* Player Avatar - Small indicator */}
                  <div className="flex items-center gap-2 mb-2">
                    <ImageWithFallback
                      src={currentConvo.playerAvatar}
                      alt="You"
                      className="w-12 h-12 object-cover rounded-full border-3 border-green-400 shadow-lg"
                    />
                    <p className="text-white text-sm bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                      Your turn to speak...
                    </p>
                  </div>

                  {/* Choice Bubbles */}
                  {currentDialogue.playerChoices.map((choice, index) => (
                    <button
                      key={index}
                      onClick={() => handleChoice(choice)}
                      disabled={selectedChoice !== null}
                      className={`w-full text-left transition-all ${
                        selectedChoice !== null
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:scale-105 active:scale-95'
                      }`}
                    >
                      <div className="flex items-end gap-2 justify-end">
                        <div className="flex-1 relative">
                          <div className={`bg-gradient-to-br from-green-400/95 to-emerald-400/95 backdrop-blur-sm rounded-3xl rounded-br-sm p-4 shadow-2xl border-3 transition-all ${
                            selectedChoice !== null
                              ? 'border-gray-400'
                              : 'border-green-500 hover:border-green-300'
                          }`}>
                            {/* Bubble tail */}
                            <div className="absolute -right-2 bottom-0 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-400 transform rotate-45 border-r-3 border-b-3 border-green-500"></div>
                            
                            <div className="flex items-start gap-2 mb-1">
                              <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-green-700 text-xs">
                                {index + 1}
                              </div>
                              <p className="flex-1 text-white">{choice.samiText}</p>
                            </div>
                            
                            <p className="text-green-100 text-sm italic pl-8">
                              {choice.englishText}
                            </p>
                          </div>
                        </div>

                        {/* Small player indicator on right */}
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      </div>
                    </button>
                  ))}

                  <p className="text-white/70 text-xs text-center mt-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                    💬 Tap or press 1-3 • T=translate
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Conversation Complete Screen
            <div className="h-full flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-yellow-400 text-center space-y-4 max-w-sm animate-bounce" style={{ animationDuration: '1s', animationIterationCount: '2' }}>
                <div className="text-6xl mb-2">🎉</div>
                <h3 className="text-gray-900">Conversation Complete!</h3>
                <p className="text-gray-600">
                  You successfully completed the conversation with {currentConvo.npcName}!
                </p>
                
                <div className="bg-yellow-100 rounded-2xl p-4 border-2 border-yellow-300">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Trophy className="text-yellow-600" size={24} />
                    <span className="text-yellow-700">+{score} XP</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Star className="text-yellow-500" size={20} />
                    <span className="text-yellow-600 text-sm">
                      Story {currentConversation + 1}/{conversations.length}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleNextConversation}
                  className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl transition-all shadow-xl border-3 border-green-300 active:scale-95"
                >
                  {currentConversation < conversations.length - 1 ? (
                    '➡️ Next Story'
                  ) : (
                    '🏆 Complete All Stories'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
