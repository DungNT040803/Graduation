import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TypewriterText({ text, speed = 50, delay = 0, className = '' }) {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        // Blink cursor then hide
        setTimeout(() => setShowCursor(false), 2000);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, started]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
    >
      {displayedText}
      {showCursor && started && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            display: 'inline-block',
            width: '3px',
            height: '1em',
            background: 'var(--color-primary)',
            marginLeft: '2px',
            verticalAlign: 'text-bottom',
          }}
        />
      )}
    </motion.span>
  );
}
