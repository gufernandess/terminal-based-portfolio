import type { Localized } from '../types';

export interface ProjectEntry {
  slug: string;
  url: string;
  body: Localized<string[]>;
}

export const projects: ProjectEntry[] = [
  {
    slug: 'c3t',
    url: 'https://github.com/gufernandess/c3t',
    body: {
      en: [
        'C3T — Currency Exchange API',
        'Monolithic API for exchange rate queries (Node.js, TypeScript, Fastify).',
        'Web scraping (Axios/Cheerio) with a cache-first strategy and background',
        'updates (cron) via Redis, plus filters, pagination, Docker, and Swagger docs.',
        '',
        'Tech: Node.js, TypeScript, Fastify, Redis, Docker, Swagger, Axios, Cheerio',
        'GitHub: https://github.com/gufernandess/c3t',
      ],
      pt: [
        'C3T — API de Câmbio Turismo',
        'API monolítica para consulta de cotações (Node.js, TypeScript, Fastify).',
        'Web scraping (Axios/Cheerio) com estratégia cache-first e atualizações em',
        'background (cron) via Redis, além de filtros, paginação, Docker e',
        'documentação com Swagger.',
        '',
        'Tecnologias: Node.js, TypeScript, Fastify, Redis, Docker, Swagger, Axios, Cheerio',
        'GitHub: https://github.com/gufernandess/c3t',
      ],
    },
  },
  {
    slug: 'vertex-cover',
    url: 'https://github.com/gufernandess/vertex_cover_pli',
    body: {
      en: [
        'Vertex Cover PLI',
        'Implementation related to the minimum vertex cover problem on snark graphs,',
        'built to support the research from my undergraduate thesis / paper',
        '"On the Minimum Vertex Cover of Snarks".',
        '',
        'GitHub: https://github.com/gufernandess/vertex_cover_pli',
      ],
      pt: [
        'Vertex Cover PLI',
        'Implementação relacionada ao problema da cobertura por vértices mínima em',
        'grafos snarks, desenvolvida para apoiar a pesquisa do meu TCC / artigo',
        '"On the Minimum Vertex Cover of Snarks".',
        '',
        'GitHub: https://github.com/gufernandess/vertex_cover_pli',
      ],
    },
  },
];

export const projectsMenuTitle: Localized<string> = {
  en: 'Main projects:',
  pt: 'Projetos principais:',
};

export const projectsHint: Localized<string> = {
  en: 'Type "projects goto <name>" to open the GitHub repository.',
  pt: 'Digite "projects goto <nome>" para abrir o repositório no GitHub.',
};
