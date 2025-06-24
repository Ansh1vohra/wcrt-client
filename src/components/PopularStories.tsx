'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

interface PopularStoriesProps {
  limit?: number;
  showTitle?: boolean;
  className?: string;
}

export default function PopularStories({ 
  limit = 5, 
  showTitle = true, 
  className = "" 
}: PopularStoriesProps) {
  const [popularArticles, setPopularArticles] = useState<Article[]>([]);
  const [validatedImages, setValidatedImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        
        // Sort articles by view count in descending order and take the top ones
        const sortedByViews = [...(data.posts || [])]
          .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
          .slice(0, limit);
        
        setPopularArticles(sortedByViews);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch popular articles');
        console.error('Error fetching popular articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularArticles();
  }, [limit]);

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

  if (loading) {
    return (
      <div className={`${className}`}>
        {showTitle && <h2 className="text-lg font-bold text-pink-600 border-b-2 border-pink-600 inline-block pb-1 mb-4">Popular Stories</h2>}
        <div className="animate-pulse space-y-3">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-16 h-16 bg-gray-200 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className}`}>
        {showTitle && <h2 className="text-lg font-bold text-pink-600 border-b-2 border-pink-600 inline-block pb-1 mb-4">Popular Stories</h2>}
        <p className="text-red-500 text-sm">Error loading popular stories</p>
      </div>
    );
  }

  if (popularArticles.length === 0) {
    return (
      <div className={`${className}`}>
        {showTitle && <h2 className="text-lg font-bold text-pink-600 border-b-2 border-pink-600 inline-block pb-1 mb-4">Popular Stories</h2>}
        <p className="text-gray-500 text-sm">No popular stories available</p>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {showTitle && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-pink-600 border-b-2 border-pink-600 inline-block pb-1">Popular Stories</h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            Most Viewed
          </span>
        </div>
      )}
      
      <div className="space-y-3">
        {popularArticles.map((article, index) => (
          <Link
            href={`/post/${article.postId}`}
            key={article.postId}
            className="block group"
          >
            <div className="flex gap-3 items-start">
              {/* Ranking number */}
              <div className="flex-shrink-0 w-6 h-6 bg-pink-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {index + 1}
              </div>
              
              {/* Article image */}
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={validatedImages[article.imageUrl || ''] || defaultImage}
                  alt={article.title}
                  fill
                  className="object-cover rounded-lg transition-opacity duration-300 group-hover:opacity-75"
                  sizes="64px"
                  priority={index < 3}
                />
              </div>
              
              {/* Article details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm group-hover:text-pink-600 transition-colors line-clamp-2 mb-1">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{formatDate(article.uploadDate)}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    👁️ {article.viewCount?.toLocaleString() || 0}
                  </span>
                </div>
                {article.category && (
                  <span className="inline-block mt-1 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                    {article.category.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* View all link */}
      <div className="mt-4 text-center">
        <Link 
          href="/popular" 
          className="text-pink-600 hover:text-pink-700 text-sm font-medium transition-colors"
        >
          View All Popular Stories →
        </Link>
      </div>
    </div>
  );
}
