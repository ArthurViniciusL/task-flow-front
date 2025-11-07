import React, { useEffect, useState } from 'react';
import { taskApi, projectApi } from '@/lib/api/mockApi';
import { Task } from '@/types/task';
import { Project } from '@/types/project';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const ProjectReport: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProjects = await projectApi.getAll();
        const fetchedTasks = await taskApi.getAll();
        setProjects(fetchedProjects);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Erro ao buscar dados para o relatório de projetos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getTasksByProject = (projectId: string) => {
    return tasks.filter(task => task.projectId === projectId);
  };

  const calculateProjectProgress = (projectId: string): number => {
    const projectTasks = getTasksByProject(projectId);
    if (projectTasks.length === 0) return 0;

    const completedTasks = projectTasks.filter(task => task.status === 'done').length;
    return Math.round((completedTasks / projectTasks.length) * 100);
  };

  const exportProjectReportToCsv = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Projeto,Descrição,Progresso,Total de Tarefas,Concluídas,Em Progresso,A Fazer,Bloqueadas\n";

    projects.forEach(project => {
      const projectTasks = getTasksByProject(project.id);
      const progress = calculateProjectProgress(project.id);
      const totalTasks = projectTasks.length;
      const completedTasks = projectTasks.filter(task => task.status === 'done').length;
      const inProgressTasks = projectTasks.filter(task => task.status === 'in-progress').length;
      const todoTasks = projectTasks.filter(task => task.status === 'todo').length;
      const blockedTasks = projectTasks.filter(task => task.status === 'blocked').length;

      csvContent += `${project.name},"${project.description}",${progress}%,${totalTasks},${completedTasks},${inProgressTasks},${todoTasks},${blockedTasks}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "relatorio_projetos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="container mx-auto py-8">Carregando relatório de projetos...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Relatório por Projeto</CardTitle>
          <Button onClick={exportProjectReportToCsv}><Download className="h-4 w-4 mr-2" /> Exportar CSV</Button>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <p>Nenhum projeto encontrado.</p>
          ) : (
            <div className="space-y-8">
              {projects.map(project => {
                const projectTasks = getTasksByProject(project.id);
                const progress = calculateProjectProgress(project.id);
                return (
                  <div key={project.id} className="border p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">{project.name}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <Progress value={progress} className="w-[60%]" />
                      <span>{progress}% Concluído</span>
                    </div>

                    <h4 className="text-lg font-semibold mt-6 mb-3">Tarefas do Projeto</h4>
                    {projectTasks.length === 0 ? (
                      <p>Nenhuma tarefa associada a este projeto.</p>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Prioridade</TableHead>
                            <TableHead>Data de Entrega</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {projectTasks.map(task => (
                            <TableRow key={task.id}>
                              <TableCell>{task.title}</TableCell>
                              <TableCell>{task.status}</TableCell>
                              <TableCell>{task.priority}</TableCell>
                              <TableCell>{task.dueDate}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectReport;
