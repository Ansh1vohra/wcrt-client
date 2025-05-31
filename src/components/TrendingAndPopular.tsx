"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Article {
  title: string;
  abstract: string;
  author: string;
  postDate: string;
  image?: string;
  comments?: number;
}

interface TrendingAndPopularProps {
  articles: Article[];
  latestArticles: Article[];
  trendingArticles: Article[];
  validateImage: (imagePath: string) => Promise<string>;
}

const defaultImage = "/article.jpg";

const TrendingAndPopular = ({ articles, latestArticles, trendingArticles, validateImage }: TrendingAndPopularProps) => {
  const [activeTab, setActiveTab] = useState<'trending' | 'comments' | 'latest'>('trending');
  const [validatedImages, setValidatedImages] = useState<Record<string, string>>({});

  const getActiveArticles = () => {
    switch (activeTab) {
      case 'trending':
        return trendingArticles;
      case 'comments':
        return articles.sort((a, b) => (b.comments || 0) - (a.comments || 0)).slice(0, 4);
      case 'latest':
        return latestArticles;
      default:
        return trendingArticles;
    }
  };

  useEffect(() => {
    const validateImages = async () => {
      const allArticlesToValidate = [...articles, ...latestArticles, ...trendingArticles];
      const imagePromises = allArticlesToValidate.map(async (article) => {
        const validImage = await validateImage(article.image || '');
        return [article.image, validImage];
      });

      const validatedPairs = await Promise.all(imagePromises);
      const validatedMap = Object.fromEntries(validatedPairs);
      setValidatedImages(validatedMap);
    };

    validateImages();
  }, [articles, latestArticles, trendingArticles, validateImage]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 lg:p-4 transition-all duration-300 ease-in-out">
      <div className="flex border-b border-gray-200">
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
        <button
          className={`px-2 lg:px-4 py-1.5 lg:py-2 -mb-px text-xs lg:text-sm font-medium relative transition-colors duration-200 ${
            activeTab === 'comments'
              ? 'text-pink-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('comments')}
        >
          Comments
          {activeTab === 'comments' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600 transition-all duration-300 ease-out"></div>
          )}
        </button>
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
      </div>

      <div className="mt-3 lg:mt-4">
        <div className="grid grid-cols-1 gap-3 lg:gap-4">
          {getActiveArticles().map((article, index) => (
            <Link 
              href={`/publication/web-articles/${encodeURIComponent(article.title.toLowerCase().replace(/\s+/g, '-'))}`}
              key={index}
              className="flex gap-2 lg:gap-3 group transform transition-transform duration-200 hover:translate-x-1"
            >
              <div className="relative w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0 overflow-hidden rounded">
                <Image
                  src={validatedImages[article.image || ''] || defaultImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="text-xs lg:text-sm font-medium text-gray-900 group-hover:text-pink-600 transition-colors duration-200 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-[10px] lg:text-xs text-gray-500 mt-0.5 lg:mt-1">
                  {new Date(article.postDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                  {activeTab === 'comments' && article.comments && (
                    <span className="ml-1 lg:ml-2 text-pink-600">
                      {article.comments} comments
                    </span>
                  )}
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
