import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';

const Header = ({ role, setRole, setMobileMenuOpen }) => {
  const getGreeting = () => {
    switch (role) {
      case 'student': return 'Welcome back, user';
      case 'teacher': return 'Good morning, Prof. Smith';
      case 'admin': return 'System Dashboard';
      default: return 'Hello!';
    }
  };

  return (
    <header className="flex justify-between items-center px-4 sm:px-8 py-4 mb-8 sticky top-4 z-20 bg-surface backdrop-blur-xl border border-surfaceBorder rounded-2xl shadow-xl">
      <div className="flex items-center gap-4">
        <button className="flex lg:hidden p-2 rounded-xl bg-transparent text-slate-400 hover:bg-surfaceHover hover:text-slate-100 transition-all duration-300 items-center justify-center" onClick={() => setMobileMenuOpen(prev => !prev)}>
          <Menu size={20} />
        </button>
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-1 text-slate-100 font-display">{getGreeting()}</h2>
          <p className="text-sm text-slate-400 hidden sm:block">Here's what's happening today.</p>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden md:flex items-center bg-surfaceHover border border-surfaceBorder px-4 py-2 rounded-full w-52 focus-within:w-64 focus-within:border-brandPrimary focus-within:shadow-[0_0_0_3px_rgba(139,92,246,0.4)] transition-all duration-300">
          <Search size={18} className="text-slate-500 mr-2" />
          <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-slate-100 font-sans w-full" />
        </div>

        <div className="flex items-center gap-2 bg-brandPrimary/10 px-3 py-1.5 rounded-lg border border-brandPrimary/40">
          <span className="text-slate-400 text-sm hidden sm:block">View as:</span>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="bg-transparent border-none text-brandPrimary font-sans font-semibold outline-none cursor-pointer"
          >
            <option value="student" className="bg-bgStart text-slate-100">Student</option>
            <option value="teacher" className="bg-bgStart text-slate-100">Teacher</option>
            <option value="admin" className="bg-bgStart text-slate-100">Admin</option>
          </select>
        </div>

        <button className="relative p-2 rounded-xl bg-transparent text-slate-400 hover:bg-surfaceHover hover:text-slate-100 transition-all duration-300 items-center justify-center">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_0_2px_#161925]"></span>
        </button>

        <div>
          <img 
            src={`https://ui-avatars.com/api/?name=${role}&background=8b5cf6&color=fff`} 
            alt="Profile Avatar" 
            className="w-10 h-10 rounded-full border-2 border-brandPrimary cursor-pointer hover:scale-105 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all duration-300"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
