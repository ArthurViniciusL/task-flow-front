import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { taskApi, userApi } from '@/lib/api/mockApi';
import { Task } from '@/types/task';
import { User } from '@/types/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const TaskList: React.FC = () => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tasksPerPage] = useState<number>(10); // Number of tasks per page
  const [sortColumn, setSortColumn] = useState<keyof Task>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterAssignedTo, setFilterAssignedTo] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchTasksAndUsers = async () => {
    setLoading(true);
    try {
      const fetchedTasks = await taskApi.getAll();
      const fetchedUsers = await userApi.getAll();
      setAllTasks(fetchedTasks);
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      toast.error("Ocorreu um erro ao carregar os dados.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasksAndUsers();
  }, []);

  const handleSort = (column: keyof Task) => {
    if (sortColumn === column) {
      setSortDirection(prevDirection => (prevDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc'); // Default to ascending when changing column
    }
  };

  const sortedAndFilteredTasks = useMemo(() => {
    let filtered = [...allTasks];

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        users.find(user => user.id === task.assignedTo)?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === filterStatus);
    }

    // Apply priority filter
    if (filterPriority !== 'all') {
      filtered = filtered.filter(task => task.priority === filterPriority);
    }

    // Apply assignedTo filter
    if (filterAssignedTo !== 'all') {
      filtered = filtered.filter(task => task.assignedTo === filterAssignedTo);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue === undefined || bValue === undefined) return 0;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      // Fallback for other types or if values are not comparable
      return 0;
    });

    return filtered;
  }, [allTasks, users, searchTerm, filterStatus, filterPriority, filterAssignedTo, sortColumn, sortDirection]);

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedAndFilteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(sortedAndFilteredTasks.length / tasksPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDeleteTask = async (id: string) => {
    try {
      const success = await taskApi.delete(id);
      if (success) {
        toast.success("Tarefa excluída com sucesso!");
        fetchTasksAndUsers(); // Refresh the list
      } else {
        toast.error("Falha ao excluir a tarefa.");
      }
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
      toast.error("Ocorreu um erro ao excluir a tarefa.");
    }
  };

  const getAssignedUserName = (userId?: string) => {
    return users.find(user => user.id === userId)?.name || "Não atribuído";
  };

  if (loading) {
    return <div className="container mx-auto py-8">Carregando tarefas...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Lista de Tarefas</CardTitle>
          <Button asChild>
            <Link to="/tasks/new">Nova Tarefa</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Input
              placeholder="Buscar tarefas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="todo">A Fazer</SelectItem>
                <SelectItem value="in-progress">Em Progresso</SelectItem>
                <SelectItem value="done">Concluído</SelectItem>
                <SelectItem value="backlog">Backlog</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Prioridades</SelectItem>
                <SelectItem value="low">Baixa</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="urgent">Urgente</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterAssignedTo} onValueChange={setFilterAssignedTo}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por Atribuído" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Usuários</SelectItem>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>{user.name || user.email}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {currentTasks.length === 0 ? (
            <p>Nenhuma tarefa encontrada com os filtros aplicados.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort('title')}>
                    Título {sortColumn === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('status')}>
                    Status {sortColumn === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('priority')}>
                    Prioridade {sortColumn === 'priority' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('dueDate')}>
                    Data de Entrega {sortColumn === 'dueDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('assignedTo')}>
                    Atribuído a {sortColumn === 'assignedTo' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>{task.priority}</TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                    <TableCell>{getAssignedUserName(task.assignedTo)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/tasks/edit/${task.id}`}>Editar</Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" className="ml-2">Excluir</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação não pode ser desfeita. Isso excluirá permanentemente a tarefa "{task.title}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteTask(task.id)}>Continuar</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskList;
