/**
 * AI Marketing Director Platform
 * Main entry point
 */
import './style.css';
import { Router } from './utils/router.js';
import { renderSidebar, initSidebar } from './components/sidebar.js';
import { renderTopbar, initTopbar } from './components/topbar.js';
import { initModals } from './components/modal.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderTeam } from './pages/team.js';
import { renderCommand } from './pages/command.js';
import { renderContent } from './pages/content.js';
import { renderAnalyzer } from './pages/analyzer.js';
import { renderStrategy } from './pages/strategy.js';

// App Shell
document.querySelector('#app').innerHTML = `
  ${renderSidebar()}
  <main class="main-content">
    ${renderTopbar()}
    <div class="page-container" id="page-content"></div>
  </main>
`;

// Initialize components
initSidebar();
initTopbar();
initModals();

// Router
const router = new Router([
  { path: '/dashboard', render: renderDashboard },
  { path: '/team', render: renderTeam },
  { path: '/command', render: renderCommand },
  { path: '/content', render: renderContent },
  { path: '/analyzer', render: renderAnalyzer },
  { path: '/strategy', render: renderStrategy },
]);

// Initial resolve
if (!window.location.hash) {
  window.location.hash = '/dashboard';
}
router.resolve();
