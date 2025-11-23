import React from 'react';
import { AlertCircle, Info } from 'lucide-react';

interface SystemAlertProps {
  title: string;
  message: string;
  type?: 'info' | 'warning' | 'quest';
}

export const SystemAlert: React.FC<SystemAlertProps> = ({ title, message, type = 'info' }) => {
  const isWarning = type === 'warning';
  const isQuest = type === 'quest';

  const borderColor = isWarning ? 'border-red-500' : isQuest ? 'border-amber-400' : 'border-system-blue';
  const shadowColor = isWarning ? 'shadow-red-900/40' : isQuest ? 'shadow-amber-900/40' : 'shadow-blue-900/40';
  const textColor = isWarning ? 'text-red-100' : isQuest ? 'text-amber-100' : 'text-cyan-100';
  const iconColor = isWarning ? 'text-red-500' : isQuest ? 'text-amber-400' : 'text-system-blue';

  return (
    <div className={`relative w-full max-w-2xl mx-auto mb-6 overflow-hidden bg-black/80 border ${borderColor} shadow-[0_0_20px_rgba(0,0,0,0.5)] ${shadowColor} backdrop-blur-md`}>
      {/* Decorative corners */}
      <div className={`absolute top-0 left-0 w-2 h-2 ${isWarning ? 'bg-red-500' : 'bg-system-blue'}`} />
      <div className={`absolute top-0 right-0 w-2 h-2 ${isWarning ? 'bg-red-500' : 'bg-system-blue'}`} />
      <div className={`absolute bottom-0 left-0 w-2 h-2 ${isWarning ? 'bg-red-500' : 'bg-system-blue'}`} />
      <div className={`absolute bottom-0 right-0 w-2 h-2 ${isWarning ? 'bg-red-500' : 'bg-system-blue'}`} />

      <div className="p-4 flex items-start gap-4">
        <div className={`mt-1 ${iconColor}`}>
          <Info size={24} />
        </div>
        <div>
          <h4 className={`text-sm font-mono font-bold uppercase tracking-widest mb-1 ${iconColor}`}>
            {title}
          </h4>
          <p className={`font-display text-lg leading-tight ${textColor} system-glow`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};