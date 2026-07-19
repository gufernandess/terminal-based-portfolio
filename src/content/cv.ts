import type { Localized } from '../types';
import { ENV } from '../env';

export const cvUrl: Localized<string> = {
  en: ENV.cvUrlEn,
  pt: ENV.cvUrlPt,
};

export const cvText: Localized<string[]> = {
  en: ['Downloading my resume (English)...'],
  pt: ['Baixando meu currículo (Português)...'],
};
