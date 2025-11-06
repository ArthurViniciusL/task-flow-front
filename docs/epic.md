# Epics do Projeto TaskFlow

Este documento detalha os épicos do projeto TaskFlow, com base nos Requisitos de Produto (PRD) e na Arquitetura do Projeto. Cada épico agrupa um conjunto de funcionalidades relacionadas, apresentando seu objetivo expandido, contexto arquitetônico, padrões e as histórias de usuário com seus respectivos critérios de aceitação.

---

## Epic 1: Autenticação e Base do Sistema

**Objetivo Expandido:** Este épico visa estabelecer a infraestrutura fundamental para o sistema, criando um mecanismo de autenticação seguro e robusto. Ele permitirá que os usuários se cadastrem, façam login e gerenciem seus perfis, garantindo que todas as funcionalidades subsequentes são construídas sobre uma base sólida e segura. O valor principal entregue é o acesso seguro do usuário e o gerenciamento de identidade.

**Contexto Arquitetônico:**
*   **Backend:** Gerenciamento de Usuários (registro, login, recuperação de senha), Autenticação via JWT (stateless), Autorização (RBAC) com perfis (Administrador, Gerente, Colaborador), Segurança de Senhas (hashing/salting com bcrypt), Integração de Serviço de E-mail.
*   **Frontend:** Formulários de login/registro/recuperação, Manipulação de JWT (armazenamento seguro, anexar a requisições), Proteção de Rotas (renderização condicional baseada em autenticação/perfis).
*   **Banco de Dados:** Tabelas `users` (id, email, password_hash, profile_id) e `profiles` (id, name).

**Padrões:**
*   **Autenticação:** JSON Web Tokens (JWT)
*   **Autorização:** Role-Based Access Control (RBAC)
*   **Segurança:** Hashing e Salting para senhas (ex: bcrypt)

### Story 1.1: Cadastro de Usuário com E-mail e Senha

Como um **novo usuário**, eu quero **me cadastrar no sistema usando e-mail e senha**, para que eu possa **acessar as funcionalidades da aplicação**.

**Critérios de Aceitação:**
1.  O usuário deve ser capaz de fornecer um e-mail válido e uma senha segura.
2.  O sistema deve validar o formato do e-mail e a complexidade da senha.
3.  Após o cadastro, o usuário deve receber uma confirmação de sucesso.
4.  O sistema deve armazenar as credenciais do usuário de forma segura.
5.  O usuário deve ser redirecionado para a tela de login após o cadastro.

### Story 1.2: Login de Usuário com E-mail e Senha

Como um **usuário existente**, eu quero **fazer login no sistema usando meu e-mail e senha**, para que eu possa **acessar minhas tarefas e projetos**.

**Critérios de Aceitação:**
1.  O usuário deve ser capaz de inserir seu e-mail e senha.
2.  O sistema deve autenticar o usuário com as credenciais fornecidas.
3.  Em caso de sucesso, o sistema deve gerar e retornar um JWT válido.
4.  Em caso de falha (credenciais inválidas), o sistema deve exibir uma mensagem de erro apropriada.
5.  Após o login bem-sucedido, o usuário deve ser redirecionado para o dashboard principal.

### Story 1.3: Recuperação de Senha via E-mail

Como um **usuário**, eu quero **recuperar minha senha caso a esqueça**, para que eu possa **restaurar o acesso à minha conta**.

**Critérios de Aceitação:**
1.  O usuário deve ser capaz de solicitar a recuperação de senha informando seu e-mail.
2.  O sistema deve enviar um e-mail com um link ou código seguro para redefinição de senha.
3.  O link/código deve ter um tempo de expiração.
4.  O usuário deve ser capaz de definir uma nova senha através do link/código.
5.  Após a redefinição, o usuário deve ser notificado do sucesso e poder fazer login com a nova senha.

### Story 1.4: Gestão de Perfis de Usuário (Atribuição Inicial)

Como um **administrador**, eu quero **atribuir um perfil (administrador, gerente, colaborador) a um novo usuário durante o cadastro ou após o login inicial**, para que eu possa **controlar suas permissões no sistema**.

**Critérios de Aceitação:**
1.  O administrador deve ter uma interface para visualizar e editar o perfil de um usuário.
2.  O sistema deve permitir a seleção de um dos perfis predefinidos (administrador, gerente, colaborador).
3.  A alteração do perfil deve ser registrada.
4.  As permissões do usuário devem ser atualizadas imediatamente após a mudança de perfil.

---

## Epic 2: Gestão Essencial de Tarefas

**Objetivo Expandido:** Este épico foca na implementação das funcionalidades centrais para o gerenciamento de tarefas, permitindo que os usuários criem, organizem e acompanhem seu trabalho de forma eficaz. Ele fornecerá ferramentas essenciais para definir tarefas, atribuir responsabilidades e visualizar o progresso, formando a espinha dorsal dos recursos de produtividade do sistema.

**Contexto Arquitetônico:**
*   **Backend:** API RESTful para operações CRUD em tarefas (`/tasks`, `/tasks/{id}`), Filtragem/Busca (status, responsável, prioridade, busca textual), Lógica de transições de status.
*   **Frontend:** Formulários de criação/edição de tarefas, Visualização em Lista (paginada, ordenável), Visualização Kanban (colunas por status, drag-and-drop, chamadas à API para atualização de status), Considerar WebSockets para atualizações em tempo real ou polling eficiente.
*   **Banco de Dados:** Tabela `tasks` (id, title, description, assigned_to_user_id, status, priority, due_date, project_id).

**Padrões:**
*   **API:** RESTful
*   **Interação:** Drag-and-drop (Kanban)
*   **Comunicação (Opcional):** WebSockets para tempo real

### Story 2.1: Criação de Tarefa

Como um **usuário**, eu quero **criar uma nova tarefa**, para que eu possa **registrar um item de trabalho a ser realizado**.

**Critérios de Aceitação:**
1.  O usuário deve ter uma interface para inserir o título, descrição, responsável, status inicial, prioridade e data de entrega da tarefa.
2.  O sistema deve validar os campos obrigatórios (título, responsável, status).
3.  A tarefa deve ser criada e associada ao usuário criador.
4.  A tarefa deve aparecer na visualização de lista e Kanban.

### Story 2.2: Edição de Tarefa

Como um **usuário**, eu quero **editar os detalhes de uma tarefa existente**, para que eu possa **atualizar suas informações conforme o progresso ou mudanças**.

**Critérios de Aceitação:**
1.  O usuário deve ter uma interface para modificar o título, descrição, responsável, status, prioridade e data de entrega de uma tarefa.
2.  O sistema deve validar as alterações e salvar a tarefa.
3.  As alterações devem ser refletidas nas visualizações de lista e Kanban.
4.  A edição deve ser registrada no histórico de alterações da tarefa.

### Story 2.3: Exclusão de Tarefa

Como um **usuário**, eu quero **excluir uma tarefa**, para que eu possa **remover itens de trabalho que não são mais relevantes**.

**Critérios de Aceitação:**
1.  O usuário deve ter uma opção para excluir uma tarefa.
2.  O sistema deve solicitar confirmação antes da exclusão.
3.  Após a confirmação, a tarefa deve ser removida permanentemente do sistema.
4.  A exclusão deve ser registrada no histórico de alterações do projeto (se aplicável).

### Story 2.4: Atribuição de Tarefa

Como um **gerente**, eu quero **atribuir uma tarefa a um colaborador**, para que eu possa **delegar responsabilidades e organizar o trabalho da equipe**.

**Critérios de Aceitação:**
1.  O gerente deve ser capaz de selecionar um colaborador da equipe para atribuir a tarefa.
2.  O sistema deve atualizar o campo "responsável" da tarefa.
3.  O colaborador atribuído deve receber uma notificação sobre a nova tarefa.
4.  A atribuição deve ser registrada no histórico de alterações da tarefa.

### Story 2.5: Visualização de Tarefas em Lista

Como um **usuário**, eu quero **visualizar minhas tarefas em formato de lista**, para que eu possa **ter uma visão geral rápida e organizada dos meus itens de trabalho**.

**Critérios de Aceitação:**
1.  O sistema deve exibir as tarefas em uma lista paginada.
2.  A lista deve mostrar os campos principais da tarefa (título, responsável, status, prioridade, data de entrega).
3.  O usuário deve poder ordenar a lista por diferentes critérios (ex: data de entrega, prioridade).

### Story 2.6: Visualização de Tarefas em Kanban Simples

Como um **usuário**, eu quero **visualizar minhas tarefas em um quadro Kanban simples**, para que eu possa **acompanhar visualmente o progresso das tarefas e arrastá-las entre os status**.

**Critérios de Aceitação:**
1.  O sistema deve exibir as tarefas em colunas que representam os diferentes status (ex: A Fazer, Em Progresso, Concluído).
2.  O usuário deve ser capaz de arrastar e soltar tarefas entre as colunas para mudar seu status.
3.  A mudança de status via arrastar e soltar deve ser persistida.

---

## Epic 3: Gestão de Projetos e Associação de Tarefas

**Objetivo Expandido:** Este épico foca em capacitar os usuários a gerenciar projetos de forma eficaz como contêineres abrangentes para tarefas. Ele fornecerá funcionalidades para criar, definir e organizar projetos, associar tarefas a eles e oferecer uma visão geral de alto nível do progresso do projeto, facilitando uma melhor organização e acompanhamento de iniciativas maiores.

**Contexto Arquitetônico:**
*   **Backend:** API RESTful para operações CRUD em projetos (`/projects`, `/projects/{id}`), Associação de Tarefas, Cálculo de Progresso (percentual de tarefas concluídas).
*   **Frontend:** Formulários de criação/edição de projetos, Visualizações de Lista/Detalhes (informações do projeto, tarefas associadas, resumo do progresso).
*   **Banco de Dados:** Tabela `projects` (id, name, description, created_by_user_id), Tabela de junção `project_members` (project_id, user_id).

**Padrões:**
*   **API:** RESTful
*   **Cálculo:** Percentual de conclusão

### Story 3.1: Criação de Projeto

Como um **gerente**, eu quero **criar um novo projeto**, para que eu possa **organizar um conjunto de tarefas relacionadas sob uma única iniciativa**.

**Critérios de Aceitação:**
1.  O gerente deve ter uma interface para inserir o nome, descrição e selecionar a equipe envolvida no projeto.
2.  O sistema deve validar os campos obrigatórios (nome).
3.  O projeto deve ser criado e associado ao gerente criador.
4.  O projeto deve aparecer na lista de projetos.

### Story 3.2: Edição de Projeto

Como um **gerente**, eu quero **editar os detalhes de um projeto existente**, para que eu possa **atualizar suas informações conforme o andamento ou mudanças na iniciativa**.

**Critérios de Aceitação:**
1.  O gerente deve ter uma interface para modificar o nome, descrição e a equipe envolvida de um projeto.
2.  O sistema deve validar as alterações e salvar o projeto.
3.  As alterações devem ser refletidas na lista de projetos e nos detalhes do projeto.

### Story 3.3: Associação de Tarefas a Projetos

Como um **gerente**, eu quero **associar tarefas existentes ou novas a um projeto**, para que eu possa **agrupar o trabalho e manter a organização do projeto**.

**Critérios de Aceitação:**
1.  Ao criar uma tarefa, o gerente deve poder selecionar um projeto existente para associá-la.
2.  Ao editar uma tarefa, o gerente deve poder alterar o projeto associado.
3.  O sistema deve exibir as tarefas associadas nos detalhes do projeto.

### Story 3.4: Painel de Resumo do Progresso do Projeto

Como um **gerente**, eu quero **visualizar um painel de resumo do progresso de cada projeto**, para que eu possa **acompanhar rapidamente o status geral e o percentual de conclusão**.

**Critérios de Aceitação:**
1.  O sistema deve calcular o percentual de tarefas concluídas em relação ao total de tarefas do projeto.
2.  O painel deve exibir o nome do projeto, sua descrição e o percentual de conclusão.
3.  O percentual deve ser atualizado dinamicamente conforme o status das tarefas é alterado.

---

## Epic 4: Colaboração e Notificações

**Objetivo Expandido:** Este épico visa aprimorar a comunicação da equipe e o rastreamento de atividades dentro do sistema. Ele introduzirá recursos que facilitam a interação direta nas tarefas, fornecem atualizações oportunas aos usuários sobre eventos relevantes e mantêm um registro transparente de todas as alterações, promovendo um ambiente de trabalho mais colaborativo e informado.

**Contexto Arquitetônico:**
*   **Backend:** API de Comentários (adicionar/recuperar comentários), Serviço de Notificação (gerar/enviar notificações via e-mail/no aplicativo, possível fila de mensagens como RabbitMQ), Serviço de Log de Atividades (registrar alterações significativas).
*   **Frontend:** Seção de Comentários (dentro dos detalhes da tarefa), Central de Notificações, Exibição de Log de Atividades (histórico de alterações).
*   **Banco de Dados:** Tabelas `comments` (id, task_id, user_id, content, timestamp), `notifications` (id, user_id, type, message, read_status, target_url, timestamp) e `activity_logs` (id, entity_type, entity_id, user_id, action, old_value, new_value, timestamp).

**Padrões:**
*   **API:** RESTful (Comentários)
*   **Comunicação:** Notificações (e-mail, in-app), Fila de Mensagens (opcional para notificações assíncronas)
*   **Auditoria:** Log de Atividades

### Story 4.1: Adicionar Comentários em Tarefas

Como um **usuário**, eu quero **adicionar comentários em uma tarefa**, para que eu possa **comunicar informações adicionais, fazer perguntas ou registrar decisões relacionadas à tarefa**.

**Critérios de Aceitação:**
1.  O usuário deve ter uma área de texto para inserir comentários em cada tarefa.
2.  Cada comentário deve exibir o autor e a data/hora da postagem.
3.  Os comentários devem ser visíveis para todos os usuários com acesso à tarefa.
4.  O sistema deve permitir a visualização de todos os comentários de uma tarefa em ordem cronológica.

### Story 4.2: Notificação de Atribuição de Tarefa

Como um **colaborador**, eu quero **receber uma notificação quando uma tarefa for atribuída a mim**, para que eu possa **estar ciente das minhas novas responsabilidades**.

**Critérios de Aceitação:**
1.  Quando uma tarefa é atribuída a um usuário, o sistema deve gerar uma notificação.
2.  A notificação deve ser exibida na interface do usuário (ex: sino de notificações) e/ou enviada por e-mail.
3.  A notificação deve conter o título da tarefa e quem a atribuiu.
4.  O usuário deve poder clicar na notificação para ir diretamente para a tarefa.

### Story 4.3: Notificação de Comentário em Tarefa

Como um **usuário**, eu quero **receber uma notificação quando um novo comentário for adicionado em uma tarefa que eu sigo ou sou responsável**, para que eu possa **acompanhar as discussões e atualizações importantes**.

**Critérios de Aceitação:**
1.  Quando um comentário é adicionado a uma tarefa, o sistema deve notificar o responsável pela tarefa e/ou usuários que participaram da discussão.
2.  A notificação deve ser exibida na interface do usuário e/ou enviada por e-mail.
3.  A notificação deve conter o título da tarefa e parte do comentário.
4.  O usuário deve poder clicar na notificação para ir diretamente para a tarefa e o novo comentário.

### Story 4.4: Histórico de Alterações da Tarefa

Como um **usuário**, eu quero **visualizar um histórico de todas as alterações feitas em uma tarefa**, para que eu possa **entender a evolução da tarefa e quem fez quais modificações**.

**Critérios de Aceitação:**
1.  O sistema deve registrar automaticamente as alterações em campos chave da tarefa (ex: status, responsável, prioridade, data de entrega, descrição).
2.  Cada entrada no histórico deve incluir o tipo de alteração, o valor antigo, o novo valor, o autor da mudança e a data/hora.
3.  O histórico deve ser acessível a partir da tela de detalhes da tarefa.
4.  O histórico deve ser apresentado em ordem cronológica inversa.

---

## Epic 5: Dashboards e Relatórios Básicos

**Objetivo Expandido:** Este épico visa fornecer aos usuários insights valiosos sobre o status e o desempenho de tarefas e projetos. Ele centralizará as principais métricas por meio de um painel principal e permitirá a geração de relatórios básicos, permitindo um melhor monitoramento, tomada de decisão e responsabilidade dentro do sistema.

**Contexto Arquitetônico:**
*   **Backend:** Endpoints de Agregação (dados agregados para dashboards), Serviço de Relatórios (gerar relatórios por usuário/projeto), Serviço de Exportação (CSV, PDF).
*   **Frontend:** Componentes de Dashboard (contagens de tarefas, progresso do projeto), UI de Geração de Relatórios (seleção de parâmetros, acionar geração/download).
*   **Banco de Dados:** Consultas complexas unindo `tasks`, `projects` e `users`.

**Padrões:**
*   **API:** Endpoints de Agregação
*   **Relatórios:** Geração e Exportação (CSV, PDF)

### Story 5.1: Dashboard Principal com Contagem de Tarefas por Status

Como um **usuário**, eu quero **visualizar um dashboard principal que exiba a contagem de tarefas por status (A Fazer / Em Progresso / Concluído)**, para que eu possa **ter uma visão geral rápida do meu workload e do progresso da equipe**.

**Critérios de Aceitação:**
1.  O dashboard deve exibir claramente o número total de tarefas em cada status.
2.  Os dados devem ser atualizados em tempo real ou com um pequeno atraso.
3.  O usuário deve poder filtrar os dados do dashboard por projeto ou por responsável (opcional).

### Story 5.2: Relatórios por Usuário

Como um **gerente**, eu quero **gerar relatórios de desempenho por usuário**, para que eu possa **avaliar a carga de trabalho e a produtividade individual da minha equipe**.

**Critérios de Aceitação:**
1.  O sistema deve permitir selecionar um usuário para gerar o relatório.
2.  O relatório deve incluir informações como tarefas atribuídas, tarefas concluídas, tarefas em andamento e prazos.
3.  O relatório deve ser visualizável na tela e/ou exportável.

### Story 5.3: Relatórios por Projeto

Como um **gerente**, eu quero **gerar relatórios de progresso por projeto**, para que eu possa **acompanhar o status geral e identificar possíveis gargalos em minhas iniciativas**.

**Critérios de Aceitação:**
1.  O sistema deve permitir selecionar um projeto para gerar o relatório.
2.  O relatório deve incluir informações como número total de tarefas, tarefas por status, percentual de conclusão e histórico de progresso.
3.  O relatório deve ser visualizável na tela e/ou exportável.

### Story 5.4: Exportação de Dados (CSV ou PDF)

Como um **usuário**, eu quero **exportar dados de relatórios em formatos CSV ou PDF**, para que eu possa **compartilhar informações com stakeholders externos ou realizar análises adicionais**.

**Critérios de Aceitação:**
1.  O sistema deve oferecer opções de exportação para CSV e PDF nos relatórios.
2.  A exportação para CSV deve incluir todos os dados tabulares do relatório.
3.  A exportação para PDF deve formatar o relatório de forma legível para impressão e compartilhamento.

---

## Epic 6: Configurações e Administração de Usuários

**Objetivo Expandido:** Este épico foca em fornecer capacidades administrativas para gerenciar usuários e suas permissões, garantindo a integridade do sistema e o acesso controlado. Ele também incluirá opções básicas de configuração, permitindo a personalização e manutenção dos parâmetros operacionais da aplicação.

**Contexto Arquitetônico:**
*   **Backend:** API de Administração (restrita a Administrador para gerenciar usuários), Aplicação de Permissões (verificações RBAC rigorosas).
*   **Frontend:** Painel de Administração (UI dedicada para gerenciar usuários), Configurações do Usuário (UI para preferências de idioma/tema).
*   **Banco de Dados:** Tabela `users` (campos como `is_active`, `language_preference`, `theme_preference`).

**Padrões:**
*   **API:** RESTful (Administração)
*   **Autorização:** Role-Based Access Control (RBAC)
*   **Configuração:** Persistência de preferências de usuário

### Story 6.1: Gestão de Usuários (Administrador)

Como um **administrador**, eu quero **gerenciar os usuários do sistema (criar, editar, desativar)**, para que eu possa **controlar quem tem acesso e quais são suas permissões**.

**Critérios de Aceitação:**
1.  O administrador deve ter uma interface para visualizar uma lista de todos os usuários.
2.  O administrador deve ser capaz de criar novos usuários, definindo seu e-mail e perfil inicial.
3.  O administrador deve ser capaz de editar os dados de um usuário existente, incluindo seu perfil.
4.  O administrador deve ser capaz de desativar/ativar contas de usuário.
5.  As ações do administrador devem ser registradas para auditoria.

### Story 6.2: Definição de Permissões por Papel

Como um **administrador**, eu quero **que as permissões de acesso às funcionalidades sejam definidas automaticamente com base no perfil do usuário**, para que eu possa **garantir que cada usuário tenha acesso apenas ao que é necessário para sua função**.

**Critérios de Aceitação:**
1.  O sistema deve aplicar as permissões predefinidas para cada perfil (administrador, gerente, colaborador).
2.  Um colaborador não deve ter acesso a funcionalidades de gestão de projetos ou usuários.
3.  Um gerente deve ter acesso a funcionalidades de gestão de projetos e tarefas, mas não de usuários.
4.  Um administrador deve ter acesso a todas as funcionalidades.
5.  As tentativas de acesso a funcionalidades não permitidas devem ser bloqueadas e registradas.

### Story 6.3: Configurações de Idioma (Opcional)

Como um **usuário**, eu quero **selecionar o idioma de exibição da interface**, para que eu possa **utilizar o sistema no meu idioma preferencial**.

**Critérios de Aceitação:**
1.  O sistema deve oferecer uma opção de seleção de idioma nas configurações do usuário.
2.  Ao selecionar um idioma, a interface deve ser atualizada para o idioma escolhido.
3.  A preferência de idioma deve ser persistida para futuras sessões.

### Story 6.4: Configurações de Tema (Opcional)

Como um **usuário**, eu quero **selecionar o tema visual da interface (claro/escuro)**, para que eu possa **personalizar a aparência do sistema de acordo com minha preferência**.

**Critérios de Aceitação:**
1.  O sistema deve oferecer uma opção de seleção de tema (claro/escuro) nas configurações do usuário.
2.  Ao selecionar um tema, a interface deve ser atualizada para o tema escolhido.
3.  A preferência de tema deve ser persistida para futuras sessões.
