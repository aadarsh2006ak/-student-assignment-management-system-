# Student Assignment Management System Dashboard

A clean, responsive, and robust React.js dashboard for managing student assignments. This application provides a unified interface with distinct, data-segregated views for **Students**, **Teachers**, and **Admins**.

## 🚀 Features
- **Role-Based Views**: Seamlessly instantly toggle between Student, Teacher, and Admin functionalities.
- **Interactive Global State**: Utilizes a relational state architecture (Students, Assignments, Submissions) entirely maintained on the frontend via React Hooks (`useState` and `useEffect`).
- **Student Submission Setup**: Features a sleek double-verification flow for assignments using an external Google Drive link.
- **Administrative Progress Tracking**: Teachers and Admins can observe completion rates visualized by dynamic, color-coded Progress Bars.
- **Premium Design System**: Designed with Vanilla CSS Variables and Glassmorphism aesthetics (providing a Tailwind-like componentized structure without the overhead), resulting in a striking dark-mode user interface.
- **Fully Responsive**: Off-canvas mobile sidebars, adaptive metric grids, and scrollable data tables.

## ⚙️ Project Setup Instructions

1. **Prerequisites**
   - Node.js (v16.0.0 or higher recommended)
   - npm or yarn

2. **Installation**
   ```bash
   # Extract or clone the repository to your local machine
   # Navigate into the project directory
   cd "student assignment sys"

   # Install the dependencies
   npm install
   ```

3. **Running the Development Server**
   ```bash
   # Start the Vite development server
   npm run dev
   ```
   Open the returned `localhost` port (e.g., `http://localhost:5173`) in your web browser.

## 📂 Folder Structure Overview

```text
student-assignment-sys/
├── package.json        # Project metadata and dependencies
├── vite.config.js      # Vite configuration
├── index.html          # Application entry HTML
├── src/
│   ├── main.jsx        # React DOM rendering entry point
│   ├── App.jsx         # Root layout, central state, and role routing
│   ├── App.css         # Global layout utility classes
│   ├── index.css       # Core Design System (CSS Variables, Typography)
│   ├── components/     # Reusable UI building blocks
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── MetricCard.jsx
│   │   ├── AssignmentTable.jsx
│   │   ├── Modal.jsx
│   │   └── ProgressBar.jsx
│   └── views/          # Role-specific dashboard layouts
│       ├── StudentView.jsx
│       ├── TeacherView.jsx
│       ├── AdminView.jsx
│       └── views.css   # Shared styling for view containers
└── README.md
```

## 🏗️ Architecture & Component Structure

### Architecture Overview
The application follows a strict **Component-based Architecture**. Instead of requiring a backend Database, we simulate complex, relational records entirely in memory on the client side using centralized app-level state (`App.jsx`).

- **Data Models**: 
  - `students`: A list of all available student users.
  - `assignments`: The master list of teacher-created homework metadata.
  - `submissions`: Relational linking tables that join `assignmentId` and `studentId` with a `status` (e.g., 'Pending', 'Submitted', 'Graded').
- **State Segregation**: Data is appropriately joined at the View level. Students receive and manipulate isolated records, maintaining rigid data privacy within the prototype.

### Design Decisions
- **Vanilla CSS Variables Over Heavy Frameworks**: By strictly defining `--primary-color`, layout scales, and animations in `index.css`, we establish a lightweight "utility-class" approach mimicking Tailwind, ensuring CSS is effortlessly readable without cluttering JSX.
- **Top-Down State Flow**: React Hooks form the core engine. Rather than utilizing a hefty state management library like Redux or Context API for this tightly-scoped dashboard, core callbacks (`addAssignment`, `submitAssignment`) are defined at the root (`App.jsx`) and cleanly drilled down as props.
- **Interactive Modals**: Form inputs and potentially dangerous actions (like finalizing submissions) are tucked neatly behind the reusable `Modal.jsx` wrapper.
- **Lucide Icons**: Integrated `lucide-react` for beautifully consistent and scalable SVG iconography.
