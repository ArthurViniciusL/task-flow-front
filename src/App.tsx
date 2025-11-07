import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./app/Index";
import NotFound from "./app/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import TaskList from "./pages/tasks/TaskList";
import TaskKanban from "./pages/tasks/TaskKanban";
import CreateTask from "./pages/tasks/CreateTask";
import EditTask from "./pages/tasks/EditTask";
import CreateProject from "./pages/projects/CreateProject";
import EditProject from "./pages/projects/EditProject";
import ProjectList from "./pages/projects/ProjectList";
import UserReport from "./pages/reports/UserReport";
import ProjectReport from "./pages/reports/ProjectReport";
import UserManagement from "./pages/admin/UserManagement";
import EditUser from "./pages/admin/EditUser";
import { AppLayout } from "./components/layout/AppLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LanguageProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/tasks" element={<TaskList />} />
                  <Route path="/tasks/kanban" element={<TaskKanban />} />
                  <Route path="/tasks/new" element={<CreateTask />} />
                  <Route path="/tasks/edit/:id" element={<EditTask />} />
                  <Route path="/projects" element={<ProjectList />} />
                  <Route path="/projects/new" element={<CreateProject />} />
                  <Route path="/projects/edit/:id" element={<EditProject />} />
                  <Route path="/reports/users" element={<UserReport />} />
                  <Route path="/reports/projects" element={<ProjectReport />} />
                </Route>
              </Route>

              {/* Admin Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route element={<AppLayout />}>
                  <Route path="/admin/users" element={<UserManagement />} />
                  <Route path="/admin/users/edit/:id" element={<EditUser />} />
                </Route>
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </AuthProvider>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
