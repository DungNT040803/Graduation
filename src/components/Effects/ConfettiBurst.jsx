import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Creates a confetti burst at click position
export default function ConfettiBurst() {
  const [bursts, setBursts] = useState([]);

  const createBurst = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const colors = ['#FFD93D', '#FF6B6B', '#6BCB77', '#A66CFF', '#4ECDC4', '#FF8E8E'];
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      x,
      y,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: (Math.PI * 2 * i) / 20 + (Math.random() - 0.5),
      speed: 50 + Math.random() * 100,
      size: 4 + Math.random() * 8,
      isCircle: Math.random() > 0.5,
    }));

    const burstId = Date.now();
    setBursts((prev) => [...prev, { id: burstId, particles }]);

    // Clean up after animation
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== burstId));
    }, 1500);
  }, []);

  return {
    trigger: createBurst,
    ConfettiOverlay: () => (
      <AnimatePresence>
        {bursts.map((burst) => (
          <div
            key={burst.id}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              overflow: 'hidden',
              zIndex: 100,
            }}
          >
            {burst.particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{
                  x: p.x,
                  y: p.y,
                  scale: 1,
                  opacity: 1,
                }}
                animate={{
                  x: p.x + Math.cos(p.angle) * p.speed,
                  y: p.y + Math.sin(p.angle) * p.speed + 50,
                  scale: 0,
                  opacity: 0,
                  rotate: Math.random() * 720,
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  borderRadius: p.isCircle ? '50%' : '2px',
                }}
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    ),
  };
}
