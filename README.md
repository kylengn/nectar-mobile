# Nectar Mobile App

A React Native mobile application built with Expo, featuring a social media-style interface with character interactions and chat functionality.

## 🚀 Live Demo

**Expo Link for Reviewing:** `exp://1ku7rwi-anonymous-8081.exp.direct`

### How to Access:
1. **iOS Users**: Install [Expo Go](https://apps.apple.com/app/expo-go/id982107779) from App Store
2. **Android Users**: Install [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) from Google Play
3. **Open Expo Go** and scan the QR code below or enter the link manually

## Project Overview

This is a mobile-first application designed for iOS devices, featuring:
- **Home Screen**: Character discovery with swipeable profiles
- **Chat Screen**: Interactive messaging with character AI
- **Custom Navigation**: Tailored tab bar for seamless navigation
- **Modern UI**: Dark theme with smooth animations and gestures

## Project Structure

```
nectar-mobile/
├── types/                    # TypeScript type definitions
│   └── index.ts             # All interfaces and types
├── constants/               # Static data and configuration
│   ├── index.ts            # Clean exports for all constants
│   ├── characters.ts       # Character data and profiles
│   ├── tabs.ts            # Tab navigation configuration
│   ├── messages.ts        # Initial chat messages
│   └── Colors.ts          # Color scheme definitions
├── components/             # Reusable React components
│   ├── ChatScreen.tsx     # Main chat interface
│   ├── HomeScreen.tsx     # Character discovery screen
│   ├── CustomTabBar.tsx   # Custom navigation component
│   ├── useColorScheme.ts  # Theme hook for native
│   └── useColorScheme.web.ts # Theme hook for web
├── context/               # React Context providers
│   └── ChatMetaContext.tsx # Chat metadata context
├── data/                  # Raw data files
│   └── assessment_characters.json # Character profiles
├── app/                   # Expo Router screens
│   ├── _layout.tsx        # Root layout configuration
│   └── (tabs)/           # Tab-based navigation
│       ├── _layout.tsx   # Tab layout configuration
│       └── index.tsx     # Main app screen
└── assets/               # Static assets (images, fonts)
```

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher, currently using v18.17.0)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **iOS Simulator** (for iOS development) or **Expo Go** app on your device

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nectar-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

### Running the App

#### Option 1: iOS Simulator (Recommended)
```bash
npx expo start --ios
```

#### Option 2: Physical Device with Expo Go
1. Install **Expo Go** from the App Store
2. Run `npx expo start`
3. Scan the QR code with your device's camera or Expo Go app

#### Option 3: Web Development
```bash
npx expo start --web
```

## Platform Support

### Current Status
- ✅ **iOS**: Fully optimized and tested
- ⚠️ **Android**: Basic support (may need UI adjustments)
- ⚠️ **Web**: Basic support (limited functionality)

### Device Recommendations
- **Primary Target**: iOS devices (iPhone 6s and newer)
- **Screen Size**: Optimized for 4.7" to 6.7" displays
- **iOS Version**: iOS 13.0 or higher

## Design Decisions & Assumptions

### UI/UX Assumptions
1. **Dark Theme**: App uses a dark color scheme for better user experience
2. **Gesture-Based Navigation**: Swipe gestures for character discovery
3. **Mobile-First Design**: Optimized for mobile interactions
4. **Character-Centric**: Focus on individual character profiles and interactions

### Technical Decisions
1. **Expo Router**: Using file-based routing for better navigation structure
2. **TypeScript**: Full type safety throughout the application
3. **Context API**: Using React Context for state management
4. **Custom Components**: Tailored components for specific use cases
5. **Static Data**: Character data stored as JSON for easy updates

### Architecture Choices
1. **Component Organization**: Separated by functionality (screens, navigation, utilities)
2. **Type Safety**: Centralized types in `/types` folder
3. **Constants Management**: Organized static data in `/constants` folder
4. **Clean Imports**: Using index files for cleaner import statements

## Development Notes

### Key Features
- **Character Discovery**: Swipeable character profiles with stats
- **Interactive Chat**: Message editing, copying, and deletion
- **Custom Navigation**: Tailored tab bar with enabled/disabled states
- **Responsive Design**: Adapts to different screen sizes
- **Smooth Animations**: Gesture-based interactions and transitions

### Code Organization
- **Types**: All TypeScript interfaces and types centralized in `/types`
- **Constants**: Static data organized in `/constants` with clean exports
- **Components**: Reusable UI components with proper prop typing
- **Context**: React Context for global state management

### Performance Considerations
- **Image Optimization**: Profile images loaded from CDN
- **Lazy Loading**: Components loaded as needed
- **Memory Management**: Proper cleanup of event listeners and animations

## Known Limitations

1. **Platform Specificity**: Currently optimized for iOS, Android may need adjustments
2. **Offline Support**: Limited offline functionality
3. **Data Persistence**: Chat messages not persisted between sessions
4. **Character Data**: Static character profiles (no dynamic updates)

## Future Enhancements

### Planned Features
- [ ] **Data Persistence**: Save chat history locally
- [ ] **Push Notifications**: Real-time message notifications
- [ ] **Character Customization**: User profile customization
- [ ] **Advanced Chat Features**: Voice messages, image sharing
- [ ] **Cross-Platform Optimization**: Better Android and web support

### Technical Improvements
- [ ] **State Management**: Consider Redux or Zustand for complex state
- [ ] **Testing**: Add unit and integration tests
- [ ] **Performance**: Implement virtual scrolling for large lists
- [ ] **Accessibility**: Improve screen reader support

## Development Commands

```bash
# Start development server
npx expo start

# Start on specific platform
npx expo start --ios
npx expo start --android
npx expo start --web

# Host for external reviewing
npx expo start --tunnel          # Creates public tunnel (recommended)
npx expo start --host tunnel     # Alternative tunnel method
npx expo start --port 8082       # Use different port if needed

# Build for production
npx expo build:ios
npx expo build:android

# Type checking
npx tsc --noEmit

# Clear cache
npx expo start --clear
```

## 🌐 Hosting for Review

### Method 1: Tunnel (Recommended for External Review)
```bash
# Start with tunnel for public access
npx expo start --tunnel

# This creates a public URL like: exp://1ku7rwi-anonymous-8081.exp.direct
# Anyone can access this link from anywhere
```

### Method 2: Same Network (Local Testing)
```bash
# Start normally for same-network access
npx expo start

# Shows local IP like: exp://192.168.1.100:8081
# Only works for devices on same WiFi network
```

### Method 3: Alternative Tunnel
```bash
# If --tunnel doesn't work, try this
npx expo start --host tunnel
```

### Sharing Instructions for Reviewers

1. **Copy the Expo Link** (e.g., `exp://1ku7rwi-anonymous-8081.exp.direct`)
2. **Share via email, Slack, or any messaging platform**
3. **Include these instructions for reviewers:**

```
To review the app:
1. Install Expo Go from App Store (iOS) or Google Play (Android)
2. Open Expo Go app
3. Tap "Enter URL manually" 
4. Paste: exp://1ku7rwi-anonymous-8081.exp.direct
5. Tap "Connect"
```

### Troubleshooting Hosting Issues

**If tunnel fails to start:**
```bash
# Install ngrok globally
npm install --global @expo/ngrok@^4.1.0

# Clear cache and try again
npx expo start --tunnel --clear
```

**If port is busy:**
```bash
# Use different port
npx expo start --tunnel --port 8082
```

**For persistent hosting:**
- Keep the terminal running while sharing the link
- The link will be active as long as the development server is running

## License

This project is proprietary and confidential. All rights reserved.

---

**Note**: This app is currently optimized for iOS mobile devices. Android and web support are in development. 