import type { Localized } from '../types';

export const aboutBio: Localized<string[]> = {
  en: [
    "Hi, I'm Gustavo Fernandes — a computer scientist and software engineer who",
    '**recursively aims to learn and continuously evolve**.',
    '',
    "My main experience is in **web development**, but I'm always eager to explore",
    'new things: **machine learning**, **functional programming**, hackathons, and',
    'competitive programming.',
    '',
    'My goal is to **combine the science and art of programming** to build software',
    'that adds real value — and have fun in the process.',
  ],
  pt: [
    'Olá, eu sou Gustavo Fernandes — cientista da computação e engenheiro de',
    'software que **busca aprender e evoluir de forma recursiva e contínua**.',
    '',
    'Minha principal experiência é em **desenvolvimento web**, mas sempre estou',
    'disposto a explorar coisas novas: **machine learning**, **programação funcional**,',
    'hackathons e programação competitiva.',
    '',
    'Meu objetivo é **combinar a ciência e a arte da programação** para construir',
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

export const aboutWorkspace: string[] = ['Manjaro Linux', 'Kiro', 'Neovim', 'Claude Code'];

export const aboutHobbies: Localized<string[]> = {
  en: ['Reading', 'Gym', 'Running', 'Coding', 'Cooking'],
  pt: ['Leitura', 'Academia', 'Corrida', 'Programação', 'Culinária'],
};

export const aboutLanguages: Localized<string[]> = {
  en: ['Portuguese — C2', 'English — B2'],
  pt: ['Português — C2', 'Inglês — B2'],
};

export const aboutMenuTitle: Localized<string> = {
  en: 'Available sections:',
  pt: 'Seções disponíveis:',
};

export const aboutHint: Localized<string> = {
  en: 'Type "about <subcommand>" to read more, or "about all" to see everything.',
  pt: 'Digite "about <subcomando>" para ler mais, ou "about all" para ver tudo.',
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
