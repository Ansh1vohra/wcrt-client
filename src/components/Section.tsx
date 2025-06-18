import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface SectionProps<T> {
  title: string;
  items: T[];
  page: number;
  setPage: (n: number) => void;
  itemsPerPage: number;
  totalPages: number;
  renderItem: (item: T) => React.ReactNode;
}

export default function Section<T>({ title, items, page, setPage, itemsPerPage, totalPages, renderItem }: SectionProps<T>) {
  const displayItems = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  return (
    <div className="w-[750px] mx-auto mb-4 transform transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl lg:text-2xl font-bold text-pink-600 inline-block border-b-2 border-pink-600 pb-2">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 disabled:opacity-50"
          >
            ‹
          </button>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-all duration-300 disabled:opacity-50"
          >
            ›
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-start">
        {displayItems.map(renderItem)}
      </div>
      {items.length > itemsPerPage && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            className="px-6 py-2 uppercase font-medium text-sm border border-pink-600 text-pink-600 rounded-md hover:bg-pink-600 hover:text-white transition-colors duration-300 disabled:opacity-50"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
