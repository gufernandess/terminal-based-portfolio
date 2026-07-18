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
Subcomandos: `skills`, `workspace`, `hobbies`, `languages`
- `about` (sem argumento) → mostra um menu resumido com os subcomandos disponíveis
- `about skills` → habilidades técnicas
- `about workspace` → setup de trabalho (hardware, ferramentas, etc.)
- `about hobbies` → hobbies pessoais
- `about languages` → idiomas falados (não confundir com o comando `language`, que troca o idioma da interface)

### `education`
Mostra formação acadêmica. Sem subcomandos definidos por ora (a estruturar quando o conteúdo for esquematizado).

### `papers`
Textos sobre artigos acadêmicos realizados.
- `papers` (sem argumento) → menu resumido listando os artigos disponíveis
- `papers <título do artigo>` → argumento livre (texto, mesmo padrão de `career`), mostra detalhes daquele artigo específico

### `career`
Experiência profissional.
- `career` (sem argumento) → menu resumido listando as empresas/experiências disponíveis
- `career <nome da empresa>` → argumento livre (texto), mostra detalhes daquela experiência específica
- Atividades extracurriculares (INOVE, GEMP): **não incluídas** no escopo do portfólio

### `projects`
Projetos principais e tecnologias utilizadas.
- `projects` (sem argumento) → menu resumido listando os projetos disponíveis
- `projects goto <nome do projeto>` → argumento livre (texto, não índice numérico), redireciona para o link do projeto ou GitHub, abrindo em **nova aba** (`window.open`)

### `contacts`
Redes sociais e contato.
- `contacts` (sem argumento) → menu resumido listando os contatos disponíveis
- `contacts goto <nome>` → argumento livre (ex: `contacts goto linkedin`)
- Contatos disponíveis: `linkedin`, `github`, `lattes` → abrem em **nova aba** (`window.open`)
- `email` → não abre nova aba, usa `mailto:` (ou exibe o endereço diretamente no terminal)
- Telefone: **não incluído**

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
- **Argumento livre para `goto` e `career`**: sem índice numérico — sempre por nome/texto livre. Validar correspondência (case-insensitive, idealmente com alguma tolerância a variações simples de escrita).
- **Links externos** (`gui`, `projects goto`, `contacts goto`): abrem em nova aba via `window.open`, **exceto** `contacts goto email`, que usa `mailto:` na mesma aba.

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
