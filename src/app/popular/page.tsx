'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SafeHTML from '@/components/SafeHTML';
import '@/components/article-content.css';

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND}/api/posts/status/approved`;

interface Article {
  title: string;
  content: string;
  authorName?: string;
  uploadDate: string;
  imageUrl?: string;
  authorImage?: string;
  category: string;
  postId: string;
  viewCount: number;
  post_status?: string;
  writerName?: string;
}

const defaultImage = "/article.jpg";

// Image validation and URL conversion function
const validateImage = async (imagePath: string): Promise<string> => {
  if (!imagePath) return defaultImage;

  try {
    // Convert s3:// URLs to https://
    if (imagePath.startsWith('s3://')) {
      const bucketPath = imagePath.replace('s3://wcrt-content-images/', '');
      imagePath = `https://wcrt-content-images.s3.eu-north-1.amazonaws.com/${bucketPath}`;
    }

    // If it's already an HTTPS URL, use it directly
    if (imagePath.startsWith('https://')) {
      return imagePath;
    }

    return defaultImage;
  } catch (error) {
    console.warn(`Failed to load image: ${imagePath}`, error);
    return defaultImage;
  }
};

export default function PopularPage() {
  const [popularArticles, setPopularArticles] = useState<Article[]>([]);
  const [validatedImages, setValidatedImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  // Fetch articles and sort by view count
  useEffect(() => {
    const fetchPopularArticles = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        
        // Sort articles by view count in descending order
        const sortedByViews = [...(data.posts || [])]
          .filter(article => article.viewCount > 0) // Only include articles with views
          .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
        
        setPopularArticles(sortedByViews);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch popular articles');
        console.error('Error fetching popular articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularArticles();
  }, []);

  // Validate images
  useEffect(() => {
    const validateAllImages = async () => {
      const imagePromises = popularArticles.map(async (article) => {
        const validImage = await validateImage(article.imageUrl || '');
        return [article.imageUrl, validImage];
      });

      const validatedPairs = await Promise.all(imagePromises);
      const validatedMap = Object.fromEntries(validatedPairs);
      setValidatedImages(validatedMap);
    };

    if (popularArticles.length > 0) {
      validateAllImages();
    }
  }, [popularArticles]);

  // Pagination logic
  const totalPages = Math.ceil(popularArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = popularArticles.slice(startIndex, startIndex + articlesPerPage);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-4 p-6 bg-white rounded-lg shadow">
                <div className="w-48 h-32 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-pink-600 mb-4">Popular Stories</h1>
          <p className="text-red-500">Error loading popular stories: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-pink-600 border-b-2 border-pink-600 inline-block pb-2 mb-4">
          Popular Stories
        </h1>
        <p className="text-gray-600">
          Discover our most-read articles based on reader engagement and views
        </p>
        <div className="mt-2 text-sm text-gray-500">
          Total: {popularArticles.length} articles
        </div>
      </div>

      {popularArticles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No popular stories available at the moment.</p>
        </div>
      ) : (
        <>
          {/* Articles Grid */}
          <div className="space-y-6">
            {paginatedArticles.map((article, index) => {
              const globalRank = startIndex + index + 1;
              return (
                <div key={article.postId} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/post/${article.postId}`} className="block">
                    <div className="flex gap-6 p-6">
                      {/* Ranking */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-pink-600 text-white font-bold text-lg rounded-full flex items-center justify-center">
                          #{globalRank}
                        </div>
                      </div>

                      {/* Article Image */}
                      <div className="relative w-48 h-32 flex-shrink-0">
                        <Image
                          src={validatedImages[article.imageUrl || ''] || defaultImage}
                          alt={article.title}
                          fill
                          className="object-cover rounded-lg"
                          sizes="192px"
                        />
                        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold uppercase px-2 py-1 rounded">
                          {article.category?.toUpperCase() || 'POST'}
                        </span>
                      </div>

                      {/* Article Content */}
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-pink-600 transition-colors">
                          {article.title}
                        </h2>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3M16 7V3M4 11h16M5 19h14a2 2 0 002-2V11a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                            </svg>
                            <span>{formatDate(article.uploadDate)}</span>
                          </div>
                          
                          {article.authorName && (
                            <div className="flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                              </svg>
                              <span>By {article.authorName}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-1 font-semibold text-pink-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                            </svg>
                            <span>{article.viewCount?.toLocaleString() || 0} views</span>
                          </div>
                        </div>

                        <div className="text-gray-600 line-clamp-3">
                          <SafeHTML html={article.content} className="article-content" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded font-medium ${
                    currentPage === i + 1 
                      ? 'bg-pink-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
