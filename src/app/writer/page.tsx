'use client'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Post {
    postId: string;
    title: string;
    content: string;
    imageUrl: string;
    authorImage: string;
    category: string;
    writerName: string;
    uploadDate: string;
    viewCount: number;
    post_status: string;
}

export default function WriterPage() {
    const [activeTab, setActiveTab] = useState<'createPost' | 'myPosts'>('createPost');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [authorImageFile, setAuthorImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [authorImagePreviewUrl, setAuthorImagePreviewUrl] = useState<string | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [writerName, setWriterName] = useState('');
    const [writerCategories, setWriterCategories] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('writer-token');
        const name = localStorage.getItem('writer-name');
        const categories = localStorage.getItem('writer-categories');

        if (!token) {
            router.push('/writer/writerlogin');
            return; // Stop further execution
        }

        if (name) setWriterName(name);
        if (categories) {
            try {
                setWriterCategories(JSON.parse(categories));
            } catch (e) {
                console.error('Failed to parse categories:', e);
            }
        }

        setLoading(false);
    }, []);


    const handleFileUpload = async (file: File): Promise<string> => {
        try {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                throw new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.');
            }

            const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
            if (file.size > MAX_FILE_SIZE) {
                throw new Error('File size exceeds 5MB limit');
            }

            const presignedUrlResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND}/api/posts/s3/upload-url`,
                {
                    params: {
                        fileName: file.name,
                        fileType: file.type,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('writer-token')}`,
                    },
                }
            );

            if (!presignedUrlResponse.data.uploadURL) {
                throw new Error('Failed to get upload URL from backend');
            }

            const uploadResponse = await fetch(presignedUrlResponse.data.uploadURL, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                },
            });

            if (!uploadResponse.ok) {
                const errorText = await uploadResponse.text();
                throw new Error(`S3 upload failed: ${uploadResponse.status} - ${errorText}`);
            }

            return presignedUrlResponse.data.publicUrl;
        } catch (err) {
            console.error('File upload error:', err);
            if (err instanceof Error) {
                throw new Error(`Upload failed: ${err.message}`);
            }
            throw new Error('File upload failed');
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            if (!title || !content || !category) {
                throw new Error('Please fill all required fields');
            }
            if (!imageFile) {
                throw new Error('Please upload a post image');
            }

            let authorImageUrl = '';
            if (authorImageFile) {
                authorImageUrl = await handleFileUpload(authorImageFile);
            }

            const imageUrl = await handleFileUpload(imageFile);

            await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND}/api/posts`,
                {
                    title,
                    content,
                    imageUrl,
                    authorName,
                    authorImage: authorImageUrl,
                    category,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('writer-token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            alert('Post created successfully!');
            setTitle('');
            setContent('');
            setCategory('');
            setImageFile(null);
            setAuthorImageFile(null);
            setImagePreviewUrl(null);
            setAuthorImagePreviewUrl(null);

            const postsResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/posts`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('writer-token')}`,
                },
            });
            setPosts(postsResponse.data.posts || []);
        } catch (err) {
            console.error('Submission error:', err);
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND}/api/posts`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('writer-token')}`,
                        },
                    }
                );
                setPosts(response.data.posts || []);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Failed to load posts');
            }
        };
        fetchPosts();
    }, []);

    if (loading) {
        return <div><div className="w-full gap-x-2 flex justify-center items-center">
            <div
                className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full animate-bounce"
            ></div>
            <div
                className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"
            ></div>
            <div
                className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"
            ></div>
        </div></div>;
    }

    return (
        <div className="container mx-auto p-4">
            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Welcome, {writerName} 👋</h1>
                <button
                    onClick={() => {
                        localStorage.removeItem('writer-token');
                        localStorage.removeItem('writer-name');
                        localStorage.removeItem('writer-categories');
                        router.push('/writer/writerlogin');
                    }}
                    className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>
            </div>

            {/* Tabs */}
            <div className="flex mb-4 space-x-4">
                <button
                    onClick={() => setActiveTab('createPost')}
                    className={`py-2 px-4 rounded-lg ${activeTab === 'createPost' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Create Post
                </button>
                <button
                    onClick={() => setActiveTab('myPosts')}
                    className={`py-2 px-4 rounded-lg ${activeTab === 'myPosts' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    My Posts
                </button>
            </div>

            {/* Create Post Form */}
            {activeTab === 'createPost' && (
                <div className="bg-white shadow-lg p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a category</option>
                                {writerCategories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                spellCheck="false"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Content</label>
                            <textarea
                                value={content}
                                spellCheck="false"
                                onChange={(e) => setContent(e.target.value)}
                                rows={6}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Post Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setImageFile(file);
                                    setImagePreviewUrl(file ? URL.createObjectURL(file) : null);
                                }}
                                className="cursor-pointer bg-blue-100 p-3 my-4 rounded-lg hover:bg-blue-200"
                            />
                            {imagePreviewUrl && (
                                <img src={imagePreviewUrl} alt="Post Preview" className="mt-2 w-48 h-32 object-cover rounded border" />
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Author Name</label>
                            <input
                                type="text"
                                spellCheck="false"
                                value={authorName}
                                onChange={(e) => setAuthorName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Author Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setAuthorImageFile(file);
                                    setAuthorImagePreviewUrl(file ? URL.createObjectURL(file) : null);
                                }}
                                className="cursor-pointer bg-blue-100 p-3 my-4 rounded-lg hover:bg-blue-200"
                            />
                            {authorImagePreviewUrl && (
                                <img src={authorImagePreviewUrl} alt="Author Preview" className="mt-2 w-24 h-24 object-cover rounded-full border" />
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`py-2 px-6 bg-blue-500 text-white rounded-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Post'}
                        </button>
                    </form>
                </div>
            )}

            {/* My Posts */}
            {activeTab === 'myPosts' && (
                <div className="bg-white shadow-lg p-6 rounded-lg mt-6">
                    <h2 className="text-2xl font-semibold mb-4">My Posts</h2>
                    <ul>
                        {posts.filter(post => post.writerName === writerName).length > 0 ? (
                            posts
                                .filter(post => post.writerName === writerName)
                                .map((post) => (
                                    <li key={post.postId} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm">
                                        <h3 className="text-xl font-semibold">{post.title}</h3>
                                        <p className="text-gray-700 mt-2">{post.content}</p>
                                        <p className="text-sm text-gray-500 mt-1">Category: {post.category}</p>
                                        <p className="text-sm text-gray-500">Views: {post.viewCount}</p>
                                    </li>
                                ))
                        ) : (
                            <p className="text-center text-gray-500">No posts found.</p>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
