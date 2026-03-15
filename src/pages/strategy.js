/**
 * Strategy & Reports page for AI Marketing Director
 */
import { marketingAgents } from '../data/agents-marketing.js';

export function renderStrategy(container) {
  const strategyTemplates = [
    {
      id: 'marketing-plan',
      icon: '🎯',
      name: 'Marketing Plan',
      desc: 'Kế hoạch marketing tổng thể cho thương hiệu/sản phẩm',
      agentIds: ['marketing-growth-hacker', 'marketing-social-media-strategist']
    },
    {
      id: 'go-to-market',
      icon: '🚀',
      name: 'Go-To-Market Strategy',
      desc: 'Chiến lược ra mắt sản phẩm/dịch vụ mới',
      agentIds: ['marketing-growth-hacker', 'marketing-content-creator']
    },
    {
      id: 'social-audit',
      icon: '📱',
      name: 'Social Media Audit',
      desc: 'Đánh giá toàn bộ hiện diện mạng xã hội',
      agentIds: ['marketing-social-media-strategist', 'marketing-instagram-curator', 'marketing-tiktok-strategist']
    },
    {
      id: 'competitor-report',
      icon: '⚔️',
      name: 'Competitor Intelligence',
      desc: 'Báo cáo phân tích đối thủ toàn diện',
      agentIds: ['marketing-growth-hacker', 'marketing-seo-specialist']
    },
    {
      id: 'content-strategy',
      icon: '✍️',
      name: 'Content Strategy',
      desc: 'Chiến lược nội dung dài hạn (3-6 tháng)',
      agentIds: ['marketing-content-creator', 'marketing-seo-specialist']
    },
    {
      id: 'weekly-report',
      icon: '📊',
      name: 'Weekly Report Template',
      desc: 'Mẫu báo cáo marketing hàng tuần',
      agentIds: ['marketing-growth-hacker']
    },
    {
      id: 'brand-positioning',
      icon: '💎',
      name: 'Brand Positioning',
      desc: 'Định vị thương hiệu và thông điệp cốt lõi',
      agentIds: ['marketing-content-creator', 'marketing-growth-hacker']
    },
    {
      id: 'paid-media-plan',
      icon: '💰',
      name: 'Paid Media Plan',
      desc: 'Kế hoạch quảng cáo trả phí đa kênh',
      agentIds: ['marketing-growth-hacker', 'marketing-social-media-strategist']
    }
  ];

  container.innerHTML = `
    <div class="page strategy-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">📈 Strategy & Reports</h1>
          <p class="page-subtitle">Xây dựng chiến lược marketing và tạo báo cáo chuyên nghiệp với AI</p>
        </div>
      </div>

      <!-- Strategy Templates -->
      <div class="section">
        <h2 class="section-title">🗂️ Mẫu Chiến Lược</h2>
        <div class="strategy-grid">
          ${strategyTemplates.map(tmpl => `
            <div class="strategy-card" data-strategy-id="${tmpl.id}">
              <div class="strategy-card-icon">${tmpl.icon}</div>
              <h3>${tmpl.name}</h3>
              <p>${tmpl.desc}</p>
              <div class="strategy-agents">
                ${tmpl.agentIds.map(id => {
                  const agent = marketingAgents.find(a => a.id === id);
                  return agent ? `<span class="mini-agent" title="${agent.nameVi}">${agent.emoji}</span>` : '';
                }).join('')}
              </div>
              <button class="btn btn-primary btn-sm use-strategy-btn" data-strategy-id="${tmpl.id}">
                Tạo chiến lược
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Strategy Workspace -->
      <div class="strategy-workspace" id="strategy-workspace" style="display:none;">
        <div class="workspace-header">
          <button class="btn btn-ghost btn-sm" id="back-to-strategies">← Quay lại</button>
          <h3 id="strategy-workspace-title"></h3>
        </div>

        <div class="strategy-builder">
          <div class="form-group">
            <label class="form-label">🏢 Thương hiệu / Công ty</label>
            <input type="text" id="strategy-brand" class="form-input" placeholder="Tên thương hiệu..." />
          </div>
          <div class="form-group">
            <label class="form-label">🎯 Mục tiêu chính</label>
            <textarea id="strategy-goal" class="form-textarea" rows="3" placeholder="Mục tiêu marketing muốn đạt được..."></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">👤 Đối tượng mục tiêu</label>
            <input type="text" id="strategy-audience" class="form-input" placeholder="Mô tả khách hàng mục tiêu..." />
          </div>
          <div class="form-group">
            <label class="form-label">💰 Ngân sách (nếu có)</label>
            <input type="text" id="strategy-budget" class="form-input" placeholder="Ví dụ: 50 triệu/tháng" />
          </div>
          <div class="form-group">
            <label class="form-label">📝 Thông tin bổ sung</label>
            <textarea id="strategy-extra" class="form-textarea" rows="3" placeholder="Bối cảnh, thách thức, yêu cầu đặc biệt..."></textarea>
          </div>

          <button class="btn btn-primary btn-lg" id="generate-strategy-btn">
            🚀 Tạo Prompt Chiến Lược
          </button>

          <div class="strategy-output" id="strategy-output" style="display:none;">
            <div class="prompt-header">
              <h4>📋 Prompt Chiến Lược</h4>
              <button class="btn btn-primary btn-sm" id="copy-strategy-prompt">📋 Copy</button>
            </div>
            <pre class="prompt-block" id="strategy-prompt-block"><code></code></pre>
            <div class="analysis-quick-open">
              <a href="https://gemini.google.com/app" target="_blank" class="btn btn-accent btn-md">✨ Mở Gemini</a>
              <a href="https://chatgpt.com" target="_blank" class="btn btn-ghost btn-md">🤖 Mở ChatGPT</a>
            </div>
          </div>
        </div>
      </div>

      <!-- History -->
      <div class="section">
        <h2 class="section-title">📂 Lịch Sử Chiến Lược</h2>
        <div id="strategy-history">
          <div class="empty-state">
            <span class="empty-icon">📋</span>
            <p>Chưa có chiến lược nào được tạo</p>
            <p class="text-muted">Chọn mẫu chiến lược phía trên để bắt đầu</p>
          </div>
        </div>
      </div>
    </div>
  `;

  initStrategyEvents(container, strategyTemplates);
}

function initStrategyEvents(container, strategyTemplates) {
  const grid = container.querySelector('.strategy-grid');
  const workspace = container.querySelector('#strategy-workspace');
  let currentTemplate = null;

  // Use strategy
  container.querySelectorAll('.use-strategy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentTemplate = strategyTemplates.find(t => t.id === btn.dataset.strategyId);
      if (!currentTemplate) return;

      grid.parentElement.style.display = 'none';
      workspace.style.display = 'block';
      container.querySelector('#strategy-workspace-title').textContent = `${currentTemplate.icon} ${currentTemplate.name}`;
      container.querySelector('#strategy-output').style.display = 'none';
    });
  });

  // Back
  container.querySelector('#back-to-strategies').addEventListener('click', () => {
    grid.parentElement.style.display = '';
    workspace.style.display = 'none';
  });

  // Generate
  container.querySelector('#generate-strategy-btn').addEventListener('click', () => {
    const brand = container.querySelector('#strategy-brand').value.trim();
    const goal = container.querySelector('#strategy-goal').value.trim();
    const audience = container.querySelector('#strategy-audience').value.trim();
    const budget = container.querySelector('#strategy-budget').value.trim();
    const extra = container.querySelector('#strategy-extra').value.trim();

    const agents = currentTemplate.agentIds
      .map(id => marketingAgents.find(a => a.id === id))
      .filter(Boolean);

    const prompt = generateStrategyPrompt(currentTemplate, agents, { brand, goal, audience, budget, extra });
    container.querySelector('#strategy-prompt-block code').textContent = prompt;
    container.querySelector('#strategy-output').style.display = 'block';
    container.querySelector('#strategy-output').scrollIntoView({ behavior: 'smooth' });
  });

  // Copy
  container.querySelector('#copy-strategy-prompt').addEventListener('click', async () => {
    const text = container.querySelector('#strategy-prompt-block code').textContent;
    await navigator.clipboard.writeText(text);
    const btn = container.querySelector('#copy-strategy-prompt');
    btn.textContent = '✅ Đã copy!';
    setTimeout(() => btn.textContent = '📋 Copy', 2000);
  });
}

function generateStrategyPrompt(template, agents, data) {
  let prompt = `# ${template.icon} ${template.name}\n\n`;
  prompt += `## Bối cảnh\n`;
  if (data.brand) prompt += `- **Thương hiệu:** ${data.brand}\n`;
  if (data.goal) prompt += `- **Mục tiêu:** ${data.goal}\n`;
  if (data.audience) prompt += `- **Đối tượng:** ${data.audience}\n`;
  if (data.budget) prompt += `- **Ngân sách:** ${data.budget}\n`;
  if (data.extra) prompt += `- **Bổ sung:** ${data.extra}\n`;

  prompt += `\n## Đội ngũ chuyên gia\n`;
  prompt += `Hãy phân tích và xây dựng ${template.name} từ góc nhìn của các chuyên gia:\n\n`;
  agents.forEach((agent, i) => {
    prompt += `${i + 1}. ${agent.emoji} **${agent.nameVi}** — ${agent.vibeVi}\n`;
  });

  const strategyStructures = {
    'marketing-plan': `
## Output yêu cầu

### 1. Executive Summary
### 2. Phân tích SWOT
### 3. Mục tiêu SMART (3-6 tháng)
### 4. Chiến lược theo kênh
   - Organic: SEO, Content, Social
   - Paid: Facebook Ads, Google Ads, TikTok Ads
   - Owned: Email, Website, App
### 5. Content Calendar (tháng đầu tiên)
### 6. KPIs & Metrics Dashboard
### 7. Budget Allocation
### 8. Timeline triển khai
### 9. Risk & Contingency`,

    'go-to-market': `
## Output yêu cầu

### 1. Market Analysis & Opportunity
### 2. Target Audience & Persona
### 3. Pricing & Positioning Strategy
### 4. Launch Timeline (Pre-launch → Launch → Post-launch)
### 5. Channel Strategy
### 6. Content & Messaging Framework
### 7. PR & Media Plan
### 8. KPIs & Success Metrics
### 9. Budget Breakdown`,

    'social-audit': `
## Output yêu cầu

### 1. Current State Assessment (từng platform)
### 2. Content Performance Analysis
### 3. Audience Demographics & Behavior
### 4. Competitor Benchmarking
### 5. Gaps & Opportunities
### 6. Recommendations (Quick Wins + Long-term)
### 7. Action Plan (30/60/90 ngày)`,

    'weekly-report': `
## Output yêu cầu

### Template Báo Cáo Tuần

#### 1. Executive Summary (3-5 bullet points)
#### 2. KPI Dashboard
| Metric | Tuần này | Tuần trước | Thay đổi |
|--------|----------|-----------|---------|
#### 3. Campaign Performance
#### 4. Content Highlights
#### 5. Budget Status
#### 6. Key Insights
#### 7. Action Items tuần tới
#### 8. Recommendations`,
  };

  prompt += strategyStructures[template.id] || `
## Output yêu cầu

### 1. Phân tích hiện trạng
### 2. Chiến lược đề xuất
### 3. Kế hoạch hành động chi tiết
### 4. Timeline triển khai
### 5. KPIs theo dõi
### 6. Budget dự kiến
### 7. Risk assessment`;

  prompt += `\n\nFormat: Markdown chuyên nghiệp, có emoji, có bảng biểu, dễ đọc, actionable.`;
  return prompt;
}
