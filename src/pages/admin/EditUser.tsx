import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import UserForm from '@/components/admin/UserForm';
import { userApi } from '@/lib/api/mockApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@/types/auth';

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        const fetchedUser = await userApi.getById(id);
        setUser(fetchedUser);
      }
      setLoading(false);
    };
    fetchUser();
  }, [id]);

  const handleUpdateUser = async (data: Omit<User, 'id'>) => {
    if (!id) return;
    try {
      const updatedUser = await userApi.update(id, data);
      if (updatedUser) {
        toast.success(`Usuário "${updatedUser.name}" atualizado com sucesso!`);
        navigate('/admin/users');
      } else {
        toast.error("Usuário não encontrado ou falha na atualização.");
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      toast.error("Ocorreu um erro ao atualizar o usuário.");
    }
  };

  if (loading) {
    return <div className="container mx-auto py-8">Carregando usuário...</div>;
  }

  if (!user) {
    return <div className="container mx-auto py-8">Usuário não encontrado.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Editar Usuário</CardTitle>
        </CardHeader>
        <CardContent>
          <UserForm initialData={user} onSubmit={handleUpdateUser} />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditUser;
