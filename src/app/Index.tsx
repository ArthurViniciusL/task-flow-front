import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Users, BarChart3 } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">TaskFlow</h1>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Entrar
            </Button>
            <Button onClick={() => navigate("/register")}>
              Cadastrar
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Gerencie suas tarefas com eficiência
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            TaskFlow é a solução completa para gestão de tarefas e projetos da sua equipe
          </p>
          <Button size="lg" onClick={() => navigate("/register")}>
            Começar Agora
          </Button>
        </section>

        <section className="container mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Gestão de Tarefas</h3>
              <p className="text-muted-foreground">
                Crie, organize e acompanhe tarefas com facilidade
              </p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Colaboração</h3>
              <p className="text-muted-foreground">
                Trabalhe em equipe com comentários e notificações
              </p>
            </div>
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Relatórios</h3>
              <p className="text-muted-foreground">
                Acompanhe o progresso com dashboards e métricas
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; 2024 TaskFlow. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
