
import React, { useEffect, useState } from 'react';
import { Snowflake } from '../types';

const Snow: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 2,
      speed: Math.random() * 10 + 5,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full animate-fall"
          style={{
            left: `${flake.x}%`,
            top: `-10px`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `fall ${flake.speed}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) translateX(0); }
          100% { transform: translateY(110vh) translateX(20px); }
        }
      `}</style>
    </div>
  );
};

export default Snow;
