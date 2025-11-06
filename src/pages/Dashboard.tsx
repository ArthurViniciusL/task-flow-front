import { AppLayout } from "@/components/layout/AppLayout";

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao TaskFlow! Esta é a página do dashboard.
        </p>
        {/* TODO: Adicionar widgets e estatísticas */}
      </div>
    </AppLayout>
  );
}
