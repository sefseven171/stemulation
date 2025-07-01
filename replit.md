# STEMulation Learning Platform

## Overview

STEMulation Learning is a comprehensive full-stack web application designed to bridge the skills gap in construction trades. The platform serves as a vocational training hub that connects skilled trades professionals with employers, provides portfolio management, and facilitates training programs across six core trade specializations: Plumbing, Mechanical, HVAC, Electrical, Carpentry, and Energy Building Automation.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Authentication**: Replit Auth with OpenID Connect integration
- **Session Management**: Express sessions with PostgreSQL storage
- **API Design**: RESTful API with JSON responses

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Migration Tool**: Drizzle Kit for schema management
- **Connection**: Connection pooling with @neondatabase/serverless

## Key Components

### Authentication System
- Integrated Replit Auth using OpenID Connect strategy
- Session-based authentication with PostgreSQL session storage
- Enhanced user profile management with role-based access (member, employer, admin)
- Protected routes and API endpoints with rate limiting

### Core Features
1. **Enhanced Job Board**: 
   - Advanced search with filters (location, salary, experience, employment type)
   - Featured job listings with priority system
   - View counts and application tracking
   - Salary ranges and comprehensive job details
   - Job saving and alert system

2. **Advanced Video Portfolio with YouTube Integration**: 
   - Direct upload to both local storage and YouTube
   - Video thumbnails, view counts, and engagement metrics
   - Like/unlike functionality and comment system
   - Duration tracking and quality settings
   - Skills showcasing with trade category filtering

3. **Communication System**:
   - Direct messaging between users
   - Real-time notifications
   - Job inquiry messaging
   - Connection request system

4. **Enhanced User Profiles**:
   - LinkedIn and Indeed profile integration
   - Skill tags and experience level tracking
   - Profile completion percentage
   - User rating and review system
   - Location-based user discovery

5. **Analytics and Tracking**:
   - User action logging
   - Platform usage analytics
   - Performance metrics and insights

6. **Employer Dashboard**: Enhanced tools for workforce management
7. **Training System**: Employer-created groups and training modules
8. **Professional Networking**: Member connections with status tracking

### UI/UX Design
- Responsive design with mobile-first approach
- Professional color scheme with primary blue, secondary orange, and accent green
- Comprehensive component library with consistent design patterns
- Accessible interface following modern web standards

## Data Flow

### User Authentication Flow
1. User initiates login through Replit Auth
2. OpenID Connect handles authentication with Replit's identity provider
3. User profile is created/updated in PostgreSQL
4. Session is established and stored in database
5. Frontend receives authenticated user context

### Job Posting Flow
1. Employer creates job posting through dashboard
2. Data is validated using Zod schemas
3. Job posting is stored in database
4. All users can browse jobs (filtered by trade category)
5. Members can apply to jobs
6. Employers can manage applications

### Video Portfolio Flow
1. Members upload video portfolios showcasing their skills
2. Videos are categorized by trade specialty
3. Public gallery allows browsing by category
4. Portfolio serves as professional showcase for job applications

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe ORM and query builder
- **express**: Web application framework
- **passport**: Authentication middleware
- **openid-client**: OpenID Connect client implementation

### Frontend Dependencies
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight React router
- **react-hook-form**: Form handling and validation

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for development
- **esbuild**: Production bundling for server code

## Deployment Strategy

### Build Process
- Frontend: Vite builds React application to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Static assets served from Express in production

### Environment Configuration
- Development: Vite dev server with Express API
- Production: Single Express server serving both API and static files
- Database: PostgreSQL connection via environment variable
- Sessions: Secure session management with configurable secrets

### Replit Integration
- Configured for Replit's autoscale deployment target
- Port configuration for external access (5000 → 80)
- Development workflow with live reload and error overlay
- Cartographer integration for enhanced development experience

## Recent Changes

✓ Fixed nested anchor tag warnings in navigation components
✓ Enhanced database schema with comprehensive improvements:
  - YouTube integration fields for video uploads
  - Advanced job search capabilities with salary ranges
  - User rating and review system
  - Messaging and notification system
  - Analytics tracking for user interactions
  - Video likes, comments, and engagement features
✓ Implemented advanced search functionality for job board
✓ Added video upload component with YouTube integration
✓ Created comprehensive backend API with rate limiting
✓ Enhanced video portfolio with thumbnails and view counts
✓ Added profile completion tracking and verification
✓ Implemented saved jobs and job alerts functionality
✓ Created custom background images for each trade category:
  - Plumbing: Water pipes, joints, and droplets with blue theme
  - Mechanical: Gears, bolts, and tools with gray theme
  - HVAC: Air ducts, fans, and temperature controls with green theme
  - Electrical: Circuits, lightning, and components with yellow theme
  - Carpentry: Wood grain, tools, and measurements with brown theme
  - Energy Building Automation: Smart building systems with purple theme
✓ Enhanced UI with trade-specific skill badges and visual branding

## Changelog
- June 23, 2025: Initial setup
- June 23, 2025: Comprehensive platform enhancements with YouTube integration, advanced search, messaging system, analytics, and improved user experience

## User Preferences

Preferred communication style: Simple, everyday language.