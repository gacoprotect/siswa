# Routes Structure

This directory contains the organized route files for the Laravel application, following best practices for route organization.

## File Structure

### Core Route Files

- **`web.php`** - Main web routes file that includes all other route files
- **`api.php`** - API routes for external integrations
- **`console.php`** - Artisan command routes
- **`auth.php`** - Authentication related routes (login, register, password reset)

### Feature-Specific Route Files

- **`student.php`** - Student dashboard, profile, and student-specific features
- **`payment.php`** - Payment, transaction, topup, and billing routes
- **`admin.php`** - Admin panel and administrative functions
- **`test.php`** - Development and testing routes (only available in debug mode)

## Route Organization Principles

### 1. Middleware Groups

All routes use appropriate middleware groups:

- `web` - Standard web middleware
- `menu.access` - Custom middleware for menu access control
- `verify.nouid` - User verification middleware
- `guest` - For unauthenticated users
- `api` - For API routes

### 2. Route Naming Convention

Routes follow a consistent naming pattern:

- `{feature}.{action}` for main features
- `{feature}.{subfeature}.{action}` for nested features
- Example: `payment.topup.index`, `student.dashboard`

### 3. Route Prefixes

- `/u/{nouid}` - User-specific routes with user ID parameter
- `/api` - API endpoints
- `/test` - Development/testing routes

### 4. Route Grouping

Routes are grouped by:

- **Functionality** - Related features are grouped together
- **Middleware** - Routes with same middleware requirements
- **Access Level** - Public, authenticated, admin routes

## Route Categories

### Authentication Routes (`auth.php`)

- Login/logout
- Registration
- Password reset
- PIN setup and recovery
- OTP verification

### Student Routes (`student.php`)

- Dashboard
- Profile management
- SNK (Terms & Conditions)
- Extracurricular activities
- Permissions (Izin)
- Calendar

### Payment Routes (`payment.php`)

- Topup functionality
- Transaction management
- Payment processing
- Invoice handling
- Bill management
- Transaction history

### Admin Routes (`admin.php`)

- Bill management
- Administrative functions

### API Routes (`api.php`)

- Transaction APIs
- Student data APIs
- General data APIs

### Test Routes (`test.php`)

- Development testing
- Simulation routes
- Debug functionality

## Best Practices Applied

1. **Separation of Concerns** - Each file handles a specific domain
2. **Consistent Middleware** - All routes use `menu.access` middleware
3. **Clear Naming** - Descriptive route names and prefixes
4. **Proper Grouping** - Logical grouping of related routes
5. **Documentation** - Clear comments and structure
6. **Security** - Appropriate middleware for access control

## Usage

Routes are automatically loaded by Laravel's RouteServiceProvider. The main `web.php` file includes all other route files, ensuring proper organization while maintaining functionality.
