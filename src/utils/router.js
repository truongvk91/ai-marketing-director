/**
 * Simple hash-based SPA router for AI Marketing Director
 */
export class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentRoute = null;
    window.addEventListener('hashchange', () => this.resolve());
    window.addEventListener('DOMContentLoaded', () => this.resolve());
  }

  resolve() {
    const hash = window.location.hash.slice(1) || '/dashboard';
    const route = this.routes.find(r => r.path === hash) || this.routes[0];
    
    if (this.currentRoute !== route.path) {
      this.currentRoute = route.path;
      const container = document.getElementById('page-content');
      if (container) {
        container.innerHTML = '';
        container.classList.add('page-transition');
        route.render(container);
        requestAnimationFrame(() => {
          container.classList.remove('page-transition');
        });
      }
      // Update active nav
      document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.toggle('active', el.dataset.path === hash);
      });
    }
  }

  navigate(path) {
    window.location.hash = path;
  }
}
