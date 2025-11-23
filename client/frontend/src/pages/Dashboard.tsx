import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { XPBar } from '../components/UI/XPBar';
import { SystemAlert } from '../components/UI/SystemAlert';
import { StreakFlame } from '../components/UI/StreakFlame';
import { LevelUpModal } from '../components/UI/LevelUpModal';
import { Flame, Activity, Zap, Skull, Shield, Sword, AlertTriangle } from 'lucide-react';
import { useGetHabitsQuery } from '../features/habits/habitsApi';
import { useGetMeQuery } from '../features/auth/authApi';

// A mock component to display attributes like Strength/Agility
const AttributeRow: React.FC<{ label: string; value: number; icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="flex items-center justify-between py-2 border-b border-white/5">
    <div className="flex items-center gap-3">
      <div className="text-slate-500">{icon}</div>
      <span className="text-slate-300 font-mono uppercase tracking-wider text-sm">{label}</span>
    </div>
    <span className="text-white font-display font-bold text-lg">{value}</span>
  </div>
);

const Dashboard: React.FC = () => {
  const { user: authUser } = useSelector((state: RootState) => state.auth);
  const { data: apiUser } = useGetMeQuery(undefined, { skip: !authUser });
  const user = apiUser || authUser;

  const { data: habits, isLoading: habitsLoading } = useGetHabitsQuery();

  // State for Level Up Modal
  const [showLevelUp, setShowLevelUp] = useState(false);
  const prevLevelRef = useRef<number | null>(null);

  useEffect(() => {
    if (user?.level) {
      if (prevLevelRef.current !== null && user.level > prevLevelRef.current) {
        setShowLevelUp(true);
      }
      prevLevelRef.current = user.level;
    }
  }, [user?.level]);

  const level = user?.level || 1;
  const currentXp = user?.current_xp || 0;
  const xpToNext = user?.xp_to_next_level || 1000;
  const streak = user?.streak_days || 0;

  const todayHabits = habits || [];
  const completedToday = todayHabits.filter(h => h.is_completed_today).length;
  const totalHabits = todayHabits.length;
  const completionPercentage = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;

  // Boss Info (Mocked based on level)
  const bossName = `Level ${level} Dungeon Boss`;
  const bossHealth = 100 - completionPercentage;

  // Determine Player Rank Title based on Level
  const getPlayerTitle = (lvl: number) => {
    if (lvl < 5) return "E-Rank Hunter";
    if (lvl < 10) return "D-Rank Hunter";
    if (lvl < 20) return "C-Rank Hunter";
    if (lvl < 40) return "B-Rank Hunter";
    if (lvl < 60) return "A-Rank Hunter";
    return "S-Rank Hunter";
  };

  const getJobClass = () => "Shadow Monarch"; 

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {showLevelUp && <LevelUpModal level={level} onClose={() => setShowLevelUp(false)} />}
      
      {/* System Welcome Message */}
      <SystemAlert 
        title="System Notification" 
        message="Daily Quest 'Player Growth' has arrived."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Avatar & Main Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div className="system-border bg-system-panel/80 p-1 relative">
            <div className="bg-black/50 p-6 flex flex-col items-center text-center">
              
              <div className="relative mb-6">
                 {/* Avatar Container */}
                <div className="w-32 h-32 bg-dark-900 border-2 border-system-blue flex items-center justify-center relative overflow-hidden group z-10">
                    <div className="absolute inset-0 bg-system-blue/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="font-display text-4xl font-bold text-system-blue">{user?.username?.[0] || 'P'}</span>
                </div>
                
                {/* Streak Badge - Absolute positioned overlapping avatar */}
                <div className="absolute -bottom-4 -right-4 z-20">
                    <StreakFlame streak={streak} />
                </div>
              </div>
              
              <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider">{user?.username || 'Unknown'}</h2>
              <div className="inline-block px-3 py-1 border border-system-border bg-system-blue/10 text-system-cyan text-xs font-mono mt-2 mb-4">
                {getPlayerTitle(level)}
              </div>

              <div className="w-full space-y-4 text-left mt-2">
                <div>
                   <div className="flex justify-between text-xs text-slate-400 mb-1 font-mono">
                      <span>HP (Task Completion)</span>
                      <span>{Math.round(completionPercentage)}%</span>
                   </div>
                   <div className="h-2 bg-dark-950 border border-dark-800 w-full">
                      <div className="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)] transition-all duration-700" style={{ width: `${completionPercentage}%` }}></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-xs text-slate-400 mb-1 font-mono">
                      <span>MP (Energy)</span>
                      <span>100%</span>
                   </div>
                   <div className="h-2 bg-dark-950 border border-dark-800 w-full">
                      <div className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" style={{ width: '100%' }}></div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="system-border bg-system-panel/80 p-6">
            <h3 className="text-system-cyan font-mono text-sm font-bold uppercase mb-4 border-b border-system-border/50 pb-2">
              Player Stats
            </h3>
            <div className="space-y-1">
               <AttributeRow label="Strength" value={level * 5 + 10} icon={<Sword size={16} />} />
               <AttributeRow label="Agility" value={streak * 2 + 10} icon={<Zap size={16} />} />
               <AttributeRow label="Vitality" value={100} icon={<Activity size={16} />} />
               <AttributeRow label="Intelligence" value={level * 3 + 12} icon={<Shield size={16} />} />
            </div>
          </div>
        </div>

        {/* Right Column: Quests & Details */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main XP Bar & Job Info */}
          <div className="bg-black/40 border border-system-border p-6 backdrop-blur-sm relative overflow-hidden">
             {/* Boss Battle Visual */}
             <div className="absolute right-0 top-0 p-4 opacity-20 pointer-events-none">
                 <Skull size={120} className="text-red-900" />
             </div>

             <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <h3 className="text-xl font-display font-bold text-white uppercase">Job: {getJobClass()}</h3>
                  <div className="flex items-center gap-2 text-slate-400 text-sm font-mono mt-1">
                     <AlertTriangle size={12} className="text-red-500" />
                     <span>BOSS: {bossName}</span>
                     <span className="text-red-500 font-bold">({Math.max(0, Math.round(bossHealth))} HP)</span>
                  </div>
                </div>
                <div className="text-right">
                   <div className="text-3xl font-display font-bold text-system-blue">LVL {level}</div>
                </div>
             </div>
             <XPBar current={currentXp} max={xpToNext} level={level} />
          </div>

          {/* Daily Quest Section */}
          <div className="relative">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                 <span className="w-2 h-6 bg-system-blue block"></span>
                 Current Quests
               </h3>
               <div className="text-xs font-mono text-red-400 animate-pulse flex items-center gap-1">
                 <Skull size={14} />
                 PENALTY ZONE ACTIVE
               </div>
             </div>

             <div className="grid gap-3">
               {habitsLoading && <div className="text-system-cyan font-mono animate-pulse">LOADING SYSTEM DATA...</div>}
               
               {todayHabits.length === 0 && !habitsLoading && (
                  <div className="border border-dashed border-slate-700 p-8 text-center">
                    <p className="text-slate-500 font-mono">NO QUESTS ASSIGNED.</p>
                  </div>
               )}

               {todayHabits.map((habit) => (
                 <div key={habit.id} className="group bg-dark-900/50 border border-system-border hover:bg-system-blue/5 transition-all p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className={`w-8 h-8 flex items-center justify-center font-bold font-display text-lg border ${
                         habit.priority === 'HIGH' ? 'border-red-500 text-red-500' : 
                         habit.priority === 'MEDIUM' ? 'border-amber-500 text-amber-500' : 
                         'border-slate-500 text-slate-500'
                       }`}>
                         {habit.priority === 'HIGH' ? 'S' : habit.priority === 'MEDIUM' ? 'B' : 'E'}
                       </div>
                       <div>
                         <div className={`font-medium ${habit.is_completed_today ? 'text-slate-500 line-through' : 'text-white'}`}>
                           {habit.title}
                         </div>
                         <div className="text-xs text-slate-500 font-mono uppercase mt-0.5">
                           Rank {habit.priority === 'HIGH' ? 'S' : habit.priority === 'MEDIUM' ? 'B' : 'E'} Quest
                         </div>
                       </div>
                    </div>
                    <div className="font-mono text-system-cyan text-sm">
                      {habit.is_completed_today ? 'COMPLETED' : 'INCOMPLETE'}
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;