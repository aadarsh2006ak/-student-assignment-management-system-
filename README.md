# Student Assignment Management System

A responsive assignment management dashboard built with **React + Tailwind CSS**.

This project simulates a complete assignment workflow on the frontend with separate dashboards for **Students**, **Teachers**, and **Admins** using centralized React state.

---

## ✨ Features

### 👨‍🎓 Student

- View assignments
- Submit assignment links (Google Drive simulation)
- Track submission status

### 👨‍🏫 Teacher

- Create assignments
- Monitor student submissions
- Track class completion progress

### 👨‍💼 Admin

- View dashboard statistics
- Monitor overall assignment activity
- Access student overview

### 🎨 UI

- Responsive design
- Dark theme interface
- Mobile-friendly layout

---

## 🛠️ Tech Stack

- **React 19**
- **Vite**
- **Tailwind CSS**
- **Lucide React**

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/aadarshrajput04/student-assignment-sys-react
```

Move into the project folder:

```bash
cd student-assignment-sys
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── AssignmentTable.jsx
│   ├── MetricCard.jsx
│   ├── Modal.jsx
│   └── ProgressBar.jsx

├── views/
│   ├── StudentView.jsx
│   ├── TeacherView.jsx
│   └── AdminView.jsx

├── App.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ How It Works

The application uses **React state** to simulate a database.

Main data collections:

- `students`
- `assignments`
- `submissions`

Actions:

- `addAssignment()` → Creates a new assignment
- `submitAssignment()` → Updates student submission status

---

## 📊 Role Permissions

| Feature           | Student | Teacher | Admin |
| ----------------- | ------- | ------- | ----- |
| View Assignments  | ✅      | ✅      | ✅    |
| Submit Work       | ✅      | ❌      | ❌    |
| Add Assignments   | ❌      | ✅      | ❌    |
| Track Progress    | ❌      | ✅      | ✅    |
| View Student List | ❌      | ❌      | ✅    |

---

## 🚀 Future Improvements

- Backend integration
- Authentication
- Real database support
- Assignment grading
- Notifications

---

## 👨‍💻 Author

Built by **Aadarsh**

If you found this project useful, consider ⭐ the repository.
