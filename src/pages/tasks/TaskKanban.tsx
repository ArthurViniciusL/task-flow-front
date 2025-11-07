import { useState, useEffect } from "react";
import { Task, TaskStatus } from "@/types/task";
import { taskApi } from "@/lib/api/mockApi";
import { TaskCard } from "@/components/tasks/TaskCard";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

const statusColumns: { id: TaskStatus; label: string; color: string }[] = [
  { id: "todo", label: "A Fazer", color: "bg-secondary" },
  { id: "in-progress", label: "Em Progresso", color: "bg-blue-100 dark:bg-blue-950" },
  { id: "done", label: "Concluído", color: "bg-green-100 dark:bg-green-950" },
  { id: "blocked", label: "Bloqueado", color: "bg-red-100 dark:bg-red-950" },
];

function SortableTaskCard({ task }: { task: Task }) {
  const navigate = useNavigate();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} onClick={() => navigate(`/tasks/edit/${task.id}`)} />
    </div>
  );
}

export default function TaskKanban() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await taskApi.getAll();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    // Atualizar localmente
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    // Atualizar via API
    try {
      await taskApi.updateStatus(taskId, newStatus);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      // Reverter em caso de erro
      loadTasks();
    }
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LayoutGrid className="h-8 w-8" />
          <div>
            <h1 className="text-3xl font-bold">Kanban</h1>
            <p className="text-muted-foreground">Visualização por status</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/tasks")}>
            Visualizar Lista
          </Button>
          <Button onClick={() => navigate("/tasks/new")}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Tarefa
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">
          Carregando tarefas...
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statusColumns.map((column) => {
              const columnTasks = getTasksByStatus(column.id);
              return (
                <div key={column.id} className="flex flex-col gap-3">
                  <div className={`${column.color} rounded-lg p-3`}>
                    <h2 className="font-semibold flex items-center justify-between">
                      {column.label}
                      <span className="text-sm text-muted-foreground">
                        {columnTasks.length}
                      </span>
                    </h2>
                  </div>

                  <SortableContext
                    id={column.id}
                    items={columnTasks.map((t) => t.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="flex flex-col gap-3 min-h-[200px]">
                      {columnTasks.map((task) => (
                        <SortableTaskCard key={task.id} task={task} />
                      ))}
                    </div>
                  </SortableContext>
                </div>
              );
            })}
          </div>

          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
}
