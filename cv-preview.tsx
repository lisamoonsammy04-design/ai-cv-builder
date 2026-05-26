'use client'

import { useCV } from '@/lib/cv-context'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react'
import type { CVData, TemplateType } from '@/lib/types'

export function CVPreview() {
  const { cvData, template } = useCV()

  return (
    <ScrollArea className="h-full bg-white rounded-lg shadow-inner">
      <div className="p-8 min-h-full" id="cv-preview">
        {template === 'simple' && <SimpleTemplate cvData={cvData} />}
        {template === 'modern' && <ModernTemplate cvData={cvData} />}
        {template === 'executive' && <ExecutiveTemplate cvData={cvData} />}
      </div>
    </ScrollArea>
  )
}

// Simple Template - Clean and minimal
function SimpleTemplate({ cvData }: { cvData: CVData }) {
  const { personalInfo, workExperience, education, skills, references } = cvData

  return (
    <div className="font-sans text-gray-800 max-w-[800px] mx-auto">
      {/* Header */}
      <header className="text-center pb-6 border-b-2 border-gray-200 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {personalInfo.location}
            </span>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
            Work Experience
          </h2>
          <div className="space-y-4">
            {workExperience.map((job) => (
              <div key={job.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.position}</h3>
                    <p className="text-sm text-gray-600">{job.company}</p>
                  </div>
                  {(job.startDate || job.endDate) && (
                    <span className="text-sm text-gray-500">
                      {job.startDate} — {job.current ? 'Present' : job.endDate}
                    </span>
                  )}
                </div>
                {job.description && (
                  <p className="text-sm text-gray-700 mt-1">{job.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-sm text-gray-600">{edu.institution}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {references.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
            References
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {references.map((ref) => (
              <div key={ref.id}>
                <h3 className="font-semibold text-gray-900">{ref.name}</h3>
                <p className="text-sm text-gray-600">{ref.position}, {ref.company}</p>
                {ref.email && <p className="text-sm text-gray-500">{ref.email}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {!personalInfo.fullName && workExperience.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Start chatting to build your CV</p>
          <p className="text-sm">Your CV will appear here as you add information</p>
        </div>
      )}
    </div>
  )
}

// Modern Template - Contemporary with accent colors
function ModernTemplate({ cvData }: { cvData: CVData }) {
  const { personalInfo, workExperience, education, skills, references } = cvData

  return (
    <div className="font-sans text-gray-800 max-w-[800px] mx-auto">
      {/* Header with accent */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-t-lg -mx-8 -mt-8 mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-blue-100">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedIn && (
            <span className="flex items-center gap-1">
              <Linkedin className="h-3 w-3" />
              LinkedIn
            </span>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2 mb-3">
            <div className="w-8 h-1 bg-blue-600 rounded" />
            About Me
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed pl-10">{personalInfo.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2 mb-3">
            <div className="w-8 h-1 bg-blue-600 rounded" />
            Experience
          </h2>
          <div className="space-y-4 pl-10">
            {workExperience.map((job) => (
              <div key={job.id} className="relative pl-4 border-l-2 border-blue-200">
                <div className="absolute -left-[5px] top-1 w-2 h-2 bg-blue-600 rounded-full" />
                <h3 className="font-semibold text-gray-900">{job.position}</h3>
                <p className="text-sm text-blue-600 font-medium">{job.company}</p>
                {job.description && (
                  <p className="text-sm text-gray-600 mt-1">{job.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2 mb-3">
            <div className="w-8 h-1 bg-blue-600 rounded" />
            Education
          </h2>
          <div className="space-y-3 pl-10">
            {education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-sm text-blue-600">{edu.institution}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2 mb-3">
            <div className="w-8 h-1 bg-blue-600 rounded" />
            Skills
          </h2>
          <div className="flex flex-wrap gap-2 pl-10">
            {skills.map((skill) => (
              <span key={skill.id} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {references.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2 mb-3">
            <div className="w-8 h-1 bg-blue-600 rounded" />
            References
          </h2>
          <div className="grid grid-cols-2 gap-4 pl-10">
            {references.map((ref) => (
              <div key={ref.id} className="p-3 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">{ref.name}</h3>
                <p className="text-sm text-gray-600">{ref.position}</p>
                <p className="text-sm text-blue-600">{ref.company}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {!personalInfo.fullName && workExperience.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Start chatting to build your CV</p>
          <p className="text-sm">Your CV will appear here as you add information</p>
        </div>
      )}
    </div>
  )
}

// Executive Template - Professional and sophisticated
function ExecutiveTemplate({ cvData }: { cvData: CVData }) {
  const { personalInfo, workExperience, education, skills, references } = cvData

  return (
    <div className="font-serif text-gray-800 max-w-[800px] mx-auto">
      {/* Header - Classic style */}
      <header className="text-center pb-6 mb-6 border-b-4 border-double border-gray-800">
        <h1 className="text-4xl font-bold text-gray-900 tracking-wide uppercase mb-3">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">
            Executive Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed italic">{personalInfo.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-4">
            Professional Experience
          </h2>
          <div className="space-y-5">
            {workExperience.map((job) => (
              <div key={job.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900 text-lg">{job.position}</h3>
                  {(job.startDate || job.endDate) && (
                    <span className="text-sm text-gray-500 italic">
                      {job.startDate} — {job.current ? 'Present' : job.endDate}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 font-medium mb-1">{job.company}</p>
                {job.description && (
                  <p className="text-sm text-gray-700">{job.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Two column layout for Education and Skills */}
      <div className="grid grid-cols-2 gap-8">
        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-4">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-sm text-gray-600 italic">{edu.institution}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-4">
              Core Competencies
            </h2>
            <ul className="space-y-1">
              {skills.map((skill) => (
                <li key={skill.id} className="text-sm text-gray-700 flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-400 rounded-full" />
                  {skill.name}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* References */}
      {references.length > 0 && (
        <section className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-4">
            References
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {references.map((ref) => (
              <div key={ref.id}>
                <h3 className="font-bold text-gray-900">{ref.name}</h3>
                <p className="text-sm text-gray-600">{ref.position}, {ref.company}</p>
                {ref.email && <p className="text-sm text-gray-500">{ref.email}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {!personalInfo.fullName && workExperience.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="font-sans">Start chatting to build your CV</p>
          <p className="text-sm font-sans">Your CV will appear here as you add information</p>
        </div>
      )}
    </div>
  )
}

export { SimpleTemplate, ModernTemplate, ExecutiveTemplate }
