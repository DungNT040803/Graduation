import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/personalInfo';

// ==========================================
// 🔊 Synthesized Web Audio Sound Effects
// ==========================================
function playAudioEffects() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // 1. Crisp Wax Seal Crack (0ms)
    const crackTime = ctx.currentTime;
    const crackBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
    const crackData = crackBuffer.getChannelData(0);
    for (let i = 0; i < crackData.length; i++) {
      crackData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (crackData.length * 0.15));
    }
    const crackSource = ctx.createBufferSource();
    crackSource.buffer = crackBuffer;
    const crackFilter = ctx.createBiquadFilter();
    crackFilter.type = 'highpass';
    crackFilter.frequency.setValueAtTime(2500, crackTime);
    crackSource.connect(crackFilter);
    crackFilter.connect(ctx.destination);
    crackSource.start(crackTime);

    // 2. Paper Flap Whoosh (250ms)
    const flapTime = crackTime + 0.25;
    const flapSize = Math.floor(ctx.sampleRate * 0.35);
    const flapBuffer = ctx.createBuffer(1, flapSize, ctx.sampleRate);
    const flapData = flapBuffer.getChannelData(0);
    for (let i = 0; i < flapSize; i++) {
      const env = Math.sin((i / flapSize) * Math.PI);
      flapData[i] = (Math.random() * 2 - 1) * env * 0.25;
    }
    const flapSource = ctx.createBufferSource();
    flapSource.buffer = flapBuffer;
    const flapFilter = ctx.createBiquadFilter();
    flapFilter.type = 'bandpass';
    flapFilter.frequency.setValueAtTime(1400, flapTime);
    flapFilter.Q.setValueAtTime(0.8, flapTime);
    flapSource.connect(flapFilter);
    flapFilter.connect(ctx.destination);
    flapSource.start(flapTime);

    // 3. Ascending Magical Chime Arpeggio (650ms) - Pentatonic celebration
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      const oscTime = crackTime + 0.65 + idx * 0.09;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, oscTime);

      gain.gain.setValueAtTime(0.001, oscTime);
      gain.gain.exponentialRampToValueAtTime(0.18, oscTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, oscTime + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(oscTime);
      osc.stop(oscTime + 0.6);
    });

    // 4. Subtle low boom / swell on reveal (1.8s)
    const boomTime = crackTime + 1.8;
    const boomOsc = ctx.createOscillator();
    const boomGain = ctx.createGain();
    boomOsc.type = 'triangle';
    boomOsc.frequency.setValueAtTime(90, boomTime);
    boomOsc.frequency.exponentialRampToValueAtTime(40, boomTime + 0.8);
    boomGain.gain.setValueAtTime(0.2, boomTime);
    boomGain.gain.exponentialRampToValueAtTime(0.001, boomTime + 0.8);
    boomOsc.connect(boomGain);
    boomGain.connect(ctx.destination);
    boomOsc.start(boomTime);
    boomOsc.stop(boomTime + 0.85);

    setTimeout(() => ctx.close().catch(() => {}), 3200);
  } catch {
    // Graceful fallback if Web Audio is restricted
  }
}

// ==========================================
// ✨ Golden Sparkle Particles (Around Card)
// ==========================================
function GoldenSparklesBurst({ count = 28 }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 40 }}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * 360 * (Math.PI / 180);
        const distance = 90 + Math.random() * 180;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance - 80;
        const size = 3 + Math.random() * 6;
        const isStar = i % 3 === 0;

        return (
          <motion.div
            key={i}
            initial={{
              x: '50%',
              y: '45%',
              scale: 0,
              opacity: 1,
            }}
            animate={{
              x: `calc(50% + ${endX}px)`,
              y: `calc(45% + ${endY}px)`,
              scale: [0, 1.4, 0],
              opacity: [0, 1, 0],
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: 1.2 + Math.random() * 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.7 + Math.random() * 0.25,
            }}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: isStar ? '0' : '50%',
              background: isStar
                ? '#FFF9D2'
                : 'radial-gradient(circle, #FFE270 0%, #FFB800 80%, transparent 100%)',
              boxShadow: '0 0 12px rgba(255, 217, 61, 0.9)',
            }}
          />
        );
      })}
    </div>
  );
}

// ==========================================
// 💥 Wax Shards Exploding from Broken Seal
// ==========================================
function WaxSealShards({ count = 12 }) {
  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', pointerEvents: 'none', zIndex: 60 }}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * 360 * (Math.PI / 180) + (Math.random() - 0.5);
        const distance = 60 + Math.random() * 120;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        const size = 6 + Math.random() * 10;

        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
            animate={{
              x: endX,
              y: endY,
              scale: 0,
              opacity: 0,
              rotate: Math.random() * 720 - 360,
            }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: 'absolute',
              width: size,
              height: size * 0.7,
              borderRadius: '3px',
              background: 'linear-gradient(135deg, #FFA000, #E65100)',
              boxShadow: '0 2px 8px rgba(230, 81, 0, 0.7)',
            }}
          />
        );
      })}
    </div>
  );
}

// ==========================================
// 🎉 Confetti Burst (Full Screen)
// ==========================================
function ConfettiBurst({ count = 85 }) {
  const colors = [
    '#FFD93D',
    '#FF6B6B',
    '#6BCB77',
    '#A66CFF',
    '#4ECDC4',
    '#FF9A9E',
    '#FFC069',
    '#FFFFFF',
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 120 }}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = Math.random() * 360 * (Math.PI / 180);
        const distance = 180 + Math.random() * 650;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance - 240;
        const size = 5 + Math.random() * 9;
        const isRibbon = Math.random() > 0.6;

        return (
          <motion.div
            key={i}
            initial={{
              x: '50vw',
              y: '50vh',
              scale: 0.5,
              opacity: 1,
              rotate: 0,
            }}
            animate={{
              x: `calc(50vw + ${endX}px)`,
              y: `calc(50vh + ${endY}px)`,
              scale: [0.5, 1.2, 0],
              opacity: [1, 1, 0],
              rotate: Math.random() * 1080 - 540,
            }}
            transition={{
              duration: 1.8 + Math.random() * 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 1.1 + Math.random() * 0.2,
            }}
            style={{
              position: 'absolute',
              width: size,
              height: isRibbon ? size * 3 : size,
              borderRadius: isRibbon ? '2px' : '50%',
              background: colors[Math.floor(Math.random() * colors.length)],
              boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
            }}
          />
        );
      })}
    </div>
  );
}

// ==========================================
// 🌌 Floating Background Sparkles
// ==========================================
function FloatingSparkles() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -28, 0],
            opacity: [0.15, 0.7, 0.15],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 3.5 + Math.random() * 3,
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
            background: `rgba(255, 217, 61, ${0.4 + Math.random() * 0.4})`,
            boxShadow: '0 0 8px rgba(255, 217, 61, 0.5)',
          }}
        />
      ))}
    </div>
  );
}

// ==========================================
// 💌 Main EnvelopeIntro Component
// ==========================================
export default function EnvelopeIntro({ onOpen }) {
  // Step sequence: 0 = idle, 1 = cracked seal, 2 = flap opening, 3 = card rising, 4 = flash transition
  const [animStep, setAnimStep] = useState(0);
  const isOpening = animStep > 0;

  const handleOpen = () => {
    if (isOpening) return;

    // Step 1: Crack seal + Sound
    setAnimStep(1);
    playAudioEffects();

    // Step 2: Flap flip open
    setTimeout(() => {
      setAnimStep(2);
    }, 280);

    // Step 3: Card slides up & sparkles burst
    setTimeout(() => {
      setAnimStep(3);
    }, 650);

    // Step 4: Final white flash & zoom-through
    setTimeout(() => {
      setAnimStep(4);
    }, 2150);

    // Complete transition to main app
    setTimeout(() => {
      onOpen();
    }, 2750);
  };

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at 50% 40%, #1c1533 0%, #0c0a15 80%)',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Background ambience */}
      <FloatingSparkles />

      <div
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '750px',
          height: '550px',
          background:
            'radial-gradient(ellipse, rgba(255, 217, 61, 0.12) 0%, rgba(166, 108, 255, 0.08) 40%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Confetti (Step 3+) */}
      <AnimatePresence>{animStep >= 3 && <ConfettiBurst count={90} />}</AnimatePresence>

      {/* Title & Prompt */}
      <AnimatePresence>
        {!isOpening && (
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -35, filter: 'blur(10px)', transition: { duration: 0.4 } }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              textAlign: 'center',
              marginBottom: '2.5rem',
              position: 'relative',
              zIndex: 30,
            }}
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, -3, 3, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                fontSize: '3.2rem',
                marginBottom: '0.8rem',
                filter: 'drop-shadow(0 6px 16px rgba(255, 217, 61, 0.3))',
              }}
            >
              ✉️
            </motion.div>
            <h1
              style={{
                fontSize: 'clamp(1.7rem, 5.2vw, 2.7rem)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #FFE270 0%, #FF9A76 50%, #FF6B6B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem',
                filter: 'drop-shadow(0 2px 12px rgba(255, 107, 107, 0.2))',
              }}
            >
              Bạn có một lời mời đặc biệt
            </h1>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.65)',
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.02em',
              }}
            >
              Chạm vào phong bì để khám phá bức thư bí mật ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================
          ENVELOPE 3D WRAPPER
      ==================================================== */}
      <motion.div
        onClick={handleOpen}
        initial={{ opacity: 0, scale: 0.8, y: 35 }}
        animate={
          animStep === 4
            ? {
                scale: 2.2,
                opacity: 0,
                filter: 'blur(16px)',
                y: -60,
              }
            : animStep >= 3
            ? {
                scale: 1.05,
                y: 10,
                filter: 'blur(0px)',
              }
            : animStep === 1
            ? {
                // Subtle camera shake on seal break
                x: [-3, 4, -3, 2, 0],
                y: [0, -2, 2, 0],
                scale: 1.02,
              }
            : {
                // Idle gentle floating
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
                filter: 'blur(0px)',
              }
        }
        transition={
          animStep === 4
            ? { duration: 0.65, ease: [0.65, 0, 0.35, 1] }
            : animStep === 1
            ? { duration: 0.25 }
            : animStep === 0
            ? {
                opacity: { duration: 0.6 },
                scale: { duration: 0.6 },
                y: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
              }
            : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        }
        whileHover={!isOpening ? { scale: 1.06, cursor: 'pointer' } : {}}
        style={{
          position: 'relative',
          width: 'clamp(290px, 78vw, 380px)',
          height: 'clamp(195px, 50vw, 250px)',
          perspective: '1200px',
          zIndex: 20,
        }}
      >
        {/* Ambient Halo Glow around envelope */}
        <motion.div
          animate={{
            opacity: isOpening ? [0.4, 0.9, 0.4] : [0.3, 0.6, 0.3],
            scale: isOpening ? [1, 1.15, 1] : [1, 1.05, 1],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: '-20px',
            borderRadius: '24px',
            background:
              'radial-gradient(circle, rgba(255, 217, 61, 0.35) 0%, rgba(255, 107, 107, 0.15) 50%, transparent 80%)',
            filter: 'blur(25px)',
            pointerEvents: 'none',
          }}
        />

        {/* ----------------------------------------------------
            1. ENVELOPE BACK PLATE & INTERIOR LINING
        ---------------------------------------------------- */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            background: 'linear-gradient(155deg, #1c142b 0%, #291b40 50%, #150f24 100%)',
            border: '1px solid rgba(255, 217, 61, 0.25)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.65), inset 0 2px 10px rgba(255,255,255,0.05)',
            overflow: 'visible',
          }}
        >
          {/* Subtle gold foil geometric diamond pattern inside liner */}
          <div
            style={{
              position: 'absolute',
              inset: '10px',
              borderRadius: '12px',
              border: '1px dashed rgba(255, 217, 61, 0.15)',
              background:
                'radial-gradient(circle at center, rgba(255, 217, 61, 0.04) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* ----------------------------------------------------
              2. INVITATION CARD (The Letter Sliding Up)
          ---------------------------------------------------- */}
          <motion.div
            initial={{ y: 8, scale: 0.92, opacity: 0 }}
            animate={
              animStep >= 3
                ? {
                    y: -150,
                    scale: 1.08,
                    opacity: 1,
                    rotateX: 0,
                    boxShadow:
                      '0 20px 45px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 217, 61, 0.4), inset 0 0 20px rgba(255, 217, 61, 0.15)',
                  }
                : animStep >= 2
                ? {
                    y: -30,
                    scale: 0.96,
                    opacity: 0.85,
                  }
                : {
                    y: 8,
                    scale: 0.92,
                    opacity: 0,
                  }
            }
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: 'absolute',
              top: '8%',
              left: '6%',
              right: '6%',
              height: '88%',
              background:
                'linear-gradient(135deg, #241a3d 0%, #1a132e 50%, #291a38 100%)',
              borderRadius: '12px',
              border: '1.5px solid rgba(255, 217, 61, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.2rem',
              zIndex: 25,
              pointerEvents: 'none',
              transformOrigin: 'bottom center',
              overflow: 'hidden',
            }}
          >
            {/* Card corner gold ornaments */}
            {['top: 6px; left: 6px', 'top: 6px; right: 6px', 'bottom: 6px; left: 6px', 'bottom: 6px; right: 6px'].map(
              (pos, idx) => (
                <span
                  key={idx}
                  style={{
                    position: 'absolute',
                    fontSize: '0.65rem',
                    color: '#FFE270',
                    opacity: 0.8,
                    ...Object.fromEntries(pos.split('; ').map((p) => p.split(': '))),
                  }}
                >
                  ✦
                </span>
              )
            )}

            {/* University Crest / Small Header */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#FFE270',
                fontWeight: 700,
                marginBottom: '0.4rem',
                borderBottom: '1px solid rgba(255, 217, 61, 0.3)',
                paddingBottom: '2px',
              }}
            >
              <span>🎓</span>
              <span>{personalInfo.school || 'ĐẠI HỌC FPT'}</span>
            </div>

            {/* Card Main Title */}
            <div
              style={{
                fontSize: 'clamp(1rem, 3.2vw, 1.35rem)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #FFF1A8, #FFD93D, #FF6B6B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
                lineHeight: 1.25,
                marginBottom: '0.35rem',
              }}
            >
              LỄ TỐT NGHIỆP
            </div>

            {/* Graduate Name */}
            <div
              style={{
                fontSize: 'clamp(1.15rem, 3.8vw, 1.45rem)',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '0.01em',
                textAlign: 'center',
                textShadow: '0 0 16px rgba(255, 217, 61, 0.6)',
                marginBottom: '0.25rem',
              }}
            >
              {personalInfo.name}
            </div>

            {/* Major & Year */}
            <div
              style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.75)',
                fontWeight: 500,
                textAlign: 'center',
              }}
            >
              {personalInfo.major} • Khóa 2022 - 2026
            </div>

            {/* Golden light sweep effect across card */}
            <motion.div
              animate={
                animStep >= 3
                  ? {
                      x: ['-120%', '220%'],
                    }
                  : {}
              }
              transition={{ duration: 1.4, delay: 0.3, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '60%',
                height: '100%',
                background:
                  'linear-gradient(105deg, transparent 30%, rgba(255, 255, 255, 0.35) 50%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
          </motion.div>

          {/* Golden Sparkles Fountain on reveal */}
          <AnimatePresence>{animStep >= 3 && <GoldenSparklesBurst count={30} />}</AnimatePresence>

          {/* ----------------------------------------------------
              3. ENVELOPE FRONT POCKET (Flaps forming the pocket)
          ---------------------------------------------------- */}
          {/* Left triangular flap */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: 'polygon(0% 0%, 53% 50%, 0% 100%)',
              background: 'linear-gradient(135deg, #2a1b42 0%, #1f1433 100%)',
              borderLeft: '1px solid rgba(255, 217, 61, 0.15)',
              zIndex: 18,
              pointerEvents: 'none',
            }}
          />

          {/* Right triangular flap */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: 'polygon(100% 0%, 47% 50%, 100% 100%)',
              background: 'linear-gradient(-135deg, #2a1b42 0%, #1f1433 100%)',
              borderRight: '1px solid rgba(255, 217, 61, 0.15)',
              zIndex: 18,
              pointerEvents: 'none',
            }}
          />

          {/* Bottom triangular pocket flap */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: 'polygon(0% 100%, 100% 100%, 50% 40%)',
              background: 'linear-gradient(180deg, #372456 0%, #201336 100%)',
              borderRadius: '0 0 16px 16px',
              borderBottom: '1px solid rgba(255, 217, 61, 0.25)',
              boxShadow: '0 -4px 18px rgba(0, 0, 0, 0.4)',
              zIndex: 20,
              pointerEvents: 'none',
            }}
          />

          {/* ----------------------------------------------------
              4. TOP ENVELOPE FLAP (Opens backward 180deg)
          ---------------------------------------------------- */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={
              animStep >= 2
                ? {
                    rotateX: -178,
                  }
                : { rotateX: 0 }
            }
            transition={{
              duration: 0.85,
              ease: [0.34, 1.25, 0.64, 1], // Spring physics feel
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '62%',
              clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
              background: 'linear-gradient(180deg, #3d2760 0%, #27183e 100%)',
              borderRadius: '16px 16px 0 0',
              transformOrigin: 'top center',
              zIndex: animStep >= 2 ? 8 : 30, // drops behind card once open
              backfaceVisibility: 'hidden',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.45)',
              borderTop: '1px solid rgba(255, 217, 61, 0.3)',
            }}
          />

          {/* Flap interior side (seen after flipping backward) */}
          <motion.div
            initial={{ rotateX: 180, opacity: 0 }}
            animate={
              animStep >= 2
                ? {
                    rotateX: 0,
                    opacity: 1,
                  }
                : { rotateX: 180, opacity: 0 }
            }
            transition={{
              duration: 0.85,
              ease: [0.34, 1.25, 0.64, 1],
            }}
            style={{
              position: 'absolute',
              top: '-61%',
              left: 0,
              width: '100%',
              height: '62%',
              clipPath: 'polygon(0% 100%, 100% 100%, 50% 0%)',
              background:
                'linear-gradient(0deg, #1b132c 0%, #2f1d4b 80%, #3e2663 100%)',
              transformOrigin: 'bottom center',
              zIndex: 6,
              pointerEvents: 'none',
            }}
          />

          {/* ----------------------------------------------------
              5. WAX SEAL & CRACK PARTICLES
          ---------------------------------------------------- */}
          <div
            style={{
              position: 'absolute',
              top: '52%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: animStep >= 2 ? 5 : 35,
              pointerEvents: 'none',
            }}
          >
            <AnimatePresence>
              {animStep === 0 && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{
                    scale: 1.3,
                    opacity: 0,
                    rotate: 30,
                    transition: { duration: 0.25 },
                  }}
                  whileHover={{ scale: 1.12 }}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Subtle pulsing ripple aura for idle state */}
                  <motion.div
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      border: '2px solid #FFD93D',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Wax Seal Body */}
                  <div
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle at 35% 35%, #FFE270 0%, #FFA800 50%, #D84315 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.1rem',
                      lineHeight: 1,
                      boxShadow:
                        '0 6px 24px rgba(216, 67, 21, 0.65), 0 0 30px rgba(255, 217, 61, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.5), inset 0 -3px 6px rgba(0,0,0,0.4)',
                      border: '2px solid rgba(255, 243, 176, 0.85)',
                    }}
                  >
                    🎓
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Shards burst when seal cracks */}
            {animStep >= 1 && animStep < 3 && <WaxSealShards count={14} />}
          </div>
        </div>
      </motion.div>

      {/* ====================================================
          CALL TO ACTION BUTTON (When Idle)
      ==================================================== */}
      <AnimatePresence>
        {!isOpening && (
          <motion.button
            onClick={handleOpen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, filter: 'blur(8px)', transition: { duration: 0.3 } }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{
              scale: 1.08,
              boxShadow: '0 0 45px rgba(255, 217, 61, 0.6), 0 10px 25px rgba(0,0,0,0.5)',
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              marginTop: '2.8rem',
              padding: '1.05rem 2.8rem',
              background: 'linear-gradient(135deg, #FFE270 0%, #FF9A76 50%, #FF6B6B 100%)',
              color: '#0F0E17',
              fontSize: '1.15rem',
              fontWeight: 800,
              fontFamily: 'var(--font-body)',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              boxShadow: '0 8px 30px rgba(255, 217, 61, 0.35)',
              position: 'relative',
              zIndex: 30,
              letterSpacing: '0.02em',
            }}
          >
            <span>Mở Thư Ngay</span>
            <motion.span
              animate={{ rotate: [0, -14, 14, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontSize: '1.4rem', display: 'inline-flex' }}
            >
              ✉️
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Opening status text */}
      <AnimatePresence>
        {isOpening && animStep < 4 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              marginTop: '2.4rem',
              textAlign: 'center',
              position: 'relative',
              zIndex: 30,
            }}
          >
            <motion.p
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{
                color: '#FFE270',
                fontSize: '1.15rem',
                fontWeight: 700,
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.04em',
                textShadow: '0 0 15px rgba(255, 217, 61, 0.5)',
              }}
            >
              {animStep === 1
                ? 'Đang mở con dấu...'
                : animStep === 2
                ? 'Đang mở phong bì... ✨'
                : 'Lời mời đang mở ra... 🎓🎉'}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================
          FULL-SCREEN WHITE FLASH TRANSITION (Grand Finale)
      ==================================================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={
          animStep === 4
            ? {
                opacity: [0, 0.95, 1],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          inset: 0,
          background:
            'radial-gradient(circle at center, #FFFFFF 0%, #FFFDF5 60%, #FFEFC0 100%)',
          zIndex: 999,
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}
