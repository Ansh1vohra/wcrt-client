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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newsIndex, setNewsIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [recentPage, setRecentPage] = useState(1);
  const [validatedImages, setValidatedImages] = useState<Record<string, string>>({});
  const sliderRef = useRef<any>(null);
  const articlesPerPage = 4;
  const recentPerPage = 4;

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
  const recentArticlesAll = sortedArticles.slice(0, 8); // Show 8 most recent articles
  const recentTotalPages = Math.ceil(recentArticlesAll.length / recentPerPage);
  const recentArticles = recentArticlesAll.slice((recentPage - 1) * recentPerPage, recentPage * recentPerPage);

  // Get articles for current page in all articles section
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = sortedArticles.slice(startIndex, startIndex + articlesPerPage);
  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current: number, next: number) => setCurrentImageIndex(next),
    initialSlide: currentImageIndex,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    useCSS: true,
    useTransform: true,
    fade: false,
  };

  // Handle slider navigation
  const handleSlideChange = (direction: 'prev' | 'next') => {
    if (sliderRef.current) {
      if (direction === 'prev') {
        sliderRef.current.slickPrev();
      } else {
        sliderRef.current.slickNext();
      }
    }
  };

  // Separate newsflash auto-rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % sortedArticles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sortedArticles.length]);

  // Separate image slider auto-rotation
  useEffect(() => {
    const timer = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Newsflash and Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Newsflash Banner with animation */}
          <div className="bg-pink-600 text-white p-2 flex items-center transform transition-transform duration-300 hover:scale-[1.01]">
            <span className="bg-yellow-400 text-pink-600 px-2 py-1 text-sm font-bold mr-4">NEWSFLASH</span>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                {sortedArticles[newsIndex]?.title}
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-white/50" 
                onClick={() => setNewsIndex((prev) => (prev - 1 + sortedArticles.length) % sortedArticles.length)}
                aria-label="Previous news"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button 
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-white/50" 
                onClick={() => setNewsIndex((prev) => (prev + 1) % sortedArticles.length)}
                aria-label="Next news"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main Article Section */}
          <div className="relative group">
            {/* Main Slider */}            <div className="overflow-hidden rounded-lg relative">
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
                        priority={index === currentImageIndex}
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
                    if (sliderRef.current) {
                      sliderRef.current.slickGoTo(index);
                    }
                  }}
                  className={`relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden group transform transition-all duration-300
                    ${index === currentImageIndex 
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
                      ${index === currentImageIndex 
                        ? 'bg-pink-600/20' 
                        : 'bg-black/0 group-hover:bg-pink-600/10'
                      }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Recent Articles Section with animation */}
          <div className="transform transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-pink-600 border-b-2 border-pink-600 pb-2">Recent Articles</h2>
              <div className="flex gap-2">
                <button 
                  className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  onClick={() => setRecentPage((prev) => Math.max(1, prev - 1))}
                  aria-label="Previous recent articles"
                  disabled={recentPage === 1}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button 
                  className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  onClick={() => setRecentPage((prev) => Math.min(recentTotalPages, prev + 1))}
                  aria-label="Next recent articles"
                  disabled={recentPage === recentTotalPages}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentArticles.map((article, index) => (
                <Link 
                  key={index}
                  href={`/publication/web-articles/${encodeURIComponent(article.title.toLowerCase().replace(/\s+/g, '-'))}`}
                  className="flex items-start space-x-3 group"
                >
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={validatedImages[article.image || ''] || defaultImage}
                      alt={article.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium group-hover:text-pink-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {new Date(article.postDate).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* All Articles Section */}
          <div className="transform transition-all duration-300">
            <h2 className="text-2xl font-bold text-pink-600 mb-4 border-b-2 border-pink-600 pb-2">All Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedArticles.map((article, index) => (
                <Link 
                  key={index}
                  href={`/publication/web-articles/${encodeURIComponent(article.title.toLowerCase().replace(/\s+/g, '-'))}`}
                  className="flex items-start space-x-3 group"
                >
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={validatedImages[article.image || ''] || defaultImage}
                      alt={article.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium group-hover:text-pink-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {new Date(article.postDate).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
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

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-6 py-3 bg-gray-100 text-gray-500 rounded-none font-medium text-lg hover:bg-gray-200 transition-all duration-200"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-6 py-3 text-lg rounded-none font-medium transition-all duration-200 ${
              currentPage === i + 1
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="px-6 py-3 bg-gray-100 text-gray-500 rounded-none font-medium text-lg hover:bg-gray-200 transition-all duration-200"
        >
          Next
        </button>
      </div>
    </main>
  );
}