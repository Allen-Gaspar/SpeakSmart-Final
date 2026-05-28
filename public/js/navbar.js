// Navigation and UI Manager
import { authManager } from './auth-manager.js';

export class NavbarManager {
  constructor() {
    this.setupMobileMenu();
    this.updateAuthNav();
    authManager.onAuthStateChanged(() => this.updateAuthNav());
  }

  setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu?.classList.toggle('hidden');
      });
    }

    // Close menu when link is clicked
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu?.classList.add('hidden');
      });
    });
  }

  updateAuthNav() {
    const authNav = document.getElementById('auth-nav');
    if (!authNav) return;

    const user = authManager.getCurrentUser();

    if (user) {
      authNav.innerHTML = `
        <div class="flex items-center gap-3">
          <a href="/dashboard.html" class="text-muted-foreground hover:text-foreground transition-colors">Dashboard</a>
          <a href="/profile.html" class="text-muted-foreground hover:text-foreground transition-colors">Profile</a>
          <button id="logout-btn" class="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors">
            Sign Out
          </button>
        </div>
      `;

      const logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => authManager.logout());
      }
    } else {
      authNav.innerHTML = `
        <div class="flex items-center gap-3">
          <a href="/login.html">
            <button class="px-4 py-2 rounded-lg hover:bg-secondary transition-colors">Sign In</button>
          </a>
          <a href="/register.html">
            <button class="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors glow-sm">Get Started</button>
          </a>
        </div>
      `;
    }
  }
}

// Initialize on page load
window.addEventListener('load', () => {
  new NavbarManager();
});

export const navbarManager = new NavbarManager();
