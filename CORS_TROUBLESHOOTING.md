# CORS Troubleshooting Guide

## Current Issue

The frontend application running on `http://localhost:5173` is unable to access the backend API at `http://localhost:8081/api/v1/account/login` due to CORS policy restrictions. The browser is blocking these requests because the backend server isn't properly configured to allow cross-origin requests.

Error message:

```
Access to fetch at 'http://localhost:8081/api/v1/account/login' from origin 'http://localhost:5173' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Solutions

There are several ways to solve this issue:

### 1. Configure Backend CORS Settings (Long-term solution)

The proper solution is to configure the backend server to allow CORS requests from your frontend domain. The specific implementation depends on what backend technology is being used.

For a Spring Boot backend, add the following configuration:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### 2. Use a Proxy in Development (Current solution)

Configure a development proxy in your Vite.js configuration to forward API requests. This approach bypasses CORS issues during development.

We've implemented this solution with the following changes:

1. Updated vite.config.ts:

```typescript
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

2. Modified the API URL structure in .env:

```
VITE_API_BASE_URL=http://localhost:8081
VITE_API_PATH=/api/v1
```

3. Updated API service to use the proxy path:

```typescript
const API_PATH = import.meta.env.VITE_API_PATH;
const LOGIN_ENDPOINT = `${API_PATH}${import.meta.env.VITE_API_AUTH_LOGIN}`;
```

Update `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
```

Then update API calls to use relative URLs (e.g., `/api/v1/account/login` instead of `http://localhost:8081/api/v1/account/login`).

### 3. Use a CORS Browser Extension (Temporary Development Solution Only)

Install a CORS browser extension like "CORS Unblock" or "Allow CORS" that will disable CORS checks in your browser.

⚠️ **Warning**: This is only for development and testing. Do not use this approach for production.

## Recommended Solution

For this project, we recommend implementing Solution #2 (Vite proxy configuration) as it requires minimal changes and provides a good development experience.

## Implementation Steps

1. Update `vite.config.ts` with the proxy configuration
2. Modify API service to use relative URLs
3. Restart the development server

## Long-term Considerations

For production deployment, ensure that the backend properly implements CORS with appropriate security considerations:

1. Only allow specific origins that need access
2. Limit allowed HTTP methods to those required
3. Consider whether credentials need to be allowed
4. Set appropriate cache durations for preflight requests
