'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaWhatsapp,
    FaEnvelope,
    FaLink,
} from 'react-icons/fa';
import Comments from './comment';
import TrendingAndPopular from '@/components/TrendingAndPopular';
import WebUpdates from '@/components/WebUpdates';
import StickySidebar from '@/components/StickySidebar';
import SafeHTML from '@/components/SafeHTML';
import '@/components/article-content.css';

interface Article {
    postId: string;
    title: string;
    imageUrl: string;
    authorName: string;
    authorImage?: string;
    uploadDate: string;
    content: string;
}

export default function ArticleDetailsPage() {
    const { postId } = useParams();
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        async function fetchArticleDetails() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/posts/${postId}`);
                if (!res.ok) throw new Error('Failed to fetch article');
                const data = await res.json();
                setArticle(data.post);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        }

        if (postId) fetchArticleDetails();
    }, [postId]);

    const currentURL = typeof window !== 'undefined' ? window.location.href : '';

    const handleCopyLink = () => {
        navigator.clipboard.writeText(currentURL);
        alert('Link copied to clipboard!');
    };

    if (!article) return <p className="p-6 text-center">Loading...</p>;

    return (
        <div className='flex flex-col lg:flex-row py-6'>
            <main className="w-full lg:w-3/4 p-4">
                <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

                <div className="flex items-center gap-3 text-gray-600 mb-6">
                    <img
                        src={article.authorImage || '/author.png'}
                        alt={article.authorName}
                        width={40}
                        height={40}
                        className="rounded-full"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/author.png';
                        }}
                    />

                    <p className="text-sm">
                        <strong className="text-red-600">{article.authorName}</strong> {' '}
                    </p>
                    {new Date(article.uploadDate).toLocaleDateString()}
                </div>


                {/* Social Sharing */}
                <div className="flex flex-wrap gap-3 mb-4 items-center">
                    <a
                        href={`https://wa.me/?text=${encodeURIComponent(currentURL)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 hover:text-green-600 text-3xl"
                    >
                        <FaWhatsapp />
                    </a>

                    <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentURL)}&text=${encodeURIComponent(article.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 text-3xl"
                    >
                        <FaTwitter />
                    </a>

                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-800 text-3xl"
                    >
                        <FaFacebookF />
                    </a>

                    <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:text-pink-600 text-3xl"
                    >
                        <FaInstagram />
                    </a>

                    <a
                        href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(currentURL)}`}
                        className="text-red-500 hover:text-red-600 text-3xl"
                    >
                        <FaEnvelope />
                    </a>

                    <button
                        onClick={handleCopyLink}
                        className="text-gray-600 hover:text-black text-3xl"
                        title="Copy Link"
                    >
                        <FaLink />
                    </button>
                </div>

                {article.imageUrl && (
                    <div className="relative w-full h-96 mb-6">
                        <Image
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            className="object-cover rounded"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-lg max-w-none text-gray-800 mb-10">
                    
                    {/* <div className="mb-6 whitespace-pre-wrap text-sm sm:text-base">{article.content}</div> */}
                    <div className="mb-6 whitespace-pre-wrap text-sm sm:text-base">
                        <SafeHTML html={article.content} className="article-content" />
                    </div>

                </div>

                {/* Social Sharing */}
                <div className="flex flex-wrap gap-3 mb-4 items-center">
                    <a
                        href={`https://wa.me/?text=${encodeURIComponent(currentURL)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 hover:text-green-600 text-3xl"
                    >
                        <FaWhatsapp />
                    </a>

                    <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentURL)}&text=${encodeURIComponent(article.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 text-3xl"
                    >
                        <FaTwitter />
                    </a>

                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-800 text-3xl"
                    >
                        <FaFacebookF />
                    </a>

                    <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:text-pink-600 text-3xl"
                    >
                        <FaInstagram />
                    </a>

                    <a
                        href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(currentURL)}`}
                        className="text-red-500 hover:text-red-600 text-3xl"
                    >
                        <FaEnvelope />
                    </a>

                    <button
                        onClick={handleCopyLink}
                        className="text-gray-600 hover:text-black text-3xl"
                        title="Copy Link"
                    >
                        <FaLink />
                    </button>
                </div>
                <Comments />
                <Image 
                src="/donateposter.png"
                alt="donate"
                width={200}
                height={200}
                className='w-full'
                />
            </main>
            {/* Sticky sidebar must not be inside a flex/overflow/height-constrained parent! */}
            <div className="w-full lg:w-1/4">
              <div className="sticky top-20 w-full max-w-sm">
                <div className="space-y-6 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <WebUpdates />
                  <TrendingAndPopular />
                </div>
              </div>
            </div>
        </div>
    );
}
