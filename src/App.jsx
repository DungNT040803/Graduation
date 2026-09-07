import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MusicPlayer from './components/Layout/MusicPlayer';
import GalaxyTransition from './components/Effects/GalaxyTransition';
import EnvelopeIntro from './pages/EnvelopeIntro';
import Home from './pages/Home';
import Thoughts from './pages/Thoughts';
import AboutMe from './pages/AboutMe';
import Wishes from './pages/Wishes';
import Event from './pages/Event';

// ==========================================
// 🔊 Cosmic Web Audio Page Turn Sound
// ==========================================
function playPageTurnSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // 1. Soft cosmic breeze sweep
    const bufferSize = Math.floor(ctx.sampleRate * 0.28);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const envelope = Math.sin((i / bufferSize) * Math.PI);
      data[i] = (Math.random() * 2 - 1) * envelope * 0.12;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, ctx.currentTime);
    filter.Q.setValueAtTime(0.8, ctx.currentTime);
    source.connect(filter);
    filter.connect(ctx.destination);
    source.start();

    // 2. Delicate starry bell tone (A5 -> E6)
    [880, 1318.51].forEach((freq, idx) => {
      const oscTime = ctx.currentTime + 0.04 + idx * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, oscTime);
      gain.gain.setValueAtTime(0.0001, oscTime);
      gain.gain.exponentialRampToValueAtTime(0.05, oscTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, oscTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(oscTime);
      osc.stop(oscTime + 0.4);
    });

    setTimeout(() => ctx.close().catch(() => {}), 600);
  } catch {
    // Ignore audio errors
  }
}

// ==========================================
// 🌟 3D Dimensional Page Variants
// ==========================================
const EASE_NATURAL = [0.16, 1, 0.3, 1]; // Ultra-smooth Apple-grade curve
const EASE_OUT_EX = [0.4, 0, 0.2, 1];

const pageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    scale: 0.94,
    rotateY: direction > 0 ? 12 : -12,
    opacity: 0,
    filter: 'blur(10px) brightness(0.7)',
    transformPerspective: 1500,
    transformOrigin: direction > 0 ? 'left center' : 'right center',
    boxShadow:
      direction > 0
        ? '-45px 0 90px rgba(0, 0, 0, 0.85), -8px 0 30px rgba(255, 217, 61, 0.3)'
        : '45px 0 90px rgba(0, 0, 0, 0.85), 8px 0 30px rgba(255, 217, 61, 0.3)',
    zIndex: 2,
  }),
  center: {
    x: 0,
    scale: 1,
    rotateY: 0,
    opacity: 1,
    filter: 'blur(0px) brightness(1)',
    transformPerspective: 1500,
    transformOrigin: 'center center',
    boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
    zIndex: 1,
    transition: {
      x: { duration: 0.75, ease: EASE_NATURAL },
      scale: { duration: 0.75, ease: EASE_NATURAL },
      rotateY: { duration: 0.75, ease: EASE_NATURAL },
      opacity: { duration: 0.45, ease: 'easeOut' },
      filter: { duration: 0.55, ease: 'easeOut' },
      boxShadow: { duration: 0.75 },
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? '-35%' : '35%',
    scale: 0.88,
    rotateY: direction > 0 ? -10 : 10,
    opacity: 0,
    filter: 'blur(12px) brightness(0.35)',
    transformPerspective: 1500,
    transformOrigin: direction > 0 ? 'right center' : 'left center',
    zIndex: 0,
    transition: {
      x: { duration: 0.65, ease: EASE_OUT_EX },
      scale: { duration: 0.65, ease: EASE_OUT_EX },
      rotateY: { duration: 0.65, ease: EASE_OUT_EX },
      opacity: { duration: 0.45, ease: 'easeIn' },
      filter: { duration: 0.55, ease: 'easeIn' },
    },
  }),
};


const STEP_NAMES = [
  'Trang Chủ',
  'Đôi Lời Tâm Sự',
  'Về Tôi',
  'Lời Chúc',
  'Sự Kiện',
];

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleIntroOpen = useCallback(() => {
    setShowIntro(false);
  }, []);

  const goToNext = useCallback(() => {
    if (currentStep >= 4 || isTransitioning) return;
    setDirection(1);
    setIsTransitioning(true);
    playPageTurnSound();
    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(() => setIsTransitioning(false), 850);
  }, [currentStep, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (currentStep <= 0 || isTransitioning) return;
    setDirection(-1);
    setIsTransitioning(true);
    playPageTurnSound();
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(() => setIsTransitioning(false), 850);
  }, [currentStep, isTransitioning]);

  const steps = [
    <Home key="home" onNext={goToNext} />,
    <Thoughts key="thoughts" onNext={goToNext} onPrev={goToPrev} />,
    <AboutMe key="about" onNext={goToNext} onPrev={goToPrev} />,
    <Wishes key="wishes" onNext={goToNext} onPrev={goToPrev} />,
    <Event key="event" onPrev={goToPrev} />,
  ];

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#0F0E17',
        perspective: '1500px',
      }}
    >
      {/* Background ambient gradient glow */}
      <div
        style={{
          position: 'fixed',
          top: '-15%',
          left: '20%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(166, 108, 255, 0.05) 0%, rgba(255, 107, 107, 0.03) 50%, transparent 80%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Music player — only shown after opening letter */}
      {!showIntro && <MusicPlayer />}

      <AnimatePresence mode="wait">
        {showIntro ? (
          /* ===== Màn hình mở phong bì ===== */
          <motion.div
            key="envelope-intro"
            exit={{
              opacity: 0,
              scale: 1.15,
              filter: 'blur(20px) brightness(1.6)',
              transition: { duration: 0.75, ease: [0.65, 0, 0.35, 1] },
            }}
          >
            <EnvelopeIntro onOpen={handleIntroOpen} />
          </motion.div>
        ) : (
          /* ===== Main app flow ===== */
          <motion.div
            key="main-app"
            initial={{ opacity: 0, filter: 'blur(16px)', scale: 1.04 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 0.95, ease: EASE_NATURAL }}
            style={{ minHeight: '100vh', position: 'relative' }}
          >
            {/* ====================================================
                🌌 GALAXY COSMIC WARP TRANSITION
            ==================================================== */}
            <AnimatePresence>
              {isTransitioning && (
                <GalaxyTransition
                  key={`galaxy-${currentStep}`}
                  direction={direction}
                />
              )}
            </AnimatePresence>

            {/* ====================================================
                PAGE TRANSITION CONTAINER
            ==================================================== */}
            <div
              style={{
                position: 'relative',
                minHeight: '100vh',
                width: '100%',
                overflow: 'hidden',
              }}
            >
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{
                    position: 'relative',
                    width: '100%',
                    minHeight: '100vh',
                    willChange: 'transform, opacity, filter',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {steps[currentStep]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ====================================================
                DELUXE STEP INDICATOR (TOP OF PAGE)
            ==================================================== */}
            <div
              style={{
                position: 'fixed',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 90,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                background: 'rgba(15, 14, 26, 0.82)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 217, 61, 0.25)',
                boxShadow:
                  '0 8px 32px rgba(0, 0, 0, 0.55), 0 0 18px rgba(255, 217, 61, 0.12)',
              }}
            >
              {STEP_NAMES.map((name, stepIdx) => {
                const isActive = stepIdx === currentStep;
                return (
                  <motion.div
                    key={stepIdx}
                    animate={{
                      width: isActive ? 'auto' : '8px',
                      height: isActive ? '24px' : '8px',
                      borderRadius: isActive ? '9999px' : '50%',
                      background: isActive
                        ? 'linear-gradient(135deg, #FFE270 0%, #FFA800 50%, #FF6B6B 100%)'
                        : 'rgba(255, 255, 255, 0.25)',
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.34, 1.25, 0.64, 1],
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      padding: isActive ? '0 12px' : 0,
                      boxShadow: isActive ? '0 0 14px rgba(255, 217, 61, 0.6)' : 'none',
                    }}
                    title={`${stepIdx + 1}. ${name}`}
                  >
                    {isActive && (
                      <span
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 800,
                          color: '#0F0E17',
                          whiteSpace: 'nowrap',
                          letterSpacing: '0.03em',
                          textTransform: 'uppercase',
                          lineHeight: 1,
                        }}
                      >
                        {stepIdx + 1}/{STEP_NAMES.length} • {name}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
