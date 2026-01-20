
export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  videoUrl: string;
  points: string[];
  purpose: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface TechStack {
  name: string;
  icon: string;
}

export interface SiteSettings {
  heroVideoUrl: string;
  aboutImageUrl: string;
  logoUrl: string;
  email: string;
  phone: string;
  logoColor: string;
}
