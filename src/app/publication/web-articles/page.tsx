'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';


const repeatedItems = Array.from({ length: 30 }, (_, i) => ({
  title: `Repeated Article ${i + 1}`,
  author: "Emily Davis",
  postDate: "2023-09-28",
  abstract: "The latest developments in solar and wind energy.",
  content: "Solar panel efficiency has reached new highs...",
  image: "/article.jpg",
}));

const data = {
  categories: [
    {
      name: "Newsletters",
      items: [
        {
          title: "Weekly Tech Digest",
          author: "Jane Smith",
          postDate: "2023-10-15",
          abstract: "A roundup of the biggest tech stories this week.",
          content: "This week in tech, we saw major advancements in AI...",
          image: "/article.jpg",
        },
        {
          title: "Climate Change Monthly",
          author: "John Doe",
          postDate: "2023-10-10",
          abstract: "Latest updates on climate policies...",
          content: "Governments worldwide are introducing stricter policies...",
          image: "/article.jpg",
        },
      ],
    },
    {
      name: "Web Articles",
      items: [
        {
          title: "The Future of Remote Work",
          author: "Alice Johnson",
          postDate: "2023-10-12",
          abstract: "How hybrid work models are shaping the future...",
          content: "Companies are increasingly adopting hybrid work models...",
          image: "/article.jpg",
        },
        {
          title: "Understanding Blockchain",
          author: "Bob Williams",
          postDate: "2023-10-08",
          abstract: "A beginner's guide to blockchain technology.",
          content: "Blockchain is a decentralized ledger technology...",
          image: "/article.jpg",
        },
        {
          title: "Mental Health in the Digital Age",
          author: "Sarah Lee",
          postDate: "2023-10-05",
          abstract: "How social media affects mental well-being.",
          content: "Studies indicate that excessive social media use...",
          image: "/article.jpg",
        },
      ],
    },
    {
      name: "Issue Briefs",
      items: repeatedItems,
    },
  ],
};

const allArticles = data.categories.flatMap((cat) => cat.items);
const mainArticle = allArticles[0];
const sideArticles = allArticles.slice(1, 4);
const remainingArticles = allArticles.slice(4);

const ARTICLES_PER_PAGE = 10;

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(remainingArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = remainingArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6 max-w-7xl mx-auto">
      
      <Link
        href={`/article/${encodeURIComponent(mainArticle.title)}`}
        className="lg:col-span-2 relative h-[500px] group overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1"
      >
        <Image
          src={mainArticle.image}
          alt={mainArticle.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 p-4 flex flex-col justify-end">
          <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 font-semibold tracking-wide w-fit">
            ARTICLES
          </span>
          <h2 className="text-white text-2xl font-bold cursor-pointer transition-all duration-300 group-hover:translate-y-[-4px] no-underline">
            {mainArticle.title}
          </h2>
          <p className="text-white text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            By <strong className="text-red-500">{mainArticle.author}</strong> ● {mainArticle.postDate}
          </p>
        </div>
      </Link>

      
      <div className="flex flex-col gap-4 h-[500px]">
        {sideArticles.map((article) => (
          <Link
            key={article.title}
            href={`/article/${encodeURIComponent(article.title)}`}
            className="relative h-[156px] flex-1 group overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1"
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 p-4 flex flex-col justify-end">
              <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 font-semibold tracking-wide w-fit">
                ARTICLES
              </span>
              <h3 className="text-white text-xl font-semibold cursor-pointer transition-all duration-300 group-hover:translate-y-[-4px] no-underline">
                {article.title}
              </h3>
              <p className="text-white text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                By <strong className="text-red-500">{article.author}</strong> ● {article.postDate}
              </p>
            </div>
          </Link>
        ))}
      </div>

      
      <div className="col-span-full mt-10">
        <h2 className="text-3xl font-bold mb-4">Articles</h2>
        <div className="flex flex-col gap-6">
          {paginatedArticles.map((article) => (
            <div key={article.title} className="flex flex-col md:flex-row gap-4">
              <div className="relative w-full md:w-[300px] h-[200px]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <Link href={`/article/${encodeURIComponent(article.title)}`}>
                    <h2 className="text-black text-xl font-bold hover:text-red-600 transition-colors cursor-pointer no-underline">
                      {article.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 text-sm mt-1">
                    By <strong className="text-red-500">{article.author}</strong> ● {article.postDate}
                  </p>
                  <p className="text-gray-800 mt-2">{article.abstract}</p>
                </div>

                <Link href={`/article/${encodeURIComponent(article.title)}`}>
                  <button className="mt-4 w-max px-4 py-1 text-sm text-gray-700 border border-gray-400 bg-white transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white hover:scale-105 active:scale-95 active:bg-red-400 shadow-sm hover:shadow-lg">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}

         
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
        </div>
      </div>
    </div>
  );
}
