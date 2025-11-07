# Plano de Construção do Frontend (Front-Build Plan)

Este documento descreve o plano de construção do frontend do projeto TaskFlow, detalhando as etapas de desenvolvimento com base nos épicos e histórias definidos, e alinhado com a arquitetura de UI estabelecida.

## 1. Visão Geral e Abordagem

A construção do frontend seguirá uma abordagem iterativa, focando na entrega de valor incremental por épico. Cada épico será desmembrado em histórias de usuário, que serão implementadas e testadas. A prioridade será dada à funcionalidade principal, seguida por melhorias de UX e recursos adicionais.

## 2. Ferramentas e Ambiente de Desenvolvimento

*   **Ambiente:** Node.js, npm/yarn
*   **Editor:** VS Code (com extensões para React, TypeScript, Tailwind CSS)
*   **Controle de Versão:** Git
*   **Servidor de Desenvolvimento:** Vite
*   **Testes:** (A definir, mas considerar Vitest/Jest com React Testing Library)

## 3. Etapas de Desenvolvimento por Épico

### Épico 1: Autenticação e Base do Sistema

**Objetivo:** Estabelecer a infraestrutura fundamental para o sistema, criando um mecanismo de autenticação seguro e robusto.

**Foco:** Configuração inicial do projeto, rotas de autenticação, integração com API de autenticação (mockada inicialmente, depois real).

**Histórias e Tarefas Chave:**

*   **Story 1.1: Cadastro de Usuário com E-mail e Senha**
    *   Criar componente de formulário de registro (`Register.tsx`).
    *   Implementar validação de formulário (ex: `react-hook-form` + `zod`).
    *   Integrar com `mockApi.ts` para simular o registro.
    *   Adicionar redirecionamento para a tela de login após sucesso.
*   **Story 1.2: Login de Usuário com E-mail e Senha**
    *   Criar componente de formulário de login (`Login.tsx`).
    *   Implementar validação de formulário.
    *   Integrar com `mockApi.ts` para simular o login e o retorno de JWT.
    *   Implementar armazenamento seguro do JWT (ex: `localStorage` ou `sessionStorage` para MVP).
    *   Criar um contexto de autenticação (`AuthContext`) para gerenciar o estado de autenticação global.
    *   Adicionar redirecionamento para o dashboard após login bem-sucedido.
*   **Story 1.3: Recuperação de Senha via E-mail**
    *   Criar componente de formulário de recuperação de senha (`ForgotPassword.tsx`).
    *   Implementar validação de e-mail.
    *   Integrar com `mockApi.ts` para simular o envio de e-mail.
    *   (Considerar a implementação da redefinição de senha em uma fase posterior, dependendo da API).
*   **Story 1.4: Gestão de Perfis de Usuário (Atribuição Inicial)**
    *   (Esta história tem uma dependência forte do backend para gestão de perfis. No frontend, focar na exibição do perfil do usuário logado e na proteção de rotas baseada nesse perfil).
    *   Implementar proteção de rotas usando `AuthContext` e o perfil do usuário.

### Épico 2: Gestão Essencial de Tarefas

**Objetivo:** Implementar as funcionalidades centrais de criação, edição, atribuição e visualização de tarefas.

**Foco:** Componentes de tarefas, integração com API de tarefas (mockada inicialmente), visualizações em lista e Kanban.

**Histórias e Tarefas Chave:**

*   **Story 2.1: Criação de Tarefa**
    *   Criar componente de formulário para criação de tarefas.
    *   Integrar com `mockApi.ts` para adicionar tarefas.
*   **Story 2.2: Edição de Tarefa**
    *   Criar componente de formulário para edição de tarefas.
    *   Integrar com `mockApi.ts` para atualizar tarefas.
*   **Story 2.3: Exclusão de Tarefa**
    *   Implementar funcionalidade de exclusão de tarefa com confirmação.
    *   Integrar com `mockApi.ts` para remover tarefas.
*   **Story 2.4: Atribuição de Tarefa**
    *   Adicionar campo de seleção de responsável no formulário de tarefa.
*   **Story 2.5: Visualização de Tarefas em Lista**
    *   Desenvolver componente `TaskList.tsx` para exibir tarefas em formato de lista.
    *   Implementar paginação, ordenação e filtragem.
*   **Story 2.6: Visualização de Tarefas em Kanban Simples**
    *   Desenvolver componente `TaskKanban.tsx` utilizando `@dnd-kit` para arrastar e soltar.
    *   Integrar com `mockApi.ts` para atualizar o status da tarefa ao arrastar.

### Épico 3: Gestão de Projetos e Associação de Tarefas

**Objetivo:** Capacitar os usuários a gerenciar projetos de forma eficaz como contêineres abrangentes para tarefas.

**Foco:** Componentes de projetos, associação de tarefas a projetos, painel de resumo.

**Histórias e Tarefas Chave:**

*   **Story 3.1: Criação de Projeto**
    *   Criar componente de formulário para criação de projetos.
    *   Integrar com `mockApi.ts` para adicionar projetos.
*   **Story 3.2: Edição de Projeto**
    *   Criar componente de formulário para edição de projetos.
    *   Integrar com `mockApi.ts` para atualizar projetos.
*   **Story 3.3: Associação de Tarefas a Projetos**
    *   Adicionar campo de seleção de projeto no formulário de tarefa.
*   **Story 3.4: Painel de Resumo do Progresso do Projeto**
    *   Desenvolver componente para exibir o progresso do projeto (ex: `StatsCard.tsx` adaptado).

### Épico 4: Colaboração e Notificações

**Objetivo:** Aprimorar a comunicação da equipe e o rastreamento de atividades.

**Foco:** Comentários, notificações básicas, histórico de alterações.

**Histórias e Tarefas Chave:**

*   **Story 4.1: Adicionar Comentários em Tarefas**
    *   Criar componente de comentários para tarefas.
    *   Integrar com `mockApi.ts` para adicionar e exibir comentários.
*   **Story 4.2: Notificação de Atribuição de Tarefa**
    *   Implementar lógica de notificação no frontend (ex: usando `sonner`).
*   **Story 4.3: Notificação de Comentário em Tarefa**
    *   Implementar lógica de notificação para novos comentários.
*   **Story 4.4: Histórico de Alterações da Tarefa**
    *   Criar componente para exibir o histórico de alterações da tarefa.

### Épico 5: Dashboards e Relatórios Básicos

**Objetivo:** Fornecer aos usuários insights valiosos sobre o status e o desempenho de tarefas e projetos.

**Foco:** Dashboard principal, relatórios básicos, exportação de dados.

**Histórias e Tarefas Chave:**

*   **Story 5.1: Dashboard Principal com Contagem de Tarefas por Status**
    *   Desenvolver o componente `Dashboard.tsx` com gráficos (usando `recharts`) para contagem de tarefas por status.
*   **Story 5.2: Relatórios por Usuário**
    *   Criar interface para geração de relatórios por usuário.
*   **Story 5.3: Relatórios por Projeto**
    *   Criar interface para geração de relatórios por projeto.
*   **Story 5.4: Exportação de Dados (CSV ou PDF)**
    *   Implementar funcionalidade de exportação (considerar bibliotecas como `js-file-download` ou `jspdf`).

### Épico 6: Configurações e Administração de Usuários

**Objetivo:** Fornecer capacidades administrativas para gerenciar usuários e suas permissões.

**Foco:** Gestão de usuários (apenas para administradores), configurações de idioma/tema.

**Histórias e Tarefas Chave:**

*   **Story 6.1: Gestão de Usuários (Administrador)**
    *   Criar interface de administração de usuários (restrita a administradores).
*   **Story 6.2: Definição de Permissões por Papel**
    *   Garantir que a proteção de rotas e componentes respeite os perfis de usuário.
*   **Story 6.3: Configurações de Idioma (Opcional)**
    *   Implementar seletor de idioma e integração com biblioteca i18n.
*   **Story 6.4: Configurações de Tema (Opcional)**
    *   Implementar seletor de tema (claro/escuro) e aplicar estilos via Tailwind CSS.

## 4. Considerações Gerais

*   **Integração com API Real:** Após a implementação inicial com dados mockados, substituir `mockApi.ts` por chamadas a uma API real (ex: `axios`).
*   **Testes:** Escrever testes unitários para componentes críticos e testes de integração para fluxos importantes.
*   **Revisão de Código:** Realizar revisões de código regulares para garantir a qualidade e aderência aos padrões.
*   **Documentação:** Manter a documentação atualizada, incluindo a documentação de componentes e a arquitetura.

Este plano será ajustado conforme o desenvolvimento avança e novas informações surgem.