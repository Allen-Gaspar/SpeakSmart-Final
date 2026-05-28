// Authentication Manager
export class AuthManager {
  constructor() {
    this.user = this.getStoredUser();
    this.listeners = [];
  }

  // Store user in localStorage
  setUser(userData) {
    this.user = userData;
    localStorage.setItem('speaksmart_user', JSON.stringify(userData));
    this.notifyListeners();
  }

  // Get stored user from localStorage
  getStoredUser() {
    const stored = localStorage.getItem('speaksmart_user');
    return stored ? JSON.parse(stored) : null;
  }

  // Clear user
  clearUser() {
    this.user = null;
    localStorage.removeItem('speaksmart_user');
    this.notifyListeners();
  }

  // Register user
  async register(email, password, displayName) {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, displayName })
      });

      if (!response.ok) throw new Error('Registration failed');

      const data = await response.json();
      this.setUser(data.user);
      return data;
    } catch (error) {
      console.error("[v0] Registration error:", error);
      throw error;
    }
  }

  // Login user
  async login(email, password) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      this.setUser(data.user);
      return data;
    } catch (error) {
      console.error("[v0] Login error:", error);
      throw error;
    }
  }

  // Logout user
  logout() {
    this.clearUser();
    window.location.href = '/';
  }

  // Get current user
  getCurrentUser() {
    return this.user;
  }

  // Subscribe to auth changes
  onAuthStateChanged(callback) {
    this.listeners.push(callback);
  }

  // Notify all listeners
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.user));
  }
}

// Create singleton instance
export const authManager = new AuthManager();

// Initialize on page load
window.addEventListener('load', () => {
  if (authManager.user) {
    console.log("[v0] User logged in:", authManager.user.email);
  }
});
