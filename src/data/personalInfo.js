// ====================================================
// 📝 THÔNG TIN CÁ NHÂN - Sửa dữ liệu ở đây!
// ====================================================

export const personalInfo = {
  name: "Nguyễn Thế Dũng",
  birthday: "04/08/2003",
  age: 23,
  school: "Đại học FPT Hà Nội",
  faculty: "Khoa Công nghệ Thông tin",
  major: "Kỹ thuật Phần mềm",
  hometown: "Thành phố Sơn La, Việt Nam",
  relationshipStatus: "Đang hẹn hò 💕",
  hobbies: [
    { text: "Code", emoji: "💻" },
    { text: "Ngủ", emoji: "😴" },
    { text: "Ăn uống", emoji: "🍜" },
    { text: "Chơi game", emoji: "🎮" },
    { text: "Nghe nhạc", emoji: "🎵" },
    { text: "Xem phim", emoji: "🎬" },
  ],
  motto: "Sống là phải vui, buồn thì đi ngủ! 😄",
  futureGoals: [
    { icon: "🚀", text: "Trở thành Full-stack Developer" },
    { icon: "💰", text: "Kiếm thật nhiều tiền" },
    { icon: "🌍", text: "Du lịch vòng quanh thế giới" },
    { icon: "📚", text: "Học thêm nhiều công nghệ mới" },
  ],
  avatar: "./images/avatar.jpg",
  // Tooltip vui nhộn khi hover vào các mục
  funnyTooltips: {
    name: "Đúng rồi, đây là tên tôi, không phải tên bạn 😎",
    birthday: "Ngày này mẹ tôi rất vất vả 🥲",
    school: "Nơi tôi trả góp tuổi thanh xuân 📖",
    faculty: "Debug cả ngày, bug cả đêm 🐛",
    major: "Nghe thì oai, code thì khóc 😭",
    hometown: "Sơn La mộc mạc, con người chất phác 🏔️",
    relationshipStatus: "Hoa đã có chủ, xin đừng nhổ hoa 🌸🔒",
    hobbies: "Đây mới là chuyên ngành thật sự của tôi 😏",
    motto: "Triết lý sống level max 🧠",
    futureGoals: "Mơ thì cứ mơ, biết đâu thành thật 🌟",
  },
};

export const eventInfo = {
  // Ngày giờ sự kiện (ISO format)
  date: "2026-09-16T07:00:00",
  // Tên sự kiện
  title: "Tiệc Tốt Nghiệp của FiFi 🎓",
  // Địa điểm
  location: "Trung tâm Hội nghị Quốc gia, Cổng số 1, Đại lộ Thăng Long, Từ Liêm, Hà Nội",
  // Mô tả thêm
  description: "Đến chung vui làm kiểu ảnh, quan trọng là phải có quà :)",
  // Google Maps Embed URL
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Trung+t%C3%A2m+H%E1%BB%99i+ngh%E1%BB%8B+Qu%E1%BB%91c+gia+H%C3%A0+N%E1%BB%99i&t=&z=15&ie=UTF8&iwloc=&output=embed",
  // URL Google Apps Script Web App để lưu thông tin vào Google Sheet tự động
  googleScriptUrl: "https://script.google.com/macros/s/AKfycbxz7-lhXJX25U-J4cilq1jEj0ox7eFEEaEp-aAhSKS13U23OKGKuduv6bnhVmI-asLRxg/exec",
  // Dress code (tuỳ chọn)
  dressCode: "Thoải mái, miễn mặc đồ là được 👕",
};
