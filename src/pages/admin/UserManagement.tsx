import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { userApi } from '@/lib/api/mockApi';
import { User } from '@/types/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Link } from 'react-router-dom';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const fetchedUsers = await userApi.getAll();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      toast.error("Ocorreu um erro ao carregar os usuários.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      // Assuming userApi has a toggleStatus method (need to add if not present)
      // const success = await userApi.toggleStatus(userId, !currentStatus);
      const success = true; // Mocking success for now
      if (success) {
        toast.success(`Usuário ${userId} ${currentStatus ? 'desativado' : 'ativado'} com sucesso!`);
        fetchUsers(); // Refresh the list
      } else {
        toast.error(`Falha ao ${currentStatus ? 'desativar' : 'ativar'} o usuário.`);
      }
    } catch (error) {
      console.error(`Erro ao ${currentStatus ? 'desativar' : 'ativar'} usuário:`, error);
      toast.error("Ocorreu um erro.");
    }
  };

  if (loading) {
    return <div className="container mx-auto py-8">Carregando usuários...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Gestão de Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p>Nenhum usuário encontrado.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Perfil</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{/* TODO: Add actual user status (active/inactive) */ 'Ativo'}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/users/edit/${user.id}`}>Editar</Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="ml-2">Desativar</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação irá desativar o usuário "{user.name}". Ele não poderá mais acessar o sistema.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleToggleUserStatus(user.id, true)}>Desativar</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
