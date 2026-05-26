'use client'

import { useCV } from '@/lib/cv-context'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, AlertCircle, Info } from 'lucide-react'

export function ATSScore() {
  const { atsScore } = useCV()

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-500'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Needs Work'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 60) return <CheckCircle className="h-4 w-4 text-green-600" />
    if (score >= 40) return <AlertCircle className="h-4 w-4 text-yellow-600" />
    return <AlertCircle className="h-4 w-4 text-red-500" />
  }

  return (
    <div className="p-4 bg-card rounded-lg border border-border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground">ATS Score</h3>
          <button className="text-muted-foreground hover:text-foreground">
            <Info className="h-4 w-4" />
            <span className="sr-only">What is ATS?</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          {getScoreIcon(atsScore)}
          <span className={`font-bold text-lg ${getScoreColor(atsScore)}`}>
            {atsScore}%
          </span>
        </div>
      </div>

      <Progress value={atsScore} className="h-2 mb-2" />

      <p className="text-sm text-muted-foreground">
        {getScoreLabel(atsScore)} — {atsScore >= 60 
          ? 'Your CV is ATS-friendly!' 
          : 'Add more details to improve your score'}
      </p>
    </div>
  )
}

export function ATSScoreCompact() {
  const { atsScore } = useCV()

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-muted-foreground">ATS Score</span>
          <span className="text-sm font-bold">{atsScore}%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${getProgressColor(atsScore)}`}
            style={{ width: `${atsScore}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export function ATSScoreTips() {
  const { cvData, atsScore } = useCV()

  const tips: string[] = []

  if (!cvData.personalInfo.email) tips.push('Add your email address')
  if (!cvData.personalInfo.phone) tips.push('Add your phone number')
  if (!cvData.personalInfo.summary) tips.push('Write a professional summary')
  if (cvData.workExperience.length === 0) tips.push('Add your work experience')
  if (cvData.education.length === 0) tips.push('Add your education')
  if (cvData.skills.length < 5) tips.push('Add at least 5 skills')
  if (cvData.references.length < 2) tips.push('Add 2 professional references')

  if (tips.length === 0 && atsScore >= 80) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2 text-green-700">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Your CV is ATS-optimized!</span>
        </div>
        <p className="text-sm text-green-600 mt-1">
          Great job! Your CV has all the key elements employers look for.
        </p>
      </div>
    )
  }

  return (
    <div className="p-4 bg-muted/50 rounded-lg">
      <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-yellow-600" />
        Improve Your Score
      </h4>
      <ul className="space-y-1">
        {tips.slice(0, 3).map((tip, i) => (
          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="w-1 h-1 bg-muted-foreground rounded-full" />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  )
}
