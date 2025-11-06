import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold">
          <span className="text-primary">Task</span>Flow
        </h1>
        <p className="text-xl text-muted-foreground">
          Gerencie suas tarefas e projetos com eficiência
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Button asChild className="bg-primary hover:bg-primary-hover">
            <Link to="/auth/login">Fazer Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/auth/register">Criar Conta</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
