import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ProjectForm from '@/components/projects/ProjectForm';
import { projectApi } from '@/lib/api/mockApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Project } from '@/types/project';

const EditProject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        const fetchedProject = await projectApi.getById(id);
        setProject(fetchedProject);
      }
      setLoading(false);
    };
    fetchProject();
  }, [id]);

  const handleUpdateProject = async (data: Omit<Project, 'id' | 'createdAt' | 'createdBy' | 'members'>) => {
    if (!id) return;
    try {
      const updatedProjectData = {
        ...data,
        updatedAt: new Date(),
      };
      const updatedProject = await projectApi.update(id, updatedProjectData);
      if (updatedProject) {
        toast.success(`Projeto "${updatedProject.name}" atualizado com sucesso!`);
        navigate('/projects'); // TODO: Create a projects list page
      } else {
        toast.error("Projeto não encontrado ou falha na atualização.");
      }
    } catch (error) {
      console.error("Erro ao atualizar projeto:", error);
      toast.error("Ocorreu um erro ao atualizar o projeto.");
    }
  };

  if (loading) {
    return <div className="container mx-auto py-8">Carregando projeto...</div>;
  }

  if (!project) {
    return <div className="container mx-auto py-8">Projeto não encontrado.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Editar Projeto</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectForm initialData={project} onSubmit={handleUpdateProject} />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProject;
