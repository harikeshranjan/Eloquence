"use client";

import Link from "next/link"
import ModeToggle from "./mode-toggle"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

function Navbar() {
  const router = useRouter()

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-gray-200/20 dark:border-neutral-700/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 text-2xl font-light">
                Eloquence
              </h1>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <ul className="flex items-center space-x-1">
              <li>
                <Link href="/paragraph" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Paragraphs
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <div className="p-1">
              <ModeToggle />
            </div>

            {/* Add Paragraph button */}
            <Button
              variant={"secondary"}
              className="flex items-center justify-center cursor-pointer group bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transform transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => router.push("/add-paragraph")}
            >
              <Plus />
              Add
            </Button>
            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger>
                <div className="md:hidden">
                  <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="mb-5">Menu</SheetTitle>
                  <SheetDescription>
                    <ul className="flex flex-col space-y-4">
                      <li>
                        <Link href="/paragraph" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                          Paragraphs
                        </Link>
                      </li>
                    </ul>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar