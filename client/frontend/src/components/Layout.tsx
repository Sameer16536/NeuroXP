import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Trophy, User, LogOut, Disc, Sword } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Layout: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 border-l-2 transition-all font-display tracking-wide uppercase ${
      isActive
        ? 'bg-system-blue/10 text-system-blue border-system-blue shadow-[inset_10px_0_20px_-10px_rgba(0,240,255,0.2)]'
        : 'text-slate-500 border-transparent hover:text-slate-200 hover:bg-dark-800'
    }`;

  return (
    <div className="h-screen flex flex-col md:flex-row bg-transparent overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-system-panel/90 backdrop-blur-xl border-r border-system-border flex flex-col flex-shrink-0 h-16 md:h-screen fixed md:relative z-50 bottom-0 md:bottom-auto">
        <div className="p-6 hidden md:flex flex-col items-center justify-center border-b border-system-border/30 bg-black/20">
          <div className="w-16 h-16 bg-dark-950 border-2 border-system-blue rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.2)] mb-3 relative group">
             <Disc size={32} className="text-system-blue animate-spin-slow" />
             <div className="absolute inset-0 rounded-full border border-system-blue/30 scale-110"></div>
          </div>
          <h1 className="font-display font-bold text-2xl text-white tracking-widest uppercase system-glow">NeuroXP</h1>
          <span className="text-[10px] font-mono text-system-cyan tracking-[0.3em] opacity-70">SYSTEM ONLINE</span>
        </div>

        <nav className="flex-1 flex md:flex-col justify-around md:justify-start py-2 md:py-6 overflow-x-auto md:overflow-visible">
          <div className="hidden md:block px-6 py-2 text-xs font-mono text-slate-600 uppercase tracking-widest">Main Menu</div>
          <NavLink to="/dashboard" className={navLinkClass}>
            <LayoutDashboard size={20} />
            <span className="hidden md:inline font-medium">Status</span>
          </NavLink>
          <NavLink to="/habits" className={navLinkClass}>
            <CheckSquare size={20} />
            <span className="hidden md:inline font-medium">Quests</span>
          </NavLink>
          <NavLink to="/tasks" className={navLinkClass}>
            <Sword size={20} />
            <span className="hidden md:inline font-medium">Dungeons</span>
          </NavLink>
          <NavLink to="/leaderboard" className={navLinkClass}>
            <Trophy size={20} />
            <span className="hidden md:inline font-medium">Rankings</span>
          </NavLink>
          <NavLink to="/profile" className={navLinkClass}>
            <User size={20} />
            <span className="hidden md:inline font-medium">Profile</span>
          </NavLink>
        </nav>

        <div className="hidden md:block p-6 border-t border-system-border/30 bg-black/20">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full border border-red-900/30 text-slate-500 hover:text-red-400 hover:bg-red-950/20 transition-all uppercase font-display tracking-widest text-sm"
          >
            <LogOut size={18} />
            <span className="font-bold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto relative pb-20 md:pb-0">
         {/* Background Decoration */}
         <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-system-blue/5 via-transparent to-transparent opacity-50"></div>
         
        <div className="max-w-6xl mx-auto p-4 md:p-10">
           <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;