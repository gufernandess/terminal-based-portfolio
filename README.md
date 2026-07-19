<p align="center">
  <img src="public/icon.svg" width="120" height="120" alt="Terminal icon" />
</p>

# Terminal-Based Portfolio

Portfólio pessoal simulando um terminal. Não há navegação de árvore de
arquivos nem estado de "diretório atual" — cada comando é resolvido de forma
independente a partir do input completo da linha, respondendo em texto puro
com o tema **Tokyo Night**.

## Stack

- React + TypeScript + Vite
- styled-components
- react-icons (ícones de tecnologias/linguagens nas tags de skills/career/projects)
- Vitest (parser e handlers de comando)
- pnpm

Parser de comandos e sistema de arquivos virtual são implementação própria,
sem lib externa.

## Rodando localmente

```bash
pnpm install
cp .env.example .env   # preencha os links do seu .env (veja abaixo)
pnpm dev
```

Outros scripts disponíveis:

```bash
pnpm build        # tsc --noEmit + vite build
pnpm preview       # serve o build de produção
pnpm test          # roda a suíte de testes (Vitest) uma vez
pnpm test:watch    # roda a suíte em modo watch
```

## Variáveis de ambiente

Todos os links externos usados no conteúdo (currículo, redes sociais,
repositórios de projetos, artigos) ficam em variáveis `VITE_*` num arquivo
`.env` na raiz do projeto, lidas via `src/env.ts`:

| Variável | Descrição |
| --- | --- |
| `VITE_REPO_URL` | Link do repositório, mostrado no `welcome` |
| `VITE_GUI_URL` | Versão gráfica do portfólio (`gui`) |
| `VITE_CV_URL_EN` / `VITE_CV_URL_PT` | PDF do currículo por idioma (`cv`) |
| `VITE_LINKEDIN_URL` | `contacts linkedin` |
| `VITE_GITHUB_PROFILE_URL` | `contacts github` |
| `VITE_LATTES_URL` | `contacts lattes` |
| `VITE_CONTACT_EMAIL` | `contacts email` (usa `mailto:`) |
| `VITE_PROJECT_C3T_URL` | Link do projeto C3T |
| `VITE_PROJECT_VERTEX_COVER_URL` | Link do projeto Vertex Cover PLI |
| `VITE_PAPER_VERTEX_COVER_PDF_URL` | PDF do artigo sobre vertex cover |
| `VITE_PAPER_GENETIC_ALGORITHMS_PDF_URL` | PDF do artigo sobre algoritmos genéticos |

## Comandos do terminal

| Comando | Descrição |
| --- | --- |
| `welcome` | Mensagem inicial (roda automaticamente ao carregar) |
| `help` | Lista todos os comandos disponíveis |
| `about [skills\|workspace\|hobbies\|languages\|all]` | Sobre mim |
| `education` | Formação acadêmica |
| `papers [<título>\|all]` | Artigos acadêmicos |
| `career [<empresa>\|all]` | Experiência profissional |
| `projects [<nome>\|all]` | Projetos principais |
| `contacts [<nome>]` | Redes sociais e contato |
| `cv` | Baixa o currículo em PDF no idioma ativo |
| `gui` | Abre a versão gráfica do portfólio |
| `language <english\|portuguese>` | Troca o idioma da interface |
| `clear` | Limpa o terminal |
| `echo <texto>` | Ecoa o texto informado |
| `history` | Lista o histórico de comandos da sessão |

`about`, `career`, `papers` e `projects` aceitam o subcomando `all` para
imprimir tudo daquela seção de uma vez. Nomes de comando e subcomando
permanecem em inglês independente do idioma ativo; apenas o conteúdo dos
outputs é traduzido.

## Estrutura do projeto

```
src/
  content/    # dados bilíngues tipados (fonte de verdade dos textos)
  commands/   # parser puro + registry + handlers por comando
  context/    # estado global (Context + useReducer)
  terminal/   # componentes de UI (cada um com seu Componente.styles.ts)
  theme/      # tokens Tokyo Night + GlobalStyle
  i18n/       # resolução de texto localizado
  env.ts      # wrapper tipado sobre import.meta.env
```

## Documentação adicional

- `CLAUDE.md` — especificação do produto e decisões de implementação
- `docs/superpowers/specs/` — spec de design detalhada
- `docs/superpowers/plans/` — plano de implementação task a task
