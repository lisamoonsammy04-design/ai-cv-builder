'use client'

import { Button } from '@/components/ui/button'
import { ChatInterface } from '@/components/chat-interface'
import { CVPreview } from '@/components/cv-preview'
import { TemplateSelector } from '@/components/template-selector'
import { ATSScoreCompact, ATSScoreTips } from '@/components/ats-score'
import { DownloadButton, DownloadButtonCompact } from '@/components/download-button'
import { ArrowLeft, FileText, Eye, MessageCircle } from 'lucide-react'
import { useState } from 'react'

interface CVBuilderPageProps {
  onBack: () => void
}

export function CVBuilderPage({ onBack }: CVBuilderPageProps) {
  const [mobileView, setMobileView] = useState<'chat' | 'preview'>('chat')

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-3 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to home</span>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground hidden sm:inline">CV Builder</span>
            </div>
          </div>

          {/* Mobile view toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant={mobileView === 'chat' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMobileView('chat')}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Chat
            </Button>
            <Button
              variant={mobileView === 'preview' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMobileView('preview')}
            >
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ATSScoreCompact />
            <DownloadButtonCompact />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex overflow-hidden">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row">
          {/* Chat Panel */}
          <div className={`w-full lg:w-[45%] lg:min-w-[400px] lg:max-w-[500px] flex flex-col border-r border-border ${
            mobileView === 'chat' ? 'flex' : 'hidden lg:flex'
          }`}>
            <div className="flex-1 p-4 overflow-hidden">
              <ChatInterface />
            </div>
          </div>

          {/* Preview Panel */}
          <div className={`flex-1 flex flex-col bg-muted/30 ${
            mobileView === 'preview' ? 'flex' : 'hidden lg:flex'
          }`}>
            {/* Preview Header */}
            <div className="p-4 border-b border-border bg-background/50 flex items-center justify-between gap-4">
              <TemplateSelector />
              <div className="lg:hidden">
                <DownloadButtonCompact />
              </div>
            </div>

            {/* CV Preview */}
            <div className="flex-1 p-4 overflow-hidden">
              <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden">
                <CVPreview />
              </div>
            </div>

            {/* Mobile Bottom Bar */}
            <div className="p-4 border-t border-border bg-card lg:hidden">
              <div className="space-y-3">
                <ATSScoreTips />
                <DownloadButton />
              </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block p-4 border-t border-border bg-card">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <ATSScoreTips />
                </div>
                <DownloadButton />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
