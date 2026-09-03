import { useMemo } from 'react';
import { motion } from 'framer-motion';

// Floating emoji background decoration
export default function FloatingEmoji({ emojis = ['💕', '✨', '🌟', '💫', '🎉'], count = 12 }) {
  const items = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 1.5,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 8,
    }));
  }, [emojis, count]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          style={{
            position: 'absolute',
            left: item.left,
            bottom: '-50px',
            fontSize: `${item.size}rem`,
            opacity: 0,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            opacity: [0, 0.6, 0.6, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}
