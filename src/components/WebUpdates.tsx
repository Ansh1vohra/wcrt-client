"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

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

interface WebUpdatesProps {
  updates: Article[];
  validateImage: (imagePath: string) => Promise<string>;
}

const defaultImage = "/article.jpg";

const WebUpdates = ({ updates, validateImage }: WebUpdatesProps) => {
  const [validatedImages, setValidatedImages] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const validateImages = async () => {
      const imagePromises = updates.map(async (article) => {
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
  }, [updates, validateImage]);

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
    <div className="web-updates">
      <h2 className="text-base lg:text-lg font-bold mb-4 text-pink-600 border-b-2 border-pink-600 inline-block pb-1">Web Updates</h2>
      <div className="space-y-2 lg:space-y-3">
        {updates.map((update) => (
          <Link 
            href={`/publication/web-articles/${update.postId}`} 
            key={update.postId}
            className="block group"
          >
            <div className="flex gap-3">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={validatedImages[update.imageUrl || ''] || defaultImage}
                  alt={update.title}
                  fill
                  className="object-cover rounded-lg transition-opacity duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={false}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = defaultImage;
                  }}
                />
              </div>
              <div className="flex-1 text-sm">
                <span className="text-gray-500 text-xs">
                  {formatDate(update.uploadDate)}
                </span>
                <h3 className="font-medium mt-1 group-hover:text-pink-600 transition-colors line-clamp-2">
                  {update.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WebUpdates;
