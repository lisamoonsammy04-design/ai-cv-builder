'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCV } from '@/lib/cv-context'
import { Send, Bot, User, Loader2 } from 'lucide-react'
import type { CVSection } from '@/lib/types'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const sectionQuestions: Record<CVSection, string> = {
  greeting: "Hello! I'm here to help you build a professional CV. Let's start with your full name — what should I call you?",
  'personal-info': "Great! Now let's add your contact details. What's your email address?",
  'work-experience': "Excellent! Now let's talk about your work experience. What's your most recent job title and company?",
  education: "Perfect! Let's add your education. What's your highest qualification and where did you study?",
  skills: "Nice! What are your key skills? List both technical skills and soft skills (e.g., Microsoft Office, Communication, Project Management)",
  references: "Almost done! Do you have any professional references? You can add their name, position, and contact details.",
  summary: "Let me help you write a professional summary. Based on what you've shared, I'll create a compelling introduction for your CV.",
  complete: "Congratulations! 🎉 Your CV is ready! You can preview it on the right and download it as a PDF.",
}

export function ChatInterface() {
  const { 
    cvData, 
    updatePersonalInfo, 
    addWorkExperience, 
    addEducation, 
    setSkills,
    currentSection, 
    setCurrentSection 
  } = useCV()
  
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize with greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: sectionQuestions.greeting,
      }])
    }
  }, [messages.length])

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Focus input
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const processUserInput = async (userMessage: string) => {
    // Add user message
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userMessage,
    }
    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)

    // Process based on current section
    let nextSection = currentSection
    let assistantResponse = ''

    try {
      switch (currentSection) {
        case 'greeting':
          updatePersonalInfo({ fullName: userMessage.trim() })
          nextSection = 'personal-info'
          assistantResponse = `Nice to meet you, ${userMessage.trim()}! 👋 Now let's add your contact details. What's your email address?`
          break

        case 'personal-info':
          if (!cvData.personalInfo.email) {
            updatePersonalInfo({ email: userMessage.trim() })
            assistantResponse = "Got it! What's your phone number? (Include country code if needed, e.g., +27 82 123 4567)"
          } else if (!cvData.personalInfo.phone) {
            updatePersonalInfo({ phone: userMessage.trim() })
            assistantResponse = "Perfect! Where are you based? (City, Province — e.g., Cape Town, Western Cape)"
          } else if (!cvData.personalInfo.location) {
            updatePersonalInfo({ location: userMessage.trim() })
            assistantResponse = "Great! Do you have a LinkedIn profile? (Just paste the URL, or type 'skip' if you don't have one)"
          } else {
            if (userMessage.toLowerCase() !== 'skip') {
              updatePersonalInfo({ linkedIn: userMessage.trim() })
            }
            nextSection = 'work-experience'
            assistantResponse = "Excellent! Now let's talk about your work experience. Tell me about your most recent job — what was your job title and company name?"
          }
          break

        case 'work-experience':
          if (userMessage.toLowerCase() === 'done' || userMessage.toLowerCase() === 'skip') {
            nextSection = 'education'
            assistantResponse = "Got it! Let's move on to your education. What's your highest qualification? (e.g., Matric, Diploma, Degree — include the institution name)"
          } else {
            // Parse work experience
            const workId = crypto.randomUUID()
            addWorkExperience({
              id: workId,
              company: extractCompany(userMessage),
              position: extractPosition(userMessage),
              startDate: '',
              endDate: '',
              current: false,
              description: userMessage,
              achievements: [],
            })
            assistantResponse = "Nice! Tell me more about what you did in this role — your responsibilities and any achievements. When you're done adding jobs, type 'done' to continue."
          }
          break

        case 'education':
          if (userMessage.toLowerCase() === 'done' || userMessage.toLowerCase() === 'skip') {
            nextSection = 'skills'
            assistantResponse = "Perfect! Now list your key skills — both technical skills (like Excel, coding, design) and soft skills (like communication, leadership). Separate them with commas."
          } else {
            const eduId = crypto.randomUUID()
            addEducation({
              id: eduId,
              institution: extractInstitution(userMessage),
              degree: extractDegree(userMessage),
              field: '',
              startDate: '',
              endDate: '',
            })
            assistantResponse = "Great! Any other qualifications? Type 'done' when you're finished."
          }
          break

        case 'skills':
          const skillList = userMessage.split(',').map(s => s.trim()).filter(Boolean)
          const skillObjects = skillList.map(name => ({
            id: crypto.randomUUID(),
            name,
            level: 'intermediate' as const,
          }))
          setSkills(skillObjects)
          nextSection = 'summary'
          assistantResponse = `Excellent! You've listed ${skillList.length} skills. Now I'll help you write a professional summary. In 2-3 sentences, describe yourself professionally — or type 'generate' and I'll create one for you based on your experience.`
          break

        case 'summary':
          if (userMessage.toLowerCase() === 'generate') {
            const generatedSummary = generateSummary(cvData)
            updatePersonalInfo({ summary: generatedSummary })
            assistantResponse = `Here's a professional summary I created for you:\n\n"${generatedSummary}"\n\nYou can edit this anytime in the preview.`
          } else {
            updatePersonalInfo({ summary: userMessage.trim() })
            assistantResponse = "Perfect! That's a great summary."
          }
          nextSection = 'complete'
          assistantResponse += "\n\n🎉 Congratulations! Your CV is ready! You can:\n• Preview it on the right\n• Choose different templates\n• Download it as a PDF\n\nFeel free to make any changes by clicking on the preview."
          break

        case 'complete':
          assistantResponse = "Your CV is ready! You can preview it on the right, change templates, or download as PDF. If you want to update anything, just let me know what section you'd like to edit."
          break
      }
    } catch {
      assistantResponse = "I didn't quite catch that. Could you try again?"
    }

    // Add assistant response
    setMessages(prev => [...prev, {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: assistantResponse,
    }])

    setCurrentSection(nextSection)
    setIsLoading(false)
    setInput('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    processUserInput(input)
  }

  return (
    <div className="flex flex-col h-full bg-card rounded-xl border border-border overflow-hidden">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">CV Assistant</h3>
            <p className="text-xs text-muted-foreground">Online • Ready to help</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Typing...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-muted/30">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-background"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Press Enter to send • Type &quot;skip&quot; to move to next section
        </p>
      </form>
    </div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-primary' : 'bg-muted'
      }`}>
        {isUser ? (
          <User className="h-4 w-4 text-primary-foreground" />
        ) : (
          <Bot className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${
        isUser 
          ? 'bg-primary text-primary-foreground rounded-br-md' 
          : 'bg-muted text-foreground rounded-bl-md'
      }`}>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  )
}

// Helper functions to extract info from natural language
function extractCompany(text: string): string {
  const atMatch = text.match(/(?:at|@)\s+([A-Za-z0-9\s&.]+?)(?:\s+as|\s+from|$)/i)
  if (atMatch) return atMatch[1].trim()
  
  const parts = text.split(/,|at|@/i)
  if (parts.length > 1) return parts[1].trim()
  
  return text.split(' ').slice(-2).join(' ')
}

function extractPosition(text: string): string {
  const asMatch = text.match(/(?:as\s+(?:a|an)?\s*)([A-Za-z\s]+?)(?:\s+at|\s+@|$)/i)
  if (asMatch) return asMatch[1].trim()
  
  const parts = text.split(/,|at|@/i)
  if (parts.length > 0) return parts[0].trim()
  
  return text.split(' ').slice(0, 3).join(' ')
}

function extractInstitution(text: string): string {
  const fromMatch = text.match(/(?:from|at)\s+([A-Za-z\s&.]+?)(?:\s+in|\s+with|$)/i)
  if (fromMatch) return fromMatch[1].trim()
  
  const parts = text.split(/,|from|at/i)
  if (parts.length > 1) return parts[1].trim()
  
  return text
}

function extractDegree(text: string): string {
  const degreeMatch = text.match(/(matric|diploma|degree|bachelor|master|phd|certificate|bcom|bsc|ba|mba)/i)
  if (degreeMatch) return degreeMatch[0]
  
  const parts = text.split(/,|from|at/i)
  if (parts.length > 0) return parts[0].trim()
  
  return text
}

function generateSummary(cvData: { personalInfo: { fullName: string }, workExperience: { position: string, company: string }[], skills: { name: string }[] }): string {
  const { personalInfo, workExperience, skills } = cvData
  const name = personalInfo.fullName.split(' ')[0]
  const recentJob = workExperience[0]
  const topSkills = skills.slice(0, 3).map(s => s.name).join(', ')

  if (recentJob) {
    return `Results-driven professional with experience as ${recentJob.position}. Skilled in ${topSkills || 'various areas'}. Committed to delivering high-quality work and contributing to team success.`
  }

  return `Motivated professional with skills in ${topSkills || 'various areas'}. Eager to contribute to a dynamic team and grow professionally. Committed to delivering excellent results.`
}
