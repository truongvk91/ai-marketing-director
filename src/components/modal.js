/**
 * Modal component for AI Marketing Director
 */
export function renderModal(id, title, content, options = {}) {
  const { size = 'medium', showClose = true } = options;
  return `
    <div class="modal-overlay" id="${id}-overlay">
      <div class="modal modal-${size}" id="${id}">
        <div class="modal-header">
          <h2 class="modal-title">${title}</h2>
          ${showClose ? `<button class="modal-close" data-modal-close="${id}" aria-label="Đóng">&times;</button>` : ''}
        </div>
        <div class="modal-body">
          ${content}
        </div>
      </div>
    </div>
  `;
}

export function openModal(id) {
  const overlay = document.getElementById(`${id}-overlay`);
  if (overlay) {
    overlay.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
  }
}

export function closeModal(id) {
  const overlay = document.getElementById(`${id}-overlay`);
  if (overlay) {
    overlay.classList.remove('modal-open');
    document.body.style.overflow = '';
  }
}

export function initModals() {
  document.addEventListener('click', (e) => {
    // Close button
    if (e.target.dataset.modalClose) {
      closeModal(e.target.dataset.modalClose);
    }
    // Overlay click
    if (e.target.classList.contains('modal-overlay')) {
      const modal = e.target.querySelector('.modal');
      if (modal) closeModal(modal.id);
    }
  });

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.modal-open').forEach(overlay => {
        const modal = overlay.querySelector('.modal');
        if (modal) closeModal(modal.id);
      });
    }
  });
}
