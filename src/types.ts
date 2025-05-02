export interface Education {
  degree: string;
  institution: string;
  graduation_date: string;
  field_of_study?: string;
  gpa?: string;
}

export interface WorkExperience {
  position: string;
  company: string;
  duration: string;
  location?: string;
  description?: string[];
}

export interface Skill {
  name: string;
  category?: string;
  years_of_experience?: number;
}

export interface Certification {
  name: string;
  issuing_organization: string;
  date_obtained?: string;
  expiration_date?: string;
}

export interface ResumeAnalysis {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  education: Education[];
  work_experience: WorkExperience[];
  skills: Skill[];
  certifications?: Certification[];
  languages?: string[];
} 