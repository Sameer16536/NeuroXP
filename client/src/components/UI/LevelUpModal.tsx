import React, { useEffect } from 'react';
import { Button } from './Button';
import { Trophy, Star } from 'lucide-react';

interface LevelUpModalProps {
  level: number;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({ level, onClose }) => {
  useEffect(() => {
    // Play sound effect on mount
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Audio play blocked", e));
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-lg text-center">
        {/* Background Glitch Effects */}
        <div className="absolute inset-0 bg-system-blue/5 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative z-10 bg-dark-950/80 border-y-2 border-system-blue p-10 shadow-[0_0_50px_rgba(0,240,255,0.3)] overflow-hidden">
             {/* Decorative Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="mb-6 relative">
                    <Trophy size={80} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] animate-bounce" />
                    <Star size={30} className="text-white absolute -top-2 -right-4 animate-ping" />
                    <Star size={20} className="text-white absolute top-10 -left-6 animate-pulse" />
                </div>
                
                <h2 className="text-5xl font-display font-bold text-white mb-2 tracking-wider system-glow animate-pulse">
                    LEVEL UP!
                </h2>
                
                <div className="w-full h-px bg-gradient-to-r from-transparent via-system-blue to-transparent my-4"></div>
                
                <p className="text-system-cyan font-mono text-lg mb-8 uppercase tracking-widest">
                    You have reached Level {level}
                </p>

                <div className="grid grid-cols-2 gap-4 w-full mb-8">
                    <div className="bg-white/5 border border-white/10 p-3">
                        <div className="text-slate-400 text-xs font-mono uppercase">Strength</div>
                        <div className="text-green-400 font-bold">+5</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3">
                        <div className="text-slate-400 text-xs font-mono uppercase">Status Points</div>
                        <div className="text-green-400 font-bold">+3</div>
                    </div>
                </div>
                
                <Button onClick={onClose} className="w-full animate-pulse-fast">
                    ACCEPT REWARD
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
};