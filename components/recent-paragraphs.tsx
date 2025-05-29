"use client";

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Paragraph {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
  gradient: string;
  category?: string;
}

const gradients = [
  "from-rose-500 to-pink-500",
  "from-blue-500 to-indigo-500",
  "from-emerald-500 to-teal-500"
];

export default function RecentParagraphs() {
  const router = useRouter();
  const [paragraphs, setParagraphs] = useState<Paragraph[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRecentParagraphs = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/paragraph/top-three', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        toast("Error", {
          description: "Failed to fetch recent paragraphs. Please try again later.",
          duration: 3000,
        });
      }

      const paragraphs = await response.json();
      const formattedParagraphs = paragraphs.map((paragraph: Paragraph, index: number) => {
        return {
          ...paragraph,
          gradient: gradients[index % gradients.length],
        }
      })
      setParagraphs(formattedParagraphs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recent paragraphs:", error);
      toast("Error", {
        description: "Internal server error. Please try again later.",
        duration: 3000,
      })
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecentParagraphs()
  }, []);

  return (
    <div className="my-20 px-4">
      <div className="flex flex-col items-center justify-center space-y-7">
        <h1 className="text-xl md:text-2xl lg:text-3xl text-center font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Your Recent Paragraphs
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </div>

      {!loading ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-7xl mx-auto">
            {paragraphs.map((paragraph, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-white dark:bg-neutral-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-neutral-700 hover:border-transparent hover:-translate-y-2 cursor-pointer"
                onClick={() => router.push(`/paragraph/${paragraph._id}`)}
              >
                {/* Gradient accent bar */}
                <div className={`h-1.5 bg-gradient-to-r ${paragraph.gradient}`}></div>

                {/* Card content */}
                <div className="p-6 space-y-4">
                  {/* Title with gradient icon */}
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${paragraph.gradient} shadow-lg`}></div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                      {paragraph.title}
                    </h2>
                  </div>

                  {/* Content */}
                  <p className="text-justify text-sm leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-6">
                    {paragraph.content}
                  </p>

                  {/* Read more button */}
                  <div className="pt-2">
                    <button className={`text-sm font-medium bg-gradient-to-r ${paragraph.gradient} bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200 flex items-center space-x-1`}>
                      <span>Read more</span>
                      <svg className="w-4 h-4 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-5 dark:opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-100 to-transparent dark:via-neutral-800"></div>
                </div>

                {/* Hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${paragraph.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              </div>
            ))}
          </div>

          {/* Load more section */}
          <div className="flex justify-center mt-12">
            <button
              className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-neutral-800 dark:to-neutral-700 text-gray-700 dark:text-gray-300 rounded-xl hover:from-gray-200 hover:to-gray-300 dark:hover:from-neutral-700 dark:hover:to-neutral-600 transition-all duration-300 font-medium border border-gray-300 dark:border-neutral-600 hover:shadow-lg cursor-pointer"
              onClick={() => router.push('/paragraph')}
            >
              View All
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center mt-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-300" />
        </div>
      )}
    </div>
  );
}