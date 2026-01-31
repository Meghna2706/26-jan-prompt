# Design Document: Enhanced Mandi AI Platform

## Overview

The Enhanced Mandi AI Platform is a full-stack web application designed to revolutionize agricultural commerce in India. The system combines modern web technologies with AI-driven insights to provide farmers and traders with fair pricing, market analytics, and negotiation assistance. The architecture follows a client-server model with a React-based frontend, Node.js/Express backend, and MongoDB database. The design emphasizes user experience through multilingual support, responsive design, and enterprise-grade UI patterns.

## Architecture

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer (React)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Pages: Login, Dashboard, Price Discovery, etc.      │   │
│  │  Components: Navigation, Cards, Charts, Forms        │   │
│  │  State Management: Context API / Redux               │   │
│  │  Styling: CSS3 with Glassmorphism & Animations       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│                  API Layer (Express.js)                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Routes: Auth, Users, Commodities, Analytics, etc.   │   │
│  │  Middleware: JWT Validation, Error Handling          │   │
│  │  Controllers: Business Logic & Validation            │   │
│  │  Services: AI Integration, Data Processing           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓ MongoDB Driver
┌─────────────────────────────────────────────────────────────┐
│                  Data Layer (MongoDB)                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Collections: Users, Commodities, Transactions, etc. │   │
│  │  Indexes: Performance Optimization                   │   │
│  │  Validation: Schema Enforcement                      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- React.js with Hooks for state management
- CSS3 with CSS Variables for theming
- Axios for HTTP requests
- React Router for navigation
- Chart.js or D3.js for analytics visualization

**Backend:**
- Node.js runtime environment
- Express.js web framework
- JWT for authentication
- Bcrypt for password hashing
- Mongoose for MongoDB ODM

**Database:**
- MongoDB for document storage
- Indexes for query optimization
- TTL indexes for session management

**Deployment:**
- Local development environment
- Environment variables for configuration
- Docker-ready structure (optional)

## Components and Interfaces

### Frontend Components

#### 1. Authentication Components
- **LoginForm**: Email/password input with validation
- **RegisterForm**: Registration with role selection
- **EmailVerification**: Email verification flow
- **PasswordReset**: Password recovery interface

#### 2. Navigation Components
- **NavigationBar**: Persistent header with language switcher
- **Breadcrumb**: Current location indicator
- **SideMenu**: Role-based menu options
- **LanguageSwitcher**: Language selection dropdown

#### 3. Dashboard Components
- **DashboardWidget**: Reusable widget container
- **QuickStats**: Key metrics display
- **RecentActivity**: Activity feed
- **RecommendationCard**: Personalized suggestions

#### 4. Price Discovery Components
- **CommoditySearch**: Search interface
- **PriceCard**: Price display with confidence
- **PriceChart**: Historical price visualization
- **SaveSearchButton**: Save search functionality

#### 5. Analytics Components
- **TrendChart**: Market trend visualization
- **FilterPanel**: Date and commodity filters
- **ExportButton**: Data export functionality
- **PredictionCard**: Predictive insights display

#### 6. Common Components
- **LoadingSpinner**: Loading indicator
- **ErrorAlert**: Error message display
- **SuccessNotification**: Success feedback
- **Modal**: Reusable modal dialog
- **Button**: Styled button component
- **Input**: Validated input field
- **Card**: Glassmorphism card container

### Backend API Endpoints

#### Authentication Endpoints
```
POST   /api/auth/register          - User registration
POST   /api/auth/login             - User login
POST   /api/auth/verify-email      - Email verification
POST   /api/auth/refresh-token     - Token refresh
POST   /api/auth/logout            - User logout
POST   /api/auth/forgot-password   - Password reset request
```

#### User Endpoints
```
GET    /api/users/profile          - Get user profile
PUT    /api/users/profile          - Update user profile
PUT    /api/users/settings         - Update user settings
PUT    /api/users/password         - Change password
GET    /api/users/preferences      - Get user preferences
```

#### Commodity Endpoints
```
GET    /api/commodities            - List all commodities
GET    /api/commodities/:id        - Get commodity details
GET    /api/commodities/search     - Search commodities
GET    /api/commodities/:id/prices - Get price history
POST   /api/commodities/favorites  - Add to favorites
GET    /api/commodities/favorites  - Get favorite commodities
```

#### Analytics Endpoints
```
GET    /api/analytics/trends       - Get market trends
GET    /api/analytics/predictions  - Get price predictions
GET    /api/analytics/recommendations - Get personalized recommendations
GET    /api/analytics/export       - Export analytics data
```

#### Transaction Endpoints
```
GET    /api/transactions           - Get transaction history
GET    /api/transactions/:id       - Get transaction details
POST   /api/transactions           - Create transaction
GET    /api/transactions/export    - Export transactions
```

#### Admin Endpoints
```
GET    /api/admin/users            - List all users
GET    /api/admin/logs             - Get activity logs
GET    /api/admin/statistics       - Get platform statistics
PUT    /api/admin/users/:id        - Manage user
```

## Data Models

### User Model
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  firstName: String,
  lastName: String,
  role: Enum ['Farmer', 'Trader', 'Admin'],
  phone: String,
  address: String,
  city: String,
  state: String,
  emailVerified: Boolean,
  language: String (default: 'en'),
  theme: Enum ['light', 'dark'],
  preferences: {
    notifications: Boolean,
    newsletter: Boolean,
    twoFactorAuth: Boolean
  },
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date
}
```

### Commodity Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  category: String,
  unit: String (kg, quintal, etc.),
  currentPrice: Number,
  priceHistory: [{
    date: Date,
    price: Number,
    volume: Number
  }],
  marketTrend: String (up, down, stable),
  seasonality: String,
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Transaction Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  commodityId: ObjectId (ref: Commodity),
  type: Enum ['buy', 'sell'],
  quantity: Number,
  pricePerUnit: Number,
  totalAmount: Number,
  status: Enum ['pending', 'completed', 'cancelled'],
  negotiationNotes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### SavedSearch Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  commodityId: ObjectId (ref: Commodity),
  searchQuery: String,
  filters: Object,
  createdAt: Date
}
```

### ActivityLog Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  action: String,
  resource: String,
  details: Object,
  ipAddress: String,
  userAgent: String,
  timestamp: Date
}
```

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Authentication Round Trip
**For any** valid user credentials, registering a user, then logging in with those credentials should successfully authenticate the user and return a valid JWT token.
**Validates: Requirements 1.1, 1.2, 2.1, 2.2**

### Property 2: Role-Based Access Enforcement
**For any** user with a specific role, accessing a page restricted to a different role should result in an access denied response or redirect to an authorized page.
**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**

### Property 3: Session Persistence
**For any** authenticated user, their session should persist across page navigations until the JWT token expires or the user explicitly logs out.
**Validates: Requirements 2.3, 2.4, 2.5, 2.6**

### Property 4: Language Preference Persistence
**For any** user who selects a language preference, that preference should be persisted and applied on subsequent logins and page navigations.
**Validates: Requirements 11.2, 11.3, 11.4, 11.5**

### Property 5: Price Recommendation Consistency
**For any** commodity search, the AI-generated price recommendations should be consistent with current market data and display confidence scores.
**Validates: Requirements 12.1, 12.2, 12.3**

### Property 6: Transaction History Accuracy
**For any** user transaction, the transaction should be persisted in the database and retrievable through the transaction history interface with accurate details.
**Validates: Requirements 17.1, 17.2, 17.3, 17.4, 17.5**

### Property 7: Saved Search Retrieval
**For any** saved search, saving a search should persist it, and retrieving saved searches should return all previously saved searches with accurate details.
**Validates: Requirements 18.1, 18.2, 18.3, 18.4**

### Property 8: Theme Application Consistency
**For any** theme selection (dark or light), changing the theme should apply the selected theme to all pages and persist the preference.
**Validates: Requirements 16.2, 16.3, 16.4, 16.5**

### Property 9: Responsive Layout Adaptation
**For any** viewport size, the layout should adapt responsively without breaking, and all interactive elements should remain functional.
**Validates: Requirements 15.1, 15.2, 15.3, 15.4, 15.5**

### Property 10: Data Validation Enforcement
**For any** invalid input submitted through a form, the system should reject the input, display clear validation errors, and prevent form submission.
**Validates: Requirements 20.1, 20.5**

### Property 11: Error Recovery
**For any** network or server error, the system should display a user-friendly error message and provide options to retry or navigate to a safe state.
**Validates: Requirements 20.2, 20.3, 20.4**

### Property 12: JWT Token Validation
**For any** authenticated request, the system should validate the JWT token, and if invalid or expired, should reject the request and redirect to login.
**Validates: Requirements 23.2, 23.3, 23.4, 23.5**

### Property 13: Password Security
**For any** password change, the new password should be validated, hashed securely, and all existing JWT tokens should be invalidated.
**Validates: Requirements 9.6, 23.5**

### Property 14: Multilingual API Responses
**For any** API request from a user with a selected language, the response should contain content in that language.
**Validates: Requirements 11.5, 11.6**

### Property 15: Commodity Search Filtering
**For any** commodity search with filters applied, the results should only include commodities matching all applied filters.
**Validates: Requirements 6.2, 6.3**

## Error Handling

### Client-Side Error Handling
- Form validation errors displayed inline with field highlighting
- Network errors caught and displayed with retry options
- Unauthorized access (401) redirects to login
- Forbidden access (403) displays access denied message
- Server errors (5xx) display generic error with support contact

### Server-Side Error Handling
- Input validation on all endpoints
- Try-catch blocks for database operations
- Proper HTTP status codes (400, 401, 403, 404, 500)
- Error logging with timestamp and context
- Graceful degradation for partial failures

### Error Response Format
```javascript
{
  success: false,
  error: {
    code: 'ERROR_CODE',
    message: 'User-friendly error message',
    details: {} // Optional additional details
  }
}
```

## Testing Strategy

### Unit Testing
- Test individual components in isolation
- Test utility functions and helpers
- Test API endpoint handlers
- Test data validation functions
- Test authentication logic
- Focus on specific examples and edge cases

### Property-Based Testing
- Test universal properties across randomized inputs
- Minimum 100 iterations per property test
- Each property test references a design document property
- Tag format: **Feature: enhanced-mandi-ai-platform, Property {number}: {property_text}**
- Properties cover authentication, data persistence, UI behavior, and API responses

### Integration Testing
- Test component interactions
- Test API endpoint chains
- Test database operations
- Test authentication flow end-to-end
- Test multilingual content delivery

### Testing Tools
- Frontend: Jest + React Testing Library
- Backend: Jest + Supertest
- Property-Based Testing: fast-check (JavaScript)
- Coverage Target: 80%+ code coverage

### Test Organization
- Unit tests co-located with source files
- Integration tests in dedicated test directories
- Property tests in separate property-test files
- Each test file focuses on a single component or module

## UI/UX Design Specifications

### Color Scheme
- Primary: Professional blue (#0066CC)
- Secondary: Accent orange (#FF6B35)
- Background: Light gray (#F5F5F5) / Dark (#1A1A1A)
- Text: Dark gray (#333333) / Light (#FFFFFF)
- Success: Green (#28A745)
- Error: Red (#DC3545)
- Warning: Yellow (#FFC107)

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

## Security Considerations

- Passwords hashed with bcrypt (salt rounds: 10)
- JWT tokens signed with secure secret
- HTTPS enforced in production
- CORS configured for allowed origins
- Input sanitization on all endpoints
- SQL injection prevention through Mongoose
- XSS prevention through React's built-in escaping
- CSRF tokens for state-changing operations
- Rate limiting on authentication endpoints
- Secure session management with httpOnly cookies

## Performance Optimization

- Lazy loading for images and components
- Code splitting for route-based chunks
- Database indexing on frequently queried fields
- Caching strategies for commodity data
- Pagination for large result sets
- Debouncing for search inputs
- Memoization for expensive computations
- CDN for static assets (optional)

## Deployment Considerations

- Environment variables for configuration
- Database connection pooling
- Error monitoring and logging
- Health check endpoints
- Graceful shutdown handling
- Database backup strategy
- API versioning for future compatibility

## Future Enhancements

- Real-time notifications using WebSockets
- Mobile app using React Native
- Advanced AI models for predictions
- Integration with payment gateways
- Video tutorials and live support
- Community features and forums
- API for third-party integrations
- Advanced analytics and reporting
