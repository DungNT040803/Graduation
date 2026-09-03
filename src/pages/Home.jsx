import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { GraduationCap, Particles, StarField } from '../components/3D/Scene3D';
import TypewriterText from '../components/UI/TypewriterText';
import FloatingEmoji from '../components/Effects/FloatingEmoji';
import NextSectionButton from '../components/UI/NextSectionButton';
import { personalInfo } from '../data/personalInfo';
import '../styles/home.css';

export default function Home({ onNext }) {
  const [capClicked, setCapClicked] = useState(false);

  const handleCapClick = () => {
    setCapClicked(true);
    setTimeout(() => setCapClicked(false), 2000);
  };

  return (
    <section className="home">
      {/* 3D Background */}
      <div className="home__canvas">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, 5, -5]} intensity={0.5} color="#FFD93D" />
          <pointLight position={[5, -5, 5]} intensity={0.3} color="#FF6B6B" />

          <Suspense fallback={null}>
            <GraduationCap onClick={handleCapClick} />
            <Particles />
            <StarField />
          </Suspense>
        </Canvas>
      </div>

      {/* Floating emojis */}
      <FloatingEmoji
        emojis={['🎓', '🎉', '🥳', '✨', '🎊', '💫']}
        count={8}
      />

      {/* Content */}
      <motion.div
        className="home__content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.div
          className="home__badge"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', bounce: 0.5 }}
        >
          🎓 Lời mời đặc biệt dành cho bạn!
        </motion.div>

        <h1 className="home__title">
          <span>Bạn được mời đến dự</span>
          <TypewriterText
            text={`Lễ Tốt Nghiệp của ${personalInfo.name}!`}
            speed={60}
            delay={800}
            className="home__title-highlight"
          />
        </h1>

        <motion.p
          className="home__subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          Đến chung vui với mình nhé! Có đồ ăn miễn phí đó 🍕🎂
        </motion.p>

        <NextSectionButton
          onClick={onNext}
          text="Tìm hiểu về mình nào!"
          emoji="🤓"
        />
      </motion.div>

      {/* Easter egg notification */}
      {capClicked && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          style={{
            position: 'fixed',
            bottom: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '12px 24px',
            background: 'rgba(255, 217, 61, 0.15)',
            border: '1px solid rgba(255, 217, 61, 0.3)',
            borderRadius: 'var(--radius-full)',
            color: 'var(--color-primary)',
            fontWeight: 600,
            fontSize: '0.9rem',
            zIndex: 50,
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(10px)',
          }}
        >
          🎓 Bạn vừa tung mũ tốt nghiệp! Woohoo! 🎊
        </motion.div>
      )}
    </section>
  );
}
