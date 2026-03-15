/**
 * Content Workshop page for AI Marketing Director
 */
import { contentTemplates } from '../data/templates.js';
import { marketingAgents } from '../data/agents-marketing.js';

export function renderContent(container) {
  const categories = [
    { id: 'all', label: 'Tất cả', icon: '📋' },
    { id: 'ads', label: 'Quảng cáo', icon: '📘' },
    { id: 'video', label: 'Video', icon: '🎬' },
    { id: 'email', label: 'Email', icon: '📧' },
    { id: 'content', label: 'Nội dung', icon: '📝' },
    { id: 'strategy', label: 'Chiến lược', icon: '🔍' },
    { id: 'report', label: 'Báo cáo', icon: '📊' },
  ];

  container.innerHTML = `
    <div class="page content-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">✍️ Content Workshop</h1>
          <p class="page-subtitle">Templates sẵn có giúp bạn tạo content marketing chuyên nghiệp trong vài phút</p>
        </div>
      </div>

      <!-- Category Filter -->
      <div class="category-tabs">
        ${categories.map(cat => `
          <button class="category-tab ${cat.id === 'all' ? 'active' : ''}" data-category="${cat.id}">
            <span>${cat.icon}</span>
            <span>${cat.label}</span>
          </button>
        `).join('')}
      </div>

      <!-- Templates Grid -->
      <div class="templates-grid" id="templates-grid">
        ${contentTemplates.map(tmpl => `
          <div class="template-card" data-template-id="${tmpl.id}" data-category="${tmpl.category}">
            <div class="template-icon">${tmpl.icon}</div>
            <h3 class="template-name">${tmpl.nameVi}</h3>
            <p class="template-desc">${tmpl.description}</p>
            <div class="template-actions">
              <button class="btn btn-primary btn-sm use-template-btn" data-template-id="${tmpl.id}">
                Sử dụng
              </button>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Template Workspace (hidden by default) -->
      <div class="template-workspace" id="template-workspace" style="display:none;">
        <div class="workspace-header">
          <button class="btn btn-ghost btn-sm" id="back-to-templates">← Quay lại</button>
          <h3 id="workspace-title"></h3>
        </div>
        <div class="workspace-content">
          <div class="workspace-left">
            <div class="form-group">
              <label class="form-label">📝 Template Prompt</label>
              <textarea id="workspace-prompt" class="form-textarea workspace-textarea" rows="16" placeholder="Template sẽ hiển thị ở đây..."></textarea>
            </div>
            <div class="workspace-actions">
              <button class="btn btn-primary btn-md" id="copy-workspace-prompt">
                📋 Copy Prompt
              </button>
              <a href="https://gemini.google.com/app" target="_blank" class="btn btn-accent btn-md">
                ✨ Mở Gemini
              </a>
              <a href="https://chatgpt.com" target="_blank" class="btn btn-ghost btn-md">
                🤖 Mở ChatGPT
              </a>
            </div>
          </div>
          <div class="workspace-right">
            <h4>💡 Agent gợi ý</h4>
            <p class="text-muted">Agents phù hợp nhất cho template này:</p>
            <div id="suggested-agents"></div>
          </div>
        </div>
      </div>

      <!-- Saved Content -->
      <div class="section" id="saved-section">
        <h2 class="section-title">💾 Nội dung đã lưu</h2>
        <div id="saved-content-list">
          <div class="empty-state">
            <span class="empty-icon">📂</span>
            <p>Chưa có nội dung nào được lưu</p>
            <p class="text-muted">Tạo content từ templates phía trên, kết quả sẽ lưu tại đây</p>
          </div>
        </div>
      </div>
    </div>
  `;

  initContentEvents(container);
}

function initContentEvents(container) {
  const grid = container.querySelector('#templates-grid');
  const workspace = container.querySelector('#template-workspace');
  const savedSection = container.querySelector('#saved-section');

  // Category filter
  container.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.category;
      
      container.querySelectorAll('.template-card').forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
      });
    });
  });

  // Use template
  container.querySelectorAll('.use-template-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const template = contentTemplates.find(t => t.id === btn.dataset.templateId);
      if (!template) return;

      // Show workspace
      grid.style.display = 'none';
      workspace.style.display = 'block';
      savedSection.style.display = 'none';
      container.querySelector('.category-tabs').style.display = 'none';

      container.querySelector('#workspace-title').textContent = `${template.icon} ${template.nameVi}`;
      container.querySelector('#workspace-prompt').value = template.template;

      // Suggest relevant agents
      const suggestedEl = container.querySelector('#suggested-agents');
      const relevantAgents = findRelevantAgents(template);
      suggestedEl.innerHTML = relevantAgents.map(agent => `
        <div class="suggested-agent">
          <span>${agent.emoji}</span>
          <div>
            <strong>${agent.nameVi}</strong>
            <p class="text-muted text-sm">${agent.vibeVi}</p>
          </div>
          <button class="btn btn-ghost btn-sm copy-prompt-btn" data-agent-id="${agent.id}" title="Copy agent prompt">📋</button>
        </div>
      `).join('');

      // Bind copy agent prompt
      suggestedEl.querySelectorAll('.copy-prompt-btn').forEach(abtn => {
        abtn.addEventListener('click', async () => {
          const agent = marketingAgents.find(a => a.id === abtn.dataset.agentId);
          if (agent) {
            await navigator.clipboard.writeText(agent.prompt);
            abtn.textContent = '✅';
            setTimeout(() => abtn.textContent = '📋', 2000);
          }
        });
      });
    });
  });

  // Back to templates
  container.querySelector('#back-to-templates').addEventListener('click', () => {
    grid.style.display = '';
    workspace.style.display = 'none';
    savedSection.style.display = '';
    container.querySelector('.category-tabs').style.display = '';
  });

  // Copy workspace prompt
  container.querySelector('#copy-workspace-prompt').addEventListener('click', async () => {
    const textarea = container.querySelector('#workspace-prompt');
    await navigator.clipboard.writeText(textarea.value);
    const btn = container.querySelector('#copy-workspace-prompt');
    btn.textContent = '✅ Đã copy!';
    setTimeout(() => btn.textContent = '📋 Copy Prompt', 2000);
  });

  // Load saved content
  loadSavedContent(container);
}

function findRelevantAgents(template) {
  const categoryAgentMap = {
    'ads': ['marketing-growth-hacker', 'marketing-content-creator'],
    'video': ['marketing-tiktok-strategist', 'marketing-short-video-editing-coach', 'marketing-instagram-curator'],
    'email': ['marketing-private-domain-operator', 'marketing-growth-hacker'],
    'content': ['marketing-content-creator', 'marketing-seo-specialist', 'marketing-linkedin-content-creator'],
    'strategy': ['marketing-growth-hacker', 'marketing-social-media-strategist'],
    'report': ['marketing-growth-hacker', 'marketing-social-media-strategist'],
  };

  const agentIds = categoryAgentMap[template.category] || ['marketing-content-creator', 'marketing-growth-hacker'];
  return agentIds.map(id => marketingAgents.find(a => a.id === id)).filter(Boolean);
}

function loadSavedContent(container) {
  const saved = JSON.parse(localStorage.getItem('mocha_saved_content') || '[]');
  const listEl = container.querySelector('#saved-content-list');
  
  if (saved.length === 0) return;

  listEl.innerHTML = saved.map((item, i) => `
    <div class="saved-item">
      <div class="saved-item-info">
        <strong>${item.title}</strong>
        <span class="text-muted">${new Date(item.date).toLocaleDateString('vi-VN')}</span>
      </div>
      <button class="btn btn-ghost btn-sm" data-index="${i}">Xem</button>
    </div>
  `).join('');
}
