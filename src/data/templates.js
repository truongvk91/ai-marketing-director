/**
 * Content templates for marketing workflows
 */
export const contentTemplates = [
  {
    id: 'fb-ads',
    name: 'Facebook Ads Copy',
    nameVi: 'Bài Quảng Cáo Facebook',
    icon: '📘',
    category: 'ads',
    description: 'Tạo copy quảng cáo Facebook với hook mạnh, body thuyết phục và CTA rõ ràng.',
    template: `Viết cho tôi một bài quảng cáo Facebook cho sản phẩm/dịch vụ: [MÔ TẢ SẢN PHẨM]

Đối tượng mục tiêu: [ĐỐI TƯỢNG]
Mục tiêu chiến dịch: [MỤC TIÊU: traffic/conversion/awareness]
Tone of voice: [TONE: chuyên nghiệp/thân thiện/gấp gáp]

Yêu cầu:
1. Hook (2-3 dòng đầu): Gây chú ý ngay lập tức
2. Body: Nêu pain point → giải pháp → lợi ích
3. Social proof: Số liệu, testimonial
4. CTA: Hành động cụ thể
5. Viết 3 phiên bản A/B test`
  },
  {
    id: 'tiktok-script',
    name: 'TikTok Video Script',
    nameVi: 'Kịch Bản TikTok',
    icon: '🎬',
    category: 'video',
    description: 'Kịch bản video ngắn TikTok/Reels với hook 3 giây, nội dung hút và CTA.',
    template: `Viết kịch bản video TikTok 30-60 giây cho: [CHỦ ĐỀ]

Phong cách: [talking head/skit/tutorial/storytelling]
Đối tượng: [ĐỐI TƯỢNG]

Cấu trúc:
1. HOOK (0-3s): Câu mở đầu gây tò mò
2. SETUP (3-10s): Đặt vấn đề/context
3. CONTENT (10-45s): Nội dung chính, chia thành bullets
4. CTA (45-60s): Kêu gọi hành động
5. Hashtags: 5-7 hashtags phù hợp
6. Caption: Caption hấp dẫn cho video`
  },
  {
    id: 'email-sequence',
    name: 'Email Sequence',
    nameVi: 'Chuỗi Email Marketing',
    icon: '📧',
    category: 'email',
    description: 'Chuỗi email nurture/sales gồm 5 email với logic follow-up.',
    template: `Viết chuỗi 5 email marketing cho: [SẢN PHẨM/DỊCH VỤ]

Mục tiêu: [nurture/onboarding/sales/re-engagement]
Đối tượng: [ĐỐI TƯỢNG]
Khoảng cách gửi: [1/2/3 ngày]

Mỗi email cần:
- Subject line (A/B test 2 versions)
- Preview text
- Body content (ngắn gọn, có giá trị)
- CTA rõ ràng
- P.S. line

Chuỗi: Welcome → Value → Case Study → Offer → Last Chance`
  },
  {
    id: 'blog-seo',
    name: 'Blog Post SEO',
    nameVi: 'Bài Viết Blog SEO',
    icon: '📝',
    category: 'content',
    description: 'Bài viết blog tối ưu SEO với heading structure, internal links và meta tags.',
    template: `Viết bài blog SEO cho keyword: [KEYWORD CHÍNH]

Dài: [1500/2000/3000 từ]
Search intent: [informational/transactional/navigational]
Đối thủ tham khảo: [URL ĐỐI THỦ]

Yêu cầu:
1. Title tag + Meta description
2. H1, H2, H3 structure (outline trước)
3. Intro có hook + keyword tự nhiên
4. Mỗi section có: nội dung giá trị + keyword liên quan
5. FAQ section (3-5 câu hỏi phổ biến)
6. Internal/External linking suggestions
7. Featured snippet optimization`
  },
  {
    id: 'competitor-analysis',
    name: 'Competitor Analysis',
    nameVi: 'Phân Tích Đối Thủ',
    icon: '🔍',
    category: 'strategy',
    description: 'Framework phân tích đối thủ toàn diện từ content, ads đến chiến lược.',
    template: `Phân tích đối thủ cạnh tranh cho: [THƯƠNG HIỆU CỦA TÔI]

Đối thủ phân tích: [TÊN ĐỐI THỦ / URL]
Ngành: [NGÀNH HÀNG]

Phân tích theo framework:
1. TỔNG QUAN: Brand positioning, USP, target audience
2. CONTENT: Tone of voice, content pillars, frequency
3. ADS: Loại ads đang chạy, messaging, offer
4. VISUAL: Brand identity, màu sắc, style hình ảnh
5. SOCIAL: Followers, engagement rate, platform focus
6. ĐIỂM MẠNH: Những gì họ làm tốt
7. ĐIỂM YẾU: Lỗ hổng có thể khai thác
8. ĐỀ XUẤT: 5 action items cụ thể cho thương hiệu tôi`
  },
  {
    id: 'weekly-report',
    name: 'Weekly Report',
    nameVi: 'Báo Cáo Tuần',
    icon: '📊',
    category: 'report',
    description: 'Template báo cáo marketing hàng tuần với KPIs và action items.',
    template: `Tạo báo cáo marketing tuần cho: [THƯƠNG HIỆU]

Kênh hoạt động: [Facebook, Google, TikTok, Email...]
Tuần: [NGÀY BẮT ĐẦU - NGÀY KẾT THÚC]

Cấu trúc báo cáo:
1. EXECUTIVE SUMMARY: Tóm tắt 3-5 điểm chính
2. KPI DASHBOARD:
   - Impressions / Reach
   - Clicks / CTR
   - Conversions / CPA
   - ROAS / ROI
   - So sánh tuần trước (↑↓%)
3. CAMPAIGN BREAKDOWN: Hiệu suất từng chiến dịch
4. CONTENT PERFORMANCE: Top performing posts
5. BUDGET: Chi tiêu vs kế hoạch
6. INSIGHTS: Phát hiện quan trọng
7. ACTION ITEMS: Kế hoạch tuần tiếp theo
8. RECOMMENDATIONS: Đề xuất tối ưu`
  },
  {
    id: 'customer-persona',
    name: 'Customer Persona',
    nameVi: 'Chân Dung Khách Hàng',
    icon: '👤',
    category: 'strategy',
    description: 'Xây dựng chân dung khách hàng mục tiêu chi tiết cho chiến lược marketing.',
    template: `Xây dựng Customer Persona cho: [SẢN PHẨM/DỊCH VỤ]

Ngành: [NGÀNH HÀNG]
Phân khúc: [mass/premium/niche]

Mỗi persona gồm:
1. TÊN & ẢNH ĐẠI DIỆN: Fictional name + demographics
2. DEMOGRAPHICS: Tuổi, giới tính, thu nhập, vị trí
3. PSYCHOGRAPHICS: Giá trị, sở thích, lối sống
4. PAIN POINTS: 3-5 nỗi đau chính
5. GOALS: Mục tiêu họ muốn đạt được
6. BUYING BEHAVIOR: Hành vi mua hàng, kênh ưa thích
7. MEDIA CONSUMPTION: Nền tảng, thời gian online
8. MESSAGING: Cách "nói chuyện" với persona này
Tạo 2-3 personas khác nhau.`
  },
  {
    id: 'landing-page',
    name: 'Landing Page Copy',
    nameVi: 'Copy Landing Page',
    icon: '🌐',
    category: 'content',
    description: 'Copy cho landing page chuyển đổi cao với hero, benefits, testimonials và CTA.',
    template: `Viết copy landing page cho: [SẢN PHẨM/DỊCH VỤ]

Mục tiêu: [đăng ký/mua hàng/tải app/liên hệ]
Đối tượng: [ĐỐI TƯỢNG MỤC TIÊU]

Cấu trúc landing page:
1. HERO SECTION: Headline + Sub-headline + CTA
2. SOCIAL PROOF: Logos, numbers, trust badges
3. PROBLEM: Pain points khách hàng đang gặp
4. SOLUTION: Sản phẩm giải quyết như thế nào
5. BENEFITS: 3-5 lợi ích chính (icon + title + desc)
6. HOW IT WORKS: 3 bước đơn giản
7. TESTIMONIALS: 3 reviews từ khách hàng
8. FAQ: 5 câu hỏi thường gặp
9. FINAL CTA: Urgency + offer + button`
  }
];
