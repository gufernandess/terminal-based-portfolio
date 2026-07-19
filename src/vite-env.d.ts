/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REPO_URL: string;
  readonly VITE_GUI_URL: string;
  readonly VITE_CV_URL_EN: string;
  readonly VITE_CV_URL_PT: string;
  readonly VITE_LINKEDIN_URL: string;
  readonly VITE_GITHUB_PROFILE_URL: string;
  readonly VITE_LATTES_URL: string;
  readonly VITE_CONTACT_EMAIL: string;
  readonly VITE_PROJECT_C3T_URL: string;
  readonly VITE_PROJECT_VERTEX_COVER_URL: string;
  readonly VITE_PAPER_VERTEX_COVER_PDF_URL: string;
  readonly VITE_PAPER_GENETIC_ALGORITHMS_PDF_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
