"use client"

import { useEffect, useState } from "react"
import { AlertCircle, CheckCircle } from "lucide-react"

export function ApiKeyChecker() {
  const [status, setStatus] = useState<"loading" | "valid" | "invalid">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY

    if (!apiKey) {
      setStatus("invalid")
      setMessage("YouTube API key is missing. Please add it to your .env.local file.")
      return
    }

    // Test the API key with a simple request
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=test&maxResults=1&key=${apiKey}`)
      .then((response) => {
        if (response.ok) {
          setStatus("valid")
          setMessage("YouTube API key is valid and working correctly.")
        } else {
          setStatus("invalid")
          setMessage(`YouTube API key is invalid or has quota issues. Status: ${response.status}`)
        }
      })
      .catch((error) => {
        setStatus("invalid")
        setMessage(`Error testing YouTube API key: ${error.message}`)
      })
  }, [])

  if (status === "loading") {
    return (
      <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-lg">
        <div className="animate-spin mr-2 h-4 w-4 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full"></div>
        <span>Checking YouTube API key...</span>
      </div>
    )
  }

  return (
    <div
      className={`flex items-center p-4 ${
        status === "valid"
          ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200"
          : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
      } rounded-lg`}
    >
      {status === "valid" ? (
        <CheckCircle className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
      ) : (
        <AlertCircle className="mr-2 h-4 w-4 text-red-600 dark:text-red-400" />
      )}
      <span>{message}</span>
    </div>
  )
}
