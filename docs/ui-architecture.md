### Arquitetura de Interface de Usuário (UI) do Projeto TaskFlow

Esta seção detalha a arquitetura da interface de usuário (frontend) do projeto TaskFlow, focando nas tecnologias, padrões e estrutura que guiam seu desenvolvimento.

#### 1. Visão Geral

O frontend do TaskFlow é uma Single Page Application (SPA) construída com React e TypeScript, utilizando Vite para o ambiente de desenvolvimento e build, e Tailwind CSS para estilização. O roteamento é gerenciado pelo React Router DOM, e a aplicação consome uma API RESTful fornecida pelo backend.

#### 2. Pilha de Tecnologia Frontend

*   **Framework:** React (versão 18.2.0)
    *   Utilizado para construir a interface do usuário de forma declarativa e baseada em componentes.
*   **Linguagem:** TypeScript (versão 5.0.0)
    *   Adiciona tipagem estática ao JavaScript, melhorando a manutenibilidade, detecção de erros e escalabilidade do código.
*   **Ferramenta de Build:** Vite (versão 5.0.0)
    *   Um bundler de próxima geração que oferece um ambiente de desenvolvimento extremamente rápido e otimizações de build para produção.
*   **Estilização:** Tailwind CSS
    *   Um framework CSS utility-first que permite a construção rápida de designs personalizados diretamente no markup, promovendo consistência e reusabilidade.
*   **Roteamento:** React Router DOM (versão 6.0.0)
    *   Gerencia a navegação entre as diferentes páginas e seções da aplicação, permitindo rotas aninhadas e protegidas.
*   **Gerenciamento de Estado (Local/Componente):** `useState`, `useContext` do React.
*   **Gerenciamento de Estado (Global - Potencial):** Considerar React Context API para estados globais simples, ou bibliotecas como Zustand/Redux Toolkit para cenários mais complexos, conforme a necessidade.
*   **Componentes UI:** Componentes customizados e potencialmente bibliotecas de componentes (ex: Shadcn UI, como indicado pela estrutura `src/components/ui/`).
*   **Ícones:** Lucide React (versão 0.300.0)
    *   Biblioteca de ícones para uso na interface.
*   **Drag and Drop:** @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities
    *   Bibliotecas para implementar a funcionalidade de arrastar e soltar, essencial para o quadro Kanban.
*   **Gráficos:** Recharts (versão 3.3.0)
    *   Biblioteca de gráficos para visualização de dados no dashboard.
*   **Datas:** date-fns (versão 4.1.0)
    *   Biblioteca para manipulação e formatação de datas.
*   **Notificações Toast:** Sonner (via `@/components/ui/sonner`)
    *   Componente para exibir notificações temporárias ao usuário.

#### 3. Estrutura de Pastas (src/)

*   `src/App.tsx`: Componente raiz da aplicação, responsável pela configuração do roteamento.
*   `src/main.tsx`: Ponto de entrada da aplicação, onde o React é renderizado no DOM.
*   `src/index.css`: Estilos globais da aplicação, incluindo a importação do Tailwind CSS.
*   `src/app/`: Contém componentes de layout ou páginas de nível superior (ex: `Index.tsx`, `NotFound.tsx`).
*   `src/components/`: Componentes reutilizáveis da UI.
    *   `dashboard/`: Componentes específicos do dashboard (ex: `StatsCard.tsx`).
    *   `layout/`: Componentes de layout da aplicação (ex: `AppLayout.tsx`, `AppSidebar.tsx`).
    *   `tasks/`: Componentes relacionados a tarefas (ex: `TaskCard.tsx`, `TaskFilters.tsx`).
    *   `ui/`: Componentes de UI genéricos e reutilizáveis (ex: `button.tsx`, `input.tsx`, `card.tsx`, `sonner.tsx`).
*   `src/lib/api/`: Módulos para interação com a API (atualmente `mockApi.ts`, `mockData.ts`, a ser substituído por integração com API real).
*   `src/pages/`: Componentes que representam páginas completas da aplicação.
    *   `auth/`: Páginas de autenticação (ex: `Login.tsx`, `Register.tsx`, `ForgotPassword.tsx`).
    *   `Dashboard.tsx`: Página principal do dashboard.
    *   `tasks/`: Páginas relacionadas à gestão de tarefas (ex: `TaskList.tsx`, `TaskKanban.tsx`).
*   `src/types/`: Definições de tipos TypeScript para a aplicação (ex: `task.ts`).

#### 4. Padrões de Design e Arquitetura

*   **Component-Based Architecture:** A aplicação é construída como uma árvore de componentes React, promovendo reusabilidade e modularidade.
*   **Atomic Design (Implícito):** A estrutura de componentes em `src/components/ui/` sugere uma abordagem que pode evoluir para princípios de Atomic Design, começando com átomos (botões, inputs) e construindo moléculas e organismos.
*   **Separação de Preocupações:** Lógica de UI, lógica de negócios e acesso a dados são mantidos separados para maior clareza e testabilidade.
*   **Roteamento Declarativo:** Utiliza React Router DOM para definir as rotas da aplicação de forma declarativa, incluindo rotas públicas e protegidas.
*   **Design Responsivo:** Implementado via Tailwind CSS, garantindo que a interface se adapte a diferentes tamanhos de tela e dispositivos.
*   **Consumo de API RESTful:** A aplicação interage com o backend através de chamadas a uma API RESTful, seguindo o padrão de requisição-resposta.
*   **Gerenciamento de Estado:** Uma combinação de estado local de componentes e, potencialmente, React Context para estados globais, visando otimizar o re-render e a propagação de dados.

#### 5. Fluxo de Dados e Interações

1.  **Inicialização:** `main.tsx` renderiza o componente `App.tsx`.
2.  **Roteamento:** `App.tsx` configura as rotas usando `BrowserRouter` e `Routes`.
3.  **Autenticação:** Usuários interagem com as páginas em `src/pages/auth/`. Após o login, um JWT é recebido do backend e armazenado. Rotas protegidas (dentro de `<AppLayout />`) verificam a presença e validade do JWT.
4.  **Layout:** `AppLayout.tsx` fornece a estrutura comum da aplicação (cabeçalho, sidebar, etc.) para rotas protegidas.
5.  **Interação com Dados:** Componentes fazem chamadas assíncronas à API (atualmente `mockApi.ts`) para buscar, criar, atualizar ou deletar dados (tarefas, projetos, etc.).
6.  **Atualização da UI:** O estado dos componentes é atualizado com os dados recebidos, e o React re-renderiza a UI conforme necessário.

#### 6. Considerações Futuras

*   **Internacionalização (i18n):** Adicionar suporte a múltiplos idiomas.
*   **Tematização:** Implementar um sistema de temas mais robusto (claro/escuro).
*   **Testes:** Implementar testes unitários e de integração para componentes e fluxos críticos.
*   **Otimização de Performance:** Lazy loading de componentes, otimização de imagens, etc.
*   **WebSockets:** Para atualizações em tempo real (ex: Kanban, notificações) se o polling não for suficiente.