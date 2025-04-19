"use client"

import { ApiKeyChecker } from "@/components/api-key-checker"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ApiCheckPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">API Configuration Check</h1>

      <div className="space-y-6 max-w-3xl">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">YouTube API Status</h2>
          <ApiKeyChecker />

          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
            <h3 className="font-medium mb-2">Current Environment Variables:</h3>
            <pre className="text-sm overflow-x-auto p-2 bg-gray-100 dark:bg-gray-800 rounded">
              NEXT_PUBLIC_YOUTUBE_API_KEY: {process.env.NEXT_PUBLIC_YOUTUBE_API_KEY ? "✓ Set" : "✗ Not set"}
            </pre>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-2">Troubleshooting:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Make sure you have added the YouTube API key to your <code>.env.local</code> file
              </li>
              <li>Verify that the API key has YouTube Data API v3 enabled</li>
              <li>Check if you have exceeded your daily quota</li>
              <li>Ensure the API key has proper restrictions set (HTTP referrers, etc.)</li>
            </ul>
          </div>
        </div>

        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}
