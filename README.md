# Squad Builder — Web

Versão web do **Squad Builder**, um app de montar times de futebol. Este repositório é o
cliente web, e consome a **mesma API** que já serve o app mobile em React Native.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-8-CA4245?logo=reactrouter&logoColor=white)
![CI](https://github.com/lleonardooalves/squad-builder-web/actions/workflows/ci.yml/badge.svg)

**No ar:** https://squad-builder-web.vercel.app

> A API roda no plano gratuito do Render, que hiberna após 15 minutos de inatividade.
> A primeira visita depois de um tempo parado pode levar cerca de um minuto. A própria tela
> avisa quando a espera passa do normal, em vez de deixar o usuário olhando uma página vazia.

## Sobre o projeto

O Squad Builder começou como um app mobile em React Native, depois ganhou um backend próprio
para tirar os dados do dispositivo. Esta versão web nasceu por dois motivos: estudar React no
navegador depois de vir do React Native, e ter uma ponta do projeto que qualquer pessoa abre
clicando num link, sem instalar nada.

Como a API já existia e estava publicada, o trabalho aqui é de cliente. E foi justamente isso
que revelou as diferenças entre as duas plataformas, registradas na seção de decisões.

## Stack

- **[React 19](https://react.dev/)** com **[TypeScript](https://www.typescriptlang.org/)**
- **[Vite](https://vite.dev/)**, build e servidor de desenvolvimento
- **[React Router](https://reactrouter.com/)**, rotas no formato de objeto com rota de layout
- **CSS Modules**, com a paleta em variáveis CSS
- **[Vercel](https://vercel.com/)**, hospedagem

## Funcionalidades

- **Catálogo de jogadores** em grade responsiva, com selo de rating por faixa (ouro, prata,
  bronze) e etiqueta colorida por posição.
- **Tela de detalhe com endereço próprio** (`/player/:id`), então dá para recarregar a página,
  compartilhar o link e usar o botão de voltar do navegador.
- **Atributos por posição**: goleiro e jogador de linha têm conjuntos diferentes, e o
  modificador de forma aparece ao lado de cada valor quando o jogador está fora da forma normal.
- **Estado de carregamento** com aviso de espera longa, pensado para o tempo que a API leva
  para acordar.
- **Estado de erro** com ação de tentar de novo, sem recarregar a página.
- **Página para endereço inexistente**, dentro do mesmo layout.

## Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) 24 (a versão está fixada no `.nvmrc`)

### Passos

```bash
# 1. Instalar dependências
npm install

# 2. Criar o .env a partir do exemplo
cp .env.example .env

# 3. Rodar em modo desenvolvimento
npm run dev
```

A aplicação sobe em `http://localhost:5173` e abre no navegador padrão.

Por padrão o `.env.example` aponta para a API em produção, então não é preciso subir o backend
para ver a aplicação funcionando. Para desenvolver contra a API local, troque a variável para
`http://localhost:3000` e siga as instruções do
[repositório do backend](https://github.com/lleonardooalves/squad-builder-backend).

### Variáveis de ambiente

| Variável       | Descrição                                     |
| -------------- | --------------------------------------------- |
| `VITE_API_URL` | Endereço base da API consumida pela aplicação |

Só variáveis com o prefixo `VITE_` chegam ao código do navegador, e o valor delas é substituído
durante o build, ficando visível no arquivo publicado. Serve para endereço, nunca para segredo.

## Scripts

| Script                 | O que faz                              |
| ---------------------- | -------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento            |
| `npm run build`        | Checagem de tipos e build de produção  |
| `npm run preview`      | Serve localmente o resultado do build  |
| `npm run lint`         | ESLint                                 |
| `npm run format`       | Formata os arquivos com Prettier       |
| `npm run format:check` | Verifica a formatação sem alterar nada |

## Estrutura de pastas

```
squad-builder-web/
├── src/
│   ├── main.tsx            # ponto de entrada, monta o roteador
│   ├── App.tsx             # layout: cabeçalho fixo + <Outlet />
│   ├── routes/             # definição das rotas
│   ├── pages/              # uma pasta por tela, com seu módulo de estilo
│   ├── components/         # componentes reutilizáveis, cada um com seu CSS
│   ├── hooks/              # busca de dados por tela
│   ├── services/           # chamadas à API
│   ├── config/             # endereço da API
│   ├── types/              # tipos do domínio, espelhados do app mobile
│   ├── utils/              # regras puras (faixa de rating, forma do jogador)
│   └── index.css           # paleta e escalas em variáveis CSS
├── vercel.json             # rewrite para o index.html
└── .env.example            # modelo das variáveis de ambiente
```

## Decisões

- **CSS Modules em vez de uma biblioteca de utilitários.** O objetivo era aprender CSS de
  verdade, vindo do React Native, onde não existem cascata, seletor nem media query. O estilo
  fica preso ao componente, que é o mesmo modelo mental do `StyleSheet` do mobile.
- **A paleta é a mesma do app**, transportada para variáveis CSS, para as duas pontas se
  reconhecerem como o mesmo produto.
- **Sem gerenciador de estado global até aqui.** A lista de jogadores é dado de uma tela só, e
  vive no hook dela. O zustand entra quando houver sessão, favoritos e time, que são
  compartilhados entre telas, como já acontece no app mobile.
- **Rotas no formato de objeto, sem `loaders`.** A busca de dados continua nos hooks, para não
  ter duas ferramentas disputando o mesmo papel quando o estado global chegar.
- **`vercel.json` com rewrite para o `index.html`.** A aplicação tem um único arquivo HTML e as
  rotas existem só no JavaScript. Sem o rewrite, abrir `/player/1` direto na barra de endereço
  devolveria 404: navegar clicando funcionaria e link direto quebraria.
- **A API precisou liberar CORS para este domínio.** O app mobile nunca esbarrou nisso, porque
  a regra é do navegador e não da API. Vale lembrar que CORS não protege dado nenhum: ele diz
  ao navegador quais páginas podem ler a resposta. A proteção continua sendo o token.

## Deploy

Publicado na [Vercel](https://vercel.com/), com deploy automático a cada push na `main`.

A variável `VITE_API_URL` fica no painel da Vercel. Como o valor é aplicado durante o build,
alterá-la exige um novo deploy para ter efeito.

Do lado da API, o domínio precisa estar na variável `CORS_ORIGINS` do Render, sem barra no
final, porque a comparação com o cabeçalho `Origin` é de texto exato.

## Roadmap

- [x] Consumo da API e catálogo de jogadores
- [x] CI com formatação, lint e build
- [x] Estados de carregamento e de erro
- [x] Rotas e tela de detalhe do jogador
- [x] Deploy
- [ ] Busca e filtro por posição
- [ ] Autenticação
- [ ] Favoritos e time, com as regras de formação
- [ ] Fotos reais de todo o catálogo

## Projetos relacionados

- [squad-builder-backend](https://github.com/lleonardooalves/squad-builder-backend), a API em
  NestJS, Prisma e PostgreSQL
- [squad-builder](https://github.com/lleonardooalves/squad-builder), o app mobile em React
  Native com Expo
