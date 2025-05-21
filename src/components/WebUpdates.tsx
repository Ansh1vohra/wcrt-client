"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Article {
  title: string;
  abstract: string;
  author: string;
  postDate: string;
  image?: string;
}

interface WebUpdatesProps {
  updates: Article[];
  validateImage: (imagePath: string) => Promise<string>;
}

const defaultImage = "/article.jpg";

const WebUpdates = ({ updates, validateImage }: WebUpdatesProps) => {
  const [validatedImages, setValidatedImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const validateImages = async () => {
      const imagePromises = updates.map(async (article) => {
        const validImage = await validateImage(article.image || '');
        return [article.image, validImage];
      });

      const validatedPairs = await Promise.all(imagePromises);
      const validatedMap = Object.fromEntries(validatedPairs);
      setValidatedImages(validatedMap);
    };

    validateImages();
  }, [updates, validateImage]);

  return (
    <div className="web-updates">
      <h2 className="text-lg font-bold mb-4 text-pink-600 border-b-2 border-pink-600 inline-block pb-1">Web Updates</h2>
      <div className="space-y-3">
        {updates.map((update, index) => (
          <Link 
            href={`/publication/web-articles/${encodeURIComponent(update.title.toLowerCase().replace(/\s+/g, '-'))}`} 
            key={index}
            className="block group"
          >
            <div className="flex items-start gap-3 border-b border-gray-200 pb-3">
              <div className="w-2 h-2 bg-pink-600 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-grow">
                <h3 className="text-sm group-hover:text-pink-600 transition-colors">{update.title}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(update.postDate).toLocaleDateString()}
                </p>
              </div>
              <svg className="w-4 h-4 text-pink-600 flex-shrink-0 mt-1 transform transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WebUpdates;
