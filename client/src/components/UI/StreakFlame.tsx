import React from 'react';
import { Flame } from 'lucide-react';

interface StreakFlameProps {
  streak: number;
}

export const StreakFlame: React.FC<StreakFlameProps> = ({ streak }) => {
  // Determine intensity based on streak
  const getIntensity = (days: number) => {
    if (days >= 30) return { color: 'text-purple-500', scale: 'scale-125', dropShadow: 'drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]' };
    if (days >= 14) return { color: 'text-blue-500', scale: 'scale-110', dropShadow: 'drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]' };
    if (days >= 7) return { color: 'text-amber-500', scale: 'scale-105', dropShadow: 'drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]' };
    return { color: 'text-slate-500', scale: 'scale-100', dropShadow: '' };
  };

  const style = getIntensity(streak);
  const hasStreak = streak > 0;

  return (
    <div className="relative flex flex-col items-center justify-center group cursor-help">
      <div className={`transition-all duration-500 ${style.scale} ${style.dropShadow} ${hasStreak ? 'animate-pulse-fast' : 'opacity-50'}`}>
         {/* Layered flames for effect */}
         <div className="relative">
            <Flame 
                size={48} 
                className={`absolute inset-0 ${style.color} blur-sm opacity-50 animate-pulse`} 
            />
            <Flame 
                size={48} 
                className={`relative z-10 ${style.color} fill-current`} 
            />
         </div>
      </div>
      
      <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 border border-system-blue text-xs text-white px-2 py-1 rounded font-mono whitespace-nowrap z-50 pointer-events-none">
        {streak} Day Streak
      </div>

      <div className={`mt-1 font-display font-bold text-2xl ${style.color} drop-shadow-md`}>
        {streak}
      </div>
      <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
        Streak
      </div>
    </div>
  );
};