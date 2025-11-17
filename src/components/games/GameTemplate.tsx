import { ArrowLeft, Trophy } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface GameTemplateProps {
  gameId: number;
  gameTitle: string;
  gameIcon: string;
  onExit: () => void;
  onComplete?: () => void;
}

export function GameTemplate({ gameId, gameTitle, gameIcon, onExit, onComplete }: GameTemplateProps) {
  const handleComplete = () => {
    onComplete?.();
    onExit();
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1733395445556-de9323e37a00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMDNkJTIwYmFja2dyb3VuZCUyMGFic3RyYWN0fGVufDF8fHx8MTc2MjE4MDA4MHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="3D Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/90 to-gray-100/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onExit}
              className="text-gray-600 hover:text-gray-700 flex items-center gap-2"
            >
              <ArrowLeft size={24} />
              <span>Exit</span>
            </button>
            <div className="flex-1 flex items-center justify-center gap-2">
              <span className="text-2xl">{gameIcon}</span>
              <h2 className="text-gray-800">{gameTitle}</h2>
            </div>
          </div>
        </div>

        {/* Game Content */}
        <div className="flex-1 px-6 pb-6 flex flex-col items-center justify-center">
          <div className="text-center space-y-6 max-w-md">
            {/* 3D Character */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-gray-300">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1760434600537-024e2771d580?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHJlbmRlciUyMGNoYXJhY3RlciUyMGN1dGV8ZW58MXx8fHwxNzYyMTgwMDgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="3D Character"
                className="w-full h-48 object-cover rounded-2xl mb-4"
              />
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-gray-800">Game Coming Soon!</h3>
            </div>
            
            <p className="text-gray-600">
              This game is under development and will be available soon. 
              <br />
              <br />
              It will feature Northern Sami language learning content in a fun and engaging way!
            </p>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-4 border-gray-200">
              <div className="flex items-center justify-center gap-2 text-gray-700 mb-2">
                <Trophy className="text-yellow-500" size={20} />
                <span>Preview Features:</span>
              </div>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• Interactive Northern Sami exercises</li>
                <li>• 3D cartoon characters and backgrounds</li>
                <li>• Vocabulary building activities</li>
                <li>• Points and rewards system</li>
                <li>• Progress tracking</li>
              </ul>
            </div>

            <button
              onClick={handleComplete}
              className="w-full h-14 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 border-4 border-gray-300"
            >
              ← Back to Games Library
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
