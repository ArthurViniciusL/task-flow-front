import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function ProjectList() {
  // Mock data for projects
  const projects = [
    { id: "1", name: "TaskFlow App", description: "Development of the TaskFlow application.", progress: 70 },
    { id: "2", name: "Marketing Campaign", description: "Plan and execute Q4 marketing campaign.", progress: 30 },
    { id: "3", name: "Website Redesign", description: "Redesign the company's official website.", progress: 90 },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Lista de Projetos</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Projeto
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Projetos</CardTitle>
          <CardDescription>Gerencie seus projetos aqui.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input placeholder="Buscar projetos..." className="max-w-sm" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span>Progresso: {project.progress}%</span>
                    <Link to={`/projects/${project.id}`}>
                      <Button variant="outline" size="sm">Ver Detalhes</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}