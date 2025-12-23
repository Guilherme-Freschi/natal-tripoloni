
import React, { useEffect, useState } from 'react';
import { FloatingPhrase } from '../types';

const FloatingPhrases: React.FC = () => {
  const [phrases, setPhrases] = useState<FloatingPhrase[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * -20,
      scale: Math.random() * 0.5 + 0.7,
    }));
    setPhrases(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {phrases.map((p) => (
        <div
          key={p.id}
          className="absolute text-white font-bold whitespace-nowrap opacity-40 select-none animate-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.scale}rem`,
            animation: `float-random ${p.duration}s linear infinite alternate`,
            animationDelay: `${p.delay}s`,
            textShadow: '0 0 5px #000',
          }}
        >
          FELIZ NATAL MATHEUS INDIANO
        </div>
      ))}
      <style>{`
        @keyframes float-random {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(100px, 50px) rotate(5deg); }
          50% { transform: translate(-50px, 150px) rotate(-5deg); }
          75% { transform: translate(-150px, -50px) rotate(10deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default FloatingPhrases;
