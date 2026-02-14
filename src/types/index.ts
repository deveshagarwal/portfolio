// Personal Information
export interface PersonalInfo {
  name: string;
  tagline: string;
  bio: string;
  email: string;
  substackUrl: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// Professional Data
export interface ProfessionalInfo {
  title: string;
  company: string;
  location: string;
  description: string;
  research: ResearchArea[];
  projects: Project[];
  publications: Publication[];
}

export interface ResearchArea {
  title: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  url?: string;
}

export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  url?: string;
}

// Books
export interface Book {
  id: string;
  title: string;
  author: string;
  cover?: string;
  rating: number;
  year: number;
  notes?: string;
}

export interface BooksData {
  books: Book[];
}

// Movies
export interface Movie {
  id: string;
  title: string;
  director: string;
  year: number;
  rating: number;
  genre: string;
}

export interface MoviesData {
  movies: Movie[];
}

// Map Configuration
export interface MapNode {
  id: string;
  label: string;
  targetSection: string;
  position: {
    x: number;
    y: number;
  };
  isCenter?: boolean;
}

export interface MapConnection {
  from: string;
  to: string;
}

export interface MapConfig {
  nodes: MapNode[];
  connections: MapConnection[];
}

// Substack Article
export interface SubstackArticle {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  content: string;
  imageUrl?: string;
}
