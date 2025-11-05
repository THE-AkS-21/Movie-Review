# Movie Review Application

A full-stack movie review application built with React, Spring Boot, and PostgreSQL. Users can discover movies, write reviews, rate movies, and watch trailers in a modern, responsive interface.

## 🎬 Features

### Frontend (React + TypeScript)
- **Modern UI/UX**: Clean, responsive design with Material-UI components
- **Movie Discovery**: Browse and search through a curated collection of movies
- **Rating System**: 5-star rating system for movies
- **Review System**: Write and read detailed movie reviews
- **Trailer Integration**: Watch movie trailers directly in the app
- **Authentication**: Secure user login and registration
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Live review updates and notifications

### Backend (Spring Boot + PostgreSQL)
- **RESTful API**: Comprehensive REST API with proper HTTP status codes
- **JWT Authentication**: Secure token-based authentication
- **PostgreSQL Database**: Robust relational database with proper indexing
- **User Management**: Complete user registration, login, and profile management
- **Movie Management**: CRUD operations for movies with advanced filtering
- **Review System**: Full review and rating functionality
- **Database Migrations**: Flyway for database schema management
- **Security**: Spring Security with CORS configuration
- **Health Checks**: Actuator endpoints for monitoring

### DevOps & Infrastructure
- **Docker Support**: Multi-container Docker setup
- **Docker Compose**: Complete orchestration with PostgreSQL and Redis
- **Database Migrations**: Automated schema management
- **Health Checks**: Container health monitoring
- **Nginx Reverse Proxy**: Production-ready reverse proxy configuration
- **Environment Configuration**: Flexible environment-based configuration

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │    │  Spring Boot    │    │   PostgreSQL    │
│   (Port 3000)   │◄──►│   API Server    │◄──►│   (Port 5432)   │
│                 │    │   (Port 8080)   │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Nginx Proxy   │    │     Redis       │    │   Flyway DB     │
│   (Port 80/443) │    │   (Port 6379)   │    │   Migrations    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Java 17+ (for local development)
- PostgreSQL 15+ (for local development)

### Using Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Movie-Review
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api/v1
   - Database: localhost:5432

4. **Stop all services**
   ```bash
   docker-compose down
   ```

### Local Development

#### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server/movies
   ```

2. **Start PostgreSQL database**
   ```bash
   docker run --name movie-review-postgres -e POSTGRES_DB=movie_review_db -e POSTGRES_USER=movieuser -e POSTGRES_PASSWORD=moviepass -p 5432:5432 -d postgres:15-alpine
   ```

3. **Run the application**
   ```bash
   ./mvnw spring-boot:run
   ```

#### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
3. **Start the frontend development server**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
Movie-Review/
├── client/                     # React frontend
│   ├── public/                # Static assets
│   ├── src/                   # Source code
│   │   ├── components/        # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── contexts/         # React contexts
│   │   ├── hooks/            # Custom hooks
│   │   ├── types/            # TypeScript types
│   │   └── theme.ts          # Material-UI theme
│   ├── Dockerfile            # Client Docker configuration
│   └── nginx.conf            # Nginx configuration
├── server/                    # Spring Boot backend
│   ├── movies/               # Main application
│   │   ├── src/main/java/    # Java source code
│   │   │   └── com/theAkS/movies/
│   │   │       ├── auth/     # Authentication
│   │   │       ├── config/   # Configuration
│   │   │       ├── movie/    # Movie entities
│   │   │       ├── review/   # Review entities
│   │   │       └── user/     # User entities
│   │   ├── src/main/resources/
│   │   │   ├── db/migration/ # Database migrations
│   │   │   └── application.properties
│   │   └── pom.xml           # Maven dependencies
│   └── Dockerfile            # Server Docker configuration
├── docker-compose.yml        # Multi-container orchestration
├── .gitignore               # Git ignore rules
├── .dockerignore            # Docker ignore rules
└── README.md                # This file
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Material-UI v5** - Component library
- **React Router v6** - Client-side routing
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **Yup** - Form validation

### Backend
- **Spring Boot 3.4** - Application framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Data access layer
- **PostgreSQL** - Primary database
- **JWT** - Token-based authentication
- **Flyway** - Database migrations
- **Maven** - Dependency management

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy
- **Redis** - Caching (optional)

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
DB_USERNAME=movieuser
DB_PASSWORD=moviepass
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400000
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

#### Frontend (.env)
```env
REACT_APP_API_BASE_URL=http://localhost:8080/api/v1
REACT_APP_APP_NAME=Movie Reviews
REACT_APP_APP_VERSION=1.0.0
```

### Database Configuration

The application uses PostgreSQL with the following default settings:
- **Database**: movie_review_db
- **Username**: movieuser
- **Password**: moviepass
- **Port**: 5432

## 📊 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/refresh` - Refresh token
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/verify` - Verify token
- `GET /api/v1/auth/me` - Get current user

### Movies
- `GET /api/v1/movies` - Get all movies
- `GET /api/v1/movies/{id}` - Get movie by ID
- `GET /api/v1/movies/search` - Search movies
- `GET /api/v1/movies/genre/{genre}` - Get movies by genre
- `GET /api/v1/movies/featured` - Get featured movies

### Reviews
- `GET /api/v1/reviews` - Get all reviews
- `POST /api/v1/reviews` - Create review
- `GET /api/v1/reviews/movie/{movieId}` - Get reviews for movie
- `PUT /api/v1/reviews/{id}` - Update review
- `DELETE /api/v1/reviews/{id}` - Delete review

## 🐳 Docker Commands

### Build and run all services
```bash
docker-compose up --build
```

### Run in background
```bash
docker-compose up -d
```

### View logs
```bash
docker-compose logs -f [service-name]
```

### Stop all services
```bash
docker-compose down
```

### Stop and remove volumes
```bash
docker-compose down -v
```

### Rebuild specific service
```bash
docker-compose up --build [service-name]
```

## 🧪 Testing

### Backend Tests
```bash
cd server/movies
./mvnw test
```

### Frontend Tests
```bash
cd client
npm test
```

### Integration Tests
```bash
docker-compose -f docker-compose.test.yml up --build
```

## 📈 Monitoring

### Health Checks
- **Frontend**: http://localhost:3000/health
- **Backend**: http://localhost:8080/api/v1/actuator/health
- **Database**: Check container logs

### Metrics
- **Backend Metrics**: http://localhost:8080/api/v1/actuator/metrics
- **Application Info**: http://localhost:8080/api/v1/actuator/info

## 🚀 Deployment

### Production Deployment

1. **Update environment variables**
   ```bash
   cp .env.example .env.production
   # Edit .env.production with production values
   ```

2. **Build production images**
   ```bash
   docker-compose -f docker-compose.prod.yml build
   ```

3. **Deploy to production**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Environment-specific configurations

- **Development**: `docker-compose.yml`
- **Testing**: `docker-compose.test.yml`
- **Production**: `docker-compose.prod.yml`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- Material-UI for the amazing component library
- Spring Boot team for the excellent framework
- PostgreSQL community for the robust database
- Docker team for containerization tools
- All contributors and users of this project

---

**Happy Movie Reviewing! 🎬✨**
