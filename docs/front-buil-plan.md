📋 Plano Detalhado de Construção - TaskFlow
Analisei toda a documentação (PRD, Épicos, Arquitetura e Análise UX) e elaborei este plano estruturado para construção das telas.

🎨 1. Sistema de Design (Primeira Etapa)
Ação: Atualizar src/index.css e tailwind.config.ts com o esquema de cores especificado.

Cores a implementar:

Primary: #00BDB7 → HSL: 178 100% 37%
Primary-hover: #00a69b → HSL: 177 100% 33%
Text: #666666 → HSL: 0 0% 40%
Tokens semânticos:


--primary: 178 100% 37%
--primary-hover: 177 100% 33%
--primary-foreground: 0 0% 100%
--text-muted: 0 0% 40%
🏗️ 2. Estrutura de Pastas e Componentes
Estrutura proposta:

src/
├── pages/              # Páginas principais
│   ├── auth/           # Autenticação
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── ForgotPassword.tsx
│   ├── dashboard/      # Dashboard
│   │   └── Dashboard.tsx
│   ├── tasks/          # Gestão de tarefas
│   │   ├── TaskList.tsx
│   │   ├── TaskKanban.tsx
│   │   └── TaskDetails.tsx
│   ├── projects/       # Gestão de projetos
│   │   ├── ProjectList.tsx
│   │   └── ProjectDetails.tsx
│   ├── admin/          # Administração
│   │   └── UserManagement.tsx
│   └── settings/       # Configurações
│       └── Settings.tsx
├── components/         # Componentes reutilizáveis
│   ├── layout/
│   │   ├── AppLayout.tsx      # Layout principal com sidebar
│   │   ├── AppSidebar.tsx     # Sidebar de navegação
│   │   └── Header.tsx         # Header com notificações
│   ├── tasks/
│   │   ├── TaskCard.tsx       # Card de tarefa
│   │   ├── TaskForm.tsx       # Formulário de tarefa
│   │   ├── TaskFilters.tsx    # Filtros de busca
│   │   └── CommentSection.tsx # Seção de comentários
│   ├── projects/
│   │   ├── ProjectCard.tsx    # Card de projeto
│   │   ├── ProjectForm.tsx    # Formulário de projeto
│   │   └── ProgressBar.tsx    # Barra de progresso
│   ├── dashboard/
│   │   ├── StatsCard.tsx      # Card de estatísticas
│   │   └── TaskChart.tsx      # Gráfico de tarefas
│   └── notifications/
│       └── NotificationCenter.tsx # Centro de notificações
└── lib/
    ├── api/            # Chamadas de API (mocked para MVP)
    ├── hooks/          # Hooks customizados
    └── types/          # TypeScript types
📄 3. Telas por Épico (Ordem de Implementação)
Epic 1: Autenticação e Base do Sistema
Telas:

Login (pages/auth/Login.tsx)

Formulário com email/senha
Link para recuperação de senha
Link para cadastro
Validação com react-hook-form + zod
Cadastro (pages/auth/Register.tsx)

Formulário com email/senha/confirmação
Indicador de força da senha
Redirecionamento pós-cadastro
Recuperação de Senha (pages/auth/ForgotPassword.tsx)

Formulário com email
Feedback de email enviado
Componentes reutilizados:

Input (shadcn)
Button (shadcn)
Card (shadcn)
Form (shadcn)
Epic 2: Gestão Essencial de Tarefas
Telas:

Lista de Tarefas (pages/tasks/TaskList.tsx)

Tabela com colunas: título, responsável, status, prioridade, data
Paginação
Filtros e busca
Ações: editar, excluir, visualizar
Quadro Kanban (pages/tasks/TaskKanban.tsx)

Colunas: A Fazer, Em Progresso, Concluído
Drag & drop (usando dnd-kit ou similar)
Cards de tarefa
Detalhes da Tarefa (pages/tasks/TaskDetails.tsx)

Visualização completa
Seção de comentários
Histórico de alterações
Componentes novos:

TaskCard - Card de tarefa para lista/kanban
TaskForm - Modal ou página para criar/editar
TaskFilters - Barra de filtros e busca
CommentSection - Área de comentários
Componentes reutilizados:

Table (shadcn)
Dialog (shadcn)
Select (shadcn)
Badge (shadcn para status/prioridade)
Epic 3: Gestão de Projetos
Telas:

Lista de Projetos (pages/projects/ProjectList.tsx)

Grid ou lista de cards de projeto
Progresso percentual
Acesso aos detalhes
Detalhes do Projeto (pages/projects/ProjectDetails.tsx)

Informações do projeto
Tarefas associadas
Resumo de progresso
Membros da equipe
Componentes novos:

ProjectCard - Card de projeto
ProjectForm - Formulário de criação/edição
ProgressBar - Barra de progresso visual
Componentes reutilizados:

Card (shadcn)
Progress (shadcn)
Avatar (shadcn para membros)
Epic 4: Colaboração e Notificações
Componentes:

Centro de Notificações (components/notifications/NotificationCenter.tsx)

Ícone de sino no header
Dropdown com lista de notificações
Marcar como lido
Link para item relevante
Seção de Comentários (já em TaskDetails)

Input de texto
Lista de comentários
Avatar + autor + timestamp
Integração em:

Header (NotificationCenter)
TaskDetails (CommentSection + ActivityLog)
Componentes reutilizados:

Popover (shadcn)
ScrollArea (shadcn)
Textarea (shadcn)
Epic 5: Dashboard e Relatórios
Telas:

Dashboard Principal (pages/dashboard/Dashboard.tsx)

Cards com contadores (A Fazer, Em Progresso, Concluído)
Gráfico de tarefas por status
Tarefas recentes
Projetos em andamento
Relatórios (Seção dentro do Dashboard ou página separada)

Filtros: por usuário, por projeto, por período
Visualização de dados
Botão de exportação (CSV/PDF)
Componentes novos:

StatsCard - Card de estatísticas
TaskChart - Gráfico (usando recharts)
Componentes reutilizados:

Card (shadcn)
Chart (shadcn - recharts)
Button (shadcn)
Epic 6: Configurações e Administração
Telas:

Gestão de Usuários (pages/admin/UserManagement.tsx)

Tabela de usuários
Ações: criar, editar perfil, desativar
Filtros por perfil
Configurações (pages/settings/Settings.tsx)

Perfil do usuário
Preferências (tema, idioma - opcional)
Componentes reutilizados:

Table (shadcn)
Dialog (shadcn)
Switch (shadcn para ativar/desativar)
🔧 4. Layout Global e Navegação
Componentes de Layout:

AppLayout (components/layout/AppLayout.tsx)

SidebarProvider do shadcn
Estrutura: Sidebar + Main content area
Wrapper para todas as páginas autenticadas
AppSidebar (components/layout/AppSidebar.tsx)

Logo
Itens de menu:
Dashboard
Tarefas (Lista/Kanban)
Projetos
Configurações
Admin (condicional para admins)
Indicador de página ativa
Colapsar/expandir
Header (components/layout/Header.tsx)

Título da página
Centro de notificações
Avatar do usuário
Menu dropdown (logout)
Roteamento:

Rotas públicas: /login, /register, /forgot-password
Rotas protegidas: Todas as demais (verificação de JWT)
Rotas de admin: /admin/* (verificação de perfil)
🎯 5. Ordem de Implementação Sugerida
Fase 1 - Base:

Design system (cores)
Layout (AppLayout, AppSidebar, Header)
Páginas de autenticação (Login, Register)
Fase 2 - Core:

Dashboard básico
Lista de tarefas
Kanban de tarefas
Formulário de tarefa
Fase 3 - Expansão:

Projetos (lista + detalhes)
Comentários e notificações
Histórico de atividades
Fase 4 - Admin e Relatórios:

Dashboard com métricas
Gestão de usuários
Relatórios e exportação
📦 6. Componentes Shadcn a Utilizar
Já disponíveis:

✅ Button, Input, Label, Form
✅ Card, Badge, Avatar
✅ Dialog, Popover, Sheet
✅ Table, Select, Checkbox, Switch
✅ Sidebar, Tabs, Progress
✅ Toaster (feedback)
🔒 7. Dados Mock para MVP
Como estamos no frontend primeiro, criaremos:

lib/api/mockData.ts - Dados simulados
lib/api/mockApi.ts - Funções que simulam API calls
LocalStorage ou Context API para estado temporário
✅ Resumo do Plano
Este plano propõe:

20+ componentes reutilizáveis (TaskCard, ProjectCard, etc.)
13 páginas principais (Login, Dashboard, TaskList, etc.)
3 componentes de layout (AppLayout, Sidebar, Header)
Integração total com shadcn UI (sem CSS customizado)
Design system baseado nas cores especificadas (#00BDB7)
Estrutura modular e escalável