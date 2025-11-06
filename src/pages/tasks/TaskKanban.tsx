import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function TaskKanban() {
  // Mock data for tasks organized by status
  const tasksByStatus = {
    "To Do": [
      { id: "2", title: "Design Database Schema", assignee: "Jane Smith", priority: "High" },
    ],
    "In Progress": [
      { id: "1", title: "Implement Login Page", assignee: "John Doe", priority: "High" },
    ],
    "Done": [
      { id: "3", title: "Setup CI/CD Pipeline", assignee: "Peter Jones", priority: "Medium" },
    ],
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quadro Kanban</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Tarefa
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(tasksByStatus).map(([status, tasks]) => (
          <Card key={status}>
            <CardHeader>
              <CardTitle>{status}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {tasks.map((task) => (
                <div key={task.id} className="p-3 border rounded-md bg-gray-50">
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-600">Responsável: {task.assignee}</p>
                  <p className="text-sm text-gray-600">Prioridade: {task.priority}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}