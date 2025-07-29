"use client"
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Article {
  postId: string;
  title: string;
  imageUrl?: string;
  category?: string;
  uploadDate: string;
  authorName?: string;
}

interface PublicationSliderProps {
  title: string;
  articles: Article[];
  defaultImage: string;
  validatedImages: Record<string, string>;
}

const PublicationSlider: React.FC<PublicationSliderProps> = ({ 
  title, 
  articles, 
  defaultImage, 
  validatedImages 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const top6Articles = articles.slice(0, 6);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, top6Articles.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, top6Articles.length - 2)) % Math.max(1, top6Articles.length - 2));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  if (top6Articles.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 border-b-2 border-pink-600 pb-2">
          {title}
        </h2>
        <p className="text-gray-500 text-center py-8">No articles available in this category.</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-pink-600 mb-6 border-b-2 border-pink-600 pb-2">
        {title}
      </h2>
      
      <div className="relative">
        {/* Slider Container */}
        <div className="overflow-hidden">
          <div 
            ref={sliderRef}
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {top6Articles.map((article) => (
              <div key={article.postId} className="w-1/3 flex-shrink-0 px-2">
                <Link href={`/post/${article.postId}`} className="group block">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-300">
                    {/* Image */}
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={validatedImages[article.imageUrl || ''] || defaultImage}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <span className="absolute bottom-2 left-2 bg-red-600 text-white text-xs font-bold uppercase px-2 py-1">
                        {article.category?.toUpperCase() || 'POST'}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors duration-200">
                        {article.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3M16 7V3M4 11h16M5 19h14a2 2 0 002-2V11a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        </svg>
                        <span>{formatDate(article.uploadDate)}</span>
                        {article.authorName && (
                          <>
                            <span className="mx-2">•</span>
                            <span>By {article.authorName}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {top6Articles.length > 3 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors duration-200 z-10"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors duration-200 z-10"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {top6Articles.length > 3 && (
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: Math.max(1, top6Articles.length - 2) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-pink-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicationSlider;
