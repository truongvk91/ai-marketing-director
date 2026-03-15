/**
 * Topbar component for AI Marketing Director
 */
export function renderTopbar() {
  return `
    <header class="topbar">
      <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
      <div class="topbar-search">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        <input type="text" placeholder="Tìm agents, templates, chiến dịch..." class="search-input" id="global-search" />
        <kbd class="search-shortcut">⌘K</kbd>
      </div>
      <div class="topbar-actions">
        <button class="topbar-btn" title="Thông báo">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 6.75a4.5 4.5 0 10-9 0c0 4.5-2.25 5.625-2.25 5.625h13.5s-2.25-1.125-2.25-5.625zM10.3 14.625a1.5 1.5 0 01-2.6 0" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span class="notification-dot"></span>
        </button>
        <div class="topbar-avatar" title="Marketing Director">
          <span>MD</span>
        </div>
      </div>
    </header>
  `;
}

export function initTopbar() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');
  if (mobileBtn && sidebar) {
    mobileBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  // Close sidebar on overlay click (mobile)
  document.addEventListener('click', (e) => {
    if (sidebar && sidebar.classList.contains('mobile-open') && !sidebar.contains(e.target) && e.target !== mobileBtn) {
      sidebar.classList.remove('mobile-open');
    }
  });

  // Cmd+K search shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      document.getElementById('global-search')?.focus();
    }
  });
}
