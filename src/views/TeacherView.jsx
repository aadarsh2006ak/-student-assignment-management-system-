import React, { useState } from 'react';
import MetricCard from '../components/MetricCard';
import AssignmentTable from '../components/AssignmentTable';
import Modal from '../components/Modal';
import ProgressBar from '../components/ProgressBar';
import { Users, FileText, CheckCircle, Plus } from 'lucide-react';

const TeacherView = ({ assignments, submissions, totalStudents, addAssignment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', course: '', dueDate: '', driveLink: '' });

  const handleCreate = (e) => {
    e.preventDefault();
    addAssignment(formData);
    setIsModalOpen(false);
    setFormData({ title: '', course: '', dueDate: '', driveLink: '' });
  };

  // Join assignments with sub counts
  const teacherData = assignments.map(a => {
    const subs = submissions.filter(s => s.assignmentId === a.id && (s.status === 'Submitted' || s.status === 'Graded'));
    return {
      ...a,
      submittedCount: subs.length,
    };
  });

  const columns = [
    { header: 'Course', accessor: 'course', render: (val) => <div style={{fontWeight: 500, color: 'var(--text-primary)'}}>{val}</div> },
    { header: 'Title', accessor: 'title' },
    { header: 'Submission Progress', accessor: 'submittedCount', render: (val) => (
        <ProgressBar current={val} total={totalStudents} label={`${val} Submitted`} />
      )
    },
    { header: 'Drive Link', accessor: 'driveLink', render: (val) => val ? <a href={val} target="_blank" rel="noreferrer" style={{ color: 'var(--secondary-color)', textDecoration: 'underline', fontSize: '0.85rem' }}>View Link</a> : '-' },
  ];

  const pendingGradingCount = submissions.filter(s => s.status === 'Submitted').length;

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard title="Total Students" value={totalStudents} icon={Users} colorClass="primary" />
        <MetricCard title="To Grade" value={pendingGradingCount} icon={FileText} trend={-12} colorClass="danger" />
        <MetricCard title="Active Assignments" value={assignments.length} icon={CheckCircle} colorClass="success" />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 mb-2 gap-4">
        <h2 className="text-xl font-display font-semibold text-slate-100 m-0">Manage Assignments</h2>
        <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 bg-gradient-to-br from-brandPrimary to-brandSecondary text-white hover:brightness-110 shadow-[0_4px_15px_-3px_rgba(139,92,246,0.4)]" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Create Assignment
        </button>
      </div>

      <AssignmentTable data={teacherData} columns={columns} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Assignment">
        <form onSubmit={handleCreate} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-400">Course Name</label>
            <input 
              type="text" 
              required 
              placeholder="e.g., Physics 101" 
              className="w-full px-4 py-3 rounded-lg border border-surfaceBorder bg-surfaceHover text-slate-100 font-sans transition-all duration-300 focus:outline-none focus:border-brandPrimary focus:shadow-[0_0_0_3px_rgba(139,92,246,0.4)]"
              value={formData.course}
              onChange={(e) => setFormData({...formData, course: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Assignment Title</label>
            <input 
              type="text" 
              required 
              placeholder="e.g., Lab Report 4" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-400">Due Date</label>
            <input 
              type="date" 
              required 
              className="w-full px-4 py-3 rounded-lg border border-surfaceBorder bg-surfaceHover text-slate-100 font-sans transition-all duration-300 focus:outline-none focus:border-brandPrimary focus:shadow-[0_0_0_3px_rgba(139,92,246,0.4)]"
              value={formData.dueDate}
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-400">Submission Drive Link</label>
            <input 
              type="url" 
              required 
              placeholder="https://drive.google.com/..." 
              className="w-full px-4 py-3 rounded-lg border border-surfaceBorder bg-surfaceHover text-slate-100 font-sans transition-all duration-300 focus:outline-none focus:border-brandPrimary focus:shadow-[0_0_0_3px_rgba(139,92,246,0.4)]"
              value={formData.driveLink}
              onChange={(e) => setFormData({...formData, driveLink: e.target.value})}
            />
            <small className="text-slate-500 text-xs mt-1">Students will upload their work to this link.</small>
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <button type="button" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 bg-white/5 text-slate-100 border border-surfaceBorder hover:bg-surfaceHover hover:border-white/20" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 bg-gradient-to-br from-brandPrimary to-brandSecondary text-white hover:brightness-110 shadow-[0_4px_15px_-3px_rgba(139,92,246,0.4)]">Create</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TeacherView;
