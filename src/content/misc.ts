import type { Localized } from '../types';
import { ENV } from '../env';

export const welcomeText: Localized<string[]> = {
  en: [
    'Welcome to my terminal portfolio.',
    '',
    "I'm Gustavo, a software engineer — this site simulates a shell where every command",
    'is one piece of my background: skills, career, education, papers, and projects.',
    '',
    'This whole portfolio was **built as a terminal emulator** using **React** and **TypeScript**.',
    `Source code: ${ENV.repoUrl}`,
    '',
    'Type "help" to see available commands, or "about" to start.',
  ],
  pt: [
    'Bem-vindo ao meu portfólio em formato de terminal.',
    '',
    'Sou o Gustavo, engenheiro de software — este site simula um shell onde cada comando',
    'revela um pouco da minha trajetória: habilidades, carreira, formação, artigos e projetos.',
    '',
    'Todo o portfólio foi **construído como um emulador de terminal** usando **React** e **TypeScript**.',
    `Código-fonte: ${ENV.repoUrl}`,
    '',
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
  { command: 'cv', description: { en: 'Download my resume (PDF)', pt: 'Baixa meu currículo (PDF)' } },
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

export const guiUrl = ENV.guiUrl;
