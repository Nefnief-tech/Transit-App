# Web Application (React)

This directory contains the web application for TransitFlow AI, built with React.

## Structure (To Be Implemented)

```
web/
├── public/               # Static assets
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/       # Reusable components
│   │   ├── common/
│   │   ├── transit/
│   │   └── map/
│   ├── pages/            # Page components
│   │   ├── Home/
│   │   ├── Search/
│   │   ├── Route/
│   │   └── About/
│   ├── services/         # API services
│   ├── store/            # State management
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Utility functions
│   ├── styles/           # Global styles
│   ├── App.js            # App component
│   └── index.js          # Entry point
├── package.json          # Dependencies
└── README.md            # This file
```

## Features

### Pages

1. **Home Page**
   - Hero section with search
   - Feature highlights
   - Quick links
   - Latest updates

2. **Route Planner**
   - Interactive search
   - Route visualization
   - Real-time updates
   - Alternative routes
   - Print/share functionality

3. **Transit Map**
   - Full-screen map view
   - Vehicle tracking
   - Stop information
   - Route overlays

4. **About/Help**
   - User guide
   - FAQ
   - Contact information
   - API documentation

## Technology Stack

- **Framework**: React 18+
- **Routing**: React Router v6
- **State Management**: Redux Toolkit or Context API
- **UI Framework**: Material-UI or Tailwind CSS
- **Maps**: Mapbox GL JS
- **Charts**: Recharts or Chart.js
- **API Client**: Axios
- **Build Tool**: Vite or Create React App
- **Testing**: Jest + React Testing Library

## Getting Started

### Installation

```bash
npm install
```

### Configuration

Copy `.env.example` to `.env`:

```env
REACT_APP_API_BASE_URL=http://localhost:3000/api
REACT_APP_MAPBOX_API_KEY=your_mapbox_key
REACT_APP_ENVIRONMENT=development
```

### Development

```bash
# Start development server
npm start

# App will open at http://localhost:3001
```

### Building

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## Key Features

### Responsive Design

The web app is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

### Progressive Web App (PWA)

The app can be installed as a PWA:
- Offline functionality
- Add to home screen
- Push notifications
- Background sync

### Accessibility

WCAG 2.1 Level AA compliant:
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast
- Focus indicators

## Deployment

### Static Hosting

Deploy to services like:
- Netlify
- Vercel
- AWS S3 + CloudFront
- GitHub Pages

```bash
# Build for production
npm run build

# Deploy (example with Netlify)
netlify deploy --prod --dir=build
```

### Environment Variables

Set environment variables in your hosting platform:
- `REACT_APP_API_BASE_URL`
- `REACT_APP_MAPBOX_API_KEY`

## Performance

### Optimization Techniques

- Code splitting with React.lazy()
- Image optimization
- Bundle size minimization
- Service worker caching
- CDN for static assets
- Lazy loading for routes

### Performance Metrics

Target scores:
- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## SEO

The app is optimized for search engines:
- Server-side rendering (optional with Next.js)
- Meta tags
- Structured data
- Sitemap
- robots.txt

## Browser Support

Supported browsers:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Contributing

See [Contributing Guidelines](../CONTRIBUTING.md)

## Resources

- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Material-UI](https://mui.com/)
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)
