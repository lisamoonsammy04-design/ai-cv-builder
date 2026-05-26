export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  linkedIn?: string
  summary?: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  achievements: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  grade?: string
}

export interface Skill {
  id: string
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface Reference {
  id: string
  name: string
  position: string
  company: string
  email?: string
  phone?: string
}

export interface CVData {
  personalInfo: PersonalInfo
  workExperience: WorkExperience[]
  education: Education[]
  skills: Skill[]
  references: Reference[]
  languages?: string[]
  certifications?: string[]
}

export type TemplateType = 'simple' | 'modern' | 'executive'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export type CVSection = 
  | 'greeting'
  | 'personal-info'
  | 'work-experience'
  | 'education'
  | 'skills'
  | 'references'
  | 'summary'
  | 'complete'
