"use client"

import { useState } from "react"
import { X, Download, ChevronLeft, ChevronRight, Maximize, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PDFViewerProps {
  pdfUrl: string
  title: string
  onClose: () => void
}

export default function PDFViewer({ pdfUrl, title, onClose }: PDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleFullscreen = () => {
    const viewer = document.getElementById("pdf-viewer-container")
    if (!isFullscreen) {
      if (viewer?.requestFullscreen) {
        viewer.requestFullscreen()
        setIsFullscreen(true)
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div
        id="pdf-viewer-container"
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col w-full max-w-5xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium truncate">{title}</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <a href={pdfUrl} download target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download PDF</span>
              </a>
            </Button>
            <Button variant="outline" size="icon" onClick={handleFullscreen}>
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              <span className="sr-only">{isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}</span>
            </Button>
            <Button variant="outline" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            className="w-full h-full"
            title={title}
            onLoad={(e) => {
              // This is a placeholder for when we can get total pages
              // In a real implementation, you might need a PDF.js library
              setTotalPages(10) // Placeholder
            }}
          />
        </div>

        {/* Footer with navigation */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm">
            Page {currentPage} of {totalPages || "?"}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages || Number.POSITIVE_INFINITY, currentPage + 1))}
              disabled={totalPages ? currentPage >= totalPages : false}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
