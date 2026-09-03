import { motion } from 'framer-motion';
import FloatingEmoji from '../components/Effects/FloatingEmoji';
import NextSectionButton from '../components/UI/NextSectionButton';
import { eventInfo } from '../data/personalInfo';
import '../styles/wishes.css';

import WishForm from '../components/UI/WishForm';

export default function Wishes({ onNext, onPrev }) {
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
        <WishForm scriptUrl={eventInfo.googleScriptUrl} />
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
            <span className="wishes__instruction-icon">📸</span>
            <span>Có thể đính kèm ảnh kỷ niệm (nếu có)</span>
          </div>
          <div className="wishes__instruction-item">
            <span className="wishes__instruction-icon">😂</span>
            <span>Lời chúc hài hước được ưu tiên 10 điểm!</span>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <NextSectionButton
        onClick={onNext}
        onPrev={onPrev}
        text="Xem thông tin sự kiện"
        emoji="🎉"
      />
    </section>
  );
}
