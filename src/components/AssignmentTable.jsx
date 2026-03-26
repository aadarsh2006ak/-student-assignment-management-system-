import React from 'react';
import { MoreVertical } from 'lucide-react';

const AssignmentTable = ({ data, columns }) => {
  if (!data || data.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl bg-surface backdrop-blur-xl border border-surfaceBorder shadow-xl">
        <p className="text-slate-400">No data available to display.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl p-0 bg-surface backdrop-blur-xl border border-surfaceBorder shadow-xl relative [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
      <table className="w-full min-w-[700px] border-collapse text-left whitespace-nowrap">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="p-4 sm:px-6 sm:py-5 font-display font-medium text-slate-400 border-b border-surfaceBorder bg-surface/50">
                {col.header}
              </th>
            ))}
            <th className="p-4 sm:px-6 sm:py-5 text-right font-display font-medium text-slate-400 border-b border-surfaceBorder bg-surface/50 w-16">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="transition-all hover:bg-white/5 border-b border-surfaceBorder last:border-0">
              {columns.map((col, i) => (
                <td key={i} className="p-4 sm:px-6 sm:py-4 text-slate-100 align-middle">
                  {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                </td>
              ))}
              <td className="p-4 sm:px-6 sm:py-4 text-right">
                <button className="p-2 rounded-xl bg-transparent text-slate-400 hover:bg-surfaceHover hover:text-slate-100 transition-all duration-300 inline-flex items-center justify-center">
                  <MoreVertical size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentTable;
