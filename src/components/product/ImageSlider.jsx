import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ImageSlider = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = (e) => {
    e.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  if (!images?.length) return null;

  return (
    <div className="relative w-full h-full group">
      <img 
        src={images[currentIndex]} 
        alt={`${alt} - Image ${currentIndex + 1}`}
        className="w-full h-full object-contain p-2"
      />
      
      {images.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={20} className="text-gray-800" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={20} className="text-gray-800" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, slideIndex) => (
              <button
                key={slideIndex}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(slideIndex);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentIndex === slideIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};