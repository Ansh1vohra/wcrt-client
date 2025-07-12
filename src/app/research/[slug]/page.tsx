'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import SafeHTML from '@/components/SafeHTML';
import '@/components/article-content.css';

interface Article {
  postId: string;
  title: string;
  imageUrl: string;
  authorName: string;
  uploadDate: string;
  content: string;
  category: string;
  post_status: string;
}

const ARTICLES_PER_PAGE = 10;

const slugToCategoryMap: Record<string, string> = {
  'women-rights-development': 'women-rights-and-development',
  'child-rights-development': 'child-rights-development',
  'national-data-atrocities-women': 'national-data-atrocities-women',
  'child-development-malnutrition': 'child-development-malnutrition',
};

export default function Page() {
  const params = useParams();
  const slug = params?.slug as string; // Get the slug from URL params
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setIsLoading(true);
        // Map slug to category or use slug directly
        const category = slugToCategoryMap[slug] || slug;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND}/api/posts/category/${category}/approved`
        );

        const contentType = response.headers.get('content-type');
        const rawText = await response.text();

        if (contentType && contentType.includes('application/json')) {
          const data = JSON.parse(rawText);
          const approvedPosts = data.posts?.filter(
            (post: Article) => post.post_status === 'approved'
          );
          setArticles(approvedPosts || []);
        } else {
          console.error('Expected JSON but received non-JSON response.');
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticles();
  }, [slug]);

   // Show loading spinner while data is being fetched
   if (isLoading) {
    return (
      <div className="h-full inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500"></div>
      </div>
    );
  }

  // Sort articles by uploadDate descending (latest first)
  const sortedArticles = [...articles].sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
  const mainArticle = sortedArticles[0];
  const sideArticles = sortedArticles.slice(1, 4);
  const remainingArticles = sortedArticles.slice(4);
  const totalPages = Math.max(
    1,
    Math.ceil(remainingArticles.length / ARTICLES_PER_PAGE)
  );
  const paginatedArticles = remainingArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6 max-w-7xl mx-auto">
      {/* Main Article */}
      {mainArticle ? (
        <Link
          href={`/post/${mainArticle.postId}`}
          className="lg:col-span-2 relative h-[500px] group overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1"
        >
          <Image
            src={mainArticle.imageUrl}
            alt={mainArticle.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 p-4 flex flex-col justify-end">
            <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 font-semibold tracking-wide w-fit">
              {mainArticle.category ? mainArticle.category.toUpperCase() : 'ARTICLE'}
            </span>
            <h2 className="text-white text-2xl font-bold cursor-pointer transition-all duration-300 group-hover:translate-y-[-4px] no-underline">
              {mainArticle.title}
            </h2>
            <p className="text-white text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              By <strong className="text-red-500">{mainArticle.authorName}</strong> ●{' '}
              {new Date(mainArticle.uploadDate).toLocaleDateString()}
            </p>
          </div>
        </Link>
      ) : (
        <div className="lg:col-span-2 text-center text-gray-500 text-xl font-semibold flex items-center justify-center h-[500px] border">
          No Article Found
        </div>
      )}

      {/* Side Articles */}
      <div className="flex flex-col gap-4 h-[500px]">
        {sideArticles.length > 0 ? (
          sideArticles.map((article) => (
            <Link
              key={article.postId}
              href={`/post/${article.postId}`}
              className="relative h-[156px] flex-1 group overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1"
            >
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 p-4 flex flex-col justify-end">
                <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 font-semibold tracking-wide w-fit">
                  {article.category ? article.category.toUpperCase() : 'ARTICLE'}
                </span>
                <h3 className="text-white text-xl font-semibold cursor-pointer transition-all duration-300 group-hover:translate-y-[-4px] no-underline">
                  {article.title}
                </h3>
                <p className="text-white text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  By <strong className="text-red-500">{article.authorName}</strong> ●{' '}
                  {new Date(article.uploadDate).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center text-gray-500 text-lg font-medium flex-1 flex items-center justify-center border">
            No Article Found
          </div>
        )}
      </div>

      {/* Paginated Articles */}
      <div className="col-span-full mt-10">
        <h2 className="text-3xl font-bold mb-4">Articles</h2>
        <div className="flex flex-col gap-8">
          {paginatedArticles.length > 0 ? (
            paginatedArticles.map((article) => (
              <div
                key={article.postId}
                className="flex flex-col md:flex-row gap-6 border-b pb-6"
              >
                <div className="relative w-full md:w-[340px] h-[200px] shrink-0 overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <Link href={`/post/${article.postId}`}>
                      <h2 className="text-black text-xl font-bold hover:text-red-600 transition-colors cursor-pointer no-underline">
                        {article.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 text-sm mt-1">
                      By <strong className="text-red-500">{article.authorName}</strong> ●{' '}
                      {new Date(article.uploadDate).toLocaleDateString()}
                    </p>
                    <div className="text-gray-800 mt-2 line-clamp-3">
                      <SafeHTML html={article.content} className="article-content" />
                    </div>
                  </div>
                  <Link href={`/post/${article.postId}`}>
                    <button className="mt-4 w-max px-4 py-1 text-sm text-gray-700 border border-gray-400 bg-white transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white hover:scale-105 active:scale-95 active:bg-red-400 shadow-sm hover:shadow-lg">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg font-medium mt-4">
              No Article Found
            </p>
          )}
        </div>

        {/* Pagination — Always Visible */}
        {totalPages >= 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded-none"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 text-sm rounded-none ${
                  currentPage === i + 1
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded-none"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}