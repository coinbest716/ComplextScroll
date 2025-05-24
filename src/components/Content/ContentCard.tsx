import React from 'react';
import { ContentItem } from '../../types';

interface ContentCardProps {
  item: ContentItem;
}

const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  return (
    <div className="group relative rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-square w-full overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs text-gray-300 flex items-center gap-1">
              1/1 artwork
              {item.secondary && (
                <span className="ml-2 px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded text-[10px]">
                  Secondary
                </span>
              )}
            </span>
            <h3 className="font-medium text-white">{item.title}</h3>
            <p className="text-sm text-gray-300">@{item.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;