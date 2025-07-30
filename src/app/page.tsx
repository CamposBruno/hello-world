'use client';

import { useState, useEffect } from 'react';

const languages = [
  { text: 'Hello World', language: 'English' },
  { text: 'Hola Mundo', language: 'Spanish' },
  { text: 'Bonjour le Monde', language: 'French' },
  { text: 'Ciao Mondo', language: 'Italian' },
  { text: 'Hallo Welt', language: 'German' },
  { text: 'Olá Mundo', language: 'Portuguese' },
  { text: 'こんにちは世界', language: 'Japanese' }
];

// Predefined particle positions to avoid hydration issues
const particlePositions = [
  { left: '10%', top: '20%', delay: '0s', duration: '2s' },
  { left: '85%', top: '15%', delay: '0.5s', duration: '2.5s' },
  { left: '20%', top: '80%', delay: '1s', duration: '3s' },
  { left: '75%', top: '70%', delay: '1.5s', duration: '2.8s' },
  { left: '50%', top: '10%', delay: '0.2s', duration: '2.2s' },
  { left: '15%', top: '50%', delay: '0.8s', duration: '2.7s' },
  { left: '90%', top: '40%', delay: '1.2s', duration: '2.3s' },
  { left: '30%', top: '90%', delay: '0.3s', duration: '2.9s' },
  { left: '60%', top: '85%', delay: '0.7s', duration: '2.1s' },
  { left: '40%', top: '30%', delay: '1.3s', duration: '2.6s' },
  { left: '80%', top: '60%', delay: '0.4s', duration: '2.4s' },
  { left: '25%', top: '75%', delay: '0.9s', duration: '2.8s' },
  { left: '70%', top: '25%', delay: '1.1s', duration: '2.2s' },
  { left: '5%', top: '60%', delay: '0.6s', duration: '2.5s' },
  { left: '95%', top: '80%', delay: '1.4s', duration: '2.7s' },
  { left: '45%', top: '95%', delay: '0.1s', duration: '2.3s' },
  { left: '55%', top: '5%', delay: '0.8s', duration: '2.9s' },
  { left: '35%', top: '65%', delay: '1.0s', duration: '2.1s' },
  { left: '65%', top: '35%', delay: '0.5s', duration: '2.6s' },
  { left: '10%', top: '40%', delay: '1.3s', duration: '2.4s' }
];

export default function Home() {
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const currentText = languages[currentLanguageIndex].text;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setDisplayedText('');
    setCurrentCharIndex(0);
    setIsTyping(true);
    setIsDeleting(false);
  }, [currentLanguageIndex]);

  useEffect(() => {
    if (isDeleting) {
      // Deleting phase
      if (displayedText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 100); // Delete speed: 100ms per character

        return () => clearTimeout(timer);
      } else {
        // Finished deleting, switch to next language
        setIsDeleting(false);
        setCurrentLanguageIndex((prev) => (prev + 1) % languages.length);
      }
    } else if (isTyping) {
      // Typing phase
      if (currentCharIndex < currentText.length) {
        const timer = setTimeout(() => {
          setDisplayedText(currentText.slice(0, currentCharIndex + 1));
          setCurrentCharIndex(currentCharIndex + 1);
        }, 150); // Type speed: 150ms per character

        return () => clearTimeout(timer);
      } else {
        // Finished typing, wait 2 seconds then start deleting
        const timer = setTimeout(() => {
          setIsTyping(false);
          setIsDeleting(true);
        }, 2000);

        return () => clearTimeout(timer);
      }
    }
  }, [currentCharIndex, currentText, isTyping, isDeleting, displayedText, currentLanguageIndex]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-40 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 
            className="text-8xl md:text-9xl font-bold text-white font-mono"
            style={{
              textShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            {displayedText}
            <span className="inline-block w-2 h-20 bg-white ml-2 animate-pulse"></span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mt-4 font-light">
            {languages[currentLanguageIndex].language}
          </p>
        </div>
      </div>

      {/* Floating Particles - Only render on client to avoid hydration issues */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none">
          {particlePositions.map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-bounce"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
