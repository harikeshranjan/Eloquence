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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// Extended interface for display purposes
interface DisplayParagraph extends IParagraph {
  category: string;
  gradient: string;
}

export default function RecentParagraphs() {
  const [paragraphs, setParagraphs] = useState<DisplayParagraph[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [paragraphToDelete, setParagraphToDelete] = useState<DisplayParagraph | null>(null);
  const router = useRouter();

  // Color gradients for categories
  const gradients = [
    'from-pink-500 to-orange-500',
    'from-purple-500 to-pink-600',
    'from-lime-400 to-pink-400',
    'from-blue-600 to-cyan-500',
    'from-zinc-400 to-zinc-600',
    'from-pink-300 to-yellow-300',
    'from-emerald-300 to-blue-400',
    'from-red-500 to-orange-600',
    'from-orange-400 to-pink-600',
    'from-indigo-600 to-purple-600',
    'from-pink-500 to-rose-600',
    'from-yellow-300 to-pink-500',
    'from-gray-800 to-blue-900',
    'from-pink-300 to-orange-400',
    'from-emerald-400 to-cyan-400',
    'from-indigo-500 to-blue-600',
    'from-stone-400 to-stone-600',
    'from-cyan-400 to-teal-500',
    'from-sky-400 to-blue-600',
    'from-violet-500 to-orange-300',
    'from-orange-300 to-rose-500',
    'from-purple-300 to-pink-300',
    'from-teal-300 to-lime-300',
    'from-blue-400 to-green-400',
    'from-orange-500 to-red-600',
    'from-yellow-400 to-orange-500',
    'from-pink-400 to-purple-600',
    'from-fuchsia-600 to-purple-600',
    'from-neutral-800 to-neutral-600',
    'from-cyan-300 to-orange-400',
    'from-gray-500 to-gray-600',
    'from-indigo-400 to-cyan-400',
    'from-yellow-300 to-green-300',
    'from-green-500 to-cyan-500',
    'from-violet-600 to-cyan-400',
    'from-violet-500 to-purple-600',
    'from-yellow-400 to-red-500',
    'from-red-400 to-orange-400',
    'from-purple-600 to-indigo-600',
    'from-cyan-500 to-fuchsia-500',
    'from-yellow-500 to-orange-600',
    'from-blue-500 to-purple-600',
    'from-slate-500 to-blue-600',
    'from-green-500 to-teal-600',
    'from-blue-300 to-purple-300',
    'from-purple-500 to-blue-600',
    'from-teal-500 to-green-600',
    'from-slate-800 to-slate-600',
    'from-red-600 to-rose-600',
    'from-lime-500 to-green-600',
    'from-amber-400 to-orange-600',
    'from-red-400 to-yellow-500',
    'from-stone-900 to-stone-700',
    'from-sky-300 to-pink-300',
    'from-blue-300 to-pink-400',
    'from-green-300 to-purple-400',
    'from-neutral-500 to-neutral-700',
    'from-indigo-300 to-pink-300',
    'from-zinc-900 to-zinc-700',
    'from-amber-300 to-red-400',
    'from-amber-500 to-orange-600',
    'from-pink-500 to-cyan-500',
    'from-blue-400 to-indigo-600',
    'from-sky-400 to-emerald-400',
    'from-rose-300 to-orange-300',
    'from-rose-500 to-pink-600',
    'from-green-400 to-teal-500',
    'from-blue-500 to-violet-600',
    'from-amber-500 to-pink-600',
    'from-green-400 to-blue-500',
    'from-fuchsia-500 to-cyan-500',
    'from-lime-500 to-cyan-500',
    'from-green-300 to-blue-300',
    'from-gray-900 to-gray-700',
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

  const totalPages = Math.ceil(filteredParagraphs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedParagraphs = filteredParagraphs.slice(startIndex, endIndex);

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
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  if (loading) {
    return (
      <div className="my-20 px-4">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  const handleDeleteClick = (paragraph: DisplayParagraph, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    e.stopPropagation(); // Prevent triggering the context menu
    setParagraphToDelete(paragraph);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!paragraphToDelete?._id) return;

    try {
      const response = await fetch(`/api/paragraph/${paragraphToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        toast(`Error deleting paragraph: ${response.statusText}`, {
          description: 'Please try again later.'
        });
        return;
      }

      toast("Success", {
        description: 'Paragraph deleted successfully!'
      });
      setParagraphs(paragraphs.filter(p => p._id?.toString() !== paragraphToDelete._id?.toString()));
      setDeleteDialogOpen(false);
      setParagraphToDelete(null);
    } catch (error) {
      console.error('Error deleting paragraph:', error);
      toast("Error", {
        description: 'Failed to delete paragraph. Please try again.'
      });
    }
  };

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
          <>
            {/* Results info */}
            <div className="mb-6 text-sm text-gray-600 dark:text-gray-400 text-center">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredParagraphs.length)} of {filteredParagraphs.length} paragraphs
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none mb-8">
              {paginatedParagraphs.map((paragraph) => (
                <ContextMenu key={paragraph.title}>
                  <ContextMenuTrigger>
                    <div
                      key={paragraph.title}
                      className="group relative overflow-hidden bg-white dark:bg-neutral-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-neutral-700 hover:border-transparent hover:-translate-y-2 cursor-pointer select-none"
                      onClick={() => {
                        router.push(`/paragraph/${paragraph._id}`)
                      }}
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
                    <ContextMenuItem
                      className='flex items-center'
                      onClick={() => {
                        if (paragraph._id) router.push(`/paragraph/edit/${paragraph._id}`);
                      }}
                    >
                      <Edit className="mr-2" />
                      Edit
                    </ContextMenuItem>
                    <ContextMenuItem
                      className='flex items-center'
                      onClick={(e) => handleDeleteClick(paragraph, e)}
                    >
                      <Trash className="mr-2" />
                      Delete
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>

                    {/* First page */}
                    {currentPage > 2 && (
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(1);
                          }}
                          className="cursor-pointer"
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {/* Ellipsis before current page */}
                    {currentPage > 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {/* Previous page */}
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(currentPage - 1);
                          }}
                          className="cursor-pointer"
                        >
                          {currentPage - 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {/* Current page */}
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        isActive
                        className="cursor-pointer"
                      >
                        {currentPage}
                      </PaginationLink>
                    </PaginationItem>

                    {/* Next page */}
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(currentPage + 1);
                          }}
                          className="cursor-pointer"
                        >
                          {currentPage + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {/* Ellipsis after current page */}
                    {currentPage < totalPages - 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {/* Last page */}
                    {currentPage < totalPages - 1 && (
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(totalPages);
                          }}
                          className="cursor-pointer"
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                        }}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-red-600 dark:text-red-400">
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {`Are you sure you want to delete "${paragraphToDelete?.title}"? This action cannot be undone.`}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setParagraphToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className='cursor-pointer hover:bg-red-700 dark:hover:bg-red-800'
            >
              Delete Paragraph
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}