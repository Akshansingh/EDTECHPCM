"use client"
import { X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SimplePDFViewerProps {
  subject: "physics" | "chemistry" | "math"
  topic: string
  onClose: () => void
}

export default function SimplePDFViewer({ subject, topic, onClose }: SimplePDFViewerProps) {
  // Sample PDF data for demonstration
  const samplePDFs = [
    {
      id: "sample-1",
      title: `${subject.charAt(0).toUpperCase() + subject.slice(1)} - ${topic} (2022)`,
      year: 2022,
      source: "CBSE",
    },
    {
      id: "sample-2",
      title: `${subject.charAt(0).toUpperCase() + subject.slice(1)} - ${topic} (2021)`,
      year: 2021,
      source: "CBSE",
    },
    {
      id: "sample-3",
      title: `${subject.charAt(0).toUpperCase() + subject.slice(1)} - ${topic} JEE Main (2022)`,
      year: 2022,
      source: "JEE Main",
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium">Previous Year Questions: {topic}</h3>
          <Button variant="outline" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* PDF List */}
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-3">
            {samplePDFs.map((pdf) => (
              <div
                key={pdf.id}
                className="p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{pdf.title}</h4>
                    <div className="flex gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                      <span>Year: {pdf.year}</span>
                      <span>Source: {pdf.source}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Browse More PDFs</Button>
        </div>
      </div>
    </div>
  )
}
