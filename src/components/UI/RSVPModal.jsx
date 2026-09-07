import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiPhone, FiUsers, FiMessageSquare, FiSend, FiCheck } from 'react-icons/fi';

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.7)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 200,
  padding: '1rem',
};

const modalStyle = {
  width: '100%',
  maxWidth: '480px',
  maxHeight: '90vh',
  overflowY: 'auto',
  background: 'linear-gradient(135deg, rgba(26,26,46,0.98), rgba(22,33,62,0.98))',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '1.5rem',
  padding: '2rem',
  position: 'relative',
};

const closeBtnStyle = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#A0A0B0',
  cursor: 'pointer',
  fontSize: '1.1rem',
};

const inputGroupStyle = {
  marginBottom: '1.25rem',
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
  borderColor: 'rgba(255, 217, 61, 0.5)',
  boxShadow: '0 0 0 3px rgba(255, 217, 61, 0.1)',
};

const selectStyle = {
  ...inputStyle,
  cursor: 'pointer',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23A0A0B0' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 1rem center',
  paddingRight: '2.5rem',
};

const submitBtnStyle = {
  width: '100%',
  padding: '1rem',
  background: 'linear-gradient(135deg, #FFD93D, #FF6B6B)',
  color: '#0F0E17',
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

const disabledBtnStyle = {
  ...submitBtnStyle,
  opacity: 0.6,
  cursor: 'not-allowed',
};

const genderOptions = [
  { value: '', label: 'Chọn giới tính...' },
  { value: 'Nam', label: '👨 Nam' },
  { value: 'Nữ', label: '👩 Nữ' },
  { value: 'Khác', label: '🌈 Khác' },
];

const relationshipOptions = [
  { value: 'Đồng nghiệp', label: 'Đồng nghiệp', icon: '💼' },
  { value: 'Bạn bè', label: 'Bạn bè', icon: '🎉' },
  { value: 'Gia đình', label: 'Gia đình', icon: '🏡' },
];

export default function RSVPModal({ isOpen, onClose, scriptUrl }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relationship: 'Bạn bè',
    gender: '',
    guests: '1',
    note: '',
  });
  const [focusedField, setFocusedField] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setStatus('submitting');

    try {
      // Gửi data đến Google Apps Script
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          type: 'rsvp',
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          relationship: formData.relationship,
          gender: formData.gender,
          guests: formData.guests,
          note: formData.note.trim(),
          timestamp: new Date().toLocaleString('vi-VN'),
        }),
      });

      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setFormData({ name: '', phone: '', relationship: 'Bạn bè', gender: '', guests: '1', note: '' });
      }, 2500);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const isValid = formData.name.trim() && formData.phone.trim();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={overlayStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            style={modalStyle}
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              style={closeBtnStyle}
              onClick={onClose}
              whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.9 }}
            >
              <FiX />
            </motion.button>

            {/* Success State */}
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '2rem 0' }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  style={{ fontSize: '4rem', marginBottom: '1rem' }}
                >
                  🎉
                </motion.div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#FFD93D' }}>
                  Đăng ký thành công!
                </h3>
                <p style={{ color: '#A0A0B0' }}>
                  Cảm ơn bạn! Hẹn gặp bạn tại buổi tiệc nhé 🥳
                </p>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎓</div>
                  <h2
                    style={{
                      fontSize: '1.4rem',
                      fontFamily: 'var(--font-heading)',
                      background: 'linear-gradient(135deg, #FFD93D, #FF6B6B)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Xác nhận tham dự
                  </h2>
                  <p style={{ color: '#A0A0B0', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    Điền thông tin để mình biết bạn đến nhé!
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>
                      <FiUser size={14} /> Họ tên <span style={{ color: '#FF6B6B' }}>*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Nhập họ tên của bạn..."
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      style={focusedField === 'name' ? inputFocusStyle : inputStyle}
                      required
                    />
                  </div>

                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>
                      <FiPhone size={14} /> Số điện thoại <span style={{ color: '#FF6B6B' }}>*</span>
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="0912 345 678"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      style={focusedField === 'phone' ? inputFocusStyle : inputStyle}
                      required
                    />
                  </div>

                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>
                      Bạn là...
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
                      {relationshipOptions.map((opt) => {
                        const isSelected = formData.relationship === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, relationship: opt.value }))}
                            style={{
                              padding: '0.65rem 0.4rem',
                              borderRadius: '0.75rem',
                              border: isSelected
                                ? '1.5px solid #FFD93D'
                                : '1px solid rgba(255, 255, 255, 0.1)',
                              background: isSelected
                                ? 'rgba(255, 217, 61, 0.18)'
                                : 'rgba(255, 255, 255, 0.05)',
                              color: isSelected ? '#FFD93D' : '#A0A0B0',
                              fontWeight: isSelected ? 700 : 500,
                              fontSize: '0.85rem',
                              fontFamily: 'var(--font-body)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '5px',
                              transition: 'all 0.2s ease',
                              boxShadow: isSelected ? '0 0 15px rgba(255, 217, 61, 0.25)' : 'none',
                            }}
                          >
                            <span>{opt.icon}</span>
                            <span>{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={inputGroupStyle}>
                      <label style={labelStyle}>Giới tính</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        style={selectStyle}
                      >
                        {genderOptions.map((opt) => (
                          <option key={opt.value} value={opt.value} style={{ background: '#1A1A2E' }}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div style={inputGroupStyle}>
                      <label style={labelStyle}>
                        <FiUsers size={14} /> Số người
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        style={selectStyle}
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={String(n)} style={{ background: '#1A1A2E' }}>
                            {n} người
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>
                      <FiMessageSquare size={14} /> Ghi chú
                    </label>
                    <textarea
                      name="note"
                      placeholder="Đến muộn hay bận gì không hoặc nhắn gì cho Dũng cũng được nhé... 😄"
                      value={formData.note}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('note')}
                      onBlur={() => setFocusedField(null)}
                      rows={3}
                      style={{
                        ...(focusedField === 'note' ? inputFocusStyle : inputStyle),
                        resize: 'vertical',
                        minHeight: '80px',
                      }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    style={status === 'submitting' || !isValid ? disabledBtnStyle : submitBtnStyle}
                    disabled={status === 'submitting' || !isValid}
                    whileHover={isValid ? { scale: 1.02, boxShadow: '0 0 30px rgba(255,217,61,0.4)' } : {}}
                    whileTap={isValid ? { scale: 0.98 } : {}}
                  >
                    {status === 'submitting' ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          style={{ width: 20, height: 20, border: '2px solid #0F0E17', borderTopColor: 'transparent', borderRadius: '50%' }}
                        />
                        Đang gửi...
                      </>
                    ) : status === 'error' ? (
                      <>❌ Lỗi, thử lại nhé!</>
                    ) : (
                      <>
                        <FiSend /> Xác nhận tham dự 🎉
                      </>
                    )}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
