import { motion } from 'framer-motion';
import FloatingEmoji from '../components/Effects/FloatingEmoji';
import NextSectionButton from '../components/UI/NextSectionButton';
import { personalInfo } from '../data/personalInfo';
import '../styles/about.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 15 },
  },
};

const infoItems = [
  { icon: '👤', label: 'Họ tên', value: personalInfo.name, tooltipKey: 'name' },
  { icon: '🎂', label: 'Ngày sinh', value: personalInfo.birthday, tooltipKey: 'birthday' },
  { icon: '🏫', label: 'Trường', value: personalInfo.school, tooltipKey: 'school' },
  { icon: '📚', label: 'Khoa', value: personalInfo.faculty, tooltipKey: 'faculty' },
  { icon: '💻', label: 'Chuyên ngành', value: personalInfo.major, tooltipKey: 'major' },
  { icon: '🏠', label: 'Quê quán', value: personalInfo.hometown, tooltipKey: 'hometown' },
  { icon: '❤️', label: 'Tình trạng', value: personalInfo.relationshipStatus, tooltipKey: 'relationshipStatus' },
];

export default function AboutMe({ onNext, onPrev }) {
  return (
    <section className="about">
      <FloatingEmoji
        emojis={['⭐', '✨', '💫', '🌟', '😎']}
        count={6}
      />

      {/* Header */}
      <motion.div
        className="about__header section-container"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h1 className="about__title">
          <span className="gradient-text">Về Tôi</span> 🤓
        </h1>
        <p className="about__subtitle">
          Đây là người sắp tốt nghiệp (cuối cùng cũng tốt nghiệp được 😅)
        </p>
      </motion.div>

      {/* Profile Section */}
      <div className="about__profile">
        {/* Avatar */}
        <motion.div
          className="about__avatar-wrapper"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="about__avatar-card">
            {personalInfo.avatar ? (
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="about__avatar-img"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const placeholder = e.currentTarget.parentElement.querySelector('.about__avatar-placeholder');
                  if (placeholder) placeholder.style.display = 'flex';
                }}
              />
            ) : null}
            <div
              className="about__avatar-placeholder"
              style={{ display: personalInfo.avatar ? 'none' : 'flex' }}
            >
              🎓
            </div>
          </div>
          <motion.div
            className="about__avatar-tag"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Sắp ra trường 🎉
          </motion.div>
        </motion.div>

        {/* Info Items */}
        <motion.div
          className="about__info"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {infoItems.map((item) => (
            <motion.div
              key={item.label}
              className="about__info-item"
              variants={itemVariants}
            >
              <div className="about__info-icon">{item.icon}</div>
              <div>
                <div className="about__info-label">{item.label}</div>
                <div className="about__info-value">{item.value}</div>
              </div>
              {personalInfo.funnyTooltips[item.tooltipKey] && (
                <div className="about__tooltip">
                  {personalInfo.funnyTooltips[item.tooltipKey]}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Hobbies */}
      <div className="about__hobbies">
        <motion.h2
          className="about__section-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="gradient-text-secondary">Sở thích</span> 😏
        </motion.h2>

        <motion.div
          className="about__hobbies-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {personalInfo.hobbies.map((hobby, index) => (
            <motion.div
              key={index}
              className="about__hobby-chip"
              variants={chipVariants}
            >
              <span className="about__hobby-emoji">{hobby.emoji}</span>
              <span>{hobby.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Motto */}
      <motion.div
        className="about__motto glass-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <span className="about__motto-icon about__motto-icon--left">💬</span>
        <p className="about__motto-quote">&ldquo;{personalInfo.motto}&rdquo;</p>
        <span className="about__motto-icon about__motto-icon--right">💬</span>
      </motion.div>

      {/* Future Goals */}
      <div className="about__goals">
        <motion.h2
          className="about__section-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="gradient-text-purple">Mục tiêu tương lai</span> 🚀
        </motion.h2>

        <motion.div
          className="about__goals-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {personalInfo.futureGoals.map((goal, index) => (
            <motion.div
              key={index}
              className="about__goal-card glass-card"
              variants={itemVariants}
            >
              <div className="about__goal-icon">{goal.icon}</div>
              <div className="about__goal-text">{goal.text}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation */}
      <NextSectionButton
        onClick={onNext}
        onPrev={onPrev}
        text="Gửi lời chúc cho mình nhé!"
        emoji="💌"
      />
    </section>
  );
}
