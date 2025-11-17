import { ChevronRight, MessageCircle, Bell, Globe, User, HelpCircle, Info } from 'lucide-react';

interface SettingsScreenProps {
  onOpenFeedback: () => void;
}

export function SettingsScreen({ onOpenFeedback }: SettingsScreenProps) {
  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="pt-2 pb-4">
        <div className="text-gray-900 mb-1">Settings</div>
        <div className="text-xs text-gray-500">Manage your account and preferences</div>
      </div>

      {/* Profile Section */}
      <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <User className="text-blue-600" size={20} />
          <div className="text-gray-900">Profile</div>
        </div>
        <button className="w-full flex items-center gap-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
          <div className="w-12 h-12 rounded-full border-2 border-blue-300 flex items-center justify-center shrink-0">
            <span className="text-xs text-blue-600">M</span>
          </div>
          <div className="flex-1 text-left min-w-0">
            <div className="text-sm text-gray-700">Sarah Johnson</div>
            <div className="text-xs text-gray-500">sarah.j@email.com</div>
            <div className="text-xs text-blue-600 mt-1">Edit name and avatar</div>
          </div>
          <ChevronRight className="text-gray-400 shrink-0" size={20} />
        </button>
      </div>

      {/* Learning Preferences */}
      <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="text-green-600" size={20} />
          <div className="text-gray-900">Learning Goals</div>
        </div>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between py-2">
            <div className="text-sm text-gray-700">Learning Language</div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Spanish</span>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          </button>
          <div className="border-t border-gray-200"></div>
          <button className="w-full flex items-center justify-between py-2">
            <div className="text-sm text-gray-700">Difficulty Level</div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">A1</span>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          </button>
          <div className="border-t border-gray-200"></div>
          <button className="w-full flex items-center justify-between py-2">
            <div className="text-sm text-gray-700">Days per Week</div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">5 days</span>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          </button>
          <div className="border-t border-gray-200"></div>
          <button className="w-full flex items-center justify-between py-2">
            <div className="text-sm text-gray-700">Time per Session</div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">20 min</span>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          </button>
          <div className="border-t border-gray-200"></div>
          <button className="w-full flex items-center justify-between py-2">
            <div className="text-sm text-gray-700">Lessons per Session</div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">5 lessons</span>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="text-purple-600" size={20} />
          <div className="text-gray-900">Notifications</div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">Daily Reminder</div>
            <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="border-t border-gray-200"></div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">Streak Alerts</div>
            <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback - Highlighted */}
      <button
        onClick={onOpenFeedback}
        className="w-full border-2 border-blue-400 rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <MessageCircle className="text-white" size={20} />
            </div>
            <div className="text-left">
              <div className="text-gray-900">Send Feedback</div>
              <div className="text-xs text-gray-600">Help us improve the app</div>
            </div>
          </div>
          <ChevronRight className="text-blue-600" size={20} />
        </div>
      </button>

      {/* Support & Info */}
      <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <Info className="text-orange-600" size={20} />
          <div className="text-gray-900">Support & Info</div>
        </div>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <HelpCircle className="text-gray-500" size={18} />
              <div className="text-sm text-gray-700">Help Center</div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>
          <div className="border-t border-gray-200"></div>
          <button className="w-full flex items-center justify-between py-2">
            <div className="text-sm text-gray-700">About</div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">v1.0.0</span>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
