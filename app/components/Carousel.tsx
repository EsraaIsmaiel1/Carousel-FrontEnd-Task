'use client';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface CarouselProps {
  slides: {
    src: string;
    alt: string;
  }[];
  title?: string;
}

const Carousel: React.FC<CarouselProps> = ({ slides, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const goToSlide = useCallback(
    (index: number) => {
      let newIndex = index;
      if (index < 0) {
        newIndex = slides.length - 1;
      } else if (index >= slides.length) {
        newIndex = 0;
      }
      setCurrentIndex(newIndex);
    },
    [slides.length]
  );

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextSlide, prevSlide]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {title && <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>}
      <div
        className="relative w-full aspect-[16/9] bg-slate-800 rounded-lg overflow-hidden group"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div ref={carouselRef} className="w-full h-full">
          <div
            className="flex transition-all duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="relative w-full h-full flex-shrink-0">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  layout="fill"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Previous Button */}
        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1 z-10 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        {/* Next Button */}
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1 z-10 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        {/* Indicators */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-0 group-hover:opacity-100  transition-opacity">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-1.5 h-1.5 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-gray-400'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
