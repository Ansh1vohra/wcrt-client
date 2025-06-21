// components/TrendingAndPopular.tsx
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND}/api/posts/status/approved`;

interface Article {
  title: string;
  uploadDate: string;
  imageUrl?: string;
  postId: string;
  viewCount: number;
}

export default function TrendingAndPopular() {
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [activeTab, setActiveTab] = useState<'trending' | 'latest'>('trending');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch articles');
        const data = await response.json();
        const articles = data.posts || [];

        setTrendingArticles(
          [...articles].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0)).slice(0, 4)
        );

        setLatestArticles(
          [...articles].sort(
            (a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
          ).slice(0, 4)
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div>Loading articles...</div>;
  if (error) return <div>Error: {error}</div>;

  const articlesToShow = activeTab === 'trending' ? trendingArticles : latestArticles;

  return (
    <div className="trending-section">
      {/* Tab Buttons */}
      <div className="flex gap-4 mb-6 border-b border-pink-300">
        <button
          className={`font-semibold pb-1 ${
            activeTab === 'trending'
              ? 'text-pink-600 border-b-2 border-pink-600'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('trending')}
        >
          Trending
        </button>
        <button
          className={`font-semibold pb-1 ${
            activeTab === 'latest'
              ? 'text-pink-600 border-b-2 border-pink-600'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('latest')}
        >
          Latest
        </button>
      </div>

      {/* Articles List */}
      <div className="space-y-3">
        {articlesToShow.map((article) => (
          <Link
            href={`/post/${article.postId}`}
            key={article.postId}
            className="block group"
          >
            <div className="flex gap-3">
              <div className="relative w-[120px] h-[85px] flex-shrink-0">
                <Image
                  src={article.imageUrl || '/article.jpg'}
                  alt={article.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="100vw"
                />
              </div>
              <div className="flex-1 text-sm">
                <h3 className="font-medium group-hover:text-pink-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {formatDate(article.uploadDate)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
