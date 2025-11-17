import { Lightbulb } from 'lucide-react';

interface GoalIconProps {
  size?: number;
  className?: string;
}

export function GoalIcon({ size = 20, className = '' }: GoalIconProps) {
  return (
    <div className={`bg-gradient-to-br from-blue-400 to-cyan-500 p-2 rounded-full inline-flex items-center justify-center ${className}`}>
      <Lightbulb size={size} className="text-white" />
    </div>
  );
}
