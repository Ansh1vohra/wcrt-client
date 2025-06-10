"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

//       if (article) {
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

interface TrendingAndPopularProps {
  articles: Article[];
  latestArticles: Article[];
  trendingArticles: Article[];
  validateImage: (imagePath: string) => Promise<string>;
}

const defaultImage = "/article.jpg";

const TrendingAndPopular = ({ articles, latestArticles, trendingArticles, validateImage }: TrendingAndPopularProps) => {
  const [activeTab, setActiveTab] = useState<'latest' | 'trending'>('latest');
  const [validatedImages, setValidatedImages] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const validateImages = async () => {
      const allArticles = [...latestArticles, ...trendingArticles];
      const uniqueArticles = Array.from(new Set(allArticles.map(a => JSON.stringify(a)))).map(a => JSON.parse(a));
      
      const imagePromises = uniqueArticles.map(async (article) => {
        let imageUrl = article.imageUrl || '';
        // Convert s3:// URLs to https://
        if (imageUrl.startsWith('s3://')) {
          const bucketPath = imageUrl.replace('s3://wcrt-content-images/', '');
          imageUrl = `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${bucketPath}`;
        }
        const validImage = await validateImage(imageUrl);
        return [article.imageUrl, validImage];
      });

      const validatedPairs = await Promise.all(imagePromises);
      const validatedMap = Object.fromEntries(validatedPairs);
      setValidatedImages(validatedMap);
    };

    validateImages();
  }, [latestArticles, trendingArticles, validateImage]);

  // Format date for display with client-side only rendering
  const formatDate = (dateString: string) => {
    if (!mounted) return ''; // Return empty string during server-side rendering
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'UTC'
    }).split(',')[0];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 lg:p-4 transition-all duration-300 ease-in-out">
      <div className="flex border-b border-gray-200">
        <button
          className={`px-2 lg:px-4 py-1.5 lg:py-2 -mb-px text-xs lg:text-sm font-medium relative transition-colors duration-200 ${
            activeTab === 'latest'
              ? 'text-pink-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('latest')}
        >
          Latest
          {activeTab === 'latest' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600 transition-all duration-300 ease-out"></div>
          )}
        </button>
        <button
          className={`px-2 lg:px-4 py-1.5 lg:py-2 -mb-px text-xs lg:text-sm font-medium relative transition-colors duration-200 ${
            activeTab === 'trending'
              ? 'text-pink-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('trending')}
        >
          Trending
          {activeTab === 'trending' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600 transition-all duration-300 ease-out"></div>
          )}
        </button>
      </div>

      <div className="mt-4">
        <div className={`space-y-3 ${activeTab === 'latest' ? 'block' : 'hidden'}`}>
          {latestArticles.map((article) => (
            <Link
              key={article.postId}
              href={`/publication/web-articles/${article.postId}`}
              className="flex items-start space-x-3 group"
            >
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={validatedImages[article.imageUrl || ''] || defaultImage}
                  alt={article.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium group-hover:text-pink-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {formatDate(article.uploadDate)}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className={`space-y-3 ${activeTab === 'trending' ? 'block' : 'hidden'}`}>
          {trendingArticles.map((article) => (
            <Link
              key={article.postId}
              href={`/publication/web-articles/${article.postId}`}
              className="flex items-start space-x-3 group"
            >
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={validatedImages[article.imageUrl || ''] || defaultImage}
                  alt={article.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium group-hover:text-pink-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {formatDate(article.uploadDate)} • {article.viewCount} views
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingAndPopular;
