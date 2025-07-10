// components/WebUpdates.tsx
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
// import Image from 'next/image'; // import Image removed to use text list
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
        setUpdates(
          [...(data.posts || [])]
            .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
            .slice(0, 6)
        ); // Get 6 most recent approved posts in descending order
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
    <div className="web-updates w-full overflow-auto">
      <h2 className="text-base lg:text-lg font-bold text-pink-600 border-b-2 border-pink-600 inline-block pb-1 mb-4">
        Web Updates
      </h2>
      <ul className="space-y-3">
        {updates.map((article) => (
          <li key={article.postId}>
            <Link href={`/post/${article.postId}`} className="flex items-start gap-2 hover:text-pink-600 block text-pink-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-pink-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 3l8 5-8 5V3z" />
              </svg>
              <span className="flex-1">{article.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}