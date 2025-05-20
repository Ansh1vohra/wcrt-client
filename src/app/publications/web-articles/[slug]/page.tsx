import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import articlesData from '@/data/data.json'
import Comments from '@/app/publications/web-articles/[slug]/comment'
import SocialShare from '@/app/publications/web-articles/[slug]/SocialIcons'
import Logo from '@/app/publications/web-articles/[slug]/logo'
import Footer from '@/app/publications/web-articles/[slug]/footer'


interface Article {
  title: string
  author: string | string[]
  postDate: string
  content: string
  abstract?: string
  image?: string
  postViews?: number
}

interface Category {
  name: string
  items: Article[]
}

// Add the createSlug function
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const categories = articlesData.categories as Category[]
    
    for (const category of categories) {
      const article = category.items.find(
        item => createSlug(item.title) === slug
      )
      if (article) return article
    }
    return null
  } catch (error) {
    console.error('Error finding article:', error)
    return null
  }
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found'
    }
  }

  return {
    title: article.title,
    description: article.abstract || article.content.substring(0, 160)
  }
}

export default async function ArticlePage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const formattedDate = new Date(article.postDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const authors = Array.isArray(article.author) ? article.author : [article.author]

  return (
    <main className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-gray-600 mb-6">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <span>›</span>
          <Link href="/publications" className="hover:text-red-600">Publications</Link>
        </nav>

        {/* Title */}
        <h1 className="text-[40px] font-bold leading-tight mb-6">
          {article.title}
        </h1>

        {/* Author and Date */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-gray-600">by</span>
          {authors.map((name, index) => (
            <span key={name} className="inline-flex items-center">
              <span className="text-red-600 font-medium">{name}</span>
              {index < authors.length - 1 && 
                <span className="mx-1">,</span>}
            </span>
          ))}
          <span className="text-gray-400 mx-2">—</span>
          <time dateTime={article.postDate} className="text-gray-600">
            {formattedDate}
          </time>
        </div>

        {/* Abstract */}
        {article.abstract && (
          <p className="text-xl text-gray-600 mb-8 italic">
            {article.abstract}
          </p>
        )}

        {/* Featured Image */}
        {article.image && (
          <div className="mb-8 relative aspect-video">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="rounded-lg object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose max-w-none">
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-800 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        <SocialShare title={article.title} />

        {/* Related Articles */}
        
        <Comments />
        <Logo />
        
         
      </article>
      <Footer />
    </main>
    
  )
}