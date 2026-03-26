import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div className="w-full max-w-lg bg-bgStart rounded-2xl flex flex-col shadow-[0_20px_40px_rgba(0,0,0,0.4)] max-h-[90vh] overflow-y-auto border border-surfaceBorder" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-5 border-b border-surfaceBorder flex justify-between items-center bg-surface/30">
          <h3 className="m-0 text-xl font-semibold text-slate-100 font-display">{title}</h3>
          <button className="p-2 rounded-xl bg-transparent text-slate-400 hover:bg-surfaceHover hover:text-slate-100 transition-all duration-300 flex items-center justify-center" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="p-6 text-slate-200">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
