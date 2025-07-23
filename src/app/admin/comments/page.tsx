"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Comment {
  comment_ID: string;
  commenterName: string;
  commenterEmail: string;
  commentText: string;
  postId: string;
  website?: string;
  commentStatus: string;
  createdAt: string;
  visible: boolean;
}

export default function CommentsApproval() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get the API base URL from environment
  const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND}/api`;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Get the admin token from local storage
        const token = localStorage.getItem("admin-token");
        console.log("Admin token retrieved:", token ? "Found (length: " + token.length + ")" : "Not found");
        
        if (!token) {
          setError("You are not logged in as admin");
          setLoading(false);
          window.location.href = "/admin/login"; // Redirect to admin login
          return;
        }

        // Add more debugging information
        console.log(`Fetching pending comments from: ${API_BASE_URL}/comments/pending`);
        console.log(`Authorization header: Bearer ${token.substring(0, 10)}...`);
        
        const response = await axios.get(`${API_BASE_URL}/comments/pending`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log("Response received:", response.status);
        if (response.data && response.data.comments) {
          console.log("Comments found:", response.data.comments.length);
          setComments(response.data.comments);
        } else {
          console.log("No comments found in response:", response.data);
          setComments([]);
        }
      } catch (error: any) {
        console.error("Error fetching comments:", error);
        
        // Enhanced error logging
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          
          if (error.response.status === 401) {
            setError("Authentication failed. Please try logging in again.");
            window.location.href = "/admin/login"; // Redirect to admin login
          } else {
            setError(`Failed to fetch comments: ${error.response.data?.error || error.message}`);
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
          setError("No response from server. Please check your connection.");
        } else {
          // Something happened in setting up the request
          console.error('Error message:', error.message);
          setError(`Failed to fetch comments: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const updateCommentStatus = async (commentId: string, status: 'approved' | 'rejected') => {
    try {
      // Get the admin token from local storage
      const token = localStorage.getItem("admin-token");
      if (!token) {
        setError("You are not logged in as admin");
        return;
      }

      console.log(`Updating comment status to ${status}: ${API_BASE_URL}/comments/${commentId}/status`);
      
      const response = await axios.patch(
        `${API_BASE_URL}/comments/${commentId}/status`, 
        { commentStatus: status },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Response:', response.status, response.data);
      
      // Remove the comment from the list after approval/rejection
      setComments((prev) => prev.filter((comment) => comment.comment_ID !== commentId));
      
    } catch (error: any) {
      console.error(`Error ${status === 'approved' ? 'approving' : 'rejecting'} comment:`, error);
      
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        
        if (error.response.status === 401) {
          setError("Authentication failed. Please try logging in again.");
        } else {
          setError(`Failed to ${status} comment: ${error.response.data?.error || error.message}`);
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
        setError("No response from server. Please check your connection.");
      } else {
        console.error('Error message:', error.message);
        setError(`Failed to ${status} comment: ${error.message}`);
      }
    }
  };
  
  const approveComment = (commentId: string) => updateCommentStatus(commentId, 'approved');
  const rejectComment = (commentId: string) => updateCommentStatus(commentId, 'rejected');

  const toggleCommentVisibility = async (commentId: string, visible: boolean) => {
    try {
      const token = localStorage.getItem("admin-token");
      if (!token) {
        setError("You are not logged in as admin");
        return;
      }

      const response = await axios.patch(
        `${API_BASE_URL}/comments/${commentId}/visibility`,
        { visible },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Visibility updated:', response.data);
      setComments((prev) => prev.map((comment) =>
        comment.comment_ID === commentId ? { ...comment, visible } : comment
      ));
    } catch (error: any) {
      console.error('Error updating comment visibility:', error);
      setError('Failed to update comment visibility');
    }
  };

  if (loading) {
    return <div>Loading comments...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Comments Approval</h1>
      <p className="mb-8">Review and approve comments submitted by users.</p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-pink-600"></div>
        </div>
      ) : comments.length === 0 ? (
        <p>No unapproved comments available.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {comments.map((comment) => (
            <div
              key={comment.comment_ID}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-300"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{comment.commenterName}</h2>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{comment.commenterEmail}</p>
              {comment.website && (
                <p className="text-gray-600 mb-2">
                  <a href={comment.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {comment.website}
                  </a>
                </p>
              )}
              <p className="text-gray-800 my-4 p-3 bg-gray-50 rounded">{comment.commentText}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Post ID: {comment.postId}</span>
                <div>
                  <button
                    onClick={() => approveComment(comment.comment_ID)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectComment(comment.comment_ID)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2 text-pink-600">Manage Comments Visibility</h3>
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.comment_ID} className="border rounded p-2">
              <div className="font-semibold text-pink-700">{comment.commenterName}</div>
              <div className="text-gray-700 mb-1">{comment.commentText}</div>
              <div className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</div>
              <button
                onClick={() => toggleCommentVisibility(comment.comment_ID, !comment.visible)}
                className={`px-4 py-2 rounded ${comment.visible ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
              >
                {comment.visible ? 'Hide from Frontend' : 'Show on Frontend'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
