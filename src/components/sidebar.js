/**
 * Sidebar component for AI Marketing Director
 */
export function renderSidebar() {
  const navItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/team', icon: '🧠', label: 'AI Team' },
    { path: '/command', icon: '🎯', label: 'Command Center' },
    { path: '/content', icon: '✍️', label: 'Content Workshop' },
    { path: '/analyzer', icon: '🔍', label: 'Ads Analyzer' },
    { path: '/strategy', icon: '📈', label: 'Strategy & Reports' },
  ];

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <span class="logo-icon">🚀</span>
          <div class="logo-text">
            <h1>AI Marketing Director</h1>
            <span class="logo-subtitle">Platform</span>
          </div>
        </div>
        <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle sidebar">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <span class="nav-section-title">WORKSPACE</span>
          ${navItems.map(item => `
            <a href="#${item.path}" class="nav-item ${window.location.hash === '#' + item.path ? 'active' : ''}" data-path="${item.path}">
              <span class="nav-icon">${item.icon}</span>
              <span class="nav-label">${item.label}</span>
            </a>
          `).join('')}
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="sidebar-badge">
          <span class="badge-dot"></span>
          <span>Phase A — Frontend MVP</span>
        </div>
        <div class="sidebar-version">v1.0.0</div>
      </div>
    </aside>
  `;
}

export function initSidebar() {
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const app = document.getElementById('app');

  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      app.classList.toggle('sidebar-collapsed');
    });
  }
}
