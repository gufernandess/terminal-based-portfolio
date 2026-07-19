const env = import.meta.env;

export const ENV = {
  repoUrl: env.VITE_REPO_URL,
  guiUrl: env.VITE_GUI_URL,
  cvUrlEn: env.VITE_CV_URL_EN,
  cvUrlPt: env.VITE_CV_URL_PT,
  linkedinUrl: env.VITE_LINKEDIN_URL,
  githubProfileUrl: env.VITE_GITHUB_PROFILE_URL,
  lattesUrl: env.VITE_LATTES_URL,
  contactEmail: env.VITE_CONTACT_EMAIL,
  projectC3tUrl: env.VITE_PROJECT_C3T_URL,
  projectVertexCoverUrl: env.VITE_PROJECT_VERTEX_COVER_URL,
  paperVertexCoverPdfUrl: env.VITE_PAPER_VERTEX_COVER_PDF_URL,
  paperGeneticAlgorithmsPdfUrl: env.VITE_PAPER_GENETIC_ALGORITHMS_PDF_URL,
};
