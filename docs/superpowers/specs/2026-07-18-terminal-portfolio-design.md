# Portfólio Terminal — Design de Implementação

Data: 2026-07-18
Status: Aprovado

## Contexto

O produto já está especificado em detalhe em `CLAUDE.md` (comandos, tema,
i18n, comportamentos) e o conteúdo textual final está fechado em
`CONTENT_DRAFT.md` ("pronto para virar estrutura de dados JSON"). Este
documento cobre apenas as decisões de **implementação** que os dois arquivos
acima não definem: ferramental, arquitetura de estado, modelo de execução de
comandos, formato dos dados e estratégia de testes.

## Ferramental

- **Scaffold**: Vite (`react-ts` template), na raiz de `terminal-based-portfolio/`
  (junto de `CLAUDE.md` e `CONTENT_DRAFT.md`, não em subpasta).
- **Gerenciador de pacotes**: pnpm.
- **Testes**: Vitest (parser + handlers de comando). Testing Library para
  componentes fica em aberto para depois, se necessário.
- **Git**: inicializado como parte do scaffold (branch `main`), com
  `.gitignore` cobrindo `node_modules/`, `dist/` e `.superpowers/` (artefatos
  transitórios do processo de brainstorming).
- Bibliotecas seguem exatamente a lista do `CLAUDE.md` (React, TypeScript,
  Vite, styled-components, fonte JetBrains Mono). Nenhuma lib de state
  management externa — `Context` + `useReducer` nativos do React.

## Estrutura de pastas

```
terminal-based-portfolio/
├── CLAUDE.md
├── CONTENT_DRAFT.md
├── docs/superpowers/specs/          # este documento
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── theme/                       # tokens Tokyo Night + GlobalStyle (styled-components)
│   ├── i18n/                        # tipo Localized<T> = {en,pt}, resolveText(), LanguageContext
│   ├── content/                     # módulos .ts tipados por seção (about, education, papers,
│   │                                 # career, projects, contacts, misc: welcome/help/gui)
│   ├── commands/                    # parser.ts (puro) + registry.ts + um handler por comando
│   ├── terminal/                    # TerminalWindow, CommandInput, OutputLine, ListOutput
│   ├── context/                     # TerminalContext (useReducer): idioma, histórico, log
│   └── types/
├── vite.config.ts, tsconfig*.json, package.json
```

Separação: **content** (dados) → **commands** (lógica pura de resolução) →
**terminal** (UI) → **context** (estado global). Cada camada só depende da
de baixo, nunca o contrário.

## Estado e modelo de execução

`TerminalContext` (Context + `useReducer`) guarda:

```ts
{
  language: 'en' | 'pt';
  history: string[];       // linhas digitadas, em ordem (comando `history` + navegação ↑/↓)
  log: OutputEntry[];      // tudo já renderizado (eco do comando + output)
}
```

Sem persistência em `localStorage` — idioma e histórico vivem só durante a
sessão (aba aberta), conforme o próprio texto do CLAUDE.md para `history`
("comandos já executados na sessão atual").

Fluxo de execução de um comando:

1. `CommandInput` captura a linha digitada.
2. `parseInput(raw: string): { command: string; rest: string[] }` — função
   pura, sem acesso a estado. Só separa o primeiro token (nome do comando) do
   restante da linha (tokens brutos). **Não** conhece a gramática de cada
   comando.
3. `registry[command]` resolve o handler. Comando desconhecido → handler de
   erro (`command not found: <comando>`, cor `#f7768e`, respeitando idioma).
4. O handler recebe `(rest: string[], language: Language)` e interpreta o
   "resto da linha" com sua própria lógica — é aqui que mora a diferença
   entre subcomando fixo (`about skills`) e argumento livre (`career
   jit-technology`, `projects goto vertex-cover`). O parser genérico não
   precisa modelar essa diferença.
5. Handler devolve um `CommandResult`: uma lista de `OutputEntry` a
   adicionar ao log, e/ou um efeito colateral (`window.open`, `mailto:`,
   troca de idioma, `clear`).
6. O reducer despacha `EXECUTE_COMMAND`, atualizando `history` e `log`.

### Matching de argumento livre

Comandos como `career`, `papers`, `contacts goto`, `projects goto` recebem
texto livre. Normalização: lowercase, trim, colapsar espaços e hífens antes
de comparar com as chaves do `content`. **Match exato apenas** (sem
tolerância a erro de digitação / distância de edição) — decisão explícita
para manter comportamento previsível.

## Conteúdo e i18n

- `Localized<T> = { en: T; pt: T }`, com `resolveText(localized, language)`
  em `i18n/`.
- Cada seção de conteúdo é um módulo `.ts` tipado (não `.json` puro), para
  ganhar checagem de tipos e autocomplete no editor:
  - `content/about.ts` — bio (`text`) + `skills`/`workspace`/`hobbies`/`languages` (listas)
  - `content/education.ts`, `content/papers.ts`, `content/career.ts`,
    `content/projects.ts`, `content/contacts.ts` — cada um com o padrão
    `Record<slug, { en: Section; pt: Section }>` mais o menu resumido
  - `content/misc.ts` — `welcome`, `help`, `gui`
- Todo o texto vem diretamente de `CONTENT_DRAFT.md` (conteúdo fechado, sem
  placeholders a preencher).

### Caso especial: `about` sem argumento

`CONTENT_DRAFT.md` traz um texto de bio para "about (texto principal)"
enquanto `CLAUDE.md` pede que `about` sem argumento mostre um "menu
resumido com os subcomandos disponíveis". Decisão: **os dois, combinados**
— `about` sem argumento renderiza a bio (`text`) seguida da listagem
estilizada dos subcomandos (`skills`, `workspace`, `hobbies`, `languages`)
com uma dica final (`Type "about <subcommand>" to read more.`), no mesmo
padrão usado por `career`/`projects`/`papers`/`contacts`.

## Output e estilização de listas

`OutputEntry.kind`: `command` (eco do prompt + input digitado), `text`
(parágrafos, preserva quebras de linha), `list` (menus/listagens), `error`.
Um componente styled-components dedicado por `kind`.

Estilo do `ListOutput` (validado visualmente com o usuário via companion,
opção B — lista indentada, sem chaves/tabela):

```
gustavo@portfolio:~$ career

Professional experience:

  → nextpage
  → jit-technology
  → tropa-concursos
  → shotokawa-comics
  → gera3-sistemas

Type "career <company>" to read more.
```

- Título em `cyan` (`#7dcfff`)
- Seta `→` em `comment` (`#565f89`)
- Valor em `yellow` (`#e0af68`)

Componente único `ListOutput({ title, items })`, reaproveitado por todos os
menus:
- `items: string[]` — caso simples (career/projects/papers/contacts/about-menu)
- `items: { label: string; description?: string }[]` — caso `help`, que
  precisa mostrar nome do comando + descrição curta, alinhados em colunas

## Autocomplete (Tab)

Limitado a comandos e subcomandos fixos (`about`, `contacts goto`,
`projects goto`, `language`) — nunca a argumento livre (nomes de
empresa/projeto/artigo), conforme decisão já registrada no `CLAUDE.md`.
Comportamento: prefixo único entre os candidatos → autocompleta a linha;
múltiplos candidatos → completa até o maior prefixo comum e para (sem
popup de sugestões).

## Testes (Vitest)

- `commands/parser.test.ts` — tokenização, comando desconhecido,
  preservação de tokens brutos em `rest`.
- Um `*.test.ts` por handler de comando cobrindo: menu sem argumentos,
  match exato de argumento livre (normalizado), caso "not found" para nomes
  inválidos, e side-effects (`window.open`/`mailto:`/troca de
  idioma/`clear`) via mocks.
- `i18n/resolveText.test.ts`.

## Fora de escopo (confirmado)

- Persistência de idioma/histórico em `localStorage`.
- Tolerância a erro de digitação (distância de edição) no matching de
  argumento livre.
- Favicon/title dinâmico.
- Navegação de árvore de arquivos / estado de "diretório atual".
- Atividades extracurriculares (INOVE, GEMP) e telefone em `contacts`.
