/**
 * Dashboard page for AI Marketing Director
 */
import { marketingAgents } from '../data/agents-marketing.js';
import { contentTemplates } from '../data/templates.js';

export function renderDashboard(container) {
  const totalAgents = marketingAgents.length;
  
  container.innerHTML = `
    <div class="page dashboard-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Xin chào, Director! 👋</h1>
          <p class="page-subtitle">Đội ngũ AI Marketing của bạn đã sẵn sàng. Hôm nay bạn muốn làm gì?</p>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon" style="background: linear-gradient(135deg, #6366f1, #8b5cf6)">🧠</div>
          <div class="stat-content">
            <span class="stat-value">${totalAgents}</span>
            <span class="stat-label">AI Agents</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: linear-gradient(135deg, #10b981, #34d399)">✍️</div>
          <div class="stat-content">
            <span class="stat-value">${contentTemplates.length}</span>
            <span class="stat-label">Templates</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: linear-gradient(135deg, #f59e0b, #fbbf24)">📊</div>
          <div class="stat-content">
            <span class="stat-value">3</span>
            <span class="stat-label">Bước Phân Tích</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: linear-gradient(135deg, #ef4444, #f87171)">🚀</div>
          <div class="stat-content">
            <span class="stat-value">∞</span>
            <span class="stat-label">Tiềm Năng</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="section">
        <h2 class="section-title">⚡ Quick Actions</h2>
        <div class="quick-actions-grid">
          <a href="#/command" class="action-card action-gradient-1">
            <span class="action-icon">🎯</span>
            <h3>Command Center</h3>
            <p>Điều phối đội ngũ AI agents, chạy audit marketing toàn diện</p>
          </a>
          <a href="#/content" class="action-card action-gradient-2">
            <span class="action-icon">✍️</span>
            <h3>Tạo Content</h3>
            <p>Sử dụng templates và AI agents để tạo nội dung marketing</p>
          </a>
          <a href="#/analyzer" class="action-card action-gradient-3">
            <span class="action-icon">🔍</span>
            <h3>Phân Tích Ads</h3>
            <p>Thu thập, phân tích và tối ưu ads đối thủ theo quy trình 3 bước</p>
          </a>
          <a href="#/strategy" class="action-card action-gradient-4">
            <span class="action-icon">📈</span>
            <h3>Chiến Lược</h3>
            <p>Xây dựng chiến lược marketing và tạo báo cáo chuyên nghiệp</p>
          </a>
        </div>
      </div>

      <!-- Featured Agents -->
      <div class="section">
        <h2 class="section-title">🌟 Top Agents</h2>
        <div class="featured-agents">
          ${marketingAgents.slice(0, 6).map(agent => `
            <div class="featured-agent-card" data-agent-id="${agent.id}">
              <span class="featured-emoji">${agent.emoji}</span>
              <div class="featured-info">
                <h4>${agent.nameVi}</h4>
                <p>${agent.vibeVi}</p>
              </div>
              <button class="btn btn-ghost btn-sm copy-prompt-btn" data-agent-id="${agent.id}" title="Copy prompt">
                📋
              </button>
            </div>
          `).join('')}
        </div>
        <a href="#/team" class="view-all-link">Xem toàn bộ ${totalAgents} agents →</a>
      </div>

      <!-- Workflow Preview -->
      <div class="section">
        <h2 class="section-title">🔄 Quy Trình Làm Việc</h2>
        <div class="workflow-steps">
          <div class="workflow-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>Thu Thập Dữ Liệu</h4>
              <p>Cào dữ liệu ads đối thủ bằng Playwright, chụp screenshot, lấy copy</p>
            </div>
          </div>
          <div class="workflow-connector"></div>
          <div class="workflow-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>Phân Tích & Insight</h4>
              <p>AI agents phân tích visual, content, customer insight, tìm lỗ hổng</p>
            </div>
          </div>
          <div class="workflow-connector"></div>
          <div class="workflow-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>Tối Ưu & Triển Khai</h4>
              <p>Đề xuất cải thiện, tạo content mới, xuất báo cáo chuyên sâu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  initDashboardEvents(container);
}

function initDashboardEvents(container) {
  // Copy prompt buttons
  container.querySelectorAll('.copy-prompt-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const agentId = btn.dataset.agentId;
      const agent = marketingAgents.find(a => a.id === agentId);
      if (agent) {
        await navigator.clipboard.writeText(agent.prompt);
        const original = btn.innerHTML;
        btn.innerHTML = '✅';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = original;
          btn.classList.remove('copied');
        }, 2000);
      }
    });
  });
}
