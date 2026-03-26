import React from 'react';

const ProgressBar = ({ current, total, label }) => {
  const percentage = total === 0 ? 0 : Math.round((current / total) * 100);
  
  let colorClass = 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]';
  if (percentage >= 50) colorClass = 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]';
  if (percentage >= 80) colorClass = 'bg-brandPrimary shadow-[0_0_10px_rgba(139,92,246,0.3)]';
  if (percentage === 100) colorClass = 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]';

  return (
    <div className="flex flex-col gap-2 w-full min-w-[120px]">
      <div className="flex justify-between items-center text-xs font-sans font-medium">
        <span className="text-slate-100">{label || `${percentage}%`}</span>
        <span className="text-slate-400">{current} / {total}</span>
      </div>
      <div className="w-full h-1.5 bg-surfaceHover rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorClass}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
