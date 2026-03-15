/**
 * Command Center page - Director's control panel
 */
import { marketingAgents } from '../data/agents-marketing.js';

export function renderCommand(container) {
  const agentGroups = {
    'core': { label: '🎯 Core Team', agents: ['marketing-growth-hacker', 'marketing-content-creator', 'marketing-seo-specialist', 'marketing-social-media-strategist'] },
    'social': { label: '📱 Social Media', agents: ['marketing-twitter-engager', 'marketing-tiktok-strategist', 'marketing-instagram-curator', 'marketing-linkedin-content-creator'] },
    'ecommerce': { label: '🛒 E-Commerce', agents: ['marketing-cross-border-ecommerce', 'marketing-livestream-commerce-coach', 'marketing-app-store-optimizer'] },
    'content': { label: '✍️ Content', agents: ['marketing-carousel-growth-engine', 'marketing-podcast-strategist', 'marketing-book-co-author', 'marketing-short-video-editing-coach'] },
    'china': { label: '🇨🇳 China Market', agents: ['marketing-china-ecommerce-operator', 'marketing-xiaohongshu-specialist', 'marketing-wechat-official-account', 'marketing-douyin-strategist', 'marketing-bilibili-content-strategist', 'marketing-kuaishou-strategist', 'marketing-weibo-strategist', 'marketing-zhihu-strategist', 'marketing-baidu-seo-specialist'] },
    'community': { label: '🤝 Community', agents: ['marketing-reddit-community-builder', 'marketing-private-domain-operator'] }
  };

  container.innerHTML = `
    <div class="page command-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">🎯 Command Center</h1>
          <p class="page-subtitle">Chọn agents → Nhập mục tiêu → Nhận kế hoạch hành động chi tiết</p>
        </div>
      </div>

      <div class="command-layout">
        <!-- Left: Agent Selection -->
        <div class="command-agents">
          <div class="command-section-header">
            <h3>Chọn đội ngũ triển khai</h3>
            <div class="command-header-actions">
              <button class="btn btn-ghost btn-sm" id="select-all-btn">Chọn tất cả</button>
              <button class="btn btn-ghost btn-sm" id="clear-all-btn">Bỏ chọn</button>
            </div>
          </div>

          <div class="agent-groups">
            ${Object.entries(agentGroups).map(([key, group]) => `
              <div class="agent-group">
                <div class="group-header" data-group="${key}">
                  <span class="group-label">${group.label}</span>
                  <span class="group-count">${group.agents.length}</span>
                </div>
                <div class="group-agents">
                  ${group.agents.map(id => {
                    const agent = marketingAgents.find(a => a.id === id);
                    if (!agent) return '';
                    return `
                      <label class="agent-checkbox" data-agent-id="${id}">
                        <input type="checkbox" value="${id}" class="agent-check" />
                        <span class="agent-check-emoji">${agent.emoji}</span>
                        <span class="agent-check-name">${agent.nameVi}</span>
                      </label>
                    `;
                  }).join('')}
                </div>
              </div>
            `).join('')}
          </div>

          <div class="selected-summary" id="selected-summary">
            <span class="selected-count">0</span> agents đã chọn
          </div>
        </div>

        <!-- Right: Mission Brief -->
        <div class="command-mission">
          <div class="mission-section">
            <h3>📋 Mission Brief</h3>
            
            <div class="form-group">
              <label class="form-label">Loại nhiệm vụ</label>
              <div class="mission-types">
                <button class="mission-type-btn active" data-type="audit">🔍 Audit Website</button>
                <button class="mission-type-btn" data-type="competitor">⚔️ Phân Tích Đối Thủ</button>
                <button class="mission-type-btn" data-type="campaign">🚀 Lên Chiến Dịch</button>
                <button class="mission-type-btn" data-type="content">✍️ Tạo Content</button>
                <button class="mission-type-btn" data-type="custom">🎨 Tùy Chỉnh</button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="target-url">URL mục tiêu</label>
              <input type="url" id="target-url" class="form-input" placeholder="https://example.com" />
            </div>

            <div class="form-group">
              <label class="form-label" for="business-type">Loại hình kinh doanh</label>
              <select id="business-type" class="form-select">
                <option value="">Chọn loại hình...</option>
                <option value="ecommerce">E-Commerce</option>
                <option value="saas">SaaS / Phần mềm</option>
                <option value="local">Local Business</option>
                <option value="agency">Agency / Dịch vụ</option>
                <option value="education">Giáo dục</option>
                <option value="f&b">F&B / Nhà hàng</option>
                <option value="health">Sức khỏe / Làm đẹp</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="mission-detail">Mô tả chi tiết</label>
              <textarea id="mission-detail" class="form-textarea" rows="4" placeholder="Mô tả mục tiêu, đối tượng khách hàng, yêu cầu đặc biệt..."></textarea>
            </div>
          </div>

          <div class="command-actions">
            <button class="btn btn-primary btn-lg" id="generate-plan-btn" disabled>
              🚀 Tạo Kế Hoạch Hành Động
            </button>
            <p class="command-hint">Chọn ít nhất 1 agent và điền thông tin để bắt đầu</p>
          </div>

          <!-- Generated Plan -->
          <div class="generated-plan" id="generated-plan" style="display:none;">
            <div class="plan-header">
              <h3>📋 Kế Hoạch Hành Động</h3>
              <button class="btn btn-primary btn-sm" id="copy-plan-btn">📋 Copy toàn bộ</button>
            </div>
            <div class="plan-content" id="plan-content"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  initCommandEvents(container);
}

function initCommandEvents(container) {
  const checkboxes = container.querySelectorAll('.agent-check');
  const summaryEl = container.querySelector('#selected-summary .selected-count');
  const generateBtn = container.querySelector('#generate-plan-btn');
  const targetUrl = container.querySelector('#target-url');
  const missionDetail = container.querySelector('#mission-detail');
  const planContainer = container.querySelector('#generated-plan');
  const planContent = container.querySelector('#plan-content');

  function updateSelection() {
    const checked = container.querySelectorAll('.agent-check:checked');
    const count = checked.length;
    summaryEl.textContent = count;
    
    const hasInput = targetUrl.value.trim() || missionDetail.value.trim();
    generateBtn.disabled = count === 0 || !hasInput;
  }

  checkboxes.forEach(cb => cb.addEventListener('change', updateSelection));
  targetUrl.addEventListener('input', updateSelection);
  missionDetail.addEventListener('input', updateSelection);

  // Select/Clear all
  container.querySelector('#select-all-btn').addEventListener('click', () => {
    checkboxes.forEach(cb => cb.checked = true);
    updateSelection();
  });
  container.querySelector('#clear-all-btn').addEventListener('click', () => {
    checkboxes.forEach(cb => cb.checked = false);
    updateSelection();
  });

  // Mission type toggle
  container.querySelectorAll('.mission-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.mission-type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Generate plan
  generateBtn.addEventListener('click', () => {
    const selectedAgents = Array.from(container.querySelectorAll('.agent-check:checked'))
      .map(cb => marketingAgents.find(a => a.id === cb.value))
      .filter(Boolean);
    
    const missionType = container.querySelector('.mission-type-btn.active')?.dataset.type || 'custom';
    const url = targetUrl.value.trim();
    const detail = missionDetail.value.trim();
    const bizType = container.querySelector('#business-type').value;

    // Generate the combined prompt
    const combinedPrompt = generateCombinedPrompt(selectedAgents, missionType, url, bizType, detail);
    
    planContent.innerHTML = `
      <div class="plan-agents">
        <h4>🧠 Đội ngũ triển khai (${selectedAgents.length} agents)</h4>
        <div class="plan-agent-list">
          ${selectedAgents.map(a => `<span class="plan-agent-tag">${a.emoji} ${a.nameVi}</span>`).join('')}
        </div>
      </div>
      <div class="plan-prompt">
        <h4>📝 Prompt tổng hợp</h4>
        <p class="plan-instruction">Copy prompt bên dưới và paste vào <strong>Gemini</strong> hoặc <strong>ChatGPT</strong> để nhận kế hoạch chi tiết:</p>
        <pre class="prompt-block"><code>${escapeHtml(combinedPrompt)}</code></pre>
      </div>
      <div class="plan-quick-open">
        <a href="https://gemini.google.com/app" target="_blank" class="btn btn-accent btn-md">✨ Mở Gemini</a>
        <a href="https://chatgpt.com" target="_blank" class="btn btn-ghost btn-md">🤖 Mở ChatGPT</a>
      </div>
    `;
    planContainer.style.display = 'block';
    planContainer.scrollIntoView({ behavior: 'smooth' });
  });

  // Copy plan
  container.querySelector('#copy-plan-btn')?.addEventListener('click', async () => {
    const code = planContent.querySelector('code');
    if (code) {
      await navigator.clipboard.writeText(code.textContent);
      const btn = container.querySelector('#copy-plan-btn');
      btn.textContent = '✅ Đã copy!';
      setTimeout(() => btn.textContent = '📋 Copy toàn bộ', 2000);
    }
  });
}

function generateCombinedPrompt(agents, missionType, url, bizType, detail) {
  const missionLabels = {
    'audit': 'Audit Marketing toàn diện',
    'competitor': 'Phân tích đối thủ cạnh tranh',
    'campaign': 'Lên kế hoạch chiến dịch marketing',
    'content': 'Tạo bộ content marketing',
    'custom': 'Nhiệm vụ tùy chỉnh'
  };

  let prompt = `# 🎯 MISSION: ${missionLabels[missionType] || detail}\n\n`;
  
  if (url) prompt += `**URL mục tiêu:** ${url}\n`;
  if (bizType) prompt += `**Loại hình:** ${bizType}\n`;
  if (detail) prompt += `**Chi tiết:** ${detail}\n`;
  
  prompt += `\n---\n\n## Đội ngũ AI triển khai\n\n`;
  prompt += `Bạn sẽ đóng vai ${agents.length} chuyên gia marketing dưới đây, lần lượt phân tích và đưa ra đề xuất từ góc nhìn chuyên môn của mình:\n\n`;
  
  agents.forEach((agent, i) => {
    prompt += `### ${i + 1}. ${agent.emoji} ${agent.nameVi} (${agent.name})\n`;
    prompt += `${agent.descriptionVi}\n\n`;
  });

  prompt += `---\n\n## Yêu cầu output\n\n`;
  prompt += `1. Mỗi chuyên gia phân tích từ góc nhìn riêng\n`;
  prompt += `2. Đưa ra findings cụ thể (Critical / High / Medium / Low)\n`;
  prompt += `3. Mỗi finding kèm action item rõ ràng\n`;
  prompt += `4. Cuối cùng tổng hợp thành bản kế hoạch hành động ưu tiên\n`;
  prompt += `5. Format bằng Markdown, dễ đọc, có emoji\n`;

  return prompt;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
