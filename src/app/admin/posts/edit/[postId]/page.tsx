'use client'

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import TextEditor from '@/components/TextEditor';

export default function AdminEditPostPage() {
  const { postId } = useParams();
  const router = useRouter();

  const [post, setPost] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [uploadDate, setUploadDate] = useState('');
  const [postStatus, setPostStatus] = useState('');

  const [authorImageFile, setAuthorImageFile] = useState<File | null>(null);
  const [authorImagePreview, setAuthorImagePreview] = useState<string>('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('admin-token'); // Changed to admin-token

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data.post;
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
        setAuthorName(data.authorName);
        setPostStatus(data.post_status || 'published'); // Default to published if not set
        setUploadDate(new Date().toISOString().split('T')[0]); // today
        setAuthorImagePreview(data.authorImage);
        setImagePreview(data.imageUrl);
      } catch (error) {
        console.error('Failed to fetch post:', error);
        router.push('/admin');
      }
    };
    fetchPost();
  }, [postId]);

  const handleFileUpload = async (file: File): Promise<string> => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) throw new Error('Invalid file type');
    if (file.size > 500 * 1024) throw new Error('File too large (max 500KB)');

    const token = localStorage.getItem('admin-token'); // Changed to admin-token
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/posts/admin/s3/upload-url`, {
      params: { fileName: file.name, fileType: file.type },
      headers: { Authorization: `Bearer ${token}` },
    });

    await fetch(data.uploadURL, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type },
    });
    return data.publicUrl;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (imageFile && imageFile.size > 500 * 1024) {
        setError('Post image size must be less than 500KB');
        setIsSubmitting(false);
        return;
      }
      if (authorImageFile && authorImageFile.size > 500 * 1024) {
        setError('Author image size must be less than 500KB');
        setIsSubmitting(false);
        return;
      }
      const token = localStorage.getItem('admin-token'); // Changed to admin-token
      if (!token) throw new Error('No token found');
  
      let authorImage = post?.authorImage || '';
      let imageUrl = post?.imageUrl || '';
  
      // Upload new images if present
      if (authorImageFile) authorImage = await handleFileUpload(authorImageFile);
      if (imageFile) imageUrl = await handleFileUpload(imageFile);
  
      const payload = {
        title: title.trim(),
        content: content.trim(),
        category:category.trim(),
        authorName: authorName.trim(),
        authorImage: authorImage || post?.authorImage,
        imageUrl: imageUrl || post?.imageUrl,
        uploadDate: new Date().toISOString().split('T')[0] // today
      };
  
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/posts/adminedit/${postId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      alert('Post updated successfully!');
      router.push('/admin');
    } catch (error: any) {
      console.error('Update failed:', error.response?.data || error.message);
      alert(`Update failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!post) return <p>Loading post...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post (Admin)</h1>

      {/* Display category (read-only) */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Category</label>
        <input
          type="text"
          value={category}
          readOnly
          className="w-full border rounded px-4 py-2 bg-gray-100"
        />
      </div>

      {/* Display post status (read-only) */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Post Status</label>
        <input
          type="text"
          value={postStatus}
          readOnly
          className="w-full border rounded px-4 py-2 bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-4 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Post Image</label>
        <input
          type="file"
          accept="image/*"
          className='p-3 bg-blue-200 rounded-lg my-2'
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            if (file && file.size > 500 * 1024) {
              setError('Post image size must be less than 500KB');
              setImageFile(null);
              setImagePreview('');
              return;
            }
            setImageFile(file);
            setImagePreview(file ? URL.createObjectURL(file) : '');
            setError(null);
          }}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Post"
            className="mt-2 w-48 h-32 object-cover rounded border"
          />
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Content</label>
        <TextEditor content={content} onChange={(html) => setContent(html)} />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Author Name</label>
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="w-full border rounded px-4 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Author Image</label>
        <input
          type="file"
          accept="image/*"
          className='p-3 bg-blue-200 rounded-lg my-2'
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            if (file && file.size > 500 * 1024) {
              setError('Author image size must be less than 500KB');
              setAuthorImageFile(null);
              setAuthorImagePreview('');
              return;
            }
            setAuthorImageFile(file);
            setAuthorImagePreview(file ? URL.createObjectURL(file) : '');
            setError(null);
          }}
        />
        {authorImagePreview && (
          <img
            src={authorImagePreview}
            alt="Author"
            className="mt-2 w-24 h-24 rounded-full object-cover border"
          />
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}