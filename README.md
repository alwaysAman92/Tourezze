# TourEzze - Comprehensive Tourism Management Platform

TourEzze is a full-stack tourism management platform that connects tourists, vendors, guides, hotel owners, and government administrators in a unified ecosystem. The platform features AI-powered itinerary generation, multi-role authentication, real-time booking management, and comprehensive analytics.

## 🚀 Features

### Core Features
- **AI-Powered Itinerary Generation**: Generate personalized travel plans using Google Gemini AI based on budget, duration, interests, and preferences
- **Multi-Role Authentication**: Separate portals for Tourists, Vendors, Guides, Hotel Owners, and Government Administrators
- **Comprehensive Analytics**: Dashboard with charts, reports, and insights for all stakeholders
- **Event Management**: Discover and manage tourism events
- **Booking System**: Hotels and guides can manage bookings, availability, and earnings

### Role-Specific Features

#### 🧳 Tourist Portal
- Explore popular destinations with detailed information
- Generate AI-powered travel itineraries
- Browse and book hotels
- Shop from local vendors (handicrafts, food, etc.)
- Discover and register for events
- View travel history and saved plans

#### 🏪 Vendor Portal
- Product listing and management
- Order management (New, Accepted, Completed, Cancelled)
- Inventory tracking
- Earnings dashboard
- Review management
- Verification status tracking
- Messaging system

#### 🧭 Guide Portal
- Tour creation and management
- Booking requests management (New, Upcoming, Completed, Cancelled)
- Calendar for availability management
- Earnings dashboard
- Profile management
- Review and rating system
- Messaging with tourists

#### 🏨 Hotel Owner Portal
- Room and vehicle listing management
- Booking management (Requests, Upcoming, Completed, Cancelled)
- Availability calendar
- Earnings tracking
- Review management
- Support system
- Settings and profile management

#### 🏛️ Government/Admin Portal
- **Destination Management**: Add, update, and remove tourist destinations
- **Analytics Dashboard**: Tourist trends, revenue charts, popular destinations, district-wise tourism data
- **Verification System**: Verify vendors, guides, and hotels
- **Management**: Manage hotels, vendors, guides, and transport providers
- **Event Management**: Create, approve, and manage tourism events
- **Reports**: Daily and monthly reports generation
- **Complaints Management**: Handle tourist and stakeholder complaints
- **Heatmaps**: Visual representation of tourism data
- **Settings**: Platform-wide configuration

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Recharts** - Chart library for analytics
- **React Icons & Lucide React** - Icon libraries
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - Database
- **Mongoose 9** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Bcryptjs** - Password hashing
- **Joi** - Input validation
- **Google Generative AI (Gemini)** - AI itinerary generation
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
vivek/
├── backend/
│   ├── src/
│   │   ├── common/
│   │   │   ├── middleware/        # Authentication middleware
│   │   │   ├── services/          # Business logic services
│   │   │   ├── utils/             # Database, JWT, Gemini client
│   │   │   └── validations/       # Input validation schemas
│   │   ├── Tourist/
│   │   │   ├── controllers/       # Tourist & itinerary controllers
│   │   │   ├── models/            # Tourist & TravelPlan models
│   │   │   └── routes/             # Tourist & AI itinerary routes
│   │   └── Vendor/
│   │       ├── controllers/       # Vendor controllers
│   │       ├── models/            # Vendor model
│   │       └── routes/            # Vendor routes
│   ├── index.js                   # Entry point
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── App.jsx                 # Main app router
    │   ├── MainLanding/            # Landing page components
    │   ├── RolePages/
    │   │   ├── Tourist/            # Tourist portal
    │   │   ├── Vendor/             # Vendor portal
    │   │   ├── Guide/              # Guide portal
    │   │   ├── Hotel/              # Hotel owner portal
    │   │   └── Admin/              # Government/Admin portal
    │   └── components/             # Global components
    ├── public/                     # Static assets
    └── package.json
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance, e.g. MongoDB Atlas)
- npm or pnpm

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd vivek
```

2. **Backend Setup**
```bash
cd backend
npm install
# or
pnpm install
```

3. **Frontend Setup**
```bash
cd ../Frontend
npm install
# or
pnpm install
```

4. **Environment Variables**

Create a `.env` file in the `backend` directory:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
JWT_SECRET=your_jwt_secret_key
```

5. **Start Development Servers**

Backend:
```bash
cd backend
npm run dev
# Server runs on http://localhost:5001
```

Frontend:
```bash
cd Frontend
npm run dev
# App runs on http://localhost:5173
```

## 📡 API Endpoints

### Tourist Routes (`/api/tourist`)
- `POST /signup` - Tourist registration
- `POST /login` - Tourist login
- `GET /me` - Get tourist profile (protected)

### Vendor Routes (`/api/vendor`)
- `POST /signup` - Vendor registration
- `POST /login` - Vendor login
- `GET /profile` - Get vendor profile (protected)

### AI Itinerary Routes (`/api/ai`)
- `POST /generate-itinerary` - Generate AI-powered travel itinerary
- `POST /save-plan/:id` - Save a generated itinerary
- `GET /history` - Get itinerary history

## 🎨 Frontend Routes

### Public Routes
- `/` - Landing page
- `/role/tourist/*` - Tourist portal (public access)

### Protected Routes
- `/role/vendor/*` - Vendor portal (requires authentication)
- `/role/guide/*` - Guide portal (requires authentication)
- `/role/hotel-owner/*` - Hotel owner portal (requires authentication)
- `/role/government/*` - Government/Admin portal (requires authentication)

### Tourist Portal Routes
- `/role/tourist/` or `/role/tourist/explore` - Explore destinations
- `/role/tourist/ai-itinerary` - AI itinerary generator
- `/role/tourist/events` - Browse events
- `/role/tourist/hotels` - Browse and book hotels

## 🔐 Authentication

The platform uses JWT (JSON Web Tokens) for authentication. Each role has its own authentication context:
- **Tourist**: Modal-based login/signup (no separate route)
- **Vendor**: `/role/vendor/login` and `/role/vendor/signup`
- **Guide**: `/role/guide/login`
- **Hotel Owner**: `/role/hotel-owner/login` (includes signup)
- **Government**: `/role/government/login`

Protected routes use role-specific `ProtectedRoute` components that verify JWT tokens.

## 🤖 AI Itinerary Generation

The AI itinerary feature uses Google Gemini 2.5 Flash model to generate personalized travel plans. Users provide:
- Duration (days)
- Budget range
- Traveller type
- Start location
- Interests (array)
- Preferences (destination, dates, age group, transport mode, food preferences, etc.)

The AI generates a detailed itinerary with day-by-day plans, activities, and recommendations.

## 📊 Database Models

### Tourist Model
- name, email, password, role

### Vendor Model
- name, email, password, shopName, category, address, phone, role

### TravelPlan Model
- duration, budget, travellerType, startLocation, interests, preferences, aiPlan, isSaved, timestamps

## 🎯 Key Features Implementation

### Analytics & Reporting
- Revenue charts
- Tourist trend analysis
- Popular destinations tracking
- District-wise tourism data
- Daily and monthly reports

### Verification System
Government admins can verify:
- Vendor accounts
- Guide accounts
- Hotel accounts

## 🧪 Development

### Backend Scripts
```bash
npm run dev    # Start with nodemon (auto-reload)
npm start      # Start production server
```

### Frontend Scripts
```bash
npm run dev    # Start Vite dev server
npm run build  # Build for production
npm run lint   # Run ESLint
npm run preview # Preview production build
```

## 🚀 Deployment

### Backend Deployment (Render)
1. Connect your GitHub repository to [Render](https://render.com)
2. Create a new **Web Service** pointing to the `backend` directory
3. Set the build command: `npm install`
4. Set the start command: `npm start`
5. Add environment variables (`MONGO_URI`, `GEMINI_API_KEY`, `JWT_SECRET`, etc.) in the Render dashboard
6. Render will auto-deploy on every push to your main branch

### Frontend Deployment (Vercel)
1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Set the **Root Directory** to `Frontend`
3. Vercel auto-detects Vite and runs `npm run build`
4. Add the `VITE_API_URL` environment variable pointing to your Render backend URL
5. Vercel will auto-deploy on every push to your main branch

### Production Considerations
- Use MongoDB Atlas for a managed cloud database
- Configure CORS on the backend to allow only your Vercel frontend domain
- Keep API keys and secrets in each platform's environment variable settings
- Enable auto-deploy for continuous delivery

## 📝 Code Style

- **ESLint**: Configured for React and modern JavaScript
- **Tailwind CSS**: Utility-first styling approach
- **Component Structure**: Organized by role and feature
- **File Naming**: PascalCase for components, camelCase for utilities

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes with role-based access control
- Input validation using Joi
- CORS configuration for API security

## 📈 Future Enhancements

- Payment gateway integration
- Real-time notifications
- Advanced search and filtering
- Mobile app development
- Multi-language support
- Social media integration
- Review and rating system enhancements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- Development Team

## 🙏 Acknowledgments

- Google Gemini AI for itinerary generation
- React and Vite communities
- MongoDB for database solutions
- All open-source contributors

---

**Note**: Make sure to set up your environment variables before running the application. The platform requires MongoDB connection and Google Gemini API key for full functionality.

