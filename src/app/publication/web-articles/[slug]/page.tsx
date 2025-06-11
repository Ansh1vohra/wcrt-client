// // app/publication/web-articles/[slug]/page.tsx
// import { notFound } from 'next/navigation';
// import ArticleClient from './ArticleClient';
// import articlesData from '@/data/data.json';

// interface ArticleType {
//   title: string;
//   author: string | string[];
//   postDate: string;
//   content: string;
//   abstract?: string;
//   image?: string;
//   postViews?: number;
//   comments?: number;
// }

// interface Category {
//   name: string;
//   items: ArticleType[];
// }

// function createSlug(title: string): string {
//   return title
//     .toLowerCase()
//     .replace(/[^a-z0-9\s-]/g, '')
//     .replace(/\s+/g, '-')
//     .replace(/-+/g, '-')
//     .trim();
// }

// export default function Page({ params }: { params: { slug: string } }) {
//   const slug = params.slug;

//   const categories = articlesData.categories as Category[];
//   const allArticles = categories.flatMap((category) => category.items);
//   const article = allArticles.find((item) => createSlug(item.title) === slug);

//   if (!article) notFound();

//   return (
//     <ArticleClient
//       article={article}
//       allArticles={allArticles}
//     />
//   );
// }
