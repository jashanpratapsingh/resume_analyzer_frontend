export interface Education {
  institution: string;
  degree: string;
  field_of_study?: string;
  start_date?: string;
  end_date?: string;
  gpa?: number;
}

export interface WorkExperience {
  company: string;
  title: string;
  start_date: string;
  end_date?: string;
  description: string[];
  location?: string;
  is_current: boolean;
}

export interface Skill {
  name: string;
  category: string;
  years_of_experience?: number;
  proficiency_level?: string;
  last_used?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date_obtained?: string;
  expiration_date?: string;
}

export interface ResumeAnalysis {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  education: Education[];
  work_experience: WorkExperience[];
  skills: Skill[];
  certifications: Certification[];
  languages: string[];
  missing_sections: string[];
  analysis_date: string;
} 