import type { Localized } from '../types';

export interface CareerEntry {
  slug: string;
  tags: string[];
  body: Localized<string[]>;
}

export const career: CareerEntry[] = [
  {
    slug: 'nextpage',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Astro', 'AWS'],
    body: {
      en: [
        'NextPage — Remote',
        '**Fullstack Developer Jr.** | Jan 2026 – Present',
        '',
        'Building and evolving a platform for creating custom Digital Educational',
        'Objects for publishers and schools (React, Node.js, PostgreSQL, Astro).',
        'Managed AWS infrastructure (EC2, S3, VPC, CloudFront), led backend',
        '**performance refactors**, and implemented **accessibility (a11y)** best practices',
        'validated with the NVDA screen reader.',
      ],
      pt: [
        'NextPage — Remoto',
        '**Desenvolvedor Fullstack Jr.** | Jan 2026 – Atualmente',
        '',
        'Desenvolvimento e evolução de plataforma para criação de Objetos',
        'Educacionais Digitais para editoras e escolas (React, Node.js, PostgreSQL,',
        'Astro). Gestão de infraestrutura AWS (EC2, S3, VPC, CloudFront), condução',
        'de **refatorações de performance** no backend e implementação de boas',
        'práticas de **acessibilidade (a11y)** validadas com o leitor de tela NVDA.',
      ],
    },
  },
  {
    slug: 'jit-technology',
    tags: ['React', 'Node.js', 'MongoDB', 'GraphQL', 'Jest', 'SonarQube'],
    body: {
      en: [
        'JIT Technology — Remote',
        '**Fullstack Developer Jr.** | Sep 2024 – Dec 2025',
        '',
        'Technical focal point for client requirements, translating business rules',
        'into scalable solutions. Built reactive interfaces (React) and REST/GraphQL',
        'APIs (Node.js, MongoDB). Developed a financial module integrating Banco Efí',
        '(PIX/Boleto) and currency conversion,',
        '**cutting manual reconciliation time by ~90%**. Raised test coverage',
        'above 80% with Jest and SonarQube.',
      ],
      pt: [
        'JIT Technology — Remoto',
        '**Desenvolvedor Fullstack Jr.** | Set 2024 – Dez 2025',
        '',
        'Ponto focal técnico para requisitos de clientes, traduzindo regras de',
        'negócio em soluções escaláveis. Desenvolvimento de interfaces reativas',
        '(React) e APIs REST/GraphQL (Node.js, MongoDB). Módulo financeiro',
        'integrando Banco Efí (PIX/Boleto) e conversão de moedas,',
        '**reduzindo em ~90% o tempo de conciliação bancária**. Elevação da',
        'cobertura de testes para acima de 80% com Jest e SonarQube.',
      ],
    },
  },
  {
    slug: 'tropa-concursos',
    tags: ['Figma', 'HTML', 'CSS', 'JavaScript'],
    body: {
      en: [
        'Tropa Concursos — Remote',
        '**Frontend Developer (Freelancer)** | Jan 2024 – Feb 2024',
        '',
        'Built the official landing page for a Military Police (PMCE) prep course.',
        'Designed a high-fidelity Figma prototype and implemented it with HTML, CSS,',
        'and JavaScript, focused on **SEO** and **mobile-first** responsive design.',
      ],
      pt: [
        'Tropa Concursos — Remoto',
        '**Desenvolvedor Frontend (Freelancer)** | Jan 2024 – Fev 2024',
        '',
        'Desenvolvimento da landing page oficial de um curso preparatório para a',
        'Polícia Militar (PMCE). Elaboração de protótipo de alta fidelidade no',
        'Figma e implementação com HTML, CSS e JavaScript, com foco em **SEO** e',
        '**design responsivo (mobile-first)**.',
      ],
    },
  },
  {
    slug: 'shotokawa-comics',
    tags: ['React', 'Styled-Components'],
    body: {
      en: [
        'Shotokawa Comics — Remote',
        '**Frontend Developer (Freelancer)** | Jun 2023 – Dec 2023',
        '',
        'Developed a SPA with React and styled-components for a legal manga',
        'subscription platform, implementing **content protection logic** to ensure',
        'fair compensation for artists. Worked directly with the client end-to-end.',
      ],
      pt: [
        'Shotokawa Comics — Remoto',
        '**Desenvolvedor Frontend (Freelancer)** | Jun 2023 – Dez 2023',
        '',
        'Desenvolvimento de SPA com React e styled-components para uma plataforma',
        'de assinatura de leitura legalizada de mangás, implementando',
        '**lógicas de proteção de conteúdo** para remuneração justa dos artistas.',
        'Atuação direta com o cliente do início ao fim.',
      ],
    },
  },
  {
    slug: 'gera3-sistemas',
    tags: ['Java', 'Maven', 'Selenium'],
    body: {
      en: [
        'Gera3 Sistemas — Remote',
        '**Software Development Intern** | Jan 2021 – Aug 2021',
        '',
        'Implemented a RESTful API (Java, Maven, Selenium) that **fully automated**',
        'a previously manual social media data collection process, plus a BI',
        'interface for engagement metrics.',
      ],
      pt: [
        'Gera3 Sistemas — Remoto',
        '**Estagiário em Desenvolvimento de Software** | Jan 2021 – Ago 2021',
        '',
        'Implementação de API RESTful (Java, Maven, Selenium) que',
        '**automatizou por completo** um processo de coleta de dados de redes',
        'sociais antes manual, além de interface de BI para métricas de',
        'engajamento.',
      ],
    },
  },
];

export const careerMenuTitle: Localized<string> = {
  en: 'Professional experience:',
  pt: 'Experiência profissional:',
};

export const careerHint: Localized<string> = {
  en: 'Type "career <company>" to read more, or "career all" to see everything.',
  pt: 'Digite "career <empresa>" para ler mais, ou "career all" para ver tudo.',
};
