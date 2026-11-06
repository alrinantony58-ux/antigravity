export interface Skill {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'databases' | 'frameworks' | 'tools' | 'other';
  proficiency?: number; // 0-100
  isPlaceholder?: boolean;
  highlight?: boolean;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Full-Stack' | 'Frontend' | 'Backend & API' | 'Mobile & Cloud';
  tags: string[];
  thumbnail: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  isPlaceholder?: boolean;
  highlights: string[];
}

export interface TimelineItem {
  id: string;
  type: 'education' | 'experience' | 'internship' | 'certification' | 'achievement';
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
  skills?: string[];
  credentialId?: string;
  isPlaceholder?: boolean;
}

export interface Interest {
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

