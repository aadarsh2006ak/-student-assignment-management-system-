import React from 'react';

const MetricCard = ({ title, value, icon: Icon, trend, colorClass = "primary" }) => {
  const getColors = () => {
    switch(colorClass) {
      case 'success': return 'bg-emerald-500/15 text-emerald-500';
      case 'warning': return 'bg-amber-500/15 text-amber-500';
      case 'danger': return 'bg-rose-500/15 text-rose-500';
      default: return 'bg-brandPrimary/20 text-brandPrimary';
    }
  };

  return (
    <div className="p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-white/20 bg-surface backdrop-blur-xl border border-surfaceBorder rounded-2xl shadow-xl">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-slate-400 m-0">{title}</h3>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getColors()}`}>
          {Icon && <Icon size={20} />}
        </div>
      </div>
      <div className="flex flex-col gap-1 text-left">
        <h2 className="text-3xl font-display font-semibold m-0 text-slate-100">{value}</h2>
        {trend && (
          <span className={`text-sm font-medium flex items-center gap-1 ${trend > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            <span className="font-normal text-slate-500"> vs last week</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
