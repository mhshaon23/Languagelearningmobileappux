import { ArrowRight, ArrowDown, Mail, Facebook, Home, BookOpen, Gamepad2, BarChart3, Settings, LogOut, Zap } from 'lucide-react';

export function UserFlowDiagram() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-800 mb-2">Speallu - User Flow Diagram</h1>
          <p className="text-gray-600">Complete navigation paths and interactions throughout the application</p>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-gray-700 mb-4">Screen Color Coding</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-100 border-2 border-indigo-500 rounded"></div>
              <span className="text-gray-700">Login</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 border-2 border-blue-500 rounded"></div>
              <span className="text-gray-700">Home</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-100 border-2 border-purple-500 rounded"></div>
              <span className="text-gray-700">Lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-100 border-2 border-green-500 rounded"></div>
              <span className="text-gray-700">Games</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-100 border-2 border-orange-500 rounded"></div>
              <span className="text-gray-700">Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-100 border-2 border-gray-500 rounded"></div>
              <span className="text-gray-700">Settings</span>
            </div>
          </div>
        </div>

        {/* Flow Diagram */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Row 1: Login Screen */}
          <div className="flex flex-col items-center mb-12">
            <div className="text-center mb-2">
              <span className="text-gray-500">Entry Point</span>
            </div>
            <div className="w-72 bg-indigo-50 border-4 border-indigo-500 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Mail className="text-indigo-600" size={20} />
                <h3 className="text-indigo-900">Login Screen</h3>
              </div>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={14} className="text-red-500" />
                  <span>Gmail Login</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Facebook size={14} className="text-blue-600" />
                  <span>Facebook Login</span>
                </div>
                <div className="text-sm">• Email/Password</div>
                <div className="text-sm">• Sign Up Link</div>
                <div className="text-sm">• Forgot Password</div>
              </div>
            </div>
            <ArrowDown className="text-indigo-500 my-4" size={32} strokeWidth={3} />
            <div className="text-center text-sm text-gray-600 bg-indigo-100 px-4 py-2 rounded-full">
              Authentication Success
            </div>
          </div>

          {/* Row 2: Main App Screens */}
          <div className="relative">
            {/* Central Hub Indicator */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 bg-gray-700 text-white px-4 py-2 rounded-full text-sm">
              Main App Navigation
            </div>

            {/* Home Screen (Center) */}
            <div className="flex justify-center mb-8">
              <div className="w-72 bg-blue-50 border-4 border-blue-500 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Home className="text-blue-600" size={20} />
                  <h3 className="text-blue-900">Home Screen</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="text-sm">• Daily Streak Counter</div>
                  <div className="text-sm">• Learning Goals</div>
                  <div className="text-sm">• Continue Learning Button</div>
                  <div className="text-sm">• Quick Games Access</div>
                  <div className="text-sm">• Recent Activity</div>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-300">
                  <div className="text-xs text-blue-700">Navigation Hub</div>
                </div>
              </div>
            </div>

            {/* Arrow indicators from Home */}
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-8">
                <ArrowDown className="text-blue-400" size={24} strokeWidth={2} />
                <ArrowDown className="text-blue-400" size={24} strokeWidth={2} />
                <ArrowDown className="text-blue-400" size={24} strokeWidth={2} />
              </div>
            </div>

            {/* Three Main Screens in a Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Lessons Screen */}
              <div className="w-full bg-purple-50 border-4 border-purple-500 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <BookOpen className="text-purple-600" size={20} />
                  <h3 className="text-purple-900">Lessons Screen</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="text-sm">• Learning Path</div>
                  <div className="text-sm">• Unit Progress Bars</div>
                  <div className="text-sm">• Locked/Unlocked Lessons</div>
                  <div className="text-sm">• Lesson Cards</div>
                  <div className="text-sm">• Unit Completion Status</div>
                </div>
                <div className="mt-4 pt-4 border-t border-purple-300">
                  <div className="text-xs text-purple-700 flex items-center gap-1">
                    <ArrowRight size={14} />
                    <span>Tap lesson → Games</span>
                  </div>
                </div>
              </div>

              {/* Games Screen */}
              <div className="w-full bg-green-50 border-4 border-green-500 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Gamepad2 className="text-green-600" size={20} />
                  <h3 className="text-green-900">Games Screen</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="text-sm">• Quiz Questions</div>
                  <div className="text-sm">• Multiple Choice</div>
                  <div className="text-sm">• Audio Playback</div>
                  <div className="text-sm">• Answer Options</div>
                  <div className="text-sm">• Check Button</div>
                </div>
                <div className="mt-4 pt-4 border-t border-green-300">
                  <div className="text-xs text-green-700 flex items-center gap-1">
                    <ArrowRight size={14} />
                    <span>Complete → Progress</span>
                  </div>
                </div>
              </div>

              {/* Progress Screen */}
              <div className="w-full bg-orange-50 border-4 border-orange-500 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <BarChart3 className="text-orange-600" size={20} />
                  <h3 className="text-orange-900">Progress Screen</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="text-sm">• Statistics Overview</div>
                  <div className="text-sm">• Activity Charts</div>
                  <div className="text-sm">• Achievements</div>
                  <div className="text-sm">• Weekly Goals</div>
                  <div className="text-sm">• Learning Metrics</div>
                </div>
                <div className="mt-4 pt-4 border-t border-orange-300">
                  <div className="text-xs text-orange-700">View Only</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation Explanation */}
          <div className="mt-12 bg-gray-50 rounded-xl p-6 border-2 border-gray-300">
            <h3 className="text-gray-800 mb-4">Bottom Navigation Bar</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Home size={18} className="text-blue-500" />
                <span className="text-sm">Home Tab → Home Screen</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <BookOpen size={18} className="text-purple-500" />
                <span className="text-sm">Lessons Tab → Lessons</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Zap size={18} className="text-green-500" />
                <span className="text-sm">Practice Tab → Practice</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <BarChart3 size={18} className="text-orange-500" />
                <span className="text-sm">Progress Tab → Progress</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Settings size={18} className="text-gray-500" />
                <span className="text-sm">Settings Tab → Settings</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-sm text-gray-600">Bottom navigation is always visible and allows instant access to any main screen</p>
            </div>
          </div>

          {/* Feedback Flow */}
          <div className="mt-12 bg-blue-50 rounded-xl p-6 border-2 border-blue-300">
            <h3 className="text-blue-800 mb-4">Feedback System Flow</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-700">Settings Screen</div>
                <ArrowRight className="text-blue-500" size={20} />
                <div className="text-sm text-gray-700">"Send Feedback" Button</div>
                <ArrowRight className="text-blue-500" size={20} />
                <div className="text-sm text-gray-700">Feedback Dialog</div>
              </div>
              <div className="border-t border-blue-200 my-2"></div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-700">Games (Every 5th Lesson)</div>
                <ArrowRight className="text-blue-500" size={20} />
                <div className="text-sm text-gray-700">Auto-Prompt</div>
                <ArrowRight className="text-blue-500" size={20} />
                <div className="text-sm text-gray-700">Feedback Dialog</div>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-300">
                <p className="text-sm text-gray-700 mb-2">Feedback Dialog Options:</p>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li>• Emoji rating (Terrible → Amazing)</li>
                  <li>• Category (Bug, Feature Request, General)</li>
                  <li>• Optional text comments</li>
                  <li>• Submit or Skip</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Logout Flow */}
          <div className="mt-12 bg-red-50 rounded-xl p-6 border-2 border-red-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-red-800 mb-2">Logout Flow</h3>
                <p className="text-sm text-gray-600">Available from any screen via top-right button</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-700">Any Screen</div>
                <ArrowRight className="text-red-500" size={24} />
                <LogOut className="text-red-500" size={24} />
                <ArrowRight className="text-red-500" size={24} />
                <div className="text-sm text-gray-700">Login Screen</div>
              </div>
            </div>
          </div>

          {/* Key Interactions */}
          <div className="mt-12 bg-gray-50 rounded-xl p-6 border-2 border-gray-300">
            <h3 className="text-gray-800 mb-4">Key User Interactions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="text-gray-700">From Home Screen:</h4>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li>• "Continue Learning" → Jumps directly to Games Screen with smart lesson selection:</li>
                  <li className="ml-4 text-xs">→ New users: First recommended lesson</li>
                  <li className="ml-4 text-xs">→ Active learners: Last incomplete lesson</li>
                  <li className="ml-4 text-xs">→ Returning users: Next in learning path</li>
                  <li>• Streak counter → Motivational display</li>
                  <li>• Goals widget → Progress tracking</li>
                  <li>• Quick Actions → Badges or Schedule</li>
                  <li>• Tab navigation → Other screens</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-gray-700">From Lessons Screen:</h4>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li>• Tap unlocked lesson → Games screen</li>
                  <li>• Locked lessons → No action</li>
                  <li>• Progress bars → Visual feedback</li>
                  <li>• Scroll → View learning path</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-gray-700">From Games Screen:</h4>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li>• Select answer → Highlight choice</li>
                  <li>• "Check" button → Validate answer</li>
                  <li>• Audio icon → Play pronunciation</li>
                  <li>• Complete quiz → Update progress</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-gray-700">From Progress Screen:</h4>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li>• View statistics → Read-only</li>
                  <li>• Charts → Visual progress data</li>
                  <li>• Achievements → Badges earned</li>
                  <li>• Tab navigation → Other screens</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-gray-700">From Settings Screen:</h4>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li>• Send Feedback → Open feedback dialog</li>
                  <li>• Account settings → Profile management</li>
                  <li>• Notifications → Preference toggle</li>
                  <li>• Language → Change interface language</li>
                  <li>• Help & Support → Resources</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-gray-700">Feedback Dialog:</h4>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li>• Emoji rating → Select feeling</li>
                  <li>• Category selection → Choose type</li>
                  <li>• Text input → Share details</li>
                  <li>• Submit/Skip → Send or dismiss</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
