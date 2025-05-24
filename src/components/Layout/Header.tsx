import React from 'react';
import { SearchIcon, ShoppingBagIcon } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center space-x-8">
          <div className="font-bold text-2xl">m.</div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-800 hover:text-black transition-colors">Explore</a>
            <a href="#" className="text-gray-800 hover:text-black transition-colors">Talk</a>
            <a href="#" className="text-gray-800 hover:text-black transition-colors">Shop</a>
            <a href="#" className="text-gray-800 hover:text-black transition-colors">Rewards</a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Search mallow"
              className="bg-gray-100 pl-9 pr-4 py-2 rounded-full w-64 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <SearchIcon 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </div>
          
          <button className="p-2 md:hidden">
            <SearchIcon size={20} />
          </button>
          
          <button className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium">
            Sign in
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;