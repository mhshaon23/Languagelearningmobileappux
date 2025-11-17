import { useState } from 'react';
import { Home, BookOpen, Gamepad2, BarChart3, Map, LogOut, Workflow, Users, Settings, Smartphone, Sparkles } from 'lucide-react';
import { HomeScreen } from './components/HomeScreen';
import { LessonsScreen } from './components/LessonsScreen';
import { GamesScreen } from './components/GamesScreen';
import { ProgressScreen } from './components/ProgressScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen as WireframeHomeScreen } from './components/wireframe/HomeScreen';
import { LessonsScreen as WireframeLessonsScreen } from './components/wireframe/LessonsScreen';
import { GamesScreen as WireframeGamesScreen } from './components/wireframe/GamesScreen';
import { ProgressScreen as WireframeProgressScreen } from './components/wireframe/ProgressScreen';
import { SettingsScreen as WireframeSettingsScreen } from './components/wireframe/SettingsScreen';
import { LoginScreen as WireframeLoginScreen } from './components/wireframe/LoginScreen';
import { FeedbackDialog } from './components/FeedbackDialog';
import { JourneyVisualization } from './components/JourneyVisualization';
import { UserFlowDiagram } from './components/UserFlowDiagram';
import { UserPersonas } from './components/UserPersonas';

type View = 'wireframe' | 'prototype' | 'journeys' | 'flow' | 'personas';
type Screen = 'login' | 'home' | 'lessons' | 'games' | 'progress' | 'settings';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('prototype');
  const [activeScreen, setActiveScreen] = useState<Screen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackContext, setFeedbackContext] = useState<'post-lesson' | 'settings'>('settings');
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [scrollToMonthlyProgress, setScrollToMonthlyProgress] = useState(false);
  const [scrollToCurrentLesson, setScrollToCurrentLesson] = useState(false);
  const [showDevTools, setShowDevTools] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveScreen('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveScreen('login');
  };

  const handleLessonComplete = () => {
    const newCount = lessonsCompleted + 1;
    setLessonsCompleted(newCount);
    
    // Show feedback prompt every 5 lessons
    if (newCount % 5 === 0) {
      setFeedbackContext('post-lesson');
      setIsFeedbackOpen(true);
    }
  };

  const handleOpenFeedback = () => {
    setFeedbackContext('settings');
    setIsFeedbackOpen(true);
  };

  const handleNavigateToMonthlyProgress = () => {
    setActiveScreen('progress');
    setScrollToMonthlyProgress(true);
    // Reset the flag after navigation
    setTimeout(() => setScrollToMonthlyProgress(false), 500);
  };

  const handleNavigateToCurrentLesson = () => {
    setActiveScreen('lessons');
    setScrollToCurrentLesson(true);
    // Reset the flag after navigation
    setTimeout(() => setScrollToCurrentLesson(false), 500);
  };

  if (currentView === 'journeys') {
    return (
      <div className="min-h-screen">
        <div className="fixed top-4 left-4 z-50 flex gap-2 flex-wrap">
          <button
            onClick={() => setCurrentView('prototype')}
            className="px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2"
          >
            <Sparkles size={18} />
            <span>Prototype</span>
          </button>
          <button
            onClick={() => setCurrentView('wireframe')}
            className="px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2"
          >
            <Smartphone size={18} />
            <span>Wireframe</span>
          </button>
          <button
            onClick={() => setCurrentView('flow')}
            className="px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2"
          >
            <Workflow size={18} />
            <span>User Flow</span>
          </button>
          <button
            onClick={() => setCurrentView('personas')}
            className="px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2"
          >
            <Users size={18} />
            <span>Personas</span>
          </button>
        </div>
        <JourneyVisualization />
      </div>
    );
  }

  if (currentView === 'flow') {
    return (
      <div className="min-h-screen">
        <div className="fixed top-4 left-4 z-50 flex gap-2 flex-wrap">
          <button
            onClick={() => setCurrentView('prototype')}
            className="px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2"
          >
            <Sparkles size={18} />
            <span>Prototype</span>
          </button>
          <button
            onClick={() => setCurrentView('wireframe')}
            className="px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2"
          >
            <Smartphone size={18} />
            <span>Wireframe</span>
          </button>
          <button
            onClick={() => setCurrentView('journeys')}
            className="px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2"
          >
            <Map size={18} />
            <span>User Journeys</span>
          </button>
          <button
            onClick={() => setCurrentView('personas')}
            className="px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2"
          >
            <Users size={18} />
            <span>Personas</span>
          </button>
        </div>
        <UserFlowDiagram />
      </div>
    );
  }

  if (currentView === 'personas') {
    return (
      <div className="min-h-screen">
        <div className="fixed top-4 left-4 z-50 flex gap-2 flex-wrap">
          <button
            onClick={() => setCurrentView('prototype')}
            className="px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2"
          >
            <Sparkles size={18} />
            <span>Prototype</span>
          </button>
          <button
            onClick={() => setCurrentView('wireframe')}
            className="px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2"
          >
            <Smartphone size={18} />
            <span>Wireframe</span>
          </button>
          <button
            onClick={() => setCurrentView('journeys')}
            className="px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2"
          >
            <Map size={18} />
            <span>User Journeys</span>
          </button>
          <button
            onClick={() => setCurrentView('flow')}
            className="px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2"
          >
            <Workflow size={18} />
            <span>User Flow</span>
          </button>
        </div>
        <UserPersonas />
      </div>
    );
  }

  // Determine which screen components to use
  const ScreenComponents = currentView === 'wireframe' 
    ? {
        Login: WireframeLoginScreen,
        Home: WireframeHomeScreen,
        Lessons: WireframeLessonsScreen,
        Games: WireframeGamesScreen,
        Progress: WireframeProgressScreen,
        Settings: WireframeSettingsScreen,
      }
    : {
        Login: LoginScreen,
        Home: HomeScreen,
        Lessons: LessonsScreen,
        Games: GamesScreen,
        Progress: ProgressScreen,
        Settings: SettingsScreen,
      };

  const isWireframe = currentView === 'wireframe';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      {/* View Toggle - Development Tools */}
      {showDevTools && (
        <div className="fixed top-4 right-4 z-50 flex gap-2 flex-wrap justify-end">
          <button
            onClick={() => setCurrentView(currentView === 'wireframe' ? 'prototype' : 'wireframe')}
            className={`px-4 py-2 rounded-xl shadow-lg border-2 flex items-center gap-2 transition-all hover:shadow-xl ${
              isWireframe 
                ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700' 
                : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {isWireframe ? <Sparkles size={18} /> : <Smartphone size={18} />}
            <span>{isWireframe ? 'View Prototype' : 'View Wireframe'}</span>
          </button>
          <button
            onClick={() => setCurrentView('personas')}
            className="px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2 transition-all hover:shadow-xl"
          >
            <Users size={18} />
            <span>Personas</span>
          </button>
          <button
            onClick={() => setCurrentView('flow')}
            className="px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2 transition-all hover:shadow-xl"
          >
            <Workflow size={18} />
            <span>User Flow</span>
          </button>
          <button
            onClick={() => setCurrentView('journeys')}
            className="px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2 transition-all hover:shadow-xl"
          >
            <Map size={18} />
            <span>Journeys</span>
          </button>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2 transition-all hover:shadow-xl"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          )}
        </div>
      )}

      {/* Dev Tools Toggle Button */}
      <button
        onClick={() => setShowDevTools(!showDevTools)}
        className="fixed top-4 right-4 z-50 w-10 h-10 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-all flex items-center justify-center"
        title="Toggle Dev Tools"
      >
        <Settings size={18} />
      </button>

      {/* App Title */}
      <div className="fixed top-4 left-4 z-50">
        <div className="bg-white px-5 py-3 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-gray-900">Speallu</h2>
          <p className={isWireframe ? 'text-indigo-600' : 'text-purple-600'}>
            {isWireframe ? 'Wireframe Mode' : 'Interactive Prototype'}
          </p>
        </div>
      </div>

      {/* Custom Device Frame - 700x840 */}
      <div className="w-full max-w-[700px] h-[840px] bg-black rounded-[35px] shadow-2xl overflow-hidden border-[10px] border-gray-900 flex flex-col relative">
        {/* Minimal top bezel */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50px] h-[6px] bg-gray-800 rounded-b-full z-20"></div>
        
        {/* Status Bar */}
        <div className="h-12 bg-white flex items-center justify-between px-8 relative z-10 pt-2">
          <div className="text-gray-900">9:41</div>
          <div className="flex items-center gap-1.5">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <rect x="0.5" y="0.5" width="16" height="11" rx="2.5" stroke="#000" strokeOpacity="0.35"/>
              <path opacity="0.4" d="M18 4v4" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
              <rect x="2" y="2" width="13" height="8" rx="1.5" fill="#000"/>
            </svg>
          </div>
        </div>

        {/* Browser URL Bar */}
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gray-400">
              <path d="M7 0C3.13 0 0 3.13 0 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm0 12.6c-3.09 0-5.6-2.51-5.6-5.6S3.91 1.4 7 1.4s5.6 2.51 5.6 5.6-2.51 5.6-5.6 5.6z" fill="currentColor"/>
              <path d="M9.45 3.15c-.7-.42-1.52-.65-2.45-.65-1.8 0-3.36.98-4.2 2.45h1.68c.63-.84 1.64-1.4 2.77-1.4.56 0 1.08.14 1.54.38L9.45 3.15z" fill="currentColor"/>
            </svg>
            <div className="flex-1 text-gray-700 truncate">
              speallu.app
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gray-400">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M7 3.5v3.5l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-white">
          {activeScreen === 'login' && <ScreenComponents.Login onLogin={handleLogin} />}
          {activeScreen === 'home' && <ScreenComponents.Home onNavigateToLessons={() => setActiveScreen('lessons')} onNavigateToProgress={handleNavigateToMonthlyProgress} onNavigateToSettings={() => setActiveScreen('settings')} onNavigateToCurrentLesson={handleNavigateToCurrentLesson} onNavigateToGames={() => setActiveScreen('games')} />}
          {activeScreen === 'lessons' && <ScreenComponents.Lessons scrollToCurrent={scrollToCurrentLesson} />}
          {activeScreen === 'games' && <ScreenComponents.Games onLessonComplete={handleLessonComplete} />}
          {activeScreen === 'progress' && <ScreenComponents.Progress scrollToMonthly={scrollToMonthlyProgress} />}
          {activeScreen === 'settings' && <ScreenComponents.Settings onOpenFeedback={handleOpenFeedback} />}
        </div>

        {/* Feedback Dialog */}
        <FeedbackDialog
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
          context={feedbackContext}
        />

        {/* Bottom Navigation - Only show when logged in */}
        {isLoggedIn && (
          <div className="h-20 bg-white border-t border-gray-200 flex items-center justify-around px-2 shadow-lg pb-2">
            <button
              onClick={() => setActiveScreen('home')}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                activeScreen === 'home' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Home size={24} />
              <span className="text-xs">Home</span>
            </button>
            <button
              onClick={() => setActiveScreen('lessons')}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                activeScreen === 'lessons' 
                  ? 'text-purple-600 bg-purple-50' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <BookOpen size={24} />
              <span className="text-xs">Lessons</span>
            </button>
            <button
              onClick={() => setActiveScreen('games')}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                activeScreen === 'games' 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Gamepad2 size={24} />
              <span className="text-xs">Games</span>
            </button>
            <button
              onClick={() => setActiveScreen('progress')}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                activeScreen === 'progress' 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <BarChart3 size={24} />
              <span className="text-xs">Progress</span>
            </button>
            <button
              onClick={() => setActiveScreen('settings')}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                activeScreen === 'settings' 
                  ? 'text-gray-900 bg-gray-100' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Settings size={24} />
              <span className="text-xs">Settings</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}