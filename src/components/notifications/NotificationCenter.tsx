import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

export function NotificationCenter() {
  // Mock data for notifications
  const notifications = [
    { id: "1", message: "Nova tarefa atribuída: Implementar Login Page", time: "2 horas atrás" },
    { id: "2", message: "Comentário na tarefa: Design Database Schema", time: "1 dia atrás" },
    { id: "3", message: "Seu projeto 'TaskFlow App' foi atualizado", time: "3 dias atrás" },
    { id: "4", message: "Lembrete: Reunião de equipe às 10h", time: "5 dias atrás" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {notifications.length}
            </span>
          )}
          <span className="sr-only">Notificações</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notificações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-72 w-full rounded-md">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start space-y-1">
                <p className="text-sm font-medium leading-none">{notification.message}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem className="text-center text-muted-foreground">
              Nenhuma notificação nova.
            </DropdownMenuItem>
          )}
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center">
          Ver todas as notificações
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}