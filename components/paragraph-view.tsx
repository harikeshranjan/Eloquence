"use client"

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface Paragraph {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  wordCount: number;
  charCount: number;
  createdAt: string;
  updatedAt: string;
  readingTime?: number;
}

// Beautiful Loading Component
const ParagraphLoader = () => {
  return (
    <div className="min-h-screen px-4 flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Animated Loading Header */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-6 animate-pulse"></div>
          <div className="flex justify-center space-x-6 mb-6">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto animate-pulse"></div>
        </div>

        {/* Loading Spinner with Text */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center">
            {/* Outer spinning ring */}
            <div className="w-16 h-16 border-4 border-emerald-200 dark:border-emerald-800 border-t-emerald-500 rounded-full animate-spin"></div>
            {/* Inner pulsing dot */}
            <div className="absolute w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium animate-pulse">
            Loading your paragraph...
          </p>
        </div>

        {/* Skeleton Action Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <div className="h-12 w-24 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
          <div className="h-12 w-24 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
          <div className="h-12 w-24 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
        </div>

        {/* Skeleton Content Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-700 overflow-hidden mb-8">
          <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse"></div>
          <div className="p-8 md:p-12 space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
          </div>
        </div>

        {/* Skeleton Tags */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-200 dark:border-neutral-700 p-6 mb-8">
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
          <div className="flex flex-wrap gap-3">
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Skeleton Statistics */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-200 dark:border-neutral-700 p-6">
          <div className="h-6 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto mb-2"></div>
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ParagraphView({ id }: { id: string }) {
  const [paragraph, setParagraph] = useState<Paragraph | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  async function getParagraph(id: string) {
    try {
      setLoading(true);

      const response = await fetch(`/api/paragraph/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching paragraph with id ${id}`);
      }

      const paragraph = await response.json();
      if (!paragraph) {
        throw new Error(`Paragraph with id ${id} not found`);
      }

      return paragraph;
    } catch (error) {
      console.error('Error fetching paragraph:', error);
      toast.error(`Error`, {
        description: 'Failed to fetch paragraph. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchParagraph = async () => {
      try {
        const paragraphData = await getParagraph(id);
        setParagraph(paragraphData);
      } catch (error) {
        console.error('Error fetching paragraph:', error);
      }
    };

    fetchParagraph();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEdit = () => {
    router.push(`/paragraph/edit/${paragraph?._id}`);
  };

  const handleShare = () => {
    // Share functionality
    if (navigator.share) {
      navigator.share({
        title: paragraph?.title,
        text: paragraph?.content.substring(0, 100) + '...',
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
    console.log('Sharing paragraph');
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/paragraph/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        toast(`Error deleting paragraph: ${response.statusText}`, {
          description: 'Please try again later.'
        });
      }
      
      toast("Success", {
        description: 'Paragraph deleted successfully!'
      });
      router.push('/paragraph');
    } catch (error) {
      console.error('Error deleting paragraph:', error);
    }
  };

  const handleBackToParagraphs = () => {
    router.push('/paragraph');
  };

  const calculateReadingTime = (content: string): string => {
    const wordCount = content.trim().split(/\s+/).length;
    const time = Math.ceil(wordCount / 200);

    return time <= 1 ? "< 1 min" : `${time} min`;
  }

  // Show loader while loading or paragraph is null
  if (loading || !paragraph) {
    return <ParagraphLoader />;
  }

  return (
    <div className="min-h-screen px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6 leading-tight">
            {paragraph.title}
          </h1>

          {/* Meta information */}
          <div className="flex flex-wrap justify-center items-center text-sm text-gray-600 dark:text-gray-400 space-x-6 mb-6">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                {calculateReadingTime(paragraph.content)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span>{paragraph.wordCount} words</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(paragraph.createdAt).split(',')[0]}</span>
            </div>
          </div>

          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={handleEdit}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Edit</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-700 dark:text-gray-300 rounded-xl transition-all duration-300 font-medium border border-gray-300 dark:border-neutral-600 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span>Share</span>
          </button>

          <Dialog>
            <DialogTrigger>
              <button
                className="flex items-center space-x-2 px-6 py-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl transition-all duration-300 font-medium border border-red-200 dark:border-red-800 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-red-600 dark:text-red-400">
                  Confirm Deletion
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">
                  Are you sure you want to delete this paragraph? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>

              <Button variant="destructive" onClick={handleDelete} className='cursor-pointer hover:bg-red-700 dark:hover:bg-red-800'>
                Delete Paragraph
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* Main Content Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-700 overflow-hidden mb-8">
          {/* Gradient accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500"></div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {paragraph.content.split('\n\n').map((paragraph_text, index) => (
                <p key={index} className="text-gray-800 dark:text-gray-200 leading-relaxed mb-6 text-lg">
                  {paragraph_text}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-200 dark:border-neutral-700 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Tags
          </h3>
          <div className="flex flex-wrap gap-3">
            {paragraph.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Metadata Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-200 dark:border-neutral-700 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Statistics
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-500 mb-1">{paragraph.wordCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500 mb-1">{paragraph.charCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Characters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500 mb-1">{calculateReadingTime(paragraph.content)}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Min Read</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500 mb-1">{paragraph.tags.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Tags</div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-neutral-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <span className="font-medium text-gray-800 dark:text-gray-200">Created:</span>{' '}
                {formatDate(paragraph.createdAt)}
              </div>
              <div>
                <span className="font-medium text-gray-800 dark:text-gray-200">Last Updated:</span>{' '}
                {formatDate(paragraph.updatedAt)}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
            onClick={handleBackToParagraphs}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to All Paragraphs</span>
          </button>
        </div>
      </div>
    </div>
  );
}