# 📊 Hướng Dẫn Tích Hợp Tự Động Ghi Vào Google Sheets

Hệ thống đã được thiết lập để người dùng có thể:
1. **Gửi lời chúc** trực tiếp trên website (Tên + Lời chúc).
2. **Xác nhận tham dự (RSVP)** qua popup (Tên, Số điện thoại, Giới tính, Số người đi cùng, Ghi chú).

Toàn bộ dữ liệu này sẽ tự động đổ về **Google Sheet** của bạn hoàn toàn miễn phí mà không cần database hay Google Form!

---

## 🛠️ Các Bước Thiết Lập (Chỉ Mất 2 Phút)

### Bước 1: Tạo Google Sheet mới
1. Truy cập [Google Sheets (docs.google.com/spreadsheets)](https://docs.google.com/spreadsheets) và tạo một bảng tính mới (đặt tên ví dụ: `Danh Sách Tiệc Tốt Nghiệp`).
2. Ở thanh menu trên cùng, chọn **Tiện ích mở rộng (Extensions)** ➔ **Apps Script**.

### Bước 2: Dán mã Apps Script
Xoá toàn bộ code mặc định trong trình soạn thảo Apps Script và dán đoạn mã sau vào:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);
    
    // Phân loại dữ liệu: 'wish' (Lời chúc) hoặc 'rsvp' (Tham dự)
    if (data.type === 'wish') {
      var wishSheet = sheet.getSheetByName("Lời Chúc");
      if (!wishSheet) {
        wishSheet = sheet.insertSheet("Lời Chúc");
        wishSheet.appendRow(["Thời gian", "Tên người gửi", "Lời chúc"]);
        wishSheet.getRange(1, 1, 1, 3).setFontWeight("bold").setBackground("#FFEAA7");
      }
      wishSheet.appendRow([data.timestamp, data.name, data.message]);
    } else {
      var rsvpSheet = sheet.getSheetByName("Tham Dự");
      if (!rsvpSheet) {
        rsvpSheet = sheet.insertSheet("Tham Dự");
        rsvpSheet.appendRow(["Thời gian", "Họ và Tên", "Số điện thoại", "Mối quan hệ", "Giới tính", "Số lượng", "Ghi chú"]);
        rsvpSheet.getRange(1, 1, 1, 7).setFontWeight("bold").setBackground("#74B9FF");
      }
      rsvpSheet.appendRow([data.timestamp, data.name, data.phone, data.relationship, data.gender, data.guests, data.note]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Bước 3: Triển khai Web App (Deploy)
1. Bấm nút **Triển khai (Deploy)** màu xanh góc trên bên phải ➔ Chọn **Tùy chọn triển khai mới (New deployment)**.
2. Bấm vào icon bánh răng bên cạnh mục *Chọn loại* ➔ Chọn **Ứng dụng web (Web app)**.
3. Cấu hình như sau:
   - **Mô tả (Description)**: `Graduation RSVP & Wishes API`
   - **Thực thi dưới dạng (Execute as)**: `Tôi (Me)`
   - **Ai có quyền truy cập (Who has access)**: **`Bất kỳ ai (Anyone)`** *(rất quan trọng: phải chọn Anyone để khách mời gửi được dữ liệu mà không cần đăng nhập)*.
4. Bấm **Triển khai (Deploy)**. Nếu Google yêu cầu cấp quyền (Authorize access), bạn bấm chọn tài khoản của bạn ➔ Bấm **Advanced (Nâng cao)** ➔ Bấm **Go to ... (unsafe)** ➔ Bấm **Allow**.
5. Copy đường dẫn **URL ứng dụng web (Web app URL)** (có dạng `https://script.google.com/macros/s/AKfycb.../exec`).

### Bước 4: Cập nhật URL vào Website
Mở file [`src/data/personalInfo.js`](file:///c:/DungNt/Graduated/src/data/personalInfo.js) và thay đường dẫn vừa copy vào trường `googleScriptUrl`:

```javascript
export const eventInfo = {
  // ...
  googleScriptUrl: "https://script.google.com/macros/s/YOUR_REAL_SCRIPT_ID/exec",
  // ...
};
```

Xong! Giờ mỗi khi khách gửi lời chúc hoặc đăng ký tham dự, dữ liệu sẽ tự động xuất hiện ngay lập tức trong 2 tab của file Google Sheet của bạn! 🚀
