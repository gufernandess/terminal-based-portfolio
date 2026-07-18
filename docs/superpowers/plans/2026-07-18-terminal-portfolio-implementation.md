# Terminal Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the terminal-style portfolio described in `CLAUDE.md`/`CONTENT_DRAFT.md`: a React + TypeScript + Vite app where users type shell-like commands (`about`, `career`, `projects`, ...) and get styled text/list output, with English/Portuguese i18n and a Tokyo Night theme.

**Architecture:** A pure, React-free command layer (`parseInput` → `registry` → per-command handler → `CommandResult`) sits below a thin React layer (`TerminalContext` via `useReducer`, and `terminal/` UI components that render the resulting output log). Content is data-only, in typed `content/*.ts` modules ported verbatim from `CONTENT_DRAFT.md`.

**Tech Stack:** React 18, TypeScript, Vite, styled-components v6, `@fontsource/jetbrains-mono`, Vitest, pnpm.

## Global Constraints

- Package manager: **pnpm** — every command in this plan uses `pnpm`, not `npm`/`yarn`.
- Stack: React + TypeScript + Vite + styled-components; font JetBrains Mono via `@fontsource/jetbrains-mono` (no external CDN).
- Tokyo Night palette (exact hex values, from `CLAUDE.md`): background `#1a1b26`, background alt `#24283b`, foreground `#c0caf5`, comment/dim `#565f89`, red `#f7768e`, green `#9ece6a`, yellow `#e0af68`, blue `#7aa2f7`, magenta `#bb9af7`, cyan `#7dcfff`.
- i18n: languages are `en` and `pt` only; default language is `en`; command and subcommand names never change with language. All output text is resolved through `Localized<T> = { en: T; pt: T }` + `resolveText`.
- Free-text argument matching (`career`, `papers`, `contacts goto`, `projects goto`): normalize (lowercase, trim, collapse spaces/hyphens to a single hyphen) and require an **exact** match — no fuzzy/Levenshtein matching (explicit user decision, overrides the "idealmente" wording in `CLAUDE.md`).
- No `localStorage` persistence for language or history — state is session-only (`TerminalContext`, in memory).
- Autocomplete (Tab) only completes command names and fixed subcommands (`about`'s 4 subcommands, `contacts`/`projects`' `goto`, `language`'s `english`/`portuguese`) — never free-text arguments.
- External links (`gui`, `projects goto <name>`, `contacts goto <name>` except `email`) open via `window.open(url, '_blank', 'noopener,noreferrer')`; `contacts goto email` uses `mailto:` in the same tab.
- Content text must be copied **verbatim** from `CONTENT_DRAFT.md` — do not paraphrase or rewrite it.
- Tests: Vitest, files at `src/**/*.test.ts`, run with `pnpm test`. Per the approved design spec (`docs/superpowers/specs/2026-07-18-terminal-portfolio-design.md`), only the parser, `resolveText`, and command handlers get automated tests — UI components and content/theme files are verified by type-check instead.

---

### Task 1: Project scaffold

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `vitest.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/vite-env.d.ts`
- Create: `src/App.tsx` (placeholder, replaced in Task 27)
- Test: none (verified by build)

**Interfaces:**
- Consumes: nothing (first task).
- Produces: a working Vite dev/build/test pipeline that every later task's files are checked against.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "terminal-based-portfolio",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@fontsource/jetbrains-mono": "^5.0.20",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "styled-components": "^6.1.12"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.5.4",
    "vite": "^5.4.0",
    "vitest": "^2.0.5"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "vite.config.ts", "vitest.config.ts"]
}
```

- [ ] **Step 3: Create `vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

- [ ] **Step 4: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
  },
});
```

- [ ] **Step 5: Create `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gustavo Fernandes — Terminal Portfolio</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Create `src/vite-env.d.ts`**

```ts
/// <reference types="vite/client" />
```

- [ ] **Step 7: Create placeholder `src/App.tsx`**

```tsx
export default function App() {
  return <div>Terminal portfolio scaffold OK</div>;
}
```

- [ ] **Step 8: Create `src/main.tsx`**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('#root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 9: Install dependencies**

Run: `pnpm install`
Expected: exits 0, creates `node_modules/` and `pnpm-lock.yaml`.

- [ ] **Step 10: Verify the build**

Run: `pnpm run build`
Expected: exits 0; output ends with a line starting `✓ built in`.

- [ ] **Step 11: Commit**

```bash
git add package.json pnpm-lock.yaml tsconfig.json vite.config.ts vitest.config.ts index.html src/main.tsx src/vite-env.d.ts src/App.tsx
git commit -m "Scaffold Vite + React + TypeScript + styled-components project"
```

---

### Task 2: Core types and i18n

**Files:**
- Create: `src/types/index.ts`
- Create: `src/i18n/resolveText.ts`
- Test: `src/i18n/resolveText.test.ts`

**Interfaces:**
- Consumes: nothing beyond the scaffold.
- Produces: `Language`, `Localized<T>`, `ListItem`, `OutputEntry`, `CommandEffect`, `CommandResult`, `CommandContext`, `CommandHandler` (all from `src/types/index.ts`); `resolveText<T>(localized: Localized<T>, language: Language): T` (from `src/i18n/resolveText.ts`). Every later task imports from these two files.

- [ ] **Step 1: Create `src/types/index.ts`**

```ts
export type Language = 'en' | 'pt';

export interface Localized<T> {
  en: T;
  pt: T;
}

export interface ListItem {
  label: string;
  description?: string;
}

export type OutputEntry =
  | { id: string; kind: 'command'; input: string }
  | { id: string; kind: 'text'; lines: string[] }
  | { id: string; kind: 'error'; message: string }
  | { id: string; kind: 'list'; title: string; items: string[] | ListItem[]; hint?: string };

export type CommandEffect =
  | { type: 'open-url'; url: string }
  | { type: 'mailto'; address: string }
  | { type: 'set-language'; language: Language }
  | { type: 'clear' };

export interface CommandResult {
  entries: OutputEntry[];
  effect?: CommandEffect;
}

export interface CommandContext {
  language: Language;
  history: string[];
}

export type CommandHandler = (args: string[], ctx: CommandContext) => CommandResult;
```

- [ ] **Step 2: Write the failing test for `resolveText`**

```ts
// src/i18n/resolveText.test.ts
import { describe, expect, it } from 'vitest';
import { resolveText } from './resolveText';

describe('resolveText', () => {
  const localized = { en: 'hello', pt: 'olá' };

  it('resolves English', () => {
    expect(resolveText(localized, 'en')).toBe('hello');
  });

  it('resolves Portuguese', () => {
    expect(resolveText(localized, 'pt')).toBe('olá');
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `pnpm test -- resolveText`
Expected: FAIL — `Cannot find module './resolveText'`.

- [ ] **Step 4: Create `src/i18n/resolveText.ts`**

```ts
import type { Language, Localized } from '../types';

export function resolveText<T>(localized: Localized<T>, language: Language): T {
  return localized[language];
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `pnpm test -- resolveText`
Expected: PASS — 2 passed.

- [ ] **Step 6: Commit**

```bash
git add src/types/index.ts src/i18n/resolveText.ts src/i18n/resolveText.test.ts
git commit -m "Add core types and resolveText i18n helper"
```

---

### Task 3: Theme (Tokyo Night tokens + global style)

**Files:**
- Create: `src/theme/tokens.ts`
- Create: `src/theme/theme.ts`
- Create: `src/theme/GlobalStyle.ts`
- Test: none (visual; wired into the app and checked in Task 27)

**Interfaces:**
- Consumes: nothing beyond the scaffold.
- Produces: `theme` (styled-components `DefaultTheme`, with `theme.colors.*` and `theme.fontFamily`), `GlobalStyle` (a `createGlobalStyle` component). Used by `App.tsx` (Task 27) and every `terminal/` component (Tasks 23–26).

- [ ] **Step 1: Create `src/theme/tokens.ts`**

```ts
export const colors = {
  background: '#1a1b26',
  backgroundAlt: '#24283b',
  foreground: '#c0caf5',
  comment: '#565f89',
  red: '#f7768e',
  green: '#9ece6a',
  yellow: '#e0af68',
  blue: '#7aa2f7',
  magenta: '#bb9af7',
  cyan: '#7dcfff',
} as const;

export const fontFamily =
  "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
```

- [ ] **Step 2: Create `src/theme/theme.ts`**

```ts
import 'styled-components';
import { colors, fontFamily } from './tokens';

export const theme = {
  colors,
  fontFamily,
};

export type AppTheme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
```

- [ ] **Step 3: Create `src/theme/GlobalStyle.ts`**

```ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    margin: 0;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    font-family: ${({ theme }) => theme.fontFamily};
    font-size: 16px;
  }

  /* Tablet */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }

  /* Celular */
  @media (max-width: 480px) {
    body {
      font-size: 13px;
    }
  }
`;
```

- [ ] **Step 4: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0, no output.

- [ ] **Step 5: Commit**

```bash
git add src/theme/tokens.ts src/theme/theme.ts src/theme/GlobalStyle.ts
git commit -m "Add Tokyo Night theme tokens and global style"
```

---

### Task 4: Command parser

**Files:**
- Create: `src/commands/parser.ts`
- Test: `src/commands/parser.test.ts`

**Interfaces:**
- Consumes: nothing beyond core types.
- Produces: `parseInput(raw: string): { command: string; rest: string[] }`. Consumed by `runCommand` (Task 20).

- [ ] **Step 1: Write the failing tests**

```ts
// src/commands/parser.test.ts
import { describe, expect, it } from 'vitest';
import { parseInput } from './parser';

describe('parseInput', () => {
  it('splits command and args on whitespace', () => {
    expect(parseInput('career jit-technology')).toEqual({
      command: 'career',
      rest: ['jit-technology'],
    });
  });

  it('lowercases the command but preserves arg casing', () => {
    expect(parseInput('ECHO Hello World')).toEqual({
      command: 'echo',
      rest: ['Hello', 'World'],
    });
  });

  it('collapses repeated whitespace', () => {
    expect(parseInput('  projects   goto   c3t  ')).toEqual({
      command: 'projects',
      rest: ['goto', 'c3t'],
    });
  });

  it('returns an empty command for blank input', () => {
    expect(parseInput('   ')).toEqual({ command: '', rest: [] });
  });

  it('returns no rest for a bare command', () => {
    expect(parseInput('help')).toEqual({ command: 'help', rest: [] });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test -- parser`
Expected: FAIL — `Cannot find module './parser'`.

- [ ] **Step 3: Create `src/commands/parser.ts`**

```ts
export interface ParsedInput {
  command: string;
  rest: string[];
}

export function parseInput(raw: string): ParsedInput {
  const tokens = raw.trim().split(/\s+/).filter(Boolean);
  const [command, ...rest] = tokens;
  return { command: (command ?? '').toLowerCase(), rest };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test -- parser`
Expected: PASS — 5 passed.

- [ ] **Step 5: Commit**

```bash
git add src/commands/parser.ts src/commands/parser.test.ts
git commit -m "Add command line parser"
```

---

### Task 5: Output entry helpers

**Files:**
- Create: `src/commands/entries.ts`
- Test: none (thin glue; exercised transitively by every handler test in Tasks 7–19)

**Interfaces:**
- Consumes: `Language`, `Localized`, `ListItem`, `OutputEntry` from `src/types`; `resolveText` from `src/i18n/resolveText`.
- Produces: `textEntry(lines: string[]): OutputEntry`, `localizedTextEntry(localized: Localized<string[]>, language: Language): OutputEntry`, `errorEntry(message: string): OutputEntry`, `listEntry(title: string, items: string[] | ListItem[], hint?: string): OutputEntry`, `commandNotFoundMessage(command: string, language: Language): string`. Used by every command handler (Tasks 7–19) and `runCommand` (Task 20).

- [ ] **Step 1: Create `src/commands/entries.ts`**

```ts
import type { Language, Localized, ListItem, OutputEntry } from '../types';
import { resolveText } from '../i18n/resolveText';

function makeId(): string {
  return crypto.randomUUID();
}

export function textEntry(lines: string[]): OutputEntry {
  return { id: makeId(), kind: 'text', lines };
}

export function localizedTextEntry(
  localized: Localized<string[]>,
  language: Language,
): OutputEntry {
  return textEntry(resolveText(localized, language));
}

export function errorEntry(message: string): OutputEntry {
  return { id: makeId(), kind: 'error', message };
}

export function listEntry(
  title: string,
  items: string[] | ListItem[],
  hint?: string,
): OutputEntry {
  return { id: makeId(), kind: 'list', title, items, hint };
}

export function commandNotFoundMessage(command: string, language: Language): string {
  return language === 'en'
    ? `command not found: ${command}`
    : `comando não encontrado: ${command}`;
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0, no output.

- [ ] **Step 3: Commit**

```bash
git add src/commands/entries.ts
git commit -m "Add output entry builder helpers"
```

---

### Task 6: Content data modules

**Files:**
- Create: `src/content/about.ts`
- Create: `src/content/education.ts`
- Create: `src/content/papers.ts`
- Create: `src/content/career.ts`
- Create: `src/content/projects.ts`
- Create: `src/content/contacts.ts`
- Create: `src/content/misc.ts`
- Test: none (pure data; exercised transitively by handler tests in Tasks 7–19)

**Interfaces:**
- Consumes: `Localized` from `src/types`.
- Produces (consumed by the matching handler task):
  - `about.ts`: `aboutBio: Localized<string[]>`, `aboutSkills: string[]`, `aboutWorkspace: string[]`, `aboutHobbies: Localized<string[]>`, `aboutLanguages: Localized<string[]>`, `aboutMenuTitle: Localized<string>`, `aboutHint: Localized<string>`, `AboutSubcommand`, `aboutSubcommandDescriptions: AboutSubcommand[]` → Task 9.
  - `education.ts`: `educationText: Localized<string[]>` → Task 10.
  - `papers.ts`: `PaperEntry`, `papers: PaperEntry[]`, `papersMenuTitle: Localized<string>`, `papersHint: Localized<string>` → Task 11.
  - `career.ts`: `CareerEntry`, `career: CareerEntry[]`, `careerMenuTitle: Localized<string>`, `careerHint: Localized<string>` → Task 12.
  - `projects.ts`: `ProjectEntry`, `projects: ProjectEntry[]`, `projectsMenuTitle: Localized<string>`, `projectsHint: Localized<string>` → Task 13.
  - `contacts.ts`: `ContactEntry`, `contacts: ContactEntry[]`, `contactsMenuTitle: Localized<string>`, `contactsHint: Localized<string>` → Task 14.
  - `misc.ts`: `welcomeText: Localized<string[]>` → Task 7; `HelpEntry`, `helpMenuTitle: Localized<string>`, `helpEntries: HelpEntry[]` → Task 8; `historyMenuTitle: Localized<string>` → Task 19; `guiText: Localized<string[]>`, `guiUrl: string` → Task 15.

- [ ] **Step 1: Create `src/content/about.ts`**

```ts
import type { Localized } from '../types';

export const aboutBio: Localized<string[]> = {
  en: [
    "Hi, I'm Gustavo Fernandes — a computer scientist and software engineer who",
    'recursively aims to learn and continuously evolve.',
    '',
    "My main experience is in web development, but I'm always eager to explore",
    'new things: machine learning, functional programming, hackathons, and',
    'competitive programming.',
    '',
    'My goal is to combine the science and art of programming to build software',
    'that adds real value — and have fun in the process.',
  ],
  pt: [
    'Olá, eu sou Gustavo Fernandes — cientista da computação e engenheiro de',
    'software que busca aprender e evoluir de forma recursiva e contínua.',
    '',
    'Minha principal experiência é em desenvolvimento web, mas sempre estou',
    'disposto a explorar coisas novas: machine learning, programação funcional,',
    'hackathons e programação competitiva.',
    '',
    'Meu objetivo é combinar a ciência e a arte da programação para construir',
    'software que agregue valor real — e me divertir no processo.',
  ],
};

export const aboutSkills: string[] = [
  'Node.js',
  'Jest',
  'MongoDB',
  'PostgreSQL',
  'Docker',
  'Git',
  'Java',
  'C++',
  'Python',
  'TypeScript',
  'React',
  'Styled-Components',
];

export const aboutWorkspace: string[] = ['Manjaro Linux', 'Visual Studio Code', 'Neovim'];

export const aboutHobbies: Localized<string[]> = {
  en: ['Reading', 'Gym', 'Running', 'Coding'],
  pt: ['Leitura', 'Academia', 'Corrida', 'Programação'],
};

export const aboutLanguages: Localized<string[]> = {
  en: ['Portuguese (Native)', 'English (Professional)'],
  pt: ['Português (Nativo)', 'Inglês (Profissional)'],
};

export const aboutMenuTitle: Localized<string> = {
  en: 'Available sections:',
  pt: 'Seções disponíveis:',
};

export const aboutHint: Localized<string> = {
  en: 'Type "about <subcommand>" to read more.',
  pt: 'Digite "about <subcomando>" para ler mais.',
};

export interface AboutSubcommand {
  label: string;
  description: Localized<string>;
}

export const aboutSubcommandDescriptions: AboutSubcommand[] = [
  { label: 'skills', description: { en: 'Technical skills', pt: 'Habilidades técnicas' } },
  { label: 'workspace', description: { en: 'Work setup', pt: 'Setup de trabalho' } },
  { label: 'hobbies', description: { en: 'Personal hobbies', pt: 'Hobbies pessoais' } },
  { label: 'languages', description: { en: 'Spoken languages', pt: 'Idiomas falados' } },
];
```

- [ ] **Step 2: Create `src/content/education.ts`**

```ts
import type { Localized } from '../types';

export const educationText: Localized<string[]> = {
  en: [
    'Federal University of Ceará (UFC) — Quixadá, CE, Brazil',
    'B.Sc. in Computer Science | Mar 2022 – Dec 2025',
    '',
    'EEEP Flávio Gomes Granjeiro — Paraipaba, CE, Brazil',
    'Technical degree in Information Technology | Feb 2018 – Dec 2020',
    '',
    'Centro Integrado de Ensino de Paraipaba — Paraipaba, CE, Brazil',
    'English Conversation Course | Jan 2016 – Dec 2017',
  ],
  pt: [
    'Universidade Federal do Ceará (UFC) — Quixadá, CE, Brasil',
    'Bacharelado em Ciência da Computação | Mar 2022 – Dez 2025',
    '',
    'EEEP Flávio Gomes Granjeiro — Paraipaba, CE, Brasil',
    'Técnico em Informática | Fev 2018 – Dez 2020',
    '',
    'Centro Integrado de Ensino de Paraipaba — Paraipaba, CE, Brasil',
    'Curso de Conversação na Língua Inglesa | Jan 2016 – Dez 2017',
  ],
};
```

- [ ] **Step 3: Create `src/content/papers.ts`**

```ts
import type { Localized } from '../types';

export interface PaperEntry {
  slug: string;
  body: Localized<string[]>;
}

export const papers: PaperEntry[] = [
  {
    slug: 'vertex-cover-snarks',
    body: {
      en: [
        'On the Minimum Vertex Cover of Snarks',
        '',
        'Studies the computational complexity of the minimum vertex cover problem',
        'in snark graphs, proving NP-completeness for the general case and',
        'establishing exact cover numbers for families like flower snarks, Goldberg',
        'snarks, Blanuša snarks, and Loupekine snarks. Derived from my undergraduate',
        'thesis, with publication expected in Discrete Applied Mathematics.',
        '',
        'Related project: "projects goto vertex-cover"',
      ],
      pt: [
        'On the Minimum Vertex Cover of Snarks',
        '',
        'Estuda a complexidade computacional do problema da cobertura por vértices',
        'mínima em grafos snarks, provando a NP-completude para o caso geral e',
        'estabelecendo o número de cobertura exato para famílias como snarks-flor,',
        'snarks de Goldberg, Blanuša e Loupekine. Derivado do meu TCC, com',
        'publicação prevista na revista Discrete Applied Mathematics.',
        '',
        'Projeto relacionado: "projects goto vertex-cover"',
      ],
    },
  },
  {
    slug: 'genetic-algorithms',
    body: {
      en: [
        'A Study on Genetic Algorithms',
        '',
        'Dissertative study on Genetic Algorithms applied to problem optimization,',
        'covering selection, crossover, and mutation, and highlighting their',
        "efficiency versus traditional search methods. Presented at UFC's academic",
        'meetings.',
      ],
      pt: [
        'Um Estudo Sobre os Algoritmos Genéticos',
        '',
        'Estudo dissertativo sobre Algoritmos Genéticos aplicados à otimização de',
        'problemas, cobrindo seleção, cruzamento e mutação, e destacando sua',
        'eficiência em relação a métodos tradicionais de busca. Apresentado nos',
        'Encontros Universitários da UFC.',
      ],
    },
  },
];

export const papersMenuTitle: Localized<string> = {
  en: 'Available papers:',
  pt: 'Artigos disponíveis:',
};

export const papersHint: Localized<string> = {
  en: 'Type "papers <title>" to read more.',
  pt: 'Digite "papers <título>" para ler mais.',
};
```

- [ ] **Step 4: Create `src/content/career.ts`**

```ts
import type { Localized } from '../types';

export interface CareerEntry {
  slug: string;
  body: Localized<string[]>;
}

export const career: CareerEntry[] = [
  {
    slug: 'nextpage',
    body: {
      en: [
        'NextPage — Remote',
        'Fullstack Developer Jr. | Jan 2026 – Present',
        '',
        'Building and evolving a platform for creating custom Digital Educational',
        'Objects for publishers and schools (React, Node.js, PostgreSQL, Astro).',
        'Managed AWS infrastructure (EC2, S3, VPC, CloudFront), led backend',
        'performance refactors, and implemented accessibility (a11y) best practices',
        'validated with the NVDA screen reader.',
      ],
      pt: [
        'NextPage — Remoto',
        'Desenvolvedor Fullstack Jr. | Jan 2026 – Atualmente',
        '',
        'Desenvolvimento e evolução de plataforma para criação de Objetos',
        'Educacionais Digitais para editoras e escolas (React, Node.js, PostgreSQL,',
        'Astro). Gestão de infraestrutura AWS (EC2, S3, VPC, CloudFront), condução',
        'de refatorações de performance no backend e implementação de boas',
        'práticas de acessibilidade (a11y) validadas com o leitor de tela NVDA.',
      ],
    },
  },
  {
    slug: 'jit-technology',
    body: {
      en: [
        'JIT Technology — Remote',
        'Fullstack Developer Jr. | Sep 2024 – Dec 2025',
        '',
        'Technical focal point for client requirements, translating business rules',
        'into scalable solutions. Built reactive interfaces (React) and REST/GraphQL',
        'APIs (Node.js, MongoDB). Developed a financial module integrating Banco Efí',
        '(PIX/Boleto) and currency conversion, cutting manual reconciliation time by',
        '~90%. Raised test coverage above 80% with Jest and SonarQube.',
      ],
      pt: [
        'JIT Technology — Remoto',
        'Desenvolvedor Fullstack Jr. | Set 2024 – Dez 2025',
        '',
        'Ponto focal técnico para requisitos de clientes, traduzindo regras de',
        'negócio em soluções escaláveis. Desenvolvimento de interfaces reativas',
        '(React) e APIs REST/GraphQL (Node.js, MongoDB). Módulo financeiro',
        'integrando Banco Efí (PIX/Boleto) e conversão de moedas, reduzindo em ~90%',
        'o tempo de conciliação bancária. Elevação da cobertura de testes para',
        'acima de 80% com Jest e SonarQube.',
      ],
    },
  },
  {
    slug: 'tropa-concursos',
    body: {
      en: [
        'Tropa Concursos — Remote',
        'Frontend Developer (Freelancer) | Jan 2024 – Feb 2024',
        '',
        'Built the official landing page for a Military Police (PMCE) prep course.',
        'Designed a high-fidelity Figma prototype and implemented it with HTML, CSS,',
        'and JavaScript, focused on SEO and mobile-first responsive design.',
      ],
      pt: [
        'Tropa Concursos — Remoto',
        'Desenvolvedor Frontend (Freelancer) | Jan 2024 – Fev 2024',
        '',
        'Desenvolvimento da landing page oficial de um curso preparatório para a',
        'Polícia Militar (PMCE). Elaboração de protótipo de alta fidelidade no',
        'Figma e implementação com HTML, CSS e JavaScript, com foco em SEO e design',
        'responsivo (mobile-first).',
      ],
    },
  },
  {
    slug: 'shotokawa-comics',
    body: {
      en: [
        'Shotokawa Comics — Remote',
        'Frontend Developer (Freelancer) | Jun 2023 – Dec 2023',
        '',
        'Developed a SPA with React and styled-components for a legal manga',
        'subscription platform, implementing content protection logic to ensure',
        'fair compensation for artists. Worked directly with the client end-to-end.',
      ],
      pt: [
        'Shotokawa Comics — Remoto',
        'Desenvolvedor Frontend (Freelancer) | Jun 2023 – Dez 2023',
        '',
        'Desenvolvimento de SPA com React e styled-components para uma plataforma',
        'de assinatura de leitura legalizada de mangás, implementando lógicas de',
        'proteção de conteúdo para remuneração justa dos artistas. Atuação direta',
        'com o cliente do início ao fim.',
      ],
    },
  },
  {
    slug: 'gera3-sistemas',
    body: {
      en: [
        'Gera3 Sistemas — Remote',
        'Software Development Intern | Jan 2021 – Aug 2021',
        '',
        'Implemented a RESTful API (Java, Maven, Selenium) that fully automated a',
        'previously manual social media data collection process, plus a BI',
        'interface for engagement metrics.',
      ],
      pt: [
        'Gera3 Sistemas — Remoto',
        'Estagiário em Desenvolvimento de Software | Jan 2021 – Ago 2021',
        '',
        'Implementação de API RESTful (Java, Maven, Selenium) que automatizou por',
        'completo um processo de coleta de dados de redes sociais antes manual,',
        'além de interface de BI para métricas de engajamento.',
      ],
    },
  },
];

export const careerMenuTitle: Localized<string> = {
  en: 'Professional experience:',
  pt: 'Experiência profissional:',
};

export const careerHint: Localized<string> = {
  en: 'Type "career <company>" to read more.',
  pt: 'Digite "career <empresa>" para ler mais.',
};
```

- [ ] **Step 5: Create `src/content/projects.ts`**

```ts
import type { Localized } from '../types';

export interface ProjectEntry {
  slug: string;
  url: string;
  body: Localized<string[]>;
}

export const projects: ProjectEntry[] = [
  {
    slug: 'c3t',
    url: 'https://github.com/gufernandess/c3t',
    body: {
      en: [
        'C3T — Currency Exchange API',
        'Monolithic API for exchange rate queries (Node.js, TypeScript, Fastify).',
        'Web scraping (Axios/Cheerio) with a cache-first strategy and background',
        'updates (cron) via Redis, plus filters, pagination, Docker, and Swagger docs.',
        '',
        'Tech: Node.js, TypeScript, Fastify, Redis, Docker, Swagger, Axios, Cheerio',
        'GitHub: https://github.com/gufernandess/c3t',
      ],
      pt: [
        'C3T — API de Câmbio Turismo',
        'API monolítica para consulta de cotações (Node.js, TypeScript, Fastify).',
        'Web scraping (Axios/Cheerio) com estratégia cache-first e atualizações em',
        'background (cron) via Redis, além de filtros, paginação, Docker e',
        'documentação com Swagger.',
        '',
        'Tecnologias: Node.js, TypeScript, Fastify, Redis, Docker, Swagger, Axios, Cheerio',
        'GitHub: https://github.com/gufernandess/c3t',
      ],
    },
  },
  {
    slug: 'vertex-cover',
    url: 'https://github.com/gufernandess/vertex_cover_pli',
    body: {
      en: [
        'Vertex Cover PLI',
        'Implementation related to the minimum vertex cover problem on snark graphs,',
        'built to support the research from my undergraduate thesis / paper',
        '"On the Minimum Vertex Cover of Snarks".',
        '',
        'GitHub: https://github.com/gufernandess/vertex_cover_pli',
      ],
      pt: [
        'Vertex Cover PLI',
        'Implementação relacionada ao problema da cobertura por vértices mínima em',
        'grafos snarks, desenvolvida para apoiar a pesquisa do meu TCC / artigo',
        '"On the Minimum Vertex Cover of Snarks".',
        '',
        'GitHub: https://github.com/gufernandess/vertex_cover_pli',
      ],
    },
  },
];

export const projectsMenuTitle: Localized<string> = {
  en: 'Main projects:',
  pt: 'Projetos principais:',
};

export const projectsHint: Localized<string> = {
  en: 'Type "projects goto <name>" to open the GitHub repository.',
  pt: 'Digite "projects goto <nome>" para abrir o repositório no GitHub.',
};
```

- [ ] **Step 6: Create `src/content/contacts.ts`**

```ts
import type { Localized } from '../types';

export interface ContactEntry {
  slug: string;
  kind: 'url' | 'email';
  value: string;
}

export const contacts: ContactEntry[] = [
  { slug: 'linkedin', kind: 'url', value: 'https://www.linkedin.com/in/gustafernandes/' },
  { slug: 'github', kind: 'url', value: 'https://github.com/gufernandess' },
  { slug: 'lattes', kind: 'url', value: 'http://lattes.cnpq.br/2141189939286232' },
  { slug: 'email', kind: 'email', value: 'gustavofernandescc@gmail.com' },
];

export const contactsMenuTitle: Localized<string> = {
  en: 'Contacts:',
  pt: 'Contatos:',
};

export const contactsHint: Localized<string> = {
  en: 'Type "contacts goto <name>" to open.',
  pt: 'Digite "contacts goto <nome>" para abrir.',
};
```

- [ ] **Step 7: Create `src/content/misc.ts`**

```ts
import type { Localized } from '../types';

export const welcomeText: Localized<string[]> = {
  en: [
    'Welcome to my terminal portfolio.',
    'Type "help" to see available commands, or "about" to start.',
  ],
  pt: [
    'Bem-vindo ao meu portfólio em formato de terminal.',
    'Digite "help" para ver os comandos disponíveis, ou "about" para começar.',
  ],
};

export interface HelpEntry {
  command: string;
  description: Localized<string>;
}

export const helpMenuTitle: Localized<string> = {
  en: 'Available commands:',
  pt: 'Comandos disponíveis:',
};

export const helpEntries: HelpEntry[] = [
  { command: 'welcome', description: { en: 'Show the welcome message', pt: 'Mostra a mensagem de boas-vindas' } },
  { command: 'help', description: { en: 'List available commands', pt: 'Lista os comandos disponíveis' } },
  { command: 'about', description: { en: 'About me, skills, workspace, hobbies, languages', pt: 'Sobre mim, habilidades, setup, hobbies, idiomas' } },
  { command: 'education', description: { en: 'Academic background', pt: 'Formação acadêmica' } },
  { command: 'papers', description: { en: 'Academic papers', pt: 'Artigos acadêmicos' } },
  { command: 'career', description: { en: 'Professional experience', pt: 'Experiência profissional' } },
  { command: 'projects', description: { en: 'Main projects', pt: 'Projetos principais' } },
  { command: 'contacts', description: { en: 'Contact and social links', pt: 'Contato e redes sociais' } },
  { command: 'gui', description: { en: 'Open the graphical version of this portfolio', pt: 'Abre a versão gráfica deste portfólio' } },
  { command: 'language', description: { en: 'Switch interface language (english/portuguese)', pt: 'Troca o idioma da interface (english/portuguese)' } },
  { command: 'clear', description: { en: 'Clear the terminal', pt: 'Limpa o terminal' } },
  { command: 'echo', description: { en: 'Print the given text', pt: 'Ecoa o texto fornecido' } },
  { command: 'history', description: { en: 'List commands run this session', pt: 'Lista os comandos executados nesta sessão' } },
];

export const historyMenuTitle: Localized<string> = {
  en: 'Command history:',
  pt: 'Histórico de comandos:',
};

export const guiText: Localized<string[]> = {
  en: ['Opening the graphical portfolio in a new tab...'],
  pt: ['Abrindo o portfólio gráfico em uma nova aba...'],
};

export const guiUrl = 'https://gustavofernandes.netlify.app/';
```

- [ ] **Step 8: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0, no output.

- [ ] **Step 9: Commit**

```bash
git add src/content/about.ts src/content/education.ts src/content/papers.ts src/content/career.ts src/content/projects.ts src/content/contacts.ts src/content/misc.ts
git commit -m "Add typed content data ported from CONTENT_DRAFT.md"
```

---

### Task 7: `welcome` command

**Files:**
- Create: `src/commands/welcome.ts`
- Test: `src/commands/welcome.test.ts`

**Interfaces:**
- Consumes: `CommandHandler` (types), `resolveText`, `welcomeText` (content/misc), `localizedTextEntry` (entries).
- Produces: `welcome: CommandHandler`. Registered in Task 20.

- [ ] **Step 1: Write the failing tests**

```ts
// src/commands/welcome.test.ts
import { describe, expect, it } from 'vitest';
import { welcome } from './welcome';

describe('welcome command', () => {
  it('returns the English welcome text', () => {
    const result = welcome([], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({
      kind: 'text',
      lines: [
        'Welcome to my terminal portfolio.',
        'Type "help" to see available commands, or "about" to start.',
      ],
    });
  });

  it('returns the Portuguese welcome text', () => {
    const result = welcome([], { language: 'pt', history: [] });
    expect(result.entries[0]).toMatchObject({
      kind: 'text',
      lines: [
        'Bem-vindo ao meu portfólio em formato de terminal.',
        'Digite "help" para ver os comandos disponíveis, ou "about" para começar.',
      ],
    });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test -- welcome`
Expected: FAIL — `Cannot find module './welcome'`.

- [ ] **Step 3: Create `src/commands/welcome.ts`**

```ts
import type { CommandHandler } from '../types';
import { welcomeText } from '../content/misc';
import { localizedTextEntry } from './entries';

export const welcome: CommandHandler = (_args, ctx) => ({
  entries: [localizedTextEntry(welcomeText, ctx.language)],
});
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test -- welcome`
Expected: PASS — 2 passed.

- [ ] **Step 5: Commit**

```bash
git add src/commands/welcome.ts src/commands/welcome.test.ts
git commit -m "Add welcome command"
```

---

### Task 8: `help` command

**Files:**
- Create: `src/commands/help.ts`
- Test: `src/commands/help.test.ts`

**Interfaces:**
- Consumes: `CommandHandler`, `ListItem` (types), `resolveText`, `helpEntries`, `helpMenuTitle` (content/misc), `listEntry` (entries).
- Produces: `help: CommandHandler`. Registered in Task 20.

- [ ] **Step 1: Write the failing test**

```ts
// src/commands/help.test.ts
import { describe, expect, it } from 'vitest';
import { help } from './help';
import { helpEntries } from '../content/misc';

describe('help command', () => {
  it('lists every registered command with a description', () => {
    const result = help([], { language: 'en', history: [] });
    const entry = result.entries[0];
    expect(entry.kind).toBe('list');
    if (entry.kind === 'list') {
      expect(entry.items).toHaveLength(helpEntries.length);
      expect(entry.items[0]).toMatchObject({ label: 'welcome' });
    }
  });

  it('localizes descriptions', () => {
    const result = help([], { language: 'pt', history: [] });
    const entry = result.entries[0];
    if (entry.kind === 'list' && typeof entry.items[0] === 'object') {
      expect(entry.items[0]).toMatchObject({
        label: 'welcome',
        description: 'Mostra a mensagem de boas-vindas',
      });
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- help`
Expected: FAIL — `Cannot find module './help'`.

- [ ] **Step 3: Create `src/commands/help.ts`**

```ts
import type { CommandHandler, ListItem } from '../types';
import { resolveText } from '../i18n/resolveText';
import { helpEntries, helpMenuTitle } from '../content/misc';
import { listEntry } from './entries';

export const help: CommandHandler = (_args, ctx) => {
  const items: ListItem[] = helpEntries.map((entry) => ({
    label: entry.command,
    description: resolveText(entry.description, ctx.language),
  }));
  return { entries: [listEntry(resolveText(helpMenuTitle, ctx.language), items)] };
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- help`
Expected: PASS — 2 passed.

- [ ] **Step 5: Commit**

```bash
git add src/commands/help.ts src/commands/help.test.ts
git commit -m "Add help command"
```

---

### Task 9: `about` command

**Files:**
- Create: `src/commands/about.ts`
- Test: `src/commands/about.test.ts`

**Interfaces:**
- Consumes: `CommandHandler`, `ListItem` (types), `resolveText`, all `about*` exports from `content/about.ts`, `textEntry`/`localizedTextEntry`/`listEntry`/`errorEntry` (entries).
- Produces: `about: CommandHandler`. Registered in Task 20.

- [ ] **Step 1: Write the failing tests**

```ts
// src/commands/about.test.ts
import { describe, expect, it } from 'vitest';
import { about } from './about';

describe('about command', () => {
  it('shows the bio and the subcommand menu when called with no args', () => {
    const result = about([], { language: 'en', history: [] });
    expect(result.entries).toHaveLength(2);
    expect(result.entries[0].kind).toBe('text');
    expect(result.entries[1].kind).toBe('list');
  });

  it('shows skills for "about skills"', () => {
    const result = about(['skills'], { language: 'en', history: [] });
    const entry = result.entries[0];
    expect(entry).toMatchObject({ kind: 'list', title: 'gustavo.skills' });
    if (entry.kind === 'list') {
      expect(entry.items).toContain('TypeScript');
    }
  });

  it('localizes hobbies by language', () => {
    const en = about(['hobbies'], { language: 'en', history: [] });
    const pt = about(['hobbies'], { language: 'pt', history: [] });
    expect(en.entries[0]).toMatchObject({ items: ['Reading', 'Gym', 'Running', 'Coding'] });
    expect(pt.entries[0]).toMatchObject({
      items: ['Leitura', 'Academia', 'Corrida', 'Programação'],
    });
  });

  it('returns an error for an unknown subcommand', () => {
    const result = about(['nope'], { language: 'en', history: [] });
    expect(result.entries[0].kind).toBe('error');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test -- about`
Expected: FAIL — `Cannot find module './about'`.

- [ ] **Step 3: Create `src/commands/about.ts`**

```ts
import type { CommandHandler, ListItem } from '../types';
import { resolveText } from '../i18n/resolveText';
import {
  aboutBio,
  aboutSkills,
  aboutWorkspace,
  aboutHobbies,
  aboutLanguages,
  aboutMenuTitle,
  aboutHint,
  aboutSubcommandDescriptions,
} from '../content/about';
import { localizedTextEntry, listEntry, errorEntry } from './entries';

export const about: CommandHandler = (args, ctx) => {
  const sub = (args[0] ?? '').toLowerCase();

  if (sub === '') {
    const items: ListItem[] = aboutSubcommandDescriptions.map((s) => ({
      label: s.label,
      description: resolveText(s.description, ctx.language),
    }));
    return {
      entries: [
        localizedTextEntry(aboutBio, ctx.language),
        listEntry(
          resolveText(aboutMenuTitle, ctx.language),
          items,
          resolveText(aboutHint, ctx.language),
        ),
      ],
    };
  }

  if (sub === 'skills') {
    return { entries: [listEntry('gustavo.skills', aboutSkills)] };
  }
  if (sub === 'workspace') {
    return { entries: [listEntry('gustavo.workspace', aboutWorkspace)] };
  }
  if (sub === 'hobbies') {
    return { entries: [listEntry('gustavo.hobbies', resolveText(aboutHobbies, ctx.language))] };
  }
  if (sub === 'languages') {
    return {
      entries: [listEntry('gustavo.languages', resolveText(aboutLanguages, ctx.language))],
    };
  }

  return {
    entries: [
      errorEntry(
        ctx.language === 'en'
          ? `Unknown "about" subcommand: ${sub}`
          : `Subcomando de "about" desconhecido: ${sub}`,
      ),
    ],
  };
};
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test -- about`
Expected: PASS — 4 passed.

- [ ] **Step 5: Commit**

```bash
git add src/commands/about.ts src/commands/about.test.ts
git commit -m "Add about command with skills/workspace/hobbies/languages subcommands"
```

---

### Task 10: `education` command

**Files:**
- Create: `src/commands/education.ts`
- Test: `src/commands/education.test.ts`

**Interfaces:**
- Consumes: `CommandHandler` (types), `educationText` (content/education), `localizedTextEntry` (entries).
- Produces: `education: CommandHandler`. Registered in Task 20.

- [ ] **Step 1: Write the failing test**

```ts
// src/commands/education.test.ts
import { describe, expect, it } from 'vitest';
import { education } from './education';

describe('education command', () => {
  it('returns the education text block', () => {
    const result = education([], { language: 'en', history: [] });
    const entry = result.entries[0];
    expect(entry.kind).toBe('text');
    if (entry.kind === 'text') {
      expect(entry.lines[0]).toBe('Federal University of Ceará (UFC) — Quixadá, CE, Brazil');
    }
  });

  it('returns the Portuguese education text block', () => {
    const result = education([], { language: 'pt', history: [] });
    const entry = result.entries[0];
    if (entry.kind === 'text') {
      expect(entry.lines[0]).toBe('Universidade Federal do Ceará (UFC) — Quixadá, CE, Brasil');
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- education`
Expected: FAIL — `Cannot find module './education'`.

- [ ] **Step 3: Create `src/commands/education.ts`**

```ts
import type { CommandHandler } from '../types';
import { educationText } from '../content/education';
import { localizedTextEntry } from './entries';

export const education: CommandHandler = (_args, ctx) => ({
  entries: [localizedTextEntry(educationText, ctx.language)],
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- education`
Expected: PASS — 2 passed.

- [ ] **Step 5: Commit**

```bash
git add src/commands/education.ts src/commands/education.test.ts
git commit -m "Add education command"
```

---

### Task 11: `papers` command

**Files:**
- Create: `src/commands/papers.ts`
- Test: `src/commands/papers.test.ts`

**Interfaces:**
- Consumes: `CommandHandler` (types), `resolveText`, `papers as papersList`, `papersMenuTitle`, `papersHint` (content/papers), `listEntry`/`localizedTextEntry`/`errorEntry` (entries).
- Produces: `papers: CommandHandler`. Registered in Task 20.

- [ ] **Step 1: Write the failing tests**

```ts
// src/commands/papers.test.ts
import { describe, expect, it } from 'vitest';
import { papers } from './papers';

describe('papers command', () => {
  it('lists available papers when called with no args', () => {
    const result = papers([], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({
      kind: 'list',
      items: ['vertex-cover-snarks', 'genetic-algorithms'],
    });
  });

  it('shows a paper detail by exact slug', () => {
    const result = papers(['genetic-algorithms'], { language: 'en', history: [] });
    const entry = result.entries[0];
    expect(entry.kind).toBe('text');
    if (entry.kind === 'text') {
      expect(entry.lines[0]).toBe('A Study on Genetic Algorithms');
    }
  });

  it('matches free text with spaces standing in for hyphens', () => {
    const result = papers(['Vertex', 'Cover', 'Snarks'], { language: 'en', history: [] });
    expect(result.entries[0].kind).toBe('text');
  });

  it('returns a "not found" error for an unknown paper', () => {
    const result = papers(['unknown-paper'], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'error' });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test -- papers`
Expected: FAIL — `Cannot find module './papers'`.

- [ ] **Step 3: Create `src/commands/papers.ts`**

```ts
import type { CommandHandler } from '../types';
import { resolveText } from '../i18n/resolveText';
import { papers as papersList, papersMenuTitle, papersHint } from '../content/papers';
import { listEntry, localizedTextEntry, errorEntry } from './entries';

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/[\s-]+/g, '-');
}

export const papers: CommandHandler = (args, ctx) => {
  if (args.length === 0) {
    return {
      entries: [
        listEntry(
          resolveText(papersMenuTitle, ctx.language),
          papersList.map((p) => p.slug),
          resolveText(papersHint, ctx.language),
        ),
      ],
    };
  }

  const query = normalize(args.join(' '));
  const paper = papersList.find((p) => normalize(p.slug) === query);
  if (!paper) {
    return {
      entries: [
        errorEntry(
          ctx.language === 'en'
            ? `Paper not found: ${args.join(' ')}`
            : `Artigo não encontrado: ${args.join(' ')}`,
        ),
      ],
    };
  }

  return { entries: [localizedTextEntry(paper.body, ctx.language)] };
};
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test -- papers`
Expected: PASS — 4 passed.

- [ ] **Step 5: Commit**

```bash
git add src/commands/papers.ts src/commands/papers.test.ts
git commit -m "Add papers command"
```

---

### Task 12: `career` command

**Files:**
- Create: `src/commands/career.ts`
- Test: `src/commands/career.test.ts`

**Interfaces:**
- Consumes: `CommandHandler` (types), `resolveText`, `career as careerList`, `careerMenuTitle`, `careerHint` (content/career), `listEntry`/`localizedTextEntry`/`errorEntry` (entries).
- Produces: `career: CommandHandler`. Registered in Task 20.

- [ ] **Step 1: Write the failing tests**

```ts
// src/commands/career.test.ts
import { describe, expect, it } from 'vitest';
import { career } from './career';

describe('career command', () => {
  it('lists companies when called with no args', () => {
    const result = career([], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({
      kind: 'list',
      items: ['nextpage', 'jit-technology', 'tropa-concursos', 'shotokawa-comics', 'gera3-sistemas'],
    });
  });

  it('shows a company detail by exact slug', () => {
    const result = career(['nextpage'], { language: 'en', history: [] });
    const entry = result.entries[0];
    expect(entry.kind).toBe('text');
    if (entry.kind === 'text') {
      expect(entry.lines[0]).toBe('NextPage — Remote');
    }
  });

  it('matches free text with spaces standing in for hyphens', () => {
    const result = career(['jit', 'technology'], { language: 'en', history: [] });
    expect(result.entries[0].kind).toBe('text');
  });

  it('returns a "not found" error for an unknown company', () => {
    const result = career(['nowhere'], { language: 'pt', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'error' });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test -- career`
Expected: FAIL — `Cannot find module './career'`.

- [ ] **Step 3: Create `src/commands/career.ts`**

```ts
import type { CommandHandler } from '../types';
import { resolveText } from '../i18n/resolveText';
import { career as careerList, careerMenuTitle, careerHint } from '../content/career';
import { listEntry, localizedTextEntry, errorEntry } from './entries';

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/[\s-]+/g, '-');
}

export const career: CommandHandler = (args, ctx) => {
  if (args.length === 0) {
    return {
      entries: [
        listEntry(
          resolveText(careerMenuTitle, ctx.language),
          careerList.map((c) => c.slug),
          resolveText(careerHint, ctx.language),
        ),
      ],
    };
  }

  const query = normalize(args.join(' '));
  const entry = careerList.find((c) => normalize(c.slug) === query);
  if (!entry) {
    return {
      entries: [
        errorEntry(
          ctx.language === 'en'
            ? `Company not found: ${args.join(' ')}`
            : `Empresa não encontrada: ${args.join(' ')}`,
        ),
      ],
    };
  }

  return { entries: [localizedTextEntry(entry.body, ctx.language)] };
};
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test -- career`
Expected: PASS — 4 passed.

- [ ] **Step 5: Commit**

```bash
git add src/commands/career.ts src/commands/career.test.ts
git commit -m "Add career command"
```

---

### Task 13: `projects` command

**Files:**
- Create: `src/commands/projects.ts`
- Test: `src/commands/projects.test.ts`

**Interfaces:**
- Consumes: `CommandHandler` (types), `resolveText`, `projects as projectsList`, `projectsMenuTitle`, `projectsHint` (content/projects), `listEntry`/`localizedTextEntry`/`errorEntry` (entries).
- Produces: `projects: CommandHandler`. Registered in Task 20.

- [ ] **Step 1: Write the failing tests**

```ts
// src/commands/projects.test.ts
import { describe, expect, it } from 'vitest';
import { projects } from './projects';

describe('projects command', () => {
  it('lists projects when called with no args', () => {
    const result = projects([], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'list', items: ['c3t', 'vertex-cover'] });
    expect(result.effect).toBeUndefined();
  });

  it('returns a usage error when "goto" is missing', () => {
    const result = projects(['c3t'], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'error' });
  });

  it('shows project details and opens the GitHub URL on "goto"', () => {
    const result = projects(['goto', 'c3t'], { language: 'en', history: [] });
    expect(result.entries[0].kind).toBe('text');
    expect(result.effect).toEqual({
      type: 'open-url',
      url: 'https://github.com/gufernandess/c3t',
    });
  });

  it('returns a "not found" error for an unknown project', () => {
    const result = projects(['goto', 'nope'], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'error' });
    expect(result.effect).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test -- projects`
Expected: FAIL — `Cannot find module './projects'`.

- [ ] **Step 3: Create `src/commands/projects.ts`**

```ts
import type { CommandHandler } from '../types';
import { resolveText } from '../i18n/resolveText';
import { projects as projectsList, projectsMenuTitle, projectsHint } from '../content/projects';
import { listEntry, localizedTextEntry, errorEntry } from './entries';

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/[\s-]+/g, '-');
}

export const projects: CommandHandler = (args, ctx) => {
  if (args.length === 0) {
    return {
      entries: [
        listEntry(
          resolveText(projectsMenuTitle, ctx.language),
          projectsList.map((p) => p.slug),
          resolveText(projectsHint, ctx.language),
        ),
      ],
    };
  }

  const [sub, ...rest] = args;
  if (sub.toLowerCase() !== 'goto' || rest.length === 0) {
    return {
      entries: [
        errorEntry(
          ctx.language === 'en' ? 'Usage: projects goto <name>' : 'Uso: projects goto <nome>',
        ),
      ],
    };
  }

  const query = normalize(rest.join(' '));
  const project = projectsList.find((p) => normalize(p.slug) === query);
  if (!project) {
    return {
      entries: [
        errorEntry(
          ctx.language === 'en'
            ? `Project not found: ${rest.join(' ')}`
            : `Projeto não encontrado: ${rest.join(' ')}`,
        ),
      ],
    };
  }

  return {
    entries: [localizedTextEntry(project.body, ctx.language)],
    effect: { type: 'open-url', url: project.url },
  };
};
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test -- projects`
Expected: PASS — 4 passed.

- [ ] **Step 5: Commit**

```bash
git add src/commands/projects.ts src/commands/projects.test.ts
git commit -m "Add projects command"
```

---

### Task 14: `contacts` command

**Files:**
- Create: `src/commands/contacts.ts`
- Test: `src/commands/contacts.test.ts`

**Interfaces:**
- Consumes: `CommandHandler` (types), `resolveText`, `contacts as contactsList`, `contactsMenuTitle`, `contactsHint` (content/contacts), `listEntry`/`errorEntry`/`textEntry` (entries).
- Produces: `contacts: CommandHandler`. Registered in Task 20.

- [ ] **Step 1: Write the failing tests**

```ts
// src/commands/contacts.test.ts
import { describe, expect, it } from 'vitest';
import { contacts } from './contacts';

describe('contacts command', () => {
  it('lists contacts when called with no args', () => {
    const result = contacts([], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({
      kind: 'list',
      items: ['linkedin', 'github', 'lattes', 'email'],
    });
  });

  it('opens LinkedIn in a new tab via "goto linkedin"', () => {
    const result = contacts(['goto', 'linkedin'], { language: 'en', history: [] });
    expect(result.effect).toEqual({
      type: 'open-url',
      url: 'https://www.linkedin.com/in/gustafernandes/',
    });
  });

  it('uses mailto for "goto email" instead of opening a new tab', () => {
    const result = contacts(['goto', 'email'], { language: 'en', history: [] });
    expect(result.effect).toEqual({ type: 'mailto', address: 'gustavofernandescc@gmail.com' });
  });

  it('returns a "not found" error for an unknown contact', () => {
    const result = contacts(['goto', 'twitter'], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'error' });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test -- contacts`
Expected: FAIL — `Cannot find module './contacts'`.

- [ ] **Step 3: Create `src/commands/contacts.ts`**

```ts
import type { CommandHandler } from '../types';
import { resolveText } from '../i18n/resolveText';
import { contacts as contactsList, contactsMenuTitle, contactsHint } from '../content/contacts';
import { listEntry, errorEntry, textEntry } from './entries';

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/[\s-]+/g, '-');
}

export const contacts: CommandHandler = (args, ctx) => {
  if (args.length === 0) {
    return {
      entries: [
        listEntry(
          resolveText(contactsMenuTitle, ctx.language),
          contactsList.map((c) => c.slug),
          resolveText(contactsHint, ctx.language),
        ),
      ],
    };
  }

  const [sub, ...rest] = args;
  if (sub.toLowerCase() !== 'goto' || rest.length === 0) {
    return {
      entries: [
        errorEntry(
          ctx.language === 'en' ? 'Usage: contacts goto <name>' : 'Uso: contacts goto <nome>',
        ),
      ],
    };
  }

  const query = normalize(rest.join(' '));
  const contact = contactsList.find((c) => normalize(c.slug) === query);
  if (!contact) {
    return {
      entries: [
        errorEntry(
          ctx.language === 'en'
            ? `Contact not found: ${rest.join(' ')}`
            : `Contato não encontrado: ${rest.join(' ')}`,
        ),
      ],
    };
  }

  if (contact.kind === 'email') {
    return {
      entries: [textEntry([contact.value])],
      effect: { type: 'mailto', address: contact.value },
    };
  }

  return {
    entries: [textEntry([contact.value])],
    effect: { type: 'open-url', url: contact.value },
  };
};
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test -- contacts`
Expected: PASS — 4 passed.

- [ ] **Step 5: Commit**

```bash
git add src/commands/contacts.ts src/commands/contacts.test.ts
git commit -m "Add contacts command"
```

---

### Task 15: `gui` command

**Files:**
- Create: `src/commands/gui.ts`
- Test: `src/commands/gui.test.ts`

**Interfaces:**
- Consumes: `CommandHandler` (types), `guiText`, `guiUrl` (content/misc), `localizedTextEntry` (entries).
- Produces: `gui: CommandHandler`. Registered in Task 20.

- [ ] **Step 1: Write the failing test**

```ts
// src/commands/gui.test.ts
import { describe, expect, it } from 'vitest';
import { gui } from './gui';

describe('gui command', () => {
  it('opens the graphical portfolio in a new tab', () => {
    const result = gui([], { language: 'en', history: [] });
    expect(result.effect).toEqual({
      type: 'open-url',
      url: 'https://gustavofernandes.netlify.app/',
    });
    expect(result.entries[0].kind).toBe('text');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- gui`
Expected: FAIL — `Cannot find module './gui'`.

- [ ] **Step 3: Create `src/commands/gui.ts`**

```ts
import type { CommandHandler } from '../types';
import { guiText, guiUrl } from '../content/misc';
import { localizedTextEntry } from './entries';

export const gui: CommandHandler = (_args, ctx) => ({
  entries: [localizedTextEntry(guiText, ctx.language)],
  effect: { type: 'open-url', url: guiUrl },
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- gui`
Expected: PASS — 1 passed.

- [ ] **Step 5: Commit**

```bash
git add src/commands/gui.ts src/commands/gui.test.ts
git commit -m "Add gui command"
```

---

### Task 16: `language` command

**Files:**
- Create: `src/commands/language.ts`
- Test: `src/commands/language.test.ts`

**Interfaces:**
- Consumes: `CommandHandler` (types), `textEntry`/`errorEntry` (entries).
- Produces: `language: CommandHandler`. Registered in Task 20.

- [ ] **Step 1: Write the failing tests**

```ts
// src/commands/language.test.ts
import { describe, expect, it } from 'vitest';
import { language } from './language';

describe('language command', () => {
  it('switches to Portuguese and confirms in Portuguese', () => {
    const result = language(['portuguese'], { language: 'en', history: [] });
    expect(result.effect).toEqual({ type: 'set-language', language: 'pt' });
    expect(result.entries[0]).toMatchObject({
      kind: 'text',
      lines: ['Idioma definido para português.'],
    });
  });

  it('switches to English and confirms in English', () => {
    const result = language(['english'], { language: 'pt', history: [] });
    expect(result.effect).toEqual({ type: 'set-language', language: 'en' });
    expect(result.entries[0]).toMatchObject({ kind: 'text', lines: ['Language set to English.'] });
  });

  it('is case-insensitive', () => {
    const result = language(['PORTUGUESE'], { language: 'en', history: [] });
    expect(result.effect).toEqual({ type: 'set-language', language: 'pt' });
  });

  it('returns a usage error for an unrecognized argument', () => {
    const result = language(['french'], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'error' });
    expect(result.effect).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test -- language`
Expected: FAIL — `Cannot find module './language'`.

- [ ] **Step 3: Create `src/commands/language.ts`**

```ts
import type { CommandHandler, Language } from '../types';
import { textEntry, errorEntry } from './entries';

const languageMap: Record<string, Language> = {
  english: 'en',
  portuguese: 'pt',
};

export const language: CommandHandler = (args, ctx) => {
  const target = (args[0] ?? '').toLowerCase();
  const next = languageMap[target];

  if (!next) {
    return {
      entries: [
        errorEntry(
          ctx.language === 'en'
            ? 'Usage: language english | language portuguese'
            : 'Uso: language english | language portuguese',
        ),
      ],
    };
  }

  return {
    entries: [
      textEntry([next === 'en' ? 'Language set to English.' : 'Idioma definido para português.']),
    ],
    effect: { type: 'set-language', language: next },
  };
};
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test -- language`
Expected: PASS — 4 passed.

- [ ] **Step 5: Commit**

```bash
git add src/commands/language.ts src/commands/language.test.ts
git commit -m "Add language command"
```

---

### Task 17: `clear` command

**Files:**
- Create: `src/commands/clear.ts`
- Test: `src/commands/clear.test.ts`

**Interfaces:**
- Consumes: `CommandHandler` (types).
- Produces: `clear: CommandHandler`. Registered in Task 20; its `{ type: 'clear' }` effect is handled by the reducer in Task 22.

- [ ] **Step 1: Write the failing test**

```ts
// src/commands/clear.test.ts
import { describe, expect, it } from 'vitest';
import { clear } from './clear';

describe('clear command', () => {
  it('returns no entries and a clear effect', () => {
    const result = clear([], { language: 'en', history: [] });
    expect(result).toEqual({ entries: [], effect: { type: 'clear' } });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- clear`
Expected: FAIL — `Cannot find module './clear'`.

- [ ] **Step 3: Create `src/commands/clear.ts`**

```ts
import type { CommandHandler } from '../types';

export const clear: CommandHandler = () => ({ entries: [], effect: { type: 'clear' } });
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- clear`
Expected: PASS — 1 passed.

- [ ] **Step 5: Commit**

```bash
git add src/commands/clear.ts src/commands/clear.test.ts
git commit -m "Add clear command"
```

---

### Task 18: `echo` command

**Files:**
- Create: `src/commands/echo.ts`
- Test: `src/commands/echo.test.ts`

**Interfaces:**
- Consumes: `CommandHandler` (types), `textEntry` (entries).
- Produces: `echo: CommandHandler`. Registered in Task 20.

- [ ] **Step 1: Write the failing tests**

```ts
// src/commands/echo.test.ts
import { describe, expect, it } from 'vitest';
import { echo } from './echo';

describe('echo command', () => {
  it('echoes the given argument', () => {
    const result = echo(['hello', 'world'], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'text', lines: ['hello world'] });
  });

  it('echoes an empty line when called with no args', () => {
    const result = echo([], { language: 'en', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'text', lines: [''] });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test -- echo`
Expected: FAIL — `Cannot find module './echo'`.

- [ ] **Step 3: Create `src/commands/echo.ts`**

```ts
import type { CommandHandler } from '../types';
import { textEntry } from './entries';

export const echo: CommandHandler = (args) => ({ entries: [textEntry([args.join(' ')])] });
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test -- echo`
Expected: PASS — 2 passed.

- [ ] **Step 5: Commit**

```bash
git add src/commands/echo.ts src/commands/echo.test.ts
git commit -m "Add echo command"
```

---

### Task 19: `history` command

**Files:**
- Create: `src/commands/history.ts`
- Test: `src/commands/history.test.ts`

**Interfaces:**
- Consumes: `CommandHandler` (types), `resolveText`, `historyMenuTitle` (content/misc), `listEntry` (entries). Reads `ctx.history`.
- Produces: `history: CommandHandler`. Registered in Task 20.

- [ ] **Step 1: Write the failing tests**

```ts
// src/commands/history.test.ts
import { describe, expect, it } from 'vitest';
import { history } from './history';

describe('history command', () => {
  it('lists prior commands from context in order', () => {
    const result = history([], { language: 'en', history: ['welcome', 'about', 'help'] });
    expect(result.entries[0]).toMatchObject({ kind: 'list', items: ['welcome', 'about', 'help'] });
  });

  it('shows an empty list when no commands have run yet', () => {
    const result = history([], { language: 'pt', history: [] });
    expect(result.entries[0]).toMatchObject({ kind: 'list', items: [] });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test -- history`
Expected: FAIL — `Cannot find module './history'`.

- [ ] **Step 3: Create `src/commands/history.ts`**

```ts
import type { CommandHandler } from '../types';
import { resolveText } from '../i18n/resolveText';
import { historyMenuTitle } from '../content/misc';
import { listEntry } from './entries';

export const history: CommandHandler = (_args, ctx) => ({
  entries: [listEntry(resolveText(historyMenuTitle, ctx.language), ctx.history)],
});
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test -- history`
Expected: PASS — 2 passed.

- [ ] **Step 5: Commit**

```bash
git add src/commands/history.ts src/commands/history.test.ts
git commit -m "Add history command"
```

---

### Task 20: Command registry and dispatch

**Files:**
- Create: `src/commands/registry.ts`
- Create: `src/commands/run.ts`
- Test: `src/commands/run.test.ts`

**Interfaces:**
- Consumes: all 13 command handlers (Tasks 7–19), `parseInput` (Task 4), `errorEntry`/`commandNotFoundMessage` (Task 5), `CommandContext`/`CommandResult` (Task 2).
- Produces: `registry: Record<string, CommandHandler>`, `runCommand(raw: string, ctx: CommandContext): CommandResult | null`. Consumed by `TerminalContext` (Task 22) and `getCompletions` (Task 21).

- [ ] **Step 1: Create `src/commands/registry.ts`**

```ts
import type { CommandHandler } from '../types';
import { welcome } from './welcome';
import { help } from './help';
import { about } from './about';
import { education } from './education';
import { papers } from './papers';
import { career } from './career';
import { projects } from './projects';
import { contacts } from './contacts';
import { gui } from './gui';
import { language } from './language';
import { clear } from './clear';
import { echo } from './echo';
import { history } from './history';

export const registry: Record<string, CommandHandler> = {
  welcome,
  help,
  about,
  education,
  papers,
  career,
  projects,
  contacts,
  gui,
  language,
  clear,
  echo,
  history,
};
```

- [ ] **Step 2: Write the failing tests for `runCommand`**

```ts
// src/commands/run.test.ts
import { describe, expect, it } from 'vitest';
import { runCommand } from './run';

describe('runCommand', () => {
  it('returns null for blank input', () => {
    expect(runCommand('   ', { language: 'en', history: [] })).toBeNull();
  });

  it('returns a "command not found" error in English', () => {
    const result = runCommand('doesnotexist', { language: 'en', history: [] });
    expect(result?.entries[0]).toMatchObject({
      kind: 'error',
      message: 'command not found: doesnotexist',
    });
  });

  it('returns a "comando não encontrado" error in Portuguese', () => {
    const result = runCommand('doesnotexist', { language: 'pt', history: [] });
    expect(result?.entries[0]).toMatchObject({
      kind: 'error',
      message: 'comando não encontrado: doesnotexist',
    });
  });

  it('dispatches to the matching handler, case-insensitively', () => {
    const result = runCommand('ECHO hello world', { language: 'en', history: [] });
    expect(result?.entries[0]).toMatchObject({ kind: 'text', lines: ['hello world'] });
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `pnpm test -- run`
Expected: FAIL — `Cannot find module './run'`.

- [ ] **Step 4: Create `src/commands/run.ts`**

```ts
import type { CommandContext, CommandResult } from '../types';
import { parseInput } from './parser';
import { registry } from './registry';
import { errorEntry, commandNotFoundMessage } from './entries';

export function runCommand(raw: string, ctx: CommandContext): CommandResult | null {
  const { command, rest } = parseInput(raw);
  if (command === '') return null;

  const handler = registry[command];
  if (!handler) {
    return { entries: [errorEntry(commandNotFoundMessage(command, ctx.language))] };
  }

  return handler(rest, ctx);
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `pnpm test -- run`
Expected: PASS — 4 passed.

- [ ] **Step 6: Run the full test suite**

Run: `pnpm test`
Expected: all 16 test files pass (`resolveText`, `parser`, the 13 command handlers, `run`).

- [ ] **Step 7: Commit**

```bash
git add src/commands/registry.ts src/commands/run.ts src/commands/run.test.ts
git commit -m "Add command registry and runCommand dispatcher"
```

---

### Task 21: Autocomplete

**Files:**
- Create: `src/commands/autocomplete.ts`
- Test: `src/commands/autocomplete.test.ts`

**Interfaces:**
- Consumes: `registry` (Task 20).
- Produces: `getCompletions(raw: string): string[]`. Consumed by `CommandInput` (Task 25).

- [ ] **Step 1: Write the failing tests**

```ts
// src/commands/autocomplete.test.ts
import { describe, expect, it } from 'vitest';
import { getCompletions } from './autocomplete';

describe('getCompletions', () => {
  it('completes a unique command prefix', () => {
    expect(getCompletions('hel')).toEqual(['help']);
  });

  it('returns every command for an empty prefix', () => {
    expect(getCompletions('')).toContain('career');
  });

  it('completes fixed subcommands for a known command', () => {
    expect(getCompletions('about sk')).toEqual(['skills']);
  });

  it('returns no completions for free-text arguments', () => {
    expect(getCompletions('career jit')).toEqual([]);
  });

  it('returns multiple candidates sharing a command prefix', () => {
    expect(getCompletions('about ')).toEqual(['skills', 'workspace', 'hobbies', 'languages']);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test -- autocomplete`
Expected: FAIL — `Cannot find module './autocomplete'`.

- [ ] **Step 3: Create `src/commands/autocomplete.ts`**

```ts
import { registry } from './registry';

const commandNames = Object.keys(registry);

const fixedSubcommands: Record<string, string[]> = {
  about: ['skills', 'workspace', 'hobbies', 'languages'],
  contacts: ['goto'],
  projects: ['goto'],
  language: ['english', 'portuguese'],
};

export function getCompletions(raw: string): string[] {
  const tokens = raw.split(/\s+/);

  if (tokens.length <= 1) {
    const prefix = (tokens[0] ?? '').toLowerCase();
    return commandNames.filter((name) => name.startsWith(prefix));
  }

  const [command, ...rest] = tokens;
  const subs = fixedSubcommands[command.toLowerCase()];
  if (!subs || rest.length > 1) return [];

  const prefix = (rest[0] ?? '').toLowerCase();
  return subs.filter((sub) => sub.startsWith(prefix));
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test -- autocomplete`
Expected: PASS — 5 passed.

- [ ] **Step 5: Commit**

```bash
git add src/commands/autocomplete.ts src/commands/autocomplete.test.ts
git commit -m "Add Tab-autocomplete for commands and fixed subcommands"
```

---

### Task 22: Terminal state (Context + useReducer)

**Files:**
- Create: `src/context/TerminalContext.tsx`
- Test: none (React state layer; exercised manually in Task 27)

**Interfaces:**
- Consumes: `runCommand` (Task 20), `CommandEffect`/`Language`/`OutputEntry` (Task 2).
- Produces: `TerminalProvider` (component), `useTerminal(): { language: Language; history: string[]; log: OutputEntry[]; executeLine: (raw: string) => void }`. Consumed by `App.tsx` (Task 27), `TerminalWindow` (Task 26), `CommandInput` (Task 25).

- [ ] **Step 1: Create `src/context/TerminalContext.tsx`**

```tsx
import { createContext, useCallback, useContext, useReducer, type ReactNode } from 'react';
import type { CommandEffect, Language, OutputEntry } from '../types';
import { runCommand } from '../commands/run';

interface TerminalState {
  language: Language;
  history: string[];
  log: OutputEntry[];
}

interface ExecuteCommandAction {
  type: 'EXECUTE_COMMAND';
  input: string;
  entries: OutputEntry[];
  effect?: CommandEffect;
}

const initialState: TerminalState = {
  language: 'en',
  history: [],
  log: [],
};

function commandEntry(input: string): OutputEntry {
  return { id: crypto.randomUUID(), kind: 'command', input };
}

function terminalReducer(state: TerminalState, action: ExecuteCommandAction): TerminalState {
  const history = [...state.history, action.input];

  if (action.effect?.type === 'clear') {
    return { ...state, history, log: [] };
  }

  const language =
    action.effect?.type === 'set-language' ? action.effect.language : state.language;
  const log = [...state.log, commandEntry(action.input), ...action.entries];

  return { ...state, history, log, language };
}

interface TerminalContextValue extends TerminalState {
  executeLine: (raw: string) => void;
}

const TerminalContext = createContext<TerminalContextValue | null>(null);

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(terminalReducer, initialState);

  const executeLine = useCallback(
    (raw: string) => {
      const result = runCommand(raw, { language: state.language, history: state.history });
      if (!result) return;

      if (result.effect?.type === 'open-url') {
        window.open(result.effect.url, '_blank', 'noopener,noreferrer');
      }
      if (result.effect?.type === 'mailto') {
        window.location.href = `mailto:${result.effect.address}`;
      }

      dispatch({
        type: 'EXECUTE_COMMAND',
        input: raw,
        entries: result.entries,
        effect: result.effect,
      });
    },
    [state.language, state.history],
  );

  return (
    <TerminalContext.Provider value={{ ...state, executeLine }}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal(): TerminalContextValue {
  const ctx = useContext(TerminalContext);
  if (!ctx) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return ctx;
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0, no output.

- [ ] **Step 3: Commit**

```bash
git add src/context/TerminalContext.tsx
git commit -m "Add TerminalContext with useReducer-based command execution"
```

---

### Task 23: `ListOutput` component

**Files:**
- Create: `src/terminal/ListOutput.tsx`
- Test: none (UI; verified visually in Task 27)

**Interfaces:**
- Consumes: `ListItem` (Task 2), `theme` (Task 3, via styled-components `ThemeProvider` context).
- Produces: `ListOutput({ title, items, hint }: { title: string; items: string[] | ListItem[]; hint?: string })`. Consumed by `OutputLine` (Task 24).

- [ ] **Step 1: Create `src/terminal/ListOutput.tsx`**

```tsx
import styled from 'styled-components';
import type { ListItem } from '../types';

const Wrapper = styled.div`
  margin: 0.5em 0;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.cyan};
`;

const Items = styled.div`
  margin: 0.5em 0;
`;

const Item = styled.div`
  padding-left: 1em;
`;

const Arrow = styled.span`
  color: ${({ theme }) => theme.colors.comment};
  margin-right: 0.5em;
`;

const Label = styled.span`
  color: ${({ theme }) => theme.colors.yellow};
`;

const Description = styled.span`
  color: ${({ theme }) => theme.colors.foreground};
  margin-left: 1em;
`;

const Hint = styled.div`
  color: ${({ theme }) => theme.colors.comment};
`;

interface ListOutputProps {
  title: string;
  items: string[] | ListItem[];
  hint?: string;
}

function isListItemArray(items: string[] | ListItem[]): items is ListItem[] {
  return items.length > 0 && typeof items[0] === 'object';
}

export function ListOutput({ title, items, hint }: ListOutputProps) {
  const normalized: ListItem[] = isListItemArray(items)
    ? items
    : items.map((label) => ({ label }));

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Items>
        {normalized.map((item) => (
          <Item key={item.label}>
            <Arrow>→</Arrow>
            <Label>{item.label}</Label>
            {item.description ? <Description>{item.description}</Description> : null}
          </Item>
        ))}
      </Items>
      {hint ? <Hint>{hint}</Hint> : null}
    </Wrapper>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0, no output.

- [ ] **Step 3: Commit**

```bash
git add src/terminal/ListOutput.tsx
git commit -m "Add ListOutput component for menu-style command output"
```

---

### Task 24: `OutputLine` component

**Files:**
- Create: `src/terminal/OutputLine.tsx`
- Test: none (UI; verified visually in Task 27)

**Interfaces:**
- Consumes: `OutputEntry` (Task 2), `ListOutput` (Task 23), `theme` (Task 3).
- Produces: `OutputLine({ entry }: { entry: OutputEntry })`. Consumed by `TerminalWindow` (Task 26).

- [ ] **Step 1: Create `src/terminal/OutputLine.tsx`**

```tsx
import styled from 'styled-components';
import type { OutputEntry } from '../types';
import { ListOutput } from './ListOutput';

const Prompt = styled.span`
  color: ${({ theme }) => theme.colors.comment};
`;

const CommandText = styled.span`
  color: ${({ theme }) => theme.colors.foreground};
`;

const TextBlock = styled.div`
  white-space: pre-wrap;
`;

const ErrorBlock = styled.div`
  color: ${({ theme }) => theme.colors.red};
`;

interface OutputLineProps {
  entry: OutputEntry;
}

export function OutputLine({ entry }: OutputLineProps) {
  switch (entry.kind) {
    case 'command':
      return (
        <div>
          <Prompt>guest@gustavo:~$ </Prompt>
          <CommandText>{entry.input}</CommandText>
        </div>
      );
    case 'text':
      return <TextBlock>{entry.lines.join('\n')}</TextBlock>;
    case 'error':
      return <ErrorBlock>{entry.message}</ErrorBlock>;
    case 'list':
      return <ListOutput title={entry.title} items={entry.items} hint={entry.hint} />;
    default:
      return null;
  }
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0, no output.

- [ ] **Step 3: Commit**

```bash
git add src/terminal/OutputLine.tsx
git commit -m "Add OutputLine component to render each output entry kind"
```

---

### Task 25: `CommandInput` component

**Files:**
- Create: `src/terminal/CommandInput.tsx`
- Test: none (UI; verified manually in Task 27)

**Interfaces:**
- Consumes: `useTerminal` (Task 22), `getCompletions` (Task 21), `theme` (Task 3).
- Produces: `CommandInput()`. Consumed by `TerminalWindow` (Task 26).

- [ ] **Step 1: Create `src/terminal/CommandInput.tsx`**

```tsx
import { useState, type KeyboardEvent } from 'react';
import styled from 'styled-components';
import { useTerminal } from '../context/TerminalContext';
import { getCompletions } from '../commands/autocomplete';

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Prompt = styled.span`
  color: ${({ theme }) => theme.colors.comment};
  margin-right: 0.5em;
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.foreground};
  font-family: inherit;
  font-size: inherit;
`;

function longestCommonPrefix(values: string[]): string {
  if (values.length === 0) return '';
  return values.reduce((prefix, value) => {
    let i = 0;
    while (i < prefix.length && i < value.length && prefix[i] === value[i]) i += 1;
    return prefix.slice(0, i);
  });
}

export function CommandInput() {
  const { history, executeLine } = useTerminal();
  const [value, setValue] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      const raw = value;
      setValue('');
      setHistoryIndex(null);
      executeLine(raw);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setValue(history[nextIndex]);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setValue('');
      } else {
        setHistoryIndex(nextIndex);
        setValue(history[nextIndex]);
      }
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      const completions = getCompletions(value);
      if (completions.length === 0) return;

      // Tokenize the same way getCompletions does (raw value, not trimmed) so
      // the "last token" here always matches the prefix completions were computed from.
      const tokens = value.split(/\s+/);
      const lastToken = tokens[tokens.length - 1] ?? '';

      if (completions.length === 1) {
        tokens[tokens.length - 1] = completions[0];
        setValue(`${tokens.join(' ')} `);
        return;
      }

      const commonPrefix = longestCommonPrefix(completions);
      if (commonPrefix.length > lastToken.length) {
        tokens[tokens.length - 1] = commonPrefix;
        setValue(tokens.join(' '));
      }
    }
  }

  return (
    <Row>
      <Prompt>guest@gustavo:~$</Prompt>
      <Input
        autoFocus
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        aria-label="terminal command input"
      />
    </Row>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0, no output.

- [ ] **Step 3: Commit**

```bash
git add src/terminal/CommandInput.tsx
git commit -m "Add CommandInput with history navigation and Tab autocomplete"
```

---

### Task 26: `TerminalWindow` component

**Files:**
- Create: `src/terminal/TerminalWindow.tsx`
- Test: none (UI; verified manually in Task 27)

**Interfaces:**
- Consumes: `useTerminal` (Task 22), `OutputLine` (Task 24), `CommandInput` (Task 25).
- Produces: `TerminalWindow()`. Consumed by `App.tsx` (Task 27).

- [ ] **Step 1: Create `src/terminal/TerminalWindow.tsx`**

```tsx
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTerminal } from '../context/TerminalContext';
import { OutputLine } from './OutputLine';
import { CommandInput } from './CommandInput';

const Window = styled.div`
  height: 100vh;
  overflow-y: auto;
  padding: 1.5em;
`;

export function TerminalWindow() {
  const { log, executeLine } = useTerminal();
  const bottomRef = useRef<HTMLDivElement>(null);
  const hasRunWelcome = useRef(false);

  useEffect(() => {
    if (hasRunWelcome.current) return;
    hasRunWelcome.current = true;
    executeLine('welcome');
  }, [executeLine]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [log]);

  return (
    <Window>
      {log.map((entry) => (
        <OutputLine key={entry.id} entry={entry} />
      ))}
      <CommandInput />
      <div ref={bottomRef} />
    </Window>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0, no output.

- [ ] **Step 3: Commit**

```bash
git add src/terminal/TerminalWindow.tsx
git commit -m "Add TerminalWindow: renders output log, auto-runs welcome, auto-scrolls"
```

---

### Task 27: Wire up `App.tsx` and verify end-to-end

**Files:**
- Modify: `src/App.tsx` (replace the Task 1 placeholder)
- Test: none — this task's verification is the full test suite plus manual browser checks below

**Interfaces:**
- Consumes: `theme`/`GlobalStyle` (Task 3), `TerminalProvider` (Task 22), `TerminalWindow` (Task 26).
- Produces: the running application.

- [ ] **Step 1: Replace `src/App.tsx`**

```tsx
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import { GlobalStyle } from './theme/GlobalStyle';
import { TerminalProvider } from './context/TerminalContext';
import { TerminalWindow } from './terminal/TerminalWindow';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <TerminalProvider>
        <TerminalWindow />
      </TerminalProvider>
    </ThemeProvider>
  );
}
```

- [ ] **Step 2: Run the full test suite**

Run: `pnpm test`
Expected: every test file passes (parser, resolveText, autocomplete, run, and the 13 command handlers).

- [ ] **Step 3: Run the production build**

Run: `pnpm run build`
Expected: exits 0; output ends with a line starting `✓ built in`.

- [ ] **Step 4: Manually verify in the browser**

Run: `pnpm run dev`, then open the printed local URL.

Check, and fix any issue found before continuing:
- The `welcome` message appears automatically on load, styled per the Tokyo Night theme (dark background `#1a1b26`, light foreground text).
- Typing `help` shows the list of all 13 commands with descriptions, arrow-indented, cyan title.
- Typing `about` shows the bio followed by the 4-subcommand list; `about skills` shows `gustavo.skills` with the 12 skills.
- Typing `career` shows the 5 companies; `career jit-technology` (and `career jit technology`) shows the JIT Technology entry; `career nowhere` shows a red error.
- Typing `projects goto c3t` prints the project details and opens `https://github.com/gufernandess/c3t` in a new tab.
- Typing `contacts goto email` prints the address and triggers a `mailto:` navigation (same tab).
- Typing `language portuguese` switches all subsequent output (e.g. re-run `help`) to Portuguese; `language english` switches back.
- Pressing ArrowUp/ArrowDown cycles through previously entered commands in the input.
- Pressing Tab after typing `hel` completes to `help`; after typing `about ` (with trailing space) shows no visible change but a second Tab keeps working (multi-candidate case reaches the longest common prefix, which here is empty since the four subcommands share no common prefix).
- Typing `clear` empties the output log.
- Resizing the browser to ≤768px and ≤480px widths visibly shrinks the base font size.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "Wire up App: theme, TerminalProvider, TerminalWindow"
```
