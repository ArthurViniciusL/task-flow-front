import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>();

  // Mock data for a single project
  const project = {
    id: id,
    name: "TaskFlow App",
    description: "Development of the TaskFlow application, including frontend, backend, and database design.",
    progress: 70,
    status: "In Progress",
    startDate: "2025-10-01",
    endDate: "2026-03-31",
    teamMembers: [
      { id: "1", name: "John Doe", avatar: "https://github.com/shadcn.png" },
      { id: "2", name: "Jane Smith", avatar: "https://github.com/shadcn.png" },
    ],
    tasks: [
      { id: "1", title: "Implement Login Page", status: "In Progress" },
      { id: "2", title: "Design Database Schema", status: "To Do" },
      { id: "3", title: "Setup CI/CD Pipeline", status: "Done" },
    ],
  };

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Detalhes do Projeto: {project.name}</h1>
        <Button>Editar Projeto</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-4">
            <p className="font-medium">Status:</p>
            <Badge variant="secondary">{project.status}</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <p className="font-medium">Progresso:</p>
            <div className="w-full">
              <Progress value={project.progress} className="w-[60%]" />
              <span className="ml-2">{project.progress}%</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <p className="font-medium">Início:</p>
            <span>{project.startDate}</span>
          </div>
          <div className="flex items-center space-x-4">
            <p className="font-medium">Fim:</p>
            <span>{project.endDate}</span>
          </div>

          <h2 className="text-xl font-semibold mt-4">Membros da Equipe</h2>
          <div className="flex -space-x-2 overflow-hidden">
            {project.teamMembers.map((member) => (
              <Avatar key={member.id} className="border-2 border-white">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>

          <h2 className="text-xl font-semibold mt-4">Tarefas Associadas</h2>
          <div className="space-y-2">
            {project.tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between border-b pb-2">
                <span>{task.title}</span>
                <Badge variant="outline">{task.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}