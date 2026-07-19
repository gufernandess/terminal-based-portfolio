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

  const query = normalize(args.join(' '));
  const contact = contactsList.find((c) => normalize(c.slug) === query);
  if (!contact) {
    return {
      entries: [
        errorEntry(
          ctx.language === 'en'
            ? `Contact not found: ${args.join(' ')}`
            : `Contato não encontrado: ${args.join(' ')}`,
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
