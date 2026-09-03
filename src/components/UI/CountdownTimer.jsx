import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [flipping, setFlipping] = useState({});

  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();

      // Detect which units changed for flip animation
      const changed = {};
      Object.keys(newTime).forEach((key) => {
        if (newTime[key] !== timeLeft[key]) {
          changed[key] = true;
        }
      });

      setFlipping(changed);
      setTimeLeft(newTime);

      // Reset flip after animation
      setTimeout(() => setFlipping({}), 400);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, targetDate]);

  const units = [
    { key: 'days', label: 'Ngày' },
    { key: 'hours', label: 'Giờ' },
    { key: 'minutes', label: 'Phút' },
    { key: 'seconds', label: 'Giây' },
  ];

  const isExpired = Object.values(timeLeft).every((v) => v === 0);

  if (isExpired) {
    return (
      <motion.div
        className="event__countdown-card glass-card"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        style={{ textAlign: 'center', padding: '3rem' }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉🎊🥳</div>
        <h2 className="gradient-text" style={{ fontSize: '2rem' }}>
          Tiệc đã bắt đầu rồi!
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
          Nhanh chân lên nào! 🏃‍♂️💨
        </p>
      </motion.div>
    );
  }

  return (
    <div className="event__countdown-card glass-card">
      <p className="event__countdown-label">⏰ Đếm ngược tới giờ G...</p>
      <div className="event__countdown-timer">
        {units.map((unit, index) => (
          <div key={unit.key} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
            <motion.div
              className="event__countdown-unit"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span
                className={`event__countdown-number ${
                  flipping[unit.key] ? 'flip' : ''
                }`}
              >
                {String(timeLeft[unit.key]).padStart(2, '0')}
              </span>
              <span className="event__countdown-text">{unit.label}</span>
            </motion.div>
            {index < units.length - 1 && (
              <span className="event__countdown-separator">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
