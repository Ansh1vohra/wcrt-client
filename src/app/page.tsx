"use client";
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WebUpdates from '@/components/WebUpdates';
import TrendingAndPopular from '@/components/TrendingAndPopular';
import PopularStories from '@/components/PopularStories';
import Section from '@/components/Section';
import SafeHTML from '@/components/SafeHTML';
import { FaBullhorn } from 'react-icons/fa';

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND}/api/posts/status/approved`;

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

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  // format date same as WebUpdates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day:   '2-digit',
      year:  'numeric'
    });
  };

  // Ensure dates are formatted consistently for sorting
  const sortedArticles = [...allArticles].sort((a, b) => {
    return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
  });

  // Get featured articles for the main slider (first 5)
  const featuredArticles = sortedArticles.slice(0, 7);

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
  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);
  // Custom arrows for image slider with minimal padding and grey icons
  // Custom navigation arrows for main slider
  const sliderSettings = {
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
    arrows: false  // disable default arrows; using custom bottom-right buttons
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
    const validateAllImages = async () => {
      const imagePromises = allArticles.map(async (article) => {
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

  // New category arrays for additional homepage sections
  const comments = sortedArticles.filter(article => article.category?.toLowerCase() === 'comment');
  const recentEvents = sortedArticles.filter(article => article.category?.toLowerCase() === 'recent event');
  const internshipCapsule = sortedArticles.filter(article => article.category?.toLowerCase() === 'summer internship capsule');
  const youtubePodcast = sortedArticles.filter(article => article.category?.toLowerCase() === 'youtube podcast');
  const susmaSwarajJournal = sortedArticles.filter(article => article.category?.toLowerCase() === 'susma swaraj journal');
  const annaChangyMagazine = sortedArticles.filter(article => article.category?.toLowerCase() === 'anna chandy magazine');
  const workshopWebinars = sortedArticles.filter(article => article.category?.toLowerCase() === 'workshop and webinars');

  // Get current news flash article and compute time ago
  const newsArticle = sortedArticles[newsIndex];
  const calculateTimeAgo = (dateStr: string) => {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHrs < 24) return `${diffHrs} hours ago`;
    const diffDays = Math.floor(diffHrs / 24);
    return `${diffDays} days ago`;
  };
  const newsTimeAgo = newsArticle ? calculateTimeAgo(newsArticle.uploadDate) : '';
  const newsLabel = newsArticle ? newsArticle.title : '';

  // Add missing useState and pagination logic for Susma Swaraj Journal section
  const [susmaPage, setSusmaPage] = useState<number>(1);
  const susmaPerPage = 5;
  const totalSusmaPages = Math.ceil(susmaSwarajJournal.length / susmaPerPage);
  const paginatedSusma = susmaSwarajJournal.slice((susmaPage - 1) * susmaPerPage, susmaPage * susmaPerPage);

  // Add pagination state for Latest, Recent Event, Summer Internship Capsule, YouTube Podcast, and WCRT Web Articles sections
  const [latestPage, setLatestPage] = useState<number>(1);
  const latestPerPage = 3;  // show 3 posts before Load More
  const totalLatestPages = Math.ceil(latestArticles.length / latestPerPage);
  const paginatedLatest = latestArticles.slice((latestPage - 1) * latestPerPage, latestPage * latestPerPage);

  const [recentEventPage, setRecentEventPage] = useState<number>(1);
  const recentEventPerPage = 3;
  const totalRecentEventPages = Math.ceil(recentEvents.length / recentEventPerPage);
  const paginatedRecentEvents = recentEvents.slice((recentEventPage - 1) * recentEventPerPage, recentEventPage * recentEventPerPage);

  const [internshipPage, setInternshipPage] = useState<number>(1);
  const internshipPerPage = 6;
  const totalInternshipPages = Math.ceil(internshipCapsule.length / internshipPerPage);
  const paginatedInternship = internshipCapsule.slice((internshipPage - 1) * internshipPerPage, internshipPage * internshipPerPage);

  const [podcastPage, setPodcastPage] = useState<number>(1);
  const podcastPerPage = 4;
  const totalPodcastPages = Math.ceil(youtubePodcast.length / podcastPerPage);
  const paginatedPodcast = youtubePodcast.slice((podcastPage - 1) * podcastPerPage, podcastPage * podcastPerPage);

  const [wcrtArticlesPage, setWcrtArticlesPage] = useState<number>(1);
  const wcrtArticlesPerPage = 3;
  const totalWcrtArticlesPages = Math.ceil(webArticles.length / wcrtArticlesPerPage);
  const paginatedWcrtArticles = webArticles.slice((wcrtArticlesPage - 1) * wcrtArticlesPerPage, wcrtArticlesPage * wcrtArticlesPerPage);

  // Add pagination for new sections
  const [commentsPage, setCommentsPage] = useState<number>(1);
  const commentsPerPage = 10;
  const totalCommentsPages = Math.ceil(comments.length / commentsPerPage);

  const [annaChangyPage, setAnnaChangyPage] = useState<number>(1);
  const annaChangyPerPage = 8;
  const totalAnnaChangyPages = Math.ceil(annaChangyMagazine.length / annaChangyPerPage);

  const [workshopPage, setWorkshopPage] = useState<number>(1);
  const workshopPerPage = 8;
  const totalWorkshopPages = Math.ceil(workshopWebinars.length / workshopPerPage);
  // Render helper for 230x164 card
  const renderCard = (article: Article) => (
    <Link key={article.postId} href={`/post/${article.postId}`} className="group inline-block w-[230px] bg-white rounded-none overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-300">
      <div className="relative w-[230px] h-[164px] overflow-hidden">
        <Image src={validatedImages[article.imageUrl || ''] || defaultImage} alt={article.title} fill className="object-cover" sizes="230px" />
        <span className="absolute bottom-2 left-2 bg-red-600 text-white text-xs font-bold uppercase px-2 py-1">{article.category?.toUpperCase() || 'POST'}</span>
      </div>
      <div className="px-3 py-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-pink-600 transition-colors duration-200">{article.title}</h3>
        <div className="flex items-center text-sm text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3M16 7V3M4 11h16M5 19h14a2 2 0 002-2V11a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z"/></svg><span>{formatDate(article.uploadDate)}</span></div>
      </div>
    </Link>
  );
  // Render helper for "details without photo" format (for Summer Internship Capsule)
  const renderDetailsOnly = (article: Article) => (
    <Link key={article.postId} href={`/post/${article.postId}`} className="group block w-full bg-white rounded-none overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-300 p-4 col-span-full">
      <div className="mb-2">
        <span className="bg-red-600 text-white text-xs font-bold uppercase px-2 py-1">{article.category?.toUpperCase() || 'POST'}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-pink-600 transition-colors duration-200">{article.title}</h3>
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3M16 7V3M4 11h16M5 19h14a2 2 0 002-2V11a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z"/>
        </svg>
        <span>{formatDate(article.uploadDate)}</span>
        {article.authorName && (
          <>
            <span className="mx-2">•</span>
            <span>By {article.authorName}</span>
          </>
        )}
      </div>
      <div className="text-sm text-gray-600 line-clamp-3">
        <SafeHTML html={article.content} className="prose prose-sm max-w-none" />
      </div>
    </Link>
  );

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mt-[30px]">
            {/* Left Column: Newsflash and Content */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">              {/* Newsflash Banner matching design */}
              <div className="flex items-center h-12 overflow-hidden rounded-none border border-gray-300">
                <div className="flex items-center bg-red-600 text-white px-4 space-x-2 h-full">
                  <FaBullhorn className="text-2xl" />
                  <span className="text-xs font-bold uppercase">NEWSFLASH</span>
                </div>                <div className="flex items-center flex-1 bg-white px-3 h-full min-w-0">
                  {/* Post Image */}
                  {newsArticle && (
                    <div className="relative w-12 h-10 flex-shrink-0 mr-4 overflow-hidden rounded">
                      <Image 
                        src={validatedImages[newsArticle.imageUrl || ''] || defaultImage}
                        alt={newsArticle.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  )}
                  {/* News Text */}
                  <p className="flex-1 text-black text-sm font-bold truncate min-w-0 mr-4">{newsLabel}</p>
                  {/* Navigation Buttons - Fixed Width Container */}
                  <div className="flex space-x-2 flex-shrink-0">
                    <button 
                      onClick={() => setNewsIndex(prev => (prev - 1 + sortedArticles.length) % sortedArticles.length)} 
                      aria-label="Previous news" 
                      className="text-gray-500 hover:text-gray-700 p-1 w-7 h-7 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => setNewsIndex(prev => (prev + 1) % sortedArticles.length)} 
                      aria-label="Next news" 
                      className="text-gray-500 hover:text-gray-700 p-1 w-7 h-7 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>{/* Main Article Section */}
              <div>
                <div className="w-[750px] mx-auto relative overflow-hidden rounded-none">
                  <Slider ref={sliderRef} {...sliderSettings}>
                    {featuredArticles.map((article, index) => (
                      <Link key={article.postId} href={`/post/${article.postId}`}>
                        <div className="relative aspect-[16/9] overflow-hidden group">
                          <Image
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
                          <div className="absolute bottom-0 left-0 right-0 p-6 group-hover:translate-y-[-5px] transition-transform duration-300">
                            <div className="inline-block bg-red-600 text-white text-xs uppercase px-2 py-1 mb-2">
                              {article.category?.toUpperCase() || 'POST'}
                            </div>
                            <h2 className="text-white text-[34px] font-bold">
                              {article.title}
                            </h2>
                            <p className="text-gray-200 text-[11px] mt-2 uppercase font-bold">
                              BY {article.authorName} | {new Date(article.uploadDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </Slider>
                  {/* Bottom-right navigation arrows */}
                  <div className="absolute bottom-4 right-4 flex flex-col items-center space-y-2 z-10">
                    <button onClick={() => sliderRef.current?.slickNext()} aria-label="Next slide" className="bg-red-600 hover:bg-red-700 p-2 rounded-l-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                    <button onClick={() => sliderRef.current?.slickPrev()} aria-label="Previous slide" className="bg-white hover:bg-gray-100 p-2 rounded-l-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Thumbnails */}
                <div className="grid grid-cols-7 justify-items-center mt-4 gap-2 w-[750px] mx-auto">
                  {featuredArticles.map((article, index) => (
                    <button
                      key={article.postId} onClick={() => sliderRef.current?.slickGoTo(index)}
                      className={`relative w-[98.5677px] h-[70.638px] rounded-none overflow-hidden transition-transform ${index === currentImageIndex ? 'ring-2 ring-pink-600 scale-105' : 'hover:ring-2 hover:ring-pink-300'}`}
                    >
                      {index === currentImageIndex && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-l-transparent border-r-transparent border-b-4 border-b-white" />
                      )}
                      <Image src={validatedImages[article.imageUrl || ''] || defaultImage} alt={article.title} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Articles Section */}
              <div id="recent-articles" className="w-[750px] mx-auto mb-4 transform transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl lg:text-2xl font-bold text-pink-600 inline-block border-b-2 border-pink-600 pb-2">Recent Articles</h2>
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-start">                  {recentArticles.map((article: Article) => (                    <Link
                      key={article.postId}
                      href={`/post/${article.postId}`}
                      className="group inline-block w-[230px] bg-white rounded-none overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-300"
                    >
                      <div className="relative w-[230px] h-[164px] overflow-hidden">
                        <Image
                          src={validatedImages[article.imageUrl || ''] || defaultImage}
                          alt={article.title}
                          fill
                          className="object-cover"
                          sizes="230px"
                        />
                        <span className="absolute bottom-2 left-2 bg-red-600 text-white text-xs font-bold uppercase px-2 py-1">{article.category?.toUpperCase() || 'POST'}</span>
                      </div>                      <div className="px-3 py-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-pink-600 transition-colors duration-200">
                          {article.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3M16 7V3M4 11h16M5 19h14a2 2 0 002-2V11a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
                          </svg>
                          <span>{formatDate(article.uploadDate)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setRecentPage(prev => Math.min(recentTotalPages, prev + 1))}
                    disabled={recentPage === recentTotalPages}
                    className="px-6 py-2 uppercase font-medium text-sm border border-pink-600 text-pink-600 rounded-none hover:bg-pink-600 hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Load More
                  </button>
                </div>
              </div>

              {/* Latest Section: same layout as Recent Articles, 3 items per page */}
              <div className="w-[750px] mx-auto mb-4 transform transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl lg:text-2xl font-bold text-pink-600 inline-block border-b-2 border-pink-600 pb-2">Latest</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setLatestPage(prev => Math.max(1, prev - 1))}
                      disabled={latestPage === 1}
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 disabled:opacity-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 lg:w-4 lg:h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setLatestPage(prev => Math.min(totalLatestPages, prev + 1))}
                      disabled={latestPage === totalLatestPages}
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 disabled:opacity-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 lg:w-4 lg:h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-start">                  {paginatedLatest.map(article => (                    /* reuse same card markup as Recent Articles */
                    <Link key={article.postId} href={`/post/${article.postId}`} className="group inline-block w-[230px] bg-white rounded-none overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-300">
                      <div className="relative w-[230px] h-[164px] overflow-hidden">
                        <Image src={validatedImages[article.imageUrl || ''] || defaultImage} alt={article.title} fill className="object-cover" sizes="230px" />
                        <span className="absolute bottom-2 left-2 bg-red-600 text-white text-xs font-bold uppercase px-2 py-1">{article.category?.toUpperCase() || 'POST'}</span>
                      </div>
                      <div className="px-3 py-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-pink-600 transition-colors duration-200">{article.title}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3M16 7V3M4 11h16M5 19h14a2 2 0 002-2V11a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
                          </svg>
                          <span>{formatDate(article.uploadDate)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {latestArticles.length > latestPerPage && (
                  <div className="flex justify-center mt-4">
                    <a href="#recent-articles" className="px-6 py-2 uppercase font-medium text-sm border border-pink-600 text-pink-600 rounded-none hover:bg-pink-600 hover:text-white transition-colors duration-300">
                      Load More
                    </a>
                  </div>
                )}
              </div>

              {/* Recent Event Section */}
              <Section
                title="Recent Event"
                items={recentEvents}
                page={recentEventPage}
                setPage={setRecentEventPage}
                itemsPerPage={recentEventPerPage}
                totalPages={totalRecentEventPages}
                renderItem={renderCard}
              />              {/* Summer Internship Capsule Section */}
              <Section
                title="Summer Internship Capsule"
                items={internshipCapsule}
                page={internshipPage}
                setPage={setInternshipPage}
                itemsPerPage={internshipPerPage}
                totalPages={totalInternshipPages}
                renderItem={renderDetailsOnly}
              />{/* YouTube Podcast Section */}
              <Section
                title="YouTube Podcast"
                items={youtubePodcast}
                page={podcastPage}
                setPage={setPodcastPage}
                itemsPerPage={podcastPerPage}
                totalPages={totalPodcastPages}
                renderItem={renderCard}
              />              {/* WCRT Web Articles Section */}
              <Section
                title="WCRT Web Articles"
                items={webArticles}
                page={webArticlePage}
                setPage={setWcrtArticlesPage}
                itemsPerPage={wcrtArticlesPerPage}
                totalPages={totalWcrtArticlesPages}
                renderItem={renderCard}
              />              {/* Rajkumari Kaul Essay Competitions Section */}
              <Section
                title="Rajkumari Kaul Essay Competitions"
                items={essays}
                page={essaysPage}
                setPage={setEssaysPage}
                itemsPerPage={essaysPerPage}
                totalPages={totalEssaysPages}
                renderItem={renderCard}
              />              {/* Susma Swaraj Journal Section */}
              <Section
                title="Susma Swaraj Journal"
                items={susmaSwarajJournal}
                page={susmaPage}
                setPage={setSusmaPage}
                itemsPerPage={susmaPerPage}
                totalPages={totalSusmaPages}
                renderItem={renderCard}
              />              {/* Add Issue Briefs Section */}
              <Section
                title="Issue Briefs"
                items={issueBriefs}
                page={issuePage}
                setPage={setIssuePage}
                itemsPerPage={issuePerPage}
                totalPages={totalIssuePages}
                renderItem={renderCard}
              />              {/* Add WCRT Journal Section */}
              <Section
                title="WCRT Journal"
                items={wcrtJournal}
                page={wcrtJournalPage}
                setPage={setWcrtJournalPage}
                itemsPerPage={wcrtJournalPerPage}
                totalPages={totalWcrtJournalPages}
                renderItem={renderCard}
              />              {/* Add Comment Section */}
              <Section
                title="Comment"
                items={comments}
                page={commentsPage}
                setPage={setCommentsPage}
                itemsPerPage={commentsPerPage}
                totalPages={totalCommentsPages}
                renderItem={renderCard}
              />              {/* Add Anna Chandy Magazine Section */}
              <Section
                title="Anna Chandy Magazine"
                items={annaChangyMagazine}
                page={annaChangyPage}
                setPage={setAnnaChangyPage}
                itemsPerPage={annaChangyPerPage}
                totalPages={totalAnnaChangyPages}
                renderItem={renderCard}
              />              {/* Add Books Section */}
              <Section
                title="Books"
                items={books}
                page={booksPage}
                setPage={setBooksPage}
                itemsPerPage={booksPerPage}
                totalPages={totalBooksPages}
                renderItem={renderCard}
              />              {/* Add Scholar Warrior Section */}
              <Section
                title="Scholar Warrior"
                items={scholarWarrior}
                page={scholarWarriorPage}
                setPage={setScholarWarriorPage}
                itemsPerPage={scholarWarriorPerPage}
                totalPages={totalScholarWarriorPages}
                renderItem={renderCard}
              />              {/* Add Workshop and Webinars Section */}
              <Section
                title="Workshop and Webinars"
                items={workshopWebinars}
                page={workshopPage}
                setPage={setWorkshopPage}
                itemsPerPage={workshopPerPage}
                totalPages={totalWorkshopPages}
                renderItem={renderCard}
              />              {/* Add NewsLetters Section */}
              <Section
                title="NewsLetters"
                items={newsletters}
                page={newsletterPage}
                setPage={setNewsletterPage}
                itemsPerPage={newsletterPerPage}
                totalPages={totalNewsletterPages}
                renderItem={renderCard}
              />              {/* Latest Post Section */}
              <div className="w-[750px] mx-auto mb-8 pr-0 lg:pr-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl lg:text-2xl font-bold text-pink-600 inline-block border-b-2 border-pink-600 pb-2">Latest Post</h2>
                </div>
                <div className="flex flex-col gap-6">                  {paginatedLatestPosts.map((article) => (
                    <div key={article.postId} className="flex flex-row gap-4 bg-white rounded-none shadow-md overflow-hidden border border-gray-300">
                      <div className="relative w-[360px] h-[258px] flex-shrink-0 overflow-hidden">
                        <Image
                          src={validatedImages[article.imageUrl || ''] || defaultImage}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold uppercase w-[91.625px] h-[17px] flex items-center justify-center z-10">
                          {article.category?.toUpperCase() || 'POST'}
                        </span>
                      </div>
                      <div className="flex-1 flex flex-col justify-between p-3">
                        <div>
                          <h3 className="text-[22px] font-bold text-gray-800 leading-[30px] mb-2 group-hover:text-pink-600 transition-colors line-clamp-2">
                            {article.title}
                          </h3>                           <div className="flex items-center text-xs text-gray-500 gap-2 mb-2">
                             {article.authorName && (
                               <span className="text-pink-600 font-semibold">BY {article.authorName.toUpperCase()}</span>
                             )}
                             <span>• {formatDate(article.uploadDate)}</span>
                             <span>• {article.viewCount || 0}</span>
                           </div>
                          <SafeHTML 
                            html={article.content} 
                            className="text-[14px] text-gray-600 line-clamp-2 mb-2"
                          />
                        </div>
                        <div>
                          <Link href={`/post/${article.postId}`}>
                            <button className="px-3 py-1 border border-gray-300 rounded text-xs font-medium hover:bg-pink-50 transition-all">READ MORE</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Pagination numbers at the bottom */}
                <div className="flex justify-center items-center gap-2 mt-4">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50"
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded font-medium ${currentPage === i + 1 ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 w-full max-w-sm">
                <div className="space-y-6 bg-white border border-gray-200 rounded-lg shadow-sm p-6">                  {/* Web Updates Section */}
                  <WebUpdates />
                  {/* Trending Section */}
                  <TrendingAndPopular />
                  {/* Popular Stories Section */}
                  <PopularStories limit={5} />
                  {/* Intern Articles Section */}
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
                          href={`/post/${article.postId}`}
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
          </div>

          {/* All Articles Section - always last in vertical stack on mobile */}
          <div className="block lg:hidden mt-8">
            <h2 className="text-xl lg:text-2xl font-bold text-pink-600 mb-4 border-b-2 border-pink-600 pb-2">All Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paginatedArticles.map((article) => (
                <Link
                  key={article.postId}
                  href={`/post/${article.postId}`}
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      {formatDate(article.uploadDate)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
   );
}