import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TaskActivityLogProps {
  taskId: string;
}

const TaskActivityLog: React.FC<TaskActivityLogProps> = ({ taskId }) => {
  // In a real application, this data would be fetched from an API using the taskId
  console.log(`Fetching activity for taskId: ${taskId}`);
  const activityLog = [
    { id: '1', user: 'Gerente Silva', action: 'alterou o status para Em Progresso', timestamp: '2024-11-05 10:30' },
    { id: '2', user: 'João Santos', action: 'adicionou um comentário', timestamp: '2024-11-05 11:00' },
    { id: '3', user: 'Gerente Silva', action: 'atribuiu a tarefa a Maria Oliveira', timestamp: '2024-11-06 09:00' },
    { id: '4', user: 'Maria Oliveira', action: 'alterou a prioridade para Alta', timestamp: '2024-11-06 14:00' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Atividades</CardTitle>
      </CardHeader>
      <CardContent>
        {activityLog.length === 0 ? (
          <p>Nenhuma atividade registrada para esta tarefa.</p>
        ) : (
          <div className="space-y-3">
            {activityLog.map((activity) => (
              <div key={activity.id} className="text-sm">
                <span className="font-medium">{activity.user}</span> {activity.action}
                <span className="text-xs text-gray-500 ml-2">({activity.timestamp})</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskActivityLog;
