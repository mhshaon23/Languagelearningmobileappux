import { Search, Clock, Star, Gamepad2, Flame } from 'lucide-react';
import { useState } from 'react';

interface GamesScreenProps {
  onLessonComplete?: () => void;
}

interface Game {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  points: number;
  popular?: boolean;
}

export function GamesScreen({ onLessonComplete }: GamesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const gameCategories = ['All', 'Action & Arcade', 'Puzzle & Word', 'Quiz & Trivia', 'Role-playing & Adventure'];

  const games: Game[] = [
    // Puzzle & Word Games (ordered by popularity)
    {
      id: 1,
      title: 'Crossword Puzzles',
      description: 'Fill in the crossword with Sami words',
      category: 'Puzzle & Word',
      difficulty: 'Intermediate',
      duration: '12 min',
      points: 120,
      popular: true,
    },
    {
      id: 2,
      title: 'Sami Scrabble',
      description: 'Create words on the board to earn points',
      category: 'Puzzle & Word',
      difficulty: 'Intermediate',
      duration: '20 min',
      points: 180,
      popular: true,
    },
    {
      id: 3,
      title: 'Word Search',
      description: 'Find hidden Sami words in the grid',
      category: 'Puzzle & Word',
      difficulty: 'Beginner',
      duration: '8 min',
      popular: true,
      points: 80,
    },
    {
      id: 4,
      title: 'Hangman',
      description: 'Guess the Sami word letter by letter',
      category: 'Puzzle & Word',
      difficulty: 'Beginner',
      duration: '5 min',
      points: 50,
      popular: true,
    },
    {
      id: 5,
      title: 'Word Scramble',
      description: 'Unscramble letters to form Sami words',
      category: 'Puzzle & Word',
      difficulty: 'Beginner',
      duration: '6 min',
      points: 60,
    },
    {
      id: 6,
      title: 'Word Tetris',
      description: 'Stack falling letters to form Sami words',
      category: 'Puzzle & Word',
      difficulty: 'Intermediate',
      duration: '10 min',
      points: 110,
    },
    // Action & Arcade Games (ordered by popularity)
    {
      id: 7,
      title: 'Sami PacMan',
      description: 'Collect words while avoiding obstacles',
      category: 'Action & Arcade',
      difficulty: 'Beginner',
      duration: '8 min',
      points: 100,
      popular: true,
    },
    {
      id: 8,
      title: 'Word Snake',
      description: 'Grow your snake by collecting correct words',
      category: 'Action & Arcade',
      difficulty: 'Beginner',
      duration: '6 min',
      points: 85,
      popular: true,
    },
    {
      id: 9,
      title: 'Whack-a-Word',
      description: 'Tap the correct translations as they pop up',
      category: 'Action & Arcade',
      difficulty: 'Beginner',
      duration: '5 min',
      points: 80,
      popular: true,
    },
    {
      id: 10,
      title: 'Translation Dash',
      description: 'Race to translate words quickly',
      category: 'Action & Arcade',
      difficulty: 'Intermediate',
      duration: '6 min',
      points: 90,
      popular: true,
    },
    {
      id: 11,
      title: 'Spelling Bee Battle',
      description: 'Fast-paced spelling competition',
      category: 'Action & Arcade',
      difficulty: 'Intermediate',
      duration: '7 min',
      points: 100,
    },
    {
      id: 12,
      title: 'Word Catcher',
      description: 'Catch falling words before they hit ground',
      category: 'Action & Arcade',
      difficulty: 'Beginner',
      duration: '4 min',
      points: 60,
    },
    {
      id: 13,
      title: 'Vocabulary Run',
      description: 'Collect correct words while running',
      category: 'Action & Arcade',
      difficulty: 'Beginner',
      duration: '5 min',
      points: 75,
    },
    // Role-playing & Adventure Games (ordered by popularity)
    {
      id: 14,
      title: 'Sami Quest',
      description: 'Embark on an adventure through Sápmi',
      category: 'Role-playing & Adventure',
      difficulty: 'Intermediate',
      duration: '25 min',
      points: 200,
    },
    {
      id: 15,
      title: 'Story Explorer',
      description: 'Interactive stories with language choices',
      category: 'Role-playing & Adventure',
      difficulty: 'All Levels',
      duration: '20 min',
      points: 150,
    },
    {
      id: 16,
      title: 'Village Conversations',
      description: 'Role-play dialogues with virtual characters',
      category: 'Role-playing & Adventure',
      difficulty: 'Intermediate',
      duration: '15 min',
      points: 130,
    },
    {
      id: 17,
      title: 'Language Detective',
      description: 'Solve mysteries using language clues',
      category: 'Role-playing & Adventure',
      difficulty: 'Intermediate',
      duration: '18 min',
      points: 140,
    },
    {
      id: 18,
      title: 'Reindeer Herder Sim',
      description: 'Experience traditional Sami life',
      category: 'Role-playing & Adventure',
      difficulty: 'Intermediate',
      duration: '20 min',
      points: 160,
    },
    // Quiz & Trivia Games (ordered by popularity)
    {
      id: 19,
      title: 'Multiple Choice Master',
      description: 'Challenge yourself with multiple choice',
      category: 'Quiz & Trivia',
      difficulty: 'All Levels',
      duration: '8 min',
      points: 85,
    },
    {
      id: 20,
      title: 'Translation Test',
      description: 'Translate between Sami and English',
      category: 'Quiz & Trivia',
      difficulty: 'Intermediate',
      duration: '10 min',
      points: 105,
    },
    {
      id: 21,
      title: 'Daily Conversation',
      description: 'Test your everyday conversation skills',
      category: 'Quiz & Trivia',
      difficulty: 'Intermediate',
      duration: '10 min',
      points: 100,
    },
    {
      id: 22,
      title: 'Greeting Practice',
      description: 'Master common Northern Sami greetings',
      category: 'Quiz & Trivia',
      difficulty: 'Beginner',
      duration: '5 min',
      points: 50,
    },
  ];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 space-y-4 bg-green-50/30 min-h-full">
      {/* Header */}
      <div className="pt-2 pb-2">
        <div className="h-8 w-32 border-2 border-gray-300 rounded mb-2 flex items-center justify-center">
          <span className="text-sm text-gray-600">Games</span>
        </div>
        <div className="h-4 w-48 border border-gray-300 rounded flex items-center justify-center">
          <span className="text-xs text-gray-500">Subtitle Text</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 pl-12 pr-4 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none bg-white"
        />
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {gameCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 h-8 rounded-full whitespace-nowrap border-2 transition-all ${
              selectedCategory === category
                ? 'border-green-600 bg-green-100 text-green-700'
                : 'border-gray-300 bg-white text-gray-600'
            }`}
          >
            <span className="text-xs">{category}</span>
          </button>
        ))}
      </div>

      {/* Games List */}
      <div className="space-y-3">
        {filteredGames.length === 0 ? (
          <div className="text-center py-12">
            <Gamepad2 className="mx-auto text-gray-300 mb-3" size={48} />
            <p className="text-sm text-gray-500">No games found</p>
          </div>
        ) : (
          filteredGames.map((game) => (
            <div
              key={game.id}
              className="border-2 border-gray-300 rounded-lg p-4 bg-white hover:border-green-500 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-xs text-gray-500">Icon</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="h-5 w-32 border border-gray-300 rounded flex items-center px-2">
                      <span className="text-xs text-gray-600">{game.title}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-600">{game.points}</span>
                    </div>
                  </div>
                  <div className="h-4 w-full border border-gray-300 rounded mb-2 flex items-center px-2">
                    <span className="text-xs text-gray-500">{game.description}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="h-5 w-16 border border-green-300 rounded flex items-center justify-center">
                      <span className="text-xs text-green-600">{game.difficulty}</span>
                    </div>
                    <div className="h-5 w-16 border border-purple-300 rounded flex items-center justify-center">
                      <span className="text-xs text-purple-600">{game.category}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock size={12} />
                      <span className="text-xs">{game.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
