# Diwali Gift Distribution App

## Overview

A full-stack web application for managing Diwali gift distribution across HR teams. The system enables administrators to create gift products, allocate them to HR personnel, and track employee acknowledgments. HR managers can assign gifts to employees who receive automated email notifications with acknowledgment links.

**Core Purpose**: Streamline corporate gift distribution during Diwali festival while maintaining transparency and tracking through a celebratory yet professional interface.

## Recent Changes

### Bulletproof Server-Side Acknowledgment (Latest - October 2025)

- **Server-Side Acknowledgment Route**: Implemented `/api/ack/:token` for reliable acknowledgments
  - Acknowledgment happens on server before any frontend interaction
  - Works without JavaScript enabled in browser
  - All email links now use `/api/ack/:token` format
  - Server acknowledges employee, then redirects to `/acknowledge/:token` frontend page
  - Comprehensive error handling with branded HTML for invalid/expired tokens
  - Enhanced logging: "[Direct Acknowledgment]" prefix for debugging
  - Updated all email generation paths: single employee, bulk upload, and resend
  - Prevents acknowledgment failures due to client-side issues

### Resend Email Feature (October 2025)

- **Resend Acknowledgment Emails**: Added ability to resend emails with updated domain
  - New "Resend Email" button (mail icon) in Employee Table Actions column
  - Automatically uses current REPLIT_DEV_DOMAIN for fresh acknowledgment links
  - Solves issue where old Replit domains in emails become inactive
  - Role-based access: Admin can resend any email, HR can only resend their own
  - Toast notifications for success/error feedback
  - Backend endpoint: POST `/api/employees/:id/resend-email`

### PostgreSQL Database & Auto-Acknowledgment (October 2025)

- **Database Migration**: Migrated from in-memory storage to PostgreSQL database
  - All data now persists across server restarts
  - Acknowledgment tokens remain valid indefinitely
  - Implemented DbStorage class using Drizzle ORM with Neon serverless driver
  - Allocation validation enforced at database layer
- **One-Click Acknowledgment**: Streamlined employee acknowledgment flow
  - Employees auto-acknowledge when clicking email link (no button needed)
  - Instant "Thank You" page display
  - Dashboard auto-refresh every 5 seconds with background polling
- **Domain Fix**: Updated acknowledgment URLs to use current REPLIT_DEV_DOMAIN
  - Fixed broken acknowledgment links from old .repl.co domain
  - Dynamic URL generation based on environment variables

### Product Dashboard & Allocation Management (October 2025)

- **New Product Dashboard**: Added "Product View" tab showing product-centric cards with:
  - Total quantity, allocated/unallocated amounts with progress bars
  - HR allocation breakdown for each product
  - Add/Edit/Delete allocation actions directly from product view
  - Clear visibility of unallocated gifts ready for reassignment
- **Improved ProductForm UX**:
  - Separate "Total Quantity" input field (clearer than auto-calculated sum)
  - HR allocations start unchecked (explicit opt-in vs opt-out)
  - Real-time allocated/unallocated display with validation
- **Tab Navigation**: Switch between HR View (HR-centric) and Product View (product-centric)
- **API Enhancement**: Added POST /api/hr-allocations for creating new allocations after product creation

### HR Allocation Editing (October 2025)

- Admins can edit HR allocation quantities after product creation
- Multi-product support: Dialog shows product selector when HR has multiple allocations
- Per-product validation: Cannot reduce allocation below already assigned count for that specific product
- Automatic session expiry handling: 401 errors redirect to login (except for login failures)
- Fixed employee creation to work with session-based hrName (no longer required in request body)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**Routing**: Wouter for lightweight client-side routing with three main routes:

- Login page (`/`)
- Admin dashboard (`/admin`)
- HR dashboard (`/hr`)
- Public acknowledgment page (`/acknowledge/:token`)

**UI Component Library**: Shadcn/ui (New York style) built on Radix UI primitives

- Design system uses Material Design foundation with Diwali-themed enhancements
- Tailwind CSS for styling with custom color palette focused on festive orange, deep purple, and golden accents
- Supports both light and dark modes via ThemeProvider
- Typography hierarchy using Poppins (headings), Inter (body), and Playfair Display (decorative)

**State Management**:

- TanStack Query (React Query) for server state management and caching
- React Context for theme state
- Session-based authentication state managed server-side

**Key Design Patterns**:

- Component composition with shared UI components (StatsCard, EmployeeTable, etc.)
- Custom hooks for mobile detection and toast notifications
- Form validation using react-hook-form with Zod schemas

### Backend Architecture

**Runtime**: Node.js with Express.js framework

**Session Management**: Express-session with PostgreSQL store (connect-pg-simple)

- Session-based authentication without JWT
- Role-based access control (admin, hr roles)
- Middleware guards for route protection (`requireAuth`, `requireAdmin`, `requireHR`)

**Data Layer**:

- Drizzle ORM for type-safe database operations
- PostgreSQL as primary database (Neon serverless driver)
- In-memory storage implementation (`MemStorage`) for development/testing
- Schema definitions shared between client and server

**Database Schema**:

- `users`: Authentication and role management (admin/hr)
- `products`: Gift product definitions with total quantities
- `hrAllocations`: Gift allocations per HR team
- `employees`: Employee records with acknowledgment tokens and status

**API Structure**:

- RESTful endpoints under `/api` prefix
- Authentication: `/api/auth/login`, `/api/auth/me`
- Products: `/api/products` (GET, POST)
- Allocations: `/api/hr-allocations`, `/api/hr-allocations/:id` (PUT, DELETE)
- Employees: `/api/employees` (GET, POST), `/api/employees/:id/resend-email` (POST)
- Acknowledgments: `/api/ack/:token` (GET - server-side acknowledgment with redirect), `/api/acknowledge/:token` (GET, POST - legacy client-side)
- Statistics: `/api/stats`, `/api/hr-stats/:hrName`

**Key Architectural Decisions**:

- Monorepo structure with shared types/schemas between client and server
- Development mode uses Vite middleware for HMR
- Production builds bundle both frontend and backend separately

### External Dependencies

**Email Service**: Google Gmail API via Replit Connectors

- OAuth2 authentication flow
- Automated acknowledgment emails sent to employees
- Token-based refresh mechanism for access tokens
- Email contains unique acknowledgment link per employee

**Database**: PostgreSQL via Neon serverless

- Connection managed through DATABASE_URL environment variable
- Drizzle Kit for schema migrations
- Connection pooling handled by @neondatabase/serverless driver

**Replit Integration**:

- Vite plugins for runtime error overlay and dev banner in development
- Cartographer plugin for enhanced development experience
- Identity-based authentication for connector access

**Third-party UI Libraries**:

- Radix UI for accessible component primitives
- Embla Carousel for carousels
- React Day Picker for date selection
- Recharts for data visualization (via chart components)
- Lucide React for icons

**Build Tools**:

- Vite for frontend bundling and development server
- esbuild for backend bundling in production
- Tailwind CSS with PostCSS for styling
- TypeScript for type safety across the stack

**Development Dependencies**:

- tsx for TypeScript execution in development
- drizzle-kit for database schema management
- wouter for routing without React Router overhead
