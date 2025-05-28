"use client";

import { IParagraph } from '@/models/paragraph';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Edit, Trash } from 'lucide-react';

// Extended interface for display purposes
interface DisplayParagraph extends IParagraph {
  id: string;
  category: string;
  gradient: string;
}

export default function RecentParagraphs() {
  const [paragraphs, setParagraphs] = useState<DisplayParagraph[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Color gradients for categories
  const gradients = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600',
    'from-pink-500 to-rose-600',
    'from-orange-500 to-red-600',
    'from-indigo-500 to-blue-600',
    'from-yellow-500 to-orange-600',
    'from-purple-500 to-pink-600',
    'from-teal-500 to-green-600',
    'from-red-500 to-pink-600',
    'from-cyan-500 to-blue-600'
  ];

  // Function to categorize paragraphs based on content/tags
  const categorizeParagraph = (paragraph: IParagraph): string => {
    const content = paragraph.content.toLowerCase();
    const tags = paragraph.tags.map(tag => tag.toLowerCase());
    const allText = [...tags, content].join(' ');

    const categories: { [key: string]: string[] } = {
      Technology: [
        'technology', 'tech', 'programming', 'code', 'coding', 'software', 'development',
        'computing', 'ai', 'machine learning', 'data', 'cybersecurity', 'web', 'app', 'backend', 'frontend'
      ],
      Business: [
        'business', 'marketing', 'finance', 'sales', 'entrepreneur', 'startup', 'commerce',
        'economy', 'investment', 'strategy', 'leadership'
      ],
      Health: [
        'health', 'fitness', 'medical', 'medicine', 'wellness', 'nutrition', 'mental health',
        'exercise', 'workout', 'diet', 'therapy'
      ],
      Education: [
        'education', 'learning', 'study', 'school', 'university', 'college', 'teaching',
        'academic', 'exam', 'curriculum', 'student'
      ],
      Travel: [
        'travel', 'adventure', 'journey', 'trip', 'vacation', 'tourism', 'explore', 'destination',
        'hiking', 'backpacking', 'holiday', 'getaway'
      ],
      Food: [
        'food', 'recipe', 'cooking', 'cuisine', 'dish', 'meal', 'baking', 'restaurant', 'kitchen',
        'dining', 'snack', 'gourmet'
      ],
      Creative: [
        'art', 'creative', 'design', 'drawing', 'painting', 'photography', 'illustration',
        'craft', 'fashion', 'aesthetic', 'interior design', 'styling'
      ],
      Science: [
        'science', 'research', 'experiment', 'physics', 'chemistry', 'biology', 'scientific',
        'lab', 'astronomy', 'theory', 'innovation'
      ],
      Personal: [
        'personal', 'life', 'experience', 'thoughts', 'story', 'journey', 'feelings', 'diary',
        'reflection', 'growth', 'emotion', 'insight'
      ],
      Sports: [
        'sports', 'game', 'football', 'soccer', 'basketball', 'cricket', 'athlete', 'match',
        'tournament', 'team', 'league', 'competition'
      ],
      Entertainment: [
        'entertainment', 'movie', 'film', 'music', 'concert', 'show', 'drama', 'theatre',
        'celebrity', 'series', 'netflix', 'hollywood'
      ],
    };

    for (const [category, keywords] of Object.entries(categories)) {
      for (const keyword of keywords) {
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        if (regex.test(allText)) {
          return category;
        }
      }
    }

    return 'General';
  };

  // Transform API data to display format
  const transformParagraphs = (apiParagraphs: IParagraph[]): DisplayParagraph[] => {
    const categoryCount: { [key: string]: number } = {};

    return apiParagraphs.map((paragraph) => {
      const category = categorizeParagraph(paragraph);
      categoryCount[category] = (categoryCount[category] || 0) + 1;

      // Assign gradient based on category
      const categoryIndex = Object.keys(categoryCount).indexOf(category);
      const gradient = gradients[categoryIndex % gradients.length];

      return {
        ...paragraph,
        id: paragraph._id?.toString() || Math.random().toString(36),
        category,
        gradient,
      };
    });
  };

  // Get unique categories
  const categories = ['All', ...new Set(paragraphs.map(p => p.category))];

  // Filter paragraphs based on search and category
  const filteredParagraphs = paragraphs.filter(paragraph => {
    const matchesSearch = paragraph.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paragraph.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paragraph.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || paragraph.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const fetchParagraphs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/paragraph');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("Fetched paragraphs:", data);

      // Transform the data and set state
      const transformedParagraphs = transformParagraphs(data);
      setParagraphs(transformedParagraphs);
    } catch (error) {
      console.error("Error fetching paragraphs:", error);
      toast("Error", {
        description: "Failed to load paragraphs. Please try again later.",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParagraphs();
  }, []);

  if (loading) {
    return (
      <div className="my-20 px-4">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-12 px-4">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center space-y-7 mb-12">
        <h1 className="pb-3 text-3xl md:text-4xl lg:text-5xl font-medium text-center bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          All Your Paragraphs
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-center max-w-2xl text-gray-600 dark:text-gray-400">
          Your complete collection of written paragraphs. Click on any paragraph to view or edit it.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-4xl mx-auto mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search paragraphs by title, content, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-white"
          />
          <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-700'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-200 dark:border-neutral-700 text-center">
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{paragraphs.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Paragraphs</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-200 dark:border-neutral-700 text-center">
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {paragraphs.reduce((total, p) => total + p.wordCount, 0)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Words</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-200 dark:border-neutral-700 text-center">
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{categories.length - 1}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
          </div>
        </div>
      </div>

      {/* Paragraphs Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredParagraphs.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400">No paragraphs found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParagraphs.map((paragraph) => (
              <ContextMenu>
                <ContextMenuTrigger>
                  <div
                    key={paragraph.id}
                    className="group relative overflow-hidden bg-white dark:bg-neutral-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-neutral-700 hover:border-transparent hover:-translate-y-2 cursor-pointer"
                  >
                    {/* Gradient accent bar */}
                    <div className={`h-1.5 bg-gradient-to-r ${paragraph.gradient}`}></div>

                    {/* Card content */}
                    <div className="p-6 space-y-4">
                      {/* Header with category and date */}
                      <div className="flex justify-between items-start text-xs text-gray-500 dark:text-gray-400">
                        <span className={`px-2 py-1 rounded-full bg-gradient-to-r ${paragraph.gradient} text-white font-medium`}>
                          {paragraph.category}
                        </span>
                        <span>{formatDate(paragraph.createdAt!)}</span>
                      </div>

                      {/* Title */}
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${paragraph.gradient} shadow-lg`}></div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                          {paragraph.title}
                        </h2>
                      </div>

                      {/* Content */}
                      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-4">
                        {paragraph.content}
                      </p>

                      {/* Tags */}
                      {paragraph.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {paragraph.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 rounded-md"
                            >
                              #{tag}
                            </span>
                          ))}
                          {paragraph.tags.length > 3 && (
                            <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 rounded-md">
                              +{paragraph.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Footer with word count and read more */}
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs text-gray-400">{paragraph.wordCount} words</span>
                        <button className={`text-sm font-medium bg-gradient-to-r ${paragraph.gradient} bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200 flex items-center space-x-1`}>
                          <span>Read more</span>
                        </button>
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${paragraph.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem className='flex items-center'>
                    <Edit className="mr-2" />
                    Edit
                  </ContextMenuItem>
                  <ContextMenuItem className='flex items-center'>
                    <Trash className="mr-2" />
                    Delete
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}