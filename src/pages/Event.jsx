import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import CountdownTimer from '../components/UI/CountdownTimer';
import FloatingEmoji from '../components/Effects/FloatingEmoji';
import { eventInfo } from '../data/personalInfo';
import '../styles/event.css';

import RSVPModal from '../components/UI/RSVPModal';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};

export default function Event({ onPrev }) {
  const [rsvpHover, setRsvpHover] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const eventDate = new Date(eventInfo.date);
  const formattedDate = eventDate.toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = eventDate.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleRSVP = () => {
    setShowConfetti(true);
    setIsModalOpen(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const details = [
    { icon: '📅', label: 'Ngày diễn ra', value: formattedDate },
    { icon: '⏰', label: 'Thời gian bắt đầu', value: formattedTime },
    { icon: '📍', label: 'Địa điểm', value: eventInfo.location },
    { icon: '🎉', label: 'Sự kiện', value: eventInfo.title },
  ];

  return (
    <section className="event">
      <FloatingEmoji
        emojis={['🎉', '🎊', '🥳', '🍕', '🎂', '🎈']}
        count={8}
      />

      {/* Back button */}
      {onPrev && (
        <motion.button
          onClick={onPrev}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'fixed',
            top: '24px',
            left: '24px',
            zIndex: 80,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.2rem',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '9999px',
            color: 'var(--color-text-muted)',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
          }}
        >
          <FiArrowLeft /> Quay lại
        </motion.button>
      )}

      {/* Header */}
      <motion.div
        className="event__header section-container"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h1 className="event__title">
          <span className="gradient-text">Sự Kiện</span> 🎉
        </h1>
        <p className="event__subtitle">{eventInfo.description}</p>
      </motion.div>

      {/* Countdown */}
      <motion.div
        className="event__countdown"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <CountdownTimer targetDate={eventInfo.date} />
      </motion.div>

      {/* Event Details */}
      <div className="event__details">
        <motion.div
          className="event__details-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {details.map((detail, index) => (
            <motion.div
              key={index}
              className="event__detail-card glass-card"
              variants={itemVariants}
            >
              <div className="event__detail-icon">{detail.icon}</div>
              <div className="event__detail-content">
                <div className="event__detail-label">{detail.label}</div>
                <div className="event__detail-value">{detail.value}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Google Maps */}
      <motion.div
        className="event__map"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="event__map-card glass-card">
          <h3 className="event__map-title">📍 Bản đồ đường đi</h3>
          <iframe
            className="event__map-iframe"
            src={eventInfo.mapEmbedUrl}
            title="Google Maps - Địa điểm tổ chức"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </motion.div>

      {/* RSVP Section */}
      <motion.div
        className="event__rsvp"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <div className="event__rsvp-card glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
          {showConfetti && (
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: '50%', y: '50%', scale: 1, opacity: 1 }}
                  animate={{
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    scale: 0,
                    opacity: 0,
                    rotate: Math.random() * 720,
                  }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    width: 6 + Math.random() * 8,
                    height: 6 + Math.random() * 8,
                    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                    background: ['#FFD93D', '#FF6B6B', '#6BCB77', '#A66CFF', '#4ECDC4'][
                      Math.floor(Math.random() * 5)
                    ],
                  }}
                />
              ))}
            </div>
          )}

          <h2 className="event__rsvp-title">Bạn có đến không? 🤔</h2>
          <p className="event__rsvp-subtitle">Nhấn nút bên dưới để cho mình biết nhé!</p>

          <motion.button
            className="event__rsvp-btn"
            onClick={handleRSVP}
            onMouseEnter={() => setRsvpHover(true)}
            onMouseLeave={() => setRsvpHover(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="event__rsvp-btn-text">
              {rsvpHover ? 'Đi chứ!' : 'Tham dự'}
            </span>
            <span className="event__rsvp-btn-emoji">
              {rsvpHover ? '🎊' : '🤔'}
            </span>
          </motion.button>

          <p className="event__rsvp-note">
            * Bấm để điền thông tin nhanh gọn trực tiếp tại đây!
          </p>

          <div className="event__rsvp-dresscode">
            👔 Dress code: {eventInfo.dressCode}
          </div>
        </div>
      </motion.div>

      {/* RSVP Modal */}
      <RSVPModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        scriptUrl={eventInfo.googleScriptUrl}
      />

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        style={{
          textAlign: 'center',
          padding: '3rem 1rem',
          color: 'var(--color-text-muted)',
          fontSize: '0.9rem',
        }}
      >
        <p>Cảm ơn bạn đã ghé thăm! 💕</p>
        <p style={{ marginTop: '0.5rem', fontSize: '2rem' }}>🎓🎉🥳</p>
      </motion.div>
    </section>
  );
}
