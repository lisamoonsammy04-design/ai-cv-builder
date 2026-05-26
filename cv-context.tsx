'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { CVData, TemplateType, ChatMessage, CVSection } from './types'

const defaultCVData: CVData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    summary: '',
  },
  workExperience: [],
  education: [],
  skills: [],
  references: [],
  languages: [],
  certifications: [],
}

interface CVContextType {
  cvData: CVData
  setCVData: (data: CVData) => void
  updatePersonalInfo: (info: Partial<CVData['personalInfo']>) => void
  addWorkExperience: (exp: CVData['workExperience'][0]) => void
  updateWorkExperience: (id: string, exp: Partial<CVData['workExperience'][0]>) => void
  removeWorkExperience: (id: string) => void
  addEducation: (edu: CVData['education'][0]) => void
  updateEducation: (id: string, edu: Partial<CVData['education'][0]>) => void
  removeEducation: (id: string) => void
  addSkill: (skill: CVData['skills'][0]) => void
  removeSkill: (id: string) => void
  setSkills: (skills: CVData['skills']) => void
  addReference: (ref: CVData['references'][0]) => void
  removeReference: (id: string) => void
  template: TemplateType
  setTemplate: (template: TemplateType) => void
  messages: ChatMessage[]
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void
  currentSection: CVSection
  setCurrentSection: (section: CVSection) => void
  atsScore: number
  calculateATSScore: () => number
  isBuilding: boolean
  setIsBuilding: (building: boolean) => void
}

const CVContext = createContext<CVContextType | undefined>(undefined)

export function CVProvider({ children }: { children: ReactNode }) {
  const [cvData, setCVData] = useState<CVData>(defaultCVData)
  const [template, setTemplate] = useState<TemplateType>('modern')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [currentSection, setCurrentSection] = useState<CVSection>('greeting')
  const [isBuilding, setIsBuilding] = useState(false)

  const updatePersonalInfo = useCallback((info: Partial<CVData['personalInfo']>) => {
    setCVData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }))
  }, [])

  const addWorkExperience = useCallback((exp: CVData['workExperience'][0]) => {
    setCVData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, exp],
    }))
  }, [])

  const updateWorkExperience = useCallback((id: string, exp: Partial<CVData['workExperience'][0]>) => {
    setCVData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(e => 
        e.id === id ? { ...e, ...exp } : e
      ),
    }))
  }, [])

  const removeWorkExperience = useCallback((id: string) => {
    setCVData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(e => e.id !== id),
    }))
  }, [])

  const addEducation = useCallback((edu: CVData['education'][0]) => {
    setCVData(prev => ({
      ...prev,
      education: [...prev.education, edu],
    }))
  }, [])

  const updateEducation = useCallback((id: string, edu: Partial<CVData['education'][0]>) => {
    setCVData(prev => ({
      ...prev,
      education: prev.education.map(e => 
        e.id === id ? { ...e, ...edu } : e
      ),
    }))
  }, [])

  const removeEducation = useCallback((id: string) => {
    setCVData(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id),
    }))
  }, [])

  const addSkill = useCallback((skill: CVData['skills'][0]) => {
    setCVData(prev => ({
      ...prev,
      skills: [...prev.skills, skill],
    }))
  }, [])

  const removeSkill = useCallback((id: string) => {
    setCVData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id),
    }))
  }, [])

  const setSkills = useCallback((skills: CVData['skills']) => {
    setCVData(prev => ({
      ...prev,
      skills,
    }))
  }, [])

  const addReference = useCallback((ref: CVData['references'][0]) => {
    setCVData(prev => ({
      ...prev,
      references: [...prev.references, ref],
    }))
  }, [])

  const removeReference = useCallback((id: string) => {
    setCVData(prev => ({
      ...prev,
      references: prev.references.filter(r => r.id !== id),
    }))
  }, [])

  const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, newMessage])
  }, [])

  const calculateATSScore = useCallback(() => {
    let score = 0
    const maxScore = 100

    // Personal info (20 points)
    if (cvData.personalInfo.fullName) score += 5
    if (cvData.personalInfo.email) score += 5
    if (cvData.personalInfo.phone) score += 5
    if (cvData.personalInfo.location) score += 3
    if (cvData.personalInfo.linkedIn) score += 2

    // Professional summary (15 points)
    if (cvData.personalInfo.summary) {
      const summaryWords = cvData.personalInfo.summary.split(' ').length
      if (summaryWords >= 30) score += 15
      else if (summaryWords >= 15) score += 10
      else score += 5
    }

    // Work experience (30 points)
    if (cvData.workExperience.length > 0) {
      score += Math.min(cvData.workExperience.length * 8, 20)
      const hasAchievements = cvData.workExperience.some(exp => exp.achievements.length > 0)
      if (hasAchievements) score += 10
    }

    // Education (15 points)
    if (cvData.education.length > 0) {
      score += Math.min(cvData.education.length * 8, 15)
    }

    // Skills (15 points)
    if (cvData.skills.length > 0) {
      score += Math.min(cvData.skills.length * 2, 15)
    }

    // References (5 points)
    if (cvData.references.length >= 2) {
      score += 5
    } else if (cvData.references.length === 1) {
      score += 3
    }

    return Math.min(Math.round((score / maxScore) * 100), 100)
  }, [cvData])

  const atsScore = calculateATSScore()

  return (
    <CVContext.Provider
      value={{
        cvData,
        setCVData,
        updatePersonalInfo,
        addWorkExperience,
        updateWorkExperience,
        removeWorkExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        removeSkill,
        setSkills,
        addReference,
        removeReference,
        template,
        setTemplate,
        messages,
        addMessage,
        currentSection,
        setCurrentSection,
        atsScore,
        calculateATSScore,
        isBuilding,
        setIsBuilding,
      }}
    >
      {children}
    </CVContext.Provider>
  )
}

export function useCV() {
  const context = useContext(CVContext)
  if (context === undefined) {
    throw new Error('useCV must be used within a CVProvider')
  }
  return context
}
