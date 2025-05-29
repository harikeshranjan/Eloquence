"use client"

import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner'

export default function AddParagraph() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [wordCount, setWordCount] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      const savedDraft = localStorage.getItem('paragraph_draft');

      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft);
          setTitle(draft.title || '');
          setContent(draft.content || '');
          setTags(draft.tags || []);
          setWordCount(draft.wordCount || 0);
          setCharCount(draft.charCount || 0);
        } catch (error) {
          console.error('Failed to parse saved draft:', error);
          localStorage.removeItem('paragraph_draft');
        }
      }

      hasMounted.current = true;
    }

    const interval = setInterval(() => {
      handleSaveDraft();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Handle content change and update counts
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setContent(text);
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
    setCharCount(text.length);
  };

  // Handle tag input
  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  // Add new tag
  const addTag = () => {
    const tag = currentTag.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setCurrentTag('');
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Handle save (placeholder for backend integration)
  const handleSave = async () => {
    try {
      const paragraphData = {
        title: title.trim(),
        content: content.trim(),
        tags: tags,
        wordCount: wordCount,
        charCount: charCount,
      }

      if (!paragraphData.title || !paragraphData.content) {
        toast('Title and content are required to save the paragraph.', {
          description: 'Please fill in both fields before saving.',
          duration: 3000,
        });
        return;
      }

      const response = await fetch('/api/paragraph', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paragraphData),
      })

      if (!response.ok) {
        toast('Failed to save paragraph', {
          description: 'There was an error saving your paragraph. Please try again.',
          duration: 3000,
        });        
      } else {
        setTitle('');
        setContent('');
        setTags([]);
        setWordCount(0);
        setCharCount(0);
        localStorage.removeItem('paragraph_draft');

        toast('Paragraph saved successfully!', {
          description: 'Your paragraph has been saved.',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error saving paragraph:', error);
      toast('Error saving paragraph', {
        description: 'An unexpected error occurred while saving your paragraph.',
        duration: 3000,
      });
    }
  };

  // Handle draft save
  const handleSaveDraft = () => {
    setIsSaving(true);

    const draft = {
      title: title.trim(),
      content: content.trim(),
      tags: tags,
      wordCount: wordCount,
      charCount: charCount,
    }

    localStorage.setItem('paragraph_draft', JSON.stringify(draft));

    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-medium bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Create New Paragraph
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Express your thoughts and ideas in a beautifully crafted paragraph
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Editor Container */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-700 overflow-hidden">
          {/* Title Section */}
          <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your paragraph title..."
              className="w-full text-2xl font-semibold bg-transparent border-none outline-none text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none"
              maxLength={100}
            />
            <div className="text-xs text-gray-400 mt-2">
              {title.length}/100 characters
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Content
            </label>
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder="Start writing your paragraph here... Let your thoughts flow freely."
              className="w-full h-64 bg-transparent border-none outline-none text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none leading-relaxed text-lg"
              style={{ fontFamily: 'Georgia, serif' }}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>{wordCount} words</span>
              <span>{charCount} characters</span>
            </div>
          </div>

          {/* Tags Section */}
          <div className="p-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Tags
            </label>

            {/* Tags Display */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center px-3 py-1 font-medium tracking-wider rounded-full text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm"
                >
                  #{tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-2 hover:bg-opacity-20 rounded-full p-0.5 transition-colors duration-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700/20"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>

            {/* Tag Input */}
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleTagInput}
                  placeholder="Add tags (press Enter or comma to add)"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <div className="absolute right-3 top-2.5 text-xs text-gray-400">
                  {tags.length} tags
                </div>
              </div>
              <button
                onClick={addTag}
                disabled={!currentTag.trim()}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
              >
                Add
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Separate tags with commas or press Enter. Use tags to categorize and find your paragraphs easily.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Left side - Draft info */}
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            {isSaving ? (
              <>
                <svg className="w-4 h-4 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <span>Auto-saving...</span>
              </>
            ) : (
              <span>Auto-saving drafts every 30 seconds</span>
            )}
          </div>


          {/* Right side - Action buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleSaveDraft}
              className="px-6 py-3 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all duration-300 font-medium border border-gray-300 dark:border-neutral-600"
            >
              Save Draft
            </button>
            <button
              onClick={handleSave}
              disabled={!title.trim() || !content.trim()}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
            >
              Publish Paragraph
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}