import React, { useEffect, useState } from 'react';
import { taskApi, userApi } from '@/lib/api/mockApi';
import { Task } from '@/types/task';
import { User } from '@/types/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const UserReport: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await userApi.getAll();
        const fetchedTasks = await taskApi.getAll();
        setUsers(fetchedUsers);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Erro ao buscar dados para o relatório de usuários:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getTasksByUser = (userId: string) => {
    return tasks.filter(task => task.assignedTo === userId);
  };

  const calculateUserStats = (userId: string) => {
    const userTasks = getTasksByUser(userId);
    const totalTasks = userTasks.length;
    const completedTasks = userTasks.filter(task => task.status === 'done').length;
    const inProgressTasks = userTasks.filter(task => task.status === 'in-progress').length;
    const todoTasks = userTasks.filter(task => task.status === 'todo').length;
    const blockedTasks = userTasks.filter(task => task.status === 'blocked').length;

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      todoTasks,
      blockedTasks,
    };
  };

  const exportUserReportToCsv = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Usuário,Perfil,Total de Tarefas,Concluídas,Em Progresso,A Fazer,Bloqueadas\n";

    users.forEach(user => {
      const stats = calculateUserStats(user.id);
      csvContent += `${user.name || user.email},${user.role},${stats.totalTasks},${stats.completedTasks},${stats.inProgressTasks},${stats.todoTasks},${stats.blockedTasks}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "relatorio_usuarios.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="container mx-auto py-8">Carregando relatório de usuários...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Relatório por Usuário</CardTitle>
          <Button onClick={exportUserReportToCsv}><Download className="h-4 w-4 mr-2" /> Exportar CSV</Button>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p>Nenhum usuário encontrado.</p>
          ) : (
            <div className="space-y-8">
              {users.map(user => {
                const stats = calculateUserStats(user.id);
                return (
                  <div key={user.id} className="border p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">{user.name || user.email} ({user.role})</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Total de Tarefas</TableHead>
                          <TableHead>Concluídas</TableHead>
                          <TableHead>Em Progresso</TableHead>
                          <TableHead>A Fazer</TableHead>
                          <TableHead>Bloqueadas</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>{stats.totalTasks}</TableCell>
                          <TableCell>{stats.completedTasks}</TableCell>
                          <TableCell>{stats.inProgressTasks}</TableCell>
                          <TableCell>{stats.todoTasks}</TableCell>
                          <TableCell>{stats.blockedTasks}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <h4 className="text-lg font-semibold mt-6 mb-3">Tarefas Atribuídas</h4>
                    {getTasksByUser(user.id).length === 0 ? (
                      <p>Nenhuma tarefa atribuída a este usuário.</p>
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
                          {getTasksByUser(user.id).map(task => (
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

export default UserReport;
