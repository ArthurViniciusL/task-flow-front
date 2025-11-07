import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ProjectForm from '@/components/projects/ProjectForm';
import { projectApi } from '@/lib/api/mockApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Project } from '@/types/project';

const CreateProject: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateProject = async (data: Omit<Project, 'id' | 'createdAt' | 'createdBy' | 'members'>) => {
    try {
      // For mock API, we need to ensure createdAt, createdBy and members are handled
      const newProjectData = {
        ...data,
        createdBy: "mock-user-id", // TODO: Replace with actual logged-in user ID
        members: [], // Initially empty, can be added later
        createdAt: new Date(),
      };
      const createdProject = await projectApi.create(newProjectData);
      toast.success(`Projeto "${createdProject.name}" criado com sucesso!`);
      navigate('/projects'); // TODO: Create a projects list page
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
      toast.error("Ocorreu um erro ao criar o projeto.");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Criar Novo Projeto</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectForm onSubmit={handleCreateProject} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProject;
