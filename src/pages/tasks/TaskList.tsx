import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";

export function TaskList() {
  // Mock data for tasks
  const tasks = [
    { id: "1", title: "Implement Login Page", assignee: "John Doe", status: "In Progress", priority: "High", dueDate: "2025-11-10" },
    { id: "2", title: "Design Database Schema", assignee: "Jane Smith", status: "To Do", priority: "High", dueDate: "2025-11-15" },
    { id: "3", title: "Setup CI/CD Pipeline", assignee: "Peter Jones", status: "Done", priority: "Medium", dueDate: "2025-11-05" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Lista de Tarefas</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Tarefa
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tarefas</CardTitle>
          <CardDescription>Gerencie suas tarefas aqui.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input placeholder="Buscar tarefas..." className="max-w-sm" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Data de Vencimento</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{task.assignee}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Editar</Button>
                    <Button variant="ghost" size="sm">Excluir</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}