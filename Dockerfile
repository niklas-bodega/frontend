# Multi-stage build for React + Vite frontend
FROM node:22-alpine AS builder

WORKDIR /build

# Copy package files
COPY package*.json ./

# Copy .env file for build-time environment variables
COPY .env ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Runtime stage - serve with nginx
FROM nginx:alpine

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built app from builder
COPY --from=builder /build/dist /usr/share/nginx/html

# Expose port
EXPOSE 8087

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
