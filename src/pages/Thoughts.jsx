import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NextSectionButton from '../components/UI/NextSectionButton';
import { personalInfo } from '../data/personalInfo';
import '../styles/thoughts.css';

export default function Thoughts({ onNext, onPrev }) {
  const paragraphs = personalInfo.thoughts || [];
  const [currentParaIndex, setCurrentParaIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [completedParas, setCompletedParas] = useState([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isDone || currentParaIndex >= paragraphs.length) {
      setIsDone(true);
      return;
    }

    const currentPara = paragraphs[currentParaIndex];

    if (currentCharIndex < currentPara.length) {
      const timer = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(timer);
    } else {
      // Completed current paragraph, pause then move to next
      const pauseTimer = setTimeout(() => {
        setCompletedParas((prev) => [...prev, currentPara]);
        setCurrentParaIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 450);
      return () => clearTimeout(pauseTimer);
    }
  }, [currentParaIndex, currentCharIndex, isDone, paragraphs]);

  // Handle skip to show all text immediately
  const handleSkip = () => {
    setCompletedParas(paragraphs);
    setIsDone(true);
    setCurrentParaIndex(paragraphs.length);
  };

  return (
    <section className="thoughts">
      {/* Gentle ambient glow behind the card (stationary, no flying icons) */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '350px',
          background: 'radial-gradient(ellipse, rgba(255, 217, 61, 0.08) 0%, rgba(255, 107, 107, 0.04) 50%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Header */}
      <motion.div
        className="thoughts__header section-container"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <h1 className="thoughts__title">
          <span className="gradient-text">Đôi Lời Tâm Sự</span> 💌
        </h1>
        <p className="thoughts__subtitle">
          Một chút nhắn nhủ từ tận đáy lòng gửi đến bạn...
        </p>
      </motion.div>

      {/* Letter Card */}
      <motion.div
        className="thoughts__card"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <div className="thoughts__quote-icon">❝</div>

        <div className="thoughts__content">
          {/* Previously finished paragraphs */}
          {completedParas.map((text, idx) => (
            <motion.p
              key={idx}
              className="thoughts__paragraph"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {text}
            </motion.p>
          ))}

          {/* Currently typing paragraph */}
          {!isDone && currentParaIndex < paragraphs.length && (
            <p className="thoughts__paragraph">
              {paragraphs[currentParaIndex].slice(0, currentCharIndex)}
              <span className="thoughts__cursor" />
            </p>
          )}
        </div>

        {/* Skip button if still typing */}
        {!isDone && (
          <div style={{ textAlign: 'right' }}>
            <button className="thoughts__skip-btn" onClick={handleSkip}>
              <span>Hiện tất cả</span> ⏩
            </button>
          </div>
        )}
      </motion.div>

      {/* Navigation Button — chỉ hiện khi chữ đã chạy hết */}
      <AnimatePresence>
        {isDone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 100 }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <NextSectionButton
              onClick={onNext}
              onPrev={onPrev}
              text="Khám phá về mình nào!"
              emoji="🤓"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
