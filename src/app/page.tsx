"use client";
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import data from '@/data/data.json';
import WebUpdates from '@/components/WebUpdates';
import TrendingAndPopular from '@/components/TrendingAndPopular';

interface Article {
  title: string;
  abstract: string;
  author: string;
  postDate: string;
  image?: string;
  comments?: number;
}

interface Category {
  name: string;
  items: Article[];
}

const defaultImage = "/article.jpg";

// Image validation function
const validateImage = async (imagePath: string): Promise<string> => {
  if (!imagePath) return defaultImage;
  
  try {
    const response = await fetch(imagePath);
    return response.ok ? imagePath : defaultImage;
  } catch (error) {
    console.warn(`Failed to load image: ${imagePath}`, error);
    return defaultImage;
  }
};

export default function Home() {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [validatedImages, setValidatedImages] = useState<Record<string, string>>({});
  const sliderRef = useRef<any>(null);
  const articlesPerPage = 4;

  useEffect(() => {
    if (sliderRef.current && typeof sliderRef.current.slickGoTo === 'function') {
      sliderRef.current.slickGoTo(currentNewsIndex);
    }
  }, [currentNewsIndex]);

  // Combine all articles from different categories
  const allArticles = data.categories.reduce<Article[]>((acc, category: Category) => {
    return [...acc, ...category.items];
  }, []);

  // Sort articles by date
  const sortedArticles = [...allArticles].sort((a, b) => 
    new Date(b.postDate).getTime() - new Date(a.postDate).getTime()
  );

  // Get featured articles for the main slider (first 5)
  const featuredArticles = sortedArticles.slice(0, 5);
  
  // Get latest 4 updates for web updates section
  const webUpdates = sortedArticles.slice(0, 4);
  
  // Get latest articles for the trending tabs
  const latestArticles = sortedArticles.slice(0, 4);
  
  // Get trending articles (simulated based on some criteria, like view count or date)
  const trendingArticles = [...sortedArticles]
    .sort((a, b) => (b.comments || 0) - (a.comments || 0))
    .slice(0, 4);

  // Get recent articles for the recent section
  const recentArticles = sortedArticles.slice(5, 9);

  // Get articles for current page in all articles section
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = sortedArticles.slice(startIndex, startIndex + articlesPerPage);
  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current: number, next: number) => setCurrentNewsIndex(next),
    afterChange: (current: number) => setCurrentNewsIndex(current),
    initialSlide: currentNewsIndex,
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % sortedArticles.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [sortedArticles.length]);

  useEffect(() => {
    // Validate all images
    const validateAllImages = async () => {
      const imagePromises = allArticles.map(async (article) => {
        const validImage = await validateImage(article.image || '');
        return [article.image, validImage];
      });

      const validatedPairs = await Promise.all(imagePromises);
      const validatedMap = Object.fromEntries(validatedPairs);
      setValidatedImages(validatedMap);
    };

    validateAllImages();
  }, [allArticles]);

  return (
    <main className="container mx-auto px-4">
      {/* Newsflash Banner with animation */}
      <div className="bg-pink-600 text-white p-2 mb-4 flex items-center transform transition-transform duration-300 hover:scale-[1.01]">
        <span className="bg-yellow-400 text-pink-600 px-2 py-1 text-sm font-bold mr-4">NEWSFLASH</span>
        <div className="flex-1 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            {sortedArticles[currentNewsIndex]?.title}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-1 hover:bg-pink-700" onClick={() => setCurrentNewsIndex((prev) => (prev - 1 + sortedArticles.length) % sortedArticles.length)}>
            ←
          </button>
          <button className="p-1 hover:bg-pink-700" onClick={() => setCurrentNewsIndex((prev) => (prev + 1) % sortedArticles.length)}>
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Article Section */}
        <div className="md:col-span-2">
          <div className="relative">
            {/* Main Slider */}
            <div className="overflow-hidden rounded-lg">
              <Slider ref={sliderRef} {...sliderSettings}>
                {featuredArticles.map((article, index) => (
                  <Link 
                    key={index} 
                    href={`/publication/web-articles/${encodeURIComponent(article.title.toLowerCase().replace(/\s+/g, '-'))}`}
                  >
                    <div className="relative aspect-[16/9] group overflow-hidden">
                      <Image
                        src={validatedImages[article.image || ''] || defaultImage}
                        alt={article.title}
                        fill
                        className="object-cover transform transition-all duration-700 ease-in-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-300 ease-out group-hover:translate-y-[-5px]">
                        <div className="inline-block bg-pink-600 text-white text-xs px-2 py-1 mb-2">
                          ISSUE BRIEFS
                        </div>
                        <h2 className="text-white text-2xl font-bold">
                          {article.title}
                        </h2>
                        <p className="text-gray-200 text-sm mt-2">
                          By {article.author} | {new Date(article.postDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>

            {/* Thumbnails */}
            <div className="flex justify-center mt-8 gap-4">
              {featuredArticles.map((article, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentNewsIndex(index);
                  }}
                  className={`relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden group transform transition-all duration-300
                    ${index === currentNewsIndex 
                      ? 'ring-2 ring-pink-600 ring-offset-2 scale-105' 
                      : 'hover:ring-2 hover:ring-pink-300 hover:ring-offset-1 hover:scale-105'
                    }`}
                >
                  <Image
                    src={validatedImages[article.image || ''] || defaultImage}
                    alt={article.title}
                    fill
                    className="object-cover transition-all duration-300 ease-in-out"
                  />
                  <div 
                    className={`absolute inset-0 transition-colors duration-300 
                      ${index === currentNewsIndex 
                        ? 'bg-pink-600/20' 
                        : 'bg-black/0 group-hover:bg-pink-600/10'
                      }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Web Updates and Trending */}
        <div className="md:col-span-1 space-y-8">
          {/* Web Updates Section */}
          <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
            <WebUpdates updates={webUpdates} validateImage={validateImage} />
          </div>

          {/* Trending Section */}
          <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
            <TrendingAndPopular 
              articles={sortedArticles}
              latestArticles={latestArticles}
              trendingArticles={trendingArticles}
              validateImage={validateImage}
            />
          </div>
        </div>
      </div>

      {/* Recent Articles Section with animation */}
      <div className="mt-12 transform transition-all duration-300">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 border-b-2 border-pink-600 pb-2">Recent Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {recentArticles.map((article, index) => (
            <Link 
              key={index}
              href={`/publication/web-articles/${encodeURIComponent(article.title.toLowerCase().replace(/\s+/g, '-'))}`}
              className="group"
            >
              <div className="relative aspect-[4/3] mb-3">
                <Image
                  src={validatedImages[article.image || ''] || defaultImage}
                  alt={article.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-sm font-medium group-hover:text-pink-600 transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(article.postDate).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* All Articles Section with animation */}
      <div className="mt-12 transform transition-all duration-300">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 border-b-2 border-pink-600 pb-2">All Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {paginatedArticles.map((article, index) => (
            <Link 
              key={index}
              href={`/publication/web-articles/${encodeURIComponent(article.title.toLowerCase().replace(/\s+/g, '-'))}`}
              className="group"
            >
              <div className="relative aspect-[4/3] mb-3">
                <Image
                  src={validatedImages[article.image || ''] || defaultImage}
                  alt={article.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-sm font-medium group-hover:text-pink-600 transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(article.postDate).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg disabled:opacity-50 hover:bg-pink-700"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-yellow-400 text-pink-600 rounded-lg font-medium">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg disabled:opacity-50 hover:bg-pink-700"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}