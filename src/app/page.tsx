"use client";
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WebUpdates from '@/components/WebUpdates';
import TrendingAndPopular from '@/components/TrendingAndPopular';

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND}/api/posts`;

interface Article {
  title: string;
  content: string;
  authorName?: string;
  uploadDate: string;
  imageUrl?: string;
  authorImage?: string;
  category: string;
  postId: string;
  viewCount: number;
  post_status?: string;
  writerName?: string;
}

const defaultImage = "/article.jpg";

// Image validation and URL conversion function
const validateImage = async (imagePath: string): Promise<string> => {
  if (!imagePath) return defaultImage;
  
  try {
    // Convert s3:// URLs to https://
    if (imagePath.startsWith('s3://')) {
      const bucketPath = imagePath.replace('s3://wcrt-content-images/', '');
      imagePath = `https://wcrt-content-images.s3.eu-north-1.amazonaws.com/${bucketPath}`;
    }

    // If it's already an HTTPS URL, use it directly
    if (imagePath.startsWith('https://')) {
      return imagePath;
    }

    return defaultImage;
  } catch (error) {
    console.warn(`Failed to load image: ${imagePath}`, error);
    return defaultImage;
  }
};

export default function Home() {  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newsIndex, setNewsIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [recentPage, setRecentPage] = useState(1);
  const [validatedImages, setValidatedImages] = useState<Record<string, string>>({});
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sliderRef = useRef<any>(null);
  const articlesPerPage = 4;
  const recentPerPage = 3; // Show exactly 3 per page

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

  const allArticles = articles;

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour12: true,
        timeZone: 'UTC'  // Ensure consistent timezone handling
    }).split(',')[0];  // Only take the date part
};

  // Ensure dates are formatted consistently for sorting
  const sortedArticles = [...allArticles].sort((a, b) => {
    return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
  });

  // Get featured articles for the main slider (first 5)
  const featuredArticles = sortedArticles.slice(0, 5);
  
  // Get latest 4 updates for web updates section
  const webUpdates = sortedArticles.slice(0, 4);
  
  // Get latest articles for the trending tabs
  const latestArticles = sortedArticles.slice(0, 4);
  
  // Get trending articles based on view count
  const trendingArticles = [...sortedArticles]
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, 4);

  // Get issue briefs articles
  const issueBriefs = sortedArticles.filter(article => article.category?.toLowerCase() === 'issue briefs');

  // Get web articles
  const webArticles = sortedArticles.filter(article => article.category?.toLowerCase() === 'web-articles');

  // Get manekshaw papers
  const manekshawPapers = sortedArticles.filter(article => article.category?.toLowerCase() === 'manekshaw-papers');

  // Get newsletters
  const newsletters = sortedArticles.filter(article => article.category?.toLowerCase() === 'newsletter');

  // Get WCRT journal articles
  const wcrtJournal = sortedArticles.filter(article => article.category?.toLowerCase() === 'wcrt-journal');

  // Get scholar warrior articles
  const scholarWarrior = sortedArticles.filter(article => article.category?.toLowerCase() === 'scholar-warrior');

  // Get books
  const books = sortedArticles.filter(article => article.category?.toLowerCase() === 'books');

  // Get essays
  const essays = sortedArticles.filter(article => article.category?.toLowerCase() === 'essay');

  // Get intern articles
  const internArticles = sortedArticles.filter(article => article.category?.toLowerCase() === 'intern-articles');

  // Get external publications
  const externalPublications = sortedArticles.filter(article => article.category?.toLowerCase() === 'external-publications');

  // Get recent articles for the recent section
  const recentArticlesAll = sortedArticles.slice(0, 9); // Get first 9 articles
  const recentTotalPages = Math.ceil(recentArticlesAll.length / recentPerPage);
  const recentArticles = recentArticlesAll.slice(
    (recentPage - 1) * recentPerPage,
    (recentPage - 1) * recentPerPage + 3
  );

  // Add paging state for issue briefs
  const [issuePage, setIssuePage] = useState(1);
  const issuePerPage = 4;
  const totalIssuePages = Math.ceil(issueBriefs.length / issuePerPage);
  const paginatedIssueBriefs = issueBriefs.slice((issuePage - 1) * issuePerPage, issuePage * issuePerPage);

  // Add paging state for web articles
  const [webArticlePage, setWebArticlePage] = useState(1);
  const webArticlePerPage = 3; // Changed from 4 to 3 to match grid
  const totalWebArticlePages = Math.ceil(webArticles.length / webArticlePerPage);
  const paginatedWebArticles = webArticles.slice(
    (webArticlePage - 1) * webArticlePerPage, 
    webArticlePage * webArticlePerPage
  );

  // Add paging state for manekshaw papers
  const [manekshawPage, setManekshawPage] = useState(1);
  const manekshawPerPage = 3;
  const totalManekshawPages = Math.ceil(manekshawPapers.length / manekshawPerPage);
  const paginatedManekshawPapers = manekshawPapers.slice(
    (manekshawPage - 1) * manekshawPerPage,
    manekshawPage * manekshawPerPage
  );

  // Add paging state for newsletters
  const [newsletterPage, setNewsletterPage] = useState(1);
  const newsletterPerPage = 3;
  const totalNewsletterPages = Math.ceil(newsletters.length / newsletterPerPage);
  const paginatedNewsletters = newsletters.slice(
    (newsletterPage - 1) * newsletterPerPage,
    newsletterPage * newsletterPerPage
  );

  // Add paging state for WCRT journal
  const [wcrtJournalPage, setWcrtJournalPage] = useState(1);
  const wcrtJournalPerPage = 3;
  const totalWcrtJournalPages = Math.ceil(wcrtJournal.length / wcrtJournalPerPage);
  const paginatedWcrtJournal = wcrtJournal.slice(
    (wcrtJournalPage - 1) * wcrtJournalPerPage,
    wcrtJournalPage * wcrtJournalPerPage
  );

  // Add paging state for scholar warrior
  const [scholarWarriorPage, setScholarWarriorPage] = useState(1);
  const scholarWarriorPerPage = 3;
  const totalScholarWarriorPages = Math.ceil(scholarWarrior.length / scholarWarriorPerPage);
  const paginatedScholarWarrior = scholarWarrior.slice(
    (scholarWarriorPage - 1) * scholarWarriorPerPage,
    scholarWarriorPage * scholarWarriorPerPage
  );

  // Add paging state for books
  const [booksPage, setBooksPage] = useState(1);
  const booksPerPage = 3;
  const totalBooksPages = Math.ceil(books.length / booksPerPage);
  const paginatedBooks = books.slice(
    (booksPage - 1) * booksPerPage,
    booksPage * booksPerPage
  );

  // Add paging state for essays
  const [essaysPage, setEssaysPage] = useState(1);
  const essaysPerPage = 3;
  const totalEssaysPages = Math.ceil(essays.length / essaysPerPage);
  const paginatedEssays = essays.slice(
    (essaysPage - 1) * essaysPerPage,
    essaysPage * essaysPerPage
  );

  // Add paging state for intern articles
  const [internArticlesPage, setInternArticlesPage] = useState(1);
  const internArticlesPerPage = 3;
  const totalInternArticlesPages = Math.ceil(internArticles.length / internArticlesPerPage);
  const paginatedInternArticles = internArticles.slice(
    (internArticlesPage - 1) * internArticlesPerPage,
    internArticlesPage * internArticlesPerPage
  );

  // Add paging state for external publications
  const [externalPublicationsPage, setExternalPublicationsPage] = useState(1);
  const externalPublicationsPerPage = 3;
  const totalExternalPublicationsPages = Math.ceil(externalPublications.length / externalPublicationsPerPage);
  const paginatedExternalPublications = externalPublications.slice(
    (externalPublicationsPage - 1) * externalPublicationsPerPage,
    externalPublicationsPage * externalPublicationsPerPage
  );

  // Get articles for current page in all articles section
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = sortedArticles.slice(startIndex, startIndex + articlesPerPage);
  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current: number, next: number) => setCurrentImageIndex(next),
    initialSlide: currentImageIndex,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    useCSS: true,
    useTransform: true,
    fade: false,
  };

  // Handle slider navigation
  const handleSlideChange = (direction: 'prev' | 'next') => {
    if (sliderRef.current) {
      if (direction === 'prev') {
        sliderRef.current.slickPrev();
      } else {
        sliderRef.current.slickNext();
      }
    }
  };

  // Separate newsflash auto-rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % sortedArticles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sortedArticles.length]);

  // Separate image slider auto-rotation
  useEffect(() => {
    const timer = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Validate all images
    const validateAllImages = async () => {      const imagePromises = allArticles.map(async (article) => {
        const validImage = await validateImage(article.imageUrl || '');
        return [article.imageUrl, validImage];
      });

      const validatedPairs = await Promise.all(imagePromises);
      const validatedMap = Object.fromEntries(validatedPairs);
      setValidatedImages(validatedMap);
    };

    validateAllImages();
  }, [allArticles]);

  // Pagination logic for Latest Post
  const postsPerPage = 2;
  const latestPostStart = (currentPage - 1) * postsPerPage;
  const latestPostEnd = latestPostStart + postsPerPage;
  const paginatedLatestPosts = sortedArticles.slice(latestPostStart, latestPostEnd);

  return (
    <main className="container mx-auto px-4 max-w-full overflow-x-hidden">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-screen text-red-600">
          <p>Error loading articles: {error}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
            {/* Left Column: Newsflash and Content */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              {/* Newsflash Banner with animation */}
              <div className="bg-pink-600 text-white p-2 flex items-center transform transition-transform duration-300 hover:scale-[1.01] rounded-lg">
                <span className="bg-yellow-400 text-pink-600 px-2 py-1 text-xs lg:text-sm font-bold mr-2 lg:mr-4 whitespace-nowrap">NEWSFLASH</span>
                <div className="flex-1 overflow-hidden">
                  <div className="animate-marquee whitespace-nowrap text-sm lg:text-base">
                    {sortedArticles[newsIndex]?.title}
                  </div>
                </div>
                <div className="flex gap-1 lg:gap-2">
                  <button 
                    className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-white/50" 
                    onClick={() => setNewsIndex((prev) => (prev - 1 + sortedArticles.length) % sortedArticles.length)}
                    aria-label="Previous news"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <button 
                    className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-white/50" 
                    onClick={() => setNewsIndex((prev) => (prev + 1) % sortedArticles.length)}
                    aria-label="Next news"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Main Article Section */}
              <div className="relative group">
                <div className="overflow-hidden rounded-lg relative">
                  <Slider ref={sliderRef} {...sliderSettings}>
                    {featuredArticles.map((article, index) => (
                      <Link 
                        key={article.postId} 
                        href={`/publication/web-articles/${article.postId}`}
                      >
                        <div className="relative aspect-[16/9] group overflow-hidden">                          <Image
                            src={validatedImages[article.imageUrl || ''] || defaultImage}
                            alt={article.title}
                            fill
                            priority={index === currentImageIndex}
                            className="object-cover transform transition-all duration-700 ease-in-out group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = defaultImage;
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
                          <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-300 ease-out group-hover:translate-y-[-5px]">
                            <div className="inline-block bg-pink-600 text-white text-xs px-2 py-1 mb-2">
                              {article.category?.toUpperCase() || 'POST'}
                            </div>
                            <h2 className="text-white text-2xl font-bold">
                              {article.title}
                            </h2>
                            <p className="text-gray-200 text-sm mt-2">
                              By {article.authorName} | {formatDate(article.uploadDate)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </Slider>
                </div>

                {/* Thumbnails */}
                <div className="flex justify-center mt-8 gap-4">
                  {featuredArticles.map((article, index) => (
                    <button
                      key={article.postId}
                      onClick={() => {
                        if (sliderRef.current) {
                          sliderRef.current.slickGoTo(index);
                        }
                      }}
                      className={`relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden group transform transition-all duration-300
                        ${index === currentImageIndex 
                          ? 'ring-2 ring-pink-600 ring-offset-2 scale-105' 
                          : 'hover:ring-2 hover:ring-pink-300 hover:ring-offset-1 hover:scale-105'
                        }`}
                    >
                      <Image
                        src={validatedImages[article.imageUrl || ''] || defaultImage}
                        alt={article.title}
                        fill
                        className="object-cover transition-all duration-300 ease-in-out"
                      />
                      <div 
                        className={`absolute inset-0 transition-colors duration-300 
                          ${index === currentImageIndex 
                            ? 'bg-pink-600/20' 
                            : 'bg-black/0 group-hover:bg-pink-600/10'
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Articles Section */}
              <div className="transform transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl lg:text-2xl font-bold text-pink-600 border-b-2 border-pink-600 pb-2">Recent Articles</h2>
                  <div className="flex gap-2">
                    <button 
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      onClick={() => setRecentPage((prev) => Math.max(1, prev - 1))}
                      aria-label="Previous recent articles"
                      disabled={recentPage === 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button 
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      onClick={() => setRecentPage((prev) => Math.min(recentTotalPages, prev + 1))}
                      aria-label="Next recent articles"
                      disabled={recentPage === recentTotalPages}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {recentArticles.map((article) => (
                    <Link 
                      key={article.postId}
                      href={`/publication/web-articles/${article.postId}`}
                      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                            {article.category?.toUpperCase() || 'POST'}
                          </span>
                        </div>
                        <Image
                          src={validatedImages[article.imageUrl || ''] || defaultImage}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 group-hover:text-pink-600 transition-colors line-clamp-2 min-h-[3rem]">
                          {article.title}
                        </h3>
                        <div className="mt-3 flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                          </svg>
                          <span>{formatDate(article.uploadDate)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Issue Briefs Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl lg:text-2xl font-bold text-pink-600 border-b-2 border-pink-600 pb-2">Issue Briefs</h2>
                  <div className="flex gap-2">
                    <button 
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      onClick={() => setIssuePage((prev) => Math.max(1, prev - 1))}
                      aria-label="Previous issue briefs"
                      disabled={issuePage === 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button 
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      onClick={() => setIssuePage((prev) => Math.min(totalIssuePages, prev + 1))}
                      aria-label="Next issue briefs"
                      disabled={issuePage === totalIssuePages}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  {paginatedIssueBriefs.map((article) => (
                    <div key={article.postId} className="flex flex-row gap-4 bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="relative w-48 h-36 flex-shrink-0">
                        <Image
                          src={validatedImages[article.imageUrl || ''] || defaultImage}
                          alt={article.title}
                          fill
                          className="object-cover rounded-l-lg"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute top-2 left-2 z-10">
                          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                            ISSUE BRIEFS
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-between p-3">
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-pink-600 transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <div className="flex items-center text-xs text-gray-500 gap-2 mb-2">
                            {article.authorName && (
                              <span className="text-pink-600 font-semibold">BY {article.authorName.toUpperCase()}</span>
                            )}
                            <span>• {formatDate(article.uploadDate)}</span>
                            <span>• {article.viewCount || 0}</span>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                            {article.content}
                          </p>
                        </div>
                        <div>
                          <Link href={`/publication/web-articles/${article.postId}`}>
                            <button className="px-3 py-1 border border-gray-300 rounded text-xs font-medium hover:bg-pink-50 transition-all">READ MORE</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Web Articles Section */}
              <div className="transform transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl lg:text-2xl font-bold text-pink-600 border-b-2 border-pink-600 pb-2">Web Articles</h2>
                  <div className="flex gap-2">
                    <button 
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      onClick={() => setWebArticlePage((prev) => Math.max(1, prev - 1))}
                      aria-label="Previous web articles"
                      disabled={webArticlePage === 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button 
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      onClick={() => setWebArticlePage((prev) => Math.min(totalWebArticlePages, prev + 1))}
                      aria-label="Next web articles"
                      disabled={webArticlePage === totalWebArticlePages}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                </div>                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {paginatedWebArticles.map((article) => (
                    <Link 
                      key={article.postId}
                      href={`/publication/web-articles/${article.postId}`}
                      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                            {article.category?.toUpperCase() || 'POST'}
                          </span>
                        </div>
                        <Image
                          src={validatedImages[article.imageUrl || ''] || defaultImage}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 group-hover:text-pink-600 transition-colors line-clamp-2 min-h-[3rem]">
                          {article.title}
                        </h3>
                        <div className="mt-3 flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                          </svg>
                          <span>{formatDate(article.uploadDate)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Manekshaw Papers Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl lg:text-2xl font-bold text-pink-600 border-b-2 border-pink-600 pb-2">Manekshaw Papers</h2>
                  <div className="flex gap-2">
                    <button 
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      onClick={() => setManekshawPage((prev) => Math.max(1, prev - 1))}
                      aria-label="Previous manekshaw papers"
                      disabled={manekshawPage === 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button 
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      onClick={() => setManekshawPage((prev) => Math.min(totalManekshawPages, prev + 1))}
                      aria-label="Next manekshaw papers"
                      disabled={manekshawPage === totalManekshawPages}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginatedManekshawPapers.map((article) => (
                    <Link 
                      key={article.postId}
                      href={`/publication/web-articles/${article.postId}`}
                      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                            MANEKSHAW PAPERS
                          </span>
                        </div>
                        <Image
                          src={validatedImages[article.imageUrl || ''] || defaultImage}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 group-hover:text-pink-600 transition-colors line-clamp-2 min-h-[3rem]">
                          {article.title}
                        </h3>
                        <div className="mt-3 flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                          </svg>
                          <span>{formatDate(article.uploadDate)}</span>
                        </div>
                        {article.authorName && (
                          <p className="text-xs text-gray-500 mt-1">
                            By {article.authorName}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* WCRT Journal Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl lg:text-2xl font-bold text-pink-600 border-b-2 border-pink-600 pb-2">WCRT Journal</h2>
                  <div className="flex gap-2">
                    <button 
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      onClick={() => setWcrtJournalPage((prev) => Math.max(1, prev - 1))}
                      aria-label="Previous WCRT journal"
                      disabled={wcrtJournalPage === 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button 
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      onClick={() => setWcrtJournalPage((prev) => Math.min(totalWcrtJournalPages, prev + 1))}
                      aria-label="Next WCRT journal"
                      disabled={wcrtJournalPage === totalWcrtJournalPages}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {paginatedWcrtJournal.map((article) => (
                    <Link 
                      key={article.postId}
                      href={`/publication/web-articles/${article.postId}`}
                      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                            WCRT JOURNAL
                          </span>
                        </div>
                        <Image
                          src={validatedImages[article.imageUrl || ''] || defaultImage}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 group-hover:text-pink-600 transition-colors line-clamp-2 min-h-[3rem]">
                          {article.title}
                        </h3>
                        <div className="mt-3 flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                          </svg>
                          <span>{formatDate(article.uploadDate)}</span>
                        </div>
                        {article.authorName && (
                          <p className="text-xs text-gray-500 mt-1">
                            By {article.authorName}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Scholar Warrior Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl lg:text-2xl font-bold text-pink-600 border-b-2 border-pink-600 pb-2">Scholar Warrior</h2>
                  <div className="flex gap-2">
                    <button 
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      onClick={() => setScholarWarriorPage((prev) => Math.max(1, prev - 1))}
                      aria-label="Previous scholar warrior"
                      disabled={scholarWarriorPage === 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button 
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      onClick={() => setScholarWarriorPage((prev) => Math.min(totalScholarWarriorPages, prev + 1))}
                      aria-label="Next scholar warrior"
                      disabled={scholarWarriorPage === totalScholarWarriorPages}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {paginatedScholarWarrior.map((article) => (
                    <Link 
                      key={article.postId}
                      href={`/publication/web-articles/${article.postId}`}
                      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                            SCHOLAR WARRIOR
                          </span>
                        </div>
                        <Image
                          src={validatedImages[article.imageUrl || ''] || defaultImage}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 group-hover:text-pink-600 transition-colors line-clamp-2 min-h-[3rem]">
                          {article.title}
                        </h3>
                        <div className="mt-3 flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                          </svg>
                          <span>{formatDate(article.uploadDate)}</span>
                        </div>
                        {article.authorName && (
                          <p className="text-xs text-gray-500 mt-1">
                            By {article.authorName}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Books Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl lg:text-2xl font-bold text-pink-600 border-b-2 border-pink-600 pb-2">Books</h2>
                  <div className="flex gap-2">
                    <button 
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      onClick={() => setBooksPage((prev) => Math.max(1, prev - 1))}
                      aria-label="Previous books"
                      disabled={booksPage === 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button 
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      onClick={() => setBooksPage((prev) => Math.min(totalBooksPages, prev + 1))}
                      aria-label="Next books"
                      disabled={booksPage === totalBooksPages}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {paginatedBooks.map((article) => (
                    <Link 
                      key={article.postId}
                      href={`/publication/web-articles/${article.postId}`}
                      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                            BOOKS
                          </span>
                        </div>
                        <Image
                          src={validatedImages[article.imageUrl || ''] || defaultImage}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 group-hover:text-pink-600 transition-colors line-clamp-2 min-h-[3rem]">
                          {article.title}
                        </h3>
                        <div className="mt-3 flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                          </svg>
                          <span>{formatDate(article.uploadDate)}</span>
                        </div>
                        {article.authorName && (
                          <p className="text-xs text-gray-500 mt-1">
                            By {article.authorName}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Essays Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl lg:text-2xl font-bold text-pink-600 border-b-2 border-pink-600 pb-2">Essays</h2>
                  <div className="flex gap-2">
                    <button 
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      onClick={() => setEssaysPage((prev) => Math.max(1, prev - 1))}
                      aria-label="Previous essays"
                      disabled={essaysPage === 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button 
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      onClick={() => setEssaysPage((prev) => Math.min(totalEssaysPages, prev + 1))}
                      aria-label="Next essays"
                      disabled={essaysPage === totalEssaysPages}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {paginatedEssays.map((article) => (
                    <Link 
                      key={article.postId}
                      href={`/publication/web-articles/${article.postId}`}
                      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                            ESSAYS
                          </span>
                        </div>
                        <Image
                          src={validatedImages[article.imageUrl || ''] || defaultImage}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 group-hover:text-pink-600 transition-colors line-clamp-2 min-h-[3rem]">
                          {article.title}
                        </h3>
                        <div className="mt-3 flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                          </svg>
                          <span>{formatDate(article.uploadDate)}</span>
                        </div>
                        {article.authorName && (
                          <p className="text-xs text-gray-500 mt-1">
                            By {article.authorName}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* External Publications Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl lg:text-2xl font-bold text-pink-600 border-b-2 border-pink-600 pb-2">External Publications</h2>
                  <div className="flex gap-2">
                    <button 
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      onClick={() => setExternalPublicationsPage((prev) => Math.max(1, prev - 1))}
                      aria-label="Previous external publications"
                      disabled={externalPublicationsPage === 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button 
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      onClick={() => setExternalPublicationsPage((prev) => Math.min(totalExternalPublicationsPages, prev + 1))}
                      aria-label="Next external publications"
                      disabled={externalPublicationsPage === totalExternalPublicationsPages}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {paginatedExternalPublications.map((article) => (
                    <Link 
                      key={article.postId}
                      href={`/publication/web-articles/${article.postId}`}
                      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                            EXTERNAL PUBLICATIONS
                          </span>
                        </div>
                        <Image
                          src={validatedImages[article.imageUrl || ''] || defaultImage}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 group-hover:text-pink-600 transition-colors line-clamp-2 min-h-[3rem]">
                          {article.title}
                        </h3>
                        <div className="mt-3 flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                          </svg>
                          <span>{formatDate(article.uploadDate)}</span>
                        </div>
                        {article.authorName && (
                          <p className="text-xs text-gray-500 mt-1">
                            By {article.authorName}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Web Updates and Trending */}
            <div className="lg:col-span-1 space-y-6 lg:space-y-8 lg:sticky lg:top-4 lg:self-start">
              {/* Web Updates Section */}
              <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                <WebUpdates updates={webUpdates} validateImage={validateImage} />
              </div>

              {/* Trending Section */}
              <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                <TrendingAndPopular 
                  articles={sortedArticles}
                  latestArticles={latestArticles}
                  trendingArticles={trendingArticles}
                  validateImage={validateImage}
                />
              </div>

              {/* Newsletter Section */}
              <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                <div className="web-updates">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-base lg:text-lg font-bold text-pink-600 border-b-2 border-pink-600 inline-block pb-1">Newsletter</h2>
                    <div className="flex gap-2">
                      <button 
                        className="w-6 h-6 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        onClick={() => setNewsletterPage((prev) => Math.max(1, prev - 1))}
                        disabled={newsletterPage === 1}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                      </button>
                      <button 
                        className="w-6 h-6 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        onClick={() => setNewsletterPage((prev) => Math.min(totalNewsletterPages, prev + 1))}
                        disabled={newsletterPage === totalNewsletterPages}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {paginatedNewsletters.map((article) => (
                      <Link 
                        href={`/publication/web-articles/${article.postId}`} 
                        key={article.postId}
                        className="flex gap-3 group"
                      >
                        <div className="relative w-24 h-20 flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={validatedImages[article.imageUrl || ''] || defaultImage}
                            alt={article.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            priority={false}
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = defaultImage;
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 group-hover:text-pink-600 transition-colors text-base line-clamp-2">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1 mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            {formatDate(article.uploadDate)}
                          </div>
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {article.content}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Intern Articles Section */}
              <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                <div className="web-updates">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-base lg:text-lg font-bold text-pink-600 border-b-2 border-pink-600 inline-block pb-1">Intern Articles</h2>
                    <div className="flex gap-2">
                      <button 
                        className="w-6 h-6 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        onClick={() => setInternArticlesPage((prev) => Math.max(1, prev - 1))}
                        disabled={internArticlesPage === 1}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                      </button>
                      <button 
                        className="w-6 h-6 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        onClick={() => setInternArticlesPage((prev) => Math.min(totalInternArticlesPages, prev + 1))}
                        disabled={internArticlesPage === totalInternArticlesPages}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 lg:space-y-3">
                    {paginatedInternArticles.map((article) => (
                      <Link 
                        href={`/publication/web-articles/${article.postId}`} 
                        key={article.postId}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                              src={validatedImages[article.imageUrl || ''] || defaultImage}
                              alt={article.title}
                              fill
                              className="object-cover rounded-lg transition-opacity duration-300"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              priority={false}
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = defaultImage;
                              }}
                            />
                          </div>
                          <div className="flex-1 text-sm">
                            <span className="text-gray-500 text-xs">
                              {formatDate(article.uploadDate)}
                            </span>
                            <h3 className="font-medium mt-1 group-hover:text-pink-600 transition-colors line-clamp-2">
                              {article.title}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Articles Section - always last in vertical stack on mobile */}
          <div className="block lg:hidden mt-8">
            <h2 className="text-xl lg:text-2xl font-bold text-pink-600 mb-4 border-b-2 border-pink-600 pb-2">All Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paginatedArticles.map((article) => (
                <Link 
                  key={article.postId}
                  href={`/publication/web-articles/${article.postId}`}
                  className="flex items-start space-x-3 group"
                >
                  <div className="relative w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0">
                    <Image
                      src={validatedImages[article.imageUrl || ''] || defaultImage}
                      alt={article.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium group-hover:text-pink-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {formatDate(article.uploadDate)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>          {/* Latest Post Section */}
          <div className="mb-8 pr-0 lg:pr-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl lg:text-2xl font-bold text-pink-600 border-b-2 border-pink-600 pb-2">Latest Post</h2>
            </div>
            <div className="flex flex-col gap-6">
              {paginatedLatestPosts.map((article) => (
                <div key={article.postId} className="flex flex-row gap-4 bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative w-48 h-36 flex-shrink-0">
                    <Image
                      src={validatedImages[article.imageUrl || ''] || defaultImage}
                      alt={article.title}
                      fill
                      className="object-cover rounded-l-lg"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-2 left-2 z-10">
                      <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                        {article.category?.toUpperCase() || 'POST'}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between p-3">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-pink-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500 gap-2 mb-2">
                        {article.authorName && (
                          <span className="text-pink-600 font-semibold">BY {article.authorName.toUpperCase()}</span>
                        )}
                        <span>• {formatDate(article.uploadDate)}</span>
                        <span>• {article.viewCount || 0}</span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                        {article.content}
                      </p>
                    </div>
                    <div>
                      <Link href={`/publication/web-articles/${article.postId}`}>
                        <button className="px-3 py-1 border border-gray-300 rounded text-xs font-medium hover:bg-pink-50 transition-all">READ MORE</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2 overflow-x-auto pb-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-4 lg:px-6 py-2 lg:py-3 bg-gray-100 text-gray-500 rounded-none font-medium text-sm lg:text-lg hover:bg-gray-200 transition-all duration-200 whitespace-nowrap"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-lg rounded-none font-medium transition-all duration-200 whitespace-nowrap ${
              currentPage === i + 1
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="px-4 lg:px-6 py-2 lg:py-3 bg-gray-100 text-gray-500 rounded-none font-medium text-sm lg:text-lg hover:bg-gray-200 transition-all duration-200 whitespace-nowrap"
        >
          Next
        </button>
      </div>
    </main>
  );
}