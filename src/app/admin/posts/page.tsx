"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SafeHTML from "@/components/SafeHTML";
import '@/components/article-content.css';


interface Post {
  postId: string;
  title: string;
  content: string;
  authorName: string;
  writerName: string;
  category: string;
  post_status: string;
  imageUrl: string;
  authorImage: string;
}

interface ApiResponse {
  status: string;
  posts: Post[];
  error?: string;
}

export default function OpenPostsPage() {
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [approvedPosts, setApprovedPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("admin-token");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetchOpenPosts();
    fetchApprovedPosts();
  }, [router]);

  async function fetchOpenPosts() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/posts/status/open`);
      const data: ApiResponse = await res.json();
      if (res.ok) {
        setPosts(data.posts);
      } else {
        setError(data.error || "Failed to load posts");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load posts");
    }
    setLoading(false);
  }

  async function fetchApprovedPosts() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/posts/status/approved`);
      const data: ApiResponse = await res.json();
      if (res.ok) {
        setApprovedPosts(data.posts);
      } else {
        setError(data.error || "Failed to load approved posts");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load approved posts");
    }
  }

  async function updatePostStatus(postId: string, status: "approved" | "rejected" | "edit") {
    setActionLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("admin-token");

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/posts/${postId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ post_status: status }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Post Status Updated Successfully!");
        setSelectedPost(null);
        fetchOpenPosts();
        fetchApprovedPosts();
      } else {
        setError(data.error || "Failed to update post status");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update post status");
    }
    setActionLoading(false);
  }

  function previewText(html: string): string {
    const plainText = html.replace(/<[^>]+>/g, '');
    return plainText.length > 200 ? plainText.slice(0, 200) + '...' : plainText;
  }

  const filteredOpenPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredApprovedPosts = approvedPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <h1 className="text-3xl font-bold mb-6">Open Posts</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!loading && filteredOpenPosts.length === 0 && <p>No open posts found.</p>}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredOpenPosts.map((post) => (
          <PostCard key={post.postId} post={post} onView={() => setSelectedPost(post)} />
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Approved Posts</h2>

      {filteredApprovedPosts.length === 0 && (
        <p className="text-gray-600 mb-6">No approved posts found.</p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredApprovedPosts.map((post) => (
          <PostCard key={post.postId} post={post} onView={() => setSelectedPost(post)} />
        ))}
      </div>

      {/* Modal */}
      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => !actionLoading && setSelectedPost(null)}
          onApprove={() => updatePostStatus(selectedPost.postId, "approved")}
          onReject={() => updatePostStatus(selectedPost.postId, "rejected")}
          onSendForEdit={() => updatePostStatus(selectedPost.postId, "edit")}
          actionLoading={actionLoading}
          error={error}
        />
      )}
    </div>
  );
}

// Reusable Post Card
function PostCard({ post, onView }: { post: Post; onView: () => void }) {
  return (
    <div className="border rounded-lg shadow p-4 flex flex-col justify-between">
      {post.imageUrl ? (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-40 object-cover rounded mb-4"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500">
          No image
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <div className="flex items-center gap-3 mb-2">
          {post.authorImage ? (
            <img
              src={post.authorImage}
              alt={post.authorName}
              className="w-10 h-10 rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">N/A</div>
          )}
          <div>
            <p className="text-sm font-medium">{post.authorName}</p>
            <p className="text-xs text-gray-600">Writer: {post.writerName}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-1">Category: {post.category}</p>
        <p className="text-gray-700 mb-4">{post.content.replace(/<[^>]+>/g, '').slice(0, 200)}...</p>
      </div>

      <button
        onClick={onView}
        className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View Post
      </button>
    </div>
  );
}



// Reusable Modal
function PostModal({
  post,
  onClose,
  onApprove,
  onReject,
  onSendForEdit,
  actionLoading,
  error,
}: {
  post: Post;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  onSendForEdit: () => void;
  actionLoading: boolean;
  error: string | null;
}) 
{
  const router = useRouter();
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-2 sm:px-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-3xl p-4 sm:p-6 relative overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 sm:h-60 object-cover rounded mb-4"
          loading="lazy"
        />
        <h2 className="text-xl sm:text-2xl font-bold mb-4">{post.title}</h2>
        <div className="flex items-center gap-3 mb-4">
          <img
            src={post.authorImage}
            alt={post.authorName}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
            loading="lazy"
          />
          <div>
            <p className="text-base sm:text-lg font-medium">{post.authorName}</p>
            <p className="text-sm text-gray-600">Writer: {post.writerName}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-2">Category: {post.category}</p>
        <div className="mb-6 whitespace-pre-wrap text-sm sm:text-base">
          <SafeHTML html={post.content} className="article-content" />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
          <button
            onClick={onApprove}
            disabled={actionLoading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            Approve
          </button>
          <button
            onClick={onReject}
            disabled={actionLoading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
          >
            Reject
          </button>
          <button
            onClick={() => onSendForEdit()}
            disabled={actionLoading}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:opacity-50"
          >
            Send for Edit
          </button>

          <button
            onClick={() => router.push(`/admin/posts/edit/${post.postId}`)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Edit Yourself
          </button>

          <button
            onClick={onClose}
            className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
