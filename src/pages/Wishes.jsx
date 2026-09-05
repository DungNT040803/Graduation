import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingEmoji from '../components/Effects/FloatingEmoji';
import NextSectionButton from '../components/UI/NextSectionButton';
import { eventInfo } from '../data/personalInfo';
import '../styles/wishes.css';

import WishForm from '../components/UI/WishForm';

export default function Wishes({ onNext, onPrev }) {
  const [wishSent, setWishSent] = useState(false);

  return (
    <section className="wishes">
      {/* Floating decorations */}
      <FloatingEmoji
        emojis={['💕', '💖', '✨', '🌟', '💫', '🎀', '💝']}
        count={10}
      />

      {/* Header */}
      <motion.div
        className="wishes__header section-container"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h1 className="wishes__title">
          <span className="gradient-text">Gửi Lời Chúc</span> 💌
        </h1>
        <p className="wishes__subtitle">
          Gửi lời yêu thương cho mình nhé! Mỗi lời chúc đều là động lực to lớn 💕
        </p>
      </motion.div>

      {/* Custom Wish Form */}
      <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
        <WishForm scriptUrl={eventInfo.googleScriptUrl} onSuccess={() => setWishSent(true)} />
      </div>

      {/* Instructions */}
      <motion.div
        className="wishes__instructions"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="wishes__instructions-card glass-card">
          <div className="wishes__instruction-item">
            <span className="wishes__instruction-icon">📝</span>
            <span>Viết lời chúc chân thành từ trái tim</span>
          </div>
          <div className="wishes__instruction-item">
            <span className="wishes__instruction-icon">😂</span>
            <span>Lời chúc hài hước được ưu tiên 10 điểm!</span>
          </div>
        </div>
      </motion.div>

      {/* Navigation — chỉ hiện khi đã gửi lời chúc */}
      <AnimatePresence>
        {wishSent ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 100 }}
          >
            <NextSectionButton
              onClick={onNext}
              onPrev={onPrev}
              text="Xem thông tin sự kiện"
              emoji="🎉"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{
              textAlign: 'center',
              padding: '2rem 1rem',
              color: 'var(--color-text-muted)',
              fontSize: '0.9rem',
            }}
          >
            ✍️ Gửi lời chúc để mở khóa trang tiếp theo nhé!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
