import { Link } from "react-router-dom";
import { Home, ListTodo, LayoutDashboard, Users, Settings, Projector } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AppSidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
      <div className="text-2xl font-bold mb-6">TaskFlow</div>
      <ScrollArea className="flex-1">
        <nav className="space-y-2">
          <Link to="/dashboard">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link to="/tasks">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">
              <ListTodo className="mr-2 h-4 w-4" />
              Tarefas
            </Button>
          </Link>
          <Link to="/projects">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">
              <Projector className="mr-2 h-4 w-4" />
              Projetos
            </Button>
          </Link>
          <Link to="/admin">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">
              <Users className="mr-2 h-4 w-4" />
              Administração
            </Button>
          </Link>
          <Link to="/settings">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </Button>
          </Link>
        </nav>
      </ScrollArea>
    </aside>
  );
}