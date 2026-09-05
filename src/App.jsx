import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MusicPlayer from './components/Layout/MusicPlayer';
import EnvelopeIntro from './pages/EnvelopeIntro';
import Home from './pages/Home';
import Thoughts from './pages/Thoughts';
import AboutMe from './pages/AboutMe';
import Wishes from './pages/Wishes';
import Event from './pages/Event';

const EASE_OUT = [0.22, 1, 0.36, 1];
const EASE_IN_OUT = [0.65, 0, 0.35, 1];

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const directionRef = useRef(1);

  const handleIntroOpen = useCallback(() => {
    setShowIntro(false);
  }, []);

  const goToNext = useCallback(() => {
    if (currentStep >= 4 || isTransitioning) return;
    directionRef.current = 1;
    setIsTransitioning(true);
    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(() => setIsTransitioning(false), 900);
  }, [currentStep, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (currentStep <= 0 || isTransitioning) return;
    directionRef.current = -1;
    setIsTransitioning(true);
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(() => setIsTransitioning(false), 900);
  }, [currentStep, isTransitioning]);

  const steps = [
    <Home key="home" onNext={goToNext} />,
    <Thoughts key="thoughts" onNext={goToNext} onPrev={goToPrev} />,
    <AboutMe key="about" onNext={goToNext} onPrev={goToPrev} />,
    <Wishes key="wishes" onNext={goToNext} onPrev={goToPrev} />,
    <Event key="event" onPrev={goToPrev} />,
  ];

  const dir = directionRef.current;

  const pageVariants = {
    initial: {
      x: dir === 1 ? '80%' : '-80%',
      opacity: 0,
      scale: 0.88,
      rotateY: dir === 1 ? 15 : -15,
      filter: 'blur(8px) brightness(0.6)',
      transformPerspective: 1400,
      transformOrigin: dir === 1 ? 'left center' : 'right center',
    },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: 'blur(0px) brightness(1)',
      transformPerspective: 1400,
      transformOrigin: 'center center',
      transition: {
        duration: 0.8,
        ease: EASE_OUT,
        opacity: { duration: 0.5, ease: EASE_IN_OUT },
        filter: { duration: 0.6, ease: EASE_IN_OUT },
      },
    },
    exit: {
      x: dir === 1 ? '-40%' : '40%',
      opacity: 0,
      scale: 0.9,
      rotateY: dir === 1 ? -8 : 8,
      filter: 'blur(6px) brightness(0.5)',
      transformPerspective: 1400,
      transformOrigin: dir === 1 ? 'right center' : 'left center',
      transition: {
        duration: 0.55,
        ease: EASE_IN_OUT,
        opacity: { duration: 0.4, ease: 'easeIn' },
      },
    },
  };

  const shimmerVariants = {
    initial: { x: dir === 1 ? '-100%' : '100%', opacity: 0 },
    animate: {
      x: dir === 1 ? '200%' : '-200%',
      opacity: [0, 0.7, 0.7, 0],
      transition: { duration: 0.8, ease: EASE_IN_OUT },
    },
    exit: { opacity: 0, transition: { duration: 0.1 } },
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#0F0E17',
        perspective: '1400px',
      }}
    >
      {/* Music player — chỉ hiện sau khi mở thư */}
      {!showIntro && <MusicPlayer />}

      <AnimatePresence mode="wait">
        {showIntro ? (
          /* ===== Màn hình mở phong bì ===== */
          <motion.div
            key="envelope-intro"
            exit={{
              opacity: 0,
              scale: 1.1,
              filter: 'blur(16px) brightness(1.5)',
              transition: { duration: 0.8, ease: EASE_IN_OUT },
            }}
          >
            <EnvelopeIntro onOpen={handleIntroOpen} />
          </motion.div>
        ) : (
          /* ===== Main app flow ===== */
          <motion.div
            key="main-app"
            initial={{ opacity: 0, filter: 'blur(12px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: EASE_OUT }}
            style={{ minHeight: '100vh' }}
          >
            {/* Step indicator */}
            <div
              style={{
                position: 'fixed',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 80,
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                padding: '8px 16px',
                background: 'rgba(15, 14, 23, 0.6)',
                backdropFilter: 'blur(12px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              {[0, 1, 2, 3, 4].map((step) => (
                <motion.div
                  key={step}
                  animate={{
                    width: step === currentStep ? 32 : 8,
                    background:
                      step === currentStep
                        ? 'linear-gradient(135deg, #FFD93D, #FF6B6B)'
                        : 'rgba(255,255,255,0.2)',
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.68, -0.55, 0.265, 1.55],
                  }}
                  style={{
                    height: '8px',
                    borderRadius: '6px',
                    cursor: 'default',
                  }}
                  title={['Trang chủ', 'Tâm sự', 'Về tôi', 'Lời chúc', 'Sự kiện'][step]}
                />
              ))}
            </div>

            {/* Shimmer */}
            <AnimatePresence>
              {isTransitioning && (
                <motion.div
                  key={`shimmer-${currentStep}`}
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '40%',
                    height: '100%',
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(255,217,61,0.04) 20%, rgba(255,217,61,0.12) 50%, rgba(255,217,61,0.04) 80%, transparent 100%)',
                    zIndex: 60,
                    pointerEvents: 'none',
                  }}
                />
              )}
            </AnimatePresence>

            {/* Page content */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentStep}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                  position: 'relative',
                  minHeight: '100vh',
                  willChange: 'transform, opacity, filter',
                  transformStyle: 'preserve-3d',
                }}
              >
                {steps[currentStep]}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

