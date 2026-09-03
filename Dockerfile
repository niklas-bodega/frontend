# Multi-stage build for React + Vite frontend
FROM node:22-alpine AS builder

WORKDIR /build

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Ta emot argumenten från docker-compose
ARG VITE_USER_API_URL
ARG VITE_BOOKING_API_URL
ARG VITE_REVIEW_API_URL

# Gör dem tillgängliga som miljövariabler för Vites byggprocess
ENV VITE_USER_API_URL=$VITE_USER_API_URL
ENV VITE_BOOKING_API_URL=$VITE_BOOKING_API_URL
ENV VITE_REVIEW_API_URL=$VITE_REVIEW_API_URL

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
