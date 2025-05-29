import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Brand/Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 text-2xl font-light">
                Eloquence
              </h1>
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className="flex space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/about-us" className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200">
              About
            </Link>
            <a href="#" className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200">
              Terms
            </a>
            <a href="#" className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200">
              Contact
            </a>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-neutral-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2025 Paragraphs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}