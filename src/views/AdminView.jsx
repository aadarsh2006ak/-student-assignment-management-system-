import React from 'react';
import MetricCard from '../components/MetricCard';
import AssignmentTable from '../components/AssignmentTable';
import ProgressBar from '../components/ProgressBar';
import { Activity, Users, Database, Shield } from 'lucide-react';

const AdminView = ({ students, assignments, submissions }) => {
  
  const totalAssignments = assignments.length;
  
  // Create user data for the table
  const userData = students.map(st => {
    const stSubs = submissions.filter(s => s.studentId === st.id && (s.status === 'Submitted' || s.status === 'Graded'));
    return {
      ...st,
      completedAssignments: stSubs.length,
      status: 'Active',
      lastLogin: 'Today'
    };
  });

  // Adding other mock users for demo
  const allUsers = [
    ...userData,
    { id: 't1', name: 'teacher 1', role: 'Teacher', status: 'Active', lastLogin: '1 hour ago', completedAssignments: null },
    { id: 'a1', name: 'admin 1', role: 'Admin', status: 'Active', lastLogin: 'Just now', completedAssignments: null },
  ];

  const columns = [
    { header: 'Name', accessor: 'name', render: (val) => <div style={{fontWeight: 500, color: 'var(--text-primary)'}}>{val}</div> },
    { header: 'Role', accessor: 'role', render: (val) => {
        let badgeClass = 'bg-slate-500/15 text-slate-300';
        if (val === 'Admin') badgeClass = 'bg-rose-500/15 text-rose-500';
        if (val === 'Teacher') badgeClass = 'bg-amber-500/15 text-amber-500';
        if (val === 'Student') badgeClass = 'bg-emerald-500/15 text-emerald-500';
        return <span className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${badgeClass}`}>{val}</span>;
    }},
    { header: 'Overall Progress', accessor: 'completedAssignments', render: (val, row) => 
        row.role === 'Student' 
        ? <ProgressBar current={val} total={totalAssignments} label={`${val} Assgns`} /> 
        : <span className="text-muted">N/A</span>
    },
    { header: 'Status', accessor: 'status', render: (val) => {
        const badgeClass = val === 'Active' ? 'text-emerald-500' : 'text-rose-500';
        return <span className={badgeClass} style={{fontWeight: 600}}>● {val}</span>;
      }
    },
  ];

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard title="System Resources" value="42%" icon={Database} colorClass="warning" />
        <MetricCard title="Active Users" value={allUsers.length} icon={Activity} trend={8.5} colorClass="success" />
        <MetricCard title="Security Alerts" value="0" icon={Shield} colorClass="primary" />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 mb-2 gap-4">
        <h2 className="text-xl font-display font-semibold text-slate-100 m-0">User Management</h2>
        <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 bg-gradient-to-br from-brandPrimary to-brandSecondary text-white hover:brightness-110 shadow-[0_4px_15px_-3px_rgba(139,92,246,0.4)]">
          <Users size={18} /> Add User
        </button>
      </div>

      <AssignmentTable data={allUsers} columns={columns} />
    </div>
  );
};

export default AdminView;
