import { Mail, Facebook } from 'lucide-react';
import { SamiFlag } from '../SamiFlag';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="h-full flex flex-col bg-indigo-50/30 p-6">
      {/* Logo/Brand Area */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <div className="w-24 h-24 border-2 border-indigo-300 rounded-full flex items-center justify-center bg-white">
          <SamiFlag size={56} />
        </div>
        
        <div className="text-center space-y-2">
          <div className="h-8 w-48 border-2 border-indigo-300 rounded mx-auto flex items-center justify-center">
            <span className="text-xs text-indigo-600">Speallu</span>
          </div>
          <div className="h-5 w-56 border border-indigo-300 rounded mx-auto flex items-center justify-center">
            <span className="text-xs text-indigo-600">Northern Sami Language Learning App</span>
          </div>
        </div>

        {/* Illustration/Image Area */}
        <div className="w-full h-48 border-2 border-indigo-300 rounded-lg flex items-center justify-center bg-white">
          <span className="text-xs text-indigo-600">Illustration / Hero Image</span>
        </div>
      </div>

      {/* Login Section */}
      <div className="space-y-4 pb-8">
        <div className="h-6 w-32 border border-indigo-300 rounded mx-auto flex items-center justify-center mb-4">
          <span className="text-xs text-indigo-600">Sign in with</span>
        </div>

        {/* Gmail Login Button */}
        <button 
          onClick={onLogin}
          className="w-full h-12 border-2 border-indigo-300 rounded-lg bg-white hover:bg-indigo-50 transition-colors flex items-center justify-center gap-3"
        >
          <Mail className="text-red-500" size={20} />
          <span className="text-xs text-indigo-700">Continue with Gmail</span>
        </button>

        {/* Facebook Login Button */}
        <button 
          onClick={onLogin}
          className="w-full h-12 border-2 border-indigo-300 rounded-lg bg-white hover:bg-indigo-50 transition-colors flex items-center justify-center gap-3"
        >
          <Facebook className="text-blue-600" size={20} />
          <span className="text-xs text-indigo-700">Continue with Facebook</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-indigo-300"></div>
          <span className="text-xs text-indigo-600">or</span>
          <div className="flex-1 h-px bg-indigo-300"></div>
        </div>

        {/* Email Input */}
        <div className="space-y-3">
          <div className="h-12 border-2 border-indigo-300 rounded-lg bg-white flex items-center px-4">
            <span className="text-xs text-indigo-600">Email address</span>
          </div>
          <div className="h-12 border-2 border-indigo-300 rounded-lg bg-white flex items-center px-4">
            <span className="text-xs text-indigo-600">Password</span>
          </div>
        </div>

        {/* Login Button */}
        <button 
          onClick={onLogin}
          className="w-full h-12 border-2 border-indigo-700 bg-indigo-100 rounded-lg flex items-center justify-center"
        >
          <span className="text-xs text-indigo-700">Sign In</span>
        </button>

        {/* Footer Links */}
        <div className="flex justify-between items-center mt-4">
          <div className="h-4 w-32 border border-indigo-300 rounded flex items-center justify-center">
            <span className="text-xs text-indigo-600">Forgot Password?</span>
          </div>
          <div className="h-4 w-24 border border-indigo-300 rounded flex items-center justify-center">
            <span className="text-xs text-indigo-600">Sign Up</span>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="h-10 w-full border border-indigo-300 rounded flex items-center justify-center mt-4 bg-white">
          <span className="text-xs text-indigo-600 text-center px-2">Terms & Privacy Policy</span>
        </div>
      </div>
    </div>
  );
}
