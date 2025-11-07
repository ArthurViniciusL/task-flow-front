import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Task } from '@/types/task';
import { User } from '@/types/auth';
import { Project } from '@/types/project';

const taskFormSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório." }),
  description: z.string().optional(),
  status: z.enum(['todo', 'in-progress', 'done', 'backlog', 'blocked'], { message: "Status inválido." }),
  priority: z.enum(['low', 'medium', 'high', 'urgent'], { message: "Prioridade inválida." }).optional(),
  dueDate: z.string().optional(), // Consider more robust date validation if needed
  assignedTo: z.string().optional(), // User ID
  projectId: z.string().optional(), // Project ID
});

export type TaskFormData = z.infer<typeof taskFormSchema>;

interface TaskFormProps {
  initialData?: Task; // For editing existing tasks
  onSubmit: (data: TaskFormData) => void;
  isSubmitting?: boolean;
  users: User[]; // List of users for assignedTo select
  projects: Project[]; // List of projects for projectId select
}

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit, isSubmitting, users, projects }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      dueDate: '',
      assignedTo: '',
      projectId: '',
    },
  });

  // Manually set values for Select components as react-hook-form doesn't handle them directly with {...register}
  React.useEffect(() => {
    if (initialData) {
      setValue("status", initialData.status);
      if (initialData.priority) setValue("priority", initialData.priority);
      if (initialData.assignedTo) setValue("assignedTo", initialData.assignedTo);
      if (initialData.dueDate) setValue("dueDate", initialData.dueDate);
      if (initialData.projectId) setValue("projectId", initialData.projectId);
    }
  }, [initialData, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input id="title" {...register("title")} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea id="description" {...register("description")} />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          onValueChange={(value) => setValue("status", value as Task['status'])} // Cast to Task['status']
          defaultValue={initialData?.status || 'todo'}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todo">A Fazer</SelectItem>
            <SelectItem value="in-progress">Em Progresso</SelectItem>
            <SelectItem value="done">Concluído</SelectItem>
            <SelectItem value="backlog">Backlog</SelectItem>
            <SelectItem value="blocked">Bloqueado</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">Prioridade</Label>
        <Select
          onValueChange={(value) => setValue("priority", value as Task['priority'])} // Cast to Task['priority']
          defaultValue={initialData?.priority || 'medium'}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Baixa</SelectItem>
            <SelectItem value="medium">Média</SelectItem>
            <SelectItem value="high">Alta</SelectItem>
            <SelectItem value="urgent">Urgente</SelectItem>
          </SelectContent>
        </Select>
        {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dueDate">Data de Entrega</Label>
        <Input id="dueDate" type="date" {...register("dueDate")} />
        {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="assignedTo">Atribuído a</Label>
        <Select
          onValueChange={(value) => setValue("assignedTo", value)}
          defaultValue={initialData?.assignedTo || ''}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione um usuário" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Não atribuído</SelectItem>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name || user.email}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.assignedTo && <p className="text-red-500 text-sm">{errors.assignedTo.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectId">Projeto</Label>
        <Select
          onValueChange={(value) => setValue("projectId", value)}
          defaultValue={initialData?.projectId || ''}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione um projeto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Nenhum Projeto</SelectItem>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.projectId && <p className="text-red-500 text-sm">{errors.projectId.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Salvar Tarefa"}
      </Button>
    </form>
  );
};

export default TaskForm;
