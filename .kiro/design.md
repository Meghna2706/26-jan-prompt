# Design Document: Mandi AI Assistant

## Overview

The Mandi AI Assistant is a client-side web application that provides AI-powered price discovery and negotiation assistance for Indian local market vendors. The system uses JavaScript for calculations and browser APIs for voice recognition, requiring no backend infrastructure for basic functionality.

## Architecture

### System Architecture

```
┌─────────────────────────────────────────┐
│           Web Browser                   │
├─────────────────────────────────────────┤
│  HTML5 + CSS3 + JavaScript             │
├─────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────┐   │
│  │ Price       │  │ Negotiation     │   │
│  │ Discovery   │  │ Assistant       │   │
│  │ Engine      │  │                 │   │
│  └─────────────┘  └─────────────────┘   │
├─────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────┐   │
│  │ Voice       │  │ Language        │   │
│  │ Recognition │  │ Manager         │   │
│  │ (Web API)   │  │                 │   │
│  └─────────────┘  └─────────────────┘   │
└─────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- HTML5 for structure and semantic markup
- CSS3 for responsive design and mobile-first styling
- Vanilla JavaScript for functionality and calculations
- Web Speech API for voice recognition
- Local Storage for language preferences

**No Backend Required:**
- All calculations performed client-side
- No database or server dependencies
- Works offline for basic functionality

## Components

### 1. Language Manager

Handles multilingual support and interface localization.

**Functions:**
- `setLanguage(langCode)` - Switch interface language
- `getLocalizedText(key)` - Get translated text
- `updateUI()` - Update all interface text

**Supported Languages:**
```javascript
const languages = {
  'en': 'English',
  'hi': 'हिंदी',
  'ta': 'தமிழ்',
  'te': 'తెలుగు',
  'bn': 'বাংলা',
  'mr': 'मराठी'
};
```

### 2. Price Discovery Engine

Calculates fair market prices using predefined algorithms and market data.

**Core Algorithm:**
```javascript
function calculatePrice(product, quantity, location) {
  const basePrice = getBasePrice(product);
  const locationMultiplier = getLocationMultiplier(location);
  const quantityDiscount = getQuantityDiscount(quantity);
  const seasonalFactor = getSeasonalFactor(product);
  
  const fairPrice = basePrice * locationMultiplier * quantityDiscount * seasonalFactor;
  const priceRange = {
    min: fairPrice * 0.8,
    max: fairPrice * 1.2
  };
  
  return {
    suggestedPrice: fairPrice,
    priceRange: priceRange,
    confidence: calculateConfidence(),
    trend: getMarketTrend(product)
  };
}
```

**Price Factors:**
- Base product prices (stored in JavaScript objects)
- Location-based multipliers (metro vs rural)
- Quantity discounts for bulk sales
- Seasonal demand variations
- Market trend indicators

### 3. Voice Recognition System

Integrates with Web Speech API for voice input functionality.

**Implementation:**
```javascript
class VoiceManager {
  constructor() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
  }
  
  startListening(language) {
    this.recognition.lang = this.getLanguageCode(language);
    this.recognition.start();
  }
  
  onResult(callback) {
    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      callback(transcript);
    };
  }
}
```

**Language Mapping:**
- English: 'en-IN'
- Hindi: 'hi-IN'
- Tamil: 'ta-IN'
- Telugu: 'te-IN'
- Bengali: 'bn-IN'
- Marathi: 'mr-IN'

### 4. Negotiation Assistant

Provides intelligent negotiation advice based on price differences and market conditions.

**Algorithm:**
```javascript
function getNegotiationAdvice(buyerOffer, vendorPrice, context) {
  const difference = vendorPrice - buyerOffer;
  const percentageDiff = (difference / vendorPrice) * 100;
  
  let strategy;
  if (percentageDiff > 20) {
    strategy = "significant_gap";
  } else if (percentageDiff > 10) {
    strategy = "moderate_gap";
  } else {
    strategy = "small_gap";
  }
  
  return {
    suggestedCounter: calculateCounterOffer(buyerOffer, vendorPrice),
    strategy: getStrategyAdvice(strategy),
    sampleResponse: generateSampleResponse(strategy, context)
  };
}
```

## User Interface Design

### Layout Structure

```
┌─────────────────────────────────────────┐
│              Header                     │
│        Mandi AI Assistant               │
├─────────────────────────────────────────┤
│          Language Selector              │
│    [EN] [हि] [த] [తె] [বা] [म]          │
├─────────────────────────────────────────┤
│         Price Discovery Panel           │
│  ┌─────────────────────────────────────┐ │
│  │ Product: [____________]             │ │
│  │ Quantity: [____] Location: [_____] │ │
│  │ [Get Price] [🎤 Voice]             │ │
│  │                                     │ │
│  │ Results: Fair Price ₹XX.XX          │ │
│  └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│        Negotiation Assistant            │
│  ┌─────────────────────────────────────┐ │
│  │ Buyer Offer: [____]                │ │
│  │ Your Price: [____]                 │ │
│  │ [Get Advice]                       │ │
│  │                                     │ │
│  │ Suggestion: Counter with ₹XX.XX     │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Responsive Design

**Mobile (320px - 768px):**
- Single column layout
- Large touch targets (44px minimum)
- Simplified input groups
- Collapsible sections

**Tablet (768px - 1024px):**
- Two-column layout for input groups
- Expanded language selector
- Side-by-side panels

**Desktop (1024px+):**
- Full layout with all features visible
- Optimized for mouse and keyboard input

### Color Scheme

```css
:root {
  --primary-color: #2c5aa0;      /* Blue */
  --secondary-color: #28a745;    /* Green */
  --warning-color: #ffc107;      /* Yellow */
  --background-color: #f5f7fa;   /* Light Gray */
  --text-color: #333333;         /* Dark Gray */
  --border-color: #e1e5e9;       /* Light Border */
}
```

## Data Models

### Product Data Structure

```javascript
const productDatabase = {
  "tomatoes": {
    basePrice: 30,
    unit: "kg",
    category: "vegetables",
    seasonal: {
      peak: [6, 7, 8],    // June-August
      low: [12, 1, 2]     // Dec-Feb
    }
  },
  "rice": {
    basePrice: 45,
    unit: "kg",
    category: "grains",
    seasonal: {
      peak: [10, 11, 12], // Oct-Dec
      low: [4, 5, 6]      // Apr-Jun
    }
  }
  // ... more products
};
```

### Location Multipliers

```javascript
const locationFactors = {
  "delhi": 1.2,
  "mumbai": 1.3,
  "bangalore": 1.15,
  "chennai": 1.1,
  "kolkata": 1.05,
  "rural": 0.8,
  "default": 1.0
};
```

### Language Translations

```javascript
const translations = {
  "en": {
    "get_price": "Get Fair Price",
    "voice_input": "Voice Input",
    "product_name": "Product name",
    "quantity": "Quantity (kg)",
    "location": "Your location"
  },
  "hi": {
    "get_price": "उचित मूल्य पाएं",
    "voice_input": "आवाज़ इनपुट",
    "product_name": "उत्पाद का नाम",
    "quantity": "मात्रा (किलो)",
    "location": "आपका स्थान"
  }
  // ... other languages
};
```

## Algorithms

### Price Calculation Algorithm

1. **Base Price Lookup:** Get standard market price for product
2. **Location Adjustment:** Apply location-based multiplier
3. **Quantity Discount:** Calculate bulk purchase discounts
4. **Seasonal Factor:** Adjust for seasonal demand
5. **Market Trend:** Apply current trend factor
6. **Confidence Score:** Calculate based on data availability

### Negotiation Strategy Algorithm

1. **Gap Analysis:** Calculate percentage difference between offers
2. **Strategy Selection:** Choose approach based on gap size
3. **Counter Calculation:** Suggest optimal counter-offer
4. **Context Integration:** Consider quality, urgency factors
5. **Response Generation:** Create sample negotiation text

## Performance Considerations

### Optimization Strategies

- **Lazy Loading:** Load language packs on demand
- **Caching:** Store calculations in localStorage
- **Debouncing:** Delay calculations during rapid input
- **Compression:** Minify JavaScript and CSS
- **CDN:** Use CDN for external libraries

### Memory Management

- Clear voice recognition objects after use
- Limit stored calculation history
- Garbage collect unused language data
- Optimize DOM manipulation

## Security Considerations

### Client-Side Security

- Input validation for all user data
- XSS prevention in dynamic content
- Secure localStorage usage
- Voice data privacy (no server transmission)

### Privacy Protection

- No personal data collection
- Local-only voice processing
- No tracking or analytics
- Clear data retention policies

## Testing Strategy

### Unit Testing
- Price calculation accuracy
- Language switching functionality
- Voice recognition integration
- Negotiation algorithm correctness

### Integration Testing
- Cross-browser compatibility
- Mobile device testing
- Voice API functionality
- Responsive design validation

### User Acceptance Testing
- Vendor usability testing
- Language accuracy validation
- Performance benchmarking
- Accessibility compliance