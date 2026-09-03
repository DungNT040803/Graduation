import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MusicPlayer from './components/Layout/MusicPlayer';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import Wishes from './pages/Wishes';
import Event from './pages/Event';

// Hiệu ứng chuyển cảnh
const pageTransitions = {
  // Slide từ phải + fade + zoom nhẹ
  slideRight: {
    initial: { opacity: 0, x: '100%', scale: 0.9 },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      x: '-50%',
      scale: 0.85,
      filter: 'blur(8px)',
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  },
  // Zoom in từ center
  zoomIn: {
    initial: { opacity: 0, scale: 0.3, borderRadius: '50%' },
    animate: {
      opacity: 1,
      scale: 1,
      borderRadius: '0%',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      scale: 1.5,
      filter: 'blur(12px)',
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  },
  // Slide lên từ dưới
  slideUp: {
    initial: { opacity: 0, y: '100%' },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: '-100%',
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  },
  // Flip card
  flipIn: {
    initial: { opacity: 0, rotateY: 90, transformPerspective: 1200 },
    animate: {
      opacity: 1,
      rotateY: 0,
      transformPerspective: 1200,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      rotateY: -90,
      transformPerspective: 1200,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  },
};

// Mỗi trang dùng 1 hiệu ứng khác nhau
const transitionPerStep = [
  pageTransitions.zoomIn,      // Home → About: zoom in
  pageTransitions.slideRight,  // About → Wishes: slide
  pageTransitions.slideUp,     // Wishes → Event: slide up
  pageTransitions.flipIn,      // (fallback)
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, delay: 0.3 },
  },
};

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = useCallback(() => {
    if (currentStep >= 3 || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentStep((prev) => prev + 1);
    // Scroll to top of new page
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(() => setIsTransitioning(false), 800);
  }, [currentStep, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (currentStep <= 0 || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(() => setIsTransitioning(false), 800);
  }, [currentStep, isTransitioning]);

  const steps = [
    <Home key="home" onNext={goToNext} />,
    <AboutMe key="about" onNext={goToNext} onPrev={goToPrev} />,
    <Wishes key="wishes" onNext={goToNext} onPrev={goToPrev} />,
    <Event key="event" onPrev={goToPrev} />,
  ];

  const transition = transitionPerStep[currentStep] || transitionPerStep[0];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: '#0F0E17' }}>
      <MusicPlayer />

      {/* Step indicator */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%)',
          zIndex: 80,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {[0, 1, 2, 3].map((step) => (
          <motion.div
            key={step}
            style={{
              width: step === currentStep ? '12px' : '8px',
              height: step === currentStep ? '32px' : '8px',
              borderRadius: '6px',
              background:
                step === currentStep
                  ? 'linear-gradient(135deg, #FFD93D, #FF6B6B)'
                  : 'rgba(255,255,255,0.2)',
              transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              cursor: 'default',
            }}
            title={['Trang chủ', 'Về tôi', 'Lời chúc', 'Sự kiện'][step]}
          />
        ))}
      </div>

      {/* Transition overlay flash */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'radial-gradient(circle, rgba(255,217,61,0.05) 0%, transparent 70%)',
              zIndex: 50,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Page content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={transition}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            position: 'relative',
            minHeight: '100vh',
            willChange: 'transform, opacity',
          }}
        >
          {steps[currentStep]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
