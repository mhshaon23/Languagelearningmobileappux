import { Mail, Facebook } from 'lucide-react';
import { SamiFlag } from './SamiFlag';
import { useState } from 'react';
import auroraBackground from 'figma:asset/7d6015537834f5cbb7c4490063d2715a7e5099d9.png';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div 
      className="h-full w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative overflow-hidden" 
      style={{ backgroundImage: `url(${auroraBackground})` }}
      role="main"
    >
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none z-0" aria-hidden="true"></div>
      
      {/* Content wrapper with higher z-index - mobile-first with max-width for larger screens */}
      <div className="relative z-20 w-full max-w-md mx-auto h-full flex flex-col p-6">
        {/* Logo/Brand Area */}
        <header className="flex-1 flex flex-col items-center justify-center space-y-8">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center bg-white shadow-lg"
            role="img"
            aria-label="Speallu app logo featuring Northern Sami flag"
          >
            <SamiFlag size={56} />
          </div>
          
          <div className="text-center space-y-2">
            <h1 className="text-white drop-shadow-lg">Speallu</h1>
            <p className="text-white drop-shadow-md">Northern Sami Language Learning App</p>
          </div>
        </header>

        {/* Login Section */}
        <section className="space-y-4 pb-8" aria-label="Login options">
          <p className="text-center text-white drop-shadow-md mb-4" id="signin-label">Sign in with</p>

          {/* Social Login Buttons */}
          <div className="space-y-3" role="group" aria-labelledby="signin-label">
            {/* Gmail Login Button */}
            <button 
              onClick={onLogin}
              className="w-full h-12 rounded-lg bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 shadow-sm border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Continue with Gmail"
            >
              <Mail className="text-red-500" size={20} aria-hidden="true" />
              <span className="text-gray-700">Continue with Gmail</span>
            </button>

            {/* Facebook Login Button */}
            <button 
              onClick={onLogin}
              className="w-full h-12 rounded-lg bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 shadow-sm border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Continue with Facebook"
            >
              <Facebook className="text-blue-600" size={20} aria-hidden="true" />
              <span className="text-gray-700">Continue with Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4" role="separator" aria-label="or">
            <div className="flex-1 h-px bg-white/40" aria-hidden="true"></div>
            <span className="text-white drop-shadow-md">or</span>
            <div className="flex-1 h-px bg-white/40" aria-hidden="true"></div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-3" noValidate>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                autoComplete="email"
                required
                aria-required="true"
                className="w-full h-12 rounded-lg bg-white px-4 shadow-sm border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                required
                aria-required="true"
                className="w-full h-12 rounded-lg bg-white px-4 shadow-sm border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center shadow-md transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Sign in to your account"
            >
              <span>Sign In</span>
            </button>
          </form>

          {/* Footer Links */}
          <nav className="flex justify-between items-center mt-4" aria-label="Account options">
            <button 
              className="text-white drop-shadow-md hover:text-cyan-200 underline focus:ring-2 focus:ring-cyan-400 focus:outline-none rounded px-2 py-1"
              aria-label="Forgot your password?"
            >
              Forgot Password?
            </button>
            <button 
              className="text-white drop-shadow-md hover:text-cyan-200 underline focus:ring-2 focus:ring-cyan-400 focus:outline-none rounded px-2 py-1"
              aria-label="Create a new account"
            >
              Sign Up
            </button>
          </nav>

          {/* Privacy Notice */}
          <div className="text-center mt-4">
            <button 
              className="text-white/90 drop-shadow-md hover:text-cyan-200 underline focus:ring-2 focus:ring-cyan-400 focus:outline-none rounded px-2 py-1"
              aria-label="View terms and privacy policy"
            >
              Terms & Privacy Policy
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
