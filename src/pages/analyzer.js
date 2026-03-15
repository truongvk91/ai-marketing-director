/**
 * Ads Analyzer page - 3-step workflow
 */
import { marketingAgents } from '../data/agents-marketing.js';

export function renderAnalyzer(container) {
  container.innerHTML = `
    <div class="page analyzer-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">🔍 Ads Analyzer</h1>
          <p class="page-subtitle">Phân tích ads đối thủ theo quy trình 3 bước: Thu Thập → Phân Tích → Tối Ưu</p>
        </div>
      </div>

      <!-- Progress Steps -->
      <div class="analyzer-steps">
        <div class="analyzer-step active" data-step="1">
          <div class="step-circle">1</div>
          <span class="step-label">Thu Thập</span>
        </div>
        <div class="step-connector"></div>
        <div class="analyzer-step" data-step="2">
          <div class="step-circle">2</div>
          <span class="step-label">Phân Tích</span>
        </div>
        <div class="step-connector"></div>
        <div class="analyzer-step" data-step="3">
          <div class="step-circle">3</div>
          <span class="step-label">Tối Ưu</span>
        </div>
      </div>

      <!-- Step Content -->
      <div class="analyzer-content">
        <!-- Step 1: Collect -->
        <div class="step-panel active" id="step-1">
          <div class="step-panel-inner">
            <div class="step-info">
              <h2>📥 Bước 1: Thu Thập Dữ Liệu Ads Đối Thủ</h2>
              <p>Paste dữ liệu ads đối thủ vào đây. Bạn có thể paste text copy, URL, hoặc mô tả hình ảnh ads.</p>
            </div>

            <div class="form-group">
              <label class="form-label">🏷️ Tên đối thủ / Thương hiệu</label>
              <input type="text" id="competitor-name" class="form-input" placeholder="Ví dụ: Brand X, Agency Y..." />
            </div>

            <div class="form-group">
              <label class="form-label">📝 Nội dung quảng cáo (Copy / Text)</label>
              <textarea id="ad-copy" class="form-textarea" rows="6" placeholder="Paste toàn bộ text quảng cáo của đối thủ vào đây...&#10;&#10;Ví dụ:&#10;🔥 FLASH SALE - Giảm 50% chỉ hôm nay!&#10;✅ Miễn phí vận chuyển ✅ Bảo hành 12 tháng&#10;👉 Đặt ngay: link.com"></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">🎨 Mô tả hình ảnh / Visual</label>
              <textarea id="ad-visual" class="form-textarea" rows="4" placeholder="Mô tả hình ảnh quảng cáo: màu sắc, layout, sản phẩm hiển thị, người mẫu, text overlay..."></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">📊 Thông tin bổ sung</label>
              <textarea id="ad-extra" class="form-textarea" rows="3" placeholder="Platform (Facebook/TikTok/Google), số likes/comments, thời gian chạy, đối tượng target..."></textarea>
            </div>

            <div class="step-actions">
              <button class="btn btn-primary btn-lg" id="analyze-btn" disabled>
                Phân Tích →
              </button>
            </div>
          </div>
        </div>

        <!-- Step 2: Analyze -->
        <div class="step-panel" id="step-2">
          <div class="step-panel-inner">
            <div class="step-info">
              <h2>🧠 Bước 2: AI Phân Tích Chuyên Sâu</h2>
              <p>Prompt phân tích đã được tạo. Copy và paste vào Gemini để nhận insight chi tiết.</p>
            </div>

            <div class="analysis-prompt-container">
              <div class="prompt-header">
                <h4>📋 Prompt Phân Tích</h4>
                <button class="btn btn-primary btn-sm" id="copy-analysis-prompt">📋 Copy</button>
              </div>
              <pre class="prompt-block" id="analysis-prompt-block"><code></code></pre>
            </div>

            <div class="analysis-quick-open">
              <a href="https://gemini.google.com/app" target="_blank" class="btn btn-accent btn-md">✨ Mở Gemini để phân tích</a>
              <a href="https://chatgpt.com" target="_blank" class="btn btn-ghost btn-md">🤖 Mở ChatGPT</a>
            </div>

            <div class="form-group" style="margin-top: 2rem;">
              <label class="form-label">📝 Paste kết quả phân tích từ AI (tùy chọn)</label>
              <textarea id="analysis-result" class="form-textarea" rows="8" placeholder="Paste kết quả phân tích từ Gemini/ChatGPT vào đây để chuyển sang bước tối ưu..."></textarea>
            </div>

            <div class="step-actions">
              <button class="btn btn-ghost btn-md" id="back-to-step1">← Quay lại</button>
              <button class="btn btn-primary btn-lg" id="optimize-btn">
                Tối Ưu →
              </button>
            </div>
          </div>
        </div>

        <!-- Step 3: Optimize -->
        <div class="step-panel" id="step-3">
          <div class="step-panel-inner">
            <div class="step-info">
              <h2>🚀 Bước 3: Tối Ưu & Tạo Ads Mới</h2>
              <p>Dựa trên phân tích, AI sẽ giúp bạn tạo ads mới "đỉnh" hơn đối thủ.</p>
            </div>

            <div class="optimize-prompt-container">
              <div class="prompt-header">
                <h4>📋 Prompt Tối Ưu</h4>
                <button class="btn btn-primary btn-sm" id="copy-optimize-prompt">📋 Copy</button>
              </div>
              <pre class="prompt-block" id="optimize-prompt-block"><code></code></pre>
            </div>

            <div class="analysis-quick-open">
              <a href="https://gemini.google.com/app" target="_blank" class="btn btn-accent btn-md">✨ Mở Gemini để tối ưu</a>
              <a href="https://chatgpt.com" target="_blank" class="btn btn-ghost btn-md">🤖 Mở ChatGPT</a>
            </div>

            <div class="step-actions">
              <button class="btn btn-ghost btn-md" id="back-to-step2">← Quay lại</button>
              <button class="btn btn-primary btn-lg" id="new-analysis-btn">🔄 Phân Tích Mới</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  initAnalyzerEvents(container);
}

function initAnalyzerEvents(container) {
  const adCopy = container.querySelector('#ad-copy');
  const adVisual = container.querySelector('#ad-visual');
  const compName = container.querySelector('#competitor-name');
  const analyzeBtn = container.querySelector('#analyze-btn');

  // Enable analyze button
  function checkReady() {
    analyzeBtn.disabled = !adCopy.value.trim() && !adVisual.value.trim();
  }
  adCopy.addEventListener('input', checkReady);
  adVisual.addEventListener('input', checkReady);

  function goToStep(step) {
    container.querySelectorAll('.analyzer-step').forEach(s => {
      const sNum = parseInt(s.dataset.step);
      s.classList.toggle('active', sNum === step);
      s.classList.toggle('completed', sNum < step);
    });
    container.querySelectorAll('.step-panel').forEach(p => p.classList.remove('active'));
    container.querySelector(`#step-${step}`).classList.add('active');
  }

  // Step 1 → Step 2
  analyzeBtn.addEventListener('click', () => {
    const prompt = generateAnalysisPrompt(
      compName.value.trim(),
      adCopy.value.trim(),
      adVisual.value.trim(),
      container.querySelector('#ad-extra').value.trim()
    );
    container.querySelector('#analysis-prompt-block code').textContent = prompt;
    goToStep(2);
  });

  // Step 2 → Step 3
  container.querySelector('#optimize-btn').addEventListener('click', () => {
    const analysisResult = container.querySelector('#analysis-result').value.trim();
    const prompt = generateOptimizePrompt(
      compName.value.trim(),
      adCopy.value.trim(),
      analysisResult
    );
    container.querySelector('#optimize-prompt-block code').textContent = prompt;
    goToStep(3);
  });

  // Navigation
  container.querySelector('#back-to-step1').addEventListener('click', () => goToStep(1));
  container.querySelector('#back-to-step2').addEventListener('click', () => goToStep(2));
  container.querySelector('#new-analysis-btn').addEventListener('click', () => {
    adCopy.value = '';
    adVisual.value = '';
    compName.value = '';
    container.querySelector('#ad-extra').value = '';
    container.querySelector('#analysis-result').value = '';
    goToStep(1);
  });

  // Copy buttons
  container.querySelector('#copy-analysis-prompt').addEventListener('click', async () => {
    const text = container.querySelector('#analysis-prompt-block code').textContent;
    await navigator.clipboard.writeText(text);
    const btn = container.querySelector('#copy-analysis-prompt');
    btn.textContent = '✅ Đã copy!';
    setTimeout(() => btn.textContent = '📋 Copy', 2000);
  });

  container.querySelector('#copy-optimize-prompt').addEventListener('click', async () => {
    const text = container.querySelector('#optimize-prompt-block code').textContent;
    await navigator.clipboard.writeText(text);
    const btn = container.querySelector('#copy-optimize-prompt');
    btn.textContent = '✅ Đã copy!';
    setTimeout(() => btn.textContent = '📋 Copy', 2000);
  });
}

function generateAnalysisPrompt(competitor, adCopy, adVisual, extra) {
  return `# 🔍 PHÂN TÍCH ADS ĐỐI THỦ - Marketing Director Analysis

## Thông tin đối thủ
${competitor ? `**Thương hiệu:** ${competitor}` : ''}
${extra ? `**Thông tin thêm:** ${extra}` : ''}

## Dữ liệu quảng cáo

### Nội dung copy:
${adCopy || '(Không có)'}

### Mô tả hình ảnh/Visual:
${adVisual || '(Không có)'}

---

## Yêu cầu phân tích (đóng vai Giám đốc Marketing)

Phân tích quảng cáo trên theo 7 tiêu chí:

### 1. 🎨 Visual Strategy
- Tại sao họ dùng màu sắc/layout này?
- Điểm nhấn (Hook) nằm ở đâu?
- Hierarchy thông tin có logic không?

### 2. 📝 Copy Analysis  
- Headline có gây chú ý không? Tại sao?
- Body copy thuyết phục hay không? Thiếu gì?
- CTA có rõ ràng không?

### 3. 👤 Customer Insight
- Họ đang nhắm vào pain point nào của khách?
- Customer persona target là ai?
- Emotional trigger sử dụng: sợ hãi / FOMO / tham lam / tò mò?

### 4. 💰 Offer Analysis
- Offer có hấp dẫn không?
- Urgency/Scarcity có đủ mạnh?
- Value proposition rõ ràng chưa?

### 5. ⚡ Điểm mạnh (Top 3)
- Liệt kê 3 điều họ làm tốt nhất

### 6. 🕳️ Điểm yếu / Lỗ hổng (Top 3)
- Liệt kê 3 lỗ hổng có thể khai thác

### 7. 📊 Chấm điểm tổng thể
- Hook: /10
- Copy: /10  
- Visual: /10
- Offer: /10
- CTA: /10
- **Tổng: /50**

Format: Markdown có emoji, dễ đọc, actionable.`;
}

function generateOptimizePrompt(competitor, originalAd, analysisResult) {
  return `# 🚀 TỐI ƯU ADS - Tạo quảng cáo "đỉnh" hơn đối thủ

## Ads gốc của đối thủ${competitor ? ` (${competitor})` : ''}:
${originalAd || '(Xem bước phân tích trước)'}

${analysisResult ? `## Kết quả phân tích:
${analysisResult}` : ''}

---

## Yêu cầu tối ưu

Dựa trên phân tích ở trên, hãy:

### 1. Viết lại 3 phiên bản ads mới
Mỗi phiên bản với approach khác nhau:
- **Version A** - Direct Response: Hook mạnh, CTA rõ, urgency cao
- **Version B** - Storytelling: Kể chuyện, emotional, relatable
- **Version C** - Social Proof: Testimonial, số liệu, authority

### 2. Mỗi version gồm:
- **Headline/Hook** (2-3 dòng đầu)
- **Body copy** (problem → solution → benefits)
- **CTA** (hành động cụ thể)
- **Hashtags** (5-7 relevant)
- **Gợi ý Visual**: Mô tả hình ảnh/video nên dùng

### 3. So sánh
Bảng so sánh Original vs 3 Versions mới (điểm Hook, Copy, CTA, Offer)

### 4. Đề xuất A/B Test
- Test gì trước?
- Budget phân bổ thế nào?
- KPI theo dõi

Format: Markdown có emoji, sẵn sàng copy-paste vào Facebook Ads.`;
}
