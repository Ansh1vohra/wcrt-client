'use client'
import { useState, FormEvent, useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'

interface CommentData {
  comment_ID: string;
  commenterName: string;
  commentText: string;
  website?: string;
  commentStatus: string;
  createdAt: string;
}

export default function Comments() {
  const { postId } = useParams();
  const [commentText, setCommentText] = useState('')
  const [commenterName, setCommenterName] = useState('')
  const [commenterEmail, setCommenterEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [saveInfo, setSaveInfo] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)
  const [comments, setComments] = useState<CommentData[]>([])
  const [loading, setLoading] = useState(true)

  // Get the API base URL from environment
  const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND}/api`;
  
  useEffect(() => {
    // Load approved comments
    const fetchComments = async () => {
      try {
        console.log(`Fetching comments from: ${API_BASE_URL}/comments/post/${postId}`);
        const response = await axios.get(`${API_BASE_URL}/comments/post/${postId}`);
        if (response.data && response.data.comments) {
          setComments(response.data.comments);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, API_BASE_URL]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!commentText || !commenterName || !commenterEmail) {
      setSubmitMessage({
        type: 'error',
        text: 'Please fill in all required fields'
      });
      return;
    }

    setSubmitting(true);
    setSubmitMessage(null);

    try {
      const payload = {
        postId,
        commenterName,
        commenterEmail,
        commentText,
        website
      };
      
      console.log(`Submitting comment to: ${API_BASE_URL}/comments`);
      console.log('Payload:', payload);
      
      const response = await axios.post(`${API_BASE_URL}/comments`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      if (response.status === 201) {
        setSubmitMessage({
          type: 'success',
          text: 'Comment submitted successfully! It will be visible after approval.'
        });
        
        // Clear form
        setCommentText('');
        
        // Save info if checkbox is checked
        if (!saveInfo) {
          setCommenterName('');
          setCommenterEmail('');
          setWebsite('');
        }
      }
    } catch (error: any) {
      console.error('Error submitting comment:', error);
      
      // Get detailed error information if available
      let errorMessage = 'Failed to submit comment. Please try again later.';
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        
        if (error.response.data && error.response.data.error) {
          errorMessage = `Error: ${error.response.data.error}`;
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        errorMessage = `Error: ${error.message}`;
      }
      
      setSubmitMessage({
        type: 'error',
        text: errorMessage
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-12 border-t pt-8">
      {/* Existing comments section */}
      {comments.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{comments.length} Comment{comments.length !== 1 && 's'}</h2>
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.comment_ID} className="border-b pb-6">
                <div className="flex items-center mb-2">
                  <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 font-bold mr-3">
                    {comment.commenterName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold">{comment.commenterName}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 ml-13">{comment.commentText}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-8">Leave a Reply</h2>
      <p className="text-gray-600 mb-4">
        Your email address will not be published. Required fields are marked <span className="text-red-600">*</span>
      </p>
      
      {submitMessage && (
        <div className={`p-4 mb-6 rounded ${submitMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {submitMessage.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="comment" className="block text-gray-700 mb-2">
            Comment <span className="text-red-600">*</span>
          </label>
          <textarea
            id="comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
            spellCheck="false"
            className="w-full border rounded-lg p-3 min-h-[150px]"
            disabled={submitting}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={commenterName}
              onChange={(e) => setCommenterName(e.target.value)}
              required
              spellCheck="false"
              className="w-full border rounded-lg p-3"
              disabled={submitting}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={commenterEmail}
              onChange={(e) => setCommenterEmail(e.target.value)}
              required
              className="w-full border rounded-lg p-3"
              disabled={submitting}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="website" className="block text-gray-700 mb-2">
            Website
          </label>
          <input
            type="url"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full border rounded-lg p-3"
            disabled={submitting}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="save-info"
            checked={saveInfo}
            onChange={(e) => setSaveInfo(e.target.checked)}
            className="rounded border-gray-300"
            disabled={submitting}
          />
          <label htmlFor="save-info" className="text-gray-700">
            Save my name, email, and website in this browser for the next time I comment.
          </label>
        </div>
        
        <button
          type="submit"
          className={`bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Post Comment'}
        </button>
      </form>
    </section>
  )
}