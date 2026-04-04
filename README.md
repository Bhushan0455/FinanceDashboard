# Finance Dashboard

![Finance Dashboard Banner](https://via.placeholder.com/1200x400/0f172a/ffffff?text=Finance+Dashboard)

## 📖 Project Overview
The Finance Dashboard is a modern, responsive web application built to help users seamlessly track, visualize, and manage their financial transactions. It features interactive charts, a robust data table for transaction management, dark/light mode toggles, and role-based access control, offering a highly polished user experience similar to production-grade fintech platforms.

## 🛠️ Tech Stack
This project leverages a modern frontend ecosystem to ensure fast builds, excellent performance, and a sleek user interface:
- **Framework:** React 19
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **Deployment:** GitHub Pages

## ✨ Features
- **Interactive Dashboard:** Displays key financial metrics (revenue, expenses, balance) via summary cards.
- **Data Visualization:** Beautiful, responsive line and pie charts representing income/expense trends and spending categories.
- **Transaction Management:** Full CRUD capabilities for financial records.
- **Smart Data Table:** Fully sortable and filterable transaction table.
- **Persistent Settings:** Remembers your transactions, theme preferences, and active role across sessions.
- **Export Data:** Allows users to easily export transaction records.
- **Responsive Navigation:** A cleanly designed layout with a sidebar that adapts to different screen sizes.

## 🔐 Role-Based Access Control (RBAC)
The application includes a dual-role system to demonstrate how access control works in frontend applications:
- **Admin Role:** Has full access. Admins can add, edit, export, and delete transactions.
- **Viewer Role:** Has read-only access. Viewers can see data, sort tables, and apply filters, but cannot modify or export the transaction data.

## 🧠 State Management Explanation
The project avoids overcomplicating state with heavy external libraries like Redux, utilizing built-in React hooks and lightweight patterns instead:
- **Local Component State:** Uses standard `useState` hooks for local UI toggles (e.g., opening and closing modals, dropdowns).
- **Custom Hooks (`useLocalStorage`):** A custom hook encapsulates the logic to persist data. Transactions, UI themes, and the current user role are automatically written to and read from the browser's `localStorage`.
- **Prop Drilling:** For deeply nested components, simple prop drilling is used effectively, maintaining clear, unidirectional data flow without the overhead of heavy context providers.

## 🤔 Assumptions Made
- **No Backend Requirement:** The assignment is focused entirely on the frontend interface and user experience, so a real server/database was not required.
- **Mock Data First:** On the initial load, if the local storage is empty, the application auto-populates with a rich mock dataset to immediately demonstrate the dashboard's capabilities.
- **Modern Browsers:** The application assumes the user is on a modern web browser that fully supports ES6 modules and `localStorage`.

## 🚀 Optional Enhancements Implemented
To go above and beyond the baseline requirements, the following features were added:
1. **Dark/Light Theme Toggle:** A polished, persistent dark mode implementation using Tailwind CSS that respects user preferences.
2. **Data Export Feature:** A utility to export the current view of transactions (available to Admin only).
3. **Data Persistence:** Use of `localStorage` ensures that user modifications to transactions survive page reloads.
4. **Vite + Tailwind v4 Integration:** Used the absolute latest dependencies for optimal build times and modern styling utilities.
5. **GitHub Pages Deployment:** Ready for immediate live sharing via a pre-configured `deploy` script.

## 💻 Setup Instructions & How to Run Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone the repository or extract the zip file:
   ```bash
   git clone <repository-url>
   cd Finance-Dashboard
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

### Running the Application
To start the local development server:
```bash
npm run dev
```
Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173/`).

### Building for Production
To generate a minified production build:
```bash
npm run build
```

---

