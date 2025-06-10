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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                className="sm:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <span className="text-xl font-bold text-gray-800 ml-2"></span>
            </div>

            <div className="hidden sm:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
              </div>

              <div className="relative">
                <ShoppingCart className="text-gray-600 hover:text-gray-900 cursor-pointer" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-7 text-gray-400" size={20} />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="mb-8">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === null
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {selectedCategory || 'All Products'}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      product.stock > 10
                        ? 'text-green-600'
                        : product.stock > 5
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {product.stock} in stock
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                  <ul className="text-sm text-gray-600 list-disc list-inside">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price.toLocaleString()}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => addToCart(product.id)}
                      className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => buyNow(product.id)}
                      className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
