# -------- Stage 1: Build with Vite --------
FROM node:24-alpine AS build

WORKDIR /app

# Copy and install dependencies first
COPY package.json package-lock.json ./
RUN npm ci

# Copy the full source
COPY . .

# Build the app for production
RUN npm run build

# -------- Stage 2: Serve with NGINX --------
FROM nginx:alpine

# Copy built app to NGINX’s web directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port NGINX runs on
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
