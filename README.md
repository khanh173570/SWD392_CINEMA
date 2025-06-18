# SWD392 CINESTAR - Cinema Management System

A comprehensive cinema management system for managing movies, screenings, bookings, and user accounts.

## Features

- **Authentication**: Login/register for customers, staff, managers, and administrators
- **Customer**: Book tickets, view booking history, manage profile
- **Staff**: Manage tickets, schedules, and customer service
- **Manager**: Oversee cinema operations and scheduling
- **Admin**: Manage users, movies, cinemas, and monitor system performance

## Tech Stack

- **Frontend**: React, TypeScript, Vite, TailwindCSS
- **Backend**: Spring Boot, Java, JPA/Hibernate
- **Database**: MySQL

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Java 17+
- Maven
- MySQL

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/SWD392_CinemaG7.git
   cd SWD392_CinemaG7
   ```

2. Install frontend dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

4. The application will be available at `http://localhost:5173`

## API Integration

This application uses a Spring Boot backend API running on port 8081. API calls are configured to use a Vite proxy to avoid CORS issues.

### Authentication Flow

1. User enters email and password
2. Frontend sends login request to `/api/v1/account/login`
3. Backend validates credentials and returns user data with JWT tokens
4. Frontend stores tokens in localStorage and redirects based on user role

## Environment Configuration

Key environment variables are stored in `.env`:

```
VITE_API_URL=/api/v1
VITE_API_AUTH_LOGIN=/account/login
VITE_API_AUTH_REGISTER=/account/register
VITE_ROLE_ADMIN=ROLE_ADMIN
VITE_ROLE_STAFF=ROLE_STAFF
VITE_ROLE_USER=ROLE_USER
VITE_ROLE_MANAGER=ROLE_MANAGER
```

## Troubleshooting

If you encounter API connection issues, please refer to:

- [API Debug Guide](./API_DEBUG_GUIDE.md)
- [CORS Troubleshooting](./CORS_TROUBLESHOOTING.md)

## License

This project is licensed under the MIT License
