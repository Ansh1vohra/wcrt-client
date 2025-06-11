'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Comments from './comment';
import SocialShare from './SocialIcons';
import Logo from './logo';
import WebUpdates from './WebUpdates';
import TrendingAndPopular from './TrendingAndPopular';

interface ArticleType {
  title: string;
  author: string | string[];
  postDate: string;
  content: string;
  abstract?: string;
  image?: string;
  postViews?: number;
  comments?: number;
}

interface Article extends ArticleType {
  author: string; // string only, not array
  abstract: string;
}

export default function ArticleClient({
  article,
  allArticles
}: {
  article: ArticleType;
  allArticles: ArticleType[];
}) {
  const [formattedDate, setFormattedDate] = useState('');
  const [authors, setAuthors] = useState<string[]>([]);
  const [latestArticles, setLatestArticles] = useState<ArticleType[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<ArticleType[]>([]);
  const [webUpdates, setWebUpdates] = useState<ArticleType[]>([]);

  useEffect(() => {
    setFormattedDate(new Date(article.postDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));

    setAuthors(Array.isArray(article.author) ? article.author : [article.author]);

    setLatestArticles(allArticles.slice(0, 4));
    setTrendingArticles(allArticles.slice(0, 3));
    setWebUpdates(allArticles.slice(0, 5));
  }, [article, allArticles]);

  const validateImage = useCallback(async (imagePath: string): Promise<string> => {
    try {
      const response = await fetch(imagePath, { method: 'HEAD' });
      return response.ok ? imagePath : '/article.jpg';
    } catch {
      return '/article.jpg';
    }
  }, []);

  function normalizeArticles(input: ArticleType[]): Article[] {
    return input.map((article) => ({
      ...article,
      abstract: article.abstract || '',
      author: Array.isArray(article.author) ? article.author.join(', ') : article.author,
    }));
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Article */}
        <article className="lg:col-span-8 px-4">
          <nav className="flex items-center gap-2 text-gray-600 mb-6">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <span>›</span>
            <Link href="/publications" className="hover:text-red-600">Publications</Link>
          </nav>

          <h1 className="text-[40px] font-bold leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-gray-600">by</span>
            {authors.map((name, index) => (
              <span key={name} className="inline-flex items-center">
                <span className="text-red-600 font-medium">{name}</span>
                {index < authors.length - 1 && <span className="mx-1">,</span>}
              </span>
            ))}
            <span className="text-gray-400 mx-2">—</span>
            <time dateTime={article.postDate} className="text-gray-600">
              {formattedDate}
            </time>
          </div>

          {article.abstract && (
            <p className="text-xl text-gray-600 mb-8 italic">{article.abstract}</p>
          )}

          {article.image && (
            <div className="mb-8 relative aspect-video">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="rounded-lg object-cover"
                priority
              />
            </div>
          )}

          <div className="prose max-w-none">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <SocialShare title={article.title} />
          <Comments />
          <Logo />
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 px-4">
          <WebUpdates
            updates={normalizeArticles(webUpdates)}
            validateImage={validateImage}
          />
          <TrendingAndPopular
            articles={normalizeArticles(allArticles)}
            latestArticles={normalizeArticles(latestArticles)}
            trendingArticles={normalizeArticles(trendingArticles)}
            validateImage={validateImage}
          />
        </aside>
      </div>
    </main>
  );
}
