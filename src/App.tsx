import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { TaskList } from "./pages/tasks/TaskList";
import { TaskKanban } from "./pages/tasks/TaskKanban";
import { TaskDetails } from "./pages/tasks/TaskDetails";
import { ProjectList } from "./pages/projects/ProjectList";
import { ProjectDetails } from "./pages/projects/ProjectDetails";
import { UserManagement } from "./pages/admin/UserManagement";
import { Settings } from "./pages/settings/Settings";
import NotFound from "./app/NotFound";
import { AppLayout } from "./components/layout/AppLayout";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/" element={<AppLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="tasks" element={<TaskList />} />
                <Route path="tasks/kanban" element={<TaskKanban />} />
                <Route path="tasks/:id" element={<TaskDetails />} />
                <Route path="projects" element={<ProjectList />} />
                <Route path="projects/:id" element={<ProjectDetails />} />
                <Route path="admin" element={<UserManagement />} />
                <Route path="settings" element={<Settings />} />
                {/* ADD ALL CUSTOM PROTECTED ROUTES HERE */}
              </Route>
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
