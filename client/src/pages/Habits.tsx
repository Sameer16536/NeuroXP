import React, { useState } from 'react';
import { Plus, Check,  Scroll } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { useGetHabitsQuery, useCreateHabitMutation, useCompleteHabitMutation } from '../features/habits/habitsApi';
import { HabitFrequency, HabitPriority } from '../types';

const Habits: React.FC = () => {
  const { data: habits, isLoading } = useGetHabitsQuery();
  const [createHabit] = useCreateHabitMutation();
  const [completeHabit] = useCompleteHabitMutation();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHabit, setNewHabit] = useState({
    title: '',
    priority: HabitPriority.MEDIUM,
    frequency: HabitFrequency.DAILY,
    xp_reward: 100
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabit.title) return;
    
    try {
      await createHabit(newHabit).unwrap();
      setIsModalOpen(false);
      setNewHabit({ title: '', priority: HabitPriority.MEDIUM, frequency: HabitFrequency.DAILY, xp_reward: 100 });
    } catch (err) {
      console.error("Failed to create habit", err);
    }
  };

  const handleComplete = async (id: string) => {
    try {
      await completeHabit(id).unwrap();
    } catch (err) {
      console.error("Failed to complete habit", err);
    }
  };

  // Helper to get Rank style
  const getRankInfo = (priority: HabitPriority) => {
    switch(priority) {
      case HabitPriority.HIGH: return { rank: 'S', color: 'text-red-500', border: 'border-red-500/50', bg: 'bg-red-500/10' };
      case HabitPriority.MEDIUM: return { rank: 'B', color: 'text-amber-500', border: 'border-amber-500/50', bg: 'bg-amber-500/10' };
      default: return { rank: 'E', color: 'text-slate-400', border: 'border-slate-500/50', bg: 'bg-slate-500/10' };
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 border-b border-system-border/30 pb-6">
        <div>
          <div className="text-xs font-mono text-system-cyan tracking-[0.2em] mb-2 uppercase">System Log</div>
          <h1 className="text-4xl font-display font-bold text-white uppercase tracking-wide system-glow">Quest Log</h1>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="mt-4 md:mt-0">
          <Plus size={18} />
          New Quest
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
           {[1, 2, 3].map(i => <div key={i} className="h-24 bg-dark-900 border border-dark-800 animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-4">
          {habits?.map((habit) => {
            const rank = getRankInfo(habit.priority);
            return (
              <div 
                key={habit.id} 
                className={`group relative bg-black/40 border-l-4 ${rank.border} border-t border-r border-b border-system-border/30 p-6 transition-all hover:bg-system-blue/5 hover:border-system-cyan flex items-center justify-between overflow-hidden`}
              >
                 {/* Decorative Background ID */}
                 <div className="absolute right-0 top-0 text-[100px] font-display font-bold text-white/5 leading-none -mt-4 -mr-4 pointer-events-none select-none">
                    {rank.rank}
                 </div>

                 <div className="flex items-center gap-6 relative z-10">
                   <button 
                     onClick={() => !habit.is_completed_today && handleComplete(habit.id)}
                     disabled={habit.is_completed_today}
                     className={`w-14 h-14 clip-path-polygon flex items-center justify-center transition-all border ${
                       habit.is_completed_today 
                         ? 'bg-system-cyan/20 border-system-cyan text-system-cyan' 
                         : 'bg-dark-950 border-slate-700 text-slate-700 hover:border-system-blue hover:text-system-blue'
                     }`}
                     style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)' }}
                   >
                     <Check size={28} strokeWidth={3} />
                   </button>
                   <div>
                     <div className="flex items-center gap-3 mb-1">
                        <span className={`font-display font-bold text-2xl ${rank.color}`}>
                           Rank {rank.rank}
                        </span>
                        <span className="text-xs font-mono text-slate-500 bg-dark-950 px-2 py-0.5 border border-slate-800 uppercase tracking-wider">
                          {habit.frequency}
                        </span>
                     </div>
                     <h3 className={`font-medium text-lg tracking-wide ${habit.is_completed_today ? 'text-slate-500 line-through decoration-slate-600' : 'text-slate-200'}`}>
                        {habit.title}
                     </h3>
                   </div>
                 </div>

                 <div className="flex flex-col items-end relative z-10">
                    <span className="text-xs font-mono text-slate-500 uppercase mb-1">Reward</span>
                    <span className="font-display font-bold text-xl text-system-cyan drop-shadow-[0_0_5px_rgba(14,165,233,0.5)]">
                      +{habit.xp_reward} XP
                    </span>
                 </div>
              </div>
            );
          })}
          
          {habits?.length === 0 && (
             <div className="text-center py-20 border border-dashed border-slate-800 bg-black/20">
                <Scroll size={48} className="mx-auto text-slate-700 mb-6" />
                <p className="text-slate-500 font-mono text-lg">QUEST LOG EMPTY</p>
                <p className="text-slate-600 text-sm mt-2">Initialize new protocols to begin.</p>
             </div>
          )}
        </div>
      )}

      {/* Modal for creating habit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-system-panel border border-system-border w-full max-w-lg p-1 relative shadow-[0_0_50px_rgba(0,240,255,0.1)]">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-system-cyan"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-system-cyan"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-system-cyan"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-system-cyan"></div>

            <div className="p-8 bg-dark-950/80">
                <h2 className="text-2xl font-display font-bold text-white mb-1 uppercase tracking-wider">New Quest</h2>
                <p className="text-system-blue text-xs font-mono mb-6">DEFINE PARAMETERS</p>
                
                <form onSubmit={handleCreate} className="space-y-6">
                <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-2 tracking-widest">Target Objective</label>
                    <input 
                    className="w-full bg-black border border-slate-800 p-4 text-white focus:border-system-cyan focus:shadow-[0_0_15px_rgba(14,165,233,0.3)] outline-none transition-all font-mono"
                    placeholder="ENTER OBJECTIVE..."
                    value={newHabit.title}
                    onChange={e => setNewHabit({...newHabit, title: e.target.value})}
                    autoFocus
                    />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-2 tracking-widest">Difficulty Rank</label>
                    <select 
                        className="w-full bg-black border border-slate-800 p-4 text-white outline-none focus:border-system-cyan font-mono"
                        value={newHabit.priority}
                        onChange={e => setNewHabit({...newHabit, priority: e.target.value as HabitPriority})}
                    >
                        <option value={HabitPriority.LOW}>RANK E (Low)</option>
                        <option value={HabitPriority.MEDIUM}>RANK B (Medium)</option>
                        <option value={HabitPriority.HIGH}>RANK S (High)</option>
                    </select>
                    </div>
                    <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-2 tracking-widest">XP Yield</label>
                    <input 
                        type="number"
                        className="w-full bg-black border border-slate-800 p-4 text-white outline-none focus:border-system-cyan font-mono"
                        value={newHabit.xp_reward}
                        onChange={e => setNewHabit({...newHabit, xp_reward: parseInt(e.target.value)})}
                    />
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-slate-800">
                    <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>ABORT</Button>
                    <Button type="submit">CONFIRM</Button>
                </div>
                </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Habits;