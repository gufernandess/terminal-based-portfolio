import type { Localized } from '../types';
import { ENV } from '../env';

export interface ProjectEntry {
  slug: string;
  url: string;
  tags: string[];
  body: Localized<string[]>;
}

export const projects: ProjectEntry[] = [
  {
    slug: 'c3t',
    url: ENV.projectC3tUrl,
    tags: ['Node.js', 'TypeScript', 'Fastify', 'Redis', 'Docker', 'Swagger', 'Axios', 'Cheerio'],
    body: {
      en: [
        'C3T — Currency Exchange API',
        '',
        'Monolithic API for exchange rate queries (**Node.js**, **TypeScript**, **Fastify**).',
        'Web scraping (Axios/Cheerio) with a **cache-first strategy** and background',
        'updates (cron) via **Redis**, plus filters, pagination, Docker, and Swagger docs.',
        '',
        `GitHub: ${ENV.projectC3tUrl}`,
      ],
      pt: [
        'C3T — API de Câmbio Turismo',
        '',
        'API monolítica para consulta de cotações (**Node.js**, **TypeScript**, **Fastify**).',
        'Web scraping (Axios/Cheerio) com estratégia **cache-first** e atualizações em',
        'background (cron) via **Redis**, além de filtros, paginação, Docker e',
        'documentação com Swagger.',
        '',
        `GitHub: ${ENV.projectC3tUrl}`,
      ],
    },
  },
  {
    slug: 'vertex-cover',
    url: ENV.projectVertexCoverUrl,
    tags: ['Python', 'PLI'],
    body: {
      en: [
        'Vertex Cover PLI',
        '',
        'Implementation related to the **minimum vertex cover problem** on snark graphs,',
        'built to support the research from my undergraduate thesis / paper',
        '"On the Minimum Vertex Cover of Snarks".',
        '',
        `GitHub: ${ENV.projectVertexCoverUrl}`,
      ],
      pt: [
        'Vertex Cover PLI',
        '',
        'Implementação relacionada ao problema da **cobertura por vértices mínima** em',
        'grafos snarks, desenvolvida para apoiar a pesquisa do meu TCC / artigo',
        '"On the Minimum Vertex Cover of Snarks".',
        '',
        `GitHub: ${ENV.projectVertexCoverUrl}`,
      ],
    },
  },
];

export const projectsMenuTitle: Localized<string> = {
  en: 'Main projects:',
  pt: 'Projetos principais:',
};

export const projectsHint: Localized<string> = {
  en: 'Type "projects <name>" to read more, or "projects all" to see everything.',
  pt: 'Digite "projects <nome>" para ler mais, ou "projects all" para ver tudo.',
};
