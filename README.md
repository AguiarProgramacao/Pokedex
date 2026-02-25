# Pokedex Interativa (React + TypeScript)

Aplicacao web de Pokedex construida com `React + TypeScript`, consumindo a `PokeAPI`, com foco em UX, organizacao de codigo e interface responsiva.

O projeto permite:
- listar os 151 Pokemons iniciais
- buscar por nome
- filtrar por tipo
- ver detalhes completos
- favoritar e montar um time com ate 6 Pokemons
- alternar entre tema claro/escuro

## Preview

Funcionalidades visuais implementadas:
- Home responsiva com grid de Pokemons
- Filtro por tipo com chips
- Tela de detalhes com tema dinamico por tipo
- "Meu Time Pokemon" em formato de acordeao
- Favoritos sincronizados entre Home e Detalhes
- Dark / Light mode
- Animacao de entrada dos cards

Se quiser adicionar imagens no README:

```md
![Home](docs/preview/home.png)
![Detalhes](docs/preview/details.png)
```

## Funcionalidades

- Listagem dos 151 Pokemons iniciais
- Busca por nome (client-side)
- Filtro por tipo
- Cards com imagem, nome e tipos
- Tela de detalhes (`/pokemon/:name`) com:
- numero (#id)
- nome
- imagem
- tipos
- altura e peso
- habilidades
- estatisticas base
- Favoritar / desfavoritar Pokemons
- Time Pokemon com limite de 6 membros
- Reordenacao do time (esquerda/direita)
- Resumo medio do time (HP, ATQ, DEF, VEL)
- Persistencia local com `localStorage` (tema e time)
- Loading states e tratamento basico de erros
- Layout responsivo (mobile + desktop)

## Stack

- `React 19`
- `TypeScript`
- `Vite` (`rolldown-vite`)
- `React Router DOM`
- `Axios`
- `Tailwind CSS v4`
- `lucide-react`
- `ESLint`

## Estrutura do projeto

```txt
Pokedex/
├─ public/
│  ├─ favicon.ico
│  └─ vite.svg
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ PokemonCard.tsx
│  │  └─ PokemonTeamAccordion.tsx
│  ├─ contexts/
│  │  ├─ PokemonTeamContext.tsx
│  │  └─ ThemeContext.tsx
│  ├─ pages/
│  │  ├─ HomePage.tsx
│  │  └─ PokemonDetailsPage.tsx
│  ├─ services/
│  │  └─ pokeApi.ts
│  ├─ types/
│  │  └─ pokemon.ts
│  ├─ utils/
│  │  └─ pokemonTheme.ts
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ index.html
├─ package.json
├─ vite.config.ts
└─ eslint.config.js
```

## Como rodar localmente

### Pre-requisitos

- `Node.js` 18+ (recomendado 20+)
- `npm` 9+

Verifique:

```bash
node -v
npm -v
```

### Instalacao

```bash
git clone <URL_DO_REPOSITORIO>
cd Pokedex
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abra em `http://localhost:5173`.

## Scripts

- `npm run dev`: inicia ambiente local com HMR
- `npm run build`: gera build de producao
- `npm run preview`: sobe preview da build
- `npm run lint`: executa lint

## Build de producao

```bash
npm run build
```

Arquivos gerados em `dist/`.

## Variaveis de ambiente

Nenhuma variavel de ambiente e obrigatoria atualmente.

A aplicacao consome a `PokeAPI` diretamente (`src/services/pokeApi.ts`).

Exemplo futuro (opcional):

```env
VITE_POKEAPI_BASE_URL=https://pokeapi.co/api/v2
```

## Deploy

Aplicacao estatica, compativel com:
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages (com fallback SPA)

Configuracao padrao:
- Build command: `npm run build`
- Output directory: `dist`

Se usar rotas SPA em producao, garanta fallback para `index.html`.

## Detalhes tecnicos

- A listagem inicial da PokeAPI nao traz todos os dados de exibicao.
- O projeto extrai o `id` a partir da URL retornada.
- A Home renderiza a lista base primeiro e enriquece os tipos depois (melhora perceptivel de carregamento/LCP).
- A Home usa sprites mais leves; a tela de detalhes usa artwork maior.

## Roadmap

- [ ] Cache de requisicoes (React Query / SWR)
- [ ] Drag-and-drop para reordenar time
- [ ] Comparador de Pokemons
- [ ] Testes unitarios (Vitest + Testing Library)
- [ ] Testes E2E (Playwright)
- [ ] Paginacao / lazy loading alem dos 151
- [ ] Melhor tratamento de erros por endpoint
- [ ] i18n
- [ ] Melhorias de acessibilidade
- [ ] CI/CD

## Boas praticas adotadas

- Componentizacao com separacao de responsabilidades
- Tipagem explicita com TypeScript
- Context API para estado global (tema e time)
- Servico de API centralizado (`axios`)
- Utilitarios desacoplados da UI
- Persistencia local com `localStorage`
- Responsividade mobile-first
- Animacoes com fallback para `prefers-reduced-motion`

## Licenca

Este projeto nao possui licenca definida no momento.

Recomendado para repositorio publico: adicionar `MIT`.

## Autor

Substitua pelos seus dados antes de publicar:

- Nome: `Seu Nome`
- GitHub: `https://github.com/seu-usuario`
- LinkedIn: `https://www.linkedin.com/in/seu-perfil/`
