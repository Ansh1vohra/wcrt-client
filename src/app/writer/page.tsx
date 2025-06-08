'use client'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
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
    const [posts, setPosts] = useState<Post[]>([]);
    const [writerName, setWriterName] = useState('');
    const [writerCategories, setWriterCategories] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('writer-token');
        const name = localStorage.getItem('writer-name');
        const categories = localStorage.getItem('writer-categories');

        if (!token) {
            router.push('/writer/writerlogin');
        } else {
            if (name) setWriterName(name);
            if (categories) {
                try {
                    setWriterCategories(JSON.parse(categories));
                } catch (e) {
                    console.error('Failed to parse categories:', e);
                }
            }
        }
    }, [router]);

    const handleFileUpload = async (file: File): Promise<string> => {
        try {
            // Validate file type and size
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                throw new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.');
            }

            const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
            if (file.size > MAX_FILE_SIZE) {
                throw new Error('File size exceeds 5MB limit');
            }

            // Get presigned URL from backend
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

            // Upload to S3 using fetch
            const uploadResponse = await fetch(presignedUrlResponse.data.uploadURL, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                    // No other headers should be included
                },
            });

            if (!uploadResponse.ok) {
                const errorText = await uploadResponse.text();
                throw new Error(`S3 upload failed: ${uploadResponse.status} - ${errorText}`);
            }

            // Return the public URL
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

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND}/api/posts`,
                {
                    title,
                    content,
                    imageUrl, // <-- Now imageUrl is defined
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

            const postsResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/posts`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('writer-token')}`,
                },
            });
            setPosts(postsResponse.data.posts || []);
        } catch (err) {
            console.error('Submission error:', err);
            setError(
                err instanceof Error
                    ? err.message
                    : 'An unexpected error occurred'
            );
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
                    className={`py-2 px-4 rounded-lg focus:outline-none ${activeTab === 'createPost' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}
                >
                    Create Post
                </button>
                <button
                    onClick={() => setActiveTab('myPosts')}
                    className={`py-2 px-4 rounded-lg focus:outline-none ${activeTab === 'myPosts' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}
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
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                spellCheck='false'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Content</label>
                            <textarea
                                value={content}
                                spellCheck='false'
                                onChange={(e) => setContent(e.target.value)}
                                rows={6}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Post Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                className="w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Author Name</label>
                            <input
                                type="text"
                                spellCheck='false'
                                value={authorName}
                                onChange={(e) => setAuthorName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Author Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setAuthorImageFile(e.target.files?.[0] || null)}
                                className="w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a category</option>
                                {writerCategories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
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
                        {posts.length > 0 ? (
                            posts.map((post) => (
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
