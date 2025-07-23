"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PublicationSlider from '@/components/PublicationSlider';

// Define archive sections inline (no local data file)
const sections = [
  { name: "Biography Matriarch's", href: '/archive/biography-matriarchs', key: 'biography-matriarchs' },
  { name: 'Stalwart Woman', href: '/archive/stalwart-woman', key: 'stalwart-woman' },
  { name: 'Books', href: '/archive/books', key: 'books' },
  { name: 'Research Papers', href: '/archive/research-papers', key: 'research-papers' },
];

interface Article {
  postId: string;
  title: string;
  imageUrl?: string;
  category?: string;
  uploadDate: string;
  authorName?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_BACKEND;
const API_URL = `${API_BASE}/api/posts/status/approved`;
const defaultImage = '/wcrt-logo.png';

const ArchivePage: React.FC = () => {
  const [allPosts, setAllPosts] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [validatedImages, setValidatedImages] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      try {
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) throw new Error(`Status ${response.status}`);
        const json = await response.json();
        
        const posts = json.posts?.map((p: any) => ({
          postId: p.postId || p.id,
          title: p.title,
          imageUrl: p.imageUrl,
          uploadDate: p.uploadDate,
          authorName: p.authorName,
          category: p.category?.toLowerCase(),
        })) || [];
        
        setAllPosts(posts);

        // Validate images
        const imageValidationPromises = posts.map(async (post: Article) => {
          if (post.imageUrl) {
            try {
              const img = new window.Image();
              img.src = post.imageUrl;
              await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
              });
              return { url: post.imageUrl, validated: post.imageUrl };
            } catch {
              return { url: post.imageUrl, validated: defaultImage };
            }
          }
          return { url: post.imageUrl || '', validated: defaultImage };
        });

        const validatedResults = await Promise.all(imageValidationPromises);
        const imageMap: Record<string, string> = {};
        validatedResults.forEach((result, index) => {
          imageMap[posts[index].imageUrl || ''] = result.validated;
        });
        setValidatedImages(imageMap);

      } catch (e: any) {
        if (e.name === 'AbortError') setError('Request timed out');
        else setError(e.message || 'Failed to fetch');
      } finally {
        clearTimeout(timeoutId);
        setLoadingData(false);
      }
    })();
  }, []);

  return (
    <main className="container mx-auto px-4 max-w-full">
      <div className="w-[750px] mx-auto mt-[30px]">
        <h1 className="text-4xl font-bold text-pink-700 mb-8">Archive</h1>
        {loadingData ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                Failed to load data: {error}
              </div>
            )}
            <div className="space-y-8">
              {sections.map(section => {
                const posts = allPosts.filter(p => p.category === section.key.replace(/-/g, ' '));
                return (
                  <div key={section.key}>
                    <PublicationSlider
                      title={section.name}
                      articles={posts}
                      defaultImage={defaultImage}
                      validatedImages={validatedImages}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default ArchivePage;
