'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCV } from '@/lib/cv-context'
import { Download, Loader2 } from 'lucide-react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export function DownloadButton() {
  const { cvData } = useCV()
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    const element = document.getElementById('cv-preview')
    if (!element) return

    setIsDownloading(true)

    try {
      // Create canvas from the CV preview
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      })

      // Create PDF
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 0

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)

      // Generate filename from user's name
      const fileName = cvData.personalInfo.fullName
        ? `${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.pdf`
        : 'My_CV.pdf'

      pdf.save(fileName)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const hasContent = cvData.personalInfo.fullName || cvData.workExperience.length > 0

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading || !hasContent}
      className="w-full"
      size="lg"
    >
      {isDownloading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </>
      )}
    </Button>
  )
}

export function DownloadButtonCompact() {
  const { cvData } = useCV()
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    const element = document.getElementById('cv-preview')
    if (!element) return

    setIsDownloading(true)

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 0

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)

      const fileName = cvData.personalInfo.fullName
        ? `${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.pdf`
        : 'My_CV.pdf'

      pdf.save(fileName)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading}
      variant="outline"
      size="sm"
    >
      {isDownloading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      <span className="sr-only">Download PDF</span>
    </Button>
  )
}
