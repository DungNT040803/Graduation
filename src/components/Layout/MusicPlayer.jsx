import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiVolume2, FiVolumeX, FiMusic } from 'react-icons/fi';

const containerStyle = {
  position: 'fixed',
  bottom: '24px',
  right: '24px',
  zIndex: 90,
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const buttonStyle = {
  width: '54px',
  height: '54px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.4rem',
  cursor: 'pointer',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
};

const playingStyle = {
  ...buttonStyle,
  background: 'linear-gradient(135deg, #FFD93D, #FF6B6B)',
  boxShadow: '0 0 25px rgba(255, 217, 61, 0.4)',
  color: '#0F0E17',
};

const mutedStyle = {
  ...buttonStyle,
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(12px)',
  color: '#A0A0B0',
};

const pulseRingStyle = {
  position: 'absolute',
  inset: '-4px',
  borderRadius: '50%',
  border: '2px solid rgba(255, 217, 61, 0.5)',
};

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Khởi tạo audio từ file background.mp3
    const audio = new Audio('./music/background.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Hàm cố gắng phát nhạc
    const attemptPlay = () => {
      if (!audioRef.current) return;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          // Gỡ bỏ các event listeners sau khi đã phát thành công
          removeInteractionListeners();
        })
        .catch(() => {
          // Trình duyệt chặn autoplay khi chưa có tương tác
          setIsPlaying(false);
        });
    };

    // 1. Thử phát ngay lập tức khi vào trang
    attemptPlay();

    // 2. Nếu trình duyệt chặn, phát ngay khi người dùng chạm/click/cuộn bất kỳ đâu
    const interactionEvents = ['click', 'touchstart', 'scroll', 'keydown', 'pointerdown'];

    const onUserInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        attemptPlay();
      }
    };

    interactionEvents.forEach((event) => {
      window.addEventListener(event, onUserInteraction, { once: true, passive: true });
    });

    const removeInteractionListeners = () => {
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, onUserInteraction);
      });
    };

    return () => {
      removeInteractionListeners();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip hiển thị tên bài & trạng thái */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(15, 14, 23, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#EAEAEA',
              fontSize: '0.8rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            }}
          >
            {isPlaying ? '🎵 Đang phát nhạc nền (Nhấp để tắt)' : '🔇 Đã tắt nhạc (Nhấp để bật)'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nút Play / Pause */}
      <motion.button
        style={isPlaying ? playingStyle : mutedStyle}
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={isPlaying ? 'Tắt nhạc 🔇' : 'Bật nhạc 🎵'}
      >
        {isPlaying && (
          <motion.div
            style={pulseRingStyle}
            animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        
        {/* Biểu tượng đĩa xoay khi đang phát */}
        {isPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <FiMusic />
          </motion.div>
        ) : (
          <FiVolumeX />
        )}
      </motion.button>
    </div>
  );
}
