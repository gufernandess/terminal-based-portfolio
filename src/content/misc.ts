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
