import type { CommandHandler } from '../types';
import { welcome } from './welcome';
import { help } from './help';
import { about } from './about';
import { education } from './education';
import { papers } from './papers';
import { career } from './career';
import { projects } from './projects';
import { contacts } from './contacts';
import { gui } from './gui';
import { language } from './language';
import { clear } from './clear';
import { echo } from './echo';
import { history } from './history';

export const registry: Record<string, CommandHandler> = {
  welcome,
  help,
  about,
  education,
  papers,
  career,
  projects,
  contacts,
  gui,
  language,
  clear,
  echo,
  history,
};
