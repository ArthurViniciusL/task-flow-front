import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from '@/types/auth';

const userFormSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório." }),
  email: z.string().email({ message: "E-mail inválido." }),
  role: z.enum(['admin', 'manager', 'collaborator'], { message: "Perfil inválido." }),
});

type UserFormData = z.infer<typeof userFormSchema>;

interface UserFormProps {
  initialData?: User; // For editing existing users
  onSubmit: (data: UserFormData) => void;
  isSubmitting?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit, isSubmitting }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: initialData || {
      name: '',
      email: '',
      role: 'collaborator',
    },
  });

  React.useEffect(() => {
    if (initialData) {
      setValue("role", initialData.role);
    }
  }, [initialData, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Perfil</Label>
        <Select
          onValueChange={(value) => setValue("role", value as User['role'])}
          defaultValue={initialData?.role || 'collaborator'}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o perfil" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Administrador</SelectItem>
            <SelectItem value="manager">Gerente</SelectItem>
            <SelectItem value="collaborator">Colaborador</SelectItem>
          </SelectContent>
        </Select>
        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Salvar Usuário"}
      </Button>
    </form>
  );
};

export default UserForm;
