"use client"

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface Paragraph {
  id: string;
  title: string;
  content: string;
  tags: string[];
  wordCount: number;
  charCount: number;
  createdAt: string;
  updatedAt: string;
  readingTime?: number;
  category?: string;
}

export default function ParagraphEdit({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [paragraph, setParagraph] = useState<Paragraph>({
    id: id,
    title: '',
    content: '',
    tags: [],
    wordCount: 0,
    charCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    readingTime: 0,
    category: 'General'
  });
  const [tagInput, setTagInput] = useState('');
  const router = useRouter();

  async function getParagraph(id: string) {
    try {
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
    }
  }

  async function updateParagraph(paragraphData: Paragraph) {
    try {
      const response = await fetch(`/api/paragraph/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paragraphData),
      });

      if (!response.ok) {
        throw new Error(`Error updating paragraph with id ${id}`);
      }

      const updatedParagraph = await response.json();
      return updatedParagraph;
    } catch (error) {
      console.error('Error updating paragraph:', error);
      toast.error(`Error`, {
        description: 'Failed to update paragraph. Please try again later.'
      });
      throw error;
    }
  }

  useEffect(() => {
    const fetchParagraph = async () => {
      setIsLoading(true);
      try {
        const paragraphData = await getParagraph(id);
        if (paragraphData) {
          setParagraph(paragraphData);
          setTagInput(paragraphData.tags.join(', '));
        }
      } catch (error) {
        console.error('Error fetching paragraph:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParagraph();
  }, [id]);

  const calculateStats = (content: string) => {
    const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
    const charCount = content.length;
    return { wordCount, charCount };
  };

  const calculateReadingTime = (content: string): string => {
    const wordCount = content.trim().split(/\s+/).length;
    const time = Math.ceil(wordCount / 200);
    return time <= 1 ? "< 1 min" : `${time} min`;
  };

  const handleContentChange = (content: string) => {
    const stats = calculateStats(content);
    setParagraph(prev => ({
      ...prev,
      content,
      wordCount: stats.wordCount,
      charCount: stats.charCount
    }));
  };

  const handleTagsChange = (tagsString: string) => {
    setTagInput(tagsString);
    const tags = tagsString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    setParagraph(prev => ({
      ...prev,
      tags
    }));
  };

  const handleSave = async () => {
    if (!paragraph.title.trim() || !paragraph.content.trim()) {
      toast.error('Error', {
        description: 'Title and content are required fields.'
      });
      return;
    }

    setIsSaving(true);
    try {
      const updatedParagraph = {
        ...paragraph,
        updatedAt: new Date().toISOString()
      };

      await updateParagraph(updatedParagraph);
      toast.success("Success", {
        description: 'Paragraph updated successfully!'
      });
      router.push(`/paragraph/${id}`);
    } catch (error) {
      console.error('Error saving paragraph:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/paragraph/${id}`);
  };

  const handleBackToParagraphs = () => {
    router.push('/paragraph');
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading paragraph...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6 leading-tight">
            Edit Paragraph
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl cursor-pointer disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Save Changes</span>
              </>
            )}
          </button>

          <Dialog>
            <DialogTrigger>
              <button
                className="flex items-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-700 dark:text-gray-300 rounded-xl transition-all duration-300 font-medium border border-gray-300 dark:border-neutral-600 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Cancel</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                  Discard Changes?
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">
                  Are you sure you want to cancel? Any unsaved changes will be lost.
                </DialogDescription>
              </DialogHeader>
              <div className="flex space-x-3">
                <Button variant="destructive" onClick={handleCancel} className='flex-1 cursor-pointer hover:bg-red-700 dark:hover:bg-red-800'>
                  Discard Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Main Edit Form */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-700 overflow-hidden mb-8">
          {/* Gradient accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500"></div>

          {/* Form Content */}
          <div className="p-8 md:p-12 space-y-8">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={paragraph.title}
                onChange={(e) => setParagraph(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 text-lg font-semibold border border-gray-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white transition-colors"
                placeholder="Enter paragraph title..."
              />
            </div>

            {/* Content Textarea */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content
              </label>
              <textarea
                id="content"
                value={paragraph.content}
                onChange={(e) => handleContentChange(e.target.value)}
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white transition-colors resize-vertical"
                placeholder="Enter your paragraph content here..."
              />
            </div>

            {/* Tags Input */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags (comma-separated)
              </label>
              <input
                id="tags"
                type="text"
                value={tagInput}
                onChange={(e) => handleTagsChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white transition-colors"
                placeholder="e.g., technology, tutorial, web development"
              />
              {paragraph.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {paragraph.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live Statistics Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-200 dark:border-neutral-700 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Live Statistics
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