# Portfólio Terminal — CLAUDE.md

Especificação e diretrizes do projeto para desenvolvimento assistido por IA.

## Visão geral

Portfólio pessoal em formato de terminal simulado. O usuário digita comandos e
recebe respostas em texto (input/output puro, **sem** navegação de árvore de
arquivos real — não há `cd`, não há estado de "diretório atual"). Cada comando
é resolvido de forma independente a partir do input completo da linha.

## Stack

- **React**
- **TypeScript**
- **Vite**
- **styled-components**
- Fonte: `JetBrains Mono`

### Bibliotecas auxiliares (sugeridas, avaliar conforme necessidade)

- `react-markdown` — se algum output precisar de formatação rica além de texto puro
- `use-sound` — **removido**, não usaremos som
- `react-syntax-highlighter` / `prism-react-renderer` — **removido**, não mostraremos código formatado
- `react-router-dom` — opcional, apenas se quisermos sincronizar comando/estado com a URL (não obrigatório dado o modelo input/output)

Sistema de arquivos virtual e parser de comando: **implementação própria**, sem lib externa. Parser simples: `comando + subcomando (opcional) + argumento livre (opcional)`.

## Tema visual — Tokyo Night

```
background:      #1a1b26
background alt:  #24283b  (blocos, cards, destaques de output)
foreground:      #c0caf5
comment/dim:     #565f89  (texto secundário, timestamps, hints)
red (erro):      #f7768e
green (sucesso): #9ece6a
yellow (warn):   #e0af68
blue (links):    #7aa2f7
magenta:         #bb9af7
cyan:            #7dcfff
```

## Internacionalização (i18n)

- Idiomas: **inglês** e **português**.
- Escopo do que muda com o idioma: **todo texto de output e mensagens do sistema**
  (avisos, erros, help, conteúdo de about/projects/career/education/contacts/welcome).
- Escopo do que **não muda**: os **nomes dos comandos e subcomandos** em si
  (`about`, `skills`, `goto`, etc. permanecem em inglês independente do idioma ativo).
- Estrutura de dados recomendada: cada texto de output é um objeto
  `{ en: '...', pt: '...' }`, resolvido em tempo de render conforme o idioma
  ativo (guardado em estado global / contexto).
- Idioma padrão: **inglês**.

## Comandos

### `welcome`
Dispara um texto inicial explicando o projeto. Sugestão: executado automaticamente
ao carregar o terminal, além de poder ser chamado manualmente a qualquer momento.

### `help`
Lista todos os comandos disponíveis, com breve descrição de cada um.

### `about`
Subcomandos: `skills`, `workspace`, `hobbies`, `languages`, `all`
- `about` (sem argumento) → mostra a bio seguida de um menu resumido com os subcomandos disponíveis
- `about skills` → habilidades técnicas (lista com ícone por tecnologia)
- `about workspace` → setup de trabalho (hardware, ferramentas, etc.)
- `about hobbies` → hobbies pessoais
- `about languages` → idiomas falados, com nível na nomenclatura CEFR (ex: `B2`, `C2`) — não confundir com o comando `language`, que troca o idioma da interface
- `about all` → imprime a bio e todas as seções acima de uma vez

### `education`
Mostra formação acadêmica. Sem subcomandos definidos por ora (a estruturar quando o conteúdo for esquematizado).

### `papers`
Textos sobre artigos acadêmicos realizados.
- `papers` (sem argumento) → menu resumido listando os artigos disponíveis
- `papers <título do artigo>` → argumento livre (texto), mostra detalhes daquele artigo específico, incluindo o link do PDF do artigo
- `papers all` → imprime todos os artigos de uma vez, separados por um divisor

### `career`
Experiência profissional.
- `career` (sem argumento) → menu resumido listando as empresas/experiências disponíveis
- `career <nome da empresa>` → argumento livre (texto), mostra detalhes daquela experiência específica, seguido de uma lista horizontal com ícone das tecnologias utilizadas
- `career all` → imprime todas as experiências de uma vez, separadas por um divisor
- Atividades extracurriculares (INOVE, GEMP): **não incluídas** no escopo do portfólio

### `projects`
Projetos principais e tecnologias utilizadas.
- `projects` (sem argumento) → menu resumido listando os projetos disponíveis
- `projects <nome do projeto>` → argumento livre (texto, não índice numérico), mostra detalhes do projeto (incluindo o link do GitHub como texto) seguido de uma lista horizontal com ícone das tecnologias utilizadas — **sem redirecionamento automático**, o link é apenas mostrado/clicável no próprio output
- `projects all` → imprime todos os projetos de uma vez, separados por um divisor

### `contacts`
Redes sociais e contato.
- `contacts` (sem argumento) → menu resumido listando os contatos disponíveis
- `contacts <nome>` → argumento livre (ex: `contacts linkedin`)
- Contatos disponíveis: `linkedin`, `github`, `lattes` → abrem em **nova aba** (`window.open`)
- `email` → não abre nova aba, usa `mailto:` (ou exibe o endereço diretamente no terminal)
- Telefone: **não incluído**

### `cv`
Baixa o currículo em PDF no idioma ativo da interface (`language`). Abre em **nova aba** (`window.open`).

### `gui`
Redireciona para a versão gráfica (GUI) do portfólio. Abre em **nova aba**.

### `language`
Troca o idioma da interface.
- `language english`
- `language portuguese`

### `clear`
Limpa o terminal. Comportamento padrão.

### `echo`
Ecoa o argumento fornecido. Comportamento padrão.

### `history`
Lista o histórico de comandos já executados na sessão atual.
> Nota: navegação por setas (↑/↓) para reciclar comandos do histórico direto no input é uma UX independente e deve ser mantida também, além do comando `history` explícito.

## Outputs de lista (estilização)

Os outputs de menu/listagem (`help`, `about`, `career`, `projects`, `papers`,
`contacts` sem argumento) devem ter uma apresentação visual diferenciada em
vez de texto corrido simples — algo no estilo de um objeto/JSON estilizado ou
tabela formatada dentro do terminal, usando as cores do tema Tokyo Night para
diferenciar chaves, valores e índices (ex: chave em `cyan`/`blue`, valor em
`yellow`/`foreground`, índice numérico em `comment`). Referência de estilo:
outputs tipo `gustavo.skills → ["NodeJS", "React", ...]`, com identação e
cores consistentes. Detalhes finais de estilo (componente styled-components
dedicado para listas) a definir na implementação.

## Padrões de comportamento gerais

- **Comando sem argumento/subcomando** (`about`, `projects`, `career`, `contacts`, `papers`): em vez de erro, mostrar um menu resumido com as opções disponíveis daquele comando.
- **Comando não reconhecido**: mensagem amigável no estilo shell (ex: `command not found: <comando>`), usando a cor de erro (`#f7768e`) e respeitando o idioma ativo.
- **Argumento livre para `career`, `papers`, `projects` e `contacts`**: sem índice numérico — sempre por nome/texto livre. Validar correspondência (case-insensitive, idealmente com alguma tolerância a variações simples de escrita).
- **Links externos** (`gui`, `cv`, `contacts`): abrem em nova aba via `window.open`, **exceto** `contacts email`, que usa `mailto:` na mesma aba. `projects` mostra o link do GitHub como texto/clicável no próprio output, sem redirecionamento automático.

## Decisões confirmadas (adicionais)

- **Autocomplete via Tab**: será implementado, limitado a **comandos e subcomandos** (não sugere argumentos livres como nomes de empresas ou projetos).
- **Favicon/title dinâmico**: **não** será implementado — não se aplica ao modelo sem árvore de diretórios.

## Responsividade

Não é foco do projeto, mas devem existir breakpoints simples para reduzir
levemente o tamanho de fonte/elementos em telas menores (sem redesenhar o
layout). Valores padrão sugeridos:

```
/* Tablet */
@media (max-width: 768px) { ... }

/* Celular */
@media (max-width: 480px) { ... }
```

Sugestão de ajuste: reduzir o `font-size` base em ~10–15% em cada breakpoint
(ex: 16px → 14px no tablet → 13px no celular), mantendo o restante do layout intacto.

## Conteúdo

Todo o texto de output (welcome/about/education/papers/career/projects/contacts/gui,
em `en` e `pt`) está portado para módulos `content/*.ts` tipados
(`Record<slug, { en, pt }>`) — são a fonte de verdade atual para os dados.

## Decisões de implementação

Resumo das decisões de arquitetura, ferramental e formato de dados tomadas
durante o desenvolvimento:

- **Ferramental**: Vite (`react-ts`) na raiz do repositório, pnpm, Vitest
  para testes do parser e dos handlers de comando.
- **Estrutura**: `content/` (dados tipados) → `commands/` (parser puro +
  handlers por comando) → `terminal/` (componentes de UI) → `context/`
  (estado global via `Context` + `useReducer`, sem lib externa de state management).
- **Matching de argumento livre** (`career`, `papers`, `projects`,
  `contacts`): normalizado (lowercase, trim, espaços/hifens equivalentes),
  **match exato** — sem tolerância a erro de digitação (distância de
  edição). Isso decide, na prática, a "tolerância a variações simples de
  escrita" deixada em aberto na seção de Padrões de comportamento acima.
  `career`, `papers` e `projects` também aceitam o subcomando `all` para
  imprimir todas as entradas da seção de uma vez.
- **`about` sem argumento**: mostra a bio (texto principal) seguida da
  listagem estilizada dos subcomandos disponíveis (`skills`, `workspace`,
  `hobbies`, `languages`, `all`) — padrão de "menu resumido" descrito acima.
- **Estilo de `ListOutput`** (validado visualmente com o usuário): título em
  `cyan`, seta `→` em `comment`, valor em `yellow`, sem chaves/tabela —
  variação mais simples do que o exemplo `objeto/JSON` original, mesma
  paleta. Itens reconhecidos como tecnologia/linguagem/hobby/idioma ganham
  um ícone (`react-icons`) antes do valor.
- **Tags de tecnologia** (`career`, `projects`): lista horizontal de badges
  com ícone, separada do texto descritivo.
- **Autocomplete (Tab)**: prefixo único → autocompleta; múltiplos
  candidatos → completa até o maior prefixo comum, sem popup de sugestões.
- **Histórico e idioma**: apenas em memória (estado do `TerminalContext`),
  sem persistência em `localStorage`.
- **Links externos**: centralizados em variáveis de ambiente `VITE_*` (ver
  `.env.example`), lidas via `src/env.ts` — nenhum link fica hardcoded no
  conteúdo.
