import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/context/AuthContext';
import { RegisterData } from '@/types/auth';

const formSchema = z.object({
  username: z.string().min(1, { message: "O nome de usuário é obrigatório." }),
  email: z.string().email({ message: "E-mail inválido." }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
  confirmPassword: z.string(),
  roles: z.string().optional(), // Will be parsed into string[]
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

const Register: React.FC = () => {
  const { register: authRegister, isSubmitting } = useAuth(); // Rename register to avoid conflict
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    console.log('Register component mounted');
    return () => {
      console.log('Register component unmounted');
    };
  }, []);

  const onSubmit = async (data: FormData) => {
    console.log('Register form submitted', data);
    try {
      const registerData: RegisterData = {
        username: data.username,
        email: data.email,
        password: data.password,
        roles: data.roles ? data.roles.split(',').map(role => role.trim().toUpperCase()) : ["COLLABORATOR"], // Default role
      };
      await authRegister(registerData);
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Criar uma conta</CardTitle>
          <CardDescription>Insira seu e-mail e senha abaixo para criar sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nome de Usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="Arthur"
                {...register("username")}
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>
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
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="roles">Cargos (separados por vírgula)</Label>
              <Input
                id="roles"
                type="text"
                placeholder="ADMIN, MANAGER, COLLABORATOR"
                {...register("roles")}
              />
              {errors.roles && <p className="text-red-500 text-sm">{errors.roles.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Registrando..." : "Registrar"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Já tem uma conta?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
              Entrar
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
