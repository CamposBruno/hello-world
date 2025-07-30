import { useState, useEffect, useCallback, useMemo } from 'react';

interface UseTypingAnimationProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export function useTypingAnimation({
  texts,
  typingSpeed = 150,
  deletingSpeed = 100,
  pauseTime = 2000
}: UseTypingAnimationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentText = useMemo(() => texts[currentIndex], [texts, currentIndex]);

  const handleNextText = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % texts.length);
  }, [texts.length]);

  const handleTypingComplete = useCallback(() => {
    const timer = setTimeout(() => {
      setIsTyping(false);
      setIsDeleting(true);
    }, pauseTime);

    return () => clearTimeout(timer);
  }, [pauseTime]);

  const handleDeletingComplete = useCallback(() => {
    setIsDeleting(false);
    handleNextText();
  }, [handleNextText]);

  // Reset animation when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentCharIndex(0);
    setIsTyping(true);
    setIsDeleting(false);
  }, [currentIndex]);

  // Main animation logic
  useEffect(() => {
    if (isDeleting) {
      if (displayedText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, deletingSpeed);

        return () => clearTimeout(timer);
      } else {
        handleDeletingComplete();
      }
    } else if (isTyping) {
      if (currentCharIndex < currentText.length) {
        const timer = setTimeout(() => {
          setDisplayedText(currentText.slice(0, currentCharIndex + 1));
          setCurrentCharIndex(currentCharIndex + 1);
        }, typingSpeed);

        return () => clearTimeout(timer);
      } else {
        handleTypingComplete();
      }
    }
  }, [
    currentCharIndex,
    currentText,
    isTyping,
    isDeleting,
    displayedText,
    typingSpeed,
    deletingSpeed,
    handleNextText,
    handleTypingComplete,
    handleDeletingComplete
  ]);

  return {
    displayedText,
    currentIndex,
    isTyping,
    isDeleting
  };
} 