"use client";

import React, { useState } from 'react';

export default function RecentParagraphs() {
  // Hardcoded data - will be replaced with backend API call
  const [paragraphs] = useState([
    {
      id: 1,
      title: "The Power of Mindfulness",
      content: "Mindfulness is the practice of being fully present in the moment, aware of where we are and what we're doing, without being overly reactive to what's happening around us. It's a skill that can be developed through meditation and conscious awareness. When we practice mindfulness, we create space between our thoughts and reactions, allowing us to respond rather than react to life's challenges.",
      createdAt: "2025-05-20",
      category: "Wellness",
      wordCount: 68,
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      id: 2,
      title: "Technology and Human Connection",
      content: "In an age where digital communication dominates our interactions, we must ask ourselves whether technology brings us closer together or drives us apart. While social media platforms promise connection, they often create shallow relationships that lack the depth and authenticity of face-to-face interactions. The challenge lies in using technology as a tool to enhance rather than replace genuine human connection.",
      createdAt: "2025-05-18",
      category: "Technology",
      wordCount: 72,
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      id: 3,
      title: "The Art of Learning",
      content: "Learning is not merely the accumulation of facts and figures, but the development of understanding and wisdom. True learning involves questioning assumptions, making connections between ideas, and applying knowledge in new contexts. It requires curiosity, patience, and the humility to acknowledge what we don't know. The most profound learning often happens when we step outside our comfort zones.",
      createdAt: "2025-05-15",
      category: "Education",
      wordCount: 75,
      gradient: "from-purple-500 to-violet-500"
    },
    {
      id: 4,
      title: "Nature's Healing Power",
      content: "There's something profoundly restorative about spending time in nature. Whether it's the sound of waves crashing on a beach, the rustling of leaves in a forest, or the sight of mountains stretching toward the horizon, nature has an unparalleled ability to calm our minds and rejuvenate our spirits. Scientific research confirms what many have long known intuitively: nature heals.",
      createdAt: "2025-05-12",
      category: "Nature",
      wordCount: 70,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 5,
      title: "The Value of Solitude",
      content: "In our hyperconnected world, solitude has become a rare and precious commodity. Yet it is in moments of quiet reflection that we often discover our deepest truths and most creative insights. Solitude is not loneliness; it's a conscious choice to spend time alone with our thoughts, to process experiences, and to reconnect with our inner selves away from external distractions.",
      createdAt: "2025-05-10",
      category: "Philosophy",
      wordCount: 69,
      gradient: "from-rose-500 to-pink-500"
    },
    {
      id: 6,
      title: "Creativity and Constraints",
      content: "Paradoxically, creativity often flourishes within constraints rather than unlimited freedom. When we have boundaries—whether they're time limits, resource constraints, or specific requirements—we're forced to think more innovatively and make unexpected connections. Some of the greatest artistic and scientific breakthroughs have emerged from working within tight limitations.",
      createdAt: "2025-05-08",
      category: "Creativity",
      wordCount: 58,
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: 7,
      title: "The Importance of Failure",
      content: "Failure is often viewed as something to be avoided at all costs, but it's actually one of our greatest teachers. Each failure provides valuable feedback, showing us what doesn't work and pointing us toward what might. The key is to fail fast, learn quickly, and iterate. Success without failure is often shallow and unsustainable.",
      createdAt: "2025-05-05",
      category: "Growth",
      wordCount: 63,
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      id: 8,
      title: "Digital Minimalism",
      content: "Digital minimalism is about being more intentional with technology use. Instead of mindlessly scrolling through social media or constantly checking notifications, we can choose to engage with technology in ways that add genuine value to our lives. This might mean using fewer apps, spending less time online, or creating tech-free spaces in our homes.",
      createdAt: "2025-05-03",
      category: "Lifestyle",
      wordCount: 65,
      gradient: "from-indigo-500 to-purple-500"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories
  const categories = ['All', ...new Set(paragraphs.map(p => p.category))];

  // Filter paragraphs based on search and category
  const filteredParagraphs = paragraphs.filter(paragraph => {
    const matchesSearch = paragraph.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paragraph.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || paragraph.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="my-20 px-4">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center space-y-7 mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-center bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
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
            placeholder="Search paragraphs..."
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
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
                    <span>{formatDate(paragraph.createdAt)}</span>
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
                  
                  {/* Footer with word count and read more */}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-gray-400">{paragraph.wordCount} words</span>
                    <button className={`text-sm font-medium bg-gradient-to-r ${paragraph.gradient} bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200 flex items-center space-x-1`}>
                      <span>Read more</span>
                      <svg className="w-4 h-4 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${paragraph.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Load More Button */}
      {filteredParagraphs.length > 0 && (
        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-neutral-800 dark:to-neutral-700 text-gray-700 dark:text-gray-300 rounded-xl hover:from-gray-200 hover:to-gray-300 dark:hover:from-neutral-700 dark:hover:to-neutral-600 transition-all duration-300 font-medium border border-gray-300 dark:border-neutral-600 hover:shadow-lg">
            Load More Paragraphs
          </button>
        </div>
      )}
    </div>
  );
}