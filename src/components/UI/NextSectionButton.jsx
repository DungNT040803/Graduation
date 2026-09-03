import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  padding: '3rem 1rem',
  flexWrap: 'wrap',
};

const nextBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '1rem 2.5rem',
  background: 'linear-gradient(135deg, #FFD93D, #FF6B6B)',
  color: '#0F0E17',
  fontSize: '1.1rem',
  fontWeight: 700,
  fontFamily: 'var(--font-body)',
  borderRadius: '9999px',
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 0 20px rgba(255, 217, 61, 0.3)',
  position: 'relative',
  overflow: 'hidden',
};

const prevBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.75rem 1.5rem',
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(12px)',
  color: 'var(--color-text-muted)',
  fontSize: '0.9rem',
  fontWeight: 600,
  fontFamily: 'var(--font-body)',
  borderRadius: '9999px',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  cursor: 'pointer',
};

export default function NextSectionButton({
  onClick,
  onPrev,
  text = 'Tiếp tục',
  emoji = '👉',
}) {
  return (
    <div style={wrapperStyle}>
      {onPrev && (
        <motion.button
          style={prevBtnStyle}
          onClick={onPrev}
          whileHover={{
            scale: 1.05,
            background: 'rgba(255, 255, 255, 0.12)',
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <FiArrowLeft />
          <span>Quay lại</span>
        </motion.button>
      )}

      <motion.button
        style={nextBtnStyle}
        onClick={onClick}
        whileHover={{
          scale: 1.08,
          boxShadow: '0 0 40px rgba(255, 217, 61, 0.5)',
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
      >
        <span>{text}</span>
        <motion.span
          style={{ fontSize: '1.3rem', display: 'inline-flex' }}
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {emoji}
        </motion.span>
      </motion.button>
    </div>
  );
}
