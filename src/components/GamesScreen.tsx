import { Volume2, Mic, Check, X, Search, Clock, Star, Trophy, Gamepad2, Zap, Flame, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { MultipleChoiceMaster } from './games/MultipleChoiceMaster';
import { StoryExplorer } from './games/StoryExplorer';
import { GreetingPractice } from './games/GreetingPractice';
import { CrosswordPuzzle } from './games/CrosswordPuzzle';
import { WordSearch } from './games/WordSearch';
import { Hangman } from './games/Hangman';
import { BasicPhrases } from './games/BasicPhrases';
import { TranslationTest } from './games/TranslationTest';
import { TranslationDash } from './games/TranslationDash';
import { SamiScrabble } from './games/SamiScrabble';
import { WordSnake } from './games/WordSnake';
import { WhackAWord } from './games/WhackAWord';
import { SamiQuest } from './games/SamiQuest';
import { SamiPacman } from './games/SamiPacman';
import { GameTemplate } from './games/GameTemplate';

interface GamesScreenProps {
  onLessonComplete?: () => void;
}

interface Question {
  id: number;
  type: string;
  question: string;
  translation: string;
  options: string[];
  correctAnswer: number;
  audio?: string;
}

interface Game {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  points: number;
  icon: string;
  popular?: boolean;
}

export function GamesScreen({ onLessonComplete }: GamesScreenProps) {
  const [currentView, setCurrentView] = useState<'library' | 'playing'>('library');
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const gameCategories = ['All', 'Action & Arcade Games', 'Puzzle & Word Games', 'Quiz & Trivia Games', 'Role-playing & Adventure Games'];

  const games: Game[] = [
    // Popular games (4 total)
    {
      id: 1,
      title: 'Crossword Puzzles',
      description: 'Fill in the crossword with Sami words',
      category: 'Puzzle & Word Games',
      difficulty: 'Intermediate',
      duration: '12 min',
      points: 120,
      icon: '📝',
      popular: true,
    },
    {
      id: 13,
      title: 'Sami PacMan',
      description: 'Collect words while avoiding obstacles',
      category: 'Action & Arcade Games',
      difficulty: 'Beginner',
      duration: '8 min',
      points: 100,
      icon: '👾',
      popular: true,
    },
    {
      id: 26,
      title: 'Sami Quest',
      description: 'Embark on an adventure through Sápmi',
      category: 'Role-playing & Adventure Games',
      difficulty: 'Intermediate',
      duration: '25 min',
      points: 200,
      icon: '🗺️',
      popular: true,
    },
    {
      id: 36,
      title: 'Multiple Choice Master',
      description: 'Challenge yourself with multiple choice',
      category: 'Quiz & Trivia Games',
      difficulty: 'All Levels',
      duration: '8 min',
      points: 85,
      icon: '✅',
      popular: true,
    },
    // Additional games (not popular)
    {
      id: 2,
      title: 'Sami Scrabble',
      description: 'Create words on the board to earn points',
      category: 'Puzzle & Word Games',
      difficulty: 'Intermediate',
      duration: '20 min',
      points: 180,
      icon: '🎲',
    },
    {
      id: 3,
      title: 'Word Search',
      description: 'Find hidden Sami words in the grid',
      category: 'Puzzle & Word Games',
      difficulty: 'Beginner',
      duration: '8 min',
      points: 80,
      icon: '🔍',
    },
    {
      id: 4,
      title: 'Hangman',
      description: 'Guess the Sami word letter by letter',
      category: 'Puzzle & Word Games',
      difficulty: 'Beginner',
      duration: '5 min',
      points: 50,
      icon: '🎯',
    },
    {
      id: 14,
      title: 'Word Snake',
      description: 'Grow your snake by collecting correct words',
      category: 'Action & Arcade Games',
      difficulty: 'Beginner',
      duration: '6 min',
      points: 85,
      icon: '🐍',
    },
    {
      id: 15,
      title: 'Whack-a-Word',
      description: 'Tap the correct translations as they pop up',
      category: 'Action & Arcade Games',
      difficulty: 'Beginner',
      duration: '5 min',
      points: 80,
      icon: '🔨',
    },
    {
      id: 16,
      title: 'Translation Dash',
      description: 'Race to translate words quickly',
      category: 'Action & Arcade Games',
      difficulty: 'Intermediate',
      duration: '6 min',
      points: 90,
      icon: '⚡',
    },
    {
      id: 27,
      title: 'Story Explorer',
      description: 'Interactive stories with language choices',
      category: 'Role-playing & Adventure Games',
      difficulty: 'All Levels',
      duration: '20 min',
      points: 150,
      icon: '📖',
    },
    {
      id: 28,
      title: 'Village Conversations',
      description: 'Role-play dialogues with virtual characters',
      category: 'Role-playing & Adventure Games',
      difficulty: 'Intermediate',
      duration: '15 min',
      points: 130,
      icon: '🏘️',
    },
    {
      id: 29,
      title: 'Time Traveler',
      description: 'Travel through Sami history and culture',
      category: 'Role-playing & Adventure Games',
      difficulty: 'Advanced',
      duration: '30 min',
      points: 220,
      icon: '⏰',
    },
    {
      id: 37,
      title: 'Translation Test',
      description: 'Translate between Sami and English',
      category: 'Quiz & Trivia Games',
      difficulty: 'Intermediate',
      duration: '10 min',
      points: 105,
      icon: '🌐',
    },
    {
      id: 38,
      title: 'Basic Phrases',
      description: 'Essential daily conversation phrases',
      category: 'Quiz & Trivia Games',
      difficulty: 'Beginner',
      duration: '10 min',
      points: 100,
      icon: '💬',
    },
    {
      id: 39,
      title: 'Greeting Practice',
      description: 'Master common Northern Sami greetings',
      category: 'Quiz & Trivia Games',
      difficulty: 'Beginner',
      duration: '5 min',
      points: 50,
      icon: '👋',
    },
  ];

  const questions: Question[] = [
    {
      id: 1,
      type: 'Multiple Choice',
      question: 'Bures',
      translation: 'What does this greeting mean?',
      options: ['Goodbye', 'Hello', 'Thank you', 'Please'],
      correctAnswer: 1,
    },
    {
      id: 2,
      type: 'Translation',
      question: 'How do you say "Thank you" in Northern Sami?',
      translation: 'Choose the correct translation',
      options: ['Bures', 'Giitu', 'Mana', 'Vuostá'],
      correctAnswer: 1,
    },
    {
      id: 3,
      type: 'Multiple Choice',
      question: 'Maid don namahuvvá?',
      translation: 'What does this phrase mean?',
      options: ['How are you?', 'What is your name?', 'Where are you from?', 'Nice to meet you'],
      correctAnswer: 1,
    },
    {
      id: 4,
      type: 'Multiple Choice',
      question: 'Vuostá',
      translation: 'What does this word mean?',
      options: ['Hello', 'Please', 'Goodbye', 'Sorry'],
      correctAnswer: 1,
    },
    {
      id: 5,
      type: 'Translation',
      question: 'How do you say "Goodbye" in Northern Sami?',
      translation: 'Choose the correct translation',
      options: ['Bures', 'Giitu', 'Mana', 'Báze dearvan'],
      correctAnswer: 3,
    },
  ];

  const popularGames = games.filter(game => game.popular);
  
  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
      // Reset and go back to library
      setCurrentView('library');
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setScore(0);
      onLessonComplete?.();
    }
  };

  const playAudio = () => {
    // Simulated audio playback
    console.log('Playing audio for:', currentQ.question);
  };

  const startGame = (gameId: number) => {
    setSelectedGameId(gameId);
    setCurrentView('playing');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
  };

  const exitGame = () => {
    setCurrentView('library');
    setSelectedGameId(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-700 bg-green-100 border-green-300';
      case 'Intermediate':
        return 'text-orange-700 bg-orange-100 border-orange-300';
      case 'Advanced':
        return 'text-red-700 bg-red-100 border-red-300';
      default:
        return 'text-blue-700 bg-blue-100 border-blue-300';
    }
  };

  if (currentView === 'playing' && selectedGameId) {
    const selectedGame = games.find(g => g.id === selectedGameId);
    
    // Render specific games based on ID
    switch (selectedGameId) {
      case 1: // Crossword Puzzles
        return <CrosswordPuzzle onExit={exitGame} onComplete={onLessonComplete} />;
      case 2: // Sami Scrabble
        return <SamiScrabble onExit={exitGame} onComplete={onLessonComplete} />;
      case 3: // Word Search
        return <WordSearch onExit={exitGame} onComplete={onLessonComplete} />;
      case 4: // Hangman
        return <Hangman onExit={exitGame} onComplete={onLessonComplete} />;
      case 13: // Sami PacMan
        return <SamiPacman onExit={exitGame} onComplete={onLessonComplete} />;
      case 14: // Word Snake
        return <WordSnake onExit={exitGame} onComplete={onLessonComplete} />;
      case 15: // Whack-a-Word
        return <WhackAWord onExit={exitGame} onComplete={onLessonComplete} />;
      case 16: // Translation Dash
        return <TranslationDash onExit={exitGame} onComplete={onLessonComplete} />;
      case 26: // Sami Quest
        return <SamiQuest onExit={exitGame} onComplete={onLessonComplete} />;
      case 27: // Story Explorer
        return <StoryExplorer onExit={exitGame} onComplete={onLessonComplete} />;
      case 28: // Village Conversations
        return <GameTemplate gameId={selectedGameId} gameTitle="Village Conversations" gameIcon="🏘️" onExit={exitGame} onComplete={onLessonComplete} />;
      case 29: // Time Traveler
        return <GameTemplate gameId={selectedGameId} gameTitle="Time Traveler" gameIcon="⏰" onExit={exitGame} onComplete={onLessonComplete} />;
      case 36: // Multiple Choice Master
        return <MultipleChoiceMaster onExit={exitGame} onComplete={onLessonComplete} />;
      case 37: // Translation Test
        return <TranslationTest onExit={exitGame} onComplete={onLessonComplete} />;
      case 38: // Basic Phrases
        return <BasicPhrases onExit={exitGame} onComplete={onLessonComplete} />;
      case 39: // Greeting Practice
        return <GreetingPractice onExit={exitGame} onComplete={onLessonComplete} />;
      default:
        // Use template for remaining games
        return (
          <GameTemplate 
            gameId={selectedGameId}
            gameTitle={selectedGame?.title || 'Game'}
            gameIcon={selectedGame?.icon || '🎮'}
            onExit={exitGame}
            onComplete={onLessonComplete}
          />
        );
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-b from-green-100 via-emerald-50 to-teal-100 min-h-full">
      {/* Header - Playful */}
      <div className="flex items-center gap-3">
        <span className="text-3xl animate-bounce" style={{ animationDuration: '2s' }}>🎮</span>
        <div>
          <h1 className="text-gray-900 mb-1 flex items-center gap-2">
            Games Library
            <Sparkles className="text-green-500 animate-pulse" size={20} />
          </h1>
          <p className="text-green-600">Practice through fun interactive games! 🎯</p>
        </div>
      </div>

      

      {/* Category Filters - Fun pill buttons */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6">
        {gameCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 h-11 rounded-full whitespace-nowrap transition-all border-2 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg border-green-400 scale-110'
                : 'bg-white text-green-600 border-green-200 hover:border-green-400 hover:scale-105'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Popular Games Section - More playful */}
      {selectedCategory === 'All' && searchQuery === '' && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Flame className="text-orange-500 animate-pulse" size={24} />
            <h2 className="text-gray-900 flex items-center gap-2">
              Most Popular
              <span className="text-lg">🔥</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {popularGames.slice(0, 4).map((game) => (
              <button
                key={game.id}
                onClick={() => startGame(game.id)}
                className="rounded-3xl p-4 bg-gradient-to-br from-orange-100 to-red-100 shadow-xl hover:shadow-2xl transition-all border-4 border-orange-300 hover:border-orange-400 text-left relative overflow-hidden hover:scale-105 active:scale-95"
              >
                <div className="absolute top-2 right-2">
                  <Flame className="text-orange-500 animate-bounce" size={16} fill="currentColor" style={{ animationDuration: '2s' }} />
                </div>
                <div className="text-4xl mb-2">{game.icon}</div>
                <h3 className="text-gray-900 text-sm mb-1">{game.title}</h3>
                <div className="flex items-center gap-1 text-yellow-500 text-xs">
                  <Star size={14} fill="currentColor" />
                  <span className="text-gray-700">{game.points} XP</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Games Grid - More playful */}
      <div className="space-y-3">
        {selectedCategory === 'All' && searchQuery === '' && (
          <div className="flex items-center gap-2 mt-2">
            <Gamepad2 size={24} className="text-green-600" />
            <h2 className="text-gray-900 flex items-center gap-2">
              All Games
              <span className="text-lg">🎲</span>
            </h2>
          </div>
        )}
        {filteredGames.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl shadow-xl border-4 border-gray-200">
            <Gamepad2 className="mx-auto text-gray-300 mb-3" size={48} />
            <p className="text-gray-500">No games found 😔</p>
            <p className="text-gray-400">Try a different search term</p>
          </div>
        ) : (
          filteredGames.map((game) => (
            <button
              key={game.id}
              onClick={() => startGame(game.id)}
              className={`w-full rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-all border-4 text-left relative hover:scale-105 active:scale-95 ${
                game.popular
                  ? 'bg-gradient-to-br from-orange-50 to-white border-orange-300 hover:border-orange-400'
                  : 'bg-white border-green-200 hover:border-green-400'
              }`}
            >
              {game.popular && (
                <div className="absolute top-3 right-3">
                  <Flame className="text-orange-500" size={18} fill="currentColor" />
                </div>
              )}
              <div className="flex items-start gap-4">
                <div className="text-4xl">{game.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-gray-900">{game.title}</h3>
                    <div className="flex items-center gap-1 text-yellow-500 shrink-0">
                      <Star size={16} fill="currentColor" />
                      <span className="text-gray-700">{game.points} XP</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{game.description}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs border-2 ${getDifficultyColor(game.difficulty)}`}>
                      {game.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-600 border-2 border-purple-300">
                      {game.category}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <Clock size={14} />
                      <span>{game.duration} ⏱️</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
