# Nihongo Support System (Hololingo)

Hệ thống học tiếng Nhật toàn diện với hỗ trợ AI cho phát âm và các tính năng học tập hiện đại.

## Tính năng chính

### 🎓 Bài học theo cấp độ
- **Sơ cấp (N5-N4)**: Dành cho người mới bắt đầu
- **Trung cấp (N3-N2)**: Nâng cao kỹ năng tiếng Nhật
- **Nâng cao (N1)**: Thành thạo tiếng Nhật

### 📚 Bảng chữ cái
- **Hiragana**: 46 ký tự cơ bản
- **Katakana**: 46 ký tự cho từ ngoại lai
- Phát âm tương tác cho từng ký tự

### 📖 Từ vựng theo chủ đề
- Cơ bản (số đếm, thời gian, màu sắc)
- Gia đình và mối quan hệ
- Ẩm thực và đồ uống
- Du lịch và giao thông

### 📝 Ngữ pháp
- Các cấu trúc ngữ pháp từ cơ bản đến nâng cao
- Ví dụ thực tế và luyện tập
- Giải thích chi tiết bằng tiếng Việt

### 🔥 Kanji
- Học theo cấp độ JLPT (N5-N1)
- Thông tin chi tiết về cách đọc, nghĩa, số nét
- Hệ thống ghi nhớ hiệu quả

### 🎴 Hệ thống thẻ học (Flashcards)
- Từ vựng, Kanji, ngữ pháp
- Thuật toán lặp lại ngắt quãng (Spaced Repetition)
- Theo dõi tiến độ học tập
- Chế độ hỗn hợp để ôn tập toàn diện

### 🤖 AI Hỗ trợ phát âm
- Phát âm mẫu bằng giọng bản địa
- Ghi âm và phân tích phát âm của bạn
- Đánh giá độ chính xác, ngữ điệu, tốc độ
- Gợi ý cải thiện cá nhân hóa

### 💬 Hội thoại thực tế
- Các tình huống giao tiếp hàng ngày
- Phát âm từng câu
- Luyện tập nhập vai

## Hướng dẫn sử dụng

### Bắt đầu học
1. Chọn cấp độ phù hợp (Sơ cấp, Trung cấp, Nâng cao)
2. Bắt đầu với bài học đầu tiên
3. Hoàn thành từng phần: Từ vựng → Ngữ pháp → Hội thoại → Luyện tập

### Học bảng chữ cái
1. Chọn tab "Bảng chữ cái"
2. Chuyển đổi giữa Hiragana và Katakana
3. Nhấp vào từng ký tự để nghe phát âm
4. Luyện tập viết và ghi nhớ

### Sử dụng thẻ học
1. Chọn loại thẻ: Từ vựng, Kanji, Ngữ pháp, hoặc Hỗn hợp
2. Nhấp vào thẻ để lật và xem đáp án
3. Đánh giá độ khó: Sai → Lại → Đúng → Dễ
4. Theo dõi tiến độ và độ chính xác

### Luyện phát âm với AI
1. Nhập văn bản tiếng Nhật hoặc chọn mẫu có sẵn
2. Nhấn "Nghe mẫu" để nghe phát âm chuẩn
3. Nhấn "Ghi âm" và đọc theo
4. Nhấn "Phân tích" để nhận phản hồi từ AI
5. Cải thiện dựa trên gợi ý

## Tính năng nâng cao

### Phím tắt
- **Space/Enter**: Lật thẻ flashcard
- **1-4**: Đánh giá độ khó thẻ flashcard
- **ESC**: Đóng modal

### Lưu trữ tiến độ
- Tất cả tiến độ được lưu trữ cục bộ
- Đồng bộ tự động khi truy cập lại
- Có thể xuất/nhập dữ liệu học tập

### Chế độ offline
- Hoạt động mà không cần kết nối internet
- Service Worker cache nội dung
- Đồng bộ khi có kết nối

## Cấu trúc dự án

```
nihongo-support-system/
├── index.html              # Trang chính
├── styles/
│   └── main.css            # CSS chính
├── js/
│   ├── main.js             # Logic chính
│   ├── data.js             # Dữ liệu bài học
│   ├── lessons.js          # Hệ thống bài học
│   ├── flashcards.js       # Hệ thống thẻ học
│   └── pronunciation.js    # AI phát âm
├── data/                   # Dữ liệu bài học
├── images/                 # Hình ảnh
└── sw.js                   # Service Worker
```

## Công nghệ sử dụng

- **HTML5**: Cấu trúc trang web
- **CSS3**: Giao diện và animation
- **JavaScript ES6+**: Logic ứng dụng
- **Web Speech API**: Nhận diện và tổng hợp giọng nói
- **MediaRecorder API**: Ghi âm
- **Service Worker**: Hỗ trợ offline
- **Local Storage**: Lưu trữ tiến độ

## Tương thích trình duyệt

- Chrome/Chromium 60+ (Khuyến nghị)
- Firefox 55+
- Safari 11+
- Edge 79+

**Lưu ý**: Tính năng AI phát âm yêu cầu trình duyệt hỗ trợ Web Speech API (Chrome/Edge)

## Đóng góp

Dự án này được xây dựng để hỗ trợ việc học tiếng Nhật hiệu quả. Mọi góp ý và đóng góp đều được hoan nghênh.

## Giấy phép

© 2025 Hololingo. Tất cả quyền được bảo lưu.

---

**Chúc bạn học tiếng Nhật vui vẻ và hiệu quả! がんばって！**
