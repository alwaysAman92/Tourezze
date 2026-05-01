# TourEzze Frontend

React-based frontend application for the TourEzze tourism management platform, built with Vite, React 19, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📦 Tech Stack

- **React 19** - Latest React with modern features
- **Vite 7** - Fast build tool and dev server
- **React Router DOM 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualization
- **Axios** - HTTP client for API calls
- **Lucide React** - Modern icon library
- **React Icons** - Additional icon set

## 🏗️ Project Structure

```
Frontend/
├── public/
│   └── Photos/              # Static images and assets
├── src/
│   ├── App.jsx              # Main router configuration
│   ├── main.jsx             # Application entry point
│   ├── MainLanding/         # Landing page
│   │   ├── components/      # Landing page components
│   │   └── styles/          # Landing page styles
│   ├── RolePages/           # Role-specific portals
│   │   ├── Tourist/         # Tourist portal
│   │   ├── Vendor/          # Vendor portal
│   │   ├── Guide/           # Guide portal
│   │   ├── Hotel/           # Hotel owner portal
│   │   └── Admin/           # Government/Admin portal
│   └── components/          # Global components
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js          # Vite configuration
└── eslint.config.js        # ESLint configuration
```

## 🎨 Features

### Landing Page
- Hero section with call-to-action
- Culture showcase section
- Explore destinations preview
- Events section
- Role selector for different user types
- Why choose us section
- Footer with links

### Tourist Portal
- **Explore**: Browse popular destinations
- **AI Itinerary**: Generate personalized travel plans
- **Events**: Discover and register for tourism events
- **Packages**: Browse and book curated tour packages
- **Hotels**: Search and book accommodations with real-time data from database
- Modal-based authentication (login/signup)

### Vendor Portal
- Dashboard with analytics
- Product listing and management
- Order management (New, Accepted, Completed, Cancelled)
- Inventory tracking
- Earnings dashboard
- Reviews and ratings
- Messaging system
- Verification status
- Settings

### Guide Portal
- Dashboard with statistics
- Tour creation and management
- Booking management (Requests, Upcoming, Completed, Cancelled)
- Calendar for availability
- Earnings dashboard
- Profile management
- Reviews and ratings
- Messaging system
- Verification status

### Hotel Owner Portal
- Dashboard with key metrics
- Room and vehicle listings
- Booking management
- Availability calendar
- Earnings tracking
- Reviews management
- Messaging system
- Support system
- Settings

### Government/Admin Portal
- Comprehensive analytics dashboard
- Destination management (CRUD operations)
- Tourist analytics with charts
- Vendor, Guide, and Hotel management
- Event management and approval
- Verification system for all stakeholders
- Reports (Daily and Monthly)
- Complaints management
- Heatmaps visualization
- Platform settings

## 🛣️ Routing

The application uses React Router DOM for client-side routing:

- `/` - Landing page
- `/role/tourist/*` - Tourist portal (public)
- `/role/vendor/*` - Vendor portal (protected)
- `/role/guide/*` - Guide portal (protected)
- `/role/hotel-owner/*` - Hotel portal (protected)
- `/role/government/*` - Admin portal (protected)

## 🎯 Component Architecture

### Layout Components
Each role portal has its own layout component:
- `VendorLayout` - Vendor sidebar and topbar
- `GuideLayout` - Guide sidebar and navigation
- `ProviderLayout` - Hotel owner layout
- `Layout` - Government admin layout

### Protected Routes
Role-specific protected route components ensure authentication:
- `ProtectedRoute` - Vendor authentication
- `GuideProtectedRoute` - Guide authentication
- `HotelProtectedRoute` - Hotel owner authentication
- `GovProtectedRoute` - Government admin authentication

## 🎨 Styling

The project uses **Tailwind CSS 4** for styling:
- Utility-first approach
- Responsive design with mobile-first breakpoints
- Custom color schemes per role portal
- Consistent spacing and typography

### Custom Styles
- Landing page specific styles in `MainLanding/styles/`
- Sidebar scroll styles
- Event and product scroll animations
- Rainbow border effects

## 🔌 API Integration

The frontend communicates with the backend API using Axios:
- Base URL configured for API calls
- JWT tokens stored in localStorage
- Automatic token injection in request headers
- Error handling for API responses

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: 375px+
- Tablet: 768px+
- Desktop: 1024px+
- Large Desktop: 1280px+

## 🚀 Performance Optimizations

- Code splitting with React Router
- Lazy loading for heavy components
- Image optimization with proper formats (AVIF, WebP)
- Efficient re-renders with React hooks
- Tailwind JIT compilation for minimal CSS

## 🧪 Development

### Available Scripts

```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

### Code Quality

- ESLint configured for React best practices
- React Hooks linting rules enabled
- Consistent code formatting

## 🔧 Configuration

### Vite Config
- React plugin enabled
- Path aliases (if configured)
- Build optimizations

### Tailwind Config
- Custom theme extensions
- Role-specific color palettes
- Custom spacing and typography

## 📦 Dependencies

### Core
- `react` & `react-dom` - UI framework
- `react-router-dom` - Routing
- `axios` - HTTP client

### UI & Styling
- `tailwindcss` - CSS framework
- `framer-motion` - Animations
- `lucide-react` - Icons
- `react-icons` - Additional icons

### Charts & Data
- `recharts` - Chart library
- `react-chartjs-2` - Alternative chart library

### Utilities
- `bootstrap` & `react-bootstrap` - Additional UI components
- `react-slick` & `slick-carousel` - Carousel components
- `swiper` - Touch slider

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**: Change port in `vite.config.js` or kill the process using the port
2. **API connection errors**: Verify backend is running and CORS is configured
3. **Build errors**: Clear `node_modules` and reinstall dependencies
4. **Tailwind styles not applying**: Ensure Tailwind is properly imported in `index.css`

## 📝 Notes

- The application uses React 19 features
- All routes are client-side rendered
- Authentication state is managed via React Context
- JWT tokens are stored in localStorage
- Images are optimized and served from the `public` directory

---

For backend setup and API documentation, refer to the main [README.md](../README.md) in the root directory.
