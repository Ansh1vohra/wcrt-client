"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Define archive sections inline (no local data file)
const sections = [
  { name: "Biography Matriarch's", href: '/archive/biography-matriarchs', key: 'biography-matriarchs' },
  { name: 'Stalwart Woman', href: '/archive/stalwart-woman', key: 'stalwart-woman' },
  { name: 'Books', href: '/archive/books', key: 'books' },
  { name: 'Research Papers', href: '/archive/research-papers', key: 'research-papers' },
];

interface Post {
  title: string;
  dateCreated: string;
  tags: string[];
  category?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_BACKEND;
const API_URL = `${API_BASE}/api/posts/status/approved`;

const ArchivePage: React.FC = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  // Pagination counts
  const initialCounts: Record<string, number> = sections.reduce((acc, section) => {
    acc[section.key] = 6;
    return acc;
  }, {} as Record<string, number>);
  const [counts, setCounts] = useState<Record<string, number>>(initialCounts);

  useEffect(() => {
    (async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      try {
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) throw new Error(`Status ${response.status}`);
        const json = await response.json();
        setAllPosts(
          json.posts?.map((p: any) => ({
            title: p.title,
            dateCreated: p.uploadDate,
            tags: p.tags || [p.category],
            category: p.category?.toLowerCase(),
          })) || []
        );
      } catch (e: any) {
        if (e.name === 'AbortError') setError('Request timed out');
        else setError(e.message || 'Failed to fetch');
      } finally {
        clearTimeout(timeoutId);
        setLoadingData(false);
      }
    })();
  }, []);

  const loadMore = (key: string) => {
    const total = allPosts.filter(p => p.category === key.replace(/-/g, ' ')).length;
    setCounts(prev => ({
      ...prev,
      [key]: Math.min(total, prev[key] + 6),
    }));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: 'auto' }}>
      <h1>Archive</h1>
      {loadingData ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <p className="error">Failed to load data: {error}</p>}
          <div className="grid">
           {sections.map(section => {
             const posts = allPosts.filter(p => p.category === section.key.replace(/-/g, ' '));
             const count = counts[section.key];
             return (
               <div key={section.key} className="card">
                 <Link href={section.href}>
                   <h2>{section.name}</h2>
                 </Link>
                {/* only heading if no posts */}
                {posts.length > 0 && (
                  posts.slice(0, count).map((post, idx) => (
                    <div key={idx} className="post-item">
                      <h3>{post.title}</h3>
                      <p className="date">{post.dateCreated}</p>
                      <p className="tags">Tags: {post.tags.join(', ')}</p>
                    </div>
                  ))
                )}
                {posts.length > count && <button onClick={() => loadMore(section.key)}>Load More</button>}
               </div>
             );
           })}
          </div>
        </>
      )}
       <style jsx>{`
         .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-top: 1rem; }
         .card { box-shadow: 0 4px 8px rgba(0,0,0,0.1); border-radius: 8px; padding: 1rem; background: #fff; }
         .card h2 a { color: #0070f3; text-decoration: none; }
         .card h2 a:hover { color: #005bb5; }
         .post-item { margin-bottom: 1rem; }
         .date { color: #666; font-size: 0.9rem; }
         .tags { font-size: 0.9rem; }
         .error { color: #e1006a; margin-bottom: 1rem; }
         button { padding: 0.5rem 1rem; background: #0070f3; color: #fff; border: none; border-radius: 4px; cursor: pointer; }
         button:hover { background: #005bb5; }
       `}</style>
     </div>
   );
};

export default ArchivePage;
