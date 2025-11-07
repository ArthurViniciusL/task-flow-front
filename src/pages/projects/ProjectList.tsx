import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { projectApi, taskApi } from '@/lib/api/mockApi';
import { Project } from '@/types/project';
import { Task } from '@/types/task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress'; // Assuming a progress component exists

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]); // To calculate progress
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProjectsAndTasks = async () => {
    setLoading(true);
    try {
      const fetchedProjects = await projectApi.getAll();
      const fetchedTasks = await taskApi.getAll();
      setProjects(fetchedProjects);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Erro ao buscar projetos e tarefas:", error);
      toast.error("Ocorreu um erro ao carregar os projetos.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjectsAndTasks();
  }, []);

  const handleDeleteProject = async (id: string) => {
    try {
      const success = await projectApi.delete(id);
      if (success) {
        toast.success("Projeto excluído com sucesso!");
        fetchProjectsAndTasks(); // Refresh the list
      } else {
        toast.error("Falha ao excluir o projeto.");
      }
    } catch (error) {
      console.error("Erro ao excluir projeto:", error);
      toast.error("Ocorreu um erro ao excluir o projeto.");
    }
  };

  const calculateProjectProgress = (projectId: string): number => {
    const projectTasks = tasks.filter(task => task.projectId === projectId);
    if (projectTasks.length === 0) return 0;

    const completedTasks = projectTasks.filter(task => task.status === 'done').length;
    return Math.round((completedTasks / projectTasks.length) * 100);
  };

  if (loading) {
    return <div className="container mx-auto py-8">Carregando projetos...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Lista de Projetos</CardTitle>
          <Button asChild>
            <Link to="/projects/new">Novo Projeto</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <p>Nenhum projeto encontrado.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Progresso</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => {
                  const progress = calculateProjectProgress(project.id);
                  return (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{project.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={progress} className="w-[60%]" />
                          <span>{progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/projects/edit/${project.id}`}>Editar</Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="ml-2">Excluir</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação não pode ser desfeita. Isso excluirá permanentemente o projeto "{project.name}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteProject(project.id)}>Continuar</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectList;
