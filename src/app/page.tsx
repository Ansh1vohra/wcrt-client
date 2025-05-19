"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import data from '@/data/data.json';

const defaultImage = "/article.jpg";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [newsIndex, setNewsIndex] = useState(0);

  // Combine all articles from different categories
  const allArticles = data.categories.reduce((acc, category) => {
    return [...acc, ...category.items];
  }, [] as any[]);

  // Get recent articles (last 4)
  const recentArticles = allArticles
    .sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime())
    .slice(0, 4);

  useEffect(() => {
    console.log(newsIndex);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Rotate news every 5 seconds
    const interval = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % allArticles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [mounted, allArticles.length]);

  // Function to validate image path
  const getValidImagePath = (imagePath: string) => {
    return imagePath || defaultImage;
  };
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    className: "h-full",
    dotsClass: "slick-dots",
    customPaging: function(i: number) {
      return (
        <div className="relative w-24 h-16 cursor-pointer">
          <div className="relative w-full h-full transform transition-all duration-300 hover:scale-110">
            <Image
              src={allArticles[i]?.image || defaultImage}
              alt={allArticles[i]?.title || ""}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded border-2 border-transparent hover:border-white"
            />
            <div className="absolute inset-0 bg-black/50 hover:bg-black/30 transition-opacity duration-300" />
          </div>
        </div>
      );
    },
    appendDots: (dots: React.ReactNode) => (
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-6">
        <div className="container mx-auto px-8">
          <ul className="flex justify-center items-center gap-4"> {dots} </ul>
        </div>
      </div>
    ),
  };
  if (!mounted) return null;
  return (
    <main className="min-h-screen bg-white">
      {/* Newsflash Section */}      <div className="bg-red-700 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <span className="font-bold mr-4 whitespace-nowrap">NEWSFLASH:</span>
            <div className="relative overflow-hidden flex-1">
              <div className="flex space-x-4 overflow-hidden">
                <div className="animate-slide">
                  {allArticles.map((article, idx) => (
                    <span key={idx} className="inline-block mr-8">
                      {article.title} •
                    </span>
                  ))}
                </div>
                <div className="animate-slide" style={{ animationDelay: '7.5s' }}>
                  {allArticles.map((article, idx) => (
                    <span key={idx} className="inline-block mr-8">
                      {article.title} •
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{/* Hero Section with Slider */}
      <section className="relative w-full h-[600px] md:h-[500px] lg:h-[400px] bg-gradient-to-r from-red-700 to-red-900">
        <Slider {...sliderSettings} className="h-full">
          {allArticles.map((article, index) => (
            <div key={index} className="relative h-[600px] md:h-[500px] lg:h-[400px]">
              <div className="absolute inset-0">
                <Image
                  src={article.image || defaultImage}
                  alt={article.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="relative h-full flex items-end justify-start px-8 pb-20">
                <div className="max-w-4xl">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{article.title}</h2>
                  <p className="text-lg md:text-xl text-gray-200 mb-6">{article.abstract}</p>                  <button className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>      </section>

      {/* Recent Articles Section */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-red-700 border-b-2 border-red-700 pb-2">
            Recent Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentArticles.map((article, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={getValidImagePath(article.image)}
                    alt={article.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-3">{article.abstract}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{article.author}</span>
                    <span>{new Date(article.postDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-8">
        {data.categories.map((category, index) => (
          <div key={index} className="mb-16">            <h2 className="text-2xl font-bold mb-6 text-red-700 border-b-2 border-red-700 pb-2">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="bg-white shadow hover:shadow-lg transition-shadow duration-200 rounded-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={item.image || defaultImage}
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.abstract}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{item.author}</span>
                      <span className="text-sm text-gray-500">{new Date(item.postDate).toLocaleDateString()}</span>
                    </div>
                    <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full transition-colors">
                      Read Article
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
