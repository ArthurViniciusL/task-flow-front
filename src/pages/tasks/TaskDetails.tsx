import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";

export function TaskDetails() {
  const { id } = useParams<{ id: string }>();

  // Mock data for a single task
  const task = {
    id: id,
    title: "Implement Login Page",
    description: "Implement the login page with email and password fields, validation, and links to register and forgot password pages.",
    assignee: "John Doe",
    status: "In Progress",
    priority: "High",
    dueDate: "2025-11-10",
    comments: [
      { id: "1", author: "Jane Smith", timestamp: "2025-11-01 10:00", text: "Starting to work on this." },
      { id: "2", author: "John Doe", timestamp: "2025-11-01 14:30", text: "Need to clarify validation rules." },
    ],
  };

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Detalhes da Tarefa: {task.title}</h1>
        <Button>Editar Tarefa</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          <CardDescription>{task.description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-4">
            <p className="font-medium">Responsável:</p>
            <span>{task.assignee}</span>
          </div>
          <div className="flex items-center space-x-4">
            <p className="font-medium">Status:</p>
            <Badge variant="secondary">{task.status}</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <p className="font-medium">Prioridade:</p>
            <Badge variant="secondary">{task.priority}</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <p className="font-medium">Data de Vencimento:</p>
            <span>{task.dueDate}</span>
          </div>

          <h2 className="text-xl font-semibold mt-4">Comentários</h2>
          <div className="space-y-2">
            {task.comments.map((comment) => (
              <div key={comment.id} className="border-t pt-2">
                <p className="text-sm font-medium">{comment.author} <span className="text-gray-500 text-xs">({comment.timestamp})</span></p>
                <p className="text-sm">{comment.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}