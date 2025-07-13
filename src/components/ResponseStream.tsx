import React, { useState, useEffect } from 'react';

interface ResponseStreamProps {
  textStream: string;
  fadeDuration?: number;
  segmentDelay?: number;
  className?: string;
  onComplete?: () => void;
}

export const ResponseStream: React.FC<ResponseStreamProps> = ({
  textStream,
  fadeDuration = 1200,
  segmentDelay = 100,
  className = '',
  onComplete
}) => {
  const [visibleWords, setVisibleWords] = useState<number>(0);
  const words = textStream.split(' ');

  useEffect(() => {
    setVisibleWords(0);
    
    const timer = setInterval(() => {
      setVisibleWords(prev => {
        if (prev < words.length) {
          return prev + 1;
        } else {
          clearInterval(timer);
          if (onComplete) onComplete();
          return prev;
        }
      });
    }, segmentDelay);

    return () => clearInterval(timer);
  }, [textStream, segmentDelay, words.length, onComplete]);

  return (
    <div className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block transition-opacity duration-${fadeDuration} ${
            index < visibleWords ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transitionDuration: `${fadeDuration}ms`
          }}
        >
          {word}{index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </div>
  );
};