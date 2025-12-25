
import React, { useEffect, useRef, useState } from 'react';
import Snow from './components/Snow';
import FloatingPhrases from './components/FloatingPhrases';
import SAOCarousel from './components/SAOCarousel';

const App: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handleStartInteraction = () => {
    if (!hasStarted && audioRef.current) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setHasStarted(true);
          })
          .catch(err => {
            console.error("Audio playback failed:", err);
            // If the first source fails, the browser will automatically try the next <source> tag.
            // We still want to mark it as 'started' so we don't keep trying to play on every click
            // if it's fundamentally blocked or broken.
            setHasStarted(true);
          });
      }
    }
  };

  useEffect(() => {
    // Add event listener to the whole document for the first click to start audio
    window.addEventListener('click', handleStartInteraction);
    return () => window.removeEventListener('click', handleStartInteraction);
  }, [hasStarted]);

  return (
    <div 
      className="min-h-screen relative flex flex-col items-center justify-start py-12 px-4 selection:bg-red-500 selection:text-white"
      style={{
        backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Edited%29.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Hidden Audio with Multiple Sources for compatibility */}
      
      <audio 
        ref={audioRef}
        loop 
        className="hidden"
        preload="auto"
        crossOrigin="anonymous"
      >
        <source src="audio\ssstik.io_1766454304718.mp3" type="audio/mpeg" />
        <source src="audio\ssstik.io_1766454304718.mp3" type="audio/mpeg" />
        Seu navegador não suporta o elemento de áudio.
      </audio>

      {/* Snow Effect */}
      <Snow />

      {/* Floating Phrases */}
      <FloatingPhrases />

      {/* Main Content */}
      <header className="relative z-30 mb-16 text-center">
        <div className="text-4xl md:text-6xl mb-4 animate-bounce">
          🎄 🎅 🎅 🎄 ⭐
        </div>
        <h1 className="neon-title text-5xl md:text-8xl font-bold uppercase tracking-widest text-white transition-all duration-500 hover:scale-110 cursor-default">
          FELIZ NATAL!
        </h1>
      </header>

      <main className="relative z-30 w-full flex-grow flex items-center justify-center">
        <SAOCarousel />
      </main>

      <footer className="relative z-30 mt-12 text-white/60 text-sm font-bold bg-black/40 px-6 py-2 rounded-full border border-white/20 backdrop-blur-sm">
        Matheus Indiano Edition
      </footer>

      {/* Initial Interaction Prompt if not started */}
      {!hasStarted && (
        <div className="fixed bottom-10 right-10 z-50 bg-yellow-400 text-black font-bold px-6 py-3 rounded-full animate-pulse shadow-xl cursor-pointer">
          Clique em qualquer lugar para música! 🎵
        </div>
      )}
    </div>
  );
};

export default App;
