import type { IconType } from 'react-icons';
import { FaBookOpen, FaDumbbell, FaPersonRunning, FaCode, FaUtensils } from 'react-icons/fa6';
import { getTechIcon } from './techIcons';

const hobbyIcons: Record<string, IconType> = {
  Reading: FaBookOpen,
  Leitura: FaBookOpen,
  Gym: FaDumbbell,
  Academia: FaDumbbell,
  Running: FaPersonRunning,
  Corrida: FaPersonRunning,
  Coding: FaCode,
  Programação: FaCode,
  Cooking: FaUtensils,
  Culinária: FaUtensils,
};

const languageFlags: Array<{ match: RegExp; flag: string }> = [
  { match: /portugu/i, flag: '🇧🇷' },
  { match: /english|inglês/i, flag: '🇺🇸' },
];

export type ItemIcon = IconType | string;

export function getItemIcon(label: string): ItemIcon | undefined {
  const tech = getTechIcon(label);
  if (tech) return tech;

  if (hobbyIcons[label]) return hobbyIcons[label];

  const language = languageFlags.find(({ match }) => match.test(label));
  return language?.flag;
}

export function ItemIconGlyph({ icon }: { icon: ItemIcon }) {
  if (typeof icon === 'string') return <>{icon}</>;
  const Icon = icon;
  return <Icon />;
}
