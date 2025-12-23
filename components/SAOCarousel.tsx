
import React, { useState, useEffect } from 'react';

const IMAGES = [
  "/images/Matheus-indiano-spaceapps.png",
  "/images/matheus-indiano.png",
  "/images/matheus-indiano2.png",
  "/images/Matheus-indiano-spaceapps.png",
  "/images/matheus-indiano.png",
  "/images/matheus-indiano2.png"
];

const SAOCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const visibleImages = [
    IMAGES[index % IMAGES.length],
    IMAGES[(index + 1) % IMAGES.length],
    IMAGES[(index + 2) % IMAGES.length]
  ];

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      <div className="border-white-400 rounded-[16px] bg-white/10  p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-6 justify-center items-center overflow-hidden transition-all duration-600">
        {visibleImages.map((src, i) => (
          <div 
            key={`${index}-${i}`} 
            className="flex-1 w-full aspect-video md:aspect-square overflow-hidden rounded-2xl border-1 border-white-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] transition-all duration-1000 transform hover:scale-105"
          >
            <img 
              src={src} 
              alt={`SAO Christmas ${i}`} 
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Indicator dots */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: Math.ceil(IMAGES.length / 3) }).map((_, i) => (
          <div 
            key={i} 
            className={`w-3 h-3 rounded-full transition-all duration-300 ${Math.floor(index / 3) === i ? 'bg-yellow-400 scale-125' : 'bg-gray-500'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SAOCarousel;
