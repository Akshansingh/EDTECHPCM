"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { UserMenu } from "@/components/user-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white dark:bg-gray-900 text-blue-800 dark:text-blue-300 sticky top-0 z-50 border-b border-blue-200 dark:border-blue-800 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 border-2 border-blue-600 dark:border-blue-400 rounded-full"></div>
              <div className="absolute inset-2 border border-blue-600 dark:border-blue-400 rounded-full"></div>
              <div className="absolute inset-0 bg-blue-600 dark:bg-blue-400 rounded-full opacity-20"></div>
            </div>
            <span className="font-bold text-xl text-blue-700 dark:text-blue-300">EdTech</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link href="/physics" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Physics
            </Link>
            <Link href="/chemistry" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Chemistry
            </Link>
            <Link href="/math" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Math
            </Link>
            <Link href="/quiz" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Quiz
            </Link>
          </nav>

          <div className="hidden md:flex items-center">
            <UserMenu />
          </div>

          <div className="flex items-center md:hidden space-x-4">
            <UserMenu />
            <button
              className="text-blue-800 dark:text-blue-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 p-4 border-t border-blue-100 dark:border-blue-800">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-blue-800 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/physics"
              className="text-blue-800 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Physics
            </Link>
            <Link
              href="/chemistry"
              className="text-blue-800 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Chemistry
            </Link>
            <Link
              href="/math"
              className="text-blue-800 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Math
            </Link>
            <Link
              href="/quiz"
              className="text-blue-800 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Quiz
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
