# Pokédex Interativa (React + TypeScript)

Uma aplicação web de Pokédex construída com **React + TypeScript**, consumindo a **PokeAPI**, com foco em experiência de uso, organização de código e interface moderna.

A aplicação permite listar os 151 Pokémons iniciais, buscar por nome, filtrar por tipo, visualizar detalhes completos, favoritar e montar um **time Pokémon** com até 6 membros, além de recursos como **dark/light mode** e **reordenação do time**.

---

## 📸 Demonstração / Preview

### Funcionalidades visuais implementadas
- Home responsiva com grid de Pokémons
- Filtro por tipo com chips coloridos
- Tela de detalhes com cor dinâmica por tipo e gradiente
- Meu Time Pokémon com efeito sanfona
- Favoritos compartilhados entre Home e Detalhes
- Dark / Light mode
- Animação de entrada dos cards

> Sugestão: adicione aqui prints ou GIFs em `docs/preview/` para portfólio.

Exemplo:
```md
![Home](docs/preview/home.png)
![Detalhes](docs/preview/details.png)
```

---

## ✨ Funcionalidades principais

- Listagem dos **151 Pokémons iniciais**
- Busca por nome (client-side)
- Filtro por tipo com chips visuais
- Cards clicáveis com:
  - imagem oficial
  - nome
  - tipos
- Tela de detalhes (`/pokemon/:name`) com:
  - número (#id)
  - nome
  - imagem oficial
  - tipos
  - altura
  - peso
  - habilidades
  - estatísticas base
- Favoritar / desfavoritar Pokémons
- **Meu Time Pokémon** (máx. 6)
- Acordeão do time com:
  - remoção rápida
  - reordenação (esquerda/direita)
  - resumo com mini stats médios (HP, ATQ, DEF, VEL)
- Persistência local via `localStorage`:
  - time Pokémon
  - tema (dark/light)
- Loading states e tratamento básico de erro
- Layout responsivo (desktop + mobile)

---

## 🧰 Tecnologias utilizadas

- **React 19**
  - Biblioteca principal para construção da interface e composição de componentes.

- **TypeScript**
  - Tipagem estática para maior segurança, manutenção e legibilidade do código.

- **Vite (Rolldown Vite)**
  - Ferramenta de build e desenvolvimento com HMR rápido.

- **React Router DOM**
  - Gerenciamento de rotas (`/` e `/pokemon/:name`).

- **Axios**
  - Cliente HTTP para consumo da PokeAPI.

- **Tailwind CSS (v4)**
  - Estilização utilitária com foco em produtividade e consistência visual.

- **Lucide React**
  - Biblioteca de ícones SVG para UI moderna e consistente.

- **ESLint**
  - Padronização e análise estática do código.

---

## 🏗️ Arquitetura do projeto

Estrutura principal do app (pasta `ProductShowcase/`):

```bash
ProductShowcase/
├─ public/
│  ├─ favicon.ico
│  └─ vite.svg
├─ src/
│  ├─ assets/                # Imagens e assets estáticos (ex.: pokebola)
│  ├─ components/            # Componentes reutilizáveis de UI
│  │  ├─ PokemonCard.tsx
│  │  └─ PokemonTeamAccordion.tsx
│  ├─ contexts/              # Estado global (tema e time Pokémon)
│  │  ├─ PokemonTeamContext.tsx
│  │  └─ ThemeContext.tsx
│  ├─ pages/                 # Páginas/rotas da aplicação
│  │  ├─ HomePage.tsx
│  │  └─ PokemonDetailsPage.tsx
│  ├─ services/              # Integração com APIs externas
│  │  └─ pokeApi.ts
│  ├─ types/                 # Tipagens TypeScript (API e domínio)
│  │  └─ pokemon.ts
│  ├─ utils/                 # Helpers de apresentação (tema por tipo, formatadores)
│  │  └─ pokemonTheme.ts
│  ├─ App.tsx                # Configuração de rotas
│  ├─ main.tsx               # Bootstrap da aplicação + providers globais
│  └─ index.css              # Tailwind + estilos globais + animações
├─ index.html
├─ package.json
├─ tsconfig*.json
├─ vite.config.ts
└─ eslint.config.js
```

### Organização adotada
- **Pages** para separar responsabilidades de rota
- **Components** para UI reutilizável
- **Services** para centralizar chamadas HTTP
- **Contexts** para estado compartilhado (tema e time)
- **Types** para modelagem da API e domínio
- **Utils** para regras de apresentação (cores por tipo, labels, formatadores)

---

## ▶️ Como rodar o projeto localmente

### Pré-requisitos

- **Node.js** `18+` (recomendado `20+`)
- **npm** `9+`

Verifique:
```bash
node -v
npm -v
```

### Instalação

1. Clone o repositório:
```bash
git clone <URL_DO_REPOSITORIO>
```

2. Acesse a pasta do projeto:
```bash
cd product-showcase/ProductShowcase
```

3. Instale as dependências:
```bash
npm install
```

---

## 🔐 Variáveis de ambiente

Atualmente, **nenhuma variável de ambiente é obrigatória** para rodar o projeto.

A aplicação consome a **PokeAPI** diretamente.

### `.env.example` (opcional / futuro)
Se quiser preparar o projeto para customização da URL base da API, você pode criar:

```env
# .env.example
VITE_POKEAPI_BASE_URL=https://pokeapi.co/api/v2
```

> Observação: no estado atual, a URL base está definida no serviço `src/services/pokeApi.ts`.

---

## 💻 Comandos para rodar

### Ambiente de desenvolvimento
```bash
npm run dev
```

Depois acesse:
```txt
http://localhost:5173
```

### Preview local da build
```bash
npm run preview
```

---

## 📜 Scripts disponíveis

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

### Resumo
- `npm run dev` → inicia servidor local com HMR
- `npm run build` → gera build de produção
- `npm run lint` → executa lint no projeto
- `npm run preview` → roda preview da build gerada

---

## 📦 Build para produção

Para gerar a build otimizada:

```bash
npm run build
```

Os arquivos serão gerados em:

```bash
dist/
```

---

## 🚀 Deploy (aplicável)

A aplicação é estática e pode ser publicada facilmente em:

- **Vercel**
- **Netlify**
- **Cloudflare Pages**
- **GitHub Pages** (com configuração de SPA fallback)

### Recomendação (Vercel / Netlify)
1. Conectar o repositório
2. Definir o diretório do projeto como:
```txt
ProductShowcase
```
3. Build command:
```bash
npm run build
```
4. Output directory:
```txt
dist
```

> Se fizer deploy em rota com fallback de SPA, garanta redirecionamento para `index.html`.

---

## 🧩 Detalhes técnicos relevantes

- A listagem inicial da PokeAPI não retorna imagem/tipos diretamente.
- O projeto resolve isso por:
  - extração do **ID** a partir da URL retornada pela API
  - montagem da URL da **official artwork**
  - enriquecimento da lista com **tipos** via chamadas adicionais em lote (chunked requests)

Isso permite:
- chips de tipo nos cards
- filtro por tipo na Home
- tema visual por tipo

---

## 🛣️ Melhorias futuras (Roadmap)

- [ ] Cache de requisições (React Query / SWR)
- [ ] Reordenação do time via drag-and-drop
- [ ] Comparador de Pokémons (side-by-side)
- [ ] Testes unitários (Vitest + Testing Library)
- [ ] Testes E2E (Playwright)
- [ ] Paginação / lazy loading além dos 151 iniciais
- [ ] Melhor tratamento de erros por endpoint
- [ ] Internacionalização (i18n)
- [ ] Melhorias de acessibilidade (ARIA e navegação por teclado refinada)
- [ ] Deploy automatizado com CI/CD

---

## ✅ Padrões e boas práticas adotadas

- **Componentização** e separação clara de responsabilidades
- **Tipagem explícita** com TypeScript (sem uso de `any`)
- **Context API** para estado global (tema e time Pokémon)
- **Serviço de API centralizado** (`axios`)
- **Utilitários de formatação e tema** desacoplados da UI
- **Persistência local** com `localStorage`
- **Responsividade mobile-first**
- **Loading states** e tratamento básico de falhas
- **Uso de ícones consistentes** com `lucide-react`
- **Animações com fallback** para `prefers-reduced-motion`

---

## 📄 Licença

Este projeto **não possui licença definida** no momento.

> Recomendado para repositório público: adicionar uma licença, como `MIT`.

---

## 👨‍💻 Autor

**Seu Nome**
- GitHub: `https://github.com/seu-usuario`
- LinkedIn: `https://www.linkedin.com/in/seu-perfil/`

> Substitua pelos seus dados antes de publicar.

---

## 📌 Observações finais

Este projeto foi desenvolvido como uma Pokédex interativa com foco em:
- experiência do usuário
- organização de código
- responsividade
- evolução incremental de funcionalidades

É uma base sólida para portfólio e também para evolução técnica (testes, cache, CI/CD e deploy).
#   P o k e d e x  
 