# Design Document: Mandi AI Platform

## Overview

The Mandi AI Platform is a frontend-focused web application built with HTML5, CSS3, and vanilla JavaScript. The system provides a multilingual, voice-enabled interface for farmers and traders to discover fair market prices, analyze trends, and receive negotiation assistance. The architecture emphasizes user experience through responsive design, smooth animations, and comprehensive voice command support.

## Architecture

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer (HTML/CSS/JS)              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Pages: 6 HTML pages with multilingual content       │   │
│  │  Styling: CSS3 with Glassmorphism & Animations       │   │
│  │  Voice: Web Speech API for recognition & synthesis   │   │
│  │  Storage: LocalStorage for preferences               │   │
│  │  State: JavaScript for dynamic UI updates            │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- HTML5 for semantic markup
- CSS3 with CSS Variables for theming
- Vanilla JavaScript (ES6+)
- Web Speech API for voice recognition and synthesis
- LocalStorage for data persistence
- Responsive CSS Grid and Flexbox

**Features:**
- Multi-page architecture (6 pages)
- Dynamic language switching
- Voice input and output
- Form validation
- Real-time UI updates
- Smooth animations and transitions

## Pages and Components

### 1. Home Page (index.html)
**Purpose:** Landing page with feature overview

**Components:**
- Navigation bar with language switcher and voice button
- Hero section with platform introduction
- Feature cards (6 features in single line)
- Call-to-action buttons
- Footer with copyright information

**Key Elements:**
- Responsive layout
- Smooth animations
- Professional design
- Voice button for commands

### 2. Dashboard Page (dashboard.html)
**Purpose:** User dashboard with quick stats

**Components:**
- Navigation bar
- Page header with title and description
- Dashboard widgets with statistics
- Quick-access features
- Recent activity section
- Footer

**Key Elements:**
- Role-based content display
- Quick stats cards
- Responsive grid layout

### 3. Price Discovery Page (price-discovery.html)
**Purpose:** Commodity price search and discovery

**Components:**
- Navigation bar
- Page header
- Search form with:
  - Commodity dropdown (Wheat, Rice, Cotton, Sugarcane)
  - Quantity input (in kg)
  - Region dropdown (29 Indian states)
  - Submit button
- Results section with:
  - Price recommendations
  - Confidence levels
  - Supporting data
- Footer

**Key Elements:**
- Form validation
- Voice command support
- Dynamic results display
- Responsive design

### 4. Market Analytics Page (market-analytics.html)
**Purpose:** Market trends and analytics

**Components:**
- Navigation bar
- Page header
- Analytics dashboard with:
  - Trend charts
  - Market data visualization
  - Filter controls
  - Statistics cards
- Footer

**Key Elements:**
- Visual data representation
- Responsive charts
- Filter functionality

### 5. Negotiation Page (negotiation.html)
**Purpose:** AI negotiation assistant

**Components:**
- Navigation bar
- Page header
- Input form with:
  - Commodity dropdown
  - Buyer's offer input
  - Expected price input
  - Quantity input
  - Submit button
- Results section with:
  - Suggested counter-offer
  - Price gap percentage
  - Success rate prediction
  - Negotiation tips list
  - Sample negotiation script
  - Save button
- Footer

**Key Elements:**
- Form validation
- Voice command support
- Dynamic calculations
- Results display

### 6. Profile Page (profile.html)
**Purpose:** User profile and settings

**Components:**
- Navigation bar
- Page header
- Profile information section
- Settings section with:
  - Language preference
  - Theme preference
  - Notification preferences
- Transaction history table
- Account settings buttons
- Footer

**Key Elements:**
- Profile management
- Preference persistence
- Transaction history display
- Account settings

## Data Models

### Language Preferences
```javascript
{
  currentLanguage: 'en', // en, hi, ta, te, bn, mr
  savedLanguage: localStorage.getItem('language')
}
```

### Voice Commands
```javascript
{
  navigation: ['dashboard', 'price', 'analytics', 'negotiation', 'profile', 'home'],
  commodities: ['wheat', 'rice', 'cotton', 'sugarcane'],
  regions: [29 Indian states],
  actions: ['discover', 'search', 'submit', 'tips', 'get']
}
```

### Form Data
```javascript
// Price Discovery
{
  commodity: String,
  quantity: Number,
  region: String
}

// Negotiation
{
  commodity: String,
  buyerOffer: Number,
  expectedPrice: Number,
  quantity: Number
}
```

## UI/UX Design Specifications

### Color Scheme
- Primary: Professional blue (#0066CC)
- Secondary: Accent orange (#FF6B35)
- Background: Light gray (#F5F5F5) / Dark (#1A1A1A)
- Text: Dark gray (#333333) / Light (#FFFFFF)
- Success: Green (#28A745)
- Error: Red (#DC3545)

### Typography
- Headings: 24px, 20px, 18px (bold)
- Body: 14px, 16px (regular)
- Small: 12px (regular)
- Font Family: Inter, Segoe UI, sans-serif

### Spacing
- Base unit: 8px
- Padding: 8px, 16px, 24px, 32px
- Margin: 8px, 16px, 24px, 32px
- Gap: 8px, 16px, 24px

### Glassmorphism Effects
- Background: rgba(255, 255, 255, 0.1) / rgba(0, 0, 0, 0.1)
- Backdrop Filter: blur(10px)
- Border: 1px solid rgba(255, 255, 255, 0.2)
- Box Shadow: 0 8px 32px rgba(0, 0, 0, 0.1)

### Animations
- Page transitions: 300ms fade/slide
- Button hover: 200ms scale + color change
- Loading spinner: Continuous rotation
- Notification slide-in: 300ms from top/bottom

### Responsive Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## Voice Recognition System

### Supported Languages
- English (en-US)
- Hindi (hi-IN)
- Tamil (ta-IN)
- Telugu (te-IN)
- Bengali (bn-IN)
- Marathi (mr-IN)

### Voice Command Processing
1. User clicks voice button
2. System activates speech recognition
3. System listens for command
4. System processes command based on current page
5. System provides voice feedback
6. System updates UI accordingly

### Command Categories
- **Navigation**: Dashboard, Price, Analytics, Negotiation, Profile, Home
- **Commodities**: Wheat, Rice, Cotton, Sugarcane
- **Regions**: All 29 Indian states
- **Actions**: Discover, Search, Submit, Tips, Get, Set, Select
- **Quantities**: Numbers with "kg" or "kilogram"

## File Structure

```
.
├── index.html                 # Home page
├── dashboard.html             # Dashboard page
├── price-discovery.html       # Price discovery page
├── market-analytics.html      # Market analytics page
├── negotiation.html           # Negotiation assistant page
├── profile.html               # User profile page
├── styles.css                 # Global styles and themes
├── voice-commands.js          # Voice recognition and commands
├── app.js                     # Legacy app logic
└── .kiro/specs/               # Specification documents
    └── enhanced-mandi-ai-platform/
        ├── requirements.md    # Requirements document
        ├── design.md          # Design document (this file)
        └── tasks.md           # Implementation tasks
```

## Key Features Implementation

### 1. Multilingual Support
- Language dropdown in navigation bar
- Data attributes for each language (data-en, data-hi, data-ta, etc.)
- LocalStorage persistence
- Voice synthesis in selected language

### 2. Voice Recognition
- Web Speech API integration
- Real-time command processing
- Voice feedback for all actions
- Support for all 6 languages

### 3. Form Validation
- Client-side validation
- Error message display
- Field highlighting
- Submission prevention on errors

### 4. Responsive Design
- CSS Grid and Flexbox
- Media queries for breakpoints
- Mobile-first approach
- Touch-friendly controls

### 5. Theme Support
- CSS Variables for theming
- Dark/Light mode toggle
- LocalStorage persistence
- Smooth theme transitions

### 6. Smooth Animations
- Page transitions
- Button interactions
- Loading states
- Notification displays

## Error Handling

### Client-Side Error Handling
- Form validation errors displayed inline
- Voice recognition errors caught and handled
- Network errors displayed with retry options
- User-friendly error messages

### Error Response Format
```javascript
{
  success: false,
  error: 'User-friendly error message'
}
```

## Performance Considerations

- Minimal external dependencies
- Efficient DOM manipulation
- LocalStorage for fast preference loading
- Optimized CSS for smooth animations
- Lazy loading for images
- Debouncing for search inputs

## Browser Support

- Chrome/Chromium (recommended)
- Edge
- Safari
- Firefox

## Security Considerations

- No sensitive data stored in LocalStorage
- Input validation on all forms
- XSS prevention through proper escaping
- CORS not required (frontend-only)
- No authentication required for demo

## Future Enhancements

- Backend API integration
- Real-time market data
- User authentication
- Transaction history persistence
- Advanced analytics
- Mobile app
- SMS/IVR support
- Payment integration
