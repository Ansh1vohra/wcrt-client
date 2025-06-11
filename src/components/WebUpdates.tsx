// components/WebUpdates.tsx
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils'; // Create a utils file for shared functions

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND}/api/posts/status/approved`;

interface Article {
  title: string;
  content: string;
  uploadDate: string;
  imageUrl?: string;
  postId: string;
}

export default function WebUpdates() {
  const [updates, setUpdates] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch updates');
        }
        const data = await response.json();
        setUpdates(data.posts.slice(0, 4) || []); // Get first 4 approved posts
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch updates');
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  if (loading) return <div>Loading updates...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="web-updates">
      <h2 className="text-base lg:text-lg font-bold text-pink-600 border-b-2 border-pink-600 inline-block pb-1 mb-4">
        Web Updates
      </h2>
      <div className="space-y-4">
        {updates.map((article) => (
          <Link 
            href={`/publication/web-articles/${article.postId}`} 
            key={article.postId}
            className="flex gap-3 group"
          >
            <div className="relative w-24 h-20 flex-shrink-0 rounded overflow-hidden">
              <Image
                src={article.imageUrl || '/article.jpg'}
                alt={article.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 group-hover:text-pink-600 transition-colors text-base line-clamp-2">
                {article.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                {formatDate(article.uploadDate)}
              </div>
              <p className="text-sm text-gray-700 line-clamp-2">
                {article.content}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}