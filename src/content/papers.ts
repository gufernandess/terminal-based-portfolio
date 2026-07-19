import type { Localized } from '../types';
import { ENV } from '../env';

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
        'Studies the **computational complexity** of the minimum vertex cover problem',
        'in snark graphs, proving **NP-completeness** for the general case and',
        'establishing exact cover numbers for families like flower snarks, Goldberg',
        'snarks, Blanuša snarks, and Loupekine snarks. Derived from my undergraduate',
        'thesis.',
        '',
        `Paper: ${ENV.paperVertexCoverPdfUrl}`,
        `Related project: ${ENV.projectVertexCoverUrl}`,
      ],
      pt: [
        'On the Minimum Vertex Cover of Snarks',
        '',
        'Estuda a **complexidade computacional** do problema da cobertura por vértices',
        'mínima em grafos snarks, provando a **NP-completude** para o caso geral e',
        'estabelecendo o número de cobertura exato para famílias como snarks-flor,',
        'snarks de Goldberg, Blanuša e Loupekine. Derivado do meu TCC.',
        '',
        `Artigo: ${ENV.paperVertexCoverPdfUrl}`,
        `Projeto relacionado: ${ENV.projectVertexCoverUrl}`,
      ],
    },
  },
  {
    slug: 'genetic-algorithms',
    body: {
      en: [
        'A Study on Genetic Algorithms',
        '',
        'Dissertative study on **Genetic Algorithms** applied to problem optimization,',
        'covering selection, crossover, and mutation, and highlighting their',
        "efficiency versus traditional search methods. Presented at UFC's academic",
        'meetings.',
        '',
        `Paper: ${ENV.paperGeneticAlgorithmsPdfUrl}`,
      ],
      pt: [
        'Um Estudo Sobre os Algoritmos Genéticos',
        '',
        'Estudo dissertativo sobre **Algoritmos Genéticos** aplicados à otimização de',
        'problemas, cobrindo seleção, cruzamento e mutação, e destacando sua',
        'eficiência em relação a métodos tradicionais de busca. Apresentado nos',
        'Encontros Universitários da UFC.',
        '',
        `Artigo: ${ENV.paperGeneticAlgorithmsPdfUrl}`,
      ],
    },
  },
];

export const papersMenuTitle: Localized<string> = {
  en: 'Available papers:',
  pt: 'Artigos disponíveis:',
};

export const papersHint: Localized<string> = {
  en: 'Type "papers <title>" to read more, or "papers all" to see everything.',
  pt: 'Digite "papers <título>" para ler mais, ou "papers all" para ver tudo.',
};
