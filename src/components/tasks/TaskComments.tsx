import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { commentApi } from '@/lib/api/mockApi';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Comment } from '@/types/comment';

interface TaskCommentsProps {
  taskId: string;
}

const TaskComments: React.FC<TaskCommentsProps> = ({ taskId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const fetchedComments = await commentApi.getByTaskId(taskId);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
      toast.error("Ocorreu um erro ao carregar os comentários.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [taskId]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !user) {
      toast.error("Comentário não pode ser vazio e você precisa estar logado.");
      return;
    }

    setIsSubmitting(true);
    try {
      const addedComment = await commentApi.add({
        taskId,
        userId: user.id,
        userName: user.name || user.email,
        content: newComment,
      });
      setComments((prev) => [...prev, addedComment]);
      setNewComment('');
      toast.success("Comentário adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
      toast.error("Ocorreu um erro ao adicionar o comentário.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comentários</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Carregando comentários...</p>
        ) : comments.length === 0 ? (
          <p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>
        ) : (
          <div className="space-y-4 mb-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b pb-2 last:border-b-0">
                <p className="text-sm font-semibold">{comment.userName} <span className="text-xs text-gray-500">({new Date(comment.createdAt).toLocaleString()})</span></p>
                <p className="text-sm mt-1">{comment.content}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4">
          <Textarea
            placeholder="Adicione um comentário..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            className="mb-2"
            disabled={!user || isSubmitting}
          />
          <Button onClick={handleAddComment} disabled={!user || isSubmitting}>
            {isSubmitting ? "Adicionando..." : "Adicionar Comentário"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskComments;
