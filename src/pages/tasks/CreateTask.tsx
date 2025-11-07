import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import TaskForm, { TaskFormData } from '@/components/tasks/TaskForm';
import { taskApi, userApi, projectApi } from '@/lib/api/mockApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task } from '@/types/task';
import { User } from '@/types/auth';
import { Project } from '@/types/project';

const CreateTask: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await userApi.getAll();
      setUsers(fetchedUsers);
      const fetchedProjects = await projectApi.getAll();
      setProjects(fetchedProjects);
    };
    fetchData();
  }, []);

  const handleCreateTask = async (data: TaskFormData) => {
    try {
      const newTaskData = {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "user-id-from-auth", // Placeholder for now
      };
      const createdTask = await taskApi.create(newTaskData as Omit<Task, 'id'>);
      toast.success(`Tarefa "${createdTask.title}" criada com sucesso!`);
      navigate('/tasks');
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      toast.error("Ocorreu um erro ao criar a tarefa.");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Criar Nova Tarefa</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm onSubmit={handleCreateTask} users={users} projects={projects} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTask;
