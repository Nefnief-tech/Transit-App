# Mobile App (React Native)

This directory contains the mobile application for TransitFlow AI, built with React Native for iOS and Android.

## Structure (To Be Implemented)

```
frontend/
├── src/
│   ├── components/       # Reusable components
│   │   ├── common/       # Common UI components
│   │   ├── transit/      # Transit-specific components
│   │   └── map/          # Map components
│   ├── screens/          # Screen components
│   │   ├── Home/
│   │   ├── Search/
│   │   ├── Route/
│   │   ├── Profile/
│   │   └── Settings/
│   ├── navigation/       # Navigation configuration
│   ├── services/         # API services
│   ├── store/            # State management (Redux/Context)
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Utility functions
│   ├── assets/           # Images, fonts, etc.
│   ├── theme/            # Theme configuration
│   └── App.js            # App entry point
├── ios/                  # iOS native code
├── android/              # Android native code
├── __tests__/            # Test files
├── app.json              # Expo configuration
├── package.json          # Dependencies
├── babel.config.js       # Babel configuration
└── README.md            # This file
```

## Features

### Core Screens

1. **Home Screen**
   - Quick route search
   - Saved favorites
   - Recent trips
   - Live transit updates

2. **Search Screen**
   - Location search with autocomplete
   - Recent searches
   - Map view
   - Filter options

3. **Route Planning**
   - Multi-modal route options
   - Step-by-step directions
   - Real-time arrivals
   - Alternative routes
   - Save favorite routes

4. **Map View**
   - Interactive transit map
   - Vehicle locations
   - Stop markers
   - Route lines
   - User location

5. **Profile & Settings**
   - User preferences
   - Saved locations
   - Accessibility settings
   - Language selection
   - Dark mode toggle

### AI Features

- **Natural Language Search**: "Get me to downtown by 5 PM"
- **Smart Suggestions**: AI-powered route recommendations
- **Delay Predictions**: Proactive delay notifications
- **Crowd Information**: Real-time crowding levels
- **Eco-Friendly Routes**: Carbon footprint comparison

## Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation
- **State Management**: Redux Toolkit or Context API
- **Maps**: Mapbox or React Native Maps
- **UI Library**: React Native Paper or Native Base
- **API Client**: Axios
- **Storage**: AsyncStorage
- **Push Notifications**: Expo Notifications
- **Analytics**: Firebase Analytics

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- iOS: Xcode (macOS only)
- Android: Android Studio

### Installation

```bash
# Install dependencies
npm install

# Install iOS dependencies (macOS only)
cd ios && pod install && cd ..
```

### Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
API_BASE_URL=http://localhost:3000/api
MAPBOX_API_KEY=your_mapbox_key
ENVIRONMENT=development
```

### Development

#### Using Expo

```bash
# Start Metro bundler
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on physical device
# Scan QR code with Expo Go app
```

#### Using React Native CLI

```bash
# iOS
npx react-native run-ios

# Android
npx react-native run-android
```

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

### Building for Production

#### iOS

```bash
# Create production build
npm run build:ios

# Upload to App Store
# Use Xcode or Fastlane
```

#### Android

```bash
# Create production build
npm run build:android

# Sign APK
# Use Android Studio or command line
```

## Key Components

### Route Planner

```jsx
import { RoutePlanner } from './components/transit/RoutePlanner';

<RoutePlanner
  origin={origin}
  destination={destination}
  departureTime={time}
  onRouteSelected={handleRouteSelect}
/>
```

### Map View

```jsx
import { TransitMap } from './components/map/TransitMap';

<TransitMap
  vehicles={vehicles}
  stops={stops}
  userLocation={userLocation}
  onMarkerPress={handleMarkerPress}
/>
```

### AI Search

```jsx
import { NLPSearch } from './components/common/NLPSearch';

<NLPSearch
  onSearch={handleSearch}
  placeholder="Where do you want to go?"
/>
```

## Offline Support

The app supports offline functionality:
- Cached transit schedules
- Saved maps (limited area)
- Favorite routes
- Recent searches

## Accessibility

All components follow WCAG 2.1 Level AA standards:
- Screen reader support
- Keyboard navigation
- High contrast mode
- Adjustable text sizes
- Alternative text for images

## Localization

Supported languages:
- English (en)
- German (de)
- French (fr)

Add translations in `src/locales/[lang].json`

## Performance Optimization

- Image lazy loading
- List virtualization with FlatList
- Memoization of expensive components
- Code splitting
- Bundle size optimization

## Troubleshooting

### Metro Bundler Issues

```bash
# Clear cache
npm start -- --reset-cache

# Clear watchman
watchman watch-del-all
```

### iOS Build Issues

```bash
# Clean build
cd ios
xcodebuild clean
pod install
cd ..
```

### Android Build Issues

```bash
# Clean gradle
cd android
./gradlew clean
cd ..
```

## Contributing

See [Contributing Guidelines](../CONTRIBUTING.md)

## Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
