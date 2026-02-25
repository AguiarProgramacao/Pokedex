# FICHA-CANDIDATO - Rafael Aguiar

## Seção 1: Instruções para Rodar

### Variáveis de ambiente

No estado atual do projeto, não são necessárias variáveis de ambiente para rodar localmente, pois a aplicação consome a PokeAPI diretamente.

### Instalação de dependências

```bash
npm install
```

### Como rodar o projeto

```bash
npm run dev
```

A aplicação ficará disponível em:

`http://localhost:5173`

### Build de produção

```bash
npm run build
```

### Preview da build

```bash
npm run preview
```

## Seção 2: Decisões de Design

### Por que escolhi essa estrutura de pastas?

Optei por organizar o projeto por responsabilidade, visando clareza, escalabilidade e manutenção facilitada.

- `pages`: Tela Home onde fica todos os pokemons e Detalhes do pokemons
- `components`: componentes reutilizáveis como os cards dos pokemons e o acordeão do time
- `services`: centralização do consumo da API (`axios` + funcoes especificas) como foi pedido
- `contexts`: estado global com tema dark/light e time Pokemon
- `types`: tipagens TypeScript da PokeAPI (evitando uso de `any`) também como solicitado
- `utils`: funções auxiliares (formatação, mapeamento visual por tipo)

Essa organização evita misturar:
- regra de negocio
- UI
- acesso a API

Mantendo o código mais legivel e modular.

### Maior dificuldade encontrada

O principal desafio foi que o endpoint de listagem da PokeAPI não retorna imagem nem tipos, apenas:

- `name`
- `url` (endpoint de detalhes)

### Como resolvi

#### Imagem

- Extraí o `id` da URL retornada pela API
- Montei manualmente a URL da imagem oficial (`official-artwork`)

Isso evitou realizar 151 requisições adicionais apenas para obter imagens.

#### Tipos

- Realizei enriquecimento da lista com chamadas adicionais organizadas em lote

Isso permitiu:
- exibir chips coloridos por tipo na Home
- implementar filtro por tipo no lado do cliente

Tambem dei atenção especial a:
- responsividade
- empilhamento visual (`z-index`) na tela de detalhes

### O que não tive tempo de implementar (e como faria)

Se tivesse mais tempo, implementaria:

- Cache de requisicoes (React Query ou SWR) para reduzir chamadas repetidas
- Testes unitarios e E2E
- Drag-and-drop para reordenar o Time Pokemon
- Deploy com pipeline CI/CD
- Tratamento de erro mais refinado (mensagens por endpoint + retry)
- Observabilidade (monitoramento de erros em produção)

## Secao 3: Link para Deploy (Bonus)

### Se publicado

`Deploy: https://dex-pokemon-tan.vercel.app/`

## Secao Final: Recomendações

Sugestoes de evolucao para o desafio:

- Implementar cache para melhorar performance e UX
- Adicionar testes automatizados
- Comparacao entre Pokemons (stats lado a lado)
- Drag-and-drop no "Meu Time Pokemon"
- Melhorar observabilidade em ambiente real
- Internacionalização (PT/EN)

Também considerei essencial manter a interface:

- totalmente responsiva
- funcional em dispositivos moveis
- visualmente consistente com Tailwind

## Consideracoes Finais

Durante o desenvolvimento, priorizei:

- cumprir 100% dos requisitos essenciais
- manter tipagem forte com TypeScript
- garantir separação clara de responsabilidades
- entregar uma base sólida, escalável e profissional

Caso queira discutir qualquer decisão técnica, fico a disposição para explicar as escolhas feitas e possíveis melhorias.

Nome: Rafael Aguiar
Email: aguiarprogramacao@gmail.com
Whatsapp: (21) 97463-3634
Linkedin: https://linkedin.com/in/dev-rafael-aguiar