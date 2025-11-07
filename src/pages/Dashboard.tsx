import { useState, useEffect } from "react";
import { Task } from "@/types/task";
import { taskApi } from "@/lib/api/mockApi";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TaskCard } from "@/components/tasks/TaskCard";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Clock, AlertCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await taskApi.getAll();
      setTasks(data);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in_progress").length,
    done: tasks.filter((t) => t.status === "done").length,
    blocked: tasks.filter((t) => t.status === "blocked").length,
  };

  const recentTasks = tasks
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 6);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral das suas tarefas e projetos</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="A Fazer"
          value={stats.todo}
          icon={Circle}
          description="Tarefas pendentes"
        />
        <StatsCard
          title="Em Progresso"
          value={stats.inProgress}
          icon={Clock}
          description="Tarefas em andamento"
        />
        <StatsCard
          title="Concluído"
          value={stats.done}
          icon={CheckCircle2}
          description="Tarefas finalizadas"
        />
        <StatsCard
          title="Bloqueado"
          value={stats.blocked}
          icon={AlertCircle}
          description="Tarefas com impedimentos"
        />
      </div>

      {/* Recent Tasks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Tarefas Recentes</h2>
          <Button variant="ghost" onClick={() => navigate("/tasks")}>
            Ver todas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Carregando tarefas...
          </div>
        ) : recentTasks.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Nenhuma tarefa encontrada
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => navigate(`/tasks/${task.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
