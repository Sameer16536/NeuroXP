import React from 'react';

interface XPBarProps {
  current: number;
  max: number;
  level: number;
  label?: string; // e.g. "EXP" or "HP"
  color?: string;
}

export const XPBar: React.FC<XPBarProps> = ({ current, max, level, label = "EXP", color = "bg-system-blue" }) => {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">{label}</span>
          <span className="text-xl font-display font-bold text-white leading-none">LVL {level}</span>
        </div>
        <div className="text-xs text-cyan-600 font-mono tracking-widest">
          <span className="text-white">{current}</span> / {max}
        </div>
      </div>
      <div className="h-4 w-full bg-dark-900 border border-system-border relative">
        {/* Grid lines inside bar */}
        <div className="absolute inset-0 flex justify-between px-2 opacity-30 z-10 pointer-events-none">
            {[...Array(10)].map((_, i) => <div key={i} className="w-px h-full bg-dark-950"></div>)}
        </div>
        <div 
          className={`h-full ${color} transition-all duration-700 ease-out shadow-[0_0_15px_rgba(0,240,255,0.3)] relative overflow-hidden`}
          style={{ width: `${percentage}%` }}
        >
             <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};