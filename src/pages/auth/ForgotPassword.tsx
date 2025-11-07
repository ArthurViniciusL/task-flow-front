import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { authApi } from '@/lib/api/mockApi';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().email({ message: "E-mail inválido." }),
});

type FormData = z.infer<typeof formSchema>;

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await authApi.requestPasswordReset(data.email);
      if (response.success) {
        toast.success(response.message || "Link de redefinição enviado com sucesso!");
        navigate('/login');
      } else {
        toast.error(response.message || "Falha ao enviar link de redefinição.");
      }
    } catch (error) {
      console.error("Erro ao solicitar redefinição de senha:", error);
      toast.error("Ocorreu um erro inesperado.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Esqueceu sua senha?</CardTitle>
          <CardDescription>Insira seu e-mail para receber um link de redefinição de senha.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar link de redefinição"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Lembrou da sua senha?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
              Entrar
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
