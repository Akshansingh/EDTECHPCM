"use client"

import { useState, useEffect } from "react"
import { X, FileText, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import PDFViewer from "./pdf-viewer"

interface PreviousYearQuestionsProps {
  subject: "physics" | "chemistry" | "math"
  topic: string
  onClose: () => void
}

// Sample PDF data structure
interface PDFData {
  id: string
  title: string
  year: number
  url: string
  pages: number
  source: string
}

// Sample PDF data for different subjects and topics
const pdfData: Record<string, Record<string, PDFData[]>> = {
  physics: {
    "Newton's First Law of Motion": [
      {
        id: "physics-newton-first-law-2022",
        title: "Newton's First Law of Motion - CBSE 2022",
        year: 2022,
        url: "/pdfs/physics/newtons-first-law-2022.pdf",
        pages: 5,
        source: "CBSE",
      },
      {
        id: "physics-newton-first-law-2021",
        title: "Newton's First Law of Motion - CBSE 2021",
        year: 2021,
        url: "/pdfs/physics/newtons-first-law-2021.pdf",
        pages: 4,
        source: "CBSE",
      },
      {
        id: "physics-newton-first-law-jee-2022",
        title: "Newton's Laws - JEE Main 2022",
        year: 2022,
        url: "/pdfs/physics/newtons-laws-jee-2022.pdf",
        pages: 8,
        source: "JEE Main",
      },
    ],
    Thermodynamics: [
      {
        id: "physics-thermodynamics-2022",
        title: "Thermodynamics - CBSE 2022",
        year: 2022,
        url: "/pdfs/physics/thermodynamics-2022.pdf",
        pages: 6,
        source: "CBSE",
      },
      {
        id: "physics-thermodynamics-2021",
        title: "Thermodynamics - CBSE 2021",
        year: 2021,
        url: "/pdfs/physics/thermodynamics-2021.pdf",
        pages: 5,
        source: "CBSE",
      },
    ],
  },
  chemistry: {
    "Nature of Matter": [
      {
        id: "chemistry-nature-of-matter-2022",
        title: "Nature of Matter - CBSE 2022",
        year: 2022,
        url: "/pdfs/chemistry/nature-of-matter-2022.pdf",
        pages: 4,
        source: "CBSE",
      },
      {
        id: "chemistry-nature-of-matter-2021",
        title: "Nature of Matter - CBSE 2021",
        year: 2021,
        url: "/pdfs/chemistry/nature-of-matter-2021.pdf",
        pages: 3,
        source: "CBSE",
      },
    ],
    "Periodic Table": [
      {
        id: "chemistry-periodic-table-2022",
        title: "Periodic Table - CBSE 2022",
        year: 2022,
        url: "/pdfs/chemistry/periodic-table-2022.pdf",
        pages: 7,
        source: "CBSE",
      },
      {
        id: "chemistry-periodic-table-2021",
        title: "Periodic Table - CBSE 2021",
        year: 2021,
        url: "/pdfs/chemistry/periodic-table-2021.pdf",
        pages: 6,
        source: "CBSE",
      },
      {
        id: "chemistry-periodic-table-jee-2022",
        title: "Periodic Table - JEE Main 2022",
        year: 2022,
        url: "/pdfs/chemistry/periodic-table-jee-2022.pdf",
        pages: 9,
        source: "JEE Main",
      },
    ],
  },
  math: {
    Sets: [
      {
        id: "math-sets-2022",
        title: "Sets - CBSE 2022",
        year: 2022,
        url: "/pdfs/math/sets-2022.pdf",
        pages: 5,
        source: "CBSE",
      },
      {
        id: "math-sets-2021",
        title: "Sets - CBSE 2021",
        year: 2021,
        url: "/pdfs/math/sets-2021.pdf",
        pages: 4,
        source: "CBSE",
      },
    ],
    Matrices: [
      {
        id: "math-matrices-2022",
        title: "Matrices - CBSE 2022",
        year: 2022,
        url: "/pdfs/math/matrices-2022.pdf",
        pages: 6,
        source: "CBSE",
      },
      {
        id: "math-matrices-2021",
        title: "Matrices - CBSE 2021",
        year: 2021,
        url: "/pdfs/math/matrices-2021.pdf",
        pages: 5,
        source: "CBSE",
      },
      {
        id: "math-matrices-jee-2022",
        title: "Matrices - JEE Main 2022",
        year: 2022,
        url: "/pdfs/math/matrices-jee-2022.pdf",
        pages: 8,
        source: "JEE Main",
      },
    ],
  },
}

// Add more topics as needed
const allTopics = [
  // Physics
  "Newton's First Law of Motion",
  "Newton's Second Law of Motion",
  "Newton's Third Law of Motion",
  "Thermodynamics",
  "Electromagnetism",
  "Optics",
  "Quantum Mechanics",

  // Chemistry
  "Nature of Matter",
  "Periodic Table",
  "Chemical Bonding",
  "Acids and Bases",
  "Organic Chemistry",

  // Math
  "Sets",
  "Relations & Functions",
  "Trigonometric Functions",
  "Matrices",
  "Calculus",
  "Probability",
]

// Function to get similar topics if exact match not found
const getSimilarTopics = (topic: string): string[] => {
  return allTopics.filter(
    (t) => t.toLowerCase().includes(topic.toLowerCase()) || topic.toLowerCase().includes(t.toLowerCase()),
  )
}

// Sample PDF for when no specific PDFs are found
const samplePDFs: PDFData[] = [
  {
    id: "sample-cbse-2022",
    title: "CBSE Sample Paper 2022",
    year: 2022,
    url: "/pdfs/sample-cbse-2022.pdf",
    pages: 10,
    source: "CBSE",
  },
  {
    id: "sample-cbse-2021",
    title: "CBSE Sample Paper 2021",
    year: 2021,
    url: "/pdfs/sample-cbse-2021.pdf",
    pages: 8,
    source: "CBSE",
  },
  {
    id: "sample-jee-2022",
    title: "JEE Main Sample Paper 2022",
    year: 2022,
    url: "/pdfs/sample-jee-2022.pdf",
    pages: 12,
    source: "JEE Main",
  },
]

export default function PreviousYearQuestions({ subject, topic, onClose }: PreviousYearQuestionsProps) {
  const [selectedPDF, setSelectedPDF] = useState<PDFData | null>(null)
  const [pdfs, setPdfs] = useState<PDFData[]>([])

  // Find the appropriate PDFs for the topic
  useEffect(() => {
    // Try to find an exact match first
    if (pdfData[subject]?.[topic]) {
      setPdfs(pdfData[subject][topic])
    } else {
      // If no exact match, try to find similar topics
      const similarTopics = getSimilarTopics(topic)
      let foundMatch = false

      if (similarTopics.length > 0) {
        // Use the first similar topic that has PDF data
        for (const similarTopic of similarTopics) {
          if (pdfData[subject]?.[similarTopic]) {
            setPdfs(pdfData[subject][similarTopic])
            foundMatch = true
            break
          }
        }
      }

      // If still no match, use sample PDFs
      if (!foundMatch) {
        setPdfs(samplePDFs)
      }
    }
  }, [subject, topic])

  // Get the appropriate styling based on subject
  const getSubjectStyles = () => {
    switch (subject) {
      case "physics":
        return {
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
          borderColor: "border-blue-200 dark:border-blue-800",
          textColor: "text-blue-800 dark:text-blue-300",
          buttonBg: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600",
          buttonOutline:
            "border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30",
          hoverBg: "hover:bg-blue-100 dark:hover:bg-blue-800/50",
        }
      case "chemistry":
        return {
          bgColor: "bg-purple-50 dark:bg-purple-900/20",
          borderColor: "border-purple-200 dark:border-purple-800",
          textColor: "text-purple-800 dark:text-purple-300",
          buttonBg: "bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600",
          buttonOutline:
            "border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30",
          hoverBg: "hover:bg-purple-100 dark:hover:bg-purple-800/50",
        }
      case "math":
        return {
          bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
          borderColor: "border-indigo-200 dark:border-indigo-800",
          textColor: "text-indigo-800 dark:text-indigo-300",
          buttonBg: "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600",
          buttonOutline:
            "border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30",
          hoverBg: "hover:bg-indigo-100 dark:hover:bg-indigo-800/50",
        }
      default:
        return {
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
          borderColor: "border-blue-200 dark:border-blue-800",
          textColor: "text-blue-800 dark:text-blue-300",
          buttonBg: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600",
          buttonOutline:
            "border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30",
          hoverBg: "hover:bg-blue-100 dark:hover:bg-blue-800/50",
        }
    }
  }

  const styles = getSubjectStyles()

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl ${styles.borderColor}`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 ${styles.bgColor} rounded-t-lg`}>
          <h3 className={`text-lg font-medium ${styles.textColor}`}>Previous Year Questions: {topic}</h3>
          <Button variant="outline" size="icon" onClick={onClose} className={styles.buttonOutline}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* PDF List */}
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {pdfs.length > 0 ? (
            <div className="space-y-3">
              {pdfs.map((pdf) => (
                <div
                  key={pdf.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${styles.borderColor} ${styles.hoverBg}`}
                  onClick={() => setSelectedPDF(pdf)}
                >
                  <div className="flex items-start gap-3">
                    <FileText className={`h-5 w-5 mt-0.5 flex-shrink-0 ${styles.textColor}`} />
                    <div className="flex-1">
                      <h4 className="font-medium">{pdf.title}</h4>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <span>Year: {pdf.year}</span>
                        <span>Source: {pdf.source}</span>
                        <span>Pages: {pdf.pages}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild className={styles.buttonOutline}>
                        <a href={pdf.url} download target="_blank" rel="noopener noreferrer">
                          <Download className="h-3.5 w-3.5 mr-1" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No PDFs Found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We couldn't find any previous year questions for this topic.
              </p>
              <Button className={styles.buttonBg}>Browse All PDFs</Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <Button variant="outline" onClick={onClose} className={styles.buttonOutline}>
            Close
          </Button>
          <Button className={styles.buttonBg} asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Browse More PDFs
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {selectedPDF && (
        <PDFViewer pdfUrl={selectedPDF.url} title={selectedPDF.title} onClose={() => setSelectedPDF(null)} />
      )}
    </div>
  )
}
