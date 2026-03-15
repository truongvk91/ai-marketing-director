/**
 * AI Marketing Team page for AI Marketing Director
 */
import { marketingAgents } from '../data/agents-marketing.js';
import { renderAgentCard, renderAgentDetail } from '../components/agent-card.js';
import { renderModal, openModal, closeModal } from '../components/modal.js';

export function renderTeam(container) {
  const allTags = [...new Set(marketingAgents.flatMap(a => a.tags))].sort();

  container.innerHTML = `
    <div class="page team-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">🧠 AI Marketing Team</h1>
          <p class="page-subtitle">Đội ngũ ${marketingAgents.length} chuyên gia AI sẵn sàng phục vụ</p>
        </div>
        <div class="page-header-actions">
          <div class="view-toggle">
            <button class="toggle-btn active" data-view="grid" title="Grid view">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.2"/></svg>
            </button>
            <button class="toggle-btn" data-view="list" title="List view">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 3h14M1 8h14M1 13h14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="filters-bar">
        <div class="search-filter">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          <input type="text" placeholder="Tìm agent..." class="filter-input" id="agent-search" />
        </div>
        <div class="tag-filters" id="tag-filters">
          <button class="tag-filter active" data-tag="all">Tất cả</button>
          ${allTags.slice(0, 12).map(tag => `<button class="tag-filter" data-tag="${tag}">${tag}</button>`).join('')}
        </div>
      </div>

      <!-- Agents Grid -->
      <div class="agents-grid" id="agents-grid">
        ${marketingAgents.map(agent => renderAgentCard(agent)).join('')}
      </div>

      <!-- Agent count -->
      <div class="agents-count" id="agents-count">
        Hiển thị <strong>${marketingAgents.length}</strong> / ${marketingAgents.length} agents
      </div>
    </div>

    <!-- Agent Detail Modal -->
    <div id="agent-modal-container"></div>
  `;

  initTeamEvents(container);
}

function initTeamEvents(container) {
  const grid = container.querySelector('#agents-grid');
  const searchInput = container.querySelector('#agent-search');
  const tagFilters = container.querySelector('#tag-filters');
  const countEl = container.querySelector('#agents-count');
  let currentTag = 'all';
  let currentSearch = '';
  let currentView = 'grid';

  function filterAgents() {
    const filtered = marketingAgents.filter(agent => {
      const matchesTag = currentTag === 'all' || agent.tags.includes(currentTag);
      const matchesSearch = currentSearch === '' || 
        agent.nameVi.toLowerCase().includes(currentSearch) ||
        agent.name.toLowerCase().includes(currentSearch) ||
        agent.descriptionVi.toLowerCase().includes(currentSearch) ||
        agent.tags.some(t => t.includes(currentSearch));
      return matchesTag && matchesSearch;
    });

    grid.innerHTML = filtered.map(agent => renderAgentCard(agent)).join('');
    countEl.innerHTML = `Hiển thị <strong>${filtered.length}</strong> / ${marketingAgents.length} agents`;
    
    // Re-bind card events
    bindCardEvents();
  }

  // Search
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.toLowerCase();
    filterAgents();
  });

  // Tag filters
  tagFilters.addEventListener('click', (e) => {
    const btn = e.target.closest('.tag-filter');
    if (!btn) return;
    tagFilters.querySelectorAll('.tag-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTag = btn.dataset.tag;
    filterAgents();
  });

  // View toggle
  container.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentView = btn.dataset.view;
      grid.classList.toggle('list-view', currentView === 'list');
    });
  });

  function bindCardEvents() {
    // Copy prompt
    grid.querySelectorAll('.copy-prompt-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const agent = marketingAgents.find(a => a.id === btn.dataset.agentId);
        if (agent) {
          await navigator.clipboard.writeText(agent.prompt);
          const original = btn.innerHTML;
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Đã copy!`;
          btn.classList.add('copied');
          setTimeout(() => {
            btn.innerHTML = original;
            btn.classList.remove('copied');
          }, 2000);
        }
      });
    });

    // View detail
    grid.querySelectorAll('.view-detail-btn, .agent-card').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('.copy-prompt-btn')) return;
        const card = e.target.closest('.agent-card');
        const agentId = card?.dataset.agentId;
        const agent = marketingAgents.find(a => a.id === agentId);
        if (agent) showAgentModal(agent);
      });
    });
  }

  function showAgentModal(agent) {
    const modalContainer = container.querySelector('#agent-modal-container');
    modalContainer.innerHTML = renderModal('agent-detail', agent.nameVi, renderAgentDetail(agent), { size: 'large' });
    openModal('agent-detail');

    // Bind copy in modal
    modalContainer.querySelectorAll('.copy-prompt-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        await navigator.clipboard.writeText(agent.prompt);
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Đã copy!`;
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M10 4V2.5A1.5 1.5 0 008.5 1h-6A1.5 1.5 0 001 2.5v6A1.5 1.5 0 002.5 10H4" stroke="currentColor" stroke-width="1.2"/></svg> Copy Prompt`;
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  }

  bindCardEvents();
}
