import { ChevronRight, MessageCircle, Bell, Globe, User, HelpCircle, Info, LogOut, Shield, Palette, Sparkles, Star } from 'lucide-react';
import { useState } from 'react';

interface SettingsScreenProps {
  onOpenFeedback: () => void;
}

export function SettingsScreen({ onOpenFeedback }: SettingsScreenProps) {
  const [dailyReminder, setDailyReminder] = useState(true);
  const [streakAlerts, setStreakAlerts] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`w-14 h-8 rounded-full transition-all border-2 ${
        enabled ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-green-300' : 'bg-gray-200 border-gray-300'
      }`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-lg transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      ></div>
    </button>
  );

  return (
    <div className="p-4 space-y-4 bg-gradient-to-b from-cyan-100 via-blue-50 to-indigo-100 min-h-full">
      {/* Header - Fun */}
      <div className="pt-2 pb-4 flex items-center gap-3">
        <span className="text-3xl">⚙️</span>
        <div>
          <h1 className="text-gray-900 mb-1 flex items-center gap-2">
            Settings
            <Sparkles className="text-blue-500 animate-pulse" size={20} />
          </h1>
          <p className="text-gray-600">Make it yours! ✨</p>
        </div>
      </div>

      {/* Profile Section - Playful */}
      <div className="rounded-3xl p-5 bg-gradient-to-br from-white to-blue-50 shadow-xl border-4 border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-md border-2 border-blue-300">
            <User className="text-white" size={24} />
          </div>
          <h3 className="text-gray-900 flex items-center gap-2">
            Profile
            <span className="text-lg">👤</span>
          </h3>
        </div>
        <button className="w-full flex items-center gap-4 py-3 hover:bg-blue-50 rounded-2xl px-2 transition-all hover:scale-105">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 flex items-center justify-center text-white shadow-lg border-4 border-white shrink-0">
            <span className="text-2xl">M</span>
          </div>
          <div className="flex-1 text-left min-w-0">
            <div className="text-gray-900">Mánná (Sarah Johnson)</div>
            <div className="text-gray-500">sarah.j@email.com</div>
            <div className="text-blue-600 mt-1 flex items-center gap-1">
              <Star size={14} className="text-yellow-500" />
              Edit name and avatar
            </div>
          </div>
          <ChevronRight className="text-gray-400 shrink-0" size={24} />
        </button>
      </div>

      {/* Learning Goals - Colorful */}
      <div className="rounded-3xl p-5 bg-gradient-to-br from-white to-green-50 shadow-xl border-4 border-green-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-md border-2 border-green-300">
            <Globe className="text-white" size={24} />
          </div>
          <h3 className="text-gray-900 flex items-center gap-2">
            Learning Goals
            <span className="text-lg">🎯</span>
          </h3>
        </div>
        <div className="space-y-1">
          <button className="w-full flex items-center justify-between py-3 hover:bg-green-50 rounded-2xl px-2 transition-all">
            <div className="text-gray-700">Learning Language 🌍</div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 bg-green-100 px-3 py-1 rounded-full border-2 border-green-200">Northern Sami</span>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          </button>
          <div className="border-t-2 border-gray-100"></div>
          <button className="w-full flex items-center justify-between py-3 hover:bg-green-50 rounded-2xl px-2 transition-all">
            <div className="text-gray-700">Difficulty Level 📊</div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 bg-blue-100 px-3 py-1 rounded-full border-2 border-blue-200">A1</span>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          </button>
          <div className="border-t-2 border-gray-100"></div>
          <button className="w-full flex items-center justify-between py-3 hover:bg-green-50 rounded-2xl px-2 transition-all">
            <div className="text-gray-700">Days per Week 📅</div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 bg-purple-100 px-3 py-1 rounded-full border-2 border-purple-200">5 days</span>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          </button>
          <div className="border-t-2 border-gray-100"></div>
          <button className="w-full flex items-center justify-between py-3 hover:bg-green-50 rounded-2xl px-2 transition-all">
            <div className="text-gray-700">Time per Session ⏱️</div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 bg-orange-100 px-3 py-1 rounded-full border-2 border-orange-200">20 min</span>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          </button>
          <div className="border-t-2 border-gray-100"></div>
          <button className="w-full flex items-center justify-between py-3 hover:bg-green-50 rounded-2xl px-2 transition-all">
            <div className="text-gray-700">Lessons per Session 📝</div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 bg-pink-100 px-3 py-1 rounded-full border-2 border-pink-200">5 lessons</span>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          </button>
        </div>
      </div>

      {/* Notifications - Fun toggles */}
      <div className="rounded-3xl p-5 bg-gradient-to-br from-white to-purple-50 shadow-xl border-4 border-purple-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-md border-2 border-purple-300 animate-pulse">
            <Bell className="text-white" size={24} />
          </div>
          <h3 className="text-gray-900 flex items-center gap-2">
            Notifications
            <span className="text-lg">🔔</span>
          </h3>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between py-3 px-2">
            <div className="text-gray-700 flex items-center gap-2">
              Daily Reminder
              <span className="text-lg">📱</span>
            </div>
            <Toggle enabled={dailyReminder} onChange={() => setDailyReminder(!dailyReminder)} />
          </div>
          <div className="border-t-2 border-gray-100"></div>
          <div className="flex items-center justify-between py-3 px-2">
            <div className="text-gray-700 flex items-center gap-2">
              Streak Alerts
              <span className="text-lg">🔥</span>
            </div>
            <Toggle enabled={streakAlerts} onChange={() => setStreakAlerts(!streakAlerts)} />
          </div>
          <div className="border-t-2 border-gray-100"></div>
          <div className="flex items-center justify-between py-3 px-2">
            <div className="text-gray-700 flex items-center gap-2">
              Achievements
              <span className="text-lg">🏆</span>
            </div>
            <Toggle enabled={notifications} onChange={() => setNotifications(!notifications)} />
          </div>
        </div>
      </div>

      {/* App Preferences - Playful */}
      <div className="rounded-3xl p-5 bg-gradient-to-br from-white to-orange-50 shadow-xl border-4 border-orange-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-md border-2 border-orange-300">
            <Palette className="text-white" size={24} />
          </div>
          <h3 className="text-gray-900 flex items-center gap-2">
            App Preferences
            <span className="text-lg">🎨</span>
          </h3>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between py-3 px-2">
            <div className="text-gray-700 flex items-center gap-2">
              Sound Effects
              <span className="text-lg">🔊</span>
            </div>
            <Toggle enabled={soundEffects} onChange={() => setSoundEffects(!soundEffects)} />
          </div>
          <div className="border-t-2 border-gray-100"></div>
          <button className="w-full flex items-center justify-between py-3 hover:bg-orange-50 rounded-2xl px-2 transition-all">
            <div className="text-gray-700 flex items-center gap-2">
              App Theme
              <span className="text-lg">🌈</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 bg-yellow-100 px-3 py-1 rounded-full border-2 border-yellow-200">Light</span>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          </button>
        </div>
      </div>

      {/* Feedback - Super highlighted and fun */}
      <button
        onClick={onOpenFeedback}
        className="w-full rounded-3xl p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 transition-all shadow-2xl hover:shadow-2xl hover:scale-105 active:scale-95 border-4 border-purple-300 relative overflow-hidden"
      >
        <Sparkles className="absolute top-2 right-2 text-white/60 animate-pulse" size={20} />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/30 p-3 rounded-2xl backdrop-blur-sm border-2 border-white/40 shadow-lg">
              <MessageCircle className="text-white" size={26} />
            </div>
            <div className="text-left">
              <div className="text-white flex items-center gap-2">
                Send Feedback
                <span className="text-xl">💬</span>
              </div>
              <div className="text-white/90">Help us improve! We'd love to hear from you</div>
            </div>
          </div>
          <ChevronRight className="text-white" size={24} />
        </div>
      </button>

      {/* Support & Info - Clean but fun */}
      <div className="rounded-3xl p-5 bg-white shadow-xl border-4 border-cyan-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-md border-2 border-cyan-300">
            <Info className="text-white" size={24} />
          </div>
          <h3 className="text-gray-900 flex items-center gap-2">
            Support & Info
            <span className="text-lg">ℹ️</span>
          </h3>
        </div>
        <div className="space-y-1">
          <button className="w-full flex items-center justify-between py-3 hover:bg-cyan-50 rounded-2xl px-2 transition-all">
            <div className="flex items-center gap-2">
              <HelpCircle className="text-gray-500" size={20} />
              <div className="text-gray-700">Help Center 🆘</div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>
          <div className="border-t-2 border-gray-100"></div>
          <button className="w-full flex items-center justify-between py-3 hover:bg-cyan-50 rounded-2xl px-2 transition-all">
            <div className="flex items-center gap-2">
              <Shield className="text-gray-500" size={20} />
              <div className="text-gray-700">Privacy Policy 🔒</div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>
          <div className="border-t-2 border-gray-100"></div>
          <button className="w-full flex items-center justify-between py-3 hover:bg-cyan-50 rounded-2xl px-2 transition-all">
            <div className="text-gray-700">About Speallu ℹ️</div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 bg-cyan-100 px-3 py-1 rounded-full border-2 border-cyan-200">v1.0.0</span>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          </button>
        </div>
      </div>

      {/* Logout Button - More playful */}
      <button className="w-full rounded-3xl p-5 bg-white border-4 border-red-300 hover:bg-red-50 transition-all shadow-xl hover:scale-105 active:scale-95">
        <div className="flex items-center justify-center gap-3 text-red-600">
          <LogOut size={24} />
          <span className="flex items-center gap-2">
            Log Out
            <span className="text-xl">👋</span>
          </span>
        </div>
      </button>

      {/* Footer Space */}
      <div className="h-8"></div>
    </div>
  );
}
