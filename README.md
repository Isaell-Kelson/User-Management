# Sistema de Gerenciamento de Usuários - Login, Cadastro e Autenticação

Este projeto é uma aplicação full stack desenvolvida utilizando **Nest.js** no backend e **Angular** no frontend. O sistema permite o login e cadastro de usuários, além de fornecer funcionalidades de gerenciamento de contas de usuário com permissões diferenciadas para administradores e usuários comuns. Administradores têm acesso exclusivo a endpoints para atualizar e deletar outros usuários.

[!](https://www.linkedin.com/feed/update/urn:li:activity:7249396388545871872/)

## Funcionalidades

### Frontend (Angular 18)
- **Login e Cadastro**: Formulários responsivos utilizando **Bootstrap**.
- **Autenticação**: Implementada com **OpenID Connect (OIDC)** e **Angular Auth OIDC Client**.
- **Gerenciamento de Usuários**: Usuários administradores podem atualizar, excluir e alterar o status de outros usuários.
- **Estilização Moderna**: Utilizando **Bootstrap** e personalizações de UI/UX.
- **Integração Direta com Backend**: Utiliza **Axios** para chamadas de API, sem armazenamento local de dados.

### Backend (Nest.js)
- **Autenticação JWT**: Proteção de rotas com **JWT** e **Passport**.
- **Permissões de Admin**: Apenas usuários com papel de administrador podem acessar endpoints de exclusão e atualização de contas.
- **Prisma ORM**: Integração com banco de dados utilizando **Prisma**.
- **Validação de Dados**: Validação de dados de entrada utilizando **class-validator** e **DTOs**.
- **CORS**: Configurado para aceitar requisições do frontend.

### Deploy

- **Backend**: O deploy foi realizado no **Digital Ocean**.
- **Frontend**: O deploy foi realizado no **Netlify**.

## Pré-requisitos

- Node.js >= 18
- NPM >= 9
- Angular CLI >= 18.0.7
- Nest CLI >= 10.0.0
- Banco de Dados: SQLite (pode ser facilmente configurado para outro banco de dados usando Prisma)
