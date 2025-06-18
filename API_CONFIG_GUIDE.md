# API Configuration Guide

## Environment Variables

The project uses environment variables to configure API endpoints. This makes it easy to switch between different environments (development, staging, production) without changing the code.

> **IMPORTANT**: All API endpoints MUST be defined in the `.env` file. No hardcoded fallbacks are allowed in the code. This ensures consistent behavior across all environments and prevents silent failures when environment variables are missing.

```
VITE_API_BASE_URL=http://localhost:8081  # The base URL of the API server
VITE_API_PATH=/api/v1                    # The base path for all API endpoints

# API Endpoints (relative to VITE_API_PATH)
VITE_API_AUTH_LOGIN=/account/login
VITE_API_AUTH_REGISTER=/account/register
VITE_API_AUTH_LOGOUT=/account/logout
VITE_API_REFRESH_TOKEN=/account/refresh-token
VITE_API_MOVIES_SHOWING=/movies/showing
VITE_API_MOVIES_UPCOMING=/movies/upcoming
VITE_API_MOVIES_COMING=/movies/coming
VITE_API_MOVIE_DETAILS=/movies
```

## CORS Handling with Vite Proxy

To avoid CORS issues during development, we use Vite's built-in proxy server:

```javascript
// vite.config.ts
export default defineConfig({
  // ...other config
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
```

This configuration forwards all requests starting with `/api` to `http://localhost:8081`, removing the `/api` prefix. This way, frontend requests can use relative paths like `/api/v1/account/login` and they will be proxied to `http://localhost:8081/v1/account/login`.

## API Usage in Code

In code, we use the environment variables to construct API endpoints:

```typescript
const API_PATH = import.meta.env.VITE_API_PATH;
const LOGIN_ENDPOINT = `${API_PATH}${import.meta.env.VITE_API_AUTH_LOGIN}`;
```

This way, we can easily change the API base URL and path without modifying the code.

## Movie API Examples

### Movie Data Response Format

```json
{
  "metadata": [
    {
      "id": 1,
      "name": "PHIM ĐIỆN ẢNH DORAEMON: NOBITA VÀ CUỘC PHIÊU LƯU VÀO THẾ GIỚI TRONG TRANH",
      "image": "https://example.com/image.jpg",
      "duration": 105,
      "releaseDate": "2025-05-23T00:00:00",
      "genre": "Hoạt Hình, Phiêu Lưu",
      "trailer": "https://youtu.be/example",
      "ageRated": 0
    }
  ],
  "status": true
}
```

### Movie Endpoint Usage

```typescript
// Example of fetching movies with environment variables
const API_PATH = import.meta.env.VITE_API_PATH;
const MOVIES_SHOWING_ENDPOINT = import.meta.env.VITE_API_MOVIES_SHOWING;

// In a service function
export const getShowingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`/api${API_PATH}${MOVIES_SHOWING_ENDPOINT}`);
    const data = await response.json();
    return data.metadata;
  } catch (error) {
    console.error("Failed to fetch showing movies:", error);
    return [];
  }
};
```

## API Responses

### Login Response

```json
{
  "metadata": {
    "id": 1,
    "email": "example@email.com",
    "fullName": "Example User",
    "avatar": "https://example.com/avatar.png",
    "phone": "0123456789",
    "provider": "NORMAL",
    "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
    "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
    "roles": ["ROLE_USER", "ROLE_STAFF", "ROLE_ADMIN", "ROLE_MANAGER"],
    "message": null
  },
  "status": true
}
```

## Troubleshooting

If you encounter CORS issues:

1. Make sure the Vite development server is running
2. Check that the API server is running at the configured URL (http://localhost:8081)
3. Verify that your API requests use the proxy path (e.g., `/api/v1/account/login`)
4. Check the browser console for specific error messages
