import type { Localized } from '../types';
import { ENV } from '../env';

export interface ContactEntry {
  slug: string;
  kind: 'url' | 'email';
  value: string;
}

export const contacts: ContactEntry[] = [
  { slug: 'linkedin', kind: 'url', value: ENV.linkedinUrl },
  { slug: 'github', kind: 'url', value: ENV.githubProfileUrl },
  { slug: 'lattes', kind: 'url', value: ENV.lattesUrl },
  { slug: 'email', kind: 'email', value: ENV.contactEmail },
];

export const contactsMenuTitle: Localized<string> = {
  en: 'Contacts:',
  pt: 'Contatos:',
};

export const contactsHint: Localized<string> = {
  en: 'Type "contacts <name>" to open.',
  pt: 'Digite "contacts <nome>" para abrir.',
};
