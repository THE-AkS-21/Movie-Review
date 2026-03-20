# Movie Review Client

A modern, responsive React application for discovering, rating, and reviewing movies. Built with TypeScript, Material-UI, and modern React patterns.

## Features

- 🎬 **Movie Discovery**: Browse and search through a curated collection of movies
- ⭐ **Rating System**: Rate movies with a 5-star rating system
- 📝 **Review System**: Write and read detailed movie reviews
- 🎥 **Trailer Integration**: Watch movie trailers directly in the app
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🌙 **Modern UI**: Clean, accessible interface with Material-UI components
- 🔐 **Authentication**: Secure user authentication and session management
- ⚡ **Performance**: Optimized with lazy loading and efficient state management

## Tech Stack

- **Frontend**: React 18, TypeScript
- **UI Library**: Material-UI (MUI) v5
- **State Management**: React Context API
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form with Yup validation
- **Styling**: Material-UI theming system
- **Build Tool**: Create React App

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:8080`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Movie-Review/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the client directory:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:8080
   REACT_APP_APP_NAME=Movie Reviews
   REACT_APP_APP_VERSION=1.0.0
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── api/                 # API configuration and utilities
│   └── axiosConfig.ts
├── components/          # Reusable UI components
│   ├── header/         # Navigation header
│   ├── hero/           # Hero carousel component
│   ├── layout/         # Main layout wrapper
│   ├── reviewForm/     # Review submission form
│   └── ProtectedRoute.tsx
├── contexts/           # React Context providers
│   └── AuthContext.tsx
├── hooks/              # Custom React hooks
│   └── useAuth.ts
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── ReviewPage.tsx
│   ├── TrailerPage.tsx
│   └── NotFoundPage.tsx
├── services/           # API service functions
│   ├── authService.ts
│   └── movieService.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── theme.ts            # Material-UI theme configuration
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
└── index.css           # Global styles
```

## Key Features

### Authentication
- Secure login/logout functionality
- Token-based authentication
- Automatic token refresh
- Protected routes

### Movie Management
- Browse all movies
- Featured movies section
- Movie search and filtering
- Detailed movie information

### Review System
- Write and submit reviews
- 5-star rating system
- View all reviews for a movie
- Real-time review updates

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions
- Optimized performance

## API Integration

The application integrates with a Spring Boot backend API. Key endpoints include:

- `GET /api/v1/movies` - Fetch all movies
- `GET /api/v1/movies/{id}` - Fetch movie details
- `POST /api/v1/auth/login` - User authentication
- `POST /api/v1/reviews` - Submit movie review

## Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Material-UI design system

### Performance Optimizations

- Lazy loading for routes
- Image optimization
- Bundle splitting
- Memoization for expensive operations

## Deployment

### Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Environment Variables

Configure the following environment variables for production:

- `REACT_APP_API_BASE_URL` - Backend API URL
- `REACT_APP_APP_NAME` - Application name
- `REACT_APP_APP_VERSION` - Application version

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
