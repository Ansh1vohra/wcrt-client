"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SafeHTML from "@/components/SafeHTML";

interface Post {
  postId: string;
  title: string;
  content: string;
  authorName: string;
  writerName: string;
  category: string;
  post_status: string;
  imageUrl: string; // post image URL
  authorImage: string; // author image URL
}

interface ApiResponse {
  status: string;
  posts: Post[];
  error?: string;
}

export default function OpenPostsPage() {
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // loading starts true (waiting for token + fetch)
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("admin-token");

    if (!token) {
      // No token, redirect to login
      router.push("/admin/login");
      return; // stop here
    }

    // If token exists, fetch posts
    fetchOpenPosts();
  }, [router]);

  async function fetchOpenPosts() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/posts/status/open`
      );
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

  async function updatePostStatus(
    postId: string,
    status: "approved" | "rejected"
  ) {
    setActionLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("admin-token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/posts/${postId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ post_status: status }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Post Status Updated Success!");
        setSelectedPost(null);
        fetchOpenPosts();
      } else {
        setError(data.error || "Failed to update post status");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update post status");
    }
    setActionLoading(false);
  }

  function previewText(html: string): string {
    const plainText = html.replace(/<[^>]+>/g, ''); // Remove HTML tags
    return plainText.length > 200 ? plainText.slice(0, 200) + '...' : plainText;
  }
  

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Open Posts</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {!loading && posts.length === 0 && <p>No open posts found.</p>}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.postId}
            className="border rounded-lg shadow p-4 flex flex-col justify-between"
          >
            {/* Post Image */}
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

              {/* Author info with author image */}
              <div className="flex items-center gap-3 mb-2">
                {post.authorImage ? (
                  <img
                    src={post.authorImage}
                    alt={post.authorName}
                    className="w-10 h-10 rounded-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                    N/A
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium">{post.authorName}</p>
                  <p className="text-xs text-gray-600">Writer: {post.writerName}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-1">Category: {post.category}</p>
              <p className="text-gray-700 mb-4">{previewText(post.content)}</p>
            </div>

            <button
              onClick={() => setSelectedPost(post)}
              className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Post
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-2 sm:px-6"
          onClick={() => !actionLoading && setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-3xl p-4 sm:p-6 relative overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Post Image */}
            <img
              src={selectedPost.imageUrl}
              alt={selectedPost.title}
              className="w-full h-48 sm:h-60 object-cover rounded mb-4"
              loading="lazy"
            />

            <h2 className="text-xl sm:text-2xl font-bold mb-4">{selectedPost.title}</h2>

            <div className="flex items-center gap-3 mb-4">
              <img
                src={selectedPost.authorImage}
                alt={selectedPost.authorName}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <p className="text-base sm:text-lg font-medium">{selectedPost.authorName}</p>
                <p className="text-sm text-gray-600">Writer: {selectedPost.writerName}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-2">Category: {selectedPost.category}</p>

            <div className="mb-6 whitespace-pre-wrap text-sm sm:text-base">
              <SafeHTML html={selectedPost.content} />
            </div>

            {/* <div className="mb-6 whitespace-pre-wrap text-sm sm:text-base">{selectedPost.content}</div> */}

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
              <button
                onClick={() => updatePostStatus(selectedPost.postId, "approved")}
                disabled={actionLoading}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                Approve
              </button>
              <button
                onClick={() => updatePostStatus(selectedPost.postId, "rejected")}
                disabled={actionLoading}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
              >
                Reject
              </button>
              <button
                onClick={() => !actionLoading && setSelectedPost(null)}
                className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
