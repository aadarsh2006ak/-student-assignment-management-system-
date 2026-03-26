import React from 'react';
import { BookOpen, CheckSquare, Users, BarChart2, Settings, LogOut, Home } from 'lucide-react';

const Sidebar = ({ role, activeTab, setActiveTab, mobileMenuOpen }) => {
  const getNavItems = () => {
    switch(role) {
      case 'student':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'assignments', label: 'My Assignments', icon: BookOpen },
          { id: 'grades', label: 'Grades & Feedback', icon: CheckSquare },
        ];
      case 'teacher':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'manage', label: 'Manage Assignments', icon: BookOpen },
          { id: 'students', label: 'My Students', icon: Users },
          { id: 'grading', label: 'Grading', icon: CheckSquare },
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Overview', icon: Home },
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'system', label: 'System Stats', icon: BarChart2 },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      default:
        return [];
    }
  };

  const items = getNavItems();

  return (
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-50
      w-[280px] h-full lg:h-[calc(100vh-2rem)] 
      lg:my-4 lg:ml-4 flex flex-col shrink-0 
      transition-transform duration-300 ease-in-out
      ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      bg-surface backdrop-blur-xl shadow-xl !rounded-none lg:!rounded-2xl border-l-0 lg:border-l border-y-0 lg:border-y border-surfaceBorder
    `}>
      <div className="p-8 border-b border-surfaceBorder">
        <div className="flex items-center gap-3">
          <div className="bg-surfaceHover p-2 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.4)]">
            <BookOpen size={24} className="text-brandPrimary" />
          </div>
          <h2 className="text-2xl font-bold font-display bg-gradient-to-br from-white to-brandPrimary bg-clip-text text-transparent m-0">
            EduDash
          </h2>
        </div>
      </div>
      
      <nav className="p-6 flex-1 flex flex-col gap-2 overflow-y-auto">
        {items.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                flex items-center gap-4 w-full p-3.5 rounded-xl font-medium text-[15px]
                transition-all duration-300 relative overflow-hidden group
                ${isActive 
                  ? 'bg-brandPrimary/20 text-white border border-brandPrimary/30 shadow-inner' 
                  : 'bg-transparent text-slate-400 border border-transparent hover:bg-surfaceHover hover:text-slate-100 hover:translate-x-1'}
              `}
            >
              <Icon size={20} className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-inherit group-hover:text-slate-100'}`} />
              <span>{item.label}</span>
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-1 bg-brandSecondary rounded-r-md shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              )}
            </button>
          );
        })}
      </nav>
      
      <div className="p-6 border-t border-surfaceBorder">
        <button className="flex items-center gap-4 w-full p-3.5 rounded-xl font-medium text-[15px] text-slate-400 border border-transparent hover:bg-rose-500/15 hover:text-rose-500 hover:border-rose-500/20 transition-all duration-300">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
