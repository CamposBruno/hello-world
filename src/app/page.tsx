'use client';

import { useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { FloatingParticles } from '@/components/FloatingParticles';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';
import { languages, particlePositions } from '@/data/constants';

// Error Fallback Component
function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 to-red-700">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="text-lg mb-4">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-6 py-3 bg-white text-red-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  
  const texts = languages.map(lang => lang.text);
  const { displayedText, currentIndex } = useTypingAnimation({
    texts,
    typingSpeed: 150,
    deletingSpeed: 100,
    pauseTime: 2000
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div 
        className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
        role="main"
        aria-label="Hello World multi-language animation"
      >
        <AnimatedBackground />
        
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 
              className="text-8xl md:text-9xl font-bold text-white font-mono"
              style={{
                textShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
              aria-live="polite"
              aria-label={`Current text: ${displayedText}`}
            >
              {displayedText}
              <span 
                className="inline-block w-2 h-20 bg-white ml-2 animate-pulse"
                aria-hidden="true"
              />
            </h1>
            <p 
              className="text-xl md:text-2xl text-white/80 mt-4 font-light"
              aria-label={`Current language: ${languages[currentIndex].language}`}
            >
              {languages[currentIndex].language}
            </p>
          </div>
        </div>

        {isClient && <FloatingParticles positions={particlePositions} />}
      </div>
    </ErrorBoundary>
  );
}
