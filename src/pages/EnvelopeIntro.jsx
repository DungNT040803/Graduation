import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Confetti particle component
function ConfettiBurst({ count = 60 }) {
  const colors = ['#FFD93D', '#FF6B6B', '#6BCB77', '#A66CFF', '#4ECDC4', '#FF9A9E', '#FECFEF'];
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100 }}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const distance = 200 + Math.random() * 500;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance - 200;
        const size = 4 + Math.random() * 10;
        const isCircle = Math.random() > 0.5;
        return (
          <motion.div
            key={i}
            initial={{
              x: '50vw',
              y: '50vh',
              scale: 1,
              opacity: 1,
              rotate: 0,
            }}
            animate={{
              x: `calc(50vw + ${endX}px)`,
              y: `calc(50vh + ${endY}px)`,
              scale: 0,
              opacity: 0,
              rotate: Math.random() * 1080,
            }}
            transition={{
              duration: 1.5 + Math.random() * 1,
              ease: [0.22, 1, 0.36, 1],
              delay: Math.random() * 0.2,
            }}
            style={{
              position: 'absolute',
              width: size,
              height: isCircle ? size : size * 2.5,
              borderRadius: isCircle ? '50%' : '2px',
              background: colors[Math.floor(Math.random() * colors.length)],
            }}
          />
        );
      })}
    </div>
  );
}

// Floating sparkle particles in the background
function FloatingSparkles() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 2 + Math.random() * 4,
            height: 2 + Math.random() * 4,
            borderRadius: '50%',
            background: `rgba(255, 217, 61, ${0.3 + Math.random() * 0.4})`,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}

export default function EnvelopeIntro({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef(null);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    setShowConfetti(true);

    // Synthesized paper-open / whoosh sound via Web Audio API
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      // White noise burst (paper crinkle feel)
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Envelope: quick attack, slow decay
        const env = Math.exp(-i / (bufferSize * 0.15));
        data[i] = (Math.random() * 2 - 1) * env * 0.3;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      // Bandpass filter for paper-like texture
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 3000;
      filter.Q.value = 0.7;
      source.connect(filter);
      filter.connect(ctx.destination);
      source.start();
      // Cleanup
      source.onended = () => ctx.close();
    } catch {
      // Ignore audio errors
    }

    // Transition to main content after animation
    setTimeout(() => {
      onOpen();
    }, 2000);
  };

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0F0E17 70%)',
        position: 'relative',
        overflow: 'hidden',
        cursor: isOpening ? 'default' : 'pointer',
      }}
    >
      {/* Background sparkles */}
      <FloatingSparkles />

      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(255, 217, 61, 0.08) 0%, rgba(255, 107, 107, 0.04) 40%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Confetti burst */}
      <AnimatePresence>
        {showConfetti && <ConfettiBurst count={80} />}
      </AnimatePresence>

      {/* Title text */}
      <AnimatePresence>
        {!isOpening && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              textAlign: 'center',
              marginBottom: '2.5rem',
              position: 'relative',
              zIndex: 10,
            }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                fontSize: '3rem',
                marginBottom: '1rem',
              }}
            >
              💌
            </motion.div>
            <h1
              style={{
                fontSize: 'clamp(1.6rem, 5vw, 2.5rem)',
                fontFamily: 'var(--font-heading)',
                background: 'linear-gradient(135deg, #FFD93D, #FF6B6B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.8rem',
              }}
            >
              Bạn có một lời mời đặc biệt
            </h1>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
              }}
            >
              Nhấn để mở phong bì nhé! ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Envelope */}
      <motion.div
        onClick={handleOpen}
        style={{
          position: 'relative',
          width: 'clamp(260px, 70vw, 340px)',
          height: 'clamp(180px, 45vw, 230px)',
          cursor: isOpening ? 'default' : 'pointer',
          zIndex: 20,
          perspective: '800px',
        }}
        initial={{ opacity: 0, scale: 0.7, y: 30 }}
        animate={
          isOpening
            ? {
                opacity: 0,
                scale: 1.5,
                y: -100,
                filter: 'blur(12px)',
              }
            : {
                opacity: 1,
                scale: 1,
                y: 0,
                filter: 'blur(0px)',
              }
        }
        transition={
          isOpening
            ? { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }
            : { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }
        }
        whileHover={!isOpening ? { scale: 1.05, y: -5 } : {}}
      >
        {/* Envelope glow */}
        <motion.div
          animate={
            !isOpening
              ? {
                  boxShadow: [
                    '0 0 30px rgba(255, 217, 61, 0.2), 0 20px 60px rgba(0,0,0,0.4)',
                    '0 0 50px rgba(255, 217, 61, 0.35), 0 20px 60px rgba(0,0,0,0.4)',
                    '0 0 30px rgba(255, 217, 61, 0.2), 0 20px 60px rgba(0,0,0,0.4)',
                  ],
                }
              : {}
          }
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            pointerEvents: 'none',
          }}
        />

        {/* Envelope body */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(145deg, #2a1f3d 0%, #1e1533 50%, #15112a 100%)',
            border: '1px solid rgba(255, 217, 61, 0.2)',
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Envelope inner pattern */}
          <div
            style={{
              position: 'absolute',
              inset: '8px',
              border: '1px dashed rgba(255, 217, 61, 0.12)',
              borderRadius: '10px',
              pointerEvents: 'none',
            }}
          />

          {/* Wax seal / center decoration */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 6,
            }}
          >
            <motion.div
              animate={!isOpening ? { rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFD93D, #FF6B6B)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                lineHeight: 1,
                boxShadow: '0 4px 20px rgba(255, 107, 107, 0.4), inset 0 -2px 4px rgba(0,0,0,0.2)',
              }}
            >
              🎓
            </motion.div>
          </div>

          {/* Envelope flap (top triangle) */}
          <motion.div
            animate={
              isOpening
                ? { rotateX: -180, y: -10 }
                : {}
            }
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '50%',
              background: 'linear-gradient(180deg, #352a4a 0%, #2a1f3d 100%)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              borderRadius: '16px 16px 0 0',
              transformOrigin: 'top center',
              zIndex: 5,
              borderBottom: '1px solid rgba(255, 217, 61, 0.15)',
            }}
          />

          {/* "Card" peeking out when opening */}
          <AnimatePresence>
            {isOpening && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: -40, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute',
                  top: '20%',
                  left: '10%',
                  right: '10%',
                  height: '60%',
                  background: 'linear-gradient(135deg, rgba(255,217,61,0.15), rgba(255,107,107,0.1))',
                  border: '1px solid rgba(255, 217, 61, 0.3)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  color: '#FFD93D',
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                  zIndex: 3,
                }}
              >
                Lời mời tốt nghiệp 🎓
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* CTA button */}
      <AnimatePresence>
        {!isOpening && (
          <motion.button
            onClick={handleOpen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            transition={{ duration: 0.5, delay: 1 }}
            whileHover={{
              scale: 1.08,
              boxShadow: '0 0 40px rgba(255, 217, 61, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              marginTop: '2.5rem',
              padding: '1rem 2.5rem',
              background: 'linear-gradient(135deg, #FFD93D, #FF6B6B)',
              color: '#0F0E17',
              fontSize: '1.1rem',
              fontWeight: 700,
              fontFamily: 'var(--font-body)',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 0 20px rgba(255, 217, 61, 0.3)',
              position: 'relative',
              zIndex: 10,
            }}
          >
            <span>Mở thư</span>
            <motion.span
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontSize: '1.4rem', display: 'inline-flex' }}
            >
              ✉️
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* "Opening..." text after click */}
      <AnimatePresence>
        {isOpening && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              marginTop: '2rem',
              color: '#FFD93D',
              fontSize: '1.1rem',
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              position: 'relative',
              zIndex: 10,
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              Đang mở thư... ✨
            </motion.span>
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
