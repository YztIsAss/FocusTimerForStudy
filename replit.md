# React + Express Full-Stack Application

## Overview

This is a full-stack web application built with React (frontend) and Express (backend), using TypeScript throughout. The application follows a modern monorepo structure with shared types and schemas between frontend and backend.

## User Preferences

```
Preferred communication style: Simple, everyday language.
```

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: React Query (@tanstack/react-query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **Development**: Hot reload with tsx

### Project Structure
```
├── client/           # Frontend React application
├── server/           # Backend Express application
├── shared/           # Shared types and schemas
├── migrations/       # Database migrations
└── dist/            # Build output
```

## Key Components

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Centralized schema definitions in `shared/schema.ts`
- **Migrations**: Automated database migrations with drizzle-kit
- **Connection**: Neon serverless PostgreSQL connection

### Authentication & Authorization
- **Storage Interface**: Abstracted storage interface for CRUD operations
- **Memory Storage**: In-memory storage implementation for development
- **User Management**: Basic user schema with username/password fields

### API Layer
- **REST API**: Express routes with `/api` prefix
- **Error Handling**: Centralized error handling middleware
- **Request Logging**: Custom logging middleware for API requests
- **Type Safety**: Shared types between frontend and backend

### Frontend Features
- **Component Library**: Comprehensive UI components from shadcn/ui
- **Responsive Design**: Mobile-first responsive layout
- **Dark Mode**: Built-in dark mode support with CSS variables
- **Toast Notifications**: User feedback system
- **Form Validation**: Zod-based form validation
- **Loading States**: Loading indicators and error boundaries

## Data Flow

1. **Frontend** makes HTTP requests to `/api` endpoints
2. **Express server** handles routing and business logic
3. **Storage layer** abstracts database operations
4. **Drizzle ORM** manages database queries and migrations
5. **PostgreSQL** stores persistent data
6. **React Query** manages client-side caching and synchronization

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL provider
- **Environment**: Requires `DATABASE_URL` environment variable

### UI/UX Libraries
- **Radix UI**: Headless UI components for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Fast build tool with HMR
- **TypeScript**: Type safety across the stack
- **ESBuild**: Fast bundling for production builds

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: ESBuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle applies migrations before deployment

### Environment Requirements
- Node.js with ESM support
- PostgreSQL database (provided by Neon)
- Environment variables for database connection

### Development vs Production
- **Development**: Uses Vite dev server with HMR
- **Production**: Serves static files from Express server
- **Database**: Same PostgreSQL setup for both environments

### Key Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run db:push`: Apply database schema changes

The application is designed to be easily deployable to platforms like Replit, Vercel, or any Node.js hosting service with PostgreSQL support.