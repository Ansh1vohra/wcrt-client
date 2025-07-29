'use client'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import TextEditor from '@/components/TextEditor';
import SafeHTML from '@/components/SafeHTML'
import '@/components/article-content.css'


interface Post {
    postId: string;
    title: string;
    content: string;
    imageUrl: string;
    authorImage: string;
    authorName: string;
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
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [showModal, setShowModal] = useState(false);

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

            const MAX_FILE_SIZE = 500 * 1024; // 500KB
            if (file.size > MAX_FILE_SIZE) {
                throw new Error('File size exceeds 500KB limit');
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
            if (authorImageFile && authorImageFile.size > 500 * 1024) {
                setError('Author image size must be less than 500KB');
                setIsSubmitting(false);
                return;
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
                            <TextEditor
                                content={content}
                                onChange={(html) => setContent(html)}
                            />
                            {/* <textarea
                                value={content}
                                spellCheck="false"
                                onChange={(e) => setContent(e.target.value)}
                                rows={6}
                                className="w-full px-4 py-2 border rounded-lg"
                            /> */}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Post Image</label>
                            <span className="text-xs text-gray-500 ml-1">(Recommended Ratio: 16:9) </span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    if (file && file.size > 500 * 1024) {
                                        setError('Post image size must be less than 500KB');
                                        setImageFile(null);
                                        setImagePreviewUrl(null);
                                        return;
                                    }
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
                                    if (file && file.size > 500 * 1024) {
                                        setError('Author image size must be less than 500KB');
                                        setAuthorImageFile(null);
                                        setAuthorImagePreviewUrl(null);
                                        return;
                                    }
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
                <div>
                    {/* Posts needing edits */}
                    <h2 className="text-xl font-semibold mt-6 mb-2">Posts Needing Edits</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        {posts
                            .filter(post => post.writerName === writerName && post.post_status === 'edit')
                            .map(post => (
                                <div key={post.postId} className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 shadow-md">
                                    <h3 className="text-lg font-semibold text-yellow-800">{post.title}</h3>
                                    <p className="text-sm text-yellow-700">Status: {post.post_status}</p>
                                    <button
                                        onClick={() => {
                                            setSelectedPost(post);
                                            setShowModal(true);
                                        }}
                                        className="mt-2 text-blue-600 underline hover:text-blue-800"
                                    >
                                        Preview
                                    </button>
                                    <button
                                        onClick={() => router.push(`/writer/edit/${post.postId}`)}
                                        className="mt-2 ml-4 py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                </div>
                            ))}
                    </div>

                    <h2 className="text-xl font-semibold mt-6 mb-2">All Posts</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {posts.filter(post => post.writerName === writerName).map((post) => (
                            <div
                                key={post.postId}
                                className="bg-gray-50 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition"
                                onClick={() => {
                                    setSelectedPost(post);
                                    setShowModal(true);
                                }}
                            >
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold truncate">{post.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{post.category}</p>
                                    <p className="text-sm text-gray-400">Status: {post.post_status}</p>
                                    <div className="mt-2 line-clamp-3 text-sm text-gray-700">
                                        <SafeHTML html={post.content} className="article-content" />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {showModal && selectedPost && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                                <div className="bg-white rounded-lg max-w-2xl w-full overflow-y-auto max-h-[90vh] p-6 relative">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                                    >
                                        ✕
                                    </button>

                                    <img
                                        src={selectedPost.imageUrl}
                                        alt={selectedPost.title}
                                        className="w-full h-64 object-cover rounded mb-4"
                                    />
                                    <h2 className="text-2xl font-bold mb-2">{selectedPost.title}</h2>
                                    <p className="text-sm text-gray-600 mb-1">By: {selectedPost.writerName}</p>
                                    <p className="text-sm text-gray-500 mb-4">Category: {selectedPost.category} | Views: {selectedPost.viewCount}</p>

                                    {selectedPost.authorImage && (
                                        <div className="flex items-center mb-4">
                                            <img src={selectedPost.authorImage} alt="Author" className="w-10 h-10 rounded-full mr-2" />
                                            <span className="text-sm text-gray-700">{selectedPost.authorName}</span>
                                        </div>
                                    )}

                                    <div className="text-gray-800">
                                        <SafeHTML html={selectedPost.content} className="article-content" />
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                </div>
            )}
        </div>

    );
}
