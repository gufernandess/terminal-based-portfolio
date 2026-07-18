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
