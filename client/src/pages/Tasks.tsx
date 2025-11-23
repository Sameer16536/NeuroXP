import React, { useState } from 'react';
import { Plus, Skull, Clock, Target, Trash2 } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { useGetTasksQuery, useCreateTaskMutation, useCompleteTaskMutation, useDeleteTaskMutation } from '../features/tasks/taskApi';
import { SystemAlert } from '../components/UI/SystemAlert';

const Tasks: React.FC = () => {
  const { data: tasks, isLoading } = useGetTasksQuery();
  const [createTask] = useCreateTaskMutation();
  const [completeTask] = useCompleteTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadline: '',
    xp_reward: 250
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;
    try {
      await createTask(newTask).unwrap();
      setIsModalOpen(false);
      setNewTask({ title: '', description: '', deadline: '', xp_reward: 250 });
    } catch (err) {
      console.error("Failed to create dungeon", err);
    }
  };

  const handleComplete = async (id: string) => {
    try {
      await completeTask(id).unwrap();
    } catch (err) {
      console.error("Failed to clear dungeon", err);
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id).unwrap();
    } catch (err) {
      console.error("Failed to abandon dungeon", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-end md:items-center border-b border-system-border/30 pb-6">
        <div>
          <div className="text-xs font-mono text-system-cyan tracking-[0.2em] mb-2 uppercase">Side Quests</div>
          <h1 className="text-4xl font-display font-bold text-white uppercase tracking-wide system-glow">Dungeon Raids</h1>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="mt-4 md:mt-0">
          <Plus size={18} />
          New Raid
        </Button>
      </div>

      <SystemAlert 
        title="Dungeon Info" 
        message="Completing dungeon raids (Tasks) yields higher XP than daily quests but can only be cleared once."
        type="warning"
      />

      {isLoading ? (
        <div className="text-system-cyan font-mono animate-pulse">SCANNING DUNGEONS...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks?.filter(t => !t.is_completed).map(task => (
                <div key={task.id} className="group relative bg-dark-900 border border-system-border p-6 hover:bg-system-blue/5 hover:border-system-cyan transition-all">
                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => handleDelete(task.id)} className="text-red-500 hover:text-red-400"><Trash2 size={16}/></button>
                    </div>
                    
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-dark-950 border border-system-border/50 text-red-500">
                            <Skull size={24} />
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-display font-bold text-system-cyan">+{task.xp_reward} XP</div>
                            {task.deadline && (
                                <div className="text-xs font-mono text-red-400 flex items-center justify-end gap-1 mt-1">
                                    <Clock size={12} />
                                    {new Date(task.deadline).toLocaleDateString()}
                                </div>
                            )}
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{task.title}</h3>
                    <p className="text-slate-500 text-sm mb-6 min-h-[40px]">{task.description || "No intel provided."}</p>

                    <Button onClick={() => handleComplete(task.id)} className="w-full" variant="secondary">
                        <Target size={16} />
                        CLEAR DUNGEON
                    </Button>
                </div>
            ))}
            
            {tasks?.filter(t => !t.is_completed).length === 0 && (
                <div className="col-span-full py-12 text-center border border-dashed border-slate-800 text-slate-600 font-mono">
                    NO ACTIVE DUNGEONS DETECTED.
                </div>
            )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-system-panel border border-system-border w-full max-w-lg p-8 relative shadow-[0_0_50px_rgba(0,240,255,0.1)]">
             <div className="absolute inset-0 border border-system-cyan opacity-20 pointer-events-none m-1"></div>
             
             <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">Initialize Raid</h2>
             
             <form onSubmit={handleCreate} className="space-y-4">
                <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Operation Name</label>
                    <input 
                        className="w-full bg-black border border-slate-800 p-3 text-white focus:border-system-cyan outline-none font-mono"
                        placeholder="Task Title..."
                        value={newTask.title}
                        onChange={e => setNewTask({...newTask, title: e.target.value})}
                        autoFocus
                    />
                </div>
                <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Intel (Description)</label>
                    <textarea 
                        className="w-full bg-black border border-slate-800 p-3 text-white focus:border-system-cyan outline-none font-mono h-24"
                        placeholder="Details..."
                        value={newTask.description}
                        onChange={e => setNewTask({...newTask, description: e.target.value})}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Deadline</label>
                        <input 
                            type="date"
                            className="w-full bg-black border border-slate-800 p-3 text-white focus:border-system-cyan outline-none font-mono"
                            value={newTask.deadline}
                            onChange={e => setNewTask({...newTask, deadline: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Bounty (XP)</label>
                        <input 
                            type="number"
                            className="w-full bg-black border border-slate-800 p-3 text-white focus:border-system-cyan outline-none font-mono"
                            value={newTask.xp_reward}
                            onChange={e => setNewTask({...newTask, xp_reward: parseInt(e.target.value)})}
                        />
                    </div>
                </div>
                
                <div className="flex justify-end gap-4 mt-8">
                    <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>CANCEL</Button>
                    <Button type="submit">DEPLOY</Button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;