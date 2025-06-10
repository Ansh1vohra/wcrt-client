'use client';

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import articlesData from '@/data/data.json';
import Comments from '@/app/publication/web-articles/[slug]/comment';
import SocialShare from '@/app/publication/web-articles/[slug]/SocialIcons';
import Logo from '@/app/publication/web-articles/[slug]/logo';
import WebUpdates from '@/app/publication/web-articles/[slug]/WebUpdates';
import TrendingAndPopular from '@/app/publication/web-articles/[slug]/TrendingAndPopular';
import { useCallback, useState, useEffect } from 'react';

// Original article type from data.json
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

// Required Article type for TrendingAndPopular component
interface Article {
  title: string;
  author: string;
  postDate: string;
  content: string;
  abstract: string;
  image?: string;
  postViews?: number;
  comments?: number;
}

interface Category {
  name: string;
  items: ArticleType[];
}

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function getArticleBySlug(slug: string): Promise<ArticleType | null> {
  try {
    const categories = articlesData.categories as Category[];
    for (const category of categories) {
      const article = category.items.find((item) => createSlug(item.title) === slug);
      if (article) return article;
    }
    return null;
  } catch (error) {
    console.error('Error finding article:', error);
    return null;
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [authors, setAuthors] = useState<string[]>([]);
  const [latestArticles, setLatestArticles] = useState<ArticleType[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<ArticleType[]>([]);
  const [webUpdates, setWebUpdates] = useState<ArticleType[]>([]);
  const [allArticles, setAllArticles] = useState<ArticleType[]>([]);

  // ✅ Add this helper function inside the component
  function normalizeArticles(input: ArticleType[]): Article[] {
    return input.map((article) => ({
      ...article,
      abstract: article.abstract || '',
      author: Array.isArray(article.author) ? article.author.join(', ') : article.author,
    }));
  }

  useEffect(() => {
    const fetchData = async () => {
      const { slug } = params;
      const fetchedArticle = await getArticleBySlug(slug);
      if (!fetchedArticle) {
        notFound();
        return;
      }

      setArticle(fetchedArticle);

      const newFormattedDate = new Date(fetchedArticle.postDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      setFormattedDate(newFormattedDate);

      setAuthors(
        Array.isArray(fetchedArticle.author) ? fetchedArticle.author : [fetchedArticle.author]
      );

      const categories = articlesData.categories as Category[];
      const newAllArticles: ArticleType[] = categories.reduce(
        (acc: ArticleType[], category) => acc.concat(category.items),
        []
      );

      setAllArticles(newAllArticles);
      setLatestArticles(newAllArticles.slice(0, 4));
      setTrendingArticles(newAllArticles.slice(0, 3));
      setWebUpdates(newAllArticles.slice(0, 5));
    };

    fetchData();
  }, [params.slug]);

  const validateImage = useCallback(async (imagePath: string): Promise<string> => {
    try {
      const response = await fetch(imagePath, { method: 'HEAD' });
      return response.ok ? imagePath : '/article.jpg';
    } catch (error) {
      console.error('Error validating image:', error);
      return '/article.jpg';
    }
  }, []);

  if (!article) return <div>Loading...</div>;

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Article Section */}
        <article className="lg:col-span-3 px-4">
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

        {/* Sidebar Section */}
        <aside className="lg:col-span-1 px-4">
          <WebUpdates updates={normalizeArticles(webUpdates)} validateImage={validateImage} />
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
