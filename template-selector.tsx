'use client'

import { useCV } from '@/lib/cv-context'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import type { TemplateType } from '@/lib/types'

const templates: { id: TemplateType; name: string; description: string }[] = [
  {
    id: 'simple',
    name: 'Simple',
    description: 'Clean and minimal — perfect for any industry',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with accent colors',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Sophisticated and professional',
  },
]

export function TemplateSelector() {
  const { template, setTemplate } = useCV()

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">Choose Template</label>
      <div className="flex gap-2">
        {templates.map((t) => (
          <Button
            key={t.id}
            variant={template === t.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTemplate(t.id)}
            className="relative flex-1"
          >
            {template === t.id && (
              <Check className="h-3 w-3 mr-1" />
            )}
            {t.name}
          </Button>
        ))}
      </div>
    </div>
  )
}

export function TemplateSelectorFull() {
  const { template, setTemplate } = useCV()

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">CV Template</label>
      <div className="grid gap-3">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              template === t.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 bg-card'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">{t.name}</h4>
                <p className="text-sm text-muted-foreground">{t.description}</p>
              </div>
              {template === t.id && (
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
