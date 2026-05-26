'use client'

import { Button } from '@/components/ui/button'
import { FileText, MessageCircle, Download, CheckCircle } from 'lucide-react'

interface HeroSectionProps {
  onGetStarted: () => void
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm font-medium text-secondary-foreground mb-8">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          Built for South African Job Seekers
        </div>

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance">
          Build Your Professional CV
          <span className="block text-primary">In Minutes, Not Hours</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
          Chat with our AI assistant to create an ATS-friendly CV that stands out. 
          No design skills needed — just answer a few questions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button 
            size="lg" 
            className="w-full sm:w-auto text-lg px-8 py-6 shadow-lg shadow-primary/20"
            onClick={onGetStarted}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Start Building — Free
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto text-lg px-8 py-6"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            See How It Works
          </Button>
        </div>

        {/* Features grid */}
        <div id="features" className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <FeatureCard
            icon={<MessageCircle className="h-6 w-6" />}
            title="Chat-Based Builder"
            description="Like chatting on WhatsApp — just answer questions and watch your CV come to life"
          />
          <FeatureCard
            icon={<FileText className="h-6 w-6" />}
            title="Professional Templates"
            description="Choose from Simple, Modern, or Executive designs suited for SA employers"
          />
          <FeatureCard
            icon={<Download className="h-6 w-6" />}
            title="Instant PDF Download"
            description="Download your finished CV as a professional PDF, ready to send"
          />
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-10 border-t border-border">
          <p className="text-sm text-muted-foreground mb-6">Trusted features for your job search</p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <TrustItem text="ATS-Friendly Format" />
            <TrustItem text="No Account Required" />
            <TrustItem text="100% Free to Use" />
            <TrustItem text="SA Job Market Focus" />
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <div className="p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
      <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function TrustItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle className="h-4 w-4 text-accent" />
      <span className="text-sm font-medium">{text}</span>
    </div>
  )
}
