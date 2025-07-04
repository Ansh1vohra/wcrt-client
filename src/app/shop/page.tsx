'use client';

import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';


const products = [
  {
    id: 1,
    name: "Jane Smith",
    price: 2499.99,
    image: '/article.jpg',
    category: 'DATA INSIGHTS',
    stock: 15,
    description: 'Articles are grouped into categories such as Newsletters, Tech, and Lifestyle.',
    features: [
      'Category-Based Organization'
    ]
  },
  {
    id: 2,
    name: 'John Doe',
    price: 999.99,
    image: '/article.jpg',
    category: 'JOURNALS',
    stock: 25,
    description: 'Governments worldwide are introducing stricter carbon emission policies, while startups are developing new green technologies...',
    features: [
      "Governments are making new rules to stop pollution.",
      "Companies are building new green technologies."
    ]
  },
  {
    id: 3,
    name: 'Alice Johnson',
    price: 399.99,
    image: '/article.jpg',
    category: 'MAGAZINES',
    stock: 30,
    description: 'Companies are increasingly adopting hybrid work models, blending remote and in-office work. Studies show a 30% increase in productivity...',
    features: [
      'How hybrid work models are shaping the future of employment'
    ]
  },
  {
    id: 4,
    name: 'Bob Williams',
    price: 599.99,
    image: '/article.jpg',
    category: 'MERCHANT DICE',
    stock: 20,
    description: 'Blockchain is a decentralized ledger technology that ensures transparency and security. It powers cryptocurrencies like Bitcoin...',
    features: [
      "A beginner's guide to blockchain technology."
    ]
  }
  
];

function App() {
  const [cart, setCart] = useState<number[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
  };

  const buyNow = (productId: number) => {
    alert(`Proceeding to checkout for product ID: ${productId}`);
  };

  const categories = Array.from(new Set(products.map(product => product.category)));

  const filteredProducts = products.filter(product =>
    (selectedCategory ? product.category === selectedCategory : true) &&
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 via-pink-300 to-yellow-400 text-white">
      <h1 className="text-5xl font-bold mb-4">SHOP</h1>
      <p className="text-2xl">Coming Soon</p>
    </div>
  );
}

export default App;
