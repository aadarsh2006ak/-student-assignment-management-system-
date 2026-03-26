import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StudentView from './views/StudentView';
import TeacherView from './views/TeacherView';
import AdminView from './views/AdminView';


const initialStudents = [
  { id: 's1', name: 'student 1', role: 'Student' },
  { id: 's2', name: 'student 2', role: 'Student' },
  { id: 's3', name: 'student 3', role: 'Student' },
];

const initialAssignments = [
  { id: 1, course: 'Mathematics', title: 'Calculus Chapter 4', dueDate: '2026-11-20', driveLink: 'https://drive.google.com/drive/home/math-101' },
  { id: 2, course: 'Physics', title: 'Lab Report 3', dueDate: '2026-11-22', driveLink: 'https://drive.google.com/drive/home/phys-201' },
  { id: 3, course: 'Computer Science', title: 'React Project', dueDate: '2026-11-25', driveLink: 'https://drive.google.com/drive/home/cs-301' },
];

const initialSubmissions = [
  { assignmentId: 1, studentId: 's1', status: 'Submitted' },
  { assignmentId: 1, studentId: 's2', status: 'Pending' },
  { assignmentId: 1, studentId: 's3', status: 'Graded' },
  { assignmentId: 2, studentId: 's1', status: 'In Progress' },
  { assignmentId: 2, studentId: 's2', status: 'Submitted' },
  { assignmentId: 2, studentId: 's3', status: 'Pending' },
  { assignmentId: 3, studentId: 's1', status: 'Pending' },
  { assignmentId: 3, studentId: 's2', status: 'Pending' },
  { assignmentId: 3, studentId: 's3', status: 'Pending' },
];

function App() {
  const [role, setRole] = useState('student');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global relational states
  const [students] = useState(initialStudents);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [submissions, setSubmissions] = useState(initialSubmissions);

  // Default active student when simulating a student role
  const activeStudentId = 's1'; 

  const addAssignment = (newAssignment) => {
    const newId = Date.now();
    setAssignments([...assignments, { ...newAssignment, id: newId }]);
    
    // Auto-create pending submissions for all students
    const newSubmissions = students.map(st => ({
      assignmentId: newId,
      studentId: st.id,
      status: 'Pending'
    }));
    setSubmissions([...submissions, ...newSubmissions]);
  };

  const submitAssignment = (assignmentId, studentId) => {
    setSubmissions(submissions.map(sub => 
      (sub.assignmentId === assignmentId && sub.studentId === studentId) 
        ? { ...sub, status: 'Submitted' } 
        : sub
    ));
  };

  const renderView = () => {
    switch (role) {
      case 'student': return <StudentView assignments={assignments} submissions={submissions} studentId={activeStudentId} submitAssignment={submitAssignment} />;
      case 'teacher': return <TeacherView assignments={assignments} submissions={submissions} totalStudents={students.length} addAssignment={addAssignment} />;
      case 'admin': return <AdminView students={students} assignments={assignments} submissions={submissions} />;
      default: return <StudentView assignments={assignments} submissions={submissions} studentId={activeStudentId} submitAssignment={submitAssignment} />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bgStart">
      {/* Mobile Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
        onClick={() => setMobileMenuOpen(false)}
      ></div>
      
      <Sidebar 
        role={role} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        mobileMenuOpen={mobileMenuOpen} 
      />
      
      <main className="flex-1 flex flex-col h-full overflow-y-auto relative">
        <div className="w-full max-w-[1400px] mx-auto p-4 md:p-8">
          <Header role={role} setRole={setRole} setMobileMenuOpen={setMobileMenuOpen} />
          {renderView()}
        </div>
      </main>
    </div>
  );
}

export default App;
