# SPEAKSMART - HTML/CSS/JavaScript Version

This is the vanilla HTML/CSS/JavaScript conversion of the SPEAKSMART React/Next.js application.

## Project Structure

```
public/
├── index.html                 # Landing page
├── register.html              # User registration
├── login.html                 # User login
├── password-reset.html        # Password reset
├── dashboard.html             # User dashboard
├── profile.html               # User profile
├── practice-english.html      # English practice
├── practice-spanish.html      # Spanish practice
├── practice-french.html       # French practice
├── practice-german.html       # German practice
├── practice-italian.html      # Italian practice
├── practice-japanese.html     # Japanese practice
├── languages.html             # Languages overview
├── lessons.html               # Lessons page
├── leaderboard.html           # Global leaderboard
├── settings.html              # User settings
├── about.html                 # About page
├── contact.html               # Contact page
├── privacy.html               # Privacy policy
├── terms.html                 # Terms of service
├── styles/
│   └── globals.css            # Global styles with Tailwind
└── js/
    ├── navbar.js              # Navigation manager
    ├── auth-manager.js        # Authentication manager
    ├── firebase-config.js     # Firebase configuration
    └── speech-recognition.js  # Speech recognition API
```

## Features

### Core Functionality
- **Authentication**: User registration, login, logout, password reset
- **Voice Recognition**: Web Speech API integration for pronunciation practice
- **Real-time Feedback**: AI-powered pronunciation scoring (placeholder implementation)
- **Progress Tracking**: User stats, streaks, XP, and levels
- **Multi-language Support**: 10+ languages with multiple accents
- **Leaderboard**: Global ranking system

### Technologies Used
- **HTML5**: Semantic markup
- **CSS**: Tailwind CSS with custom design tokens
- **JavaScript**: Vanilla ES6+ (no frameworks)
- **APIs**:
  - Web Speech API (speech recognition)
  - LocalStorage (client-side data persistence)
  - Firebase (cloud backend - optional)

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd speaksmart
```

### 2. Set Up Local Server
Since this uses ES6 modules and needs a proper CORS setup, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server

# Using Ruby
ruby -run -ehttpd . -p8000
```

Then visit: `http://localhost:8000/public/`

### 3. Firebase Setup (Optional)
To enable cloud backend features:

1. Create a Firebase project
2. Update `public/js/firebase-config.js` with your credentials
3. Uncomment Firebase imports in the HTML files

## File Organization

### HTML Pages
Each page follows a consistent structure:
- Navigation bar with auth state
- Main content area
- Footer with links
- Script imports for navbar and auth managers

### JavaScript Modules

#### `auth-manager.js`
Handles user authentication and session management using localStorage

```javascript
import { authManager } from '/js/auth-manager.js';

// Get current user
const user = authManager.getCurrentUser();

// Login
await authManager.login(email, password);

// Logout
authManager.logout();
```

#### `speech-recognition.js`
Manages Web Speech API for voice practice

```javascript
import { speechManager } from '/js/speech-recognition.js';

// Start recording
speechManager.start('en-US');

// Stop recording
speechManager.stop();

// Listen for results
speechManager.subscribe((event, data) => {
  if (event === 'result') {
    console.log(data.transcript);
  }
});
```

#### `navbar.js`
Manages navigation and auth UI updates

```javascript
new NavbarManager(); // Initializes automatically on page load
```

### CSS Structure

The `globals.css` file includes:
- CSS custom properties for design tokens
- Tailwind directives
- Custom utility classes:
  - `.glass`: Glassmorphism effect
  - `.gradient-text`: Gradient text styling
  - `.glow`: Glow effect shadows
  - `.animate-bounce`: Bounce animation

## Styling

### Design Tokens (CSS Variables)
```css
:root {
  --background: oklch(0.13 0.02 280);
  --foreground: oklch(0.98 0.01 280);
  --primary: oklch(0.65 0.25 280);
  --accent: oklch(0.55 0.20 320);
  /* ... more colors ... */
}
```

### Responsive Design
Uses Tailwind breakpoints:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px

## Features Implementation Status

### Completed
- ✅ Landing page with hero section
- ✅ User authentication (register/login)
- ✅ Dashboard with stats and progress
- ✅ Practice pages with UI framework
- ✅ Leaderboard display
- ✅ User profile management
- ✅ Mobile responsive design
- ✅ Dark theme styling

### In Progress
- 🔄 Web Speech API integration
- 🔄 Firebase backend connection
- 🔄 AI pronunciation scoring logic

### To Do
- ⏳ Audio playback for native speakers
- ⏳ Real-time pronunciation feedback
- ⏳ Lesson structured learning paths
- ⏳ Achievement system
- ⏳ Social features

## Deployment

### Static Hosting (Vercel, Netlify, etc.)
```bash
# Build process not needed - ready to deploy
# Simply push the public/ folder to your host
```

### Docker (Optional)
```dockerfile
FROM nginx:alpine
COPY public/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Browser Support
- Chrome/Edge 80+
- Firefox 75+
- Safari 12+
- Mobile browsers with Web Speech API support

## Accessibility
- Semantic HTML5 elements
- ARIA attributes where needed
- Keyboard navigation support
- Focus states for interactive elements
- Alt text for images

## Performance Optimization
- Minimal external dependencies
- No JavaScript frameworks overhead
- Static HTML serving
- CSS-based animations (GPU accelerated)
- LocalStorage for instant data access

## Security Considerations
- Input validation on forms
- No sensitive data in localStorage
- HTTPS recommended for production
- Firebase security rules (if using backend)
- Content Security Policy headers

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License
MIT License - See LICENSE file for details

## Support
For issues and questions, visit: `/contact.html`

## Roadmap
- Mobile app version (React Native)
- Advanced AI pronunciation scoring
- Video lessons
- Community forums
- Premium subscription features
