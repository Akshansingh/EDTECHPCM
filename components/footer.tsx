import Link from "next/link"

export default function Footer() {
  // Update the footer JSX to include dark mode classes
  return (
    <footer className="bg-blue-800 dark:bg-gray-900 text-white border-t border-blue-700 dark:border-blue-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 border-2 border-blue-300 dark:border-blue-400 rounded-full"></div>
                <div className="absolute inset-2 border border-blue-300 dark:border-blue-400 rounded-full"></div>
                <div className="absolute inset-0 bg-blue-300 dark:bg-blue-400 rounded-full opacity-20"></div>
              </div>
              <span className="font-bold text-xl">EdTech</span>
            </div>
            <p className="text-blue-300 dark:text-blue-400 text-sm">
              Discover the joy of learning with our curated educational resources for Physics, Chemistry, and Math.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-blue-300 dark:text-blue-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/physics" className="hover:text-white transition-colors">
                  Physics
                </Link>
              </li>
              <li>
                <Link href="/chemistry" className="hover:text-white transition-colors">
                  Chemistry
                </Link>
              </li>
              <li>
                <Link href="/math" className="hover:text-white transition-colors">
                  Math
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-white transition-colors">
                  Quiz
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-blue-300 dark:text-blue-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Study Materials
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Previous Year Papers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Video Lectures
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Mock Tests
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Doubt Solving
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-blue-300 dark:text-blue-400">
              <li>Email: info@edtech.com</li>
              <li>Phone: +1 (123) 456-7890</li>
              <li>Address: 123 Education St, Learning City</li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-blue-300 dark:text-blue-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-blue-300 dark:text-blue-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-blue-300 dark:text-blue-400 hover:text-white transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-blue-700 dark:border-blue-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-blue-300 dark:text-blue-400">
            &copy; {new Date().getFullYear()} EdTech. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="#" className="text-sm text-blue-300 dark:text-blue-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-blue-300 dark:text-blue-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-blue-300 dark:text-blue-400 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
