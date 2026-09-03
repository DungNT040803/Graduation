import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiHeart, FiSend, FiCheck } from 'react-icons/fi';

const formCardStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '2rem',
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '1.5rem',
};

const inputStyle = {
  width: '100%',
  padding: '0.85rem 1rem',
  background: 'rgba(255,255,255,0.06)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgba(255,255,255,0.1)',
  borderRadius: '0.75rem',
  color: '#EAEAEA',
  fontSize: '1rem',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'border-color 0.3s, box-shadow 0.3s',
};

const inputFocusStyle = {
  ...inputStyle,
  borderColor: 'rgba(255, 107, 107, 0.5)',
  boxShadow: '0 0 0 3px rgba(255, 107, 107, 0.1)',
};

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: '#A0A0B0',
  marginBottom: '0.5rem',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const submitBtnStyle = {
  width: '100%',
  padding: '1rem',
  background: 'linear-gradient(135deg, #FF6B6B, #A66CFF)',
  color: '#fff',
  fontSize: '1.1rem',
  fontWeight: 700,
  fontFamily: 'var(--font-body)',
  borderRadius: '0.75rem',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  marginTop: '1.5rem',
};

export default function WishForm({ scriptUrl }) {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState(null);
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setStatus('submitting');

    try {
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          type: 'wish',
          name: formData.name.trim(),
          message: formData.message.trim(),
          timestamp: new Date().toLocaleString('vi-VN'),
        }),
      });

      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', message: '' });
      }, 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const isValid = formData.name.trim() && formData.message.trim();

  if (status === 'success') {
    return (
      <motion.div
        style={{ ...formCardStyle, textAlign: 'center', padding: '3rem 2rem' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: '4rem', marginBottom: '1rem' }}
        >
          💕
        </motion.div>
        <h3 style={{ fontSize: '1.4rem', color: '#FF6B6B', marginBottom: '0.5rem' }}>
          Đã gửi lời chúc thành công!
        </h3>
        <p style={{ color: '#A0A0B0' }}>
          Cảm ơn bạn rất nhiều! Lời chúc của bạn rất có ý nghĩa 🥰
        </p>
        <motion.div
          style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '1.5rem' }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✨💖✨
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      style={formCardStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={labelStyle}>
            <FiUser size={14} /> Tên của bạn <span style={{ color: '#FF6B6B' }}>*</span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="Bạn là ai nè? 😊"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            style={focusedField === 'name' ? inputFocusStyle : inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={labelStyle}>
            <FiHeart size={14} /> Lời chúc <span style={{ color: '#FF6B6B' }}>*</span>
          </label>
          <textarea
            name="message"
            placeholder="Viết lời chúc từ trái tim... 💕&#10;(Lời chúc hài hước được cộng 10 điểm! 😂)"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            rows={5}
            style={{
              ...(focusedField === 'message' ? inputFocusStyle : inputStyle),
              resize: 'vertical',
              minHeight: '120px',
            }}
            required
          />
        </div>

        <motion.button
          type="submit"
          style={{
            ...submitBtnStyle,
            opacity: status === 'submitting' || !isValid ? 0.6 : 1,
            cursor: status === 'submitting' || !isValid ? 'not-allowed' : 'pointer',
          }}
          disabled={status === 'submitting' || !isValid}
          whileHover={isValid ? { scale: 1.02, boxShadow: '0 0 30px rgba(255,107,107,0.4)' } : {}}
          whileTap={isValid ? { scale: 0.98 } : {}}
        >
          {status === 'submitting' ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{ width: 20, height: 20, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%' }}
              />
              Đang gửi...
            </>
          ) : status === 'error' ? (
            <>❌ Lỗi, thử lại nhé!</>
          ) : (
            <>
              <FiSend /> Gửi lời chúc 💌
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
