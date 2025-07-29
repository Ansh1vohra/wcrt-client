"use client"
import { useState, useEffect } from 'react';
import PublicationSlider from '@/components/PublicationSlider';

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND}/api/posts/status/approved`;
const defaultImage = '/next.svg';

interface Article {
  postId: string;
  title: string;
  imageUrl?: string;
  category?: string;
  uploadDate: string;
  authorName?: string;
  content: string;
  viewCount?: number;
}

// Helper function to validate images
const validateImage = (url: string): Promise<string> => {
  return new Promise((resolve) => {
    if (!url) {
      resolve(defaultImage);
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => resolve(defaultImage);
    img.src = url;
  });
};

export default function Publication() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validatedImages, setValidatedImages] = useState<Record<string, string>>({});

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data.posts || []);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch articles');
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Validate all images
  useEffect(() => {
    const validateAllImages = async () => {
      const imagePromises = articles.map(async (article) => {
        const validImage = await validateImage(article.imageUrl || '');
        return [article.imageUrl, validImage];
      });

      const validatedPairs = await Promise.all(imagePromises);
      const validatedMap = Object.fromEntries(validatedPairs);
      setValidatedImages(validatedMap);
    };

    if (articles.length > 0) {
      validateAllImages();
    }
  }, [articles]);

  // Sort articles by upload date (most recent first)
  const sortedArticles = [...articles].sort((a, b) => {
    return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
  });

  // Filter articles by category
  const webArticles = sortedArticles.filter(article => article.category?.toLowerCase() === 'web-articles');
  const issueBriefs = sortedArticles.filter(article => article.category?.toLowerCase() === 'issue briefs');
  const newsletters = sortedArticles.filter(article => article.category?.toLowerCase() === 'newsletter');
  const wcrtJournal = sortedArticles.filter(article => article.category?.toLowerCase() === 'wcrt-journal');
  const voiceForHerChild = sortedArticles.filter(article => article.category?.toLowerCase() === 'voice for her & child');
  const internationalJournal = sortedArticles.filter(article => article.category?.toLowerCase() === 'international journal of transnation of gender equality');
  const scholarWarrior = sortedArticles.filter(article => article.category?.toLowerCase() === 'scholar-warrior');
  const books = sortedArticles.filter(article => article.category?.toLowerCase() === 'books');
  const essayCompetitions = sortedArticles.filter(article => article.category?.toLowerCase() === 'essay');
  const internsCapsule = sortedArticles.filter(article => article.category?.toLowerCase() === 'intern-articles');
  const policies = sortedArticles.filter(article => article.category?.toLowerCase() === 'policies');

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        <p>Error loading articles: {error}</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Publications</h1>
        <p className="text-lg text-center text-gray-600">
          Explore our comprehensive collection of research publications, articles, and resources
        </p>
      </div>

      <div className="space-y-12">
        {/* Web Articles */}
        <PublicationSlider
          title="Web Articles"
          articles={webArticles}
          defaultImage={defaultImage}
          validatedImages={validatedImages}
        />

        {/* Issue Briefs */}
        <PublicationSlider
          title="Issue Briefs"
          articles={issueBriefs}
          defaultImage={defaultImage}
          validatedImages={validatedImages}
        />

        {/* NewsLetters */}
        <PublicationSlider
          title="NewsLetters"
          articles={newsletters}
          defaultImage={defaultImage}
          validatedImages={validatedImages}
        />

        {/* WCRT Journal */}
        <PublicationSlider
          title="WCRT Journal"
          articles={wcrtJournal}
          defaultImage={defaultImage}
          validatedImages={validatedImages}
        />

        {/* Voice for Her & Child */}
        <PublicationSlider
          title="Voice for Her & Child"
          articles={voiceForHerChild}
          defaultImage={defaultImage}
          validatedImages={validatedImages}
        />

        {/* International Journal */}
        <PublicationSlider
          title="International Journal of Transnation of Gender Equality"
          articles={internationalJournal}
          defaultImage={defaultImage}
          validatedImages={validatedImages}
        />

        {/* Scholar Warrior */}
        <PublicationSlider
          title="Scholar Warrior"
          articles={scholarWarrior}
          defaultImage={defaultImage}
          validatedImages={validatedImages}
        />

        {/* Books */}
        <PublicationSlider
          title="Books"
          articles={books}
          defaultImage={defaultImage}
          validatedImages={validatedImages}
        />

        {/* Rajkumari Kaul Essay Competitions */}
        <PublicationSlider
          title="Rajkumari Kaul Essay Competitions"
          articles={essayCompetitions}
          defaultImage={defaultImage}
          validatedImages={validatedImages}
        />

        {/* Interns Write up Capsule */}
        <PublicationSlider
          title="Interns Write up Capsule"
          articles={internsCapsule}
          defaultImage={defaultImage}
          validatedImages={validatedImages}
        />

        {/* Policies */}
        <PublicationSlider
          title="Policies"
          articles={policies}
          defaultImage={defaultImage}
          validatedImages={validatedImages}
        />
      </div>
    </main>
  );
}