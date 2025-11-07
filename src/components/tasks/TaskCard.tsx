import { Task } from "@/types/task";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getUserById } from "@/lib/api/mockData";

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const statusLabels = {
  todo: "A Fazer",
  "in-progress": "Em Progresso",
  done: "Concluído",
  blocked: "Bloqueado",
  backlog: "Backlog",
};

const statusColors = {
  todo: "secondary",
  "in-progress": "default",
  done: "outline",
  blocked: "destructive",
  backlog: "secondary", // novo
} as const;

const priorityLabels = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
  urgent: "Urgente",
};

const priorityColors = {
  low: "secondary",
  medium: "default",
  high: "default",
  urgent: "destructive",
} as const;

export function TaskCard({ task, onClick }: TaskCardProps) {
  const assignedUser = task.assignedTo ? getUserById(task.assignedTo) : undefined;
  const priority = task.priority || 'medium';

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm line-clamp-2">{task.title}</h3>
          <Badge variant={priorityColors[priority]} className="shrink-0 text-xs">
            {priorityLabels[priority]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {task.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{assignedUser?.name || "Não atribuído"}</span>
          </div>
          
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{format(new Date(task.dueDate), "dd/MM/yyyy", { locale: ptBR })}</span>
            </div>
          )}
        </div>

        <Badge variant={statusColors[task.status]} className="w-full justify-center">
          {statusLabels[task.status]}
        </Badge>
      </CardContent>
    </Card>
  );
}
