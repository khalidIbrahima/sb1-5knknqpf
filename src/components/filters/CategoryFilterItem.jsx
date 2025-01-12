import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const CategoryFilterItem = ({ category, selectedCategory, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);
  const hasChildren = category.children?.length > 0;

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150); // Small delay to prevent flickering
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div 
      className="relative" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => onSelect(category.slug)}
        className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
          selectedCategory === category.slug 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      >
        {category.name}
        {hasChildren && <ChevronDown size={16} />}
      </button>

      {hasChildren && isHovered && (
        <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg py-2 min-w-[200px] z-50">
          {category.children.map(child => (
            <button
              key={child.id}
              onClick={() => onSelect(child.slug)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                selectedCategory === child.slug ? 'text-blue-600 font-medium' : 'text-gray-700'
              }`}
            >
              {child.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};