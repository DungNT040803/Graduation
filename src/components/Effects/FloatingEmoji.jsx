import { useMemo, memo } from 'react';
import { motion } from 'framer-motion';

// Floating emoji background decoration - memoized to prevent re-renders when parent states change
function FloatingEmoji({ emojis = ['💕', '✨', '🌟', '💫', '🎉'], count = 10 }) {
  const emojiKey = Array.isArray(emojis) ? emojis.join('') : '';

  const items = useMemo(() => {
    const list = Array.isArray(emojis) && emojis.length > 0 ? emojis : ['✨', '🎉'];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: list[i % list.length],
      left: `${(i / count) * 90 + Math.random() * 8}%`,
      size: 1.1 + (i % 3) * 0.4,
      duration: 12 + (i % 5) * 2,
      delay: (i * 1.2) % 8,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emojiKey, count]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          style={{
            position: 'absolute',
            left: item.left,
            bottom: '-60px',
            fontSize: `${item.size}rem`,
            opacity: 0,
          }}
          animate={{
            y: [0, -window.innerHeight - 120],
            opacity: [0, 0.4, 0.4, 0],
            rotate: [0, 180],
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

export default memo(FloatingEmoji);
