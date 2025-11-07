import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import TaskForm, { TaskFormData } from '@/components/tasks/TaskForm';
import { taskApi, userApi, projectApi } from '@/lib/api/mockApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task } from '@/types/task';
import { User } from '@/types/auth';
import { Project } from '@/types/project';
import TaskComments from '@/components/tasks/TaskComments';
import TaskActivityLog from '@/components/tasks/TaskActivityLog';

const EditTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | undefined>(undefined);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const fetchedTask = await taskApi.getById(id);
        setTask(fetchedTask);
      }
      const fetchedUsers = await userApi.getAll();
      setUsers(fetchedUsers);
      const fetchedProjects = await projectApi.getAll();
      setProjects(fetchedProjects);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleUpdateTask = async (data: TaskFormData) => {
    if (!id || !task) return;
    try {
      const updatedTaskData = {
        ...data,
        updatedAt: new Date(),
        createdBy: task.createdBy, // Keep the original creator
      };
      const updatedTask = await taskApi.update(id, updatedTaskData as Partial<Task>);
      if (updatedTask) {
        toast.success(`Tarefa "${updatedTask.title}" atualizada com sucesso!`);
        if (task.assignedTo !== updatedTask.assignedTo) {
          const assignedUser = users.find(u => u.id === updatedTask.assignedTo);
          toast.info(`Tarefa "${updatedTask.title}" atribuída a ${assignedUser?.name || assignedUser?.email || 'um usuário'}.`);
        }
        navigate('/tasks');
      } else {
        toast.error("Tarefa não encontrada ou falha na atualização.");
      }
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      toast.error("Ocorreu um erro ao atualizar a tarefa.");
    }
  };

  if (loading) {
    return <div className="container mx-auto py-8">Carregando tarefa...</div>;
  }

  if (!task) {
    return <div className="container mx-auto py-8">Tarefa não encontrada.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Editar Tarefa</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskForm initialData={task} onSubmit={handleUpdateTask} users={users} projects={projects} />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1 space-y-8">
          {id && <TaskComments taskId={id} />}
          {id && <TaskActivityLog taskId={id} />}
        </div>
      </div>
    </div>
  );
};

export default EditTask;
