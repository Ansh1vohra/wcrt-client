import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface LoadMoreSectionProps<T> {
  title: string;
  items: T[];
  visibleCount: number;
  setVisibleCount: (n: number) => void;
  itemsPerPage: number;
  renderItem: (item: T) => React.ReactNode;
}

export default function LoadMoreSection<T>({ title, items, visibleCount, setVisibleCount, itemsPerPage, renderItem }: LoadMoreSectionProps<T>) {
  const displayItems = items.slice(0, visibleCount);
  const canLoadMore = visibleCount < items.length;
  return (
    <div className="w-[750px] mx-auto mb-4 transform transition-all duration-300">
      <div className="flex items-center mb-4">
        <h2 className="text-xl lg:text-2xl font-bold text-pink-600 inline-block border-b-2 border-pink-600 pb-2">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-start">
        {displayItems.map(renderItem)}
      </div>
      {canLoadMore && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setVisibleCount(Math.min(visibleCount + itemsPerPage, items.length))}
            className="px-6 py-2 uppercase font-medium text-sm border border-pink-600 text-pink-600 rounded-none hover:bg-pink-600 hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
