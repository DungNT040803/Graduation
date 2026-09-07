import { useMemo } from 'react';
import { motion } from 'framer-motion';

// ========================================================
// 🌌 Galaxy Transition: Nebula, Warp Stars, Meteors & Sparkles
// ========================================================

export default function GalaxyTransition({ direction = 1 }) {
  // Generate a randomized set of warp stars
  const warpStars = useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 96 + 2}%`,
      startY: (Math.random() - 0.5) * 40,
      size: 2 + Math.random() * 4,
      color: [
        '#FFFFFF',
        '#A66CFF', // Cosmic Purple
        '#4ECDC4', // Celestial Cyan
        '#FFD93D', // Golden Star
        '#FF6B6B', // Nebula Pink
        '#82B1FF', // Soft Blue
      ][Math.floor(Math.random() * 6)],
      delay: Math.random() * 0.18,
      duration: 0.55 + Math.random() * 0.25,
      scaleX: 3 + Math.random() * 4, // Warp stretch
    }));
  }, []);

  // Generate 4 shooting stars (meteors)
  const meteors = useMemo(() => {
    return [
      { top: '22%', delay: 0.05, length: 140, speed: 0.6, yAngle: 25 },
      { top: '48%', delay: 0.12, length: 180, speed: 0.55, yAngle: -20 },
      { top: '70%', delay: 0.08, length: 160, speed: 0.65, yAngle: 15 },
      { top: '85%', delay: 0.18, length: 120, speed: 0.58, yAngle: -30 },
    ];
  }, []);

  // Constellation 4-point sparkle stars (✦)
  const sparkles = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: `${15 + Math.random() * 70}%`,
      top: `${12 + Math.random() * 76}%`,
      size: 14 + Math.random() * 14,
      delay: 0.1 + Math.random() * 0.3,
      color: ['#FFE270', '#FFFFFF', '#C09DFF', '#80DEEA'][i % 4],
    }));
  }, []);

  const dir = direction > 0 ? 1 : -1;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 80,
        overflow: 'hidden',
      }}
    >
      {/* ----------------------------------------------------
          1. NEBULA CORE VORTEX (Cosmic Dust Cloud)
      ---------------------------------------------------- */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.5,
          rotate: 0,
        }}
        animate={{
          opacity: [0, 0.85, 0.85, 0],
          scale: [0.5, 1.4, 2],
          rotate: dir * 45,
        }}
        transition={{
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          width: '750px',
          height: '550px',
          marginLeft: '-375px',
          marginTop: '-275px',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(166, 108, 255, 0.35) 0%, rgba(78, 205, 196, 0.22) 35%, rgba(255, 217, 61, 0.15) 55%, transparent 75%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Second swirling galaxy spiral arm */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.6,
          rotate: -20,
        }}
        animate={{
          opacity: [0, 0.7, 0.7, 0],
          scale: [0.6, 1.5, 1.9],
          rotate: dir * -60,
        }}
        transition={{
          duration: 0.85,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.05,
        }}
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          width: '850px',
          height: '450px',
          marginLeft: '-425px',
          marginTop: '-225px',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(255, 107, 107, 0.25) 0%, rgba(166, 108, 255, 0.18) 40%, transparent 75%)',
          filter: 'blur(70px)',
        }}
      />

      {/* ----------------------------------------------------
          2. HYPERSPACE WARP STARS (Speed-Streaking Stars)
      ---------------------------------------------------- */}
      {warpStars.map((star) => (
        <motion.div
          key={star.id}
          initial={{
            x: dir > 0 ? '-15vw' : '115vw',
            y: star.startY,
            opacity: 0,
            scaleX: 1,
            scaleY: 1,
          }}
          animate={{
            x: dir > 0 ? '115vw' : '-15vw',
            y: star.startY * -1,
            opacity: [0, 1, 1, 0],
            scaleX: star.scaleX,
            scaleY: 0.8,
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            position: 'absolute',
            top: star.top,
            left: 0,
            width: star.size,
            height: star.size,
            borderRadius: '50%',
            background: star.color,
            boxShadow: `0 0 10px ${star.color}, 0 0 20px ${star.color}`,
            transformOrigin: dir > 0 ? 'left center' : 'right center',
          }}
        />
      ))}

      {/* ----------------------------------------------------
          3. METEORS / SHOOTING STARS
      ---------------------------------------------------- */}
      {meteors.map((meteor, idx) => (
        <motion.div
          key={`meteor-${idx}`}
          initial={{
            x: dir > 0 ? '-20vw' : '120vw',
            y: -meteor.yAngle,
            opacity: 0,
          }}
          animate={{
            x: dir > 0 ? '125vw' : '-25vw',
            y: meteor.yAngle,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: meteor.speed,
            delay: meteor.delay,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          style={{
            position: 'absolute',
            top: meteor.top,
            left: 0,
            width: meteor.length,
            height: '2px',
            background:
              dir > 0
                ? 'linear-gradient(90deg, transparent 0%, rgba(166,108,255,0.4) 30%, rgba(78,205,196,0.8) 70%, #FFFFFF 100%)'
                : 'linear-gradient(-90deg, transparent 0%, rgba(166,108,255,0.4) 30%, rgba(78,205,196,0.8) 70%, #FFFFFF 100%)',
            boxShadow: '0 0 16px rgba(78, 205, 196, 0.9), 0 0 6px #FFFFFF',
            borderRadius: '9999px',
          }}
        />
      ))}

      {/* ----------------------------------------------------
          4. CONSTELLATION ✦ SPARKLES
      ---------------------------------------------------- */}
      {sparkles.map((sp) => (
        <motion.div
          key={`sparkle-${sp.id}`}
          initial={{
            scale: 0,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            scale: [0, 1.4, 0],
            opacity: [0, 1, 0],
            rotate: dir * 180,
          }}
          transition={{
            duration: 0.65,
            delay: sp.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            position: 'absolute',
            left: sp.left,
            top: sp.top,
            fontSize: sp.size,
            color: sp.color,
            lineHeight: 1,
            textShadow: `0 0 12px ${sp.color}, 0 0 24px rgba(255,255,255,0.8)`,
          }}
        >
          ✦
        </motion.div>
      ))}

      {/* ----------------------------------------------------
          5. COSMIC RIPPLE WAVE (Soft expanding ring)
      ---------------------------------------------------- */}
      <motion.div
        initial={{
          scale: 0.2,
          opacity: 0,
        }}
        animate={{
          scale: [0.2, 1.8],
          opacity: [0, 0.45, 0],
        }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '500px',
          height: '500px',
          marginLeft: '-250px',
          marginTop: '-250px',
          borderRadius: '50%',
          border: '1.5px solid rgba(166, 108, 255, 0.6)',
          boxShadow:
            '0 0 30px rgba(78, 205, 196, 0.4), inset 0 0 30px rgba(166, 108, 255, 0.3)',
        }}
      />
    </div>
  );
}
