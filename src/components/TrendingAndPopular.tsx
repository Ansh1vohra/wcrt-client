// components/TrendingAndPopular.tsx
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { useRef } from 'react';

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND}/api/posts/status/approved`;
const COMMENTS_API = `${process.env.NEXT_PUBLIC_BACKEND}/api/comments`;

interface Article {
  title: string;
  uploadDate: string;
  imageUrl?: string;
  postId: string;
  viewCount: number;
}

interface Comment {
  comment_ID: string;
  postId: string;
  commenterName: string;
  commentText: string;
  createdAt: string;
}

export default function TrendingAndPopular() {
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [activeTab, setActiveTab] = useState<'trending' | 'latest' | 'comments'>('trending');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const articlesToShow = activeTab === 'trending' 
    ? trendingArticles 
    : activeTab === 'latest' 
      ? latestArticles 
      : [];
  const activePostId = articlesToShow[0]?.postId || '';

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [commenterEmail, setCommenterEmail] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState('');
  const [commentSuccess, setCommentSuccess] = useState('');

  const [mostCommentedPosts, setMostCommentedPosts] = useState<Article[]>([]);
  const [recentComments, setRecentComments] = useState<Comment[]>([]);
  const [allCommentsFetched, setAllCommentsFetched] = useState<Comment[]>([]);
  const [visibleCommentCount, setVisibleCommentCount] = useState(3);

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

  // Fetch approved comments for the active post
  useEffect(() => {
    if (!activePostId) return;
    fetch(`${COMMENTS_API}/post/${activePostId}`)
      .then(res => res.json())
      .then(data => {
        setComments(data.comments || []);
      });
  }, [activePostId]);

  // Fetch most commented posts by checking comments for each post
  useEffect(() => {
    const fetchMostCommentedPosts = async () => {
      try {
        // First get all posts
        const postsResponse = await fetch(`${API_URL}`);
        if (!postsResponse.ok) throw new Error('Failed to fetch posts');
        const postsData = await postsResponse.json();
        const allPosts = postsData.posts || [];
        
        // For each post, check comment count
        const postsWithCommentCount: Array<Article & { commentCount: number }> = [];
        
        // Check comments for the first 15 posts (limit API calls)
        const postsToCheck = allPosts.slice(0, 15);
        
        for (const post of postsToCheck as Article[]) {
          const commentResponse = await fetch(`${COMMENTS_API}/post/${post.postId}`);
          if (commentResponse.ok) {
            const commentData = await commentResponse.json();
            const commentCount = commentData.comments?.length || 0;
            postsWithCommentCount.push({...post, commentCount});
          }
        }
        
        // Sort by comment count and take top 4
        const mostCommented = postsWithCommentCount
          .sort((a, b) => b.commentCount - a.commentCount)
          .slice(0, 4);
          
        setMostCommentedPosts(mostCommented);
      } catch (err) {
        console.error('Error fetching most commented posts:', err);
      }
    };

    fetchMostCommentedPosts();
  }, []);
  
  // Fetch recent comments using the available endpoints
  useEffect(() => {
    const fetchRecentComments = async () => {
      try {
        // Fetch approved comments from various posts (available endpoint)
        const postsResponse = await fetch(`${API_URL}`);
        if (!postsResponse.ok) throw new Error('Failed to fetch posts');
        const postsData = await postsResponse.json();
        
        // Get first few post IDs
        const postIds = postsData.posts?.slice(0, 5).map((post: Article) => post.postId) || [];
        
        // Collect comments from each post
        const allComments: Comment[] = [];
        
        for (const postId of postIds) {
          const commentResponse = await fetch(`${COMMENTS_API}/post/${postId}`);
          if (commentResponse.ok) {
            const commentData = await commentResponse.json();
            if (commentData.comments && commentData.comments.length > 0) {
              allComments.push(...commentData.comments);
            }
          }
        }
        
        // Sort by date (newest first)
        const sortedComments = allComments
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
        // Store all comments
        setAllCommentsFetched(sortedComments);
        
        // Show only the first few comments
        setRecentComments(sortedComments.slice(0, visibleCommentCount));
      } catch (err) {
        console.error('Error fetching recent comments:', err);
      }
    };

    fetchRecentComments();
  }, []);
  
  // Update visible comments when count changes
  useEffect(() => {
    setRecentComments(allCommentsFetched.slice(0, visibleCommentCount));
  }, [visibleCommentCount, allCommentsFetched]);

  // Handle comment submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCommentLoading(true);
    setCommentError('');
    setCommentSuccess('');
    try {
      const res = await fetch(COMMENTS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: activePostId,
          commenterName,
          commenterEmail,
          commentText
        })
      });
      const data = await res.json();
      if (res.ok) {
        setCommentSuccess('Comment submitted! It will be visible after admin approval.');
        setCommentText('');
        setCommenterName('');
        setCommenterEmail('');
      } else {
        setCommentError(data.error || 'Failed to submit comment');
      }
    } catch (err) {
      setCommentError('Failed to submit comment');
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) return <div>Loading articles...</div>;
  if (error) return <div>Error: {error}</div>;

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
        <button
          className={`font-semibold pb-1 ${
            activeTab === 'comments'
              ? 'text-pink-600 border-b-2 border-pink-600'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('comments')}
        >
          Comments
        </button>
      </div>

      {/* Content Area */}
      <div className="space-y-3">
        {activeTab !== 'comments' ? (
          /* Articles List */
          articlesToShow.map((article) => (
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
          ))
        ) : (
          /* Recent Comments */
          recentComments.length > 0 ? (
            <>
              {recentComments.map((comment) => (
                <div key={comment.comment_ID} className="border rounded p-3 mb-3 hover:border-pink-300 transition-colors">
                  <div className="font-semibold text-pink-700">{comment.commenterName}</div>
                  <div className="text-gray-700 my-2 line-clamp-3">{comment.commentText}</div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">{new Date(comment.createdAt).toLocaleString()}</span>
                    <Link
                      href={`/post/${comment.postId}`}
                      className="text-pink-600 hover:underline font-medium"
                    >
                      View post →
                    </Link>
                  </div>
                </div>
              ))}
              
              {/* Load More Button - only show if there are more comments to load */}
              {visibleCommentCount < allCommentsFetched.length && (
                <div className="flex justify-center mt-3">
                  <button 
                    onClick={() => setVisibleCommentCount(prev => prev + 3)}
                    className="px-4 py-1 text-sm border border-pink-600 text-pink-600 hover:bg-pink-50 transition-colors rounded-sm"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-gray-500 py-4 text-center">No recent comments found.</div>
          )
        )}
      </div>

      {/* End of content */}
    </div>
  );
}
