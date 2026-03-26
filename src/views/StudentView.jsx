import React, { useState } from 'react';
import MetricCard from '../components/MetricCard';
import AssignmentTable from '../components/AssignmentTable';
import Modal from '../components/Modal';
import ProgressBar from '../components/ProgressBar';
import { BookOpen, Clock, Award, CheckCircle, ExternalLink } from 'lucide-react';

const StudentView = ({ assignments, submissions, studentId, submitAssignment }) => {
  const [modalState, setModalState] = useState({ isOpen: false, step: 1, assignment: null });

  // Join assignments with student's specific submissions
  const studentData = assignments.map(a => {
    const sub = submissions.find(s => s.assignmentId === a.id && s.studentId === studentId);
    return {
      ...a,
      status: sub ? sub.status : 'Pending',
    };
  });

  const handleOpenSubmit = (assignment) => {
    setModalState({ isOpen: true, step: 1, assignment });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, step: 1, assignment: null });
  };

  const handleConfirmStep1 = () => {
    setModalState(prev => ({ ...prev, step: 2 }));
  };

  const handleFinalSubmit = () => {
    if (modalState.assignment) {
      submitAssignment(modalState.assignment.id, studentId);
    }
    closeModal();
  };

  const columns = [
    { header: 'Title', accessor: 'title', render: (val, row) => (
        <div className="flex flex-col gap-1 w-full max-w-[200px] overflow-hidden">
          <span className="text-brandPrimary bg-brandPrimary/10 px-2 py-0.5 rounded text-xs w-fit">{row.course}</span>
          <span>{val}</span>
        </div>
      ) 
    },
    { header: 'Due Date', accessor: 'dueDate' },
    { header: 'Status', accessor: 'status', render: (val) => {
        let badgeClass = 'bg-rose-500/15 text-rose-500';
        if (val === 'Graded') badgeClass = 'bg-emerald-500/15 text-emerald-500';
        if (val === 'Submitted') badgeClass = 'bg-emerald-500/15 text-emerald-500';
        if (val === 'In Progress') badgeClass = 'bg-slate-500/15 text-slate-300';
        if (val === 'Pending') badgeClass = 'bg-amber-500/15 text-amber-500';
        return <span className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${badgeClass}`}>{val}</span>;
      }
    },
    { header: 'Action', accessor: 'id', render: (val, row) => {
        if (row.status === 'Submitted' || row.status === 'Graded') {
          return <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}><CheckCircle size={18} /> Done</span>;
        }
        return (
          <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 bg-gradient-to-br from-brandPrimary to-brandSecondary text-white hover:brightness-110 shadow-[0_4px_15px_-3px_rgba(139,92,246,0.4)]" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', minWidth: '90px' }} onClick={() => handleOpenSubmit(row)}>
            Submit
          </button>
        );
      }
    },
  ];

  const pendingTasks = studentData.filter(a => a.status === 'Pending' || a.status === 'In Progress').length;
  const completedTasks = studentData.filter(a => a.status === 'Submitted' || a.status === 'Graded').length;

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard title="Tasks Pending" value={pendingTasks} icon={Clock} colorClass="warning" />
        <MetricCard title="Current Average" value="89%" icon={Award} trend={4.2} colorClass="success" />
        <div className="bg-surface backdrop-blur-xl border border-surfaceBorder shadow-xl rounded-2xl" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem', transition: 'var(--transition)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
             <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-brandPrimary/20 text-brandPrimary"><BookOpen size={20} /></div>
             <h3 style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)', margin: 0 }}>Course Progress</h3>
           </div>
           <ProgressBar current={completedTasks} total={assignments.length} label="Assignments Submitted" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 mb-2 gap-4">
        <h2 className="text-xl font-display font-semibold text-slate-100 m-0">My Assignments</h2>
        <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 bg-white/5 text-slate-100 border border-surfaceBorder hover:bg-surfaceHover hover:border-white/20">Filter</button>
      </div>
      
      <AssignmentTable data={studentData} columns={columns} />

      <Modal isOpen={modalState.isOpen} onClose={closeModal} title="Submit Assignment">
        {modalState.assignment && modalState.step === 1 && (
          <div className="flex flex-col">
            <p className="mb-4 text-slate-400">
              Please upload your assignment to the following Google Drive folder:
            </p>
            <div className="bg-surfaceHover border border-surfaceBorder p-4 rounded-xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="font-sans text-sm text-brandPrimary break-all">
                {modalState.assignment.driveLink}
              </span>
              <a href={modalState.assignment.driveLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 bg-white/5 text-slate-100 border border-surfaceBorder hover:bg-surfaceHover hover:border-white/20 whitespace-nowrap">
                <ExternalLink size={16} /> Open
              </a>
            </div>
            
            <p className="font-medium text-amber-500 mb-6 font-sans">
               Have you uploaded your final files to the Drive directory?
            </p>

            <div className="flex justify-end gap-4 mt-4">
              <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 bg-white/5 text-slate-100 border border-surfaceBorder hover:bg-surfaceHover hover:border-white/20" onClick={closeModal}>Cancel</button>
              <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 bg-gradient-to-br from-brandPrimary to-brandSecondary text-white hover:brightness-110 shadow-[0_4px_15px_-3px_rgba(139,92,246,0.4)]" onClick={handleConfirmStep1}>Yes, I have uploaded</button>
            </div>
          </div>
        )}

        {modalState.assignment && modalState.step === 2 && (
          <div className="flex flex-col">
            <div className="text-center my-8">
              <div className="w-16 h-16 bg-emerald-500/15 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <CheckCircle size={32} />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-100 font-display">Final Confirmation</h3>
              <p className="text-slate-400 leading-relaxed max-w-sm mx-auto">
                By confirming, your assignment for <strong className="text-slate-100 font-medium">{modalState.assignment.course}</strong> will be marked as submitted and available to your professor for grading.
              </p>
            </div>

            <div className="flex justify-center mt-4 gap-4">
              <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 bg-white/5 text-slate-100 border border-surfaceBorder hover:bg-surfaceHover hover:border-white/20" onClick={() => setModalState(prev => ({...prev, step: 1}))}>Go Back</button>
              <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_4px_15px_rgba(16,185,129,0.3)] border-none" onClick={handleFinalSubmit}>Confirm Submission</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StudentView;
