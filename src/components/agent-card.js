/**
 * Agent Card component for AI Marketing Director
 */
export function renderAgentCard(agent, options = {}) {
  const { compact = false, showPromptBtn = true } = options;
  const tagsHtml = agent.tags.slice(0, 4).map(t => `<span class="tag">${t}</span>`).join('');
  
  if (compact) {
    return `
      <div class="agent-card compact" data-agent-id="${agent.id}">
        <div class="agent-card-header">
          <span class="agent-emoji">${agent.emoji}</span>
          <div class="agent-info">
            <h4 class="agent-name">${agent.nameVi}</h4>
            <p class="agent-vibe">${agent.vibeVi}</p>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="agent-card" data-agent-id="${agent.id}">
      <div class="agent-card-glow" style="--agent-color: var(--color-${agent.color}, #6366f1)"></div>
      <div class="agent-card-header">
        <span class="agent-emoji">${agent.emoji}</span>
        <div class="agent-info">
          <h3 class="agent-name">${agent.nameVi}</h3>
          <p class="agent-name-en">${agent.name}</p>
        </div>
      </div>
      <p class="agent-vibe">${agent.vibeVi}</p>
      <p class="agent-desc">${agent.descriptionVi}</p>
      <div class="agent-tags">${tagsHtml}</div>
      <div class="agent-actions">
        ${showPromptBtn ? `
          <button class="btn btn-primary btn-sm copy-prompt-btn" data-agent-id="${agent.id}" title="Copy prompt vào clipboard">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M10 4V2.5A1.5 1.5 0 008.5 1h-6A1.5 1.5 0 001 2.5v6A1.5 1.5 0 002.5 10H4" stroke="currentColor" stroke-width="1.2"/></svg>
            Copy Prompt
          </button>
          <button class="btn btn-ghost btn-sm view-detail-btn" data-agent-id="${agent.id}" title="Xem chi tiết">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 2L10 7l-4.5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

export function renderAgentDetail(agent) {
  return `
    <div class="agent-detail">
      <div class="agent-detail-header">
        <span class="agent-detail-emoji">${agent.emoji}</span>
        <div>
          <h2>${agent.nameVi}</h2>
          <p class="text-muted">${agent.name}</p>
        </div>
      </div>
      <p class="agent-detail-vibe">"${agent.vibeVi}"</p>
      <div class="agent-detail-desc">
        <h4>Mô tả</h4>
        <p>${agent.descriptionVi}</p>
      </div>
      <div class="agent-detail-tags">
        <h4>Chuyên môn</h4>
        <div class="tags-list">${agent.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
      <div class="agent-detail-prompt">
        <div class="prompt-header">
          <h4>System Prompt</h4>
          <button class="btn btn-primary btn-sm copy-prompt-btn" data-agent-id="${agent.id}">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M10 4V2.5A1.5 1.5 0 008.5 1h-6A1.5 1.5 0 001 2.5v6A1.5 1.5 0 002.5 10H4" stroke="currentColor" stroke-width="1.2"/></svg>
            Copy Prompt
          </button>
        </div>
        <pre class="prompt-block"><code>${escapeHtml(agent.prompt)}</code></pre>
      </div>
      <div class="agent-detail-actions">
        <a href="https://gemini.google.com/app" target="_blank" class="btn btn-accent btn-md">
          ✨ Mở Gemini
        </a>
        <a href="https://chatgpt.com" target="_blank" class="btn btn-ghost btn-md">
          🤖 Mở ChatGPT
        </a>
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
