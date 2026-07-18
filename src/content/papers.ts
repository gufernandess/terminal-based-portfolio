import type { Localized } from '../types';

export interface PaperEntry {
  slug: string;
  body: Localized<string[]>;
}

export const papers: PaperEntry[] = [
  {
    slug: 'vertex-cover-snarks',
    body: {
      en: [
        'On the Minimum Vertex Cover of Snarks',
        '',
        'Studies the computational complexity of the minimum vertex cover problem',
        'in snark graphs, proving NP-completeness for the general case and',
        'establishing exact cover numbers for families like flower snarks, Goldberg',
        'snarks, Blanuša snarks, and Loupekine snarks. Derived from my undergraduate',
        'thesis, with publication expected in Discrete Applied Mathematics.',
        '',
        'Related project: "projects goto vertex-cover"',
      ],
      pt: [
        'On the Minimum Vertex Cover of Snarks',
        '',
        'Estuda a complexidade computacional do problema da cobertura por vértices',
        'mínima em grafos snarks, provando a NP-completude para o caso geral e',
        'estabelecendo o número de cobertura exato para famílias como snarks-flor,',
        'snarks de Goldberg, Blanuša e Loupekine. Derivado do meu TCC, com',
        'publicação prevista na revista Discrete Applied Mathematics.',
        '',
        'Projeto relacionado: "projects goto vertex-cover"',
      ],
    },
  },
  {
    slug: 'genetic-algorithms',
    body: {
      en: [
        'A Study on Genetic Algorithms',
        '',
        'Dissertative study on Genetic Algorithms applied to problem optimization,',
        'covering selection, crossover, and mutation, and highlighting their',
        "efficiency versus traditional search methods. Presented at UFC's academic",
        'meetings.',
      ],
      pt: [
        'Um Estudo Sobre os Algoritmos Genéticos',
        '',
        'Estudo dissertativo sobre Algoritmos Genéticos aplicados à otimização de',
        'problemas, cobrindo seleção, cruzamento e mutação, e destacando sua',
        'eficiência em relação a métodos tradicionais de busca. Apresentado nos',
        'Encontros Universitários da UFC.',
      ],
    },
  },
];

export const papersMenuTitle: Localized<string> = {
  en: 'Available papers:',
  pt: 'Artigos disponíveis:',
};

export const papersHint: Localized<string> = {
  en: 'Type "papers <title>" to read more.',
  pt: 'Digite "papers <título>" para ler mais.',
};
